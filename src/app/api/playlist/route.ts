
import { NextResponse } from 'next/server';
import { fetchPlaylist } from '@/lib/crawler';

export const dynamic = 'force-dynamic';

const PLAYLIST_CACHE_TTL = 10 * 60 * 1000;

type CachedPlaylist = {
  songs: unknown[];
  expiresAt: number;
};

const playlistCache = new Map<string, CachedPlaylist>();
const inflightRequests = new Map<string, Promise<unknown[]>>();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ songs: [] });
  }

  try {
    const cached = playlistCache.get(id);
    const now = Date.now();

    if (cached && cached.expiresAt > now) {
      return NextResponse.json(
        { songs: cached.songs, cached: true },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
          },
        }
      );
    }

    const existingRequest = inflightRequests.get(id);
    const requestPromise =
      existingRequest ??
      fetchPlaylist(id).then((songs) => {
        playlistCache.set(id, {
          songs,
          expiresAt: Date.now() + PLAYLIST_CACHE_TTL,
        });
        return songs;
      });

    if (!existingRequest) {
      inflightRequests.set(id, requestPromise);
    }

    const songs = await requestPromise;
    inflightRequests.delete(id);

    return NextResponse.json(
      { songs, cached: false },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=3600',
        },
      }
    );
  } catch (error) {
    inflightRequests.delete(id);
    console.error('API Error:', error);
    return NextResponse.json({ songs: [] });
  }
}
