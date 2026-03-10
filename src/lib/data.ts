
import { getFallbackAudio } from './fallback';

export interface Song {
  id: string
  title: string
  artist: string
  cover: string
  src: string
  duration: string
  lyric?: string // LRC format lyric
}

export interface Playlist {
  id: string
  title: string
  cover: string
  gradient: string
  songs: Song[] // Will be empty initially, loaded dynamically
}

// Only metadata configuration for playlists
export const playlists: Playlist[] = [
  {
    id: "top",
    title: "TOP榜单",
    cover: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=500&h=500&fit=crop",
    gradient: "from-purple-500 via-fuchsia-400 to-pink-300",
    songs: []
  },
  {
    id: "ustop",
    title: "欧美榜单",
    cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=500&h=500&fit=crop",
    gradient: "from-blue-500 via-cyan-400 to-sky-300",
    songs: []
  },
  {
    id: "ndtop",
    title: "内地榜单",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
    gradient: "from-indigo-600 via-purple-500 to-fuchsia-400",
    songs: []
  },
  {
    id: "douyin",
    title: "抖音热歌",
    cover: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=500&fit=crop",
    gradient: "from-rose-500 via-red-400 to-orange-300",
    songs: []
  },
  {
    id: "korean",
    title: "韩语榜单",
    cover: "https://images.unsplash.com/photo-1610935591850-9a3bf14810c0?w=500&h=500&fit=crop",
    gradient: "from-pink-500 via-rose-400 to-red-300",
    songs: []
  },
  {
    id: "ktv",
    title: "KTV唛榜",
    cover: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=500&h=500&fit=crop",
    gradient: "from-purple-600 via-violet-500 to-indigo-400",
    songs: []
  },
  {
    id: "japanese",
    title: "日语榜单",
    cover: "https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?w=500&h=500&fit=crop",
    gradient: "from-red-500 via-orange-400 to-amber-300",
    songs: []
  },
  {
    id: "folk",
    title: "乡村民谣",
    cover: "https://images.unsplash.com/photo-1484300681262-5cca666b0954?w=500&h=500&fit=crop",
    gradient: "from-lime-600 via-yellow-500 to-amber-300",
    songs: []
  },
  {
    id: "soaring",
    title: "飙升榜单",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&h=500&fit=crop",
    gradient: "from-cyan-500 via-blue-400 to-indigo-300",
    songs: []
  },
  {
    id: "ost",
    title: "影视金曲",
    cover: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=500&fit=crop",
    gradient: "from-slate-700 via-gray-600 to-zinc-500",
    songs: []
  },
  {
    id: "ancient_sad",
    title: "小语种热歌",
    cover: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=500&h=500&fit=crop",
    gradient: "from-cyan-700 via-sky-600 to-blue-500",
    songs: []
  },
  {
    id: "new",
    title: "酷狗排行",
    cover: "https://images.unsplash.com/photo-1459749411177-287ce35e8b4f?w=500&h=500&fit=crop",
    gradient: "from-emerald-500 via-teal-400 to-cyan-300",
    songs: []
  }
];

// Re-export NEW_SONGS as empty for compatibility if needed elsewhere, 
// though dynamic loading should replace usage.
export const NEW_SONGS: Song[] = [];
