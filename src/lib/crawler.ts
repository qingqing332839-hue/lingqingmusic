
import axios from 'axios';
import * as cheerio from 'cheerio';
import crypto from 'crypto';

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
  'ktv': 'https://www.33ve.com/list/jlhot.html',
  'japanese': 'https://www.33ve.com/list/rbtop.html',
  'folk': 'https://www.33ve.com/so.php?wd=%E6%B0%91%E8%B0%A3&page=1',
  'soaring': 'https://www.33ve.com/list/newzy.html',
  'new': 'https://www.33ve.com/list/kugou.html',
  'ost': 'https://www.33ve.com/list/ystop.html',
  'ancient_sad': 'https://www.33ve.com/list/xyztop.html',
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
    new: "https://images.unsplash.com/photo-1459749411177-287ce35e8b4f?w=500&h=500&fit=crop"
};

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Referer': 'https://www.33ve.com/'
};

const generateId = (prefix: string, str: string) => {
  const hash = crypto.createHash('md5').update(str).digest('hex').substring(0, 8);
  return `${prefix}_${hash}`;
};

export async function fetchPlaylist(id: string): Promise<Song[]> {
  const url = PLAYLIST_URLS[id];
  if (!url) return [];

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
            if (songs.length >= 200) return;
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

    return songs;
  } catch (error) {
    console.error(`Error fetching playlist ${id}:`, error);
    return [];
  }
}
