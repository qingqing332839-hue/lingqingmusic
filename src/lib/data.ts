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
    title: "热歌\n榜单",
    cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=500&h=500&fit=crop",
    gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
    songs: []
  },
  {
    id: "ustop",
    title: "欧美\n榜单",
    cover: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=500&h=500&fit=crop",
    gradient: "from-blue-500 via-cyan-400 to-sky-300",
    songs: []
  },
  {
    id: "ndtop",
    title: "内地\n榜单",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
    gradient: "from-indigo-600 via-purple-500 to-fuchsia-400",
    songs: []
  },
  {
    id: "douyin",
    title: "抖音\n热歌",
    cover: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=500&fit=crop",
    gradient: "from-rose-500 via-red-400 to-orange-300",
    songs: []
  },
  {
    id: "korean",
    title: "韩国\n榜单",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&h=500&fit=crop",
    gradient: "from-pink-500 via-rose-500 to-red-400",
    songs: []
  },
  {
    id: "ktv",
    title: "KTV必点热歌",
    cover: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=500&h=500&fit=crop",
    gradient: "from-purple-600 via-violet-500 to-indigo-400",
    songs: []
  },
  {
    id: "japanese",
    title: "日本\n榜单",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=500&fit=crop",
    gradient: "from-red-500 via-orange-500 to-amber-500",
    songs: []
  },
  {
    id: "folk",
    title: "乡村\n民谣",
    cover: "https://images.unsplash.com/photo-1484300681262-5cca666b0954?w=500&h=500&fit=crop",
    gradient: "from-lime-600 via-yellow-500 to-amber-300",
    songs: []
  },
  {
    id: "soaring",
    title: "飙升\n榜单",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&h=500&fit=crop",
    gradient: "from-cyan-500 via-sky-500 to-blue-500",
    songs: []
  },
  {
    id: "netease_new",
    title: "网易\n新歌",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
    gradient: "from-teal-500 via-emerald-500 to-green-500",
    songs: []
  },
  {
    id: "private_share",
    title: "原创\n榜单",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&h=500&fit=crop",
    gradient: "from-violet-600 via-fuchsia-500 to-pink-400",
    songs: []
  },
  {
    id: "electronic",
    title: "电音\n榜单",
    cover: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=500&h=500&fit=crop",
    gradient: "from-cyan-600 via-blue-500 to-indigo-400",
    songs: []
  },
  {
    id: "show_hits",
    title: "综艺\n神曲",
    cover: "https://images.unsplash.com/photo-1499364615650-ec387aa3ad11?w=500&h=500&fit=crop",
    gradient: "from-orange-500 via-amber-400 to-yellow-300",
    songs: []
  },
  {
    id: "ost",
    title: "影视\n金曲",
    cover: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=500&fit=crop",
    gradient: "from-blue-500 via-indigo-400 to-purple-300",
    songs: []
  },
  {
    id: "ancient_sad",
    title: "小语种\n热歌",
    cover: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=500&h=500&fit=crop",
    gradient: "from-[#F1D133] via-[#87B757] to-[#2DB197]",
    songs: []
  },
  {
    id: "rap",
    title: "说唱\n先锋",
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&h=500&fit=crop",
    gradient: "from-zinc-700 via-zinc-800 to-black",
    songs: []
  },
  {
    id: "acg",
    title: "ACG\n新歌",
    cover: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=500&h=500&fit=crop",
    gradient: "from-pink-400 via-rose-400 to-red-400",
    songs: []
  },
  {
    id: "hk_tw",
    title: "港台\n排行",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
    gradient: "from-blue-600 via-cyan-500 to-teal-400",
    songs: []
  },
  {
    id: "kuaishou",
    title: "快手\n热歌",
    cover: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=500&fit=crop",
    gradient: "from-orange-600 via-red-500 to-pink-500",
    songs: []
  },
  {
    id: "dj_hits",
    title: "DJ\n热歌",
    cover: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=500&h=500&fit=crop",
    gradient: "from-purple-900 via-violet-800 to-indigo-900",
    songs: []
  },
  {
    id: "cantonese",
    title: "粤语\n金曲",
    cover: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=500&h=500&fit=crop",
    gradient: "from-emerald-600 via-teal-500 to-cyan-500",
    songs: []
  },
  {
    id: "original",
    title: "原创\n音乐",
    cover: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&h=500&fit=crop",
    gradient: "from-amber-500 via-orange-500 to-yellow-500",
    songs: []
  },
  {
    id: "daily_taste",
    title: "我的\n收藏",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=500&h=500&fit=crop",
    gradient: "from-slate-700 via-slate-800 to-slate-900",
    songs: []
  },
  {
    id: "recent_plays",
    title: "最近\n播放",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
    gradient: "from-teal-600 via-emerald-500 to-green-400",
    songs: []
  }
];

// Re-export NEW_SONGS as empty for compatibility if needed elsewhere, 
// though dynamic loading should replace usage.
export const NEW_SONGS: Song[] = [];
