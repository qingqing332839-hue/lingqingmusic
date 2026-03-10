
import axios from 'axios';
import { Song } from './data';
import crypto from 'crypto';

// Helper to generate consistent ID
const generateId = (prefix: string, str: string) => {
  const hash = crypto.createHash('md5').update(str).digest('hex').substring(0, 8);
  return `${prefix}_${hash}`;
};

interface SearchResult extends Song {}

// Helper to sanitize lyrics
function sanitizeLyric(lrc: string): string {
    if (!lrc) return '';
    // Remove metadata tags like [ti:], [ar:], [al:], [by:]
    let clean = lrc.replace(/^\[(ti|ar|al|by|offset):.*\]$/gm, '').trim();
    // Ensure UTF-8 (axios usually handles this, but good to be safe if manual decoding needed later)
    return clean;
}

// Search KuGou
export async function searchKuGou(keyword: string): Promise<SearchResult[]> {
  try {
    // 1. Search for song hash (Limit 30)
    // Try multiple search APIs if one fails
    // API 1: mobilecdn (Official Mobile)
    const searchUrl = `http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=${encodeURIComponent(keyword)}&page=1&pagesize=30&showtype=1`;
    
    // API 2: songsearch (Alternative)
    // const searchUrl2 = `http://songsearch.kugou.com/song_search_v2?keyword=${encodeURIComponent(keyword)}&page=1&pagesize=30`;

    const searchRes = await axios.get(searchUrl, { 
        headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
            'Referer': 'https://m.kugou.com/'
        },
        timeout: 5000 // Increased timeout
    });
    
    let infos: any[] = [];
    if (searchRes.data.status === 1 && searchRes.data.data.info.length > 0) {
        infos = searchRes.data.data.info;
    } 
    // else if (searchRes.data.data && searchRes.data.data.lists) {
    //     infos = searchRes.data.data.lists; // For API 2 structure
    // }

    if (infos.length > 0) {
      // Fetch details in parallel
      const detailPromises = infos.map(async (info: any) => {
        const hash = info.hash || info.FileHash;
        const album_audio_id = info.album_audio_id || info.AlbumID || 0;
        
        if (!hash) return null;

        // Use more stable mobile API for details
        // Try multiple detail APIs
        const detailsUrl = `http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=${hash}`;
        // const detailsUrl2 = `https://www.kugou.com/yy/index.php?r=play/getdata&hash=${hash}`;

        try {
          const detailsRes = await axios.get(detailsUrl, { 
            headers: { 
              'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
              'Cookie': 'kg_mid=2333',
              'Referer': 'https://m.kugou.com/'
            },
            timeout: 5000 
          });

          const d = detailsRes.data;
          
          if (d && (d.url || d.play_url)) { 
            const playUrl = d.url || d.play_url;
            // Check if URL is valid (not empty)
            if (!playUrl) return null;

            const durationMs = d.timelength || (d.duration * 1000) || 0;
            const minutes = Math.floor(durationMs / 60000);
            const seconds = Math.floor((durationMs % 60000) / 1000);
            const duration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            let cover = d.imgUrl || d.album_img || d.img || '';
            if (cover) cover = cover.replace('{size}', '400');

            // --- Enhanced Lyric Fetching ---
            let lyric = d.lyrics || '';
            if (!lyric || lyric.length < 20) {
                // Try dedicated KRC search if default lyric is empty/short
                try {
                    const krcSearchUrl = `http://krcs.kugou.com/search?ver=1&man=yes&client=mobi&keyword=${encodeURIComponent(keyword)}&duration=${durationMs}&hash=${hash}&album_audio_id=${album_audio_id}`;
                    const krcRes = await axios.get(krcSearchUrl, { timeout: 3000 });
                    
                    if (krcRes.data && krcRes.data.candidates && krcRes.data.candidates.length > 0) {
                        const candidate = krcRes.data.candidates[0];
                        const accesskey = candidate.accesskey;
                        const id = candidate.id;
                        
                        // Download lyric content
                        const downloadUrl = `http://krcs.kugou.com/download?ver=1&client=mobi&id=${id}&accesskey=${accesskey}&fmt=lrc&charset=utf8`;
                        const dlRes = await axios.get(downloadUrl, { timeout: 3000 });
                        
                        if (dlRes.data && dlRes.data.content) {
                            // Content is base64 encoded
                            const decoded = Buffer.from(dlRes.data.content, 'base64').toString('utf-8');
                            lyric = decoded;
                        }
                    }
                } catch (lyricErr) {
                    // console.warn('KuGou extra lyric fetch failed', lyricErr);
                }
            }

            return {
              id: generateId('kg', `${d.songName || d.audio_name}-${d.singerName || d.author_name}`),
              title: d.songName || d.audio_name || keyword,
              artist: d.singerName || d.author_name || 'Unknown',
              cover: cover || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
              src: playUrl,
              duration: duration,
              lyric: sanitizeLyric(lyric) || '[00:00.00]纯音乐，请欣赏'
            } as SearchResult;
          }
        } catch (e) {
          console.warn(`KuGou detail fetch failed for hash ${hash}`);
        }
        return null;
      });

      const songs = await Promise.all(detailPromises);
      const validSongs = songs.filter((s): s is SearchResult => s !== null);
      
      if (validSongs.length > 0) {
          console.log(`KuGou found ${validSongs.length} results for "${keyword}"`);
          return validSongs;
      }
    }
  } catch (error) {
    console.error(`KuGou search failed for ${keyword}`, error);
  }
  
  return [];
}

// Search NetEase
export async function searchNetEase(keyword: string): Promise<SearchResult[]> {
  try {
    const searchUrl = `http://music.163.com/api/search/get/web?s=${encodeURIComponent(keyword)}&type=1&offset=0&total=true&limit=30`;
    const searchRes = await axios.get(searchUrl, { 
        headers: { 
            'Referer': 'https://music.163.com/',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Cookie': 'os=pc' // Add cookie might help
        },
        timeout: 5000 
    });

    if (searchRes.data.result && searchRes.data.result.songs && searchRes.data.result.songs.length > 0) {
      const songs = searchRes.data.result.songs;
      
      const results = await Promise.all(songs.map(async (song: any) => {
        const id = song.id;
        
        // Skip VIP songs if possible (fee: 1 means VIP, 8 means SQ/VIP)
        // This is a simple heuristic; actual availability is complex
        // But we want to filter out songs that DEFINITELY won't play
        // fee: 0 = free, 1 = vip, 8 = sq
        // However, sometimes fee=1 songs can still play 30s preview or full if lucky.
        // Let's just try all.

        let lyric = '';
        let cover = '';
        
        try {
             const [lyricRes, detailRes] = await Promise.all([
                 axios.get(`http://music.163.com/api/song/lyric?id=${id}&lv=1&kv=1&tv=-1`, { timeout: 3000 }).catch(() => null),
                 axios.get(`http://music.163.com/api/song/detail/?id=${id}&ids=[${id}]`, { timeout: 3000 }).catch(() => null)
             ]);

             // Enhanced NetEase Lyric Parsing
             if (lyricRes && lyricRes.data) {
                 if (lyricRes.data.lrc && lyricRes.data.lrc.lyric) {
                     lyric = lyricRes.data.lrc.lyric;
                 } else if (lyricRes.data.tlyric && lyricRes.data.tlyric.lyric) {
                     // Fallback to translation if original missing
                     lyric = lyricRes.data.tlyric.lyric;
                 } else if (lyricRes.data.nolyric) {
                     lyric = '[00:00.00]纯音乐，请欣赏';
                 }
             }
             
             if (detailRes && detailRes.data.songs && detailRes.data.songs.length > 0) {
                 cover = detailRes.data.songs[0].album?.picUrl || '';
             }
        } catch (e) {}

        const durationMs = song.duration;
        const minutes = Math.floor(durationMs / 60000);
        const seconds = Math.floor((durationMs % 60000) / 1000);
        const duration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Use a different CDN or standard URL
        const src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;

        // Check availability via HEAD request
        // This filters out VIP/Paid songs that return 404/403 on the media URL
        try {
            const headRes = await axios.head(src, {
                timeout: 2000, // Increased to 2s to reduce false negatives
                maxRedirects: 5, // Allow more redirects
                validateStatus: (status) => status < 400, // Only throw on 4xx/5xx
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Range': 'bytes=0-0'
                }
            });
            
            // Check content type if available
            const contentType = headRes.headers['content-type'];
            if (contentType && (contentType.includes('text/html') || contentType.includes('application/json'))) {
                // Redirected to an error page or JSON response -> Invalid
                return null;
            }
        } catch (e: any) {
            // Only filter out on definite 403/404 errors
            // If timeout or network error, let the frontend try (it might work there)
            if (e.response && (e.response.status === 403 || e.response.status === 404)) {
                return null;
            }
            // For other errors (timeout, connection reset), we proceed optimistically
            // console.warn(`[NetEase] HEAD check failed for ${id}, but proceeding: ${e.message}`);
        }
        
        return {
          id: generateId('ne', `${song.name}-${song.id}`),
          title: song.name,
          artist: song.artists.map((a: any) => a.name).join('/'),
          cover: cover || song.album.picUrl || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
          src: src,
          duration: duration,
          lyric: sanitizeLyric(lyric) || '[00:00.00]暂无歌词'
        } as SearchResult;
      }));

      // Filter out songs without valid source if possible, but for NetEase dynamic src, we can't easily check.
      // However, we can filter out results that are clearly invalid (e.g. no ID).
      const validResults = results.filter(r => r && r.id);
      
      console.log(`NetEase found ${validResults.length} results for "${keyword}"`);
      return validResults;
    }
  } catch (error) {
    console.error(`NetEase search failed for ${keyword}`, error);
  }
  return [];
}

export async function searchMusic(keyword: string): Promise<SearchResult[]> {
  const kgResults = await searchKuGou(keyword);
  const neResults = await searchNetEase(keyword);
  // Prioritize NetEase results in the returned array
  return [...neResults, ...kgResults];
}
