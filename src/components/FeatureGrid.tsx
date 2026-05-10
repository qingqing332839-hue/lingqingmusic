'use client'

import { useEffect, useState } from 'react'
import { Play } from 'lucide-react'
import { motion } from 'framer-motion'
import { usePlayerStore } from '@/lib/store'
import { 
  POOL_POP_HITS, POOL_OLD_TIME_MALE, POOL_NEW_VOICE, POOL_RB, POOL_CLASSIC, 
  POOL_BANDS, POOL_FOLK, POOL_KTV, POOL_WESTERN, POOL_DOUYIN, 
  POOL_SHOW, POOL_OST, POOL_WORKOUT, POOL_VITALITY_GIRLS 
} from '@/lib/migu-data-pools'

// Helper to shuffle array
const shuffle = <T,>(array: T[]): T[] => {
  return [...array].sort(() => 0.5 - Math.random())
}

export function FeatureGrid() {
  const { 
    playSong, favorites, playlist, history, 
    dailySongs, lastDailyDate, setDailySongs,
    fmSongs, setFmSongs,
    addictiveSongs, setAddictiveSongs,
    discoverySongs, setDiscoverySongs,
    hasHydrated
  } = usePlayerStore()
  const [mounted, setMounted] = useState(false)
  const date = new Date()
  const day = date.getDate()
  const month = date.toLocaleString('en-US', { month: 'short' }) + '.'
  const todayStr = date.toISOString().split('T')[0]

  // Combine all pools for general selection
  const allSongsRaw = [
    ...POOL_POP_HITS, ...POOL_OLD_TIME_MALE, ...POOL_NEW_VOICE, ...POOL_RB, 
    ...POOL_CLASSIC, ...POOL_BANDS, ...POOL_FOLK, ...POOL_KTV, 
    ...POOL_WESTERN, ...POOL_DOUYIN, ...POOL_SHOW, ...POOL_OST, 
    ...POOL_WORKOUT, ...POOL_VITALITY_GIRLS
  ]

  // Helper to convert pool item to Song object
  const createSong = (item: {title: string, artist: string}, idPrefix: string, index: number) => ({
    id: `${idPrefix}_${Date.now()}_${index}`,
    title: item.title,
    artist: item.artist,
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    src: "",
    duration: "00:00"
  })

  // Initialize All Recommendations (Daily + FM + Addictive + Discovery)
  useEffect(() => {
    setMounted(true)
    
    // WAIT for hydration before generating anything
    if (!hasHydrated) return

    const isNewDay = lastDailyDate !== todayStr
    
    // 1. Daily Recommend
    if (isNewDay || dailySongs.length === 0) {
      generateDailySongs()
    }
    
    // 2. Private FM
    if (isNewDay || fmSongs.length === 0) {
      generateFMSongs()
    }
    
    // 3. Addictive Radio
    if (isNewDay || addictiveSongs.length === 0) {
      generateAddictiveSongs()
    }
    
    // 4. Hear Different
    if (isNewDay || discoverySongs.length === 0) {
      generateDiscoverySongs()
    }
  }, [hasHydrated, lastDailyDate, todayStr, dailySongs.length, fmSongs.length, addictiveSongs.length, discoverySongs.length])

  const generateDailySongs = () => {
    let selectedRaw: typeof POOL_POP_HITS = []

    // Logic: If listening history < 20 songs, use Random Recommendation
    if (history.length < 20) {
      console.log('Daily Recommend: Random Mode (History < 20)')
      selectedRaw = shuffle(allSongsRaw).slice(0, 50)
    } else {
      // Logic: Personalized (Taste-based)
      console.log('Daily Recommend: Personalized Mode')
      
      const likedArtists = new Set([
        ...history.map(s => s.artist),
        ...favorites.map(s => s.artist)
      ])
      
      const likedPool = allSongsRaw.filter(s => likedArtists.has(s.artist))
      const otherPool = allSongsRaw.filter(s => !likedArtists.has(s.artist))
      
      const targetLikedCount = 35
      const selectedLiked = shuffle(likedPool).slice(0, targetLikedCount)
      const remainingCount = 50 - selectedLiked.length
      const selectedOthers = shuffle(otherPool).slice(0, remainingCount)
      
      selectedRaw = shuffle([...selectedLiked, ...selectedOthers])
    }

    const songs = selectedRaw.map((item, i) => createSong(item, 'daily', i))
    setDailySongs(songs)
  }

  const generateFMSongs = () => {
    let targetArtists = Array.from(new Set(favorites.map(f => f.artist)))
    
    if (targetArtists.length === 0) {
       targetArtists = ["周杰伦", "陈奕迅", "林俊杰", "G.E.M.邓紫棋", "薛之谦", "王菲", "张学友"]
    }

    let candidateSongs = allSongsRaw.filter(s => targetArtists.includes(s.artist))
    
    if (candidateSongs.length < 20) {
      const others = POOL_POP_HITS.filter(s => !candidateSongs.includes(s))
      candidateSongs = [...candidateSongs, ...others]
    }

    const selected = shuffle(candidateSongs).slice(0, 20)
    const songs = selected.map((item, i) => createSong(item, 'fm', i))
    setFmSongs(songs)
  }

  const generateAddictiveSongs = () => {
    const hotPool = [...POOL_DOUYIN, ...POOL_NEW_VOICE, ...POOL_WESTERN]
    const selected = shuffle(hotPool).slice(0, 20)
    const songs = selected.map((item, i) => createSong(item, 'addictive', i))
    setAddictiveSongs(songs)
  }

  const generateDiscoverySongs = () => {
    const knownTitles = new Set([
      ...favorites.map(s => s.title),
      ...playlist.map(s => s.title),
      ...history.map(s => s.title)
    ])

    const unknownSongs = allSongsRaw.filter(s => !knownTitles.has(s.title))
    const poolToUse = unknownSongs.length > 0 ? unknownSongs : allSongsRaw
    
    const selected = shuffle(poolToUse).slice(0, 50)
    const songs = selected.map((item, i) => createSong(item, 'discovery', i))
    setDiscoverySongs(songs)
  }

  // 1. Play Daily Recommend
  const handleDailyRecommend = () => {
    if (dailySongs.length === 0) {
      generateDailySongs()
      return
    }
    playSong(dailySongs[0], dailySongs)
  }

  // 2. Private FM
  const handlePrivateFM = () => {
    if (fmSongs.length === 0) {
      generateFMSongs()
      return
    }
    playSong(fmSongs[0], fmSongs)
  }

  // 3. Addictive Radio
  const handleAddictiveRadio = () => {
    if (addictiveSongs.length === 0) {
      generateAddictiveSongs()
      return
    }
    playSong(addictiveSongs[0], addictiveSongs)
  }

  // 4. Hear Different
  const handleHearDifferent = () => {
    if (discoverySongs.length === 0) {
      generateDiscoverySongs()
      return
    }
    playSong(discoverySongs[0], discoverySongs)
  }

  // Prevent hydration mismatch
  if (!mounted) return null

  // Get cover for daily recommend (first song)
  const defaultCover = "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400&h=400&fit=crop"
  const dailyCover = dailySongs.length > 0 && dailySongs[0].cover ? dailySongs[0].cover : defaultCover

  return (
    <div className="w-full px-8 mb-12 relative z-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Card 1: Daily Recommend */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDailyRecommend}
          className="lg:col-span-2 relative h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl p-5 cursor-pointer group overflow-hidden border border-white/5"
        >
          <div className="flex flex-col justify-between h-full relative z-10">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">今日推荐</h3>
              <p className="text-white/60 text-xs">每日50首</p>
            </div>
            <div className="text-3xl font-light text-white/90">
              {day} <span className="text-lg font-normal text-white/60">/ {month}</span>
            </div>
          </div>
          
          {/* Right Image - Uses the cover of the first song in the list */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 w-28 h-28 rounded-lg overflow-hidden shadow-lg group-hover:shadow-blue-500/20 transition-all">
             <img 
               src={dailyCover} 
               alt="Daily Recommend"
               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
               onError={(e) => {
                  e.currentTarget.src = defaultCover
               }}
             />
             <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                </div>
             </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
        </motion.div>

        {/* Card 2: Private FM */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePrivateFM}
          className="relative h-40 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 rounded-xl p-5 cursor-pointer group overflow-hidden border border-white/5"
        >
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-white mb-1">私人FM</h3>
            <p className="text-emerald-200/60 text-xs">专属音乐雷达</p>
          </div>
          
          {/* Radar Visual */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24">
             <div className="absolute inset-0 border border-emerald-500/20 rounded-full animate-[ping_3s_linear_infinite]" />
             <div className="absolute inset-2 border border-emerald-500/20 rounded-full animate-[ping_3s_linear_infinite_1s]" />
             <div className="absolute inset-4 border border-emerald-500/20 rounded-full animate-[ping_3s_linear_infinite_2s]" />
          </div>

          <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <Play className="w-4 h-4 fill-white text-white ml-0.5" />
          </div>
        </motion.div>

        {/* Card 3: Addictive Radio */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddictiveRadio}
          className="relative h-40 bg-gradient-to-br from-rose-500/20 to-orange-500/10 rounded-xl p-5 cursor-pointer group overflow-hidden border border-white/5"
        >
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-white mb-1">上瘾电台</h3>
            <p className="text-rose-200/60 text-xs">一听上瘾</p>
          </div>
          
          {/* Gradient Orb */}
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-rose-500/20 rounded-full blur-xl group-hover:bg-rose-500/30 transition-colors" />

          <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <Play className="w-4 h-4 fill-white text-white ml-0.5" />
          </div>
        </motion.div>

        {/* Card 4: Hear Different */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleHearDifferent}
          className="relative h-40 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 rounded-xl p-5 cursor-pointer group overflow-hidden border border-white/5"
        >
          <div className="relative z-10">
            <h3 className="text-lg font-bold text-white mb-1">听见不同</h3>
            <p className="text-violet-200/60 text-xs">发现惊喜</p>
          </div>
          
          {/* Abstract Shape */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-violet-500/10 rotate-45 rounded-xl group-hover:rotate-90 transition-transform duration-700" />

          <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <Play className="w-4 h-4 fill-white text-white ml-0.5" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
