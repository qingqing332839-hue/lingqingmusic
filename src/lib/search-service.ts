
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

// Search Kuwo
export async function searchKuwo(keyword: string): Promise<SearchResult[]> {
  console.log(`[Kuwo] Searching for "${keyword}"`);
  try {
    // Use Mobile API directly (Cleaner & More Stable)
    const mobileSearchUrl = `http://m.kuwo.cn/newh5/app/api/www/search/searchMusicBykeyWord?key=${encodeURIComponent(keyword)}&pn=1&rn=20`;
    
    // We need a proper CSRF token logic for Kuwo sometimes, but often Referer is enough for GET
    // Actually, Kuwo API often requires 'csrf' token in header matching the cookie.
    // Let's try a more public API if this fails.
    // Public API: http://search.kuwo.cn/r.s?all={key}&ft=music&itemset=web_2013&client=kt&pn=0&rn=10&rformat=json&encoding=utf8
    
    // Let's try the public "r.s" API first as it's less protected
    const searchUrl = `http://search.kuwo.cn/r.s?all=${encodeURIComponent(keyword)}&ft=music&itemset=web_2013&client=kt&pn=0&rn=10&rformat=json&encoding=utf8`;
    const res = await axios.get(searchUrl, { timeout: 5000 });
    let data = res.data;
    
    let list: any[] = [];
    
    if (typeof data === 'string') {
       // Response format: abslist = [{...}, {...}];
       // or try to parse JSON
       // It's often "abslist = [ ... ]" or just json
       // Clean up variable assignment
       // eslint-disable-next-line no-control-regex
       const jsonStr = data.replace(/^[a-z]+\s*=\s*/i, '').replace(/'/g, '"').replace(/;\s*$/, '');
       try {
           // This JSON is often malformed (keys not quoted), so JSON.parse might fail.
           // Use eval? No, unsafe.
           // Let's fallback to the Mobile API which returns proper JSON.
           throw new Error("Legacy API parsing too risky");
       } catch (e) {
           // Fallback to mobile API
       }
    }

    // Try Mobile API
    const mobileRes = await axios.get(mobileSearchUrl, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
            'Referer': 'https://m.kuwo.cn/',
            // 'csrf': 'token',
            // 'Cookie': 'kw_token=token'
        }
    });

    if (mobileRes.data && mobileRes.data.data && mobileRes.data.data.list) {
        list = mobileRes.data.data.list;
    } else {
        // Fallback to third API: www.kuwo.cn/api/www/search/searchMusicBykeyWord
        // This usually requires strict Cookie/CSRF.
    }
        
    if (list.length > 0) {
        // Map to SearchResult
        const results = await Promise.all(list.map(async (item: any) => {
            const rid = item.rid;
            let src = '';
            let lyric = '[00:00.00]暂无歌词';
            let cover = item.pic || item.albumpic || '';
            
            try {
                // Fetch ALL details in parallel to save time
                // 1. Play URL
                const playUrlPromise = axios.get(`http://antiserver.kuwo.cn/anti.s?type=convert_url&rid=${rid}&format=mp3&response=url`, { timeout: 3000 });
                
                // 2. Info (Lyric & Cover)
                const infoPromise = axios.get(`http://m.kuwo.cn/newh5/app/api/www/kuwo/song/info/${rid}`, { headers: { 'Referer': 'https://m.kuwo.cn/' }, timeout: 3000 });

                const [urlRes, infoRes] = await Promise.allSettled([playUrlPromise, infoPromise]);

                // Process Play URL
                if (urlRes.status === 'fulfilled' && urlRes.value.data && urlRes.value.data.startsWith('http')) {
                    src = urlRes.value.data;
                }

                // Check availability via HEAD request (lightweight)
                if (src) {
                    try {
                        const headRes = await axios.head(src, { timeout: 2000, validateStatus: (status) => status < 400 });
                        
                        // 1. Check Content-Type (Must be audio)
                        const cType = headRes.headers['content-type'];
                        if (cType && cType.includes('text/html')) {
                             src = ''; // Invalid
                        }

                        // 2. Check Content-Length (Filter out fake/trial files < 500KB)
                        // Note: Some streams might not return content-length, so we check existence first
                        const cLength = headRes.headers['content-length'];
                        if (cLength) {
                            const size = parseInt(cLength, 10);
                            if (size < 500 * 1024) { // 500KB
                                src = ''; // Invalid (too small)
                            }
                        }
                    } catch (e: any) {
                         // Only mark as invalid if explicitly forbidden or not found.
                         // For other errors (timeout), we assume it might work in browser.
                         if (e.response && (e.response.status === 403 || e.response.status === 404)) {
                             src = ''; // Invalid
                         }
                    }
                }

                // Process Info
                if (infoRes.status === 'fulfilled' && infoRes.value.data && infoRes.value.data.data) {
                    const info = infoRes.value.data.data;
                    if (info.lrclist) {
                         lyric = info.lrclist.map((l: any) => {
                            const time = parseFloat(l.time);
                            const m = Math.floor(time / 60);
                            const s = Math.floor(time % 60);
                            const ms = Math.floor((time % 1) * 100);
                            return `[${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}]${l.lineLyric}`;
                        }).join('\n');
                    }
                    if (!cover && info.pic) cover = info.pic;
                }
            } catch (e) {}
            
            if (!src) return null;
            
            return {
                id: generateId('kw', `${item.name}-${item.artist}`),
                title: item.name,
                artist: item.artist,
                cover: cover || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
                src: src,
                duration: item.songTimeMinutes || '03:00', 
                lyric: lyric 
            } as SearchResult;
        }));
        
        const valid = results.filter((r): r is SearchResult => r !== null && !!r.src);
        console.log(`Kuwo found ${valid.length} results`);
        return valid;
    }

  } catch (e) {
      console.error("Kuwo search failed", e);
  }
  return [];
}

// Search KuGou
export async function searchKuGou(keyword: string, limit: number = 20): Promise<SearchResult[]> {
  console.log(`[KuGou] Searching for "${keyword}" (limit=${limit})`);
  try {
    // 1. Search for song hash (Limit 30)
    // Try multiple search APIs if one fails
    // API 1: mobilecdn (Official Mobile)
    const searchUrl = `http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=${encodeURIComponent(keyword)}&page=1&pagesize=${limit}&showtype=1`;
    
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
            
            const src = playUrl;

            // Check availability via HEAD request
            try {
                const headRes = await axios.head(src, { 
                    timeout: 2000, 
                    validateStatus: (status) => status < 400 
                });
                
                // 1. Content Type Check
                const cType = headRes.headers['content-type'];
                if (cType && cType.includes('text/html')) {
                     return null; // Invalid
                }

                // 2. Size Check (Filter out fake/trial files < 500KB)
                /*
                const cLength = headRes.headers['content-length'];
                if (cLength) {
                    const size = parseInt(cLength, 10);
                    if (size < 500 * 1024) { // < 500KB
                        return null;
                    }
                }
                */
            } catch (e: any) {
                // If HEAD fails (403/404), assume broken
                if (e.response && (e.response.status === 403 || e.response.status === 404)) {
                    return null;
                }
                // Timeout? We can proceed optimistically or fail strictly.
                // Given user wants "perfect" results, let's fail strictly for KuGou too?
                // Or maybe be lenient on timeout? 
                // Let's be lenient on timeout, strict on error.
            }

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

// Search Migu
export async function searchMigu(keyword: string): Promise<SearchResult[]> {
  console.log(`[Migu] Searching for "${keyword}"`);
  try {
    // Strategy 1: Mobile Web API (Best for metadata)
    const searchUrl = `https://m.music.migu.cn/migu/remoting/scr_search_tag?rows=10&type=2&keyword=${encodeURIComponent(keyword)}&pgc=1`;
    const searchRes = await axios.get(searchUrl, {
      headers: {
        'Referer': 'https://m.music.migu.cn/',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
      },
      timeout: 5000
    });

    if (searchRes.data && searchRes.data.musics && searchRes.data.musics.length > 0) {
      const musics = searchRes.data.musics;
      
      const results = musics.map((m: any) => {
        let src = m.mp3 || m.playUrl || m.url || '';
        
        // Strategy 2: Fallback to another API if src is empty (often happens)
        // We can't fetch detail for each item here efficiently without parallel calls.
        // But let's check if we can construct it.
        if (!src && m.copyrightId) {
             // Try construct: http://freetyst.nf.migu.cn/public/product/v1/product/android/v1/product/{copyrightId}.mp3
             // Note: This is a legacy pattern, might not work for all.
             // src = `http://freetyst.nf.migu.cn/public/product/v1/product/android/v1/product/${m.copyrightId}.mp3`;
        }

        if (!src) return null;

        return {
          id: generateId('mg', `${m.songName}-${m.singerName}`),
          title: m.songName,
          artist: m.singerName,
          cover: m.cover || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
          src: src,
          duration: '03:00', 
          lyric: m.lyrics || '[00:00.00]暂无歌词' 
        } as SearchResult;
      });

      const valid = results.filter((r: any) => r !== null);
      if (valid.length > 0) {
          console.log(`Migu found ${valid.length} results via Web API`);
          return valid;
      }
    }
    
    // Strategy 2: App API (Backup, returns direct URLs more often)
    // https://pd.musicapp.migu.cn/MIGUM3.0/v1.0/content/search_all.do?ua=Android_migu&version=5.0.1&text={keyword}&pageNo=1&pageSize=10&searchSwitch={"song":1}
    const appUrl = `https://pd.musicapp.migu.cn/MIGUM3.0/v1.0/content/search_all.do?ua=Android_migu&version=5.0.1&text=${encodeURIComponent(keyword)}&pageNo=1&pageSize=10&searchSwitch={"song":1}`;
    const appRes = await axios.get(appUrl, { timeout: 5000 });
    
    if (appRes.data && appRes.data.songResultData && appRes.data.songResultData.result) {
        const list = appRes.data.songResultData.result;
        const results = list.map((item: any) => {
            // Check for play url in 'rateFormats' or similar
            let src = '';
            if (item.rateFormats) {
                // Find standard quality (PQ/HQ/SQ)
                const format = item.rateFormats.find((f: any) => f.formatType === 'SQ' || f.formatType === 'HQ' || f.formatType === 'PQ');
                if (format && format.url) {
                    // Url might be relative or absolute.
                    // Usually it's absolute: "ftp://..." or "http://..."
                    src = format.url;
                    // Fix FTP urls to HTTP if needed (Migu uses FTP for some reason in JSON but they are HTTP accessible usually? No, FTP is dead.)
                    // Actually recent API returns http.
                    if (src.startsWith('ftp://')) {
                        src = src.replace('ftp://', 'http://');
                    }
                }
            }
            // Fallback to simple url field
            if (!src && item.url) src = item.url;
            
            if (!src) return null;
            
            // Fix cover
            let cover = item.imgItems ? item.imgItems[0]?.img : '';
            if (!cover && item.albumImgs) cover = item.albumItems[0]?.img;

            return {
                id: generateId('mg', `${item.name}-${item.singers?.[0]?.name}`),
                title: item.name,
                artist: item.singers?.[0]?.name || 'Unknown',
                cover: cover || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
                src: src,
                duration: '03:00',
                lyric: '[00:00.00]暂无歌词' // App API lyric is harder to parse, skipping for speed
            } as SearchResult;
        });
        
        const valid = results.filter((r: any) => r !== null);
        if (valid.length > 0) {
             console.log(`Migu found ${valid.length} results via App API`);
             return valid;
        }
    }

  } catch (error) {
    console.error(`Migu search failed for ${keyword}`, error);
  }
  return [];
}

// Search NetEase
export async function searchNetEase(keyword: string, validate: boolean = false, limit: number = 30): Promise<SearchResult[]> {
  console.log(`[NetEase] Searching for "${keyword}" (validate=${validate}, limit=${limit})`);
  try {
    // 1. Search for songs (Try Cloud Search API which is more robust)
    const searchUrl = `http://music.163.com/api/cloudsearch/pc?s=${encodeURIComponent(keyword)}&type=1&offset=0&limit=${limit}`;
    const searchRes = await axios.get(searchUrl, { 
        headers: { 
            'Referer': 'https://music.163.com/',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Cookie': 'os=pc' 
        },
        timeout: 5000
    });

    if (!searchRes.data.result || !searchRes.data.result.songs || searchRes.data.result.songs.length === 0) {
        console.log(`[NetEase] No songs found in search result for "${keyword}"`);
        return [];
    }

    const songs = searchRes.data.result.songs;
    console.log(`[NetEase] Found ${songs.length} raw songs`);
    
    // 2. Fast Path: If not validating (Search UI or Loose Fallback), return basic info with potential src
    if (!validate) {
        return songs.map((song: any) => {
            const artists = song.artists || song.ar || [];
            const album = song.album || song.al || {};
            
            return {
                id: generateId('ne', `${song.name}-${song.id}`),
                title: song.name,
                artist: artists.map((a: any) => a.name).join('/'),
                // Use album cover from search result directly (usually sufficient)
                cover: album.picUrl || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
                // Return the constructed URL even without validation, let frontend try it
                src: `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`,
                duration: '00:00',
                lyric: ''
            };
        });
    }

    // 3. Strict Path: Find a working song (Playback)
    const validResults: SearchResult[] = [];
    
    // Check top 5 songs sequentially
    for (let i = 0; i < Math.min(songs.length, 5); i++) {
        const song = songs[i];
        const id = song.id;
        const artists = song.artists || song.ar || [];
        const album = song.album || song.al || {};
        
        // Construct standard URL
        let src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
        
        // Validate URL availability
        let isValid = false;
        try {
            const headRes = await axios.head(src, {
                timeout: 2000, 
                maxRedirects: 3,
                validateStatus: (status) => status < 400,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Range': 'bytes=0-0'
                }
            });
            
            const contentType = headRes.headers['content-type'];
            if (!contentType || !contentType.includes('text/html')) {
                 isValid = true;
            }
        } catch (e: any) {
            // Strict fail on 403/404
        }
        
        if (isValid) {
            // Fetch additional details only if valid
            let lyric = '';
            let cover = album.picUrl || '';

            try {
                // Fetch lyric & detail in parallel for speed
                const [lyricRes, detailRes] = await Promise.all([
                    axios.get(`http://music.163.com/api/song/lyric?id=${id}&lv=1&kv=1&tv=-1`, { timeout: 3000 }).catch(() => ({ data: {} })),
                    axios.get(`http://music.163.com/api/song/detail/?id=${id}&ids=[${id}]`, { timeout: 3000 }).catch(() => ({ data: {} }))
                ]);

                if (lyricRes.data) {
                    if (lyricRes.data.lrc?.lyric) lyric = lyricRes.data.lrc.lyric;
                    else if (lyricRes.data.tlyric?.lyric) lyric = lyricRes.data.tlyric.lyric;
                    else if (lyricRes.data.nolyric) lyric = '[00:00.00]纯音乐，请欣赏';
                }
                
                if (detailRes.data.songs?.[0]?.album?.picUrl) {
                    cover = detailRes.data.songs[0].album.picUrl;
                } else if (detailRes.data.songs?.[0]?.al?.picUrl) {
                    cover = detailRes.data.songs[0].al.picUrl;
                }
            } catch (e) {}

            const durationMs = song.duration || song.dt || 0;
            const minutes = Math.floor(durationMs / 60000);
            const seconds = Math.floor((durationMs % 60000) / 1000);
            const duration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            validResults.push({
                id: generateId('ne', `${song.name}-${song.id}`),
                title: song.name,
                artist: artists.map((a: any) => a.name).join('/'),
                cover: cover || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop',
                src: src,
                duration: duration,
                lyric: sanitizeLyric(lyric) || '[00:00.00]暂无歌词'
            });
            
            // Stop after finding 1 valid result
            break;
        }
    }
    
    console.log(`NetEase found ${validResults.length} valid results for "${keyword}"`);
    return validResults;

  } catch (error) {
    console.error(`NetEase search failed for ${keyword}`, error);
  }
  return [];
}

export async function searchMusic(keyword: string): Promise<SearchResult[]> {
  // Strict Priority: NetEase (Strict) -> KuGou (Smart) -> NetEase (Loose/Fallback)
  // Parallel Execution: Start all requests at once to beat the timeout clock.
  // Increase limits to get more results (e.g. 50 + 50)
  
  // 1. Start all tasks
  // NetEase Strict: fetch 50, validate top ones.
  const neTask = searchNetEase(keyword, true, 50); 
  // KuGou: fetch 50
  const kgTask = searchKuGou(keyword, 50);
  
  // Wait for NetEase Strict first (timeout 2s inside)
  const neResults = await neTask;
  if (neResults.length > 0) return neResults;

  // If NetEase fails, KuGou should be ready soon (timeout 5s inside)
  const kgResults = await kgTask;
  if (kgResults.length > 0) return kgResults;

  // If both fail, try NetEase Loose (no HEAD check) with higher limit
  const neLoose = await searchNetEase(keyword, false, 100);
  return neLoose;
}

export async function fetchNetEasePlaylist(playlistId: string): Promise<SearchResult[]> {
    console.log(`[NetEase] Fetching playlist: ${playlistId}`);
    
    // Try multiple endpoints or retries
    const endpoints = [
        `http://music.163.com/api/playlist/detail?id=${playlistId}`,
        `https://music.163.com/api/v3/playlist/detail?id=${playlistId}`, // Backup (might fail auth but worth a try for public)
    ];

    for (let attempt = 0; attempt < 3; attempt++) {
        try {
            const url = endpoints[0]; // Stick to the reliable old API first
            const res = await axios.get(url, {
                headers: {
                    'Referer': 'https://music.163.com/',
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Cookie': 'os=pc; NMTID=00Oxxx; __remember_me=true' // Add dummy cookies to look more real
                },
                timeout: 15000 // Increased timeout
            });

            if (res.data && res.data.code === 200 && res.data.result && res.data.result.tracks && res.data.result.tracks.length > 0) {
                const tracks = res.data.result.tracks;
                console.log(`[NetEase] Playlist fetched (Attempt ${attempt+1}): ${tracks.length} songs`);
                return tracks.map((track: any) => {
                    const artists = track.artists || track.ar || [];
                    const album = track.album || track.al || {};
                    const durationMs = track.duration || track.dt || 0;
                    const minutes = Math.floor(durationMs / 60000);
                    const seconds = Math.floor((durationMs % 60000) / 1000);
                    const duration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

                    return {
                        id: generateId('ne', `${track.name}-${track.id}`),
                        title: track.name,
                        artist: artists.map((a: any) => a.name).join('/'),
                        cover: album.picUrl || 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&h=500&fit=crop',
                        src: `https://music.163.com/song/media/outer/url?id=${track.id}.mp3`,
                        duration: duration,
                        lyric: ''
                    };
                });
            }
        } catch (e) {
            console.warn(`NetEase playlist fetch attempt ${attempt+1} failed`, e);
            // Wait 1s before retry
            await new Promise(r => setTimeout(r, 1000));
        }
    }
    
    // If specific playlist fails, maybe try fallback to Soaring Chart (19723756) IF the original request was NOT Soaring Chart?
    // This ensures user sees SOMETHING rather than empty list.
    if (playlistId !== '19723756') {
        console.warn(`[NetEase] Primary playlist ${playlistId} failed, trying fallback to Soaring Chart...`);
        return fetchNetEasePlaylist('19723756');
    }

    return [];
}
