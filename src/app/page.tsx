'use client'

import { playlists, Song } from '@/lib/data'
import { Play, Heart, ListVideo, ListPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { SearchBar } from '@/components/ui/SearchBar'
import { useEffect, useRef, useState } from 'react'
import { Tooltip } from '@/components/ui/Tooltip'
import { usePlayerStore } from '@/lib/store'
import { useToast } from '@/components/ui/Toast'
import { cn } from '@/lib/utils'

const shadowColors: Record<string, string> = {
  top: 'group-hover:shadow-purple-500/40',
  ustop: 'group-hover:shadow-blue-500/40',
  ndtop: 'group-hover:shadow-indigo-600/40',
  douyin: 'group-hover:shadow-rose-500/40',
  korean: 'group-hover:shadow-pink-500/40',
  ktv: 'group-hover:shadow-purple-600/40',
  japanese: 'group-hover:shadow-red-500/40',
  folk: 'group-hover:shadow-lime-600/40',
  soaring: 'group-hover:shadow-cyan-500/40',
  new: 'group-hover:shadow-emerald-500/40',
  ost: 'group-hover:shadow-blue-500/40',
  ancient_sad: 'group-hover:shadow-cyan-700/40',
  netease_hot: 'group-hover:shadow-red-600/40',
  netease_new: 'group-hover:shadow-teal-500/40',
  daily_taste: 'group-hover:shadow-slate-700/40',
  private_share: 'group-hover:shadow-violet-600/40',
  electronic: 'group-hover:shadow-cyan-600/40',
  show_hits: 'group-hover:shadow-orange-500/40',
  rap: 'group-hover:shadow-zinc-700/40',
  acg: 'group-hover:shadow-pink-400/40',
  hk_tw: 'group-hover:shadow-blue-600/40',
  kuaishou: 'group-hover:shadow-orange-600/40',
  dj_hits: 'group-hover:shadow-purple-900/40',
  cantonese: 'group-hover:shadow-emerald-600/40',
  original: 'group-hover:shadow-amber-500/40',
  recent_plays: 'group-hover:shadow-teal-500/40',
}

function CoverImage({ src, alt, className }: { src: string, alt: string, className?: string }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);
    return (
        <div className={cn("bg-zinc-800 rounded shrink-0 relative overflow-hidden", className)}>
            {!isError && src && (
                <img 
                    src={src} 
                    alt={alt} 
                    className={cn(
                        "w-full h-full object-cover transition-opacity duration-500", 
                        isLoaded ? "opacity-100" : "opacity-0"
                    )}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setIsError(true)}
                />
            )}
            {/* Fallback Icon if Error or No Src? Or just empty bg. */}
        </div>
    );
}

import { FeatureGrid } from '@/components/FeatureGrid'
import dynamic from 'next/dynamic'

const HomeCharts = dynamic(() => import('@/components/HomeCharts').then((mod) => mod.HomeCharts), {
  ssr: false,
  loading: () => <div className="h-[360px] w-full flex items-center justify-center text-zinc-600">加载榜单中...</div>
})

const SongRecommendations = dynamic(
  () => import('@/components/ui/SongRecommendations').then((mod) => mod.SongRecommendations),
  {
    ssr: false,
    loading: () => <div className="h-[250px] w-full flex items-center justify-center text-zinc-600">加载推荐中...</div>
  }
)

const QQRankList = dynamic(() => import('@/components/QQRankList'), { 
  ssr: false,
  loading: () => <div className="h-[360px] w-full flex items-center justify-center text-zinc-600">加载排行榜...</div>
})

function LazySection({
  children,
  minHeight = 240,
  rootMargin = '320px 0px',
}: {
  children: React.ReactNode
  minHeight?: number
  rootMargin?: string
}) {
  const [shouldRender, setShouldRender] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (shouldRender || !containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [rootMargin, shouldRender])

  return (
    <div ref={containerRef}>
      {shouldRender ? (
        children
      ) : (
        <div
          className="w-full rounded-xl border border-white/5 bg-white/[0.02]"
          style={{ minHeight }}
        />
      )}
    </div>
  )
}

export default function Home() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Song[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const { playSong, addToQueue, addToPlaylist, toggleFavorite, isFavorite, currentSong } = usePlayerStore()
  const { showToast } = useToast()

  const handleSearchSubmit = async (query: string) => {
      setSearchQuery(query);
      if (!query) {
          setSearchResults([]);
          return;
      }
      
      setIsSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setSearchResults(data.results || []);
      } catch (error) {
        console.error('Search error:', error);
        showToast('搜索失败，请稍后重试');
      } finally {
        setIsSearching(false);
      }
  }

  const handlePlaySong = (song: Song) => {
      playSong(song, searchResults);
  }

  const handleGoHome = () => {
      setSearchQuery('')
      setSearchResults([])
      router.push('/')
  }

  return (
    <main className="min-h-screen bg-background pb-32 p-8 pt-4 flex flex-col items-center">
      <div className="w-full max-w-[1400px]">
        {/* Hero Title */}
        <div className="relative z-[1200] mb-8 w-full max-w-[1400px] mx-auto flex items-center justify-between h-20">
          {/* Left: Logo & Title */}
          <div
            className="flex items-center gap-5 md:pl-8 cursor-pointer"
            onClick={handleGoHome}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleGoHome()
              }
            }}
          >
            {/* Logo */}
            <div className="relative group">
               <div className="absolute -inset-1 bg-neon-green/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <div className="relative w-14 h-14 bg-black/40 rounded-xl border border-white/10 flex items-center justify-center shadow-lg backdrop-blur-md group-hover:border-neon-green/30 transition-colors">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neon-green transform group-hover:scale-110 transition-transform duration-500">
                    <path d="M3 10V14M7 7V17M11 4V20M15 7V17M19 10V14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="19" cy="5" r="2" fill="currentColor" className="animate-pulse" />
                  </svg>
               </div>
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-black text-white tracking-tight mb-1">
                聆清音乐
              </h1>
              <p className="text-zinc-400 text-sm">好的声音，期待你的聆听</p>
            </div>
          </div>
          
          {/* Center: Search Bar */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px]">
            <SearchBar onSearchSubmit={handleSearchSubmit} />
          </div>

          {/* Right: Favorites Button */}
          <div className="flex items-center md:pr-8">
            <button 
              onClick={() => router.push('/playlist/daily_taste')}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors group"
            >
              <Heart className="w-6 h-6 text-red-500 fill-red-500" />
              <span className="text-lg font-medium text-white">我的收藏 {usePlayerStore.getState().favorites.length > 0 ? `(${usePlayerStore.getState().favorites.length})` : ''}</span>
            </button>
          </div>
        </div>

        {searchQuery ? (
            // Search Results View
            <div className="w-full max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">
                        "{searchQuery}" 的搜索结果
                    </h2>
                    <button 
                        onClick={() => {
                            setSearchQuery('');
                            setSearchResults([]);
                        }}
                        className="text-sm text-zinc-400 hover:text-white transition-colors"
                    >
                        返回首页
                    </button>
                </div>

                {isSearching ? (
                     <div className="flex flex-col items-center justify-center py-20">
                        <div className="relative w-8 h-8 mb-4">
                            <div className="absolute inset-0 border-2 border-zinc-800 rounded-full"></div>
                            <div className="absolute inset-0 border-2 border-neon-green rounded-full border-t-transparent animate-spin"></div>
                        </div>
                        <p className="text-zinc-400 font-medium animate-pulse text-sm">正在搜索...</p>
                    </div>
                ) : searchResults.length > 0 ? (
                    <div className="space-y-1">
                        {searchResults.slice(0, 200).map((song, index) => {
                            const isCurrentSong = currentSong?.id === song.id
                            
                            return (
                                <div 
                                    key={song.id}
                                    className={cn(
                                        "group flex items-center p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer select-none",
                                        isCurrentSong && "bg-white/10"
                                    )}
                                    onClick={() => handlePlaySong(song)}
                                >
                                    {/* Index */}
                                    <div className="w-8 text-center text-zinc-500 text-sm font-variant-numeric tabular-nums mr-4 group-hover:hidden">
                                        {index + 1}
                                    </div>
                                    <div className="w-8 mr-4 hidden group-hover:flex items-center justify-center">
                                        <Play className="w-4 h-4 text-white fill-current" />
                                    </div>

                                    {/* Cover */}
                                    <CoverImage src={song.cover} alt={song.title} className="w-10 h-10 mr-4" />

                                    {/* Title & Artist */}
                                    <div className="flex-1 min-w-0 mr-4">
                                        <div className={cn("font-medium truncate", isCurrentSong ? "text-neon-green" : "text-zinc-200")}>
                                            {song.title}
                                        </div>
                                        <div className="text-sm text-zinc-500 truncate">
                                            {song.artist}
                                        </div>
                                    </div>

                                    {/* Duration (Hidden per previous request) */}
                                    {/* <div className="hidden md:block text-sm text-zinc-500 w-12 text-right font-variant-numeric tabular-nums mr-4">
                                        {song.duration}
                                    </div> */}
                                    
                                    {/* Actions (Hover) */}
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                                        <Tooltip content={isFavorite(song.id) ? "取消收藏" : "收藏"}>
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    toggleFavorite(song)
                                                    showToast(isFavorite(song.id) ? `已取消收藏` : `已添加到收藏`)
                                                }}
                                                className={cn(
                                                    "p-2 rounded-full",
                                                    isFavorite(song.id) ? "text-red-500" : "text-zinc-400 hover:text-white hover:bg-white/10"
                                                )}
                                            >
                                                <Heart className={cn("w-4 h-4", isFavorite(song.id) && "fill-current")} />
                                            </button>
                                        </Tooltip>
                                        <Tooltip content="下一首播放">
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    addToQueue(song)
                                                    showToast(`已添加到下一首播放`)
                                                }}
                                                className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full"
                                            >
                                                <ListVideo className="w-4 h-4" />
                                            </button>
                                        </Tooltip>
                                        <Tooltip content="添加到列表">
                                            <button 
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    addToPlaylist(song)
                                                    showToast(`已添加到播放列表`)
                                                }}
                                                className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full"
                                            >
                                                <ListPlus className="w-4 h-4" />
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20 text-zinc-500">
                        未找到与 "{searchQuery}" 相关的歌曲
                    </div>
                )}
            </div>
        ) : (
        /* Grid Layout - Changed to Flex to support fixed 200px cards */
        <div className="flex flex-col gap-12 w-full">
          <div className="w-full px-8 -mt-6">
            <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-zinc-800/50">
            </div>
          </div>

          <FeatureGrid />

          <SongRecommendations />

          <LazySection minHeight={420}>
            <QQRankList />
          </LazySection>
          
          <LazySection minHeight={420}>
            <div className="w-full px-8 mb-8">
              <HomeCharts />
            </div>
          </LazySection>

          <LazySection minHeight={320}>
            <SongRecommendations title=" 时光回响 · 岁月如歌" section="mixed" />
          </LazySection>

          <LazySection minHeight={320}>
            <SongRecommendations title=" 全场景音乐 · 听见生活" section="scene" />
          </LazySection>

          <LazySection minHeight={420}>
            <div className="grid grid-cols-9 gap-4 md:gap-6 lg:gap-8 w-full px-4 md:px-8 lg:px-12 mb-8 md:mb-12">
              {playlists.map((playlist, index) => (
                <motion.div
                  key={playlist.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => router.push(`/playlist/${playlist.id}`)}
                >
                  {/* Card Image - Proportional size */}
                  <div className={`relative w-full aspect-square rounded-lg overflow-hidden mb-2 shadow-lg ${shadowColors[playlist.id] || 'group-hover:shadow-white/20'} transition-all duration-300 bg-gradient-to-br ${playlist.gradient} flex items-center justify-center p-2`}>
                    {/* Centered Title - Scaled down proportionally */}
                    <h3 className="font-black text-white text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-center leading-tight drop-shadow-md whitespace-pre-line group-hover:scale-110 transition-transform duration-300">
                      {/* If title already contains newline, use it directly. Otherwise try to split by keywords. */}
                      {playlist.title.includes('\n') 
                        ? playlist.title 
                        : playlist.title.replace(/榜单|歌手|歌单|热歌|民谣|金曲|古风|唛榜|排行/, (match) => `\n${match}`)
                      }
                    </h3>
                    
                    {/* Overlay Play Button */}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button 
                        className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:scale-105 transition-transform"
                      >
                        <Play className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 fill-white ml-0.5 md:ml-1 text-white" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </LazySection>
        </div>
        )}
      </div>
    </main>
  )
}
