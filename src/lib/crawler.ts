
import axios from 'axios';
import * as cheerio from 'cheerio';
import crypto from 'crypto';
import { fetchNetEasePlaylist } from './search-service';
import { fetchMiguPlaylistSongs } from './migu-service';
import { getPlaylistFallback } from './playlist-fallbacks';

interface Song {
  id: string;
  title: string;
  artist: string;
  cover: string;
  src: string;
  duration: string;
  lyric?: string;
}

const PLAYLIST_URLS: Record<string, string> = {
  'top': 'https://www.33ve.com/list/top.html',
  'ustop': 'https://www.33ve.com/list/ustop.html',
  'ndtop': 'https://www.33ve.com/list/ndtop.html',
  'douyin': 'https://www.33ve.com/list/douyin.html',
  'korean': 'https://www.33ve.com/list/hgtop.html',
  'japanese': 'https://www.33ve.com/list/rbtop.html',
  'folk': 'https://www.33ve.com/so.php?wd=%E6%B0%91%E8%B0%A3&page=1',
  'soaring': 'https://www.33ve.com/list/newzy.html',
  'new': 'https://www.33ve.com/list/kugou.html',
  'netease_new': 'https://www.33ve.com/list/kugou.html',
  'ost': 'https://www.33ve.com/list/ystop.html',
  'ancient_sad': 'https://www.33ve.com/list/xyztop.html',
  'show_hits': 'https://www.33ve.com/list/newzy.html',
  'rap': 'https://www.33ve.com/list/sctop.html',
  'acg': 'https://www.33ve.com/list/newacg.html',
  'hk_tw': 'https://www.33ve.com/list/hktop.html',
  'kuaishou': 'https://www.33ve.com/list/kuaishou.html',
  'dj_hits': 'https://www.33ve.com/list/djtop.html',
  'cantonese': 'https://www.33ve.com/list/yytop.html',
  'original': 'https://www.33ve.com/list/kkyc.html',
};

// Default cover images for fallback (to keep UI looking good before load)
const DEFAULT_COVERS: Record<string, string> = {
    top: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=500&h=500&fit=crop",
    ustop: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=500&h=500&fit=crop",
    ndtop: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
    douyin: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=500&fit=crop",
    korean: "https://images.unsplash.com/photo-1610935591850-9a3bf14810c0?w=500&h=500&fit=crop",
    ktv: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=500&h=500&fit=crop",
    japanese: "https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?w=500&h=500&fit=crop",
    folk: "https://images.unsplash.com/photo-1484300681262-5cca666b0954?w=500&h=500&fit=crop",
    soaring: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&h=500&fit=crop",
    ost: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=500&fit=crop",
    ancient_sad: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=500&h=500&fit=crop",
    new: "https://images.unsplash.com/photo-1459749411177-287ce35e8b4f?w=500&h=500&fit=crop",
    show_hits: "https://images.unsplash.com/photo-1499364615650-ec387aa3ad11?w=500&h=500&fit=crop",
    rap: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&h=500&fit=crop",
    acg: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=500&h=500&fit=crop",
    hk_tw: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
    kuaishou: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=500&fit=crop",
    dj_hits: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=500&h=500&fit=crop",
    cantonese: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=500&h=500&fit=crop",
    original: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&h=500&fit=crop",
    netease_new: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
    daily_taste: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=500&fit=crop",
    private_share: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&h=500&fit=crop",
    electronic: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=500&h=500&fit=crop"
};

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Referer': 'https://www.33ve.com/'
};

const generateId = (prefix: string, str: string) => {
  const hash = crypto.createHash('md5').update(str).digest('hex').substring(0, 8);
  return `${prefix}_${hash}`;
};

import { KTV_SONG_LIST } from './ktv-data';

function withFallback(id: string, songs: Song[]): Song[] {
  if (songs.length > 0) {
    return songs;
  }

  const fallbackSongs = getPlaylistFallback(id);
  if (fallbackSongs.length > 0) {
    console.warn(`[playlist-fallback] using local fallback data for ${id}`);
    return fallbackSongs;
  }

  return songs;
}

export async function fetchPlaylist(id: string): Promise<Song[]> {
  // Special handling for specific charts
  if (id === 'ktv') {
      return KTV_SONG_LIST.map((s) => ({
          id: generateId('ktv', `${s.title}-${s.artist}`),
          title: s.title,
          artist: s.artist,
          cover: DEFAULT_COVERS.ktv,
          src: '',
          duration: '00:00'
      }));
  }
  
  // Keep NetEase fallback for explicitly requested netease IDs if they aren't in PLAYLIST_URLS
  if (id === 'netease_hot_v2') { // Changed to avoid collision if we want to keep it
      return fetchNetEasePlaylist('3778678');
  }
  
  if (id === 'electronic') {
      return fetchNetEasePlaylist('1974808');
  }
  if (id === 'private_share') {
      // User requested to change Private Share URL to /discover/recommend/taste
      // However, /discover/recommend/taste is personalized daily recommendation which requires login.
      // We cannot fetch it without user cookie.
      // To provide a "Taste" like experience, we can map it to "Original Chart" (2884035) or keep the previous private playlist.
      // But user explicitly asked to change the URL.
      // If we assume user wants "Daily Recommendation" functionality here:
      // Let's use the same logic as 'daily_taste' (Original Chart) as a placeholder for now,
      // since we can't do real personalized recs without auth.
      // Or maybe user meant they want to use that specific URL for crawling?
      // Our crawler can't crawl that URL because it's dynamic and personalized.
      // Let's fallback to a high quality playlist that resembles "Taste".
      // Let's use "Hot" or "Original" or maybe the previous ID if that was better?
      // User said "Change TO this URL".
      // Let's map it to 'daily_taste' logic (Original Chart 2884035) which is the closest public alternative.
      return fetchNetEasePlaylist('2884035');
  }
  if (id === 'daily_taste') {
      // "Daily Taste" is now "My Favorites"
      // Return empty array here because the API route will handle it by checking the ID
      // and returning a special flag or we just return empty and let the frontend use the store.
      // Actually, since this function is called by the API route, we can't access the frontend store here.
      // So the API route needs to be modified to NOT call this function for 'daily_taste'.
      return []; 
  }

  const url = PLAYLIST_URLS[id];
  if (!url) {
      // Assume it is a Migu playlist ID if not in our static map
      try {
          const miguSongs = await fetchMiguPlaylistSongs(id);
          // Ensure it matches our Song interface
          return withFallback(id, miguSongs.map((s: any) => ({
              id: s.id,
              title: s.title,
              artist: s.artist,
              cover: s.cover,
              src: s.src || '',
              duration: s.duration || '00:00'
          })));
      } catch (e) {
          console.error('Failed to fetch Migu playlist:', e);
          return withFallback(id, []);
      }
  }

  try {
    const { data } = await axios.get(url, { headers: HEADERS, timeout: 8000 });
    const $ = cheerio.load(data);
    const songs: Song[] = [];
    
    // 33ve specific selectors
    if (false) {
        // Old logic for qqmp3.vip, kept for reference but disabled since 'new' now points to 33ve kugou list
         $('ul.list-group li.list-group-item').each((_, el) => {
             if (songs.length >= 200) return;
             const text = $(el).text().trim();
             // Often sites like this list "Song Name - Artist" or similar
             // Let's look for a dash
             if (text.includes('-')) {
                 const parts = text.split('-');
                 const p1 = parts[0].trim(); // Usually Title
                 const p2 = parts.slice(1).join('-').trim(); // Usually Artist
                 
                 if (p1 && p2) {
                     songs.push({
                        id: generateId(id, `${p1}-${p2}`),
                        title: p1,
                        artist: p2,
                        cover: DEFAULT_COVERS[id],
                        src: '',
                        duration: '00:00'
                     });
                 }
             } else {
                 // Fallback if no dash, assume whole text is title
                 if (text) {
                     songs.push({
                        id: generateId(id, text),
                        title: text,
                        artist: 'Unknown',
                        cover: DEFAULT_COVERS[id],
                        src: '',
                        duration: '00:00'
                     });
                 }
             }
         });
    } else {
        const isSearch = url.includes('so.php');
        
        $('ul li').each((_, el) => {
            // Removed 200 limit as per request
            // if (songs.length >= 200) return;
            const $el = $(el);
            let title = '';
            let artist = '';

            if (isSearch) {
                const fullText = $el.find('.list_r .name .url').text().trim();
                const parts = fullText.split(' - ');
                if (parts.length >= 2) {
                    artist = parts[0].trim();
                    title = parts.slice(1).join(' - ').trim();
                } else {
                    title = fullText;
                    artist = 'Unknown';
                }
            } else {
                // Standard 33ve list format
                title = $el.find('.list_r .name .url').text().trim();
                artist = $el.find('.list_r p .singer').text().trim();
            }

            if (title) {
                 // Clean title
                 title = title.replace(/\(Live\)|（Live）/gi, '').trim();

                 songs.push({
                    id: generateId(id, `${title}-${artist}`),
                    title,
                    artist,
                    cover: DEFAULT_COVERS[id], // Use playlist default cover initially
                    src: '',
                    duration: '00:00', // Placeholder
                 });
            }
        });
    }

    return withFallback(id, songs);
  } catch (error) {
    console.error(`Error fetching playlist ${id}:`, error);
    return withFallback(id, []);
  }
}
