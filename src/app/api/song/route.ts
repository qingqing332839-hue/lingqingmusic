
import { NextResponse } from 'next/server';
import { searchKuGou, searchNetEase, searchKuwo, searchMigu } from '@/lib/search-service';

export const dynamic = 'force-dynamic';

// Helper to check string similarity (Simple Character Overlap)
// Returns overlap ratio (0.0 to 1.0)
function calculateOverlap(str1: string, str2: string): number {
    const s1 = str1.toLowerCase().replace(/\s+/g, '');
    const s2 = str2.toLowerCase().replace(/\s+/g, '');
    if (!s1 || !s2) return 0;
    
    let overlap = 0;
    const shorter = s1.length < s2.length ? s1 : s2;
    const longer = s1.length < s2.length ? s2 : s1;
    
    // Check how many chars of shorter are in longer
    // This is a rough heuristic
    for (const char of shorter) {
        if (longer.includes(char)) {
            overlap++;
        }
    }
    
    return overlap / shorter.length;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  
  // Optional: receive original ID to preserve it if needed
  const originalId = searchParams.get('id'); 

  if (!q) {
    return NextResponse.json(null, { status: 400 });
  }

  try {
    // 1. Clean query strategy
    // User query often comes as "Title Artist" or "Title (Info) Artist"
    // For "Écoute Chérie (聆听爱人) Vendredi sur mer", the parenthesis might be crucial OR noise.
    // The current logic removes parenthesis content: `cleanQ = q.replace(/[\(（].*?[\)）]/g, '').trim() || q;`
    // This turns "Écoute Chérie (聆听爱人) Vendredi sur mer" into "Écoute Chérie  Vendredi sur mer"
    // But sometimes the result in DB is "Écoute Chérie (聆听爱人)", so searching without it might miss exact match if the engine is strict.
    // However, usually engines are better with cleaner queries.
    
    // Let's keep the clean version as primary, but also try the raw query if clean fails?
    // Actually, for "Écoute Chérie", the issue might be the special characters 'É'.
    // Some engines need ascii normalization.
    
    const cleanQ = q.replace(/[\(（].*?[\)）]/g, '').trim() || q;
    
    console.log(`[API] Searching for: "${cleanQ}" (Raw: "${q}")`);

    // --- Phase 1: Standard Search (Full Query) ---
    // Start all searches immediately and RACE them.
    // The first one to return a valid result wins.
    
    const tasks = [
        searchNetEase(cleanQ, true), // NetEase Strict
        searchKuGou(cleanQ),
        searchKuwo(cleanQ),
        searchMigu(cleanQ)
    ];

    try {
        // Use Promise.any to get the first successful result
        // Note: Promise.any waits for the first *fulfilled* promise.
        // But our search functions return empty array [] on failure (which is fulfilled).
        // So we need to wrap them to reject if empty, so Promise.any skips them.
        const raceTask = (task: Promise<any>) => task.then(res => {
            if (res && res.length > 0) {
                // Verification: Is this result actually related to our query?
                // Sometimes search engines return "Recommended" songs that are totally different.
                const first = res[0];
                const overlap = calculateOverlap(first.title + ' ' + first.artist, cleanQ);
                if (overlap < 0.3) { // Lower threshold, but ensure some relevance
                     console.log(`[Race] Result ignored due to low relevance: ${first.title} (Overlap: ${overlap})`);
                     throw new Error("Low relevance");
                }
                return first;
            }
            throw new Error("No results");
        });

        const best = await Promise.any(tasks.map(raceTask));
        if (best) {
            console.log(`[Race Won] Found song: ${best.title}`);
            if (originalId) best.id = originalId;
            return NextResponse.json(best);
        }
    } catch (e) {
        console.log("All standard searches failed or returned empty/irrelevant.");
    }
    
    // --- Phase 2: Fuzzy Fallback (Partial Query) ---
    // If exact search fails, try searching just the TITLE part.
    // Heuristic: Split by ' - ' or space, take the first part (likely Title).
    // Or just take the first 60% of the string if no separator.
    let fuzzyQ = '';
    
    // Normalize string for better splitting
    // Remove parenthesis content first as it is usually secondary info
    let baseQ = q.replace(/[\(（].*?[\)）]/g, '').trim(); 
    
    if (baseQ.includes(' - ')) {
        fuzzyQ = baseQ.split(' - ')[0].trim();
    } else {
        // Try to split by Artist name if we can guess it? No hard.
        // Try splitting by space
        const parts = baseQ.split(/\s+/);
        if (parts.length > 2) {
             // "Écoute Chérie Vendredi sur mer" -> "Écoute Chérie"
             // Heuristic: Take first 2 words if total > 2
             fuzzyQ = parts.slice(0, 2).join(' ');
        } else if (parts.length === 2) {
             // "Title Artist" -> "Title"
             // But which is which? Usually Title first.
             fuzzyQ = parts[0];
        } else {
             // Single word or empty
             fuzzyQ = baseQ;
        }
    }
    
    // Fallback: If fuzzyQ is too short, use original raw query (maybe parenthesis had the real title?)
    if (fuzzyQ.length < 2) {
        fuzzyQ = q.split(/[\(（]/)[0].trim(); // "Title (Info)" -> "Title"
    }

    if (fuzzyQ && fuzzyQ.length >= 1) {
        console.log(`[Fuzzy Search] Trying: "${fuzzyQ}" (derived from "${q}")`);
        
        // Try KuGou -> Kuwo -> Migu -> NetEase
        // We want ANY song with this title.
        const fuzzyTasks = [
            searchKuGou(fuzzyQ),
            searchKuwo(fuzzyQ),
            searchMigu(fuzzyQ),
            searchNetEase(fuzzyQ, false) // Loose NetEase
        ];

        try {
            // Race them again!
            const raceFuzzy = (task: Promise<any>) => task.then(res => {
                if (res && res.length > 0) {
                    // Filter: Must be "Same Title" (loose match)
                    // We want to return ANY valid song that matches the title, 
                    // even if artist is different (that's the point of this fallback).
                    // But we should prioritize exact title match if possible.
                    
                    // Simple heuristic: Does result title contain our fuzzy query?
                    const valid = res.find((r: any) => calculateOverlap(r.title, fuzzyQ) > 0.5);
                    if (valid) return valid;
                }
                throw new Error("No fuzzy match");
            });

            const bestMatch = await Promise.any(fuzzyTasks.map(raceFuzzy));
            if (bestMatch) {
                 console.log(`[Fuzzy Match] Found: "${bestMatch.title}" (Overlap > 50%)`);
                 if (originalId) bestMatch.id = originalId;
                 return NextResponse.json(bestMatch);
             }
        } catch(e) {
            console.log("All fuzzy searches failed.");
        }
     }

     // Last Resort: Loose NetEase with original query (if strict failed)
     const neFallback = await searchNetEase(cleanQ, false);
     if (neFallback.length > 0) {
        const best = neFallback[0];
        if (originalId) best.id = originalId;
        return NextResponse.json(best);
    }
    
    return NextResponse.json(null, { status: 404 });
  } catch (error) {
    console.error('Song Detail API Error:', error);
    return NextResponse.json(null, { status: 500 });
  }
}
