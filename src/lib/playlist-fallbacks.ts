import { getFallbackAudio } from './fallback';

type FallbackSeed = {
  title: string;
  artist: string;
};

export type FallbackSong = {
  id: string;
  title: string;
  artist: string;
  cover: string;
  src: string;
  duration: string;
};

const FALLBACK_COVERS: Record<string, string> = {
  top: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=500&h=500&fit=crop",
  ustop: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=500&h=500&fit=crop",
  ndtop: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
  korean: "https://images.unsplash.com/photo-1610935591850-9a3bf14810c0?w=500&h=500&fit=crop",
  japanese: "https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?w=500&h=500&fit=crop",
  soaring: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&h=500&fit=crop",
  ancient_sad: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=500&h=500&fit=crop",
  netease_new: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
};

const FALLBACK_SEEDS: Record<string, FallbackSeed[]> = {
  soaring: [
    { title: '孤勇者', artist: '陈奕迅' },
    { title: '人世间', artist: '雷佳' },
    { title: '如愿', artist: '王菲' },
    { title: '漠河舞厅', artist: '柳爽' },
    { title: '这世界那么多人', artist: '莫文蔚' },
  ],
  netease_new: [
    { title: '离别开出花', artist: '就是南方凯' },
    { title: '若月亮没来', artist: '王宇宙Leto' },
    { title: '我记得', artist: '赵雷' },
    { title: '姑娘别哭泣', artist: '柯柯柯啊' },
    { title: '小城夏天', artist: 'LBI利比' },
  ],
  top: [
    { title: '晴天', artist: '周杰伦' },
    { title: '七里香', artist: '周杰伦' },
    { title: '夜曲', artist: '周杰伦' },
    { title: '稻香', artist: '周杰伦' },
    { title: '一路向北', artist: '周杰伦' },
  ],
  ndtop: [
    { title: '青花瓷', artist: '周杰伦' },
    { title: '后来', artist: '刘若英' },
    { title: '演员', artist: '薛之谦' },
    { title: '平凡之路', artist: '朴树' },
    { title: '像我这样的人', artist: '毛不易' },
  ],
  ustop: [
    { title: 'Stay', artist: 'The Kid LAROI / Justin Bieber' },
    { title: 'Easy On Me', artist: 'Adele' },
    { title: 'Blinding Lights', artist: 'The Weeknd' },
    { title: 'Flowers', artist: 'Miley Cyrus' },
    { title: 'As It Was', artist: 'Harry Styles' },
  ],
  ancient_sad: [
    { title: 'Summertime', artist: 'Cinnamons x Evening Cinema' },
    { title: 'Way Back Home', artist: 'SHAUN' },
    { title: 'Faded', artist: 'Alan Walker' },
    { title: 'Paris in the Rain', artist: 'Lauv' },
    { title: 'Until I Found You', artist: 'Stephen Sanchez' },
  ],
  korean: [
    { title: 'Ditto', artist: 'NewJeans' },
    { title: 'Supernova', artist: 'aespa' },
    { title: 'Butter', artist: 'BTS' },
    { title: 'Love Scenario', artist: 'iKON' },
    { title: 'How You Like That', artist: 'BLACKPINK' },
  ],
  japanese: [
    { title: '打上花火', artist: 'DAOKO / 米津玄师' },
    { title: '红莲华', artist: 'LiSA' },
    { title: '群青', artist: 'YOASOBI' },
    { title: '夜に駆ける', artist: 'YOASOBI' },
    { title: 'Pretender', artist: 'Official髭男dism' },
  ],
};

function buildSongs(playlistId: string, seeds: FallbackSeed[]): FallbackSong[] {
  const cover = FALLBACK_COVERS[playlistId] ?? FALLBACK_COVERS.top;

  return seeds.map((seed, index) => {
    const id = `${playlistId}_fallback_${index + 1}`;
    return {
      id,
      title: seed.title,
      artist: seed.artist,
      cover,
      src: getFallbackAudio(id),
      duration: '03:30',
    };
  });
}

export function getPlaylistFallback(id: string): FallbackSong[] {
  const seeds = FALLBACK_SEEDS[id];
  if (!seeds) return [];
  return buildSongs(id, seeds);
}
