
import { NextResponse } from 'next/server';
import { searchKuGou, searchNetEase } from '@/lib/search-service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  // Use "Loose" Search for Dropdown (Maximum Results)
  // Parallel execution for speed
  // Increase limits to get more results (e.g. 100 + 100)
  const [neResults, kgResults] = await Promise.all([
    searchNetEase(q, false, 100), // validate=false for speed & quantity, limit 100
    searchKuGou(q, 100)           // limit 100
  ]);

  // Combine: NetEase first, then KuGou
  // Deduplicate by ID? No need, UI handles it.
  const combined = [...neResults, ...kgResults];

  return NextResponse.json({ results: combined });
}
