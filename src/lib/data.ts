import { getFallbackAudio } from './fallback';

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

const TOP_SONGS: Song[] = [
  {
    "id": "top_v3_0",
    "title": "今生啊 多相见",
    "artist": "万仁",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251105/20251105142049685359.jpg",
    "src": "https://sharefs.kugou.com/202603091951/88fa5c598355b71165a8cd6d95cf4af3/v3/aae144b41cb32d4256e02c17cfef0a29/yp/full/ap1000_us0_pi409_s683808862.mp3",
    "duration": "03:44"
  },
  {
    "id": "top_v3_1",
    "title": "今生啊 多相见 (破碎版)",
    "artist": "京六",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260227/20260227145710348133.jpg",
    "src": "https://sharefs.kugou.com/202603091950/af78f97deb6307be247d8658d0129c51/v3/189e8faebeab03373a351c6608ff9438/yp/full/ap1000_us0_pi409_s3278858405.mp3",
    "duration": "04:49"
  },
  {
    "id": "top_v3_4",
    "title": "小半",
    "artist": "陈粒",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230420/20230420153112832268.jpg",
    "src": "https://sharefs.kugou.com/202603091951/caa4e0fcbcd01d042ad1ffb188cf2310/v3/afea9ffe5d7f0ef0874119a363820d33/yp/full/ap1000_us0_pi409_s3032561284.mp3",
    "duration": "04:57"
  },
  {
    "id": "top_v3_5",
    "title": "我曾像傻子一样爱你",
    "artist": "老板",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230420/20230420152703901247.jpg",
    "src": "https://sharefs.kugou.com/202603091951/3f8b627a17425a591b9a8daae409db4f/v3/85f18c8a9470c0be7bd1d679acfc6e21/yp/full/ap1000_us0_pi409_s303004453.mp3",
    "duration": "04:03"
  },
  {
    "id": "top_v3_6",
    "title": "咏春 (别辜负眼前季节)",
    "artist": "DJ.Lee",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20241008/20241008210801640430.jpg",
    "src": "https://sharefs.kugou.com/202603091951/471211a013d21fff5916ef83f78d368c/v3/3578b7b86a6f3fcf732190f1e37ab300/yp/full/ap1000_us0_pi409_s938173162.mp3",
    "duration": "02:56"
  },
  {
    "id": "top_v3_7",
    "title": "大风在刮大雪在下 (合唱团版)",
    "artist": "六小乐",
    "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=3336882705.mp3",
    "duration": "02:56"
  },
  {
    "id": "top_v3_8",
    "title": "红尘一路痴心荒凉",
    "artist": "百龙",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260228/20260228142843281156.jpg",
    "src": "https://sharefs.kugou.com/202603091951/727773c4255bbf446e051cfcdcaa54f5/v3/d9fcece0e7f77d3a5195333816a4be8e/yp/full/ap1000_us0_pi409_s2474941383.mp3",
    "duration": "02:54"
  },
  {
    "id": "top_v3_9",
    "title": "友人身份",
    "artist": "陈默默",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251027/20251027144121272174.jpg",
    "src": "https://sharefs.kugou.com/202603091951/bef752b56db6dbea4f41bc99aaba452b/v3/cf2b8233d1d6b98770d0ac7984171ffc/yp/full/ap1000_us0_pi409_s2997158939.mp3",
    "duration": "03:45"
  },
  {
    "id": "top_v3_10",
    "title": "梦底",
    "artist": "海来阿木",
    "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=3350650849.mp3",
    "duration": "03:07"
  },
  {
    "id": "top_v3_14",
    "title": "今生啊 多相见 (女版)",
    "artist": "不是鱼",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251223/20251223132722830545.jpg",
    "src": "https://sharefs.kugou.com/202603091951/aaed7b523537dfacafa8f2ba11d1d685/v3/a5a7231eda5bcb4d704b3ab69a5cf6cb/yp/full/ap1000_us0_pi409_s2723994405.mp3",
    "duration": "04:06"
  },
  {
    "id": "top_v3_17",
    "title": "孟婆求你赐我忘情汤",
    "artist": "铃花儿",
    "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=3349937435.mp3",
    "duration": "02:40"
  },
  {
    "id": "top_v3_19",
    "title": "第三个吻痕 (暧昧版)",
    "artist": "何水水",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250606/20250606163648445588.jpg",
    "src": "https://sharefs.kugou.com/202603091951/b40f7139d9b4c9dfc782dc44f7fffecf/v3/3d9903853a788b129d1f0121cabc4264/yp/full/ap1000_us0_pi409_s3837556536.mp3",
    "duration": "02:27"
  },
  {
    "id": "top_restored_21",
    "title": "别怕变老",
    "artist": "王以太",
    "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=1876179147.mp3",
    "duration": "03:30"
  },
  {
    "id": "top_v3_22",
    "title": "还爱着你",
    "artist": "文夫",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250529/20250529181948591667.jpg",
    "src": "https://sharefs.kugou.com/202603091951/ae3590574499a4bcce566e153836712a/v3/a61924d891c970a28150fdf9e5e56c53/yp/full/ap1000_us0_pi409_s2429223943.mp3",
    "duration": "03:52"
  },
  {
    "id": "top_v3_24",
    "title": "从此我们再也没见 (什么风能吹动你心弦)",
    "artist": "张云汐",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230711/20230711142000329552.jpg",
    "src": "https://sharefs.kugou.com/202603091951/e5a6b23b978a54f073bf0b57ca4ce746/v3/e07195b41649537ced69410fd7b2cb9b/yp/full/ap1000_us0_pi409_s2238319350.mp3",
    "duration": "04:45"
  },
  {
    "id": "top_v3_26",
    "title": "天赋",
    "artist": "唐嫣",
    "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=3349955034.mp3",
    "duration": "04:37"
  },
  {
    "id": "top_v3_27",
    "title": "菩提树下我为你流泪",
    "artist": "铃小花",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260302/20260302110650419284.jpg",
    "src": "https://sharefs.kugou.com/202603091951/67d3d8ac843c01aab4d73ff0030210b1/v3/65f6501868d8b30c24cabd25b36bddad/yp/full/ap1000_us0_pi409_s1139373195.mp3",
    "duration": "02:40"
  },
  {
    "id": "top_v3_28",
    "title": "人间共鸣",
    "artist": "李健",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20241216/20241216202247841593.jpg",
    "src": "https://sharefs.kugou.com/202603091951/9dc90173678747dd6b8b1e5f38e8f6dd/v3/c9a5658204bd4e941f3db2fb132d4968/yp/full/ap1000_us0_pi409_s210537825.mp3",
    "duration": "04:19"
  },
  {
    "id": "top_v3_29",
    "title": "乌兰巴托的夜 (空灵男嗓版)",
    "artist": "王大泽",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250106/20250106174500234498.jpg",
    "src": "https://sharefs.kugou.com/202603091951/385bc1ff6bda8b7a522ace2bc426e9c3/v3/d0efb47f81d3c46d169941c8c57193ad/yp/full/ap1000_us0_pi409_s1980979242.mp3",
    "duration": "02:53"
  },
  {
    "id": "top_v3_31",
    "title": "这一别是永远 (女版)",
    "artist": "铃花儿",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251021/20251021152641316295.jpg",
    "src": "https://sharefs.kugou.com/202603091951/43d61a582bfb19b963babea89ecb0d3a/v3/0207c8f1e19b56c26f7e2944400ac4b4/yp/full/ap1000_us0_pi409_s3377490085.mp3",
    "duration": "04:46"
  },
  {
    "id": "top_restored_32",
    "title": "NO BATIDÃO (恐龙快跑)(Explicit)",
    "artist": "ZxKAI",
    "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=3353538050.mp3",
    "duration": "03:30"
  },
  {
    "id": "top_v3_33",
    "title": "失眠了",
    "artist": "吴琳珂（莫斯珂）",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250314/20250314174712736486.jpg",
    "src": "https://sharefs.kugou.com/202603091951/2f5a4c803e5e2fddd833fa9a2bd9d781/v3/be9098939bc14a6b97958b9b865c9820/yp/full/ap1000_us0_pi409_s3759691191.mp3",
    "duration": "04:14"
  },
  {
    "id": "top_v3_34",
    "title": "孽 (看那纯情的妖)",
    "artist": "大猫AIGC",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251103/20251103105110916682.jpg",
    "src": "https://sharefs.kugou.com/202603091951/10852d99e4133600bd754bc9af0ca716/v3/6b0d1741ca5d01cd084bc140bfd4b8ac/yp/full/ap1000_us0_pi409_s279764331.mp3",
    "duration": "04:09"
  },
  {
    "id": "top_v3_35",
    "title": "痴人说梦",
    "artist": "HOYO-MiX",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230720/20230720092642474.jpg",
    "src": "https://sharefs.kugou.com/202603091951/3638fa717c931c65481e50e8a25a14d9/v3/9c3f93ce1e755f79af2282fac6f24866/yp/full/ap1000_us0_pi409_s413348565.mp3",
    "duration": "01:55"
  },
  {
    "id": "top_v3_36",
    "title": "锁 (R&B版)",
    "artist": "呆小帅",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260210/20260210161818124309.jpg",
    "src": "https://sharefs.kugou.com/202603091951/d1e1d6761652fa4f5424986aa92c64b1/v3/c4980666d158f5d7b29c8aa647961029/yp/full/ap1000_us0_pi409_s80065872.mp3",
    "duration": "03:52"
  },
  {
    "id": "top_v3_37",
    "title": "一吻 (一吻能把你俘获么)(Remix)",
    "artist": "李毅恩Lye",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251129/20251129215759934252.jpg",
    "src": "https://sharefs.kugou.com/202603091951/e1fbec49b338e6935f72c62b764cec45/v3/80dda81066e8425de637bea1b8491449/yp/full/ap1000_us0_pi409_s2913735589.mp3",
    "duration": "01:01"
  },
  {
    "id": "top_v3_39",
    "title": "我本将心向明月 (王侯将相本无种)",
    "artist": "Dr.Phonk",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250102/20250102220039219544.jpg",
    "src": "https://sharefs.kugou.com/202603091951/5b7a9efc479dcc99f04913417269fd6b/v3/c00351d2789093fd320eb7d95adf0224/yp/full/ap1000_us0_pi409_s3957281751.mp3",
    "duration": "02:31"
  },
  {
    "id": "top_v3_40",
    "title": "陪你看星星",
    "artist": "陈子晴",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230420/20230420215415870047.jpg",
    "src": "https://sharefs.kugou.com/202603091951/f694bc9c036f6d2f1265d64ca4663316/v3/3e612a790f56ef4599a2c708e8229684/yp/full/ap1000_us0_pi409_s2033400469.mp3",
    "duration": "03:15"
  },
  {
    "id": "top_v3_42",
    "title": "只对你有感觉",
    "artist": "飞轮海",
    "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=1453972586.mp3",
    "duration": "03:59"
  },
  {
    "id": "top_v3_43",
    "title": "这一生爱上什么人都不为过 (咬住下唇)",
    "artist": "金叹啊",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260122/20260122204942552842.jpg",
    "src": "https://sharefs.kugou.com/202603091951/ad45f116521c00c8f24c70d34113adf3/v3/157be5d16705177a8d316d637510a0fc/yp/full/ap1000_us0_pi409_s1729048095.mp3",
    "duration": "02:49"
  },
  {
    "id": "top_v3_44",
    "title": "最真的梦 (女生深情版)",
    "artist": "林栖",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260112/20260112154910837606.jpg",
    "src": "https://sharefs.kugou.com/202603091951/7090a84c201251ee753c855a4093f5a1/v3/c816145c080057eb941c90271416922c/yp/full/ap1000_us0_pi409_s971243753.mp3",
    "duration": "03:42"
  },
  {
    "id": "top_v3_45",
    "title": "求你别离开我",
    "artist": "DJKK",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250319/20250319163906541064.jpg",
    "src": "https://sharefs.kugou.com/202603091951/95742602b62d5951ca5bd339920610dd/v3/8400c90db952ed378ed7b916d3af72d7/yp/full/ap1000_us0_pi409_s2323055469.mp3",
    "duration": "02:16"
  },
  {
    "id": "top_v3_47",
    "title": "佛前求了千百遍",
    "artist": "沧桑小杰",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260209/20260209155521130215.jpg",
    "src": "https://sharefs.kugou.com/202603091951/efba62ecabc2cd5166239e656b68b7f3/v3/fbd98639da5ca68fc89eae43d5a3f96e/yp/full/ap1000_us0_pi409_s1350218827.mp3",
    "duration": "03:44"
  },
  {
    "id": "top_v3_48",
    "title": "等风吹散思念",
    "artist": "孙茹雪",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250513/20250513094256943192.jpg",
    "src": "https://sharefs.kugou.com/202603091951/dfff69cca258de8a6e1628f413876c65/v3/a147f4309a5cc31f2b33c48fec28089a/yp/full/ap1000_us0_pi409_s263414398.mp3",
    "duration": "03:19"
  },
  {
    "id": "top_v3_50",
    "title": "没人心疼我的伤 (我没人撑腰没人帮)",
    "artist": "励明",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230815/20230815172000265558.jpg",
    "src": "https://sharefs.kugou.com/202603091951/2c11a474c12412ebe8d4d14407e76f87/v3/df07377e0b6786d506ffcb68dfdd0844/yp/full/ap1000_us0_pi409_s1489182317.mp3",
    "duration": "04:41"
  },
  {
    "id": "top_v3_53",
    "title": "是非题 (R&B版)",
    "artist": "音乐的入门到改行",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260111/20260111104349800865.jpg",
    "src": "https://sharefs.kugou.com/202603091951/515c6735627465e180c9947b48a7c9df/v3/73dc6365b29090222a1f64aaba806cf3/yp/full/ap1000_us0_pi409_s1080700782.mp3",
    "duration": "04:02"
  },
  {
    "id": "top_v3_54",
    "title": "只要有你 (烟嗓版)(Remix)",
    "artist": "青墨",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251231/20251231214841648746.jpg",
    "src": "https://sharefs.kugou.com/202603091951/e0cfc2d640e2c1b43ef73e8db50fd067/v3/3e66dde856e66eb29d4af00751ad7964/yp/full/ap1000_us0_pi409_s3220024815.mp3",
    "duration": "04:01"
  },
  {
    "id": "top_v3_57",
    "title": "深爱的人做不了朋友",
    "artist": "沧桑小杰",
    "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=3353668206.mp3",
    "duration": "03:16"
  },
  {
    "id": "top_v3_58",
    "title": "玉芬啊玉芬你让彪哥好伤心",
    "artist": "老韩很哇塞",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260225/20260225010349833566.jpg",
    "src": "https://sharefs.kugou.com/202603091951/bd54726c59a5e49901dd9173b6ccd4c0/v3/aff2135f30f90b6768af3320505559cf/yp/full/ap1000_us0_pi409_s1047894494.mp3",
    "duration": "03:00"
  },
  {
    "id": "top_v3_63",
    "title": "一半一半",
    "artist": "Top Barry",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251024/20251024112843557727.jpg",
    "src": "https://sharefs.kugou.com/202603091951/8c53e8aa7e636852b4711f7d00adcd6b/v3/56834bd8a7d2e78bb28a7dbbe99244b6/yp/full/ap1000_us0_pi409_s2642525258.mp3",
    "duration": "03:55"
  },
  {
    "id": "top_v3_64",
    "title": "别回头 (不朽版)",
    "artist": "PAMajor",
    "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=2737047756.mp3",
    "duration": "03:55"
  },
  {
    "id": "top_restored_67",
    "title": "你看你看月亮的脸",
    "artist": "大头针 Official",
    "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=3321246901.mp3",
    "duration": "03:30"
  },
  {
    "id": "top_v3_71",
    "title": "又是一年冬",
    "artist": "小奥奥",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20240122/20240122092859728948.jpg",
    "src": "https://sharefs.kugou.com/202603091951/554c8272fbcaa7d710c1c25692639248/v3/2365c38d6e27125a1b6f6750aee55423/yp/full/ap1000_us0_pi409_s647309612.mp3",
    "duration": "03:55"
  },
  {
    "id": "top_v3_73",
    "title": "最真的梦 (合唱版)",
    "artist": "偏偏月",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260119/20260119174901499083.jpg",
    "src": "https://sharefs.kugou.com/202603091952/85fc92aec1a15f46fbabe69f1d25f107/v3/f3c1e3ca98fd8b0d167839fc60bfaefc/yp/full/ap1000_us0_pi409_s3800269259.mp3",
    "duration": "03:10"
  },
  {
    "id": "top_v3_74",
    "title": "有些",
    "artist": "颜人中",
    "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=1406649619.mp3",
    "duration": "03:49"
  },
  {
    "id": "top_v3_75",
    "title": "想去寺庙断了执念 (烟嗓女版)",
    "artist": "慕容小小",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251229/20251229150148425969.jpg",
    "src": "https://sharefs.kugou.com/202603091952/efce018072629aaeb3ead46eaad83cdf/v3/077240129fa60801499ad8facb76dd30/yp/full/ap1000_us0_pi409_s3435425066.mp3",
    "duration": "04:16"
  },
  {
    "id": "top_v3_76",
    "title": "月亮月亮我向你许愿 (祈福版)",
    "artist": "菱菱壹",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251104/20251104142550687049.jpg",
    "src": "https://sharefs.kugou.com/202603091952/5231ebe7f2ffeb8f353107aa2a0ed8c0/v3/c1cdb5178fc4ab4b3f5ac1eb81018f43/yp/full/ap1000_us0_pi409_s365532462.mp3",
    "duration": "02:58"
  },
  {
    "id": "top_v3_78",
    "title": "春涧 (62剑仙合唱版)",
    "artist": "大头针 Official",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251203/20251203211350922202.jpg",
    "src": "https://sharefs.kugou.com/202603091952/e54fd4954843385167fa2c5a7dc98f79/v3/35ade6e85ae8b1d22a1498587a2834e5/yp/full/ap1000_us0_pi409_s1836247702.mp3",
    "duration": "03:14"
  },
  {
    "id": "top_v3_79",
    "title": "舍得",
    "artist": "王唯旖",
    "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=2160794747.mp3",
    "duration": "02:05"
  },
  {
    "id": "top_v3_82",
    "title": "做夫妻和你相遇太晚",
    "artist": "铃花儿",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251021/20251021152641316295.jpg",
    "src": "https://sharefs.kugou.com/202603091952/9d499748b14d933080c32ea4aac55547/v3/5b5098c7cb3fcbaa8c3c90a851ec93ec/yp/full/ap1000_us0_pi409_s1368484976.mp3",
    "duration": "02:40"
  },
  {
    "id": "top_v3_83",
    "title": "痴情的风吹痴情的人",
    "artist": "沧桑小杰",
    "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=3354757348.mp3",
    "duration": "02:17"
  },
  {
    "id": "top_v3_85",
    "title": "你从来没有爱过我 (男声版)",
    "artist": "励明",
    "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=3352013104.mp3",
    "duration": "04:32"
  },
  {
    "id": "top_v3_88",
    "title": "永远不回头",
    "artist": "沈腾",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20240124/20240124155659457.jpg",
    "src": "https://sharefs.kugou.com/202603091952/c7f9f202cca44dee60bfb25ed273fded/v3/8104dec4432e897ff333424263988c4a/yp/full/ap1000_us0_pi409_s2646312457.mp3",
    "duration": "05:01"
  },
  {
    "id": "top_v3_90",
    "title": "院子里的花 (我意气风发像偷了你的年华)",
    "artist": "灯叔",
    "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=3332729228.mp3",
    "duration": "04:07"
  },
  {
    "id": "top_v3_93",
    "title": "请记住我的好",
    "artist": "陈默默",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251027/20251027144121272174.jpg",
    "src": "https://sharefs.kugou.com/202603091952/417e082236a6a294ca59d80d76c07147/v3/954902a5e8e96c384e0218df43cef291/yp/full/ap1000_us0_pi409_s944344576.mp3",
    "duration": "03:05"
  },
  {
    "id": "top_v3_95",
    "title": "来不及爱你",
    "artist": "h3R3",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20240914/20240914181910680754.jpg",
    "src": "https://sharefs.kugou.com/202603091952/f1d241f77db0a25480849c9a91673d18/v3/e3ed52965cee83a40d73c5fb1da7ff62/yp/full/ap1000_us0_pi409_s56739307.mp3",
    "duration": "03:25"
  },
  {
    "id": "top_restored_99",
    "title": "一直很安静",
    "artist": "阿桑",
    "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=1968781675.mp3",
    "duration": "03:30"
  }
].map(song => ({
  ...song,
  src: song.src || getFallbackAudio(song.id)
}));

const US_SONGS: Song[] = [
  {
    "id": "ustop_1237374763_0",
    "title": "moonboy",
    "artist": "JVKE",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250327/20250327174832660894.jpg",
    "src": "https://sharefs.kugou.com/202603091941/a1981814a2e5c206baefefcc673a217d/v3/accbb603da80a74c2e0bc7e763ef216d/yp/full/ap1000_us0_pi409_s4239504555.mp3",
    "duration": "02:53"
  },
  {
    "id": "ustop_1918207716_1",
    "title": "Tiktiki (Ultra Slowed)",
    "artist": "Qmiir",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251110/20251110091007635048.jpg",
    "src": "https://sharefs.kugou.com/202603091941/7b71de90b8452f42ce22f73d173d2cc0/v3/333b85f9dc68658e249392f4c64e46a6/yp/full/ap1000_us0_pi409_s1651500535.mp3",
    "duration": "05:20"
  },
  {
    "id": "ustop_1329743036_2",
    "title": "New Religion (Explicit)",
    "artist": "Bebe Rexha",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20240517/20240517155004997022.jpg",
    "src": "https://sharefs.kugou.com/202603091941/b319fd9f0c03d4b8c56925bd1cacfa68/v3/0051ffce70addf5e2e5be71e78cd5054/yp/full/ap1000_us0_pi409_s18817330.mp3",
    "duration": "02:54"
  },
  {
    "id": "ustop_1953083619_3",
    "title": "Loosing Myself",
    "artist": "VoidVessel",
    "cover": "https://imge.kugou.com/stdmusic/400/20260302/20260302112033869536.jpg",
    "src": "https://sharefs.kugou.com/202603091941/2b6326f6bf412edc65a570bea70e2d3c/v3/5b7d473d544b4c3fb62c167ce21aba5c/yp/full/ap1000_us0_pi409_s1509692571.mp3",
    "duration": "04:03"
  },
  {
    "id": "ustop_1382770919_4",
    "title": "Nothing But The Blood",
    "artist": "Tommee Profitt",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230612/20230612104830712.jpg",
    "src": "https://sharefs.kugou.com/202603091941/021d292003382550790cfedca34867ea/v3/cba8e64c8acbc9fbe8aee8e90b2cd41b/yp/full/ap1000_us0_pi409_s141326351.mp3",
    "duration": "04:31"
  },
  {
    "id": "ustop_775335154_5",
    "title": "Going Under",
    "artist": "Shiloh Dynasty",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20241216/20241216153341907624.jpg",
    "src": "https://sharefs.kugou.com/202603091941/dd978440c151d461016a7a219a4974e5/v3/be4247742314a637ac315cfec0fda895/yp/full/ap1000_us0_pi409_s332243449.mp3",
    "duration": "02:01"
  },
  {
    "id": "ustop_64397453_6",
    "title": "CROWD",
    "artist": "DaFLair",
    "cover": "https://imge.kugou.com/stdmusic/400/20260221/20260221030852888726.jpg",
    "src": "https://sharefs.kugou.com/202603091941/989cdfb9b6b64a17f384b2c2ee5ca3e5/v3/02b2aa2cfdbd9b4757b5397368d5d9c6/yp/full/ap1000_us0_pi409_s1333342234.mp3",
    "duration": "02:52"
  },
  {
    "id": "ustop_1629556820_7",
    "title": "Make It Count",
    "artist": "Becky G",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20231121/20231121100624632.jpg",
    "src": "https://sharefs.kugou.com/202603091941/ff75be7a02e2526245cccb073a0480da/v3/88eea5433ab230a67b9b75744442df62/yp/full/ap1000_us0_pi409_s3364467876.mp3",
    "duration": "02:40"
  },
  {
    "id": "ustop_2106148_8",
    "title": "Come",
    "artist": "Skylar Grey",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20241216/20241216203441753096.jpg",
    "src": "https://sharefs.kugou.com/202603091941/127927d5658c2ab58d9c4716bb6cea61/v3/3b01e4f49ee2c1adb927d281a956253e/yp/full/ap1000_us0_pi409_s2355476263.mp3",
    "duration": "02:54"
  },
  {
    "id": "ustop_1244307459_9",
    "title": "Welcome to the Wrongside Outimals (Poppy Playtime 5)",
    "artist": "DJ GG",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250429/20250429162601312916.jpg",
    "src": "https://sharefs.kugou.com/202603091941/d775928cbc9bfd3926f93bdc9d92f6b6/v3/f2b2ab57090379b92175ea8867fd375e/yp/full/ap1000_us0_pi409_s1855897498.mp3",
    "duration": "02:47"
  },
  {
    "id": "ustop_718473796_10",
    "title": "Multiply",
    "artist": "Mike Williams",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20231213/20231213182537890.jpg",
    "src": "https://sharefs.kugou.com/202603091941/2ba6caa42a390a6c525af0ec1bdbb4e9/v3/98efa281fccc5abcfc66c7821b3776f8/yp/full/ap1000_us0_pi409_s4207515437.mp3",
    "duration": "03:26"
  },
  {
    "id": "ustop_788218647_11",
    "title": "Listen To Me (Explicit)",
    "artist": "Shiloh Dynasty",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20241216/20241216153341907624.jpg",
    "src": "https://sharefs.kugou.com/202603091941/24c6ef5eddf9260e7dcb37548e25914a/v3/b0776a0516bd8e547fc691993a5b3f8f/yp/full/ap1000_us0_pi409_s1484386352.mp3",
    "duration": "02:02"
  },
  {
    "id": "ustop_2058472896_12",
    "title": "Close to You 2026",
    "artist": "Klaas",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230420/20230420153430231827.jpg",
    "src": "https://sharefs.kugou.com/202603091941/e5289280c3d70ec454354554c9ab8a06/v3/9649f6a39f629d841020ff9f5bcb105e/yp/full/ap1000_us0_pi409_s4123829885.mp3",
    "duration": "02:53"
  },
  {
    "id": "ustop_1097124758_13",
    "title": "Body Talk",
    "artist": "Alle Farben",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250314/20250314200133973059.jpg",
    "src": "https://sharefs.kugou.com/202603091941/f3bbc6de46b9d1f6b24a13008f8d2f78/v3/abd52b972f962d5f02e58910182bc6c5/yp/full/ap1000_us0_pi409_s3480959817.mp3",
    "duration": "02:46"
  },
  {
    "id": "ustop_120275724_14",
    "title": "Being In Love",
    "artist": "Shiloh Dynasty",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20241216/20241216153341907624.jpg",
    "src": "https://sharefs.kugou.com/202603091941/193a269f6ebc6cb7e57c193ef0f51a88/v3/e29e1f5267a9b062151bb85736d1f2eb/yp/full/ap1000_us0_pi409_s1813261124.mp3",
    "duration": "02:37"
  },
  {
    "id": "ustop_1502067658_15",
    "title": "In Time (feat. LongestSoloEver)",
    "artist": "LongestSoloEver",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260201/20260201092155183789.jpg",
    "src": "https://sharefs.kugou.com/202603091941/8d355c8d7c6d60673fda6cb775317f05/v3/26d345673d048d637963e4e4351f23f4/yp/full/ap1000_us0_pi409_s3127421816.mp3",
    "duration": "03:27"
  },
  {
    "id": "ustop_341799146_16",
    "title": "somebody new",
    "artist": "Le Youth",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20160717/20160717173149814.jpg",
    "src": "https://sharefs.kugou.com/202603091941/61d477848c9ceb94fbfd05707bd56245/v3/887b0b2e4283dee27ebb8cbd4c81c552/yp/full/ap1000_us0_pi409_s1185085569.mp3",
    "duration": "04:06"
  },
  {
    "id": "ustop_1844137290_17",
    "title": "BACK IT UP (Slowed)",
    "artist": "Ogryzek",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20241227/20241227181104375061.jpg",
    "src": "https://sharefs.kugou.com/202603091941/eddd52d083900d3411737f4abe55fa70/v3/c9e2acd15588a6e659f207e04627a192/yp/full/ap1000_us0_pi409_s3564968481.mp3",
    "duration": "01:47"
  },
  {
    "id": "ustop_628036505_18",
    "title": "i'll be your anchor",
    "artist": "Le Youth",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20160717/20160717173149814.jpg",
    "src": "https://sharefs.kugou.com/202603091941/3de5f003f99158e7123ed17a960d4b88/v3/a22bcc1fcae00067dd08b2c7867ec5af/yp/full/ap1000_us0_pi409_s3740416865.mp3",
    "duration": "04:53"
  },
  {
    "id": "ustop_412263767_19",
    "title": "American Girls",
    "artist": "Harry Styles",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250314/20250314190935893131.jpg",
    "src": "https://sharefs.kugou.com/202603091941/4f759e221794664e050cac45454b33d0/v3/344772a8a8743b043fed6703161ab0fe/yp/full/ap1000_us0_pi409_s2085708223.mp3",
    "duration": "03:33"
  },
  {
    "id": "ustop_1638899288_20",
    "title": "Save Me Tonight",
    "artist": "Jennifer Lopez",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20231107/20231107174355367.jpg",
    "src": "https://sharefs.kugou.com/202603091941/a3f9507c45087ea0242bfde1aa5dd1d4/v3/c4f3c3d49a8156732542a8a444c92901/yp/full/ap1000_us0_pi409_s663712880.mp3",
    "duration": "03:16"
  },
  {
    "id": "ustop_1246465687_21",
    "title": "Rings of Saturn",
    "artist": "Approaching Nirvana",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230803/20230803100519842.jpg",
    "src": "https://sharefs.kugou.com/202603091941/3fba09398f4bc252c7d05ac7cb2d7436/v3/a211be09f43fa58ba554085ce37d8343/yp/full/ap1000_us0_pi409_s1977787318.mp3",
    "duration": "05:34"
  },
  {
    "id": "ustop_2587257_22",
    "title": "Stay",
    "artist": "Zakirovec",
    "cover": "https://imge.kugou.com/stdmusic/400/20260304/20260304221741200884.jpg",
    "src": "https://sharefs.kugou.com/202603091941/0041b13065a218b703f64f8d0ec42507/v3/d0a13ed932432ac21727f3d42feec2fd/yp/full/ap1000_us0_pi409_s807721547.mp3",
    "duration": "03:23"
  },
  {
    "id": "ustop_1099270216_23",
    "title": "Reggaeton Loop",
    "artist": "Leinad",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260130/20260130181821839828.jpg",
    "src": "https://sharefs.kugou.com/202603091941/55790ad70707ac6e9eb7934d53286d26/v3/76fe7e7dc4a9000eee037d9c7ac86126/yp/full/ap1000_us0_pi409_s3124098165.mp3",
    "duration": "02:13"
  },
  {
    "id": "ustop_84586226_24",
    "title": "i'm breaking down",
    "artist": "Le Youth",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20160717/20160717173149814.jpg",
    "src": "https://sharefs.kugou.com/202603091941/19682f2ce1fd74ac8e1e848c1837744c/v3/369e37523754f18c965e85f07f333d8d/yp/full/ap1000_us0_pi409_s4026822518.mp3",
    "duration": "05:12"
  },
  {
    "id": "ustop_85299126_25",
    "title": "Years",
    "artist": "Symphony of Unity",
    "cover": "https://imge.kugou.com/stdmusic/400/20260307/20260307043602828564.jpg",
    "src": "https://sharefs.kugou.com/202603091941/c0631df035c11777269f3c8528698fbd/v3/7273ae159093954c39fa03d2e69fdb1b/yp/full/ap1000_us0_pi409_s2882757439.mp3",
    "duration": "04:05"
  },
  {
    "id": "ustop_1078605295_26",
    "title": "intention (with Brandy)",
    "artist": "Ty Dolla $ign",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20231110/20231110162600558.jpg",
    "src": "https://sharefs.kugou.com/202603091941/bde6f7ff07c44edbf617f371906ced94/v3/ee3ee6b1e61160ef60d55023b526af7d/yp/full/ap1000_us0_pi409_s54074571.mp3",
    "duration": "03:15"
  },
  {
    "id": "ustop_2063928262_27",
    "title": "good to me",
    "artist": "Ty Dolla $ign",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20231110/20231110162600558.jpg",
    "src": "https://sharefs.kugou.com/202603091941/9e53dcba677c58a0cca114452eadabb2/v3/eee10ea477a0971a00ac666774e8e87e/yp/full/ap1000_us0_pi409_s1710679895.mp3",
    "duration": "02:34"
  },
  {
    "id": "ustop_1234608394_28",
    "title": "Never Any Sunshine (Pepa Alternate Universe Song)",
    "artist": "MilkyyMelodies",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260201/20260201034435602607.jpg",
    "src": "https://sharefs.kugou.com/202603091941/60b647a091282c3d9961b352bf3dfd1a/v3/8fc3351e0307caf27442190e59302a87/yp/full/ap1000_us0_pi409_s3766693728.mp3",
    "duration": "03:56"
  },
  {
    "id": "ustop_690341960_29",
    "title": "Obsessed (Extended Mix)",
    "artist": "BEAUZ",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230420/20230420211015233424.jpg",
    "src": "https://sharefs.kugou.com/202603091941/14a7dd06dea400cd9ede5977f90a25c3/v3/9bf5adda80e9f5a3fe0573f0a8700cf1/yp/full/ap1000_us0_pi409_s2103710008.mp3",
    "duration": "02:49"
  },
  {
    "id": "ustop_2287667_30",
    "title": "Iris",
    "artist": "Steve Aoki",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20240626/20240626142836263098.jpg",
    "src": "https://sharefs.kugou.com/202603091941/40b99606b3eb7fca6fdec7081802d7d8/v3/28d9853b99ce2b564b2ee4e17d2b004a/yp/full/ap1000_us0_pi409_s3623209506.mp3",
    "duration": "03:19"
  },
  {
    "id": "ustop_251506010_31",
    "title": "nobody has to know (with Ronald Isley)",
    "artist": "Ty Dolla $ign",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20231110/20231110162600558.jpg",
    "src": "https://sharefs.kugou.com/202603091941/727cac46a6af5e981d34463120f9323e/v3/c372d610a2bfdd212df304dce449244f/yp/full/ap1000_us0_pi409_s2981739782.mp3",
    "duration": "03:17"
  },
  {
    "id": "ustop_1485903113_32",
    "title": "to be honest",
    "artist": "Le Youth",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20160717/20160717173149814.jpg",
    "src": "https://sharefs.kugou.com/202603091941/db974a7d64507e9f644a3785bf87c5f6/v3/3f9cd54b72628dbcb5d517fa2b8daab3/yp/full/ap1000_us0_pi409_s2119143584.mp3",
    "duration": "02:26"
  },
  {
    "id": "ustop_1497559280_33",
    "title": "Taste Back",
    "artist": "Harry Styles",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250314/20250314190935893131.jpg",
    "src": "https://sharefs.kugou.com/202603091941/388373e8b3388df8137828102f56d506/v3/bd204c5bbfd8360c4872776c17982483/yp/full/ap1000_us0_pi409_s354816186.mp3",
    "duration": "03:41"
  },
  {
    "id": "ustop_2688405_34",
    "title": "Wait",
    "artist": "Kastra",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20231208/20231208153406450032.jpg",
    "src": "https://sharefs.kugou.com/202603091941/6745297933ed8016536e7784404cffd4/v3/7ccd2caf7bf71a9a57fc31ee2e03a7db/yp/full/ap1000_us0_pi409_s1556018192.mp3",
    "duration": "03:23"
  },
  {
    "id": "ustop_93845332_35",
    "title": "me and you (outro)",
    "artist": "Le Youth",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20160717/20160717173149814.jpg",
    "src": "https://sharefs.kugou.com/202603091941/8deb850f26d5697465ab887660a0ac69/v3/f144b8c9a7cdaa77234dc841fe596d30/yp/full/ap1000_us0_pi409_s3917606715.mp3",
    "duration": "03:39"
  },
  {
    "id": "ustop_179968160_36",
    "title": "Carla's Song",
    "artist": "Harry Styles",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250314/20250314190935893131.jpg",
    "src": "https://sharefs.kugou.com/202603091941/51c35a420cadde0fc4e52458482be849/v3/ee994fd420547c7ef1470b1ff1df7960/yp/full/ap1000_us0_pi409_s1628633443.mp3",
    "duration": "04:13"
  },
  {
    "id": "ustop_51435136_37",
    "title": "Season 2 Weight Loss",
    "artist": "Harry Styles",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250314/20250314190935893131.jpg",
    "src": "https://sharefs.kugou.com/202603091941/75b8988b9283e278e8bfedd9d5e15f53/v3/89dd087df17247e8149170fd05f5145f/yp/full/ap1000_us0_pi409_s257590192.mp3",
    "duration": "03:49"
  },
  {
    "id": "ustop_1574817856_38",
    "title": "Crying (feat. horrormovies, hoshie star & od1ous)(Explicit)",
    "artist": "ZzZzGARD",
    "cover": "https://imge.kugou.com/stdmusic/400/20260222/20260222220952468239.jpg",
    "src": "https://sharefs.kugou.com/202603091941/077076e4623e4c4917cfc62ab594abb6/v3/4790e25e3635434e95137dde38d0196a/yp/full/ap1000_us0_pi409_s4222992157.mp3",
    "duration": "02:57"
  },
  {
    "id": "ustop_1609295516_39",
    "title": "Ready, Steady, Go!",
    "artist": "Harry Styles",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250314/20250314190935893131.jpg",
    "src": "https://sharefs.kugou.com/202603091941/ca301eb4d8e7563ae70533b620874e75/v3/6e0302509db8b4d1bc17562f35656c79/yp/full/ap1000_us0_pi409_s2936829487.mp3",
    "duration": "02:40"
  },
  {
    "id": "ustop_254627418_40",
    "title": "Right here...",
    "artist": "R3HAB",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20241213/20241213201206868971.jpg",
    "src": "https://sharefs.kugou.com/202603091941/03eea12566311a337818a43c8cc765f5/v3/ab228bdbb06fe4872e81dcb0dca5f19a/yp/full/ap1000_us0_pi409_s1769823830.mp3",
    "duration": "02:56"
  },
  {
    "id": "ustop_652504890_41",
    "title": "boy you turn me",
    "artist": "Felix Jaehn",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250319/20250319013104584558.jpg",
    "src": "https://sharefs.kugou.com/202603091941/b3cbb8c4c49689bcbee4ac8a5e519f32/v3/19bd12059ddd3cd291b6bf2a9a811fa7/yp/full/ap1000_us0_pi409_s3094330970.mp3",
    "duration": "03:12"
  },
  {
    "id": "ustop_202600892_42",
    "title": "Cheri Cheri Lady",
    "artist": "Mentol",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260202/20260202044604532598.jpg",
    "src": "https://sharefs.kugou.com/202603091941/6b5f57547f471e142df9d64e9305a482/v3/f0d06426a3d29d7739b7b759d23c1921/yp/full/ap1000_us0_pi409_s489094303.mp3",
    "duration": "02:07"
  },
  {
    "id": "ustop_2134629300_43",
    "title": "3 billion",
    "artist": "Ty Dolla $ign",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20231110/20231110162600558.jpg",
    "src": "https://sharefs.kugou.com/202603091941/f447a0a432616ed205e4def625880509/v3/8a4081e3bb5f975dd153ad1b9e829000/yp/full/ap1000_us0_pi409_s988561362.mp3",
    "duration": "03:10"
  },
  {
    "id": "ustop_908954950_44",
    "title": "Dimension",
    "artist": "lofi'chield",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260130/20260130181811990141.jpg",
    "src": "https://sharefs.kugou.com/202603091941/bdb48cbd2842cebfd311bd035f6e875f/v3/3e598b2bdff2416e4b5443711c327051/yp/full/ap1000_us0_pi409_s4284940758.mp3",
    "duration": "02:17"
  },
  {
    "id": "ustop_1166360413_45",
    "title": "Paint By Numbers",
    "artist": "Harry Styles",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250314/20250314190935893131.jpg",
    "src": "https://sharefs.kugou.com/202603091941/d96ed30d5d16151310986840865236af/v3/aab27d6e9f5d832629cf4501d5ef3ffa/yp/full/ap1000_us0_pi409_s3929903398.mp3",
    "duration": "02:27"
  },
  {
    "id": "ustop_735741570_46",
    "title": "Good Toy! (Lily Lovebraids Theme Song)",
    "artist": "Cougar Macdowall",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250507/20250507154501574002.jpg",
    "src": "https://sharefs.kugou.com/202603091941/137ba62edf00dc2aab32423d88199720/v3/c3a953ab419802ea4666b6fc746ce61c/yp/full/ap1000_us0_pi409_s3558147758.mp3",
    "duration": "02:11"
  },
  {
    "id": "ustop_2290707_47",
    "title": "Iunu",
    "artist": "Ummet Ozcan",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250314/20250314185718694379.jpg",
    "src": "https://sharefs.kugou.com/202603091941/506308263ec66668bdd970b8e742f160/v3/1cc4e5b3c65b4f07ddf13972f66b2bf6/yp/full/ap1000_us0_pi409_s3745500144.mp3",
    "duration": "04:10"
  },
  {
    "id": "ustop_1288656839_48",
    "title": "Feel Good Funk (Super Slowed)",
    "artist": "Syn Cole",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250314/20250314193716611130.jpg",
    "src": "https://sharefs.kugou.com/202603091941/de729bcea332a17ca5722399348a6f95/v3/b88ee7fc6e6397805059f5d8a64331da/yp/full/ap1000_us0_pi409_s2141623886.mp3",
    "duration": "01:48"
  },
  {
    "id": "ustop_55673223_50",
    "title": "That's Her (feat. Wiz Khalifa)",
    "artist": "CYRIL",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250521/20250521105856585179.jpg",
    "src": "https://sharefs.kugou.com/202603091941/5d248d32e57f83e19b02099e885066bd/v3/09772aa0b4980f8a54c78bcf1e5b1e97/yp/full/ap1000_us0_pi409_s890256689.mp3",
    "duration": "02:27"
  },
  {
    "id": "ustop_2033728_51",
    "title": "Abba",
    "artist": "Amarah",
    "cover": "https://imge.kugou.com/stdmusic/400/20260307/20260307050730399084.jpg",
    "src": "https://sharefs.kugou.com/202603091941/291beab0870ea91bfd63d66c7c46017c/v3/37c201a07564233c23d733523b7d2402/yp/full/ap1000_us0_pi409_s932521512.mp3",
    "duration": "02:13"
  },
  {
    "id": "ustop_2011839681_52",
    "title": "Your Love",
    "artist": "R3SPAWN",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250319/20250319030457267521.jpg",
    "src": "https://sharefs.kugou.com/202603091941/204f0a7533dfbd7984db9163a06f0a64/v3/7a21fb8a292b671a76178fbf367f5e51/yp/full/ap1000_us0_pi409_s2203218477.mp3",
    "duration": "02:28"
  },
  {
    "id": "ustop_1206673709_53",
    "title": "when the night is over",
    "artist": "Le Youth",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20160717/20160717173149814.jpg",
    "src": "https://sharefs.kugou.com/202603091941/3f0416741647a480fea9d4f8cc810835/v3/32e85cc598818dd67cdada36446663d8/yp/full/ap1000_us0_pi409_s4260260383.mp3",
    "duration": "02:56"
  },
  {
    "id": "ustop_2007880732_54",
    "title": "Reggaeton",
    "artist": "Leinad",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260130/20260130181821839828.jpg",
    "src": "https://sharefs.kugou.com/202603091941/3de0d60a1b84471715360b3759cd79c1/v3/0ce61e4b28818f9a283cc76ee7de7e49/yp/full/ap1000_us0_pi409_s1473408260.mp3",
    "duration": "02:01"
  },
  {
    "id": "ustop_275116743_55",
    "title": "Dance No More",
    "artist": "Harry Styles",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250314/20250314190935893131.jpg",
    "src": "https://sharefs.kugou.com/202603091941/8bd036353fb9c4532484d767c01d7071/v3/b2028ff7acaa1b5dc39539636092b2da/yp/full/ap1000_us0_pi409_s1670615856.mp3",
    "duration": "03:14"
  },
  {
    "id": "ustop_1074639887_56",
    "title": "Sweet Escape",
    "artist": "Monika Santucci",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20231123/20231123175738258.jpg",
    "src": "https://sharefs.kugou.com/202603091941/6cc270ba20dfe5bc27782f3dd34c8402/v3/e9fcaf077fc9966dab76db5a3e000f04/yp/full/ap1000_us0_pi409_s3731646338.mp3",
    "duration": "03:24"
  },
  {
    "id": "ustop_2038565507_57",
    "title": "Sweet Leaf All Around Ya (Explicit)",
    "artist": "Cartoons",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20210524/20210524182932379.jpg",
    "src": "https://sharefs.kugou.com/202603091941/aead2bd61b8fe3f6d48d6d3b2bc739cd/v3/0246f1e9adaa92c203bb43e3836e35ca/yp/full/ap1000_us0_pi409_s3096443433.mp3",
    "duration": "03:51"
  },
  {
    "id": "ustop_1316848790_58",
    "title": "Unz Unz (Extended Mix)",
    "artist": "Arkins",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20240430/20240430142733515524.jpg",
    "src": "https://sharefs.kugou.com/202603091941/9145508167a2d3fb741374a59ba07ba1/v3/9c3efba3eb3fcded58df455fbabb08f3/yp/full/ap1000_us0_pi409_s2633551110.mp3",
    "duration": "03:21"
  },
  {
    "id": "ustop_2160942_59",
    "title": "FLOW",
    "artist": "CHRSTPHR",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260128/20260128121123377009.jpg",
    "src": "https://sharefs.kugou.com/202603091941/a4655631c4cc0844470be007866adde9/v3/6283a8e5496468ca89a65b031d1dfd6e/yp/full/ap1000_us0_pi409_s1468747513.mp3",
    "duration": "02:41"
  },
  {
    "id": "ustop_1645350203_60",
    "title": "who are you really?",
    "artist": "Le Youth",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20160717/20160717173149814.jpg",
    "src": "https://sharefs.kugou.com/202603091941/744c5a028bf4416712f0f4654f371445/v3/a39a114f178a3cdcdb254fa66e880b3d/yp/full/ap1000_us0_pi409_s1422069411.mp3",
    "duration": "03:17"
  },
  {
    "id": "ustop_747788898_61",
    "title": "Coming Up Roses",
    "artist": "Harry Styles",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250314/20250314190935893131.jpg",
    "src": "https://sharefs.kugou.com/202603091941/616362c16296cb6564ba669957b833f3/v3/2dd22533b4d29bf95d4fde1a74f10b88/yp/full/ap1000_us0_pi409_s3147109963.mp3",
    "duration": "04:08"
  },
  {
    "id": "ustop_290200874_62",
    "title": "DREAM JUMP (SLOWED)",
    "artist": "BXNFXM",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250702/20250702114555823360.jpg",
    "src": "https://sharefs.kugou.com/202603091941/4b234c405b93db6839669fb7dd145578/v3/18bfefe80cee86d9082baacde3798bea/yp/full/ap1000_us0_pi409_s2547285605.mp3",
    "duration": "01:53"
  },
  {
    "id": "ustop_936286987_63",
    "title": "IN MY BONES (ULTRA SLOWED|Explicit)",
    "artist": "PXRKX",
    "cover": "https://imge.kugou.com/stdmusic/400/20260305/20260305032752794173.jpg",
    "src": "https://sharefs.kugou.com/202603091941/2937303f8c05c8060369962e1ae4c9f5/v3/beecb80ed7f7e4f48b5de5c18194b559/yp/full/ap1000_us0_pi409_s2887488193.mp3",
    "duration": "03:15"
  },
  {
    "id": "ustop_729303642_64",
    "title": "RUINED (Explicit)",
    "artist": "DVRST",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260128/20260128123928183540.jpg",
    "src": "https://sharefs.kugou.com/202603091941/b55f21cf0c067dae2e433b307fee1fe2/v3/9a24e825f6193c8d43a007ba69f872f6/yp/full/ap1000_us0_pi409_s2143849044.mp3",
    "duration": "02:20"
  },
  {
    "id": "ustop_1095094300_65",
    "title": "In A World (Let Us Smoke)(Explicit)",
    "artist": "Cartoons",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20210524/20210524182932379.jpg",
    "src": "https://sharefs.kugou.com/202603091941/580402a1322effb2050a25a949a38603/v3/6a68cef07902dbf85102effb74fb9610/yp/full/ap1000_us0_pi409_s1847945665.mp3",
    "duration": "04:41"
  },
  {
    "id": "ustop_1101561354_66",
    "title": "The Fall",
    "artist": "Hildur Guðnadóttir",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20241209/20241209123305379248.jpg",
    "src": "https://sharefs.kugou.com/202603091941/2f967b51a0071082827a2a48a349ceeb/v3/5598b5f1e395cf7d26fde47fcb40f8d5/yp/full/ap1000_us0_pi409_s1811160060.mp3",
    "duration": "01:56"
  },
  {
    "id": "ustop_486889068_67",
    "title": "The Waiting Game",
    "artist": "Harry Styles",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250314/20250314190935893131.jpg",
    "src": "https://sharefs.kugou.com/202603091941/8cd73de1cd3d38523508ad6d0343f22a/v3/77c85e94c908b7725ce3152ab2bf116e/yp/full/ap1000_us0_pi409_s2819168736.mp3",
    "duration": "02:49"
  },
  {
    "id": "ustop_1789388124_68",
    "title": "Crazy People 2026",
    "artist": "Hardwell",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20231011/20231011113850972.jpg",
    "src": "https://sharefs.kugou.com/202603091941/0fb973ba3b4d3002db13905735eafb70/v3/f6a44464fcfcc5115aba5b364d3be9ac/yp/full/ap1000_us0_pi409_s3153157975.mp3",
    "duration": "03:03"
  },
  {
    "id": "ustop_711884729_69",
    "title": "Move You (XTD)",
    "artist": "Burak Yeter",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20241216/20241216153916599050.jpg",
    "src": "https://sharefs.kugou.com/202603091941/0836662fc93dbe6b1b214ccdc828627d/v3/c8852c6cd4010c11629e9a2765098c0a/yp/full/ap1000_us0_pi409_s954565822.mp3",
    "duration": "03:37"
  },
  {
    "id": "ustop_195213597_70",
    "title": "The World",
    "artist": "Antonia",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20210528/20210528133114890.jpg",
    "src": "https://sharefs.kugou.com/202603091941/36f9c74119690ffac4ed2007619ccd02/v3/49411834b9cd080dd62ae6e02ff86614/yp/full/ap1000_us0_pi409_s3391891739.mp3",
    "duration": "03:09"
  },
  {
    "id": "ustop_710360256_71",
    "title": "when you finally (Super Slowed)",
    "artist": "Igrxs",
    "cover": "https://imge.kugou.com/stdmusic/400/20260226/20260226175942445168.jpg",
    "src": "https://sharefs.kugou.com/202603091941/141c9bae911a0a212177b9ac269c78aa/v3/fadc808cbe063bbee726150f50c6e4fa/yp/full/ap1000_us0_pi409_s2166609732.mp3",
    "duration": "01:58"
  },
  {
    "id": "ustop_80433_72",
    "title": "Pop",
    "artist": "Harry Styles",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250314/20250314190935893131.jpg",
    "src": "https://sharefs.kugou.com/202603091941/eb5b6b5b6f35c6b42adddaaee16a0c0a/v3/6773f66aaaf82463cbf9fc63f7813314/yp/full/ap1000_us0_pi409_s2258030561.mp3",
    "duration": "03:36"
  },
  {
    "id": "ustop_1950635664_73",
    "title": "good to see you",
    "artist": "GRAHAM",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250702/20250702161010416915.jpg",
    "src": "https://sharefs.kugou.com/202603091941/783f9b56313e43713e422ecd4bb0d1a3/v3/189ce8436c67af3da47d9489474c1127/yp/full/ap1000_us0_pi409_s1161077174.mp3",
    "duration": "02:01"
  },
  {
    "id": "ustop_1812735625_74",
    "title": "Are You Listening Yet?",
    "artist": "Harry Styles",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250314/20250314190935893131.jpg",
    "src": "https://sharefs.kugou.com/202603091941/393ad0e30c9a9efe1954587e4f3adcd6/v3/2bdac6e127ed208d14ee8da99be17b97/yp/full/ap1000_us0_pi409_s1222050434.mp3",
    "duration": "03:12"
  },
  {
    "id": "ustop_74100061_75",
    "title": "Madan",
    "artist": "Trinix",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250319/20250319015603152692.jpg",
    "src": "https://sharefs.kugou.com/202603091941/2e661c6fb219d684eb1a95194839c12b/v3/0a67517ea5dac5ab45decf15c3ed7931/yp/full/ap1000_us0_pi409_s2977229968.mp3",
    "duration": "02:25"
  },
  {
    "id": "ustop_569439693_76",
    "title": "Come Into My Dream",
    "artist": "Marc Korn",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260114/20260114153037340560.jpg",
    "src": "https://sharefs.kugou.com/202603091941/8088f0485f02765e1b2b112d786b65b8/v3/f8315c6c2855b8d586ae1d0305a6f3da/yp/full/ap1000_us0_pi409_s4154800814.mp3",
    "duration": "02:47"
  },
  {
    "id": "ustop_1820256099_77",
    "title": "Get Back (feat. Swavi)(Explicit)",
    "artist": "Vin Jay",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260130/20260130184016303746.jpg",
    "src": "https://sharefs.kugou.com/202603091941/d9ebfcfaea5312e2f28d81ea6cd6531e/v3/0baa5eb7d9a50cb64b74d33f8da8d211/yp/full/ap1000_us0_pi409_s4164687910.mp3",
    "duration": "03:03"
  },
  {
    "id": "ustop_497456215_79",
    "title": "Letting Go of You",
    "artist": "Alter the Cause",
    "cover": "https://imge.kugou.com/stdmusic/400/20251122/20251122020911203889.jpg",
    "src": "https://sharefs.kugou.com/202603091942/ec9910a6c4e375ce38df3aafd66e7dcb/v3/a0f6fc77f6d48c22878100ce3b62fc31/yp/full/ap1000_us0_pi409_s3201052503.mp3",
    "duration": "04:11"
  },
  {
    "id": "ustop_1829519105_80",
    "title": "FAVELAS ULTRAFUNK (Speed Up)",
    "artist": "Nervale",
    "cover": "https://imge.kugou.com/stdmusic/400/20260306/20260306162202315923.jpg",
    "src": "https://sharefs.kugou.com/202603091942/928614cc75951912dd6b360cbe28fe65/v3/11bf7f65a1056f657658ed5a3a1657cc/yp/full/ap1000_us0_pi409_s1403505595.mp3",
    "duration": "03:26"
  },
  {
    "id": "ustop_2111344217_81",
    "title": "When I Stand",
    "artist": "Owen James",
    "cover": "https://imge.kugou.com/stdmusic/400/20260304/20260304135351494576.jpg",
    "src": "https://sharefs.kugou.com/202603091942/dcfa23d8d895fdd375ff16f86676bdc5/v3/f7273a0f0d1d709783d0762cc8b77bc8/yp/full/ap1000_us0_pi409_s2039192289.mp3",
    "duration": "03:19"
  },
  {
    "id": "ustop_265736032_82",
    "title": "You Are the Reason",
    "artist": "Jada Facer",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20231108/20231108151934917.jpg",
    "src": "https://sharefs.kugou.com/202603091942/3b323b91750e8624b9655fd02377961d/v3/cebbb1edb8bb469df8840d1c362a9abc/yp/full/ap1000_us0_pi409_s3532388009.mp3",
    "duration": "03:03"
  },
  {
    "id": "ustop_1900192775_83",
    "title": "Searching You",
    "artist": "Aria Flux",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250428/20250428170101858253.jpg",
    "src": "https://sharefs.kugou.com/202603091942/5d594689adb8ce4c83e4cfffa03510aa/v3/fe7fc5bba7921ea9813997b529199509/yp/full/ap1000_us0_pi409_s4132689322.mp3",
    "duration": "04:30"
  },
  {
    "id": "ustop_902036954_84",
    "title": "The Words I Never Said",
    "artist": "MelodySpot",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251121/20251121102748384874.jpg",
    "src": "https://sharefs.kugou.com/202603091942/f3a0dc8ad213f139baa9b9d2e8dbfd24/v3/777295cde10f31452935555731234446/yp/full/ap1000_us0_pi409_s83620986.mp3",
    "duration": "04:22"
  },
  {
    "id": "ustop_1818600760_85",
    "title": "Signal",
    "artist": "Christopher Ladex",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260128/20260128131429503909.jpg",
    "src": "https://sharefs.kugou.com/202603091942/f7907f5c478f67458c1116ba00e65f9f/v3/208157d12474ef63eee34f55f888020f/yp/full/ap1000_us0_pi409_s3973504722.mp3",
    "duration": "02:31"
  },
  {
    "id": "ustop_608169416_86",
    "title": "All out of Love (Live in Taiwan)",
    "artist": "Music Travel Love",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20241216/20241216202641163228.jpg",
    "src": "https://sharefs.kugou.com/202603091942/8b4c7114b074f2d38c73335859f1ea88/v3/4bbadb142831f783fc957dba4766bd9f/yp/full/ap1000_us0_pi409_s3098850370.mp3",
    "duration": "03:25"
  },
  {
    "id": "ustop_151496573_87",
    "title": "Risk It All",
    "artist": "Bruno Mars",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260109/20260109161904600982.jpg",
    "src": "https://sharefs.kugou.com/202603091942/d0ea9a3c5c9819d4e4b9e80f404ee544/v3/df6763c465ad9c46a8e30f852c66d0e5/yp/full/ap1000_us0_pi409_s292971146.mp3",
    "duration": "03:24"
  },
  {
    "id": "ustop_1756422374_88",
    "title": "SOMEWHERE ELSE",
    "artist": "TOMORA",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260201/20260201111730330516.jpg",
    "src": "https://sharefs.kugou.com/202603091942/2a3ac21a682db4ce6b031b059636cd63/v3/8a2550f457eb7f7e7788869118825f5a/yp/full/ap1000_us0_pi409_s3087094880.mp3",
    "duration": "04:11"
  },
  {
    "id": "ustop_641637152_89",
    "title": "Still Loving You in Silence",
    "artist": "MelodySpot",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251121/20251121102748384874.jpg",
    "src": "https://sharefs.kugou.com/202603091942/62417082a86aae3f479ddf8b39676058/v3/92c95b4c041eee1bb17b376aec1238cb/yp/full/ap1000_us0_pi409_s2267244128.mp3",
    "duration": "05:53"
  },
  {
    "id": "ustop_931081702_90",
    "title": "Easy Go (feat. Vahid Beats)",
    "artist": "Sajad Pasban",
    "cover": "https://imge.kugou.com/stdmusic/400/20260219/20260219140410547731.jpg",
    "src": "https://sharefs.kugou.com/202603091942/c32c0b1f2d2a0bd794440b441bd2c521/v3/5b4df004573e51eaaf78f677a01a7cda/yp/full/ap1000_us0_pi409_s2645237276.mp3",
    "duration": "03:16"
  },
  {
    "id": "ustop_821568343_91",
    "title": "Through the Darkness",
    "artist": "佐藤奈央",
    "cover": "https://imge.kugou.com/stdmusic/400/20260227/20260227191742723275.jpg",
    "src": "https://sharefs.kugou.com/202603091942/87cd32e2fb6244c91a0190be02260721/v3/f696a19acd5dc813e9f70fa097079c34/yp/full/ap1000_us0_pi409_s3705697163.mp3",
    "duration": "04:30"
  },
  {
    "id": "ustop_420756571_92",
    "title": "Dance With Me",
    "artist": "Bruno Mars",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260109/20260109161904600982.jpg",
    "src": "https://sharefs.kugou.com/202603091942/44a9332aeea7994d8fb2d90e9b3d82d0/v3/078d02cc3495ff2ae53e64a3aae25ba6/yp/full/ap1000_us0_pi409_s3707580783.mp3",
    "duration": "03:39"
  },
  {
    "id": "ustop_2042795036_93",
    "title": "The Radiant Guest",
    "artist": "Grant Miller",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230801/20230801155942666.jpg",
    "src": "https://sharefs.kugou.com/202603091942/d6a756fde39b88d2199cf0652eadbdc1/v3/4e1e08ef50f281b9f0f442f7e6553e6c/yp/full/ap1000_us0_pi409_s2633196131.mp3",
    "duration": "03:22"
  },
  {
    "id": "ustop_1804885420_94",
    "title": "Treated Me Like Sand",
    "artist": "Samantha Jade",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20160921/20160921172115577.jpg",
    "src": "https://sharefs.kugou.com/202603091942/48edea3e13b2903e27e0762cfb13eb64/v3/4c45ea77c855d0c50c3e0b2a71ef125d/yp/full/ap1000_us0_pi409_s1016336267.mp3",
    "duration": "02:28"
  },
  {
    "id": "ustop_1081308110_95",
    "title": "mariah",
    "artist": "Lauv",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230602/20230602172249853.jpg",
    "src": "https://sharefs.kugou.com/202603091942/b2b3d44930b803b62332922e791e5c1a/v3/a655e6e0b47d6bcc02b3f0b9a53cbc21/yp/full/ap1000_us0_pi409_s4205745930.mp3",
    "duration": "02:48"
  },
  {
    "id": "ustop_2112736857_96",
    "title": "Save The Day (From \"Hoppers\"/Soundtrack Version)",
    "artist": "SZA",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230919/20230919094949774.jpg",
    "src": "https://sharefs.kugou.com/202603091942/155980ef6979fcb738d8df8fa1c4b200/v3/2017c9f667de200b2b3fe7b1baa08cec/yp/full/ap1000_us0_pi409_s607258630.mp3",
    "duration": "02:52"
  },
  {
    "id": "ustop_198030349_97",
    "title": "ALGO TÚ",
    "artist": "Shakira",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20241216/20241216202200991323.jpg",
    "src": "https://sharefs.kugou.com/202603091942/22d85dfb1bcb42122a6f5d953df4b4b4/v3/6bd13bccd3b4f97ebb5b039216a6bfbd/yp/full/ap1000_us0_pi409_s1032894999.mp3",
    "duration": "03:33"
  },
  {
    "id": "ustop_85898175_98",
    "title": "Always You (A State of Trance 2026 ELEVATION Anthem)(ASOT 1267)(Future Favorite)",
    "artist": "Armin van Buuren",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250829/20250829175844518869.jpg",
    "src": "https://sharefs.kugou.com/202603091942/76ba5d3f0fe3160c97d4c2fec3935413/v3/785537f40bbb2c2da268fbd4a7f30b7c/yp/full/ap1000_us0_pi409_s539403625.mp3",
    "duration": "03:27"
  },
  {
    "id": "ustop_1128787641_99",
    "title": "klepto",
    "artist": "Sophie Powers",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260123/20260123142012129015.jpg",
    "src": "https://sharefs.kugou.com/202603091942/4877bf0c56101a2e660e353faf54d254/v3/ef8adcb9c316c1edae2757ea9adf0f91/yp/full/ap1000_us0_pi409_s720621696.mp3",
    "duration": "02:32"
  }
].map(song => ({
  ...song,
  src: song.src || getFallbackAudio(song.id)
}));

const MAINLAND_SONGS: Song[] = [
  {
    "id": "ndtop_1040230_0",
    "title": "而已",
    "artist": "陈卓璇",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20241216/20241216154048760853.jpg",
    "src": "https://sharefs.kugou.com/202603091942/5bf2222dad13debce66da43fdcb5c502/v3/19bb524731dd9f1732e803c156a54bf5/yp/full/ap1000_us0_pi409_s2840742913.mp3",
    "duration": "03:32"
  },
  {
    "id": "ndtop_1318725747_1",
    "title": "背着山的人",
    "artist": "周深",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230531/20230531155603291987.jpg",
    "src": "https://sharefs.kugou.com/202603091942/737af44d32c2a7bf95203a7ab79fe277/v3/611e8f05f5d68636f40a08b1b5e6f2d5/yp/full/ap1000_us0_pi409_s388208152.mp3",
    "duration": "04:04"
  },
  {
    "id": "ndtop_854559269_2",
    "title": "众里寻他千百度",
    "artist": "张碧晨",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251123/20251123222842536127.jpg",
    "src": "https://sharefs.kugou.com/202603091942/5f9e30b8c1a303a4a7fa9202c5134347/v3/5454e158e774c3afb41ad00df755e0c3/yp/full/ap1000_us0_pi409_s3257908911.mp3",
    "duration": "03:12"
  },
  {
    "id": "ndtop_949211941_3",
    "title": "等待一切重来",
    "artist": "TF_ING穆祉丞",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250116/20250116181643886592.jpg",
    "src": "https://sharefs.kugou.com/202603091942/d20c73a347ca37fed65be48b35db753e/v3/17928825a41d3ac686900e4ff1bf34b5/yp/full/ap1000_us0_pi409_s3843066464.mp3",
    "duration": "03:43"
  },
  {
    "id": "ndtop_1101418740_4",
    "title": "间距 (Live)",
    "artist": "于冬然",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20240821/20240821184137341980.jpg",
    "src": "https://sharefs.kugou.com/202603091942/7075933e101387cbcf7d4799904c1b32/v3/3cabcb939e98571ac297a433a8eb5677/yp/full/ap1000_us0_pi409_s463405908.mp3",
    "duration": "03:48"
  },
  {
    "id": "ndtop_188859948_5",
    "title": "今天不做谁的玫瑰",
    "artist": "沧桑小杰",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260209/20260209155521130215.jpg",
    "src": "https://sharefs.kugou.com/202603091942/ec2449f3895baac185ab728d1e052d7d/v3/5abfcbe3bacaffba70ecbf24b12e0aa5/yp/full/ap1000_us0_pi409_s188508239.mp3",
    "duration": "04:15"
  },
  {
    "id": "ndtop_569133862_6",
    "title": "爱我就跟我走 (r&b版)",
    "artist": "林沐沐",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260117/20260117143048579045.jpg",
    "src": "https://sharefs.kugou.com/202603091942/52c17f36769b2a6d122adaa77fd7d3a3/v3/30b119488acb4d2e64e227d49e1ff63c/yp/full/ap1000_us0_pi409_s2341679082.mp3",
    "duration": "04:14"
  },
  {
    "id": "ndtop_1091565082_7",
    "title": "Love how it fades away (爱如何消逝)",
    "artist": "Zoe (佐伊)",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260209/20260209100925478156.jpg",
    "src": "https://sharefs.kugou.com/202603091942/f36d89639d8c66c8c6d7c3fc4a9116c8/v3/6ec0f2c1f410345ce7394626e2cf8540/yp/full/ap1000_us0_pi409_s3240728209.mp3",
    "duration": "02:39"
  },
  {
    "id": "ndtop_1182223606_8",
    "title": "陌路莫回",
    "artist": "黄星",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250718/20250718102342814553.jpg",
    "src": "https://sharefs.kugou.com/202603091942/b060d51bca2215005fd1041ead9f1961/v3/9a75efcea9f1a444394169d2bc3f91bd/yp/full/ap1000_us0_pi409_s4064355646.mp3",
    "duration": "04:16"
  },
  {
    "id": "ndtop_1912408532_10",
    "title": "走着走着就散了",
    "artist": "半吨兄弟",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230510/20230510175809306.jpg",
    "src": "https://sharefs.kugou.com/202603091942/f6f795d747fd753c44ab0381cc9aabb9/v3/1356939ea22c3dc9a7d1a07e25c8b4ad/yp/full/ap1000_us0_pi409_s52708008.mp3",
    "duration": "04:12"
  },
  {
    "id": "ndtop_898254638_11",
    "title": "爱的哲学 (2026版)",
    "artist": "江晓天",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260303/20260303143001829486.jpg",
    "src": "https://sharefs.kugou.com/202603091942/65156e64737ff5669add43637c703521/v3/d9aef95f7b1165812d8d8dc90481ab34/yp/full/ap1000_us0_pi409_s54889549.mp3",
    "duration": "04:11"
  },
  {
    "id": "ndtop_304971114_12",
    "title": "风 (一切都像风)",
    "artist": "任素汐",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20231123/20231123145817862052.jpg",
    "src": "https://sharefs.kugou.com/202603091942/45153811e4ff3dee2ca8f9dcae3ea713/v3/3446bcf861ffae633120e24e3dc61657/yp/full/ap1000_us0_pi409_s4221916944.mp3",
    "duration": "03:57"
  },
  {
    "id": "ndtop_1758760460_13",
    "title": "一滴泪的时间",
    "artist": "渔总up",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20231221/20231221173501840336.jpg",
    "src": "https://sharefs.kugou.com/202603091942/bd0b579b35368b28fefb30728e094017/v3/f166fc086fd4aab85fc676086e2df0d3/yp/full/ap1000_us0_pi409_s3976106508.mp3",
    "duration": "04:15"
  },
  {
    "id": "ndtop_1880395250_14",
    "title": "我好喜欢你",
    "artist": "橘子妹",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230420/20230420214427854528.jpg",
    "src": "https://sharefs.kugou.com/202603091942/3e8d6ce8a2b3fd01fe884ebbe628b64f/v3/680c2b9365fea32a6940e323a926faf7/yp/full/ap1000_us0_pi409_s3081961502.mp3",
    "duration": "03:49"
  },
  {
    "id": "ndtop_802662_15",
    "title": "惊蛰",
    "artist": "奇然",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230720/20230720144923937.jpg",
    "src": "https://sharefs.kugou.com/202603091942/217ed4a3f428a14f06e1978d9d37dc72/v3/04ec8447f2e6c08f88c4fd71647cbadd/yp/full/ap1000_us0_pi409_s3775973985.mp3",
    "duration": "03:54"
  },
  {
    "id": "ndtop_1662981618_16",
    "title": "雨爱 (氛围男版)",
    "artist": "蒋蒋",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20240321/20240321021623295828.jpg",
    "src": "https://sharefs.kugou.com/202603091942/8c34a4c3999a309b4bf03fc2efc05fd3/v3/4d92147b118bbefa89d09c43dd5c7d4a/yp/full/ap1000_us0_pi409_s1847253390.mp3",
    "duration": "03:29"
  },
  {
    "id": "ndtop_659567169_17",
    "title": "友人身份",
    "artist": "陈默默",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251027/20251027144121272174.jpg",
    "src": "https://sharefs.kugou.com/202603091940/5fa4b47c10204b9a2b9e87eb6945eaea/v3/cf2b8233d1d6b98770d0ac7984171ffc/yp/full/ap1000_us0_pi409_s2997158939.mp3",
    "duration": "03:45"
  },
  {
    "id": "ndtop_1423860077_18",
    "title": "遇见 (R&B版)",
    "artist": "梦境里的算法official",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251225/20251225185551754455.jpg",
    "src": "https://sharefs.kugou.com/202603091942/15917220cea3eafbbae107fd34026a80/v3/1e42db7f2326b8d19492e65a7e49a67c/yp/full/ap1000_us0_pi409_s1044479879.mp3",
    "duration": "02:15"
  },
  {
    "id": "ndtop_137718966_19",
    "title": "想去寺庙断了执念 (烟嗓女版)",
    "artist": "慕容小小",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251229/20251229150148425969.jpg",
    "src": "https://sharefs.kugou.com/202603091940/d526269a210e746c10f94efa00b5660f/v3/077240129fa60801499ad8facb76dd30/yp/full/ap1000_us0_pi409_s3435425066.mp3",
    "duration": "04:16"
  },
  {
    "id": "ndtop_893203839_20",
    "title": "菩提树下我为你流泪",
    "artist": "铃小花",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260302/20260302110650419284.jpg",
    "src": "https://sharefs.kugou.com/202603091940/ef9a1ff021bf91a02ae4b50142d05ef7/v3/65f6501868d8b30c24cabd25b36bddad/yp/full/ap1000_us0_pi409_s1139373195.mp3",
    "duration": "02:40"
  },
  {
    "id": "ndtop_338162980_21",
    "title": "奇妙在身边",
    "artist": "刘宇宁",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251225/20251225171959718922.jpg",
    "src": "https://sharefs.kugou.com/202603091942/5cd8ead789c4104064fbc90fb631feec/v3/f26fa45c8b2ece39f95bc791eee3e965/yp/full/ap1000_us0_pi409_s604621109.mp3",
    "duration": "02:14"
  },
  {
    "id": "ndtop_167411686_22",
    "title": "来生啊再相见",
    "artist": "铃花儿",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251021/20251021152641316295.jpg",
    "src": "https://sharefs.kugou.com/202603091942/673ff06dc9043bda19c8c605401fd9a1/v3/041b7061c168757f51879e2bbb85fef2/yp/full/ap1000_us0_pi409_s2468283369.mp3",
    "duration": "04:06"
  },
  {
    "id": "ndtop_418719161_23",
    "title": "发如雪 (史诗版)",
    "artist": "北极星电台",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260302/20260302140543239122.jpg",
    "src": "https://sharefs.kugou.com/202603091942/83820c204d4e59b4006053c615519a32/v3/5f11906044d048724592d8d381bdc84d/yp/full/ap1000_us0_pi409_s1015539901.mp3",
    "duration": "03:45"
  },
  {
    "id": "ndtop_1332059667_24",
    "title": "没人心疼我的伤 (深情男声对唱版)",
    "artist": "励明",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230815/20230815172000265558.jpg",
    "src": "https://sharefs.kugou.com/202603091942/195d3543a828406011cf7402dea5d169/v3/9f5989c4ecb24877b2d503de8ab2b271/yp/full/ap1000_us0_pi409_s297975728.mp3",
    "duration": "03:52"
  },
  {
    "id": "ndtop_293014223_25",
    "title": "第一次 (当你看着我)",
    "artist": "周深深",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20240821/20240821222408528360.jpg",
    "src": "https://sharefs.kugou.com/202603091942/c6167cb5c0dc0aa725c3ae28814e8e32/v3/334d7598cd8568127cd21ff701334438/yp/full/ap1000_us0_pi409_s596883766.mp3",
    "duration": "04:00"
  },
  {
    "id": "ndtop_828424128_26",
    "title": "我不是伟人 (粤语版)",
    "artist": "雾未尽",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260107/20260107223525520317.jpg",
    "src": "https://sharefs.kugou.com/202603091942/4c4aa55d40c8fad08928895ceae52304/v3/a93928a91258cd7299ae4498e6e8f27f/yp/full/ap1000_us0_pi409_s929986667.mp3",
    "duration": "03:48"
  },
  {
    "id": "ndtop_1225679827_28",
    "title": "山水不相见",
    "artist": "老K（铁汉唱柔情）",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260118/20260118143849180947.jpg",
    "src": "https://sharefs.kugou.com/202603091942/bf1b7fd6481dbf4c5a51bbe91b549b15/v3/45f8456106fc2f36de8772d2779fc8df/yp/full/ap1000_us0_pi409_s3740676409.mp3",
    "duration": "03:11"
  },
  {
    "id": "ndtop_1131105851_29",
    "title": "傻瓜不再傻 (对唱版)",
    "artist": "六小乐",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260119/20260119142905510559.jpg",
    "src": "https://sharefs.kugou.com/202603091942/b4242e4314736f5613dbe32d2a723396/v3/c87a05d44b627010151936ceabd527f9/yp/full/ap1000_us0_pi409_s1770433311.mp3",
    "duration": "03:23"
  },
  {
    "id": "ndtop_1765195588_30",
    "title": "孽 (看那纯情的妖)",
    "artist": "大猫AIGC",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251103/20251103105110916682.jpg",
    "src": "https://sharefs.kugou.com/202603091940/7c601f78aa2fd1cda714479644912afa/v3/6b0d1741ca5d01cd084bc140bfd4b8ac/yp/full/ap1000_us0_pi409_s279764331.mp3",
    "duration": "04:09"
  },
  {
    "id": "ndtop_796281_31",
    "title": "愿忘",
    "artist": "陈卓璇",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20241216/20241216154048760853.jpg",
    "src": "https://sharefs.kugou.com/202603091942/9be17bbf3499e8996ddd1ccebe470dfa/v3/7cd0b0b18c965ddc7f4222280df7bedf/yp/full/ap1000_us0_pi409_s4156025504.mp3",
    "duration": "03:18"
  },
  {
    "id": "ndtop_276018011_32",
    "title": "上弦月 (R&B版)",
    "artist": "魔的街",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250517/20250517175349931342.jpg",
    "src": "https://sharefs.kugou.com/202603091942/f8faf069c785ade424c00f5b412bda55/v3/b8b959ab9f19567e0975f73fa82872e7/yp/full/ap1000_us0_pi409_s2352844607.mp3",
    "duration": "03:38"
  },
  {
    "id": "ndtop_1153518780_33",
    "title": "你把爱情给了谁 (口哨版)",
    "artist": "DJ铁柱",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230420/20230420153441772093.jpg",
    "src": "https://sharefs.kugou.com/202603091942/c8adb803a34320ce4977ca3c6048b7b2/v3/152f15b1226ffc9ddfd205a6f791e94b/yp/full/ap1000_us0_pi409_s1840259771.mp3",
    "duration": "01:49"
  },
  {
    "id": "ndtop_2103348710_34",
    "title": "一样的月光 (怎么你留下最真实的回忆)",
    "artist": "LUCY日记",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251208/20251208153701694395.jpg",
    "src": "https://sharefs.kugou.com/202603091942/8d92c75d0900bd15d851f15324c88848/v3/716fee2af38cb4919bd0e72aa176a822/yp/full/ap1000_us0_pi409_s446894602.mp3",
    "duration": "02:41"
  },
  {
    "id": "ndtop_1829159601_35",
    "title": "苍天求你赐我一束光",
    "artist": "烟嗓兄弟",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250901/20250901111318808602.jpg",
    "src": "https://sharefs.kugou.com/202603091942/40c77803ff954ba6e83ad840e8fd991c/v3/1f193be3f49dbfdf14196a0b1248b744/yp/full/ap1000_us0_pi409_s2880096200.mp3",
    "duration": "02:38"
  },
  {
    "id": "ndtop_1737640912_36",
    "title": "不是怎么老贝榨啊 (俭条小曲)",
    "artist": "心动收音机",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250815/20250815182633348601.jpg",
    "src": "https://sharefs.kugou.com/202603091942/cebbf0549ab4bbced2e7f33f561bd9bd/v3/0514d65411a75586121a05bdee6b3098/yp/full/ap1000_us0_pi409_s3084201006.mp3",
    "duration": "03:05"
  },
  {
    "id": "ndtop_817898069_37",
    "title": "月亮月亮我向你许愿 (祈福版)",
    "artist": "菱菱壹",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251104/20251104142550687049.jpg",
    "src": "https://sharefs.kugou.com/202603091940/fd1a56b6bd4e5de126fd53940c5bc7a2/v3/c1cdb5178fc4ab4b3f5ac1eb81018f43/yp/full/ap1000_us0_pi409_s365532462.mp3",
    "duration": "02:58"
  },
  {
    "id": "ndtop_1946196102_38",
    "title": "Sacred Play Secret Place (动感进行曲)",
    "artist": "我期待的不是你",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250319/20250319120349744441.jpg",
    "src": "https://sharefs.kugou.com/202603091942/5d886110d5abe317a7b56f6c2459ff7d/v3/fe74bc61ec1e90a17f7500c1baadf426/yp/full/ap1000_us0_pi409_s1249111612.mp3",
    "duration": "02:16"
  },
  {
    "id": "ndtop_506720841_39",
    "title": "从此我们再也没见 (什么风能吹动你心弦)",
    "artist": "张云汐",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230711/20230711142000329552.jpg",
    "src": "https://sharefs.kugou.com/202603091942/88c427a138e5faa9d085f0bf8df6f221/v3/e07195b41649537ced69410fd7b2cb9b/yp/full/ap1000_us0_pi409_s2238319350.mp3",
    "duration": "04:45"
  },
  {
    "id": "ndtop_109701479_40",
    "title": "当 (女声版)",
    "artist": "陆小九",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250729/20250729174042745388.jpg",
    "src": "https://sharefs.kugou.com/202603091942/e36d378a575802ee41cfff386ae00b09/v3/45506ea38e777428ae428e67ae391798/yp/full/ap1000_us0_pi409_s757190889.mp3",
    "duration": "03:31"
  },
  {
    "id": "ndtop_2005458438_41",
    "title": "下完这场雨",
    "artist": "乐火火",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251205/20251205172504912457.jpg",
    "src": "https://sharefs.kugou.com/202603091942/5d51f65d434870ce78010c4c6bf53348/v3/f644158283f0a4618a184f30efefd28c/yp/full/ap1000_us0_pi409_s1321760930.mp3",
    "duration": "03:58"
  },
  {
    "id": "ndtop_989323756_42",
    "title": "如果呢 (深情男声)",
    "artist": "任时安",
    "cover": "https://m.kugou.com/static/images/share2014/default_singer.jpg",
    "src": "https://sharefs.kugou.com/202603091942/cf231f910bbe404e4766d01c57e07058/v3/61a8c5f4dea490e0f9eea2606181b823/yp/full/ap1000_us0_pi409_s2649515560.mp3",
    "duration": "03:39"
  },
  {
    "id": "ndtop_67229303_43",
    "title": "恋曲2026",
    "artist": "洋澜一",
    "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=3334965202.mp3",
    "duration": "05:54"
  },
  {
    "id": "ndtop_326409965_44",
    "title": "一吻 (一吻能把你俘获么)(Remix)",
    "artist": "李毅恩Lye",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251129/20251129215759934252.jpg",
    "src": "https://sharefs.kugou.com/202603091940/6dd3aed30e7116d971577882f96cbe4f/v3/80dda81066e8425de637bea1b8491449/yp/full/ap1000_us0_pi409_s2913735589.mp3",
    "duration": "01:01"
  },
  {
    "id": "ndtop_1720696842_45",
    "title": "没人心疼我的伤 (我没人撑腰没人帮)",
    "artist": "励明",
    "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=3356018635.mp3",
    "duration": "02:50"
  },
  {
    "id": "ndtop_204425545_46",
    "title": "约定 (你我约定难过的往事不许提)",
    "artist": "允上",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250731/20250731171752962425.jpg",
    "src": "https://sharefs.kugou.com/202603091942/bb421028bec89530d23c8cfacfcaf9a5/v3/25c88662bce5509c2f3be7dcec35fc49/yp/full/ap1000_us0_pi409_s2241211732.mp3",
    "duration": "03:55"
  },
  {
    "id": "ndtop_2035992619_48",
    "title": "倾城 (港风女声版)",
    "artist": "林咏诗",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260112/20260112120049742386.jpg",
    "src": "https://sharefs.kugou.com/202603091942/385be23ab463df5d7146f9b143a4f5a6/v3/f7aaa2447dbdf6ff102986f3c1c3c97c/yp/full/ap1000_us0_pi409_s656265318.mp3",
    "duration": "03:36"
  },
  {
    "id": "ndtop_1726416844_49",
    "title": "最后一次 (港风女声版)",
    "artist": "林咏诗",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260112/20260112120049742386.jpg",
    "src": "https://sharefs.kugou.com/202603091942/0078162aabbdf8a7376c2a0595b5e1de/v3/806695d848d122216d6efaea31dbab79/yp/full/ap1000_us0_pi409_s1224564012.mp3",
    "duration": "03:25"
  },
  {
    "id": "ndtop_792285963_51",
    "title": "爱我就跟我走 (如果爱我你就轻轻点点头)",
    "artist": "梦境里的算法",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251207/20251207191658820877.jpg",
    "src": "https://sharefs.kugou.com/202603091942/c9d8c154956e3cbf5308b73626f5a1fb/v3/2b2ab678e69d267219d3feaedaf2c23d/yp/full/ap1000_us0_pi409_s3462865518.mp3",
    "duration": "03:24"
  },
  {
    "id": "ndtop_1396846395_52",
    "title": "不如见一面 (玲汁remix版)",
    "artist": "玲汁",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251212/20251212140405715670.jpg",
    "src": "https://sharefs.kugou.com/202603091942/bcd43a716384dae9d4cc6d7902bbc195/v3/01c9976ad54e29225245a2b8e32be21c/yp/full/ap1000_us0_pi409_s3940181975.mp3",
    "duration": "04:41"
  },
  {
    "id": "ndtop_1718867062_53",
    "title": "陈平安进行曲 (剑来)",
    "artist": "DJ铁柱",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230420/20230420153441772093.jpg",
    "src": "https://sharefs.kugou.com/202603091942/ba11e672e346500fa74be81a41119365/v3/42d470311c15b6d6ff516adfcf223fb0/yp/full/ap1000_us0_pi409_s3028429329.mp3",
    "duration": "02:12"
  },
  {
    "id": "ndtop_1632349523_54",
    "title": "春风你不懂我的伤悲",
    "artist": "铃小花",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260302/20260302110650419284.jpg",
    "src": "https://sharefs.kugou.com/202603091942/0bd759a18dbd549ea3cee3a6cdc11a8d/v3/e80359c158055f007212abee232c207b/yp/full/ap1000_us0_pi409_s2294482116.mp3",
    "duration": "03:03"
  },
  {
    "id": "ndtop_280763154_55",
    "title": "玉芬啊玉芬你让彪哥好伤心",
    "artist": "老韩很哇塞",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260225/20260225010349833566.jpg",
    "src": "https://sharefs.kugou.com/202603091940/53f156ed98fc6e1891df4fb29004eefa/v3/aff2135f30f90b6768af3320505559cf/yp/full/ap1000_us0_pi409_s1047894494.mp3",
    "duration": "03:00"
  },
  {
    "id": "ndtop_7614222_56",
    "title": "身份不对称",
    "artist": "神勇尼尼",
    "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=3355215922.mp3",
    "duration": "03:08"
  },
  {
    "id": "ndtop_1104521806_57",
    "title": "若不是因为你 (粤语女声版)",
    "artist": "林咏诗",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260112/20260112120049742386.jpg",
    "src": "https://sharefs.kugou.com/202603091942/fbeb8cdf4180dd70e9cf8c0e3c038b11/v3/35b171bbd5b7dcb06432ac9c127c950c/yp/full/ap1000_us0_pi409_s3822788284.mp3",
    "duration": "03:34"
  },
  {
    "id": "ndtop_730240256_58",
    "title": "爱你没错 (R&B版)",
    "artist": "音乐的入门到改行",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260111/20260111104349800865.jpg",
    "src": "https://sharefs.kugou.com/202603091942/7925cdc53281659a0a0d19fb16a8ce9e/v3/dca93d29be93707a024d09fcca467c51/yp/full/ap1000_us0_pi409_s964654229.mp3",
    "duration": "04:12"
  },
  {
    "id": "ndtop_662020608_59",
    "title": "反复空虚",
    "artist": "林咏诗",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260112/20260112120049742386.jpg",
    "src": "https://sharefs.kugou.com/202603091942/9cb6a289ab7ed8392e1acd04e1528499/v3/8cc5d7831fb05b82ada3cb7cad4dfac9/yp/full/ap1000_us0_pi409_s2142175069.mp3",
    "duration": "03:05"
  },
  {
    "id": "ndtop_419598927_60",
    "title": "我从未走进你心里",
    "artist": "励明",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230815/20230815172000265558.jpg",
    "src": "https://sharefs.kugou.com/202603091942/09a1109227b6ed179d37e9abb0f79edc/v3/864cd3155282dc7a119b077c0bd205df/yp/full/ap1000_us0_pi409_s808450706.mp3",
    "duration": "04:46"
  },
  {
    "id": "ndtop_879835800_61",
    "title": "浪人情歌 (女声心碎版)",
    "artist": "铃花儿",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251021/20251021152641316295.jpg",
    "src": "https://sharefs.kugou.com/202603091942/264fa1801d214f7e0339b509c88db560/v3/f1dea4a24047d9c6e5830a1e632b21db/yp/full/ap1000_us0_pi409_s679840004.mp3",
    "duration": "04:28"
  },
  {
    "id": "ndtop_716948892_62",
    "title": "藕断丝连 (Live)",
    "artist": "熊连芬",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230420/20230420233805239670.jpg",
    "src": "https://sharefs.kugou.com/202603091942/041fbde5abe1f3699c448ff30cd967d1/v3/1f4b09c1b7b679761690256f83ecd78e/yp/full/ap1000_us0_pi409_s1708493775.mp3",
    "duration": "04:31"
  },
  {
    "id": "ndtop_772563691_63",
    "title": "我好像在哪见过你",
    "artist": "洛诗诗",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250829/20250829192421773024.jpg",
    "src": "https://sharefs.kugou.com/202603091942/83e8ba42bd3f851f43878cd6b92d0101/v3/075cc45143a8fd4a44142b5ac5479cf3/yp/full/ap1000_us0_pi409_s3575917416.mp3",
    "duration": "04:12"
  },
  {
    "id": "ndtop_2098482343_64",
    "title": "寂寞才说爱 (R&B版)",
    "artist": "卷笔刀阿卷",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251118/20251118182958813096.jpg",
    "src": "https://sharefs.kugou.com/202603091942/88e9c60cade24828a83af7bbe5253174/v3/7d30cb7d341dd629ea1cf665cb96502e/yp/full/ap1000_us0_pi409_s3904149359.mp3",
    "duration": "04:05"
  },
  {
    "id": "ndtop_1477330822_66",
    "title": "傻瓜不再傻",
    "artist": "六小乐",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260119/20260119142905510559.jpg",
    "src": "https://sharefs.kugou.com/202603091942/37b8d0c45c1d1d2ae4c05a0e49cf2c49/v3/56f09e0b2e468c2e0eadfa03d764da55/yp/full/ap1000_us0_pi409_s544939456.mp3",
    "duration": "03:27"
  },
  {
    "id": "ndtop_435850251_67",
    "title": "难道 (撕裂版)",
    "artist": "阿野",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260210/20260210170349542521.jpg",
    "src": "https://sharefs.kugou.com/202603091942/fc66cf182cc7078231454f75fcccb4bd/v3/913a4ad9fa1785d1afc8002bc733b417/yp/full/ap1000_us0_pi409_s2821102943.mp3",
    "duration": "04:51"
  },
  {
    "id": "ndtop_23623152_68",
    "title": "山歌王",
    "artist": "功夫胖KUNGFU-PEN",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250515/20250515141103533959.jpg",
    "src": "https://sharefs.kugou.com/202603091942/905b7e3a5de4e5b2044e3e47df5db849/v3/96e648d8cba974142ff9a11608d66996/yp/full/ap1000_us0_pi409_s1507107450.mp3",
    "duration": "03:18"
  },
  {
    "id": "ndtop_644607773_69",
    "title": "这一别是永远 (女版)",
    "artist": "铃花儿",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251021/20251021152641316295.jpg",
    "src": "https://sharefs.kugou.com/202603091940/48e349b80dde6b8c72a19a2b21ece061/v3/0207c8f1e19b56c26f7e2944400ac4b4/yp/full/ap1000_us0_pi409_s3377490085.mp3",
    "duration": "04:46"
  },
  {
    "id": "ndtop_378715440_70",
    "title": "第三个吻痕 (暧昧版)",
    "artist": "何水水",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250606/20250606163648445588.jpg",
    "src": "https://sharefs.kugou.com/202603091940/38e8123ef4e6e1ffd6ee80db249c3114/v3/3d9903853a788b129d1f0121cabc4264/yp/full/ap1000_us0_pi409_s3837556536.mp3",
    "duration": "02:27"
  },
  {
    "id": "ndtop_1956594152_71",
    "title": "想做旷野里的风",
    "artist": "Yang.Lc",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20241018/20241018031352406330.jpg",
    "src": "https://sharefs.kugou.com/202603091942/32dcfa3039feefe2d9abbb0c1881488b/v3/753a848bf77c1d8e026731d8768f38f6/yp/full/ap1000_us0_pi409_s2983559653.mp3",
    "duration": "03:37"
  },
  {
    "id": "ndtop_637985484_72",
    "title": "人间共鸣",
    "artist": "李健",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20241216/20241216202247841593.jpg",
    "src": "https://sharefs.kugou.com/202603091940/c6bbc0dbf3964af2b22e378a38bd179c/v3/c9a5658204bd4e941f3db2fb132d4968/yp/full/ap1000_us0_pi409_s210537825.mp3",
    "duration": "04:19"
  },
  {
    "id": "ndtop_1250789804_73",
    "title": "我希望多年后",
    "artist": "铃花儿",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251021/20251021152641316295.jpg",
    "src": "https://sharefs.kugou.com/202603091942/4f73068b6e8ec14847c4a5522f14d00e/v3/c72c3679e23de88106ae73e1d86478e3/yp/full/ap1000_us0_pi409_s1351450182.mp3",
    "duration": "03:11"
  },
  {
    "id": "ndtop_914020618_74",
    "title": "只对你心动",
    "artist": "星禾",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251208/20251208142152555925.jpg",
    "src": "https://sharefs.kugou.com/202603091943/13eca091b84cb1bf0e46d409fcd34425/v3/326770f6a9902334fa2db8baebb97364/yp/full/ap1000_us0_pi409_s4109441579.mp3",
    "duration": "03:59"
  },
  {
    "id": "ndtop_1025150700_75",
    "title": "大风在刮大雪在下 (对唱版)",
    "artist": "六小乐",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251208/20251208151549718348.jpg",
    "src": "https://sharefs.kugou.com/202603091943/32bfbee0d72a44aca0154992f6d6d544/v3/84d0120c6aea47e207b13246c2ae4ae2/yp/full/ap1000_us0_pi409_s929134618.mp3",
    "duration": "03:05"
  },
  {
    "id": "ndtop_71571070_76",
    "title": "天亮了 (烟嗓版)",
    "artist": "江远兮",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251025/20251025095109149060.jpg",
    "src": "https://sharefs.kugou.com/202603091943/765e7b7719ff6dfa69339db7f09cf36b/v3/3ec1e7702a6ed35d40b7cbff2279a282/yp/full/ap1000_us0_pi409_s3486637948.mp3",
    "duration": "04:19"
  },
  {
    "id": "ndtop_2022610997_77",
    "title": "爱到不爱为止",
    "artist": "阿乐",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251211/20251211141321320218.jpg",
    "src": "https://sharefs.kugou.com/202603091943/f2ff81eccb2b2b5a823880e885413bfe/v3/ea3577d619967683f0f59260e8f48977/yp/full/ap1000_us0_pi409_s1451797746.mp3",
    "duration": "02:58"
  },
  {
    "id": "ndtop_654223329_79",
    "title": "你就不要想起我 (R&B版)",
    "artist": "盐汐",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260204/20260204182049941883.jpg",
    "src": "https://sharefs.kugou.com/202603091943/7b64f2845623c3f6c40237c270e3cc90/v3/dbc9a4645b5faf140934eaee098ae740/yp/full/ap1000_us0_pi409_s2346088960.mp3",
    "duration": "04:10"
  },
  {
    "id": "ndtop_811449_80",
    "title": "执着",
    "artist": "大橘子",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250319/20250319140905885428.jpg",
    "src": "https://sharefs.kugou.com/202603091943/b42b127af251c84b45016bf2474373d2/v3/0908153964e3efb181277c45f655e7d2/yp/full/ap1000_us0_pi409_s1230255944.mp3",
    "duration": "02:47"
  },
  {
    "id": "ndtop_528883344_81",
    "title": "熬过风雪熬过冬 (后来一个人旅行和一场雪)(释怀对唱版)",
    "artist": "沧桑小杰",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260209/20260209155521130215.jpg",
    "src": "https://sharefs.kugou.com/202603091943/10f5c8bd3e0ddeac8a2d499996984f7a/v3/218f5fe9d7a99ded14e3302ad7f933b8/yp/full/ap1000_us0_pi409_s2795183361.mp3",
    "duration": "04:03"
  },
  {
    "id": "ndtop_1878758565_82",
    "title": "今生啊 多相见 (破碎版)",
    "artist": "京六",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260227/20260227145710348133.jpg",
    "src": "https://sharefs.kugou.com/202603091943/39d97e84929978463b19ba640bd8fddc/v3/189e8faebeab03373a351c6608ff9438/yp/full/ap1000_us0_pi409_s3278858405.mp3",
    "duration": "04:49"
  },
  {
    "id": "ndtop_565875537_83",
    "title": "故乡的风来了又走",
    "artist": "老板",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230420/20230420152703901247.jpg",
    "src": "https://sharefs.kugou.com/202603091943/ce343abd467f5bdf1e63921d9065f90f/v3/cb4aa279dc0be5bc6948bd351f6fdd77/yp/full/ap1000_us0_pi409_s386313690.mp3",
    "duration": "03:18"
  },
  {
    "id": "ndtop_704230_84",
    "title": "吉量",
    "artist": "周深",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230531/20230531155603291987.jpg",
    "src": "https://sharefs.kugou.com/202603091943/4249be79365bf252bbe7f6860578e30d/v3/c5a8b5a97b8ab4d75d5e60c8f0b1ad6f/yp/full/ap1000_us0_pi409_s3993148264.mp3",
    "duration": "03:56"
  },
  {
    "id": "ndtop_384677148_85",
    "title": "这一别千万里",
    "artist": "女房客",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250926/20250926174402972163.jpg",
    "src": "https://sharefs.kugou.com/202603091943/8f2536270218fa878ff8750dc6d06ba6/v3/e627aef914545e3ff24e1425c2cbbde9/yp/full/ap1000_us0_pi409_s1310978549.mp3",
    "duration": "04:17"
  },
  {
    "id": "ndtop_707316057_86",
    "title": "一直很安静 (再见容易再见难)",
    "artist": "DreamSky",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260114/20260114181532216709.jpg",
    "src": "https://sharefs.kugou.com/202603091943/559fde6813b979e9e530423441238399/v3/ccb0663ba4fe03fc33e082ea153a456b/yp/full/ap1000_us0_pi409_s2897649559.mp3",
    "duration": "02:58"
  },
  {
    "id": "ndtop_22907991_87",
    "title": "失眠了",
    "artist": "吴琳珂（莫斯珂）",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250314/20250314174712736486.jpg",
    "src": "https://sharefs.kugou.com/202603091940/d7d9b58669c99843383e0729e4dc0849/v3/be9098939bc14a6b97958b9b865c9820/yp/full/ap1000_us0_pi409_s3759691191.mp3",
    "duration": "04:14"
  },
  {
    "id": "ndtop_858393990_88",
    "title": "金玉良缘 (R&B版)",
    "artist": "梦境里的算法official",
    "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=3337651358.mp3",
    "duration": "03:49"
  },
  {
    "id": "ndtop_238854809_89",
    "title": "等风吹散思念",
    "artist": "孙茹雪",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250513/20250513094256943192.jpg",
    "src": "https://sharefs.kugou.com/202603091940/34af5e82217516191150a1f6bc658fa7/v3/a147f4309a5cc31f2b33c48fec28089a/yp/full/ap1000_us0_pi409_s263414398.mp3",
    "duration": "03:19"
  },
  {
    "id": "ndtop_382588036_90",
    "title": "挪威的森林 (女声版)",
    "artist": "大头钉",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251114/20251114161548231787.jpg",
    "src": "https://sharefs.kugou.com/202603091943/b067a16b0f46e2fbfede1a26f31e5a1e/v3/8133d67e60f8d11e10586d373d37e2cd/yp/full/ap1000_us0_pi409_s3086731615.mp3",
    "duration": "04:00"
  },
  {
    "id": "ndtop_1948261012_91",
    "title": "绝口不提爱你 (深爱的人做不了朋友)",
    "artist": "李郁花",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250729/20250729170442945856.jpg",
    "src": "https://sharefs.kugou.com/202603091943/6ff5055eda9787db782d7cebe10c79d0/v3/ccd7f51387ff1c2f9ee4e24132cf0423/yp/full/ap1000_us0_pi409_s793232314.mp3",
    "duration": "03:13"
  },
  {
    "id": "ndtop_246248579_92",
    "title": "只求今生别把我忘记",
    "artist": "铃花儿",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251021/20251021152641316295.jpg",
    "src": "https://sharefs.kugou.com/202603091943/08b265fc6670ba74a2c1e3e99ee911e4/v3/60dd37c68f3f748a97010ed96f316283/yp/full/ap1000_us0_pi409_s2090654032.mp3",
    "duration": "02:42"
  },
  {
    "id": "ndtop_2091634655_93",
    "title": "只有你不知道 (港风女声版)",
    "artist": "林咏诗",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260112/20260112120049742386.jpg",
    "src": "https://sharefs.kugou.com/202603091943/8c8621e05c93c600144a4506e9ec6204/v3/3ea9777f2d9166182eb9c90bf3c15771/yp/full/ap1000_us0_pi409_s6693417.mp3",
    "duration": "03:05"
  },
  {
    "id": "ndtop_233614942_94",
    "title": "Dear D (Remix)",
    "artist": "北也",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251231/20251231170712804852.jpg",
    "src": "https://sharefs.kugou.com/202603091943/035a42b8ade766025057bc3a22355fa7/v3/e5a16420c503ff52d9cee2c2088077e6/yp/full/ap1000_us0_pi409_s900394560.mp3",
    "duration": "02:01"
  },
  {
    "id": "ndtop_932478911_95",
    "title": "永远不回头",
    "artist": "沈腾",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20240124/20240124155659457.jpg",
    "src": "https://sharefs.kugou.com/202603091941/5a30928c27522f4311e6904c3e4b0b46/v3/8104dec4432e897ff333424263988c4a/yp/full/ap1000_us0_pi409_s2646312457.mp3",
    "duration": "05:01"
  },
  {
    "id": "ndtop_1130640157_96",
    "title": "只要有你 (烟嗓版)(Remix)",
    "artist": "青墨",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251231/20251231214841648746.jpg",
    "src": "https://sharefs.kugou.com/202603091940/45f994bab6b76964473056435f79443a/v3/f00bf0c72d376e1f409913f8767c51fc/yp/full/ap1000_us0_pi409_s2387562878.mp3",
    "duration": "03:33"
  },
  {
    "id": "ndtop_797481245_97",
    "title": "M3 (PHONK)",
    "artist": "SEVENOP",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20241014/20241014173324425354.jpg",
    "src": "https://sharefs.kugou.com/202603091943/e60c13020312a4888a5c4b5ea735dbcc/v3/f34c07e1c9e258443b7c6f8b8af7d8e2/yp/full/ap1000_us0_pi409_s763886169.mp3",
    "duration": "02:08"
  },
  {
    "id": "ndtop_65731912_98",
    "title": "我知道 (R&B版)",
    "artist": "音乐的入门到改行",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260111/20260111104349800865.jpg",
    "src": "https://sharefs.kugou.com/202603091943/b84cffb496d3e06799be04a08fad6d97/v3/c2a331c2f41361354c7e4515608d92e8/yp/full/ap1000_us0_pi409_s3357350039.mp3",
    "duration": "04:06"
  },
  {
    "id": "ndtop_389005121_99",
    "title": "我本将心向明月 (王侯将相本无种)",
    "artist": "Dr.Phonk",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250102/20250102220039219544.jpg",
    "src": "https://sharefs.kugou.com/202603091940/d919ec3edd6b10c4b0fa4e58a8cafd5a/v3/c00351d2789093fd320eb7d95adf0224/yp/full/ap1000_us0_pi409_s3957281751.mp3",
    "duration": "02:31"
  }
].map(song => ({
  ...song,
  src: song.src || getFallbackAudio(song.id)
}));



const KOREAN_SONGS: Song[] = [
  {
    "id": "korean_2685583481",
    "title": "Radio (Dum-Dum)",
    "artist": "宋雨琦",
    "cover": "https://p1.music.126.net/UxKFTTOO-GAWX5rx9EPnAw==/109951170726026022.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2685583481.mp3",
    "duration": "02:32"
  },
  {
    "id": "korean_3338859069",
    "title": "Love Me More",
    "artist": "Apink",
    "cover": "https://p1.music.126.net/EtRXoY1Ce8FkpaAm35-uQQ==/109951172687105110.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3338859069.mp3",
    "duration": "03:14"
  },
  {
    "id": "korean_2724740617",
    "title": "JUMP",
    "artist": "BLACKPINK",
    "cover": "https://p1.music.126.net/pGrBP5gI3dJbV-jQBCbhxw==/109951171942613882.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2724740617.mp3",
    "duration": "02:45"
  },
  {
    "id": "korean_3336111049",
    "title": "Promise",
    "artist": "Wonstein",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20240812/20240812170114242243.jpg",
    "src": "https://sharefs.kugou.com/202603092014/89b9d5a520749888aca25aca2de500f7/v3/7995d37f47ac7993b5c17da1f73bb4ff/yp/full/ap1000_us0_pi409_s2110260655.mp3",
    "duration": "03:08"
  },
  {
    "id": "korean_3336106109",
    "title": "Never Let Go",
    "artist": "LNGSHOT",
    "cover": "https://p1.music.126.net/4szAwelP64r5aKbEtFD2ug==/109951172545043919.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3336106109.mp3",
    "duration": "03:14"
  },
  {
    "id": "korean_2717862847",
    "title": "Golden",
    "artist": "HUNTR/X/EJAE/Audrey Nuna/REI AMI/KPop Demon Hunters Cast",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250715/20250715130242885648.jpg",
    "src": "https://sharefs.kugou.com/202603092014/40b29c036dd8c9bcd3fc12b388bf5da9/v3/8639e310aadab4c8f4e784d01f7ae1ff/yp/full/ap1000_us0_pi409_s2189022648.mp3",
    "duration": "03:15"
  },
  {
    "id": "korean_2678565386",
    "title": "Luxury",
    "artist": "한나",
    "cover": "https://p1.music.126.net/B6PqIqQfYK8SDMkyWqVeSQ==/109951170516554026.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2678565386.mp3",
    "duration": "03:41"
  },
  {
    "id": "korean_3341444739",
    "title": "404 (New Era)",
    "artist": "KiiiKiii",
    "cover": "https://p1.music.126.net/4_hCwxnx5mC0yeb--0fQgw==/109951172622623026.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3341444739.mp3",
    "duration": "02:60"
  },
  {
    "id": "korean_3345742935",
    "title": "BANG BANG",
    "artist": "IVE",
    "cover": "https://p1.music.126.net/jR-P_Lx2I57DKOXGgTZH9A==/109951172695975592.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3345742935.mp3",
    "duration": "02:58"
  },
  {
    "id": "korean_2142598645",
    "title": "TRUE",
    "artist": "Yoari",
    "cover": "https://p1.music.126.net/_yJtyubQXbumm8nMrBM3kA==/109951169470151599.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2142598645.mp3",
    "duration": "03:12"
  },
  {
    "id": "korean_2718589640",
    "title": "Deja Vu",
    "artist": "RESCENE",
    "cover": "https://p1.music.126.net/vI2GB2eZ6ITGKRnqcBeCiA==/109951171350566111.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2718589640.mp3",
    "duration": "03:04"
  },
  {
    "id": "korean_2642222705",
    "title": "DRIP",
    "artist": "BABYMONSTER",
    "cover": "https://p1.music.126.net/ydWt-4QpSQ0h9S6LpsM7Xg==/109951170178512289.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2642222705.mp3",
    "duration": "03:01"
  },
  {
    "id": "korean_2148791540",
    "title": "On Clap(Feat. Lexie Liu)",
    "artist": "宋雨琦/刘柏辛Lexie",
    "cover": "https://p1.music.126.net/XtLBb9G-O2VXb1oPwE9Usw==/109951169525425227.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2148791540.mp3",
    "duration": "01:59"
  },
  {
    "id": "korean_3336112841",
    "title": "Daydream",
    "artist": "WENDY",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250910/20250910170016336607.jpg",
    "src": "https://sharefs.kugou.com/202603092014/753ba95e7af8b960695f6292b6e42c25/v3/9603cea176b407b50cfb5bf22582f606/yp/full/ap1000_us0_pi409_s1075764915.mp3",
    "duration": "04:34"
  },
  {
    "id": "korean_3336112836",
    "title": "사랑의 언어 (Love Language)",
    "artist": "金敏奭 (MeloMance)",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250429/20250429170403235396.jpg",
    "src": "https://sharefs.kugou.com/202603092014/1bebaafabdda8d68bcc54e3c0484e45c/v3/64a2283ce6f59a02ad6c038f98f62d1c/yp/full/ap1000_us0_pi409_s4172031662.mp3",
    "duration": "03:06"
  },
  {
    "id": "korean_2088813190",
    "title": "different",
    "artist": "leejean",
    "cover": "https://p1.music.126.net/sTskCoPQuziwTQYHZ5Q5Rw==/109951169928725925.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2088813190.mp3",
    "duration": "02:57"
  },
  {
    "id": "korean_2754243668",
    "title": "WE GO UP",
    "artist": "BABYMONSTER",
    "cover": "https://p1.music.126.net/1JGdLgaUkCKKlfJek3fE-w==/109951172206605934.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2754243668.mp3",
    "duration": "03:07"
  },
  {
    "id": "korean_2631840130",
    "title": "짠해",
    "artist": "FIESTAR",
    "cover": "https://p1.music.126.net/Db9Xzd8A3SPkmXCdhavIbg==/109951169999739817.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2631840130.mp3",
    "duration": "03:51"
  },
  {
    "id": "korean_2148792240",
    "title": "FREAK",
    "artist": "宋雨琦",
    "cover": "https://p1.music.126.net/XtLBb9G-O2VXb1oPwE9Usw==/109951169525425227.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2148792240.mp3",
    "duration": "02:51"
  },
  {
    "id": "korean_3341445520",
    "title": "Delulu",
    "artist": "KiiiKiii",
    "cover": "https://p1.music.126.net/4_hCwxnx5mC0yeb--0fQgw==/109951172622623026.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3341445520.mp3",
    "duration": "02:24"
  },
  {
    "id": "korean_3343953303",
    "title": "STEREOTYPE (Chinese Ver.)",
    "artist": "STAYC",
    "cover": "https://p1.music.126.net/K_WwO824Rcw_TGNHHWWprQ==/109951172655253150.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3343953303.mp3",
    "duration": "03:11"
  },
  {
    "id": "korean_2681425876",
    "title": "아무래도 (Feat. ZENE THE ZILLA) (feat. ZENE THE ZILLA (제네 더 질라))",
    "artist": "TOIL/Gist",
    "cover": "https://p1.music.126.net/bWVMwh6ysUq1zVIlNXQ1Ew==/109951170546580389.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2681425876.mp3",
    "duration": "03:31"
  },
  {
    "id": "korean_3336106853",
    "title": "Moonwalkin'",
    "artist": "LNGSHOT",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260212/20260212171142445338.jpg",
    "src": "https://sharefs.kugou.com/202603092014/53b2b7be0a832c5fcb224b4f74cc869a/v3/fde4ad24a7db2a5a99c928f1514d30e7/yp/full/ap1000_us0_pi409_s1281250642.mp3",
    "duration": "03:28"
  },
  {
    "id": "korean_2707406681",
    "title": "Lips Hips Kiss",
    "artist": "KISS OF LIFE",
    "cover": "https://p1.music.126.net/c0R-IFZ4tCd5oZ1SB5bKIg==/109951171027940643.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2707406681.mp3",
    "duration": "03:09"
  },
  {
    "id": "korean_3343982029",
    "title": "Mono (Feat. skaiwater)",
    "artist": "i-dle/skaiwater",
    "cover": "https://p1.music.126.net/rDue34LECgYVmBznb-ezXQ==/109951172798093587.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3343982029.mp3",
    "duration": "02:51"
  },
  {
    "id": "korean_3351763683",
    "title": "Shut Up",
    "artist": "AtHeart",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250813/20250813171120291068.jpg",
    "src": "https://sharefs.kugou.com/202603092014/8231cea67fb9e8278336934a998026a1/v3/c18393145e72439ff3ccfe6a54d54d8e/yp/full/ap1000_us0_pi409_s418122593.mp3",
    "duration": "02:16"
  },
  {
    "id": "korean_2642223443",
    "title": "Really Like You",
    "artist": "BABYMONSTER",
    "cover": "https://p1.music.126.net/ydWt-4QpSQ0h9S6LpsM7Xg==/109951170178512289.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2642223443.mp3",
    "duration": "03:18"
  },
  {
    "id": "korean_2148791541",
    "title": "Could It Be",
    "artist": "宋雨琦",
    "cover": "https://p1.music.126.net/XtLBb9G-O2VXb1oPwE9Usw==/109951169525425227.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2148791541.mp3",
    "duration": "03:10"
  },
  {
    "id": "korean_3326399978",
    "title": "WHERE YOU AT",
    "artist": "ALLDAY PROJECT/ANNIE/WOOCHAN",
    "cover": "https://p1.music.126.net/2g9vymXHeWk-qpVN6c3uPQ==/109951172485880136.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3326399978.mp3",
    "duration": "02:42"
  },
  {
    "id": "korean_2716048062",
    "title": "One Spot",
    "artist": "沈佳润 (NINA)",
    "cover": "https://p1.music.126.net/T1PrTVs-knCMgHE7lYRihg==/109951171315108947.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2716048062.mp3",
    "duration": "02:27"
  },
  {
    "id": "korean_3341445521",
    "title": "UNDERDOGS",
    "artist": "KiiiKiii",
    "cover": "https://p1.music.126.net/4_hCwxnx5mC0yeb--0fQgw==/109951172622623026.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3341445521.mp3",
    "duration": "03:03"
  },
  {
    "id": "korean_2724380742",
    "title": "THIS IS FOR",
    "artist": "TWICE",
    "cover": "https://p1.music.126.net/Z0w1ODrX3k6T7rsZsRjqNQ==/109951171429738397.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2724380742.mp3",
    "duration": "02:11"
  },
  {
    "id": "korean_2684172287",
    "title": "KNOW ABOUT ME",
    "artist": "NMIXX",
    "cover": "https://p1.music.126.net/Y7mI4NpwoCxQiVnSOJN1zA==/109951170607144555.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2684172287.mp3",
    "duration": "02:46"
  },
  {
    "id": "korean_2146463371",
    "title": "꿈결같아서",
    "artist": "MINNIE",
    "cover": "https://p1.music.126.net/Ji5dQMOgDirzESeqPgfDGw==/109951169764569663.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2146463371.mp3",
    "duration": "04:09"
  },
  {
    "id": "korean_2037930593",
    "title": "I AM",
    "artist": "IVE",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260209/20260209170011676755.jpg",
    "src": "https://sharefs.kugou.com/202603092014/e53ceec824c26934fb0ae83ad7e72a9c/v3/22dcbc5a3b4b6c4877f4ddaaab214f2a/yp/full/ap1000_us0_pi409_s2024127964.mp3",
    "duration": "03:04"
  },
  {
    "id": "korean_2738188520",
    "title": "XOXZ",
    "artist": "IVE",
    "cover": "https://p1.music.126.net/aVugUa-WHa9Ri7oJLXRA5A==/109951171897429801.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2738188520.mp3",
    "duration": "02:34"
  },
  {
    "id": "korean_2685552091",
    "title": "LOV3 (Feat. Bryan Chase, Okasian)",
    "artist": "Sik-K/Lil Moshpit/BRYAN CHA$E/Okasian",
    "cover": "https://p1.music.126.net/g6VFtW5X3p9JzEaI950BnQ==/109951170621569561.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2685552091.mp3",
    "duration": "03:56"
  },
  {
    "id": "korean_26512614",
    "title": "바빠 (Bad Boy)",
    "artist": "Sistar",
    "cover": "https://p1.music.126.net/5FBFwskdcG0m768jK4bhlg==/4402444557617834.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=26512614.mp3",
    "duration": "03:31"
  },
  {
    "id": "korean_3353869918",
    "title": "ROBOT",
    "artist": "李泳知",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20240625/20240625103906782256.jpg",
    "src": "https://sharefs.kugou.com/202603092014/187555ad3fb2e4a7c5785f904f251031/v3/f8bf55aae9938e06f5577f08c9383c97/yp/full/ap1000_us0_pi409_s3953708331.mp3",
    "duration": "03:30"
  },
  {
    "id": "korean_2614757358",
    "title": "WORK Pt.4 - ATEEZ X G-Eazy",
    "artist": "ATEEZ/G-Eazy",
    "cover": "https://p1.music.126.net/vp9uGVL_vDtuiSPaDnsyKg==/109951169848882636.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2614757358.mp3",
    "duration": "03:23"
  },
  {
    "id": "korean_2706341960",
    "title": "Good Thing",
    "artist": "i-dle",
    "cover": "https://p1.music.126.net/GTLFGFLy_-cuEAkVFCRfiw==/109951171316224189.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2706341960.mp3",
    "duration": "02:34"
  },
  {
    "id": "korean_3319025063",
    "title": "ONE MORE TIME",
    "artist": "ALLDAY PROJECT",
    "cover": "https://p1.music.126.net/njjjMQNl33qoJj1nxYM3Sw==/109951172454996710.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3319025063.mp3",
    "duration": "03:15"
  },
  {
    "id": "korean_2757914836",
    "title": "트로피 (TROPHY)",
    "artist": "82MAJOR",
    "cover": "https://p2.music.126.net/gkf-bZvxx_syROwBuo_rmA==/109951172181841985.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2757914836.mp3",
    "duration": "03:06"
  },
  {
    "id": "korean_2605975031",
    "title": "클락션 (Klaxon)",
    "artist": "i-dle",
    "cover": "https://p2.music.126.net/63gfekiKVDiTYXNuCt9SYA==/109951169849455006.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2605975031.mp3",
    "duration": "02:55"
  },
  {
    "id": "korean_2702760336",
    "title": "책방오빠 문학소녀",
    "artist": "BIBI",
    "cover": "https://p2.music.126.net/4hCF0ztUraZB9b80cO-a7A==/109951170959365391.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2702760336.mp3",
    "duration": "03:13"
  },
  {
    "id": "korean_3336111050",
    "title": "Round and Round",
    "artist": "JISOKURY",
    "cover": "https://p2.music.126.net/seqH0WDy3R6o79t3FxUvdA==/109951172545086235.jpg",
    "src": "https://sharefs.kugou.com/202603092014/ed04a7618cda6e85093fa151bbd519b3/v3/5c5a9ae71ced7b515be98d262bc00128/yp/full/ap1000_us0_pi409_s440159114.mp3",
    "duration": "04:05"
  },
  {
    "id": "korean_2754244329",
    "title": "PSYCHO",
    "artist": "BABYMONSTER",
    "cover": "https://p2.music.126.net/1JGdLgaUkCKKlfJek3fE-w==/109951172206605934.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2754244329.mp3",
    "duration": "03:15"
  },
  {
    "id": "korean_2099924427",
    "title": "미워 (Ego)",
    "artist": "Crush",
    "cover": "https://p2.music.126.net/9JMr-v3qlIWgD8j0CsUA0Q==/109951169164997864.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2099924427.mp3",
    "duration": "02:55"
  },
  {
    "id": "korean_3353121022",
    "title": "TIC TIC (feat. Pabllo Vittar)",
    "artist": "NMIXX/Pabllo Vittar",
    "cover": "https://p2.music.126.net/LQuCGIEOCV2pzQ2rlvhdVQ==/109951172796826971.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3353121022.mp3",
    "duration": "02:13"
  },
  {
    "id": "korean_2718608376",
    "title": "FAMOUS",
    "artist": "ALLDAY PROJECT",
    "cover": "https://p2.music.126.net/pjuqU8GYr690z04qmjUZ9A==/109951171424496275.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2718608376.mp3",
    "duration": "03:00"
  },
  {
    "id": "korean_3336106108",
    "title": "FaceTime",
    "artist": "LNGSHOT",
    "cover": "https://p1.music.126.net/4szAwelP64r5aKbEtFD2ug==/109951172545043919.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3336106108.mp3",
    "duration": "02:48"
  },
  {
    "id": "korean_3329616524",
    "title": "Saucin'",
    "artist": "LNGSHOT",
    "cover": "https://p1.music.126.net/M3Cw45XpFQQZ2TcUBu3VOA==/109951172448970247.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3329616524.mp3",
    "duration": "02:53"
  },
  {
    "id": "korean_2705368327",
    "title": "Elevator",
    "artist": "BAEKHYUN",
    "cover": "https://p1.music.126.net/U90NX0KBDsCQAGBdl7bNkA==/109951170987987873.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2705368327.mp3",
    "duration": "03:06"
  },
  {
    "id": "korean_2719135764",
    "title": "In Your Fantasy",
    "artist": "ATEEZ",
    "cover": "https://p1.music.126.net/IKxRKy3MCtepy51yEIRfvg==/109951171356614159.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2719135764.mp3",
    "duration": "03:13"
  },
  {
    "id": "korean_2671344699",
    "title": "ATTITUDE",
    "artist": "IVE",
    "cover": "https://p1.music.126.net/DRAu33Phj6Q-1yBCjXkXfg==/109951170416427562.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2671344699.mp3",
    "duration": "03:15"
  },
  {
    "id": "korean_3348753834",
    "title": "MTMTM (feat. Hatsune Miku)",
    "artist": "TAK/初音ミク",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260202/20260202022732264921.jpg",
    "src": "https://sharefs.kugou.com/202603092014/6009607737ba881178564271ea1a0a6d/v3/8ae9a4a4666a0c8f9704f4413bee7311/yp/full/ap1000_us0_pi409_s1425951984.mp3",
    "duration": "02:05"
  },
  {
    "id": "korean_2634567568",
    "title": "Like I Do (Jay Park Remix)",
    "artist": "朴宰范",
    "cover": "https://p1.music.126.net/o27Rdawdzg4fUY4XwMRo9g==/109951170026942569.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2634567568.mp3",
    "duration": "02:11"
  },
  {
    "id": "korean_2700190988",
    "title": "HANDS UP",
    "artist": "MEOVV",
    "cover": "https://p1.music.126.net/eOnNsivXcB-z-lRp-IoCyw==/109951171292006002.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2700190988.mp3",
    "duration": "03:12"
  },
  {
    "id": "korean_2721417116",
    "title": "HOT SAUCE",
    "artist": "BABYMONSTER",
    "cover": "https://p1.music.126.net/8BQSHLyJ0QVQ75m8Eus0_Q==/109951171499572311.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2721417116.mp3",
    "duration": "02:28"
  },
  {
    "id": "korean_2090605307",
    "title": "Off The Record",
    "artist": "IVE",
    "cover": "https://p1.music.126.net/C2v-Jp_wVwHcoRLhVmbPWA==/109951168980403946.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2090605307.mp3",
    "duration": "03:09"
  },
  {
    "id": "korean_2754561326",
    "title": "Blue Valentine",
    "artist": "NMIXX",
    "cover": "https://p1.music.126.net/wRDGhwhhzJuUkWMrjrPwKw==/109951172137146717.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2754561326.mp3",
    "duration": "03:06"
  },
  {
    "id": "korean_3338876633",
    "title": "Are You Ready",
    "artist": "LNGSHOT",
    "cover": "https://p1.music.126.net/dsDz07ARJI0R0XWb67YuUw==/109951172582320908.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3338876633.mp3",
    "duration": "02:35"
  },
  {
    "id": "korean_2033890974",
    "title": "Kitsch",
    "artist": "IVE",
    "cover": "https://p1.music.126.net/k2GYqaHErLdNv_dHNGLEQQ==/109951168500827591.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2033890974.mp3",
    "duration": "03:15"
  },
  {
    "id": "korean_3339187475",
    "title": "EMOTIONS",
    "artist": "WENDY/Alec Benjamin",
    "cover": "https://p1.music.126.net/y-ojOxUZQk7-DHTR7J5s5g==/109951172809351635.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3339187475.mp3",
    "duration": "03:23"
  },
  {
    "id": "korean_3336111051",
    "title": "Waltz for Moon",
    "artist": "Hodge",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260201/20260201150515985927.jpg",
    "src": "https://sharefs.kugou.com/202603092015/02414dd68cf07d6e54db054c76c062ae/v3/99d0be5172ef8ec24c431daf240a7cf3/yp/full/ap1000_us0_pi409_s406304439.mp3",
    "duration": "03:60"
  },
  {
    "id": "korean_2605979561",
    "title": "Last Forever",
    "artist": "i-dle",
    "cover": "https://p1.music.126.net/63gfekiKVDiTYXNuCt9SYA==/109951169849455006.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2605979561.mp3",
    "duration": "02:26"
  },
  {
    "id": "korean_2148792242",
    "title": "Red Rover",
    "artist": "宋雨琦",
    "cover": "https://p1.music.126.net/XtLBb9G-O2VXb1oPwE9Usw==/109951169525425227.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2148792242.mp3",
    "duration": "02:03"
  },
  {
    "id": "korean_3336111048",
    "title": "Dance Alone",
    "artist": "Zior Park",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250618/20250618171741783115.jpg",
    "src": "https://sharefs.kugou.com/202603092015/7fc267ed092bb0985c111da7bc7e4303/v3/ededf71603685ee38fad77d27b736d75/yp/full/ap1000_us0_pi409_s3397888005.mp3",
    "duration": "03:06"
  },
  {
    "id": "korean_2717862846",
    "title": "Soda Pop",
    "artist": "Saja Boys/Andrew 崔/Neckwav/Danny Chung/Kevin Woo/samUIL Lee/KPop Demon Hunters Cast",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20250715/20250715153142856821.jpg",
    "src": "https://sharefs.kugou.com/202603092015/a238f832ca9b10bd22f374c7ee04af34/v3/7eeacc7db28e8e7b2d412c959fb6b570/yp/full/ap1000_us0_pi409_s1117747529.mp3",
    "duration": "02:31"
  },
  {
    "id": "korean_2068166057",
    "title": "B.O.M.B",
    "artist": "TREASURE",
    "cover": "https://p1.music.126.net/OCHeFNDN3em_HzJwGGBc0A==/109951168862431444.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2068166057.mp3",
    "duration": "03:21"
  },
  {
    "id": "korean_3349584670",
    "title": "I Stay (Chinese Ver.)",
    "artist": "沈小婷 (Kep1er)",
    "cover": "https://p1.music.126.net/5MiA0Npu3VYC1VVMKP3zQQ==/109951172741370254.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3349584670.mp3",
    "duration": "02:60"
  },
  {
    "id": "korean_2668052205",
    "title": "HER",
    "artist": "MINNIE",
    "cover": "https://p1.music.126.net/Ar5prm23viHr1PMIKXoGcg==/109951170498777904.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2668052205.mp3",
    "duration": "02:40"
  },
  {
    "id": "korean_2614374356",
    "title": "Pop Pop",
    "artist": "itssiu/seoseo (서서)",
    "cover": "https://p1.music.126.net/Kh3KNli_-FCBldZNQZ-SXA==/109951169845391410.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2614374356.mp3",
    "duration": "02:53"
  },
  {
    "id": "korean_2744410675",
    "title": "body",
    "artist": "多荣",
    "cover": "https://p1.music.126.net/k5BVjsGt5jHHBlM4vmSUVQ==/109951171990812620.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2744410675.mp3",
    "duration": "02:48"
  },
  {
    "id": "korean_3341444742",
    "title": "Dizzy",
    "artist": "KiiiKiii",
    "cover": "https://p1.music.126.net/4_hCwxnx5mC0yeb--0fQgw==/109951172622623026.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3341444742.mp3",
    "duration": "02:33"
  },
  {
    "id": "korean_2673645967",
    "title": "Strategy",
    "artist": "Olivia Marsh",
    "cover": "https://p1.music.126.net/EzA9LGjxGjY6lvEpXaH06Q==/109951170469214865.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2673645967.mp3",
    "duration": "02:48"
  },
  {
    "id": "korean_3338876638",
    "title": "Next 2 U",
    "artist": "OHYUL of LNGSHOT/LOUIS of LNGSHOT",
    "cover": "https://p1.music.126.net/dsDz07ARJI0R0XWb67YuUw==/109951172582320908.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3338876638.mp3",
    "duration": "02:10"
  },
  {
    "id": "korean_3319744981",
    "title": "Devil's Angel",
    "artist": "MINNIE",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260123/20260123112810948053.jpg",
    "src": "https://sharefs.kugou.com/202603092015/e616145903a6ba068af840bd34950a44/v3/5ca721dc6c355d5aa393cc09d80bef83/yp/full/ap1000_us0_pi409_s1920299685.mp3",
    "duration": "02:48"
  },
  {
    "id": "korean_2141968369",
    "title": "Nothing",
    "artist": "KISS OF LIFE",
    "cover": "https://p1.music.126.net/zFfx_Cj_5NP1-MD3Sgk4Dg==/109951169556446754.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2141968369.mp3",
    "duration": "03:32"
  },
  {
    "id": "korean_2642223445",
    "title": "Love In My Heart",
    "artist": "BABYMONSTER",
    "cover": "https://p1.music.126.net/ydWt-4QpSQ0h9S6LpsM7Xg==/109951170178512289.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2642223445.mp3",
    "duration": "03:12"
  },
  {
    "id": "korean_3336789063",
    "title": "LOSE YOUR SHXT",
    "artist": "李大奔BENZO/YOUNG POSSE",
    "cover": "https://p1.music.126.net/S_jI-CDMGqJiDT8h7WiVqw==/109951172552008848.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3336789063.mp3",
    "duration": "03:02"
  },
  {
    "id": "korean_2733086034",
    "title": "DANCING ALONE",
    "artist": "KiiiKiii",
    "cover": "https://p1.music.126.net/-3pEshQ5s0O5ccL8JC1BsA==/109951171711080445.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2733086034.mp3",
    "duration": "03:19"
  },
  {
    "id": "korean_3353112172",
    "title": "Bloom hour",
    "artist": "宇宙少女",
    "cover": "https://p1.music.126.net/lXgMGdmmKZuykgOSK9eclQ==/109951172796829747.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3353112172.mp3",
    "duration": "03:00"
  },
  {
    "id": "korean_2758208391",
    "title": "CYNICAL",
    "artist": "宣美",
    "cover": "https://p1.music.126.net/LSqgMzAdlKfVcpl_2GBdCQ==/109951172185142614.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2758208391.mp3",
    "duration": "02:35"
  },
  {
    "id": "korean_2682161090",
    "title": "YELLOW",
    "artist": "TREASURE",
    "cover": "https://p1.music.126.net/ZAqAqBxTLqFsGa8zJFm1kw==/109951170632800505.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2682161090.mp3",
    "duration": "03:12"
  },
  {
    "id": "korean_2751332452",
    "title": "MEEEEEE (NAYEON)",
    "artist": "TWICE",
    "cover": "https://p1.music.126.net/IzQP9vY0DDIeLhJdnX-hWA==/109951172084834402.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2751332452.mp3",
    "duration": "02:46"
  },
  {
    "id": "korean_2681718145",
    "title": "Air",
    "artist": "礼志 (YEJI)",
    "cover": "https://p1.music.126.net/l_mQLLziZAuMaw2iXi4G_g==/109951170562033530.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2681718145.mp3",
    "duration": "03:15"
  },
  {
    "id": "korean_2735181879",
    "title": "Far",
    "artist": "aiai",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20230713/20230713110802244133.jpg",
    "src": "https://sharefs.kugou.com/202603092015/fc4215f24ba4111cadb502ddc6500070/v3/060dde79121da4d98caa130eeb992987/yp/full/ap1000_us0_pi409_s882558590.mp3",
    "duration": "03:27"
  },
  {
    "id": "korean_2158214041",
    "title": "WORK",
    "artist": "ATEEZ",
    "cover": "https://p1.music.126.net/eUDDZ_xNs0vjz1NR2XA_bw==/109951169611433251.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2158214041.mp3",
    "duration": "02:52"
  },
  {
    "id": "korean_3338878051",
    "title": "Next 2 U (Carol Remix)",
    "artist": "LNGSHOT",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20251107/20251107170732898594.jpg",
    "src": "https://sharefs.kugou.com/202603092015/6eaece212e1a68344e8db27d729a8208/v3/2cdb9a5de760676a9752da6a516a831c/yp/full/ap1000_us0_pi409_s142228250.mp3",
    "duration": "02:11"
  },
  {
    "id": "korean_2706341957",
    "title": "Love Tease",
    "artist": "i-dle",
    "cover": "https://p1.music.126.net/GTLFGFLy_-cuEAkVFCRfiw==/109951171316224189.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2706341957.mp3",
    "duration": "02:27"
  },
  {
    "id": "korean_2744335543",
    "title": "바이, 썸머",
    "artist": "IU",
    "cover": "https://p1.music.126.net/OwdhBGbjE1NwSR-eKP6i4A==/109951171990113020.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2744335543.mp3",
    "duration": "03:39"
  },
  {
    "id": "korean_2603857571",
    "title": "Sticky",
    "artist": "KISS OF LIFE",
    "cover": "https://p2.music.126.net/MU4MuacpK-8gw3GOpNQlcw==/109951170623956563.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2603857571.mp3",
    "duration": "02:37"
  },
  {
    "id": "korean_2695927470",
    "title": "Pookie",
    "artist": "FIFTY FIFTY",
    "cover": "https://p2.music.126.net/wa1d-m2Q_pElDoaaDco5Jg==/109951170731563481.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2695927470.mp3",
    "duration": "02:33"
  },
  {
    "id": "korean_2147740907",
    "title": "Moonlight Shade",
    "artist": "4BOUT",
    "cover": "https://p2.music.126.net/Uk3qxkaOEokhKlpKzJGgfw==/109951169513683725.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2147740907.mp3",
    "duration": "02:58"
  },
  {
    "id": "korean_3316918526",
    "title": "Have A Good Time",
    "artist": "Paul Kim/宋雨琦",
    "cover": "https://p2.music.126.net/_AkdLdFX7QTF12kNEIFgzA==/109951172268549839.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3316918526.mp3",
    "duration": "02:00"
  },
  {
    "id": "korean_1937142156",
    "title": "그걸로도 충분해요",
    "artist": "San E/수안",
    "cover": "https://p2.music.126.net/IOGTxKIFSLoTVYutU4YLtw==/109951169483527885.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=1937142156.mp3",
    "duration": "03:16"
  },
  {
    "id": "korean_3315233507",
    "title": "TUNNEL VISION",
    "artist": "ITZY",
    "cover": "https://p2.music.126.net/vROgZ8W_pPxjre6vYtwL_Q==/109951172241486440.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3315233507.mp3",
    "duration": "03:05"
  },
  {
    "id": "korean_3346850058",
    "title": "CINEMA",
    "artist": "WOODZ",
    "cover": "https://p2.music.126.net/EZ-t8xhmTcBoy_rVE0X8bA==/109951172697175279.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3346850058.mp3",
    "duration": "03:58"
  },
  {
    "id": "korean_3320022098",
    "title": "Do It",
    "artist": "Stray Kids",
    "cover": "https://p2.music.126.net/-a-4AfSKkjxGYn5QMXztfQ==/109951172317084528.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3320022098.mp3",
    "duration": "02:39"
  }
].map(song => ({
  ...song,
  src: song.src || getFallbackAudio(song.id)
}));

const KTV_SONGS: Song[] = [
  {
    "id": "ktv_1409382131",
    "title": "摩天动物园",
    "artist": "G.E.M.邓紫棋",
    "cover": "https://p1.music.126.net/KTo5oSxH3CPA5PBTeFKDyA==/109951164581432409.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=1409382131.mp3",
    "duration": "04:31"
  },
  {
    "id": "ktv_346576",
    "title": "光辉岁月",
    "artist": "Beyond",
    "cover": "https://p1.music.126.net/JOJvZc_7SqQjKf8TktQ_bw==/29686813951246.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=346576.mp3",
    "duration": "04:59"
  },
  {
    "id": "ktv_471385043",
    "title": "暧昧",
    "artist": "薛之谦",
    "cover": "https://p1.music.126.net/fNbj5uDwltSDLbETdnEYYQ==/109951163069265719.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=471385043.mp3",
    "duration": "05:12"
  },
  {
    "id": "ktv_395167",
    "title": "恭喜恭喜",
    "artist": "中国娃娃",
    "cover": "https://p1.music.126.net/Rv0JSSBZ_rKDMeUW4jBwVw==/54975581403476.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=395167.mp3",
    "duration": "01:48"
  },
  {
    "id": "ktv_65538",
    "title": "好久不见",
    "artist": "陈奕迅",
    "cover": "https://p1.music.126.net/o_OjL_NZNoeog9fIjBXAyw==/18782957139233959.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=65538.mp3",
    "duration": "04:11"
  },
  {
    "id": "ktv_229010",
    "title": "我只在乎你",
    "artist": "邓丽君",
    "cover": "https://p1.music.126.net/Z583Mk_g3AqgStowc2dDDA==/109951169245062426.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=229010.mp3",
    "duration": "04:12"
  },
  {
    "id": "ktv_167942",
    "title": "王妃",
    "artist": "萧敬腾",
    "cover": "https://p1.music.126.net/yVM6XPhMjuYplli0P8PAXw==/109951171960985453.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=167942.mp3",
    "duration": "03:42"
  },
  {
    "id": "ktv_25706282",
    "title": "夜空中最亮的星",
    "artist": "逃跑计划",
    "cover": "https://p1.music.126.net/625-tE8OzdM-rWO37PgqlQ==/109951168111472442.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=25706282.mp3",
    "duration": "04:12"
  },
  {
    "id": "ktv_1341503462",
    "title": "祝福你",
    "artist": "林子祥/叶蒨文/刘德华/何婉盈/曾航生/蔡立儿/张卫健/吕方/杜德伟/刘锡明/钟镇涛/太极乐队",
    "cover": "https://p2.music.126.net/NrYu4hzt-g0nvGosp2aC8A==/109951163811273908.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=1341503462.mp3",
    "duration": "03:16"
  },
  {
    "id": "ktv_1400256289",
    "title": "你的答案",
    "artist": "阿冗",
    "cover": "https://p2.music.126.net/JBrPa3oAkMxG3CAQkRQ83w==/109951168973212235.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=1400256289.mp3",
    "duration": "03:40"
  },
  {
    "id": "ktv_435289474",
    "title": "别再撑了",
    "artist": "安心亚",
    "cover": "https://p2.music.126.net/bd5U42-BYqmurMIAv4L_qA==/1399678319237104.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=435289474.mp3",
    "duration": "04:50"
  }
].map(song => ({
  ...song,
  src: song.src || getFallbackAudio(song.id)
}));

const JAPANESE_SONGS: Song[] = [
  {
    "id": "japanese_3339091911",
    "title": "うそつきマカロン (feat. 重音テト)",
    "artist": "暴飲暴食P/重音テト",
    "cover": "https://p1.music.126.net/IiBENuqV91ALNveI2U7HdA==/109951172585408384.jpg",
    "src": "https://sharefs.kugou.com/202603092015/dc721972466387633cf242d9bc6a31d5/v3/33caf73fd0809d487d3bd9df95d73892/yp/full/ap1000_us0_pi409_s3531815374.mp3",
    "duration": "02:49"
  },
  {
    "id": "japanese_3342981041",
    "title": "铁花飞",
    "artist": "Mili/塞壬唱片-MSR",
    "cover": "https://singerimg.kugou.com/uploadpic/softhead/400/20260210/20260210123351242768.jpg",
    "src": "https://sharefs.kugou.com/202603092015/44b0466731ccaf31e4d413b66bb5428c/v3/204c3cbb0264577648bafcf10513fdd8/yp/full/ap1000_us0_pi409_s3206611080.mp3",
    "duration": "04:03"
  },
  {
    "id": "japanese_3340112782",
    "title": "星降る海",
    "artist": "Aqu3ra/早見沙織",
    "cover": "https://p1.music.126.net/rwWOrSz65eAdnQsHy9Vghw==/109951172602675059.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3340112782.mp3",
    "duration": "04:13"
  },
  {
    "id": "japanese_3322691810",
    "title": "ループザルーム (feat. 初音ミク)",
    "artist": "ルシノ/初音ミク",
    "cover": "https://p1.music.126.net/Gaeo-7jbwGTzmKB-GhZhag==/109951172354817632.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3322691810.mp3",
    "duration": "02:14"
  },
  {
    "id": "japanese_3348197008",
    "title": "ブレインロット",
    "artist": "東京真中",
    "cover": "https://p1.music.126.net/Vs2s1f1mWnF7re46nKI9SQ==/109951172719761839.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3348197008.mp3",
    "duration": "02:03"
  },
  {
    "id": "japanese_3340105621",
    "title": "ワールドイズマイン (かぐや&月見ヤチヨ ver.) [CPK! Remix]",
    "artist": "ryo (supercell)/かぐや(cv.夏吉ゆうこ)/早見沙織",
    "cover": "https://p1.music.126.net/otpQWO3_SYzNe7F7wLwbdA==/109951172602512218.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3340105621.mp3",
    "duration": "03:46"
  },
  {
    "id": "japanese_3345623512",
    "title": "愛言葉V",
    "artist": "DECO*27/初音ミク",
    "cover": "https://p1.music.126.net/pyTnoT6MlSNZ-t_F8lxrFA==/109951172681231853.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3345623512.mp3",
    "duration": "03:39"
  },
  {
    "id": "japanese_3339128120",
    "title": "月が綺麗ねと言われたい！",
    "artist": "柿崎ユウタ",
    "cover": "https://p1.music.126.net/uPsbeCiLyYIDZkP0_Wn8fg==/109951172585841955.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3339128120.mp3",
    "duration": "02:27"
  },
  {
    "id": "japanese_2745026895",
    "title": "IRIS OUT",
    "artist": "米津玄師",
    "cover": "https://p1.music.126.net/X9wPjRlR4H39vjJtAzVA9Q==/109951171998034780.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2745026895.mp3",
    "duration": "02:32"
  },
  {
    "id": "japanese_2747166493",
    "title": "JANE DOE",
    "artist": "米津玄師/宇多田ヒカル",
    "cover": "https://p1.music.126.net/z8vkaskRIKrLhTZ0zrqzDg==/109951172028084335.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2747166493.mp3",
    "duration": "03:56"
  }
].map(song => ({
  ...song,
  src: song.src || getFallbackAudio(song.id)
}));

const FOLK_SONGS: Song[] = [
  {
    "id": "folk_2749430424",
    "title": "绝对占有 相对自由",
    "artist": "陈粒",
    "cover": "https://p2.music.126.net/jeWHIkiTkBglJKxte7p6JA==/109951172059186762.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2749430424.mp3",
    "duration": "04:50"
  },
  {
    "id": "folk_2749430417",
    "title": "走马",
    "artist": "陈粒",
    "cover": "https://p2.music.126.net/jeWHIkiTkBglJKxte7p6JA==/109951172059186762.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2749430417.mp3",
    "duration": "04:41"
  },
  {
    "id": "folk_3353124617",
    "title": "老槐树",
    "artist": "DOUDOU/马帮乐队",
    "cover": "https://p2.music.126.net/b60lIEdsa1YedFpP_uYO-Q==/109951172797114791.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3353124617.mp3",
    "duration": "06:29"
  },
  {
    "id": "folk_2749425341",
    "title": "清透",
    "artist": "陈粒",
    "cover": "https://p2.music.126.net/d2H0OYy8yuphfVj06KBfkg==/109951172059151771.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2749425341.mp3",
    "duration": "03:57"
  },
  {
    "id": "folk_2756055504",
    "title": "花",
    "artist": "海洋Bo/黄绮珊",
    "cover": "https://p2.music.126.net/iYDw_N22GTDWqoSxxV2ylw==/109951172161640688.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2756055504.mp3",
    "duration": "04:21"
  },
  {
    "id": "folk_2749430418",
    "title": "奇妙能力歌",
    "artist": "陈粒",
    "cover": "https://p2.music.126.net/jeWHIkiTkBglJKxte7p6JA==/109951172059186762.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2749430418.mp3",
    "duration": "04:05"
  },
  {
    "id": "folk_2749430421",
    "title": "光",
    "artist": "陈粒",
    "cover": "https://p2.music.126.net/jeWHIkiTkBglJKxte7p6JA==/109951172059186762.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2749430421.mp3",
    "duration": "03:29"
  },
  {
    "id": "folk_2756057450",
    "title": "陌路的孩子",
    "artist": "海洋Bo",
    "cover": "https://p2.music.126.net/iYDw_N22GTDWqoSxxV2ylw==/109951172161640688.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2756057450.mp3",
    "duration": "04:39"
  },
  {
    "id": "folk_2749429520",
    "title": "不妙",
    "artist": "陈粒",
    "cover": "https://p2.music.126.net/jeWHIkiTkBglJKxte7p6JA==/109951172059186762.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2749429520.mp3",
    "duration": "03:33"
  },
  {
    "id": "folk_3327528525",
    "title": "杭州的雪",
    "artist": "陈鸿宇",
    "cover": "https://p2.music.126.net/nS7JpdNOGUPffz8-yCneGw==/109951172414465715.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3327528525.mp3",
    "duration": "04:02"
  }
].map(song => ({
  ...song,
  src: song.src || getFallbackAudio(song.id)
}));

const SOARING_SONGS: Song[] = [
  {
    "id": "soaring_3349661202",
    "title": "一半朋友",
    "artist": "Coldpants",
    "cover": "https://p2.music.126.net/gu6ABeRr52Oz2LCYxb5rEw==/109951172742525532.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3349661202.mp3",
    "duration": "03:20"
  },
  {
    "id": "soaring_2122615322",
    "title": "Forget it （feat. Mac Ova Seas）",
    "artist": "SETI/mac ova seas",
    "cover": "https://p2.music.126.net/_jRndEytHJkJbSkoOUQ49g==/109951169859352741.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2122615322.mp3",
    "duration": "03:36"
  },
  {
    "id": "soaring_3353121022",
    "title": "TIC TIC (feat. Pabllo Vittar)",
    "artist": "NMIXX/Pabllo Vittar",
    "cover": "https://p2.music.126.net/LQuCGIEOCV2pzQ2rlvhdVQ==/109951172796826971.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3353121022.mp3",
    "duration": "02:13"
  },
  {
    "id": "soaring_17282443",
    "title": "Creepin' up on You",
    "artist": "Darren Hayes",
    "cover": "https://p2.music.126.net/lgZ76KEeIy6jBNU4dmdDig==/109951169041866092.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=17282443.mp3",
    "duration": "04:53"
  },
  {
    "id": "soaring_2682003656",
    "title": "女孩",
    "artist": "雾也至Woo Yeah",
    "cover": "https://p2.music.126.net/R9sYNAgjJUUFWDbp7oV1Fg==/109951170566659327.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2682003656.mp3",
    "duration": "03:23"
  },
  {
    "id": "soaring_2080196537",
    "title": "力竭",
    "artist": "Rapeter/Lil Witch",
    "cover": "https://p2.music.126.net/-RYv_KQ7OjQYENoqhoXDmg==/109951168899147692.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2080196537.mp3",
    "duration": "03:14"
  },
  {
    "id": "soaring_3349010771",
    "title": "眼泪的汛期",
    "artist": "王唯旖",
    "cover": "https://p2.music.126.net/2dXIFSupBGuDIqtSCmVWmw==/109951172732228063.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3349010771.mp3",
    "duration": "04:12"
  },
  {
    "id": "soaring_3341486374",
    "title": "NO BATIDÃO",
    "artist": "PROPHECY/棍圣",
    "cover": "https://p2.music.126.net/tOWIvJf7e_J_PhTLDQwtQQ==/109951172698186277.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3341486374.mp3",
    "duration": "01:31"
  },
  {
    "id": "soaring_3348241423",
    "title": "海誓山盟",
    "artist": "灰蒙蒙",
    "cover": "https://p2.music.126.net/INw8QRU2n6IiPmsEmGkt1Q==/109951172720604664.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3348241423.mp3",
    "duration": "01:28"
  },
  {
    "id": "soaring_2144073361",
    "title": "今生戴花 世世漂亮",
    "artist": "浅影阿",
    "cover": "https://p1.music.126.net/eTK0Mq_t-UGp19YtklTfmg==/109951171898301750.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2144073361.mp3",
    "duration": "03:09"
  },
  {
    "id": "soaring_3345729503",
    "title": "寄托 Beat",
    "artist": "AlphaOnDaTrack",
    "cover": "https://p1.music.126.net/k8nnvAnYqcXNFELXCMkalQ==/109951172678219504.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3345729503.mp3",
    "duration": "02:16"
  },
  {
    "id": "soaring_21274655",
    "title": "Lonely",
    "artist": "Nana",
    "cover": "https://p1.music.126.net/2I1AKsgJksthorB_ndCNdA==/778454232476457.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=21274655.mp3",
    "duration": "06:21"
  },
  {
    "id": "soaring_3340788034",
    "title": "差不多先生",
    "artist": "Lill Joy/Blockbeats",
    "cover": "https://p1.music.126.net/WNlfySL0TgHGU4NRcLDX1Q==/109951169271322014.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3340788034.mp3",
    "duration": "03:28"
  },
  {
    "id": "soaring_22677861",
    "title": "혼자 있는 방",
    "artist": "IU",
    "cover": "https://p1.music.126.net/r0rmh6ast8cRBCs3BU-iFg==/109951169708889291.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=22677861.mp3",
    "duration": "03:59"
  },
  {
    "id": "soaring_526081111",
    "title": "到此为止",
    "artist": "徐佳莹",
    "cover": "https://p1.music.126.net/lb0uSEy4nd6eQMv7hCbN0Q==/109951171530550836.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=526081111.mp3",
    "duration": "03:41"
  },
  {
    "id": "soaring_3351162813",
    "title": "CURTSY",
    "artist": "澤野弘之",
    "cover": "https://p1.music.126.net/Q_meMfXGyqG3VheSyUWYAQ==/109951172766105820.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3351162813.mp3",
    "duration": "02:27"
  },
  {
    "id": "soaring_1973665667",
    "title": "海屿你",
    "artist": "马也_Crabbit",
    "cover": "https://p1.music.126.net/Enhy6dPn4gpyqrKhVEQvgA==/109951170483249998.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=1973665667.mp3",
    "duration": "04:56"
  },
  {
    "id": "soaring_326706",
    "title": "Beautiful Woman",
    "artist": "张悬",
    "cover": "https://p1.music.126.net/WMVdcUdA0XYzdj9Od4upyw==/109951167282574636.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=326706.mp3",
    "duration": "04:29"
  },
  {
    "id": "soaring_2690599272",
    "title": "春Spring",
    "artist": "BlackC",
    "cover": "https://p1.music.126.net/rx7Nq0vQa97fXiXWjdIR6Q==/109951170680562195.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2690599272.mp3",
    "duration": "02:37"
  },
  {
    "id": "soaring_3356374694",
    "title": "将军肚",
    "artist": "谢帝/九莲",
    "cover": "https://p1.music.126.net/LzEQir5aW7jJ0JwvZFOiDQ==/109951172850889367.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3356374694.mp3",
    "duration": "02:34"
  },
  {
    "id": "soaring_3338794214",
    "title": "女娲",
    "artist": "Vicky宣宣",
    "cover": "https://p1.music.126.net/bn7AGGQd8D_NxlWKX6qrRg==/109951172586940280.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3338794214.mp3",
    "duration": "04:57"
  },
  {
    "id": "soaring_2060701318",
    "title": "Clouds",
    "artist": "李浩玮",
    "cover": "https://p1.music.126.net/6b1pSKHISbJR82HHkGqglg==/109951168713435984.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2060701318.mp3",
    "duration": "02:20"
  },
  {
    "id": "soaring_2668219238",
    "title": "Truth In The Lies",
    "artist": "Central Cee/Lil Durk",
    "cover": "https://p1.music.126.net/rKsPnKHgGfUS2uFPdUy0pQ==/109951170411802674.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2668219238.mp3",
    "duration": "02:23"
  },
  {
    "id": "soaring_3355276956",
    "title": "S.U.N.H",
    "artist": "88LIEN/张方钊",
    "cover": "https://p1.music.126.net/jcUj3Ws9dfNd3vt97e79Bg==/109951172832658981.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3355276956.mp3",
    "duration": "03:06"
  },
  {
    "id": "soaring_3356683226",
    "title": "奇形怪状的云",
    "artist": "夏日入侵企画",
    "cover": "https://p1.music.126.net/JaTspk7VjguYT_wWcONQrg==/109951172850786369.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3356683226.mp3",
    "duration": "01:30"
  },
  {
    "id": "soaring_2638616976",
    "title": "Nope your too late i already died",
    "artist": "wifiskeleton/i wanna be a jack-o-lantern",
    "cover": "https://p1.music.126.net/AGu0IzFGYtOl4FyClLr8zQ==/109951170064566307.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2638616976.mp3",
    "duration": "01:30"
  },
  {
    "id": "soaring_2615998774",
    "title": "No Broke Boys",
    "artist": "Tinashe",
    "cover": "https://p1.music.126.net/v_9EDkE6mvzuGP0A7s5GpQ==/109951169860109033.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2615998774.mp3",
    "duration": "02:13"
  },
  {
    "id": "soaring_3352826362",
    "title": "1 On 1",
    "artist": "Higher Brothers/马思唯/KnowKnow/PSY.P/Melo",
    "cover": "https://p1.music.126.net/MSZasNthUQYRZ968wSj2VQ==/109951172792352706.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3352826362.mp3",
    "duration": "03:44"
  },
  {
    "id": "soaring_3348864365",
    "title": "冷焰 (Glacial Flame)",
    "artist": "赤垚/Dahl_",
    "cover": "https://p1.music.126.net/KioAHyuOX5H7BysB5LyK9g==/109951172725741428.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3348864365.mp3",
    "duration": "03:27"
  },
  {
    "id": "soaring_191252",
    "title": "我们都一样",
    "artist": "张杰",
    "cover": "https://p1.music.126.net/ixIs5kkukgNYMmeDsc35_g==/29686813955450.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=191252.mp3",
    "duration": "05:03"
  },
  {
    "id": "soaring_3346282037",
    "title": "I Was a Kid",
    "artist": "Damon Price",
    "cover": "https://p1.music.126.net/65_0tJwOF3HKJ5qM_awLSQ==/109951172690064947.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3346282037.mp3",
    "duration": "02:43"
  },
  {
    "id": "soaring_3349886993",
    "title": "楼兰一梦",
    "artist": "小时姑娘/逆水寒/逆水长琴/雷火音频",
    "cover": "https://p1.music.126.net/uzsxXpvx_-UQN8Y5r6gfBA==/109951172825643994.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3349886993.mp3",
    "duration": "04:28"
  },
  {
    "id": "soaring_3349667991",
    "title": "Scared 2 be lonely beat（当真爱降临）",
    "artist": "Yn1Jasper",
    "cover": "https://p1.music.126.net/HUoZF_dqNGxx2WDvtg0sPg==/109951172742511432.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3349667991.mp3",
    "duration": "02:44"
  },
  {
    "id": "soaring_3352752434",
    "title": "Overflow",
    "artist": "Chisway",
    "cover": "https://p1.music.126.net/Td12KVGP1S1Lep_pRKkB2Q==/109951172791459363.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3352752434.mp3",
    "duration": "02:39"
  },
  {
    "id": "soaring_29431061",
    "title": "绝对占有，相对自由",
    "artist": "陈粒",
    "cover": "https://p1.music.126.net/lN2jt4Vkqw3zzIjc2JjyCw==/2532175280981641.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=29431061.mp3",
    "duration": "05:36"
  },
  {
    "id": "soaring_3342460535",
    "title": "The one",
    "artist": "栗子养乐多/WhyAce/Zy",
    "cover": "https://p1.music.126.net/QAW6LhufJYDuZ8mAqiqGiA==/109951172686995862.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3342460535.mp3",
    "duration": "02:41"
  },
  {
    "id": "soaring_3326382885",
    "title": "Zouzei Funk",
    "artist": "Syensan",
    "cover": "https://p1.music.126.net/kGF0dBY5LyQf9kBJPVDopw==/109951172402595625.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3326382885.mp3",
    "duration": "01:54"
  },
  {
    "id": "soaring_299904",
    "title": "脸",
    "artist": "王菲",
    "cover": "https://p1.music.126.net/W6MDlem6_FsymbnxKc_BKQ==/109951171530948990.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=299904.mp3",
    "duration": "03:34"
  },
  {
    "id": "soaring_28493451",
    "title": "We Are The World",
    "artist": "Lionel Richie/Stevie Wonder/Paul Simon/Kenny Rogers/James Ingram/Tina Turner/Billy Joel/Michael Jackson/Diana Ross/Dionne Warwick/Willie Nelson/Al Jarreau/Bruce Springsteen/Kenny Loggins/Steve Perry/Daryl Hall/Huey Lewis/Cyndi Lauper/Kim Carnes/Bob Dylan/Ray Charles",
    "cover": "https://p1.music.126.net/x_sTEtNoVpcE6hX9CkDNpw==/109951163122957256.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=28493451.mp3",
    "duration": "07:07"
  },
  {
    "id": "soaring_1895498022",
    "title": "I Love You So (Acoustic)",
    "artist": "The Walters",
    "cover": "https://p1.music.126.net/H_3rdJPCng8wJMFdY21dxA==/109951166628110110.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=1895498022.mp3",
    "duration": "02:27"
  },
  {
    "id": "soaring_1371372174",
    "title": "only U",
    "artist": "星铄尘",
    "cover": "https://p1.music.126.net/7bEwQufiPrG5-hup0eDnMw==/109951165641049045.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=1371372174.mp3",
    "duration": "02:15"
  },
  {
    "id": "soaring_2013368857",
    "title": "惊鸿醉",
    "artist": "指尖笑",
    "cover": "https://p1.music.126.net/pk6nTn7UkpXBb4D5rrZqWA==/109951168223765680.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2013368857.mp3",
    "duration": "02:57"
  },
  {
    "id": "soaring_3353240534",
    "title": "飞驰人生MIX",
    "artist": "漂移的人（Drifting Man）",
    "cover": "https://p2.music.126.net/TLFoWs4HMwDz9K1yZR4nWQ==/109951172799005375.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3353240534.mp3",
    "duration": "02:20"
  },
  {
    "id": "soaring_3342103633",
    "title": "Good Luck",
    "artist": "My Car/GuTs",
    "cover": "https://p2.music.126.net/uSUP0k1VuFlnec6K078Owg==/109951172629552685.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3342103633.mp3",
    "duration": "02:13"
  },
  {
    "id": "soaring_3356356275",
    "title": "闪闪发亮（SHESA）",
    "artist": "黄龄/斯丹曼簇/金池/陈昊宇/娄艺潇/孟楠/胡维纳/郑羽淇/王梓琼/游梦岛乐队 YOMODO GIRLS/严艺丹/马璐/袁野夕/马二Mar/潘虹樾/Juudy朱忆迪/赵露/郑虹/王拓/DADOLL",
    "cover": "https://p2.music.126.net/HJhK0ozPEbES2FFzVj-d_Q==/109951172846085040.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3356356275.mp3",
    "duration": "03:07"
  },
  {
    "id": "soaring_3355800563",
    "title": "燃烧的钢琴键",
    "artist": "神总是忧郁的",
    "cover": "https://p2.music.126.net/vBCvpnhENx-vGF-TVcAX8Q==/109951172839497844.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3355800563.mp3",
    "duration": "02:20"
  },
  {
    "id": "soaring_3345144500",
    "title": "My Me to Gave",
    "artist": "SMYE",
    "cover": "https://p2.music.126.net/ncbes6B8q2h1WyuBZWW-hA==/109951172672769649.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3345144500.mp3",
    "duration": "02:28"
  },
  {
    "id": "soaring_26723189",
    "title": "Eenie Meenie",
    "artist": "Justin Bieber/Sean Kingston",
    "cover": "https://p2.music.126.net/wl52vlF13ubtjAZMUu1PjA==/109951169258632462.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=26723189.mp3",
    "duration": "03:22"
  },
  {
    "id": "soaring_32272745",
    "title": "幸福之歌",
    "artist": "Supper Moment",
    "cover": "https://p2.music.126.net/_rHCQX84pzW6Po2gnKKZtA==/109951163718466968.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=32272745.mp3",
    "duration": "05:29"
  },
  {
    "id": "soaring_1979192239",
    "title": "I Still Want Your Love (feat. Jinnie)",
    "artist": "Sam Ock/Jinnie",
    "cover": "https://p2.music.126.net/iWgsGVhmR9Xtoo64DnZiCA==/109951167852411976.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=1979192239.mp3",
    "duration": "06:13"
  },
  {
    "id": "soaring_2749416273",
    "title": "何处是天堂",
    "artist": "龚琳娜",
    "cover": "https://p2.music.126.net/8_DjSdt7EZoRDhBjEPeKIA==/109951172059616900.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2749416273.mp3",
    "duration": "03:19"
  },
  {
    "id": "soaring_2738314242",
    "title": "I'll be right by your side",
    "artist": "HanD",
    "cover": "https://p2.music.126.net/ulbKbIHmEwR7Y9e6m_M-JA==/109951171904324421.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2738314242.mp3",
    "duration": "04:14"
  },
  {
    "id": "soaring_3344620262",
    "title": "Person",
    "artist": "Coce",
    "cover": "https://p2.music.126.net/VPywCOxN33tQBXCATFIkGQ==/109951172664383129.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3344620262.mp3",
    "duration": "02:20"
  },
  {
    "id": "soaring_2715881285",
    "title": "秘密beat",
    "artist": "苏宝",
    "cover": "https://p2.music.126.net/9DqI1AC2gNINlYthQJxE3A==/109951171312501628.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2715881285.mp3",
    "duration": "01:53"
  },
  {
    "id": "soaring_5249178",
    "title": "吻得太逼真",
    "artist": "张敬轩",
    "cover": "https://p2.music.126.net/hCkKHm7J1hDNlmC9vmAV4Q==/109951163368468453.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=5249178.mp3",
    "duration": "03:53"
  },
  {
    "id": "soaring_2663425278",
    "title": "座位",
    "artist": "承桓",
    "cover": "https://p2.music.126.net/JTIq6lIwhsjtNMmFO6-q2A==/109951170353780520.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2663425278.mp3",
    "duration": "03:28"
  },
  {
    "id": "soaring_28613731",
    "title": "好きだよ。~100回の後悔~ (English Ver.)",
    "artist": "Che'Nelle",
    "cover": "https://p2.music.126.net/u7S3pgVUGmjkGlQsUg0E-Q==/109951169237167354.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=28613731.mp3",
    "duration": "05:06"
  },
  {
    "id": "soaring_2603500959",
    "title": "Una Mattina",
    "artist": "Papa Tin",
    "cover": "https://p2.music.126.net/X9w2xv3D6IHYVyVDE7pyXw==/109951169734974353.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2603500959.mp3",
    "duration": "02:57"
  },
  {
    "id": "soaring_2093265394",
    "title": "Ride It",
    "artist": "Larissa Lambert/Jay Sean",
    "cover": "https://p2.music.126.net/tm8dY51b_ayB6XrmLODnaw==/109951169907996726.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2093265394.mp3",
    "duration": "02:18"
  },
  {
    "id": "soaring_3355553976",
    "title": "假心话",
    "artist": "M3mo",
    "cover": "https://p2.music.126.net/kq1NhkyJ6SF3S3rAeiM0Ag==/109951172836323802.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3355553976.mp3",
    "duration": "02:05"
  },
  {
    "id": "soaring_2652257620",
    "title": "Jhim Jhimaune Aankha",
    "artist": "Ekdev Limbu",
    "cover": "https://p1.music.126.net/8A4x-IIHC2EGNE5Xsuc7uw==/109951172587130263.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2652257620.mp3",
    "duration": "03:27"
  },
  {
    "id": "soaring_299604",
    "title": "给自己的情书",
    "artist": "王菲",
    "cover": "https://p1.music.126.net/E0ynLFbtqou5cu1iJrvUEQ==/109951163081327547.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=299604.mp3",
    "duration": "04:28"
  },
  {
    "id": "soaring_3325414276",
    "title": "Do What You Gotta",
    "artist": "PREP/落日飞车",
    "cover": "https://p1.music.126.net/bLenmAmc9B5RZkhUaUJZQg==/109951172390684663.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3325414276.mp3",
    "duration": "03:08"
  },
  {
    "id": "soaring_3356926478",
    "title": "灾厄终点",
    "artist": "在虚无中永存",
    "cover": "https://p1.music.126.net/Do08y8cBnXHyQSIrHbZcyg==/109951172855442790.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3356926478.mp3",
    "duration": "02:05"
  },
  {
    "id": "soaring_3345742935",
    "title": "BANG BANG",
    "artist": "IVE",
    "cover": "https://p1.music.126.net/jR-P_Lx2I57DKOXGgTZH9A==/109951172695975592.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3345742935.mp3",
    "duration": "02:58"
  },
  {
    "id": "soaring_1888933954",
    "title": "道别是一件难事",
    "artist": "上海彩虹室内合唱团",
    "cover": "https://p1.music.126.net/PNSDtZUDYbPRRuk7kJlywA==/109951166544751174.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=1888933954.mp3",
    "duration": "04:09"
  },
  {
    "id": "soaring_3347158754",
    "title": "Opalite",
    "artist": "Taylor Swift",
    "cover": "https://p1.music.126.net/wpDxEw4y6NwI1k1wv7Skcg==/109951172701897014.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3347158754.mp3",
    "duration": "03:55"
  },
  {
    "id": "soaring_2735568414",
    "title": "空白",
    "artist": "Pank/罗凯元",
    "cover": "https://p1.music.126.net/ZO7gxsbwnI0sjZw1Y6RqMQ==/109951171845813270.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2735568414.mp3",
    "duration": "02:51"
  },
  {
    "id": "soaring_2699754024",
    "title": "无尽幸福",
    "artist": "凌晨一点的莱茵猫/二乘",
    "cover": "https://p1.music.126.net/R7pahY_SeIUeEcKRNNtxvg==/109951170921327614.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2699754024.mp3",
    "duration": "02:10"
  },
  {
    "id": "soaring_458238990",
    "title": "玫瑰",
    "artist": "贰佰",
    "cover": "https://p1.music.126.net/4ZArX1mNhY-CrdiISsO3iw==/18892908300128861.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=458238990.mp3",
    "duration": "04:17"
  },
  {
    "id": "soaring_3356652650",
    "title": "Mehriban729",
    "artist": "Habar贝尔",
    "cover": "https://p1.music.126.net/zb5y3_Rt4FwM2KAl5eLp5w==/109951172850496524.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3356652650.mp3",
    "duration": "04:39"
  },
  {
    "id": "soaring_3353183339",
    "title": "25岁该知道的事",
    "artist": "Jocelyn 9.4.0/孙盛希",
    "cover": "https://p1.music.126.net/6PZ9_OhrWr27saRA7KjR9Q==/109951172797015938.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3353183339.mp3",
    "duration": "03:47"
  },
  {
    "id": "soaring_3355985641",
    "title": "我说你呀",
    "artist": "李雨霏_晚饭",
    "cover": "https://p1.music.126.net/BM36ka6QL2TLJ758aY2vhg==/109951172841294419.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3355985641.mp3",
    "duration": "03:15"
  },
  {
    "id": "soaring_3355276957",
    "title": "自尊心怪",
    "artist": "88LIEN",
    "cover": "https://p1.music.126.net/jcUj3Ws9dfNd3vt97e79Bg==/109951172832658981.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3355276957.mp3",
    "duration": "04:19"
  },
  {
    "id": "soaring_254328",
    "title": "原来你也在这里",
    "artist": "刘若英",
    "cover": "https://p1.music.126.net/sfKGmL7CfFVIExuzeRga7Q==/109951165895407475.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=254328.mp3",
    "duration": "03:40"
  },
  {
    "id": "soaring_3353121635",
    "title": "是我不够好",
    "artist": "吴克群",
    "cover": "https://p1.music.126.net/rBJM-ZGbaGcpGoXJfuUfTg==/109951172836590378.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3353121635.mp3",
    "duration": "03:32"
  },
  {
    "id": "soaring_2749430424",
    "title": "绝对占有 相对自由",
    "artist": "陈粒",
    "cover": "https://p1.music.126.net/jeWHIkiTkBglJKxte7p6JA==/109951172059186762.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2749430424.mp3",
    "duration": "04:50"
  },
  {
    "id": "soaring_3344077668",
    "title": "Chasing Tonight",
    "artist": "zoolor",
    "cover": "https://p1.music.126.net/fjRVhfNEfsBQUcNrEtl7uw==/109951172664763802.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3344077668.mp3",
    "duration": "02:43"
  },
  {
    "id": "soaring_86279",
    "title": "情歌王",
    "artist": "古巨基",
    "cover": "https://p1.music.126.net/iSgf-6zYJqMXB-WKlF6nbw==/109951165304540603.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=86279.mp3",
    "duration": "12:38"
  },
  {
    "id": "soaring_3317183055",
    "title": "归春颂",
    "artist": "路明熹",
    "cover": "https://p1.music.126.net/JqqZ8FHNg4nBT2vd2O1hww==/109951170756501668.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3317183055.mp3",
    "duration": "01:35"
  },
  {
    "id": "soaring_3348506236",
    "title": "终湮进行曲",
    "artist": "阿吉野马/RANGE",
    "cover": "https://p1.music.126.net/OKAsLd1th5tyoL2b0_PLdw==/109951172724532656.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3348506236.mp3",
    "duration": "02:26"
  },
  {
    "id": "soaring_28854182",
    "title": "惊鸿一面",
    "artist": "许嵩/黄龄",
    "cover": "https://p1.music.126.net/NBjIuSJ7LRugXdATt3j8AA==/109951172321467418.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=28854182.mp3",
    "duration": "04:16"
  },
  {
    "id": "soaring_3355870303",
    "title": "写给我第一个喜欢的女孩的歌",
    "artist": "封茗囧菌",
    "cover": "https://p1.music.126.net/QifT-FKTTXKww8uBitWawA==/109951172840142217.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3355870303.mp3",
    "duration": "02:59"
  },
  {
    "id": "soaring_17346999",
    "title": "Thank You",
    "artist": "Dido",
    "cover": "https://p1.music.126.net/wwKAfUTcgrjNVkGSijLgsQ==/18853325881506892.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=17346999.mp3",
    "duration": "03:38"
  },
  {
    "id": "soaring_3356620681",
    "title": "Fire in These Hills",
    "artist": "Imagine Dragons",
    "cover": "https://p1.music.126.net/_lUYKIyxVoYdXM3ksJtbcA==/109951172849777327.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3356620681.mp3",
    "duration": "03:39"
  },
  {
    "id": "soaring_3347930454",
    "title": "Infinity",
    "artist": "MerrinZephyr",
    "cover": "https://p1.music.126.net/I6b5qjudfJRxpXKDFmQklA==/109951172715121705.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3347930454.mp3",
    "duration": "02:06"
  },
  {
    "id": "soaring_3344852104",
    "title": "noob funk",
    "artist": "25cent_ovo",
    "cover": "https://p1.music.126.net/UHB7TZ2BPC4rQvHgeuFY8Q==/109951172668068512.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3344852104.mp3",
    "duration": "01:40"
  },
  {
    "id": "soaring_3339460430",
    "title": "Superstar",
    "artist": "L4NE",
    "cover": "https://p1.music.126.net/BfnKB2r7dtzpdod5pNWzRw==/109951172591018655.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3339460430.mp3",
    "duration": "03:49"
  },
  {
    "id": "soaring_3330347123",
    "title": "Inner Circle",
    "artist": "KAVO",
    "cover": "https://p1.music.126.net/eRiZc1GEtfxDSaFto_khAw==/109951172458096807.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3330347123.mp3",
    "duration": "03:07"
  },
  {
    "id": "soaring_466343434",
    "title": "Passionfruit",
    "artist": "Drake",
    "cover": "https://p1.music.126.net/f_zVeqY3DzENWACQoKCiEg==/109951167113032591.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=466343434.mp3",
    "duration": "04:59"
  },
  {
    "id": "soaring_2675356615",
    "title": "PIMMIE'S DILEMMA",
    "artist": "Pimmie/PARTYNEXTDOOR/Drake",
    "cover": "https://p1.music.126.net/Im7TYoBbNofpBGFAJzbXNQ==/109951170486261145.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=2675356615.mp3",
    "duration": "01:58"
  },
  {
    "id": "soaring_28864171",
    "title": "Walk With Me (Martin Roth Remix)",
    "artist": "Jetlag",
    "cover": "https://p1.music.126.net/iSVtAJ8c1B6RiQzIwYtzRQ==/109951163355781744.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=28864171.mp3",
    "duration": "08:05"
  },
  {
    "id": "soaring_1398726570",
    "title": "break",
    "artist": "郑润泽/Yhon",
    "cover": "https://p1.music.126.net/JfpGYN2PjClatCHBa7vX7g==/109951164354131599.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=1398726570.mp3",
    "duration": "03:52"
  },
  {
    "id": "soaring_3356055778",
    "title": "Baby Guai",
    "artist": "sunkis 宋秉勤/李大奔BENZO",
    "cover": "https://p1.music.126.net/UmuJ99Vh9QmLLvWC-hgQHg==/109951172842279792.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3356055778.mp3",
    "duration": "02:19"
  },
  {
    "id": "soaring_3356258397",
    "title": "ENNA",
    "artist": "永彬Ryan.B",
    "cover": "https://p2.music.126.net/gSda82g8wbGiBBasgs_Hug==/109951172845217627.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3356258397.mp3",
    "duration": "03:50"
  },
  {
    "id": "soaring_3355132120",
    "title": "而已",
    "artist": "陈卓璇",
    "cover": "https://p2.music.126.net/xlBpALDOd2RXJuKwKqzUSQ==/109951172830734403.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3355132120.mp3",
    "duration": "03:32"
  },
  {
    "id": "soaring_3356681140",
    "title": "南风过隙",
    "artist": "夏日入侵企画",
    "cover": "https://p2.music.126.net/JaTspk7VjguYT_wWcONQrg==/109951172850786369.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3356681140.mp3",
    "duration": "04:41"
  },
  {
    "id": "soaring_3355911694",
    "title": "齐刘海",
    "artist": "伍六七",
    "cover": "https://p2.music.126.net/UQ5uYiMWhxWl8eVFQBbV4A==/109951172840619634.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3355911694.mp3",
    "duration": "02:07"
  },
  {
    "id": "soaring_3348146128",
    "title": "此刻最好的都在身边 (R&B氛围版)",
    "artist": "丁祾",
    "cover": "https://p2.music.126.net/_KYrR8eFY82jml9mutx41g==/109951172719029042.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3348146128.mp3",
    "duration": "03:16"
  }
].map(song => ({
  ...song,
  src: song.src || getFallbackAudio(song.id)
}));

const NEW_SONGS: Song[] = [
  {
    "id": "new_3349977890",
    "title": "第三个吻痕",
    "artist": "何水水",
    "cover": "https://p1.music.126.net/XQSMKNZNba_AQ6zBMsA3PQ==/109951172780794085.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3349977890.mp3",
    "duration": "02:12"
  },
  {
    "id": "new_3347295437",
    "title": "失眠了",
    "artist": "吴琳珂Moske",
    "cover": "https://p1.music.126.net/RX7XkgADsQ6kXqcpeuEwxQ==/109951172703763721.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3347295437.mp3",
    "duration": "04:14"
  },
  {
    "id": "new_3347600332",
    "title": "几面",
    "artist": "森光",
    "cover": "https://p1.music.126.net/m_V5243r7weTdiuJLoxAeg==/109951172709446147.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3347600332.mp3",
    "duration": "02:37"
  },
  {
    "id": "new_3349945534",
    "title": "山歌王",
    "artist": "功夫胖KUNGFU-PEN/GAI周延",
    "cover": "https://p1.music.126.net/HSngyd8I35RMNs3_FaS2-Q==/109951172746863944.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3349945534.mp3",
    "duration": "03:18"
  },
  {
    "id": "new_3348525038",
    "title": "永远不回头",
    "artist": "沈腾/尹正/黄景瑜/张本煜/魏翔",
    "cover": "https://p1.music.126.net/QHq62wC5BGI-IlAq46JT8g==/109951172735089444.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3348525038.mp3",
    "duration": "05:01"
  },
  {
    "id": "new_3348241423",
    "title": "海誓山盟",
    "artist": "灰蒙蒙",
    "cover": "https://p1.music.126.net/INw8QRU2n6IiPmsEmGkt1Q==/109951172720604664.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3348241423.mp3",
    "duration": "01:28"
  },
  {
    "id": "new_3348854477",
    "title": "玉兰",
    "artist": "功夫胖KUNGFU-PEN/GAI周延",
    "cover": "https://p1.music.126.net/HSngyd8I35RMNs3_FaS2-Q==/109951172746863944.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3348854477.mp3",
    "duration": "04:13"
  },
  {
    "id": "new_3351217533",
    "title": "一吻",
    "artist": "李毅恩Lye/程屿",
    "cover": "https://p1.music.126.net/IW62HyLbHzLIlZx8CCc7Iw==/109951172766893093.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3351217533.mp3",
    "duration": "02:20"
  },
  {
    "id": "new_3349667991",
    "title": "Scared 2 be lonely beat（当真爱降临）",
    "artist": "Yn1Jasper",
    "cover": "https://p1.music.126.net/HUoZF_dqNGxx2WDvtg0sPg==/109951172742511432.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3349667991.mp3",
    "duration": "02:44"
  },
  {
    "id": "new_3352826362",
    "title": "1 On 1",
    "artist": "Higher Brothers/马思唯/KnowKnow/PSY.P/Melo",
    "cover": "https://p1.music.126.net/MSZasNthUQYRZ968wSj2VQ==/109951172792352706.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3352826362.mp3",
    "duration": "03:44"
  },
  {
    "id": "new_3342981041",
    "title": "铁花飞",
    "artist": "Mili/塞壬唱片-MSR",
    "cover": "https://p1.music.126.net/rs9Ym-GZsrLXh1WgPpMPDw==/109951172642955222.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3342981041.mp3",
    "duration": "04:03"
  },
  {
    "id": "new_3352825378",
    "title": "人先出来",
    "artist": "Higher Brothers/马思唯/KnowKnow/PSY.P/Melo",
    "cover": "https://p1.music.126.net/MSZasNthUQYRZ968wSj2VQ==/109951172792352706.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3352825378.mp3",
    "duration": "03:44"
  },
  {
    "id": "new_3348197008",
    "title": "ブレインロット",
    "artist": "東京真中",
    "cover": "https://p1.music.126.net/Vs2s1f1mWnF7re46nKI9SQ==/109951172719761839.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3348197008.mp3",
    "duration": "02:03"
  },
  {
    "id": "new_3328950498",
    "title": "故乡月",
    "artist": "梓渝",
    "cover": "https://p1.music.126.net/NS6pENDAKzALT2WjozgDZw==/109951172719118495.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3328950498.mp3",
    "duration": "03:39"
  },
  {
    "id": "new_3352859087",
    "title": "飞瀑而下",
    "artist": "孙燕姿",
    "cover": "https://p1.music.126.net/CaXBYiL0LFD1tYxV3xuewA==/109951172792823028.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3352859087.mp3",
    "duration": "04:52"
  },
  {
    "id": "new_3353121022",
    "title": "TIC TIC (feat. Pabllo Vittar)",
    "artist": "NMIXX/Pabllo Vittar",
    "cover": "https://p1.music.126.net/LQuCGIEOCV2pzQ2rlvhdVQ==/109951172796826971.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3353121022.mp3",
    "duration": "02:13"
  },
  {
    "id": "new_3349336901",
    "title": "白菜对我笑",
    "artist": "MerrinZephyr",
    "cover": "https://p1.music.126.net/q9aRXkQLh_f_hDPKCLVEVA==/109951172735106721.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3349336901.mp3",
    "duration": "02:02"
  },
  {
    "id": "new_3354884940",
    "title": "风 (一切都像风)",
    "artist": "任素汐",
    "cover": "https://p1.music.126.net/IHHaB6X00VqFW7z35NzWBg==/109951172827084732.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3354884940.mp3",
    "duration": "03:58"
  },
  {
    "id": "new_3353121635",
    "title": "是我不够好",
    "artist": "吴克群",
    "cover": "https://p1.music.126.net/rBJM-ZGbaGcpGoXJfuUfTg==/109951172836590378.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3353121635.mp3",
    "duration": "03:32"
  },
  {
    "id": "new_3347218900",
    "title": "星河追梦",
    "artist": "三角洲行动",
    "cover": "https://p1.music.126.net/wDjnoL8L_VYYOWB_QySv4Q==/109951172702204068.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3347218900.mp3",
    "duration": "03:37"
  },
  {
    "id": "new_3345742935",
    "title": "BANG BANG",
    "artist": "IVE",
    "cover": "https://p1.music.126.net/jR-P_Lx2I57DKOXGgTZH9A==/109951172695975592.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3345742935.mp3",
    "duration": "02:58"
  },
  {
    "id": "new_3353220346",
    "title": "Risk It All",
    "artist": "Bruno Mars",
    "cover": "https://p1.music.126.net/qn_xrMP6PnkI47XKbapONg==/109951172807952094.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3353220346.mp3",
    "duration": "03:24"
  },
  {
    "id": "new_3349661202",
    "title": "一半朋友",
    "artist": "Coldpants",
    "cover": "https://p1.music.126.net/gu6ABeRr52Oz2LCYxb5rEw==/109951172742525532.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3349661202.mp3",
    "duration": "03:20"
  },
  {
    "id": "new_3345764025",
    "title": "买了否冷 (有点懵逼有点醉)",
    "artist": "吉他张/Akemen杀/azazel",
    "cover": "https://p1.music.126.net/7Us10SmX93t78jiTxCXymQ==/109951172682949881.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3345764025.mp3",
    "duration": "01:42"
  },
  {
    "id": "new_3349578101",
    "title": "湖泊",
    "artist": "薛之谦",
    "cover": "https://p1.music.126.net/3NpQC5_gBMWD9fhbjE4yjA==/109951172741269727.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3349578101.mp3",
    "duration": "03:44"
  },
  {
    "id": "new_3349411299",
    "title": "A Thousand Years",
    "artist": "John Michael Howell/JVKE/ZVC",
    "cover": "https://p1.music.126.net/nlLwElFC78Mxt7rUDSIR_Q==/109951172741726136.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3349411299.mp3",
    "duration": "03:00"
  },
  {
    "id": "new_3348123054",
    "title": "比比拉布 我的刀盾",
    "artist": "阿吉野马",
    "cover": "https://p1.music.126.net/SnTmbeIHQxPefk3F6WxRRw==/109951172718612277.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3348123054.mp3",
    "duration": "02:25"
  },
  {
    "id": "new_3348159360",
    "title": "清明雨上（Live）",
    "artist": "杨子豪/薛淦隆",
    "cover": "https://p2.music.126.net/rn2CvC0EwwgusOCQr2wZmQ==/109951172719197284.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3348159360.mp3",
    "duration": "03:28"
  },
  {
    "id": "new_3349240047",
    "title": "你我经历的一刻",
    "artist": "王菲",
    "cover": "https://p2.music.126.net/dZCKbE-uS_gvJOqNu9_S3w==/109951172735940198.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3349240047.mp3",
    "duration": "03:57"
  },
  {
    "id": "new_3355209598",
    "title": "记忆嗅觉（有歌第二季第10期）（live）",
    "artist": "Top Barry",
    "cover": "https://p2.music.126.net/pjfDFyPAg0qmh7sv5o3vew==/109951172831802496.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3355209598.mp3",
    "duration": "04:36"
  },
  {
    "id": "new_3348561713",
    "title": "你得先是你自己",
    "artist": "房东的猫",
    "cover": "https://p2.music.126.net/v_xym_OYI12JBrGp3WmuiQ==/109951172725292242.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3348561713.mp3",
    "duration": "03:54"
  },
  {
    "id": "new_3349231363",
    "title": "全家福",
    "artist": "功夫胖KUNGFU-PEN",
    "cover": "https://p2.music.126.net/HSngyd8I35RMNs3_FaS2-Q==/109951172746863944.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3349231363.mp3",
    "duration": "03:33"
  },
  {
    "id": "new_3352109840",
    "title": "Bass da da da",
    "artist": "漂移的人（Drifting Man）",
    "cover": "https://p2.music.126.net/QbCZpLFH-bYBKmEukgsm0Q==/109951172780735905.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3352109840.mp3",
    "duration": "02:16"
  },
  {
    "id": "new_3352471160",
    "title": "布拉格广场 (JOLIN Version)",
    "artist": "蔡依林",
    "cover": "https://p2.music.126.net/kmkf4mfprj1Vk5UFxAV2uw==/109951172787051325.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3352471160.mp3",
    "duration": "03:12"
  },
  {
    "id": "new_3350038173",
    "title": "sobe baile pressão",
    "artist": "fryly",
    "cover": "https://p2.music.126.net/kWOwKC3Mj3IR_h6o3RZYZA==/109951172748430548.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3350038173.mp3",
    "duration": "02:05"
  },
  {
    "id": "new_3352249114",
    "title": "white lotus(白莲花）",
    "artist": "Bethybai",
    "cover": "https://p2.music.126.net/Rn9MvNv2zKG2drEjmNdnzg==/109951172782860896.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3352249114.mp3",
    "duration": "02:48"
  },
  {
    "id": "new_3355047509",
    "title": "high fashion girl",
    "artist": "THOME/贾真",
    "cover": "https://p2.music.126.net/DuodfjV-V4kxypFcZRKC_g==/109951172829937441.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3355047509.mp3",
    "duration": "03:46"
  },
  {
    "id": "new_3345623512",
    "title": "愛言葉V",
    "artist": "DECO*27/初音ミク",
    "cover": "https://p2.music.126.net/pyTnoT6MlSNZ-t_F8lxrFA==/109951172681231853.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3345623512.mp3",
    "duration": "03:39"
  },
  {
    "id": "new_3348254309",
    "title": "单程票",
    "artist": "派伟俊",
    "cover": "https://p2.music.126.net/S2szS3AlJKhtU9JFpjX9QQ==/109951172720764873.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3348254309.mp3",
    "duration": "03:42"
  },
  {
    "id": "new_3349249001",
    "title": "吉吉如律令",
    "artist": "coco-木子文",
    "cover": "https://p2.music.126.net/mjwdHBPAo3S_6DkWkZQbIQ==/109951172736071868.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3349249001.mp3",
    "duration": "03:07"
  },
  {
    "id": "new_3348506236",
    "title": "终湮进行曲",
    "artist": "阿吉野马/RANGE",
    "cover": "https://p2.music.126.net/OKAsLd1th5tyoL2b0_PLdw==/109951172724532656.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3348506236.mp3",
    "duration": "02:26"
  },
  {
    "id": "new_3349640602",
    "title": "天下过客",
    "artist": "王嘉尔",
    "cover": "https://p2.music.126.net/2d6A9BZruJtkic7r_SjBow==/109951172860773428.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3349640602.mp3",
    "duration": "03:46"
  },
  {
    "id": "new_3355479297",
    "title": "千鳥",
    "artist": "ヨルシカ",
    "cover": "https://p2.music.126.net/julupzshXmt9a12XntgLSg==/109951172835515141.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3355479297.mp3",
    "duration": "04:12"
  },
  {
    "id": "new_3349256909",
    "title": "500个冬天",
    "artist": "LilWuKong",
    "cover": "https://p2.music.126.net/DO1Bcl7xJGRZKLabZE72aA==/109951172736388111.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3349256909.mp3",
    "duration": "02:48"
  },
  {
    "id": "new_3355711085",
    "title": "天和山雨雪",
    "artist": "银临/司南",
    "cover": "https://p2.music.126.net/nGWcpq2ACNB9JWPVf1vOSg==/109951172838082077.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3355711085.mp3",
    "duration": "04:04"
  },
  {
    "id": "new_3356620681",
    "title": "Fire in These Hills",
    "artist": "Imagine Dragons",
    "cover": "https://p1.music.126.net/_lUYKIyxVoYdXM3ksJtbcA==/109951172849777327.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3356620681.mp3",
    "duration": "03:39"
  },
  {
    "id": "new_3352851484",
    "title": "纯粹想哭",
    "artist": "周柏豪",
    "cover": "https://p1.music.126.net/saRBursk-BxDwGZiQJiU_w==/109951172792738548.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3352851484.mp3",
    "duration": "04:24"
  },
  {
    "id": "new_3355136306",
    "title": "唐·毒蛇",
    "artist": "Bsh-1",
    "cover": "https://p1.music.126.net/FRJUtv91IbgAd6i4EI8TPw==/109951172830804708.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3355136306.mp3",
    "duration": "02:10"
  },
  {
    "id": "new_3349945556",
    "title": "烟圈",
    "artist": "功夫胖KUNGFU-PEN",
    "cover": "https://p1.music.126.net/HSngyd8I35RMNs3_FaS2-Q==/109951172746863944.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3349945556.mp3",
    "duration": "03:50"
  },
  {
    "id": "new_3355553976",
    "title": "假心话",
    "artist": "M3mo",
    "cover": "https://p1.music.126.net/kq1NhkyJ6SF3S3rAeiM0Ag==/109951172836323802.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3355553976.mp3",
    "duration": "02:05"
  },
  {
    "id": "new_3355870303",
    "title": "写给我第一个喜欢的女孩的歌",
    "artist": "封茗囧菌",
    "cover": "https://p1.music.126.net/QifT-FKTTXKww8uBitWawA==/109951172840142217.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3355870303.mp3",
    "duration": "02:59"
  },
  {
    "id": "new_3356055778",
    "title": "Baby Guai",
    "artist": "sunkis 宋秉勤/李大奔BENZO",
    "cover": "https://p1.music.126.net/UmuJ99Vh9QmLLvWC-hgQHg==/109951172842279792.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3356055778.mp3",
    "duration": "02:19"
  },
  {
    "id": "new_3352826361",
    "title": "Highest",
    "artist": "Higher Brothers/马思唯/KnowKnow/PSY.P/Melo",
    "cover": "https://p1.music.126.net/MSZasNthUQYRZ968wSj2VQ==/109951172792352706.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3352826361.mp3",
    "duration": "03:10"
  },
  {
    "id": "new_3354608917",
    "title": "TiRiKLaY (活人)",
    "artist": "UD",
    "cover": "https://p1.music.126.net/9qzx3P6-0wL8rFJ3xG8tAA==/109951172813599999.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3354608917.mp3",
    "duration": "02:35"
  },
  {
    "id": "new_3353437817",
    "title": "我对缘分小心翼翼",
    "artist": "林俊杰",
    "cover": "https://p1.music.126.net/qrw2ir64tJM5T7Vq-Q-hsA==/109951172802179555.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3353437817.mp3",
    "duration": "04:42"
  },
  {
    "id": "new_3353447033",
    "title": "胎记",
    "artist": "刘思鉴",
    "cover": "https://p1.music.126.net/p_5hW_8muZmRMygKH26nFQ==/109951172802378991.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3353447033.mp3",
    "duration": "03:20"
  },
  {
    "id": "new_3348146128",
    "title": "此刻最好的都在身边 (R&B氛围版)",
    "artist": "丁祾",
    "cover": "https://p1.music.126.net/_KYrR8eFY82jml9mutx41g==/109951172719029042.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3348146128.mp3",
    "duration": "03:16"
  },
  {
    "id": "new_3347633709",
    "title": "Kuyush Kirek",
    "artist": "Eldar Emin",
    "cover": "https://p1.music.126.net/seKlFTfqfC2nmkKmdlwTaA==/109951172710172065.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3347633709.mp3",
    "duration": "04:22"
  },
  {
    "id": "new_3352826363",
    "title": "How High Can We Reach",
    "artist": "Higher Brothers/马思唯/KnowKnow/PSY.P/Melo",
    "cover": "https://p1.music.126.net/MSZasNthUQYRZ968wSj2VQ==/109951172792352706.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3352826363.mp3",
    "duration": "03:46"
  },
  {
    "id": "new_3347930454",
    "title": "Infinity",
    "artist": "MerrinZephyr",
    "cover": "https://p1.music.126.net/I6b5qjudfJRxpXKDFmQklA==/109951172715121705.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3347930454.mp3",
    "duration": "02:06"
  },
  {
    "id": "new_3352278130",
    "title": "灰色系pt.2",
    "artist": "梶",
    "cover": "https://p1.music.126.net/4M3AK2XfekofDy6SShJYTA==/109951172783489232.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3352278130.mp3",
    "duration": "02:25"
  },
  {
    "id": "new_3355503709",
    "title": "moonboy",
    "artist": "JVKE/JEON SOMI",
    "cover": "https://p1.music.126.net/Zq8j7GbMSuellRCN3NTkIg==/109951172840314330.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3355503709.mp3",
    "duration": "02:53"
  },
  {
    "id": "new_3352504867",
    "title": "金童子",
    "artist": "Gareth.T/MC 张天赋",
    "cover": "https://p1.music.126.net/imG46pWdIzM2GwJRuKb_og==/109951172787601335.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3352504867.mp3",
    "duration": "03:20"
  },
  {
    "id": "new_3349944449",
    "title": "兜风",
    "artist": "功夫胖KUNGFU-PEN/王齐铭WatchMe",
    "cover": "https://p1.music.126.net/HSngyd8I35RMNs3_FaS2-Q==/109951172746863944.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3349944449.mp3",
    "duration": "02:34"
  },
  {
    "id": "new_3346418261",
    "title": "浆果",
    "artist": "曾舜晞",
    "cover": "https://p2.music.126.net/KkJsD134nH1oNOVocFTkdw==/109951172718942403.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3346418261.mp3",
    "duration": "04:32"
  },
  {
    "id": "new_3353220485",
    "title": "Dance With Me",
    "artist": "Bruno Mars",
    "cover": "https://p2.music.126.net/qn_xrMP6PnkI47XKbapONg==/109951172807952094.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3353220485.mp3",
    "duration": "03:39"
  },
  {
    "id": "new_3346738481",
    "title": "恋爱季",
    "artist": "布鲁昔",
    "cover": "https://p2.music.126.net/arn42WVpaF8zMXix0YMF5w==/109951172695827850.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3346738481.mp3",
    "duration": "02:38"
  },
  {
    "id": "new_3354931679",
    "title": "海海海",
    "artist": "冰心",
    "cover": "https://p2.music.126.net/-DZR8ZcHvFZOCZSZzZVvzw==/109951172827835322.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3354931679.mp3",
    "duration": "01:42"
  },
  {
    "id": "new_3355927123",
    "title": "回归一块小石头",
    "artist": "杨千嬅",
    "cover": "https://p2.music.126.net/_pynl1EQtmxKdHiXGBHzXw==/109951172840266284.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3355927123.mp3",
    "duration": "03:26"
  },
  {
    "id": "new_3355276956",
    "title": "S.U.N.H",
    "artist": "88LIEN/张方钊",
    "cover": "https://p2.music.126.net/jcUj3Ws9dfNd3vt97e79Bg==/109951172832658981.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3355276956.mp3",
    "duration": "03:06"
  },
  {
    "id": "new_3348083045",
    "title": "无名策",
    "artist": "塞壬唱片-MSR/拾贰 12/黎明鑫（阿火）/Mi/骅翎",
    "cover": "https://p2.music.126.net/9esQjYoU9mvbS0SsfBzUVA==/109951172717943358.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3348083045.mp3",
    "duration": "03:46"
  },
  {
    "id": "new_3351242272",
    "title": "悲怆层层（音乐剧《杜十娘》人物主题曲）",
    "artist": "强东玥",
    "cover": "https://p2.music.126.net/geSgO14TQaD5SlWe_lP1oA==/109951172757497927.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3351242272.mp3",
    "duration": "04:01"
  },
  {
    "id": "new_3354889934",
    "title": "无限逼近",
    "artist": "所长sama",
    "cover": "https://p2.music.126.net/tiwMtx2pVLqzqW63R-AdZA==/109951172827158913.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3354889934.mp3",
    "duration": "01:55"
  },
  {
    "id": "new_3353220388",
    "title": "I Just Might",
    "artist": "Bruno Mars",
    "cover": "https://p2.music.126.net/qn_xrMP6PnkI47XKbapONg==/109951172807952094.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3353220388.mp3",
    "duration": "03:33"
  },
  {
    "id": "new_3348590479",
    "title": "泼天的富贵2026",
    "artist": "刀酱",
    "cover": "https://p2.music.126.net/itBk2eRU0Pg8PQCzeyS1RA==/109951172725694603.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3348590479.mp3",
    "duration": "03:09"
  },
  {
    "id": "new_3353220362",
    "title": "Cha Cha Cha",
    "artist": "Bruno Mars",
    "cover": "https://p2.music.126.net/qn_xrMP6PnkI47XKbapONg==/109951172807952094.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3353220362.mp3",
    "duration": "03:57"
  },
  {
    "id": "new_3349280301",
    "title": "雪的逾期信",
    "artist": "罗景太DOUBLE/苏哲畅",
    "cover": "https://p2.music.126.net/jyA9kmaxU6ekA38WFHBMsQ==/109951172736484978.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3349280301.mp3",
    "duration": "03:54"
  },
  {
    "id": "new_3353721067",
    "title": "晚霞(SUN DOWN)",
    "artist": "MULA SAKEE",
    "cover": "https://p2.music.126.net/kye7Kg5JTHg19t2RWgjOmQ==/109951172807709642.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3353721067.mp3",
    "duration": "03:12"
  },
  {
    "id": "new_3349598695",
    "title": "追光的你",
    "artist": "王安宇",
    "cover": "https://p2.music.126.net/gH26nYlHo-qpsdY0-JOmJw==/109951172777856969.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3349598695.mp3",
    "duration": "03:37"
  },
  {
    "id": "new_3353240534",
    "title": "飞驰人生MIX",
    "artist": "漂移的人（Drifting Man）",
    "cover": "https://p2.music.126.net/TLFoWs4HMwDz9K1yZR4nWQ==/109951172799005375.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3353240534.mp3",
    "duration": "02:20"
  },
  {
    "id": "new_3355480210",
    "title": "花も騒めく",
    "artist": "ヨルシカ",
    "cover": "https://p2.music.126.net/julupzshXmt9a12XntgLSg==/109951172835515141.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3355480210.mp3",
    "duration": "03:41"
  },
  {
    "id": "new_3355132120",
    "title": "而已",
    "artist": "陈卓璇",
    "cover": "https://p2.music.126.net/xlBpALDOd2RXJuKwKqzUSQ==/109951172830734403.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3355132120.mp3",
    "duration": "03:32"
  },
  {
    "id": "new_3353492876",
    "title": "垃圾桶 (Live)",
    "artist": "袁一琦",
    "cover": "https://p2.music.126.net/tboWg_RgxKe5TAAnWb4oyA==/109951172803082274.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3353492876.mp3",
    "duration": "03:28"
  },
  {
    "id": "new_3348235986",
    "title": "再等等 (Live)",
    "artist": "欢子/鹭卓/何浩楠/王一珩OneSD",
    "cover": "https://p2.music.126.net/H8kw0OO3xI_kkaWzGMCENQ==/109951172720376828.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3348235986.mp3",
    "duration": "03:38"
  },
  {
    "id": "new_3347655323",
    "title": "Heawenlyy（Funk）",
    "artist": "ALONE",
    "cover": "https://p2.music.126.net/PoQGj-uXyKgazIwNEvO9UQ==/109951172710530149.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3347655323.mp3",
    "duration": "02:22"
  },
  {
    "id": "new_3353883459",
    "title": "Fxxk Dat",
    "artist": "BOBBYNOPEACE/极品贵公子",
    "cover": "https://p2.music.126.net/nBhPWoZeCmJUCKUaT6O-_g==/109951172809718981.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3353883459.mp3",
    "duration": "02:16"
  },
  {
    "id": "new_3355157684",
    "title": "惊蛰",
    "artist": "Winky诗",
    "cover": "https://p2.music.126.net/F0mfKbpuLoFCPUiPjPdXIQ==/109951172840169520.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3355157684.mp3",
    "duration": "04:06"
  },
  {
    "id": "new_3347985363",
    "title": "Gulbahton",
    "artist": "Bilal Enwer/Eskender-Uxxak",
    "cover": "https://p2.music.126.net/760-LNK9fgKFYC9TYTJa5w==/109951172716447116.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3347985363.mp3",
    "duration": "03:22"
  },
  {
    "id": "new_3348689625",
    "title": "Fascination Dreams赛段（飞驰人生3电影歌曲)",
    "artist": "阿鲲",
    "cover": "https://p2.music.126.net/qP4yIYPyGi_ur1s6BwID8A==/109951172747760729.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3348689625.mp3",
    "duration": "03:08"
  },
  {
    "id": "new_3346467890",
    "title": "战争",
    "artist": "驼儿",
    "cover": "https://p2.music.126.net/RFrLEnjzuHWxZ3vmmjNTtA==/109951172692169469.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3346467890.mp3",
    "duration": "02:30"
  },
  {
    "id": "new_3353117290",
    "title": "舒服家",
    "artist": "于贞",
    "cover": "https://p1.music.126.net/Gie36VVTsQkgMV8uIVn_zA==/109951172796999120.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3353117290.mp3",
    "duration": "03:38"
  },
  {
    "id": "new_3353219737",
    "title": "Why You Wanna Fight?",
    "artist": "Bruno Mars",
    "cover": "https://p1.music.126.net/qn_xrMP6PnkI47XKbapONg==/109951172807952094.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3353219737.mp3",
    "duration": "04:14"
  },
  {
    "id": "new_3349354006",
    "title": "太阳神Rap X JET SET!",
    "artist": "漂移的人（Drifting Man）",
    "cover": "https://p1.music.126.net/tvskNoT3H8JxK6WM1EB1qg==/109951172737462201.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3349354006.mp3",
    "duration": "02:07"
  },
  {
    "id": "new_3347247577",
    "title": "冬忌恋歌",
    "artist": "Max李玄/朱浪依",
    "cover": "https://p1.music.126.net/lFro4I_K6W95_ZDw8WRFsQ==/109951172702988714.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3347247577.mp3",
    "duration": "03:17"
  },
  {
    "id": "new_3350331730",
    "title": "Kaldima 2",
    "artist": "Ghulamjan Yakup",
    "cover": "https://p1.music.126.net/QYP_rx_8cxCYd597vjN84A==/109951172753737278.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3350331730.mp3",
    "duration": "03:05"
  },
  {
    "id": "new_3350515542",
    "title": "逐云轻影",
    "artist": "老衲不吃饭",
    "cover": "https://p1.music.126.net/diseK07H1CCqmWd2NqBf0w==/109951172757022606.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3350515542.mp3",
    "duration": "02:13"
  },
  {
    "id": "new_3355157135",
    "title": "影",
    "artist": "XMASwu(吴骜)",
    "cover": "https://p1.music.126.net/UeSRIdJvfE_0tXcJjfIk2g==/109951172831126079.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3355157135.mp3",
    "duration": "03:31"
  },
  {
    "id": "new_3355591625",
    "title": "爱如蝉翼",
    "artist": "黄霄雲",
    "cover": "https://p1.music.126.net/vNYbxmj6mGHLvCqi7gzhCw==/109951172838509506.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3355591625.mp3",
    "duration": "04:14"
  },
  {
    "id": "new_3351109438",
    "title": "哈德森加速部队特勤组",
    "artist": "Daneyl Fem",
    "cover": "https://p1.music.126.net/4Go7ZwJxgPgYQVuok3WWag==/109951172765387223.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=3351109438.mp3",
    "duration": "02:01"
  }
].map(song => ({
  ...song,
  src: song.src || getFallbackAudio(song.id)
}));



const OST_SONGS: Song[] = [
  {
    "id": "ost_27562927",
    "title": "好春光",
    "artist": "吴彤",
    "cover": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=500&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=27562927.mp3",
    "duration": "03:37"
  },
  {
    "id": "ost_3349955034",
    "title": "天赋",
    "artist": "唐嫣/罗晋",
    "cover": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=500&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=3349955034.mp3",
    "duration": "04:38"
  },
  {
    "id": "ost_86365",
    "title": "光棍",
    "artist": "胡歌",
    "cover": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=500&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=86365.mp3",
    "duration": "02:43"
  },
  {
    "id": "ost_95410",
    "title": "新鸳鸯蝴蝶梦",
    "artist": "黄安",
    "cover": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=500&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=95410.mp3",
    "duration": "04:22"
  },
  {
    "id": "ost_3332325016",
    "title": "落",
    "artist": "侯明昊",
    "cover": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=500&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=3332325016.mp3",
    "duration": "04:08"
  },
  {
    "id": "ost_3348525038",
    "title": "永远不回头",
    "artist": "沈腾/尹正/黄景瑜/张本煜/魏翔",
    "cover": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=500&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=3348525038.mp3",
    "duration": "05:01"
  },
  {
    "id": "ost_2064200747",
    "title": "蒲公英的约定周杰伦（正式版）",
    "artist": "沈幼楚",
    "cover": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=500&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=2064200747.mp3",
    "duration": "00:34"
  },
  {
    "id": "ost_87111",
    "title": "好想好想",
    "artist": "古巨基",
    "cover": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=500&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=87111.mp3",
    "duration": "03:37"
  },
  {
    "id": "ost_1313354324",
    "title": "出山",
    "artist": "花粥/王胜娚",
    "cover": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=500&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=1313354324.mp3",
    "duration": "03:20"
  },
  {
    "id": "ost_3346362708",
    "title": "生命树",
    "artist": "谭维维",
    "cover": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=500&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=3346362708.mp3",
    "duration": "04:33"
  },
  {
    "id": "ost_1465575275",
    "title": "初见",
    "artist": "心甜/道长",
    "cover": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=500&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=1465575275.mp3",
    "duration": "04:29"
  },
  {
    "id": "ost_1383023012",
    "title": "逍遥叹（翻自胡歌）",
    "artist": "张敬尧",
    "cover": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=500&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=1383023012.mp3",
    "duration": "05:13"
  },
  {
    "id": "ost_34179901",
    "title": "剑心",
    "artist": "张杰",
    "cover": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=500&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=34179901.mp3",
    "duration": "04:09"
  },
  {
    "id": "ost_1971190557",
    "title": "千年泪",
    "artist": "曹雨航",
    "cover": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=500&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=1971190557.mp3",
    "duration": "03:13"
  },
  {
    "id": "ost_1875497943",
    "title": "续写",
    "artist": "单依纯",
    "cover": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=500&fit=crop",
    "src": "https://music.163.com/song/media/outer/url?id=1875497943.mp3",
    "duration": "03:49"
  }
].map(song => ({
  ...song,
  src: song.src || getFallbackAudio(song.id)
}));



const ANCIENT_SAD_SONGS: Song[] = [
  {
    "id": "ancient_sad_1343200598",
    "title": "招摇",
    "artist": "陈楚生/胡莎莎",
    "cover": "https://p1.music.126.net/760ZgRAzDD8An9ob9UGRBg==/109951163815997796.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=1343200598.mp3",
    "duration": "04:35"
  },
  {
    "id": "ancient_sad_1914695837",
    "title": "三寸天堂",
    "artist": "严艺丹/赵志刚",
    "cover": "https://p1.music.126.net/fLaH3dWYQNEnb7ZdaFkhFA==/109951166974690163.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=1914695837.mp3",
    "duration": "04:34"
  },
  {
    "id": "ancient_sad_34923178",
    "title": "空待(独唱版)",
    "artist": "王朝",
    "cover": "https://p1.music.126.net/Cz0Bor-8XWlR0h6y5iRk8g==/109951168737278943.jpg",
    "src": "https://music.163.com/song/media/outer/url?id=34923178.mp3",
    "duration": "05:24"
  }
].map(song => ({
  ...song,
  src: song.src || getFallbackAudio(song.id)
}));

export const playlists: Playlist[] = [{
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
    songs: US_SONGS
  },
  {
    id: "ndtop", 
    title: "内地榜单", 
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop",
    gradient: "from-indigo-600 via-purple-500 to-fuchsia-400",
    songs: MAINLAND_SONGS
  },
  {
    id: "korean", 
    title: "韩语榜单", 
    cover: "https://images.unsplash.com/photo-1610935591850-9a3bf14810c0?w=500&h=500&fit=crop",
    gradient: "from-pink-500 via-rose-400 to-red-300",
    songs: KOREAN_SONGS
  },
  {
    id: "ktv", 
    title: "KTV榜单", 
    cover: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=500&h=500&fit=crop",
    gradient: "from-purple-600 via-violet-500 to-indigo-400",
    songs: KTV_SONGS
  },
  {
    id: "japanese", 
    title: "日语榜单", 
    cover: "https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?w=500&h=500&fit=crop",
    gradient: "from-red-500 via-orange-400 to-amber-300",
    songs: JAPANESE_SONGS
  },
  {
    id: "folk", 
    title: "乡村民谣", 
    cover: "https://images.unsplash.com/photo-1484300681262-5cca666b0954?w=500&h=500&fit=crop",
    gradient: "from-lime-600 via-yellow-500 to-amber-300",
    songs: FOLK_SONGS
  },
  {
    id: "soaring", 
    title: "飙升榜单", 
    cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&h=500&fit=crop",
    gradient: "from-cyan-500 via-blue-400 to-indigo-300",
    songs: SOARING_SONGS
  },
  {
    id: "new", 
    title: "新歌榜单", 
    cover: "https://images.unsplash.com/photo-1459749411177-287ce35e8b4f?w=500&h=500&fit=crop",
    gradient: "from-emerald-500 via-teal-400 to-cyan-300",
    songs: NEW_SONGS
  },
  {
    id: "ost", 
    title: "影视金曲", 
    cover: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=500&fit=crop",
    gradient: "from-slate-700 via-gray-600 to-zinc-500",
    songs: OST_SONGS
  },
  {
    id: "ancient_sad", 
    title: "虐恋古风", 
    cover: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?w=500&h=500&fit=crop",
    gradient: "from-cyan-700 via-sky-600 to-blue-500", 
    songs: ANCIENT_SAD_SONGS
  }
];