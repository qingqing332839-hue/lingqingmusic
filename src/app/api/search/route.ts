
import { NextResponse } from 'next/server';
import { searchKuGou, searchNetEase } from '@/lib/search-service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  // Parallel search
  const [kgResults, neResults] = await Promise.all([
    searchKuGou(q),
    searchNetEase(q)
  ]);

  // Combine results (KuGou first as per priority)
  const combined = [...kgResults, ...neResults];

  return NextResponse.json({ results: combined });
}
