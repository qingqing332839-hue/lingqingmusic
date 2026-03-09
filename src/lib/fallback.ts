
// High-quality, copyright-free or public domain audio tracks that can serve as reliable fallbacks
// ensuring the player never breaks, even if the "real" link is dead.
// These are used ONLY when the primary scraped source fails.
// Updated with more reliable sources (Archive.org, NCS, etc.)
export const FALLBACK_AUDIO_POOL = [
  "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3",
  "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/KieLoKaz/Free_Ganymed/KieLoKaz_-_01_-_Reunion_of_the_Spirits.mp3",
  "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_04_-_Sentinel.mp3",
  "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3",
  "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Jahzzar/Tumbling_Dishes_Like_Old-Mans_Wishes/Jahzzar_-_05_-_Siesta.mp3",
  "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Scott_Holmes/Inspiring__Upbeat_Music/Scott_Holmes_-_04_-_Upbeat_Party.mp3"
];

// Helper to deterministically get a fallback track based on song ID
export function getFallbackAudio(id: string): string {
  // Simple hash of string to number
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % FALLBACK_AUDIO_POOL.length;
  return FALLBACK_AUDIO_POOL[index];
}
