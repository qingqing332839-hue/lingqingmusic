
import { NextResponse } from 'next/server';
import { searchKuGou, searchNetEase } from '@/lib/search-service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  
  // Optional: receive original ID to preserve it if needed
  const originalId = searchParams.get('id'); 

  if (!q) {
    return NextResponse.json(null, { status: 400 });
  }

  try {
    // 1. Try NetEase first
    const neResults = await searchNetEase(q);
    if (neResults.length > 0) {
       const best = neResults[0];
       
       // Verify src if possible, or at least prefer results with cover/lyrics
       // But for now, just take the first one.
       
       if (originalId) best.id = originalId;
       return NextResponse.json(best);
    }

    // 2. Fallback to KuGou
    const kgResults = await searchKuGou(q);
    if (kgResults.length > 0) {
       const best = kgResults[0];
       // Restore original ID if provided to keep UI consistent
       if (originalId) best.id = originalId;
       return NextResponse.json(best);
    }
    
    // 3. Last Resort: Return minimal metadata to prevent UI crash?
    // No, better to return 404 so frontend can handle it.
    
    return NextResponse.json(null, { status: 404 });
  } catch (error) {
    console.error('Song Detail API Error:', error);
    return NextResponse.json(null, { status: 500 });
  }
}
