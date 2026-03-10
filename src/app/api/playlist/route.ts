
import { NextResponse } from 'next/server';
import { fetchPlaylist } from '@/lib/crawler';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ songs: [] });
  }

  try {
    const songs = await fetchPlaylist(id);
    return NextResponse.json({ songs });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ songs: [] });
  }
}
