const fs = require('fs');

// 高可用 Unsplash 图片池 (音乐主题)
const COVER_POOL = [
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 
  'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 
  'https://images.unsplash.com/photo-1514525253440-b393452e8d03?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 
  'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 
  'https://images.unsplash.com/photo-1619983081563-430f63602796?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 
  'https://images.unsplash.com/photo-1459749411177-287ce3288b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 
  'https://images.unsplash.com/photo-1506157786151-b8491531f063?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 
  'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 
  'https://images.unsplash.com/photo-1487180144351-b8472da7d4f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 
  'https://images.unsplash.com/photo-1516280440614-6697288d5d38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', 
];

// 真实的中文歌名库 (50首不同)
const SONG_TITLES = [
  "孤勇者", "Stay", "麻雀", "起风了", "芒种", "悬溺", "不用去猜", "Lemon", "Kill This Love", "Levitating",
  "若月亮没来", "奢香夫人", "笼", "想去海边", "晚风告白", "多远都要在一起", "泡沫", "光年之外", "来自天堂的魔鬼", "倒数",
  "句号", "画", "桃花诺", "不染", "知否知否", "大鱼", "默", "匆匆那年", "红豆", "传奇",
  "因为爱情", "简单爱", "晴天", "七里香", "稻香", "夜曲", "告白气球", "青花瓷", "发如雪", "菊花台",
  "千里之外", "本草纲目", "龙拳", "霍元甲", "双截棍", "听妈妈的话", "彩虹", "轨迹", "一路向北", "珊瑚海"
];

// 对应歌手
const ARTISTS = [
  "陈奕迅", "The Kid LAROI", "李荣浩", "买辣椒也用券", "音阙诗听", "葛东琪", "Jony J", "米津玄师", "BLACKPINK", "Dua Lipa",
  "王宇宙", "凤凰传奇", "张碧晨", "夏日入侵企画", "星野", "G.E.M.邓紫棋", "G.E.M.邓紫棋", "G.E.M.邓紫棋", "G.E.M.邓紫棋", "G.E.M.邓紫棋",
  "G.E.M.邓紫棋", "G.E.M.邓紫棋", "G.E.M.邓紫棋", "毛不易", "胡夏", "周深", "那英", "王菲", "王菲", "王菲",
  "陈奕迅", "周杰伦", "周杰伦", "周杰伦", "周杰伦", "周杰伦", "周杰伦", "周杰伦", "周杰伦", "周杰伦",
  "周杰伦", "周杰伦", "周杰伦", "周杰伦", "周杰伦", "周杰伦", "周杰伦", "周杰伦", "周杰伦", "周杰伦"
];

// 高可用音频 Demo 池 (来自 Unsplash 或 免版权音效库，确保 100% 可播放)
// 由于网易云外链有防盗链，我们改用更稳定的免版权音乐库或GitHub托管的Demo
// 这里使用一些公开可访问的 MP3 测试链接
const AUDIO_POOL = [
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
  'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
];

const CATEGORIES = [
  { id: 'soaring', title: '飙升榜', desc: '每天更新' },
  { id: 'hot', title: '热歌榜', desc: '全网热歌' },
  { id: 'new', title: '新歌榜', desc: '最新单曲' },
  { id: 'douyin', title: '抖音排行榜', desc: '短视频神曲' },
  { id: 'rap', title: '说唱榜', desc: '中文说唱' },
  { id: 'electronic', title: '电音榜', desc: '全球电音' },
  { id: 'acg', title: 'ACG 动画榜', desc: '二次元' },
  { id: 'ancient', title: '古风榜', desc: '国风音乐' },
  { id: 'western', title: '欧美热歌榜', desc: 'Billboard' },
  { id: 'kpop', title: '韩语榜', desc: 'K-Pop' },
  { id: 'japan', title: '日语榜', desc: 'J-Pop' },
  { id: 'original', title: '原创榜', desc: '独立音乐' },
];

function generateRobustData() {
  const playlists = CATEGORIES.map((cat, catIndex) => {
    // 随机选择一个封面作为该榜单的封面
    const playlistCover = COVER_POOL[catIndex % COVER_POOL.length];
    
    const songs = [];
    for (let i = 0; i < 50; i++) {
      // 循环使用音频池，确保每个都有声音
      const audioSrc = AUDIO_POOL[i % AUDIO_POOL.length];
      const cover = COVER_POOL[(i + catIndex) % COVER_POOL.length];
      
      // 使用真实的歌名和歌手
      const title = SONG_TITLES[i % SONG_TITLES.length];
      const artist = ARTISTS[i % ARTISTS.length];
      
      songs.push({
        id: `${cat.id}-${i}`,
        title: title, // 纯净歌名，不带数字后缀
        artist: artist, 
        album: `${cat.title}精选集`,
        cover: cover,
        duration: '03:30', 
        src: audioSrc
      });
    }

    return {
      id: cat.id,
      title: cat.title,
      description: cat.desc,
      cover: playlistCover,
      songs: songs
    };
  });

  const content = `export interface Song {
  id: string
  title: string
  artist: string
  album: string
  cover: string
  duration: string
  src: string
}

export interface Playlist {
  id: string
  title: string
  description: string
  cover: string
  songs: Song[]
}

export const PLAYLISTS: Playlist[] = ${JSON.stringify(playlists, null, 2)};
`;

  fs.writeFileSync('src/lib/data.ts', content);
  console.log('Robust Data generated successfully!');
}

generateRobustData();
