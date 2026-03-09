const axios = require('axios');
const fs = require('fs');
const path = require('path');

// 1. Read existing data.ts to extract songs
const dataPath = path.join(__dirname, '../src/lib/data.ts');
const content = fs.readFileSync(dataPath, 'utf8');

const match = content.match(/const TOP_SONGS: Song\[] = (\[[\s\S]*?\]);/);
if (!match) {
  console.error('Could not find TOP_SONGS array in data.ts');
  process.exit(1);
}

const songs = JSON.parse(match[1]);
console.log(`Processing ${songs.length} songs for duration update...`);

// Netease Detail API
const DETAIL_URL = 'http://music.163.com/api/song/detail';

// Helper to format ms to MM:SS
function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

async function updateDurations() {
  const updatedSongs = [];
  
  // Extract Netease IDs
  const ids = songs
    .filter(s => s.id.startsWith('ne_'))
    .map(s => s.id.replace('ne_', ''));
    
  // Process in chunks of 50 (API limit)
  // Actually we have less than 50 now, so one batch is fine
  if (ids.length > 0) {
    try {
      console.log(`Fetching details for ${ids.length} songs...`);
      const res = await axios.get(DETAIL_URL, {
        params: {
          ids: `[${ids.join(',')}]`
        },
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'http://music.163.com/'
        },
        timeout: 5000
      });

      const detailsMap = {};
      if (res.data && res.data.songs) {
        res.data.songs.forEach(song => {
          detailsMap[song.id] = song.duration;
        });
      }

      // Update songs
      for (const song of songs) {
        const neId = song.id.replace('ne_', '');
        if (detailsMap[neId]) {
          const realDuration = formatDuration(detailsMap[neId]);
          // console.log(`Updated ${song.title}: ${realDuration}`);
          updatedSongs.push({ ...song, duration: realDuration });
        } else {
          updatedSongs.push(song);
        }
      }

    } catch (e) {
      console.error('Failed to fetch details:', e.message);
      updatedSongs.push(...songs);
    }
  } else {
    updatedSongs.push(...songs);
  }

  // Generate new data.ts content
  // Remove the shuffle/padding logic as requested
  const newContent = `import { getFallbackAudio } from './fallback';

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

const TOP_SONGS: Song[] = ${JSON.stringify(updatedSongs, null, 2)}.map(song => ({
  ...song,
  src: song.src || getFallbackAudio(song.id)
}));

// No shuffling or padding - use EXACT list for all categories for now to match 33ve structure
// In a real app, we would scrape each category separately.
// Since user asked to match 33ve Top List specifically, we use this exact list.

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
    songs: TOP_SONGS // Placeholder: Using same high-quality list
  },
  {
    id: "ndtop", 
    title: "内地榜单", 
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
    gradient: "from-indigo-600 via-purple-500 to-fuchsia-400",
    songs: TOP_SONGS // Placeholder
  },
  {
    id: "original", 
    title: "原创歌手", 
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop",
    gradient: "from-teal-500 via-emerald-400 to-green-300",
    songs: TOP_SONGS // Placeholder
  },
  {
    id: "gedan", 
    title: "音乐歌单", 
    cover: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=500&h=500&fit=crop",
    gradient: "from-amber-500 via-orange-400 to-yellow-300",
    songs: TOP_SONGS // Placeholder
  },
  {
    id: "hot", 
    title: "网络热歌", 
    cover: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=500&h=500&fit=crop",
    gradient: "from-rose-500 via-pink-400 to-red-300",
    songs: TOP_SONGS // Placeholder
  }
];
`;

  fs.writeFileSync(path.join(__dirname, '../src/lib/data.ts'), newContent);
  console.log('Updated data.ts with real durations and exact count.');
}

updateDurations();
