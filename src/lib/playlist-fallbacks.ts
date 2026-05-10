import {
  POOL_BANDS,
  POOL_CLASSIC,
  POOL_DOUYIN,
  POOL_FOLK,
  POOL_KTV,
  POOL_NEW_VOICE,
  POOL_OST,
  POOL_POP_HITS,
  POOL_RB,
  POOL_SHOW,
  POOL_WESTERN,
  POOL_WORKOUT,
} from './migu-data-pools';

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
  top: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=500&h=500&fit=crop',
  ustop: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=500&h=500&fit=crop',
  ndtop: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop',
  douyin: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=500&fit=crop',
  korean: 'https://images.unsplash.com/photo-1610935591850-9a3bf14810c0?w=500&h=500&fit=crop',
  japanese: 'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?w=500&h=500&fit=crop',
  folk: 'https://images.unsplash.com/photo-1484300681262-5cca666b0954?w=500&h=500&fit=crop',
  soaring: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&h=500&fit=crop',
  netease_new: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop',
  private_share: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&h=500&fit=crop',
  electronic: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=500&h=500&fit=crop',
  show_hits: 'https://images.unsplash.com/photo-1499364615650-ec387aa3ad11?w=500&h=500&fit=crop',
  ost: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=500&fit=crop',
  ancient_sad: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=500&h=500&fit=crop',
  rap: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&h=500&fit=crop',
  acg: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=500&h=500&fit=crop',
  hk_tw: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop',
  kuaishou: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&h=500&fit=crop',
  dj_hits: 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=500&h=500&fit=crop',
  cantonese: 'https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=500&h=500&fit=crop',
  original: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&h=500&fit=crop',
};

const KOREAN_SONGS: FallbackSeed[] = [
  { title: 'Ditto', artist: 'NewJeans' },
  { title: 'Hype Boy', artist: 'NewJeans' },
  { title: 'ETA', artist: 'NewJeans' },
  { title: 'Supernova', artist: 'aespa' },
  { title: 'Drama', artist: 'aespa' },
  { title: 'Spicy', artist: 'aespa' },
  { title: 'How You Like That', artist: 'BLACKPINK' },
  { title: 'Shut Down', artist: 'BLACKPINK' },
  { title: 'Pink Venom', artist: 'BLACKPINK' },
  { title: 'Love Scenario', artist: 'iKON' },
  { title: 'Butter', artist: 'BTS' },
  { title: 'Dynamite', artist: 'BTS' },
  { title: 'Spring Day', artist: 'BTS' },
  { title: 'Next Level', artist: 'aespa' },
  { title: 'After LIKE', artist: 'IVE' },
  { title: 'I AM', artist: 'IVE' },
  { title: 'Magnetic', artist: 'ILLIT' },
  { title: 'Queencard', artist: '(G)I-DLE' },
  { title: 'TOMBOY', artist: '(G)I-DLE' },
  { title: 'MANIAC', artist: 'Stray Kids' },
];

const JAPANESE_SONGS: FallbackSeed[] = [
  { title: '夜に駆ける', artist: 'YOASOBI' },
  { title: '群青', artist: 'YOASOBI' },
  { title: 'アイドル', artist: 'YOASOBI' },
  { title: '打上花火', artist: 'DAOKO / 米津玄师' },
  { title: 'Lemon', artist: '米津玄师' },
  { title: 'KICK BACK', artist: '米津玄师' },
  { title: 'Pretender', artist: 'Official髭男dism' },
  { title: 'Subtitle', artist: 'Official髭男dism' },
  { title: '红莲华', artist: 'LiSA' },
  { title: '炎', artist: 'LiSA' },
  { title: '残酷な天使のテーゼ', artist: '高桥洋子' },
  { title: 'クリスマスソング', artist: 'back number' },
  { title: '白日', artist: 'King Gnu' },
  { title: '水平線', artist: 'back number' },
  { title: '奏', artist: 'スキマスイッチ' },
  { title: '怪獣の花唄', artist: 'Vaundy' },
  { title: 'First Love', artist: '宇多田ヒカル' },
  { title: '丸の内サディスティック', artist: '椎名林檎' },
  { title: '青鸟', artist: '生物股长' },
  { title: '恋爱循环', artist: '花泽香菜' },
];

const FOREIGN_SONGS: FallbackSeed[] = [
  { title: 'Way Back Home', artist: 'SHAUN' },
  { title: 'Summertime', artist: 'Cinnamons x Evening Cinema' },
  { title: 'Until I Found You', artist: 'Stephen Sanchez' },
  { title: 'Paris in the Rain', artist: 'Lauv' },
  { title: 'Faded', artist: 'Alan Walker' },
  { title: 'Reality', artist: 'Lost Frequencies' },
  { title: 'Señorita', artist: 'Shawn Mendes / Camila Cabello' },
  { title: 'Believer', artist: 'Imagine Dragons' },
  { title: 'Counting Stars', artist: 'OneRepublic' },
  { title: 'Someone You Loved', artist: 'Lewis Capaldi' },
  { title: 'Sugar', artist: 'Maroon 5' },
  { title: 'Shape of You', artist: 'Ed Sheeran' },
  { title: 'Blank Space', artist: 'Taylor Swift' },
  { title: 'Counting Sheep', artist: 'SAFIA' },
  { title: 'Attention', artist: 'Charlie Puth' },
];

const RAP_SONGS: FallbackSeed[] = [
  { title: 'MELBOURNE', artist: 'Higher Brothers' },
  { title: 'Made in China', artist: 'Higher Brothers / Famous Dex' },
  { title: '星球坠落', artist: '艾热 / 李佳隆' },
  { title: '麒麟', artist: '早安' },
  { title: '经济舱', artist: 'KEY.L刘聪' },
  { title: '目不转睛', artist: '王以太' },
  { title: '刘玉玲', artist: '满舒克' },
  { title: '不用去猜', artist: 'Jony J' },
  { title: '贫民窟艺术家', artist: 'GAI' },
  { title: '山岚', artist: 'GAI' },
  { title: '隆里电丝', artist: '盛宇D-SHINE / KEY.L刘聪' },
  { title: '别怕变老', artist: '艾热' },
  { title: '飞蛾', artist: '王以太' },
  { title: '租购', artist: '法老 / 小精灵' },
  { title: '飘向北方', artist: '黄明志 / 王力宏' },
];

const ACG_SONGS: FallbackSeed[] = [
  { title: '红莲华', artist: 'LiSA' },
  { title: '青鸟', artist: '生物股长' },
  { title: '极乐净土', artist: 'GARNiDELiA' },
  { title: '打上花火', artist: 'DAOKO / 米津玄师' },
  { title: '恋爱循环', artist: '花泽香菜' },
  { title: '残酷な天使のテーゼ', artist: '高桥洋子' },
  { title: 'only my railgun', artist: 'fripSide' },
  { title: 'unravel', artist: 'TK from 凛として時雨' },
  { title: 'secret base', artist: 'ZONE' },
  { title: 'Butter-Fly', artist: '和田光司' },
  { title: 'Gurenge', artist: 'LiSA' },
  { title: 'シルエット', artist: 'KANA-BOON' },
  { title: 'oath sign', artist: 'LiSA' },
  { title: '空色デイズ', artist: '中川翔子' },
  { title: '名前のない怪物', artist: 'EGOIST' },
];

const FALLBACK_SEEDS: Record<string, FallbackSeed[]> = {
  top: POOL_POP_HITS,
  ustop: POOL_WESTERN,
  ndtop: POOL_POP_HITS,
  douyin: POOL_DOUYIN,
  korean: KOREAN_SONGS,
  japanese: JAPANESE_SONGS,
  folk: POOL_FOLK,
  soaring: POOL_NEW_VOICE,
  netease_new: POOL_NEW_VOICE,
  private_share: POOL_BANDS,
  electronic: POOL_WORKOUT,
  show_hits: POOL_SHOW,
  ost: POOL_OST,
  ancient_sad: FOREIGN_SONGS,
  rap: RAP_SONGS,
  acg: ACG_SONGS,
  hk_tw: POOL_CLASSIC,
  kuaishou: POOL_DOUYIN,
  dj_hits: POOL_WORKOUT,
  cantonese: POOL_CLASSIC,
  original: POOL_RB,
  ktv: POOL_KTV,
};

function dedupeSongs(songs: FallbackSeed[]): FallbackSeed[] {
  const seen = new Set<string>();
  return songs.filter((song) => {
    const key = `${song.title}__${song.artist}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildSongs(playlistId: string, seeds: FallbackSeed[], limit: number = 60): FallbackSong[] {
  const cover = FALLBACK_COVERS[playlistId] ?? FALLBACK_COVERS.top;
  const uniqueSeeds = dedupeSongs(seeds).slice(0, limit);

  return uniqueSeeds.map((seed, index) => ({
    id: `${playlistId}_fallback_${index + 1}`,
    title: seed.title,
    artist: seed.artist,
    cover,
    src: '',
    duration: '00:00',
  }));
}

export function getPlaylistFallback(id: string): FallbackSong[] {
  const seeds = FALLBACK_SEEDS[id];
  if (!seeds) return [];
  return buildSongs(id, seeds);
}
