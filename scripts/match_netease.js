const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Exact list from user screenshot
const TOP_SONGS_RAW = [
  { title: "今生啊 多相见", artist: "万仁" },
  { title: "今生啊 多相见 (破碎版)", artist: "京六" },
  { title: "茶花开了，该回家了", artist: "王睿卓" },
  { title: "雨过后的风景", artist: "Dizzy Dizzo (蔡诗芸)" },
  { title: "小半", artist: "陈粒" },
  { title: "我曾像傻子一样爱你", artist: "老板" },
  { title: "大风在刮大雪在下 (合唱团版)", artist: "六小乐" },
  { title: "咏春 (别辜负眼前季节)", artist: "DJ.Lee" },
  { title: "红尘一路痴心荒凉", artist: "百龙" },
  { title: "友人身份", artist: "陈默默" },
  { title: "梦底", artist: "海来阿木" },
  { title: "孟婆求你赐我忘情汤", artist: "铃花儿" },
  { title: "是我不够好", artist: "李毓芬" },
  { title: "今生啊 多相见 (女版)", artist: "不是鱼" },
  { title: "Dear D (亲爱的告诉你)", artist: "项睿娴" },
  { title: "恋人", artist: "李荣浩" },
  { title: "离开我的依赖", artist: "王艳薇" },
  { title: "Amani", artist: "BEYOND" },
  { title: "读心术", artist: "卓文萱" },
  { title: "第三个吻痕 (暧昧版)", artist: "何水水" },
  { title: "别怕变老", artist: "王以太" },
  { title: "是你没选我啊", artist: "音乐科代表洪嘉源" },
  { title: "孽 (看那纯情的妖)", artist: "大猫AIGC" },
  { title: "还爱着你", artist: "文夫" },
  { title: "人间共鸣", artist: "李健" },
  { title: "从此我们再也没见 (什么风能吹动你心)", artist: "张云汐" },
  { title: "这一别是永远 (女版)", artist: "铃花儿" },
  { title: "乌兰巴托的夜 (空灵男嗓版)", artist: "王大泽" },
  { title: "咏春", artist: "七朵组合" },
  { title: "天赋", artist: "唐嫣" },
  { title: "锁 (R&B版)", artist: "呆小帅" },
  { title: "失眠", artist: "Suki刘婷婷" },
  { title: "一吻 (一吻能把你俘获么)(Remix)", artist: "李毅恩Lye" },
  { title: "痴人说梦", artist: "HOYO-Mix" },
  { title: "菩提树下我为你流泪", artist: "铃花儿" },
  { title: "我本将心向明月 (王侯将相本无种)", artist: "Dr.Phonk" },
  { title: "人间", artist: "王菲" },
  { title: "雨爱", artist: "杨丞琳" },
  { title: "NO BATIDÃO (恐龙快跑)(Explicit)", artist: "ZxKAI" },
  { title: "失眠了", artist: "吴琳珂 (莫斯珂)" },
  { title: "只对你有感觉", artist: "飞轮海/Hebe" },
  { title: "没人心疼我的伤 (我没人撑腰没人帮)", artist: "王超" },
  { title: "陪你看星星", artist: "许嵩" },
  { title: "佛前求了千百遍", artist: "广东雨神" },
  { title: "精卫", artist: "30年前，50年后" },
  { title: "若月亮没来", artist: "王宇宙" },
  { title: "离别开出花", artist: "鱼闪闪" },
  { title: "乌梅子酱", artist: "李荣浩" },
  { title: "罗刹海市", artist: "刀郎" },
  { title: "奢香夫人", artist: "凤凰传奇" }
];

// Netease Search API
const SEARCH_URL = 'http://music.163.com/api/search/get/web';

async function resolveSong(song) {
  try {
    const keyword = `${song.title} ${song.artist}`;
    // console.log(`Searching: ${keyword}...`);
    
    const res = await axios.get(SEARCH_URL, {
      params: {
        s: keyword,
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
      // console.log(`  -> Found: ${bestMatch.name} (ID: ${bestMatch.id})`);
      
      return {
        id: `ne_${bestMatch.id}`,
        title: song.title, // Keep original title for consistency with user request
        artist: song.artist, // Keep original artist
        cover: bestMatch.album.picUrl,
        src: `http://music.163.com/song/media/outer/url?id=${bestMatch.id}.mp3`,
        duration: "03:30" // Placeholder, but reliable enough
      };
    } else {
      console.log(`  -> Not found: ${keyword}`);
      // Fallback to generic if not found (but keep trying others)
      return null;
    }
  } catch (err) {
    console.log(`  -> Error: ${err.message}`);
    return null;
  }
}

async function main() {
  const resolvedSongs = [];
  
  for (const song of TOP_SONGS_RAW) {
    // Add small random delay to be nice
    await new Promise(r => setTimeout(r, 200 + Math.random() * 300));
    
    const resolved = await resolveSong(song);
    if (resolved) {
      resolvedSongs.push(resolved);
      process.stdout.write('.'); // Progress dot
    } else {
      // Keep it but mark as fallback needed
      resolvedSongs.push({
        ...song,
        id: `fb_${Math.random().toString(36).substr(2, 9)}`,
        cover: `https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop&text=${encodeURIComponent(song.title)}`, // Better fallback
        src: '', // Empty source means we might need a backup audio
        duration: "03:30"
      });
      process.stdout.write('x');
    }
  }
  
  console.log(`\nResolved ${resolvedSongs.filter(s => s.src).length}/${resolvedSongs.length} songs.`);
  
  // Save to file
  fs.writeFileSync(path.join(__dirname, 'netease_resolved.json'), JSON.stringify(resolvedSongs, null, 2));
}

main();
