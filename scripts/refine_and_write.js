const axios = require('axios');
const fs = require('fs');
const path = require('path');

const resolvedPath = path.join(__dirname, 'netease_resolved.json');
let songs = JSON.parse(fs.readFileSync(resolvedPath, 'utf8'));

// Netease Search API
const SEARCH_URL = 'http://music.163.com/api/search/get/web';

async function resolveSongStrict(title) {
  try {
    // console.log(`Retry searching: ${title}...`);
    const res = await axios.get(SEARCH_URL, {
      params: {
        s: title, // Title only
        type: 1,
        offset: 0,
        total: true,
        limit: 1,
        csrf_token: ''
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Referer': 'http://music.163.com/'
      },
      timeout: 5000
    });

    if (res.data && res.data.result && res.data.result.songs && res.data.result.songs.length > 0) {
      const bestMatch = res.data.result.songs[0];
      return {
        id: `ne_${bestMatch.id}`,
        cover: bestMatch.album.picUrl,
        src: `http://music.163.com/song/media/outer/url?id=${bestMatch.id}.mp3`
      };
    }
    return null;
  } catch (err) {
    return null;
  }
}

// Fallback pool of 5 verified audio URLs
const FALLBACK_AUDIO = [
  "https://sharefs.kugou.com/202603091616/8b623685714faf835dfcdaa9017bb802/v3/aae144b41cb32d4256e02c17cfef0a29/yp/full/ap1000_us0_pi409_s683808862.mp3",
  "https://sharefs.kugou.com/202603091617/599e825b5d7bd3a6187c4a25d7b17ab6/v3/189e8faebeab03373a351c6608ff9438/yp/full/ap1000_us0_pi409_s3278858405.mp3",
  "https://er-sycdn.kuwo.cn/6cebcb101ce185087c4fed542ca25faa/69ae8272/resource/30106/trackmedia/M500003vmLwC2YAwyH.mp3",
  "https://er-sycdn.kuwo.cn/fd59f4a410956cbe355de461c6219b51/69ae8272/resource/30106/trackmedia/M500002nn1LQ2kG4Gz.mp3",
  "https://sharefs.kugou.com/202603091618/1c76eb0fd75e05ec3a0a39ef76445d0d/v3/afea9ffe5d7f0ef0874119a363820d33/yp/full/ap1000_us0_pi409_s3032561284.mp3"
];

async function refine() {
  let successCount = 0;
  
  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    
    // Check if it's a fallback entry (id starts with 'fb_')
    if (song.id.startsWith('fb_') || !song.src) {
      // Try searching by TITLE ONLY
      // Strip potential extra info in brackets like (Remix)
      const cleanTitle = song.title.split('(')[0].trim();
      
      const retry = await resolveSongStrict(cleanTitle);
      
      if (retry) {
        // Success! Update the entry but keep original title/artist for display
        songs[i] = {
          ...song,
          id: retry.id,
          cover: retry.cover,
          src: retry.src
        };
        successCount++;
        process.stdout.write('+');
      } else {
        // Still failed. Ensure valid fallback audio and cover.
        songs[i].src = FALLBACK_AUDIO[i % FALLBACK_AUDIO.length];
        // Ensure cover is a valid URL (Unsplash with title seed)
        songs[i].cover = `https://images.unsplash.com/photo-${i % 2 === 0 ? '1511671782779-c97d3d27a1d4' : '1493225255756-d9584f8606e9'}?w=300&h=300&fit=crop&txt=${encodeURIComponent(song.title)}&txt-size=20&txt-color=fff&txt-align=middle,center&txt-fit=max`;
        process.stdout.write('-');
      }
      
      // Delay
      await new Promise(r => setTimeout(r, 200));
    } else {
      process.stdout.write('.'); // Already good
    }
  }
  
  console.log(`\nRefined search found ${successCount} more songs.`);
  
  // Write to data.ts directly
  const tsContent = `
export interface Song {
  id: string
  title: string
  artist: string
  cover: string
  src: string
  duration: string
}

export interface Playlist {
  id: string
  title: string
  cover: string
  gradient: string
  songs: Song[]
}

const TOP_SONGS: Song[] = ${JSON.stringify(songs, null, 2)};

// Helper to shuffle array for other lists
function shuffle(array: any[]) {
  let currentIndex = array.length,  randomIndex;
  const newArray = [...array];

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex], newArray[currentIndex]];
  }
  return newArray;
}

export const playlists: Playlist[] = [
  {
    id: "top", 
    title: "TOP榜单", 
    cover: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=500&h=500&fit=crop",
    gradient: "from-purple-500 via-fuchsia-400 to-pink-300",
    songs: TOP_SONGS
  },
  {
    id: "ustop", 
    title: "欧美榜单", 
    cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=500&h=500&fit=crop",
    gradient: "from-blue-500 via-cyan-400 to-sky-300",
    songs: shuffle(TOP_SONGS).map((s, i) => ({ ...s, id: \`us_\${i}\` }))
  },
  {
    id: "ndtop", 
    title: "内地榜单", 
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
    gradient: "from-indigo-600 via-purple-500 to-fuchsia-400",
    songs: shuffle(TOP_SONGS).map((s, i) => ({ ...s, id: \`nd_\${i}\` }))
  },
  {
    id: "original", 
    title: "原创歌手", 
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop",
    gradient: "from-teal-500 via-emerald-400 to-green-300",
    songs: shuffle(TOP_SONGS).map((s, i) => ({ ...s, id: \`org_\${i}\` }))
  },
  {
    id: "gedan", 
    title: "音乐歌单", 
    cover: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=500&h=500&fit=crop",
    gradient: "from-amber-500 via-orange-400 to-yellow-300",
    songs: shuffle(TOP_SONGS).map((s, i) => ({ ...s, id: \`gd_\${i}\` }))
  },
  {
    id: "hot", 
    title: "网络热歌", 
    cover: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=500&h=500&fit=crop",
    gradient: "from-rose-500 via-pink-400 to-red-300",
    songs: shuffle(TOP_SONGS).map((s, i) => ({ ...s, id: \`hot_\${i}\` }))
  }
];
`;

  fs.writeFileSync(path.join(__dirname, '../src/lib/data.ts'), tsContent);
  console.log('Final data.ts written.');
}

refine();
