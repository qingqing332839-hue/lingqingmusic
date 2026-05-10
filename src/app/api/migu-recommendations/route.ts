
import { NextResponse } from 'next/server';
import { MIGU_PLAYLISTS, RECOMMENDATION_ORDER, RECOMMENDATION_ORDER_MIXED, RECOMMENDATION_ORDER_SCENE } from '@/lib/migu-config';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  // Determine which list of IDs to use
  let targetOrder = RECOMMENDATION_ORDER;
  if (type === 'mixed') {
    targetOrder = RECOMMENDATION_ORDER_MIXED;
  } else if (type === 'scene') {
    targetOrder = RECOMMENDATION_ORDER_SCENE;
  }

  // Directly serve the manually configured, exact-match playlists
  const recommendations = targetOrder.map(id => {
    const pl = MIGU_PLAYLISTS[id];
    if (!pl) return null;
    return {
      id: pl.id,
      title: `${pl.title} · ${pl.subtitle}`,
      playCount: pl.playCount,
      cover: pl.cover
    };
  }).filter(Boolean);

  return NextResponse.json(recommendations);
}
