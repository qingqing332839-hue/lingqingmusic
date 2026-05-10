
'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Play, ArrowLeft, Disc, ListPlus, ListVideo, Heart } from 'lucide-react'
import { usePlayerStore } from '@/lib/store'
import { playlists, Song } from '@/lib/data'
import { motion } from 'framer-motion'
import { PlayingIndicator } from '@/components/ui/PlayingIndicator'
import { useToast } from '@/components/ui/Toast'
import { Tooltip } from '@/components/ui/Tooltip'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export default function PlaylistPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { 
    playSong, 
    currentSong, 
    isPlaying, 
    togglePlay, 
    addToQueue, 
    addToPlaylist,
    favorites,
    toggleFavorite,
    isFavorite,
    history
  } = usePlayerStore()
  const { showToast } = useToast()
  
  const [songs, setSongs] = useState<Song[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const foundPlaylist = playlists.find(p => p.id === params.id)
  
  // Construct playlist object: Use found one, or build from URL params for remote playlists
  let playlist = foundPlaylist
  
  if (foundPlaylist && params.id === 'daily_taste') {
      playlist = { 
          ...foundPlaylist, 
          songs: favorites.map(f => ({...f, duration: f.duration || '00:00'})) 
      }
  } else if (foundPlaylist && params.id === 'recent_plays') {
      playlist = {
          ...foundPlaylist,
          songs: history.map(h => ({...h, duration: h.duration || '00:00'}))
      }
  } else if (!foundPlaylist && searchParams.get('title')) {
      // Remote playlist (e.g. Migu)
      playlist = {
          id: params.id as string,
          title: searchParams.get('title') || '未知歌单',
          cover: searchParams.get('cover') || '',
          gradient: 'from-zinc-800 to-zinc-900',
          songs: []
      }
  }
  
  // Extract subtitle from URL params
  const subtitle = searchParams.get('subtitle')
  
  useEffect(() => {
    if (!params.id) return

    // Special handling for Favorites page
    if (params.id === 'daily_taste') {
        setIsLoading(false)
        setSongs(favorites.map(f => ({ ...f, duration: f.duration || '00:00' })))
        return
    }

    // Special handling for Recent Plays page
    if (params.id === 'recent_plays') {
        setIsLoading(false)
        setSongs(history.map(h => ({ ...h, duration: h.duration || '00:00' })))
        return
    }

    const fetchSongs = async () => {
        setIsLoading(true)
        try {
            // For Migu playlists (not in local data), the API needs to handle them
            const res = await fetch(`/api/playlist?id=${params.id}`)
            if (res.ok) {
                const data = await res.json()
                setSongs(data.songs || [])
            }
        } catch (error) {
            console.error("Failed to fetch playlist", error)
        } finally {
            setIsLoading(false)
        }
    }

    fetchSongs()
  }, [params.id]) 

  // Separate effect to update favorites list ONLY when on favorites page
  useEffect(() => {
      if (params.id === 'daily_taste') {
          setSongs(favorites.map(f => ({ ...f, duration: f.duration || '00:00' })))
      }
  }, [favorites, params.id])

  // Separate effect to update history list ONLY when on recent plays page
  useEffect(() => {
      if (params.id === 'recent_plays') {
          setSongs(history.map(h => ({ ...h, duration: h.duration || '00:00' })))
      }
  }, [history, params.id])

  if (!playlist) {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-6 text-center">
            <h1 className="text-2xl font-bold text-white">歌单不存在</h1>
            <p className="text-sm text-zinc-400">请从首页进入歌单，或检查链接是否包含歌单标题与封面参数。</p>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
            >
              返回首页
            </button>
        </div>
    )
  }

  // Determine if we should show cover image or gradient box
  const showCoverImage = !foundPlaylist && playlist.cover;

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header / Cover */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        {/* Background Blur using Gradient */}
        {showCoverImage ? (
             <div className="absolute inset-0">
                 <img src={playlist.cover} alt="" className="w-full h-full object-cover blur-3xl opacity-30 scale-110" />
                 <div className="absolute inset-0 bg-black/40" />
             </div>
        ) : (
            <div 
                className={`absolute inset-0 bg-gradient-to-br ${playlist.gradient} blur-3xl opacity-30 scale-110`}
            />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        
        <div className="absolute inset-0 flex items-end p-8 max-w-screen-xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 w-full">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                        "w-[200px] h-[200px] rounded-lg shadow-2xl overflow-hidden flex-shrink-0 flex items-center justify-center p-4 relative",
                        !showCoverImage && `bg-gradient-to-br ${playlist.gradient}`
                    )}
                >
                    {showCoverImage ? (
                        <img src={playlist.cover} alt={playlist.title} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                        <h1 className="font-black text-white text-2xl md:text-3xl text-center leading-tight drop-shadow-md whitespace-pre-line">
                            {/* If title already contains newline, use it directly. Otherwise try to split by keywords. */}
                            {playlist.title.includes('\n') 
                              ? playlist.title 
                              : playlist.title.replace(/榜单|歌手|歌单|热歌|民谣|金曲|古风|唛榜|排行/, (match) => `\n${match}`)
                            }
                        </h1>
                    )}
                </motion.div>
                
                <div className="flex-1 flex flex-col justify-between h-[200px]">

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4">{playlist.title}</h1>
                        <h2 className="text-sm font-medium tracking-wide text-zinc-400/60 mb-2">
                            {subtitle ? subtitle : `更新时间：${new Date().toISOString().split('T')[0]}`}
                        </h2>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-4"
                    >
                         <button 
                            onClick={() => router.push('/')}
                            className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
                         >
                            <ArrowLeft className="w-5 h-5" strokeWidth={3} />
                         </button>
                         <button 
                            onClick={() => songs.length > 0 && playSong(songs[0], songs)}
                            disabled={isLoading || songs.length === 0}
                            className="px-6 py-2.5 bg-zinc-200 text-black font-bold rounded-full hover:bg-white scale-105 hover:scale-110 transition-all flex items-center gap-2 shadow-lg shadow-black/20 disabled:opacity-50 disabled:scale-100"
                         >
                            <Play className="w-4 h-4 fill-black text-black" />
                            <span className="text-sm">播放全部</span>
                            <span className="text-sm font-medium ml-0.5">{isLoading ? '...' : songs.length}</span>
                         </button>
                    </motion.div>
                </div>
            </div>
        </div>
      </div>

      {/* Song List */}
      <div className="max-w-screen-xl mx-auto px-8 mt-8 min-h-[200px] relative">

        {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="flex flex-col items-center gap-4">
                    <div className="relative w-8 h-8">
                        <div className="absolute inset-0 border-2 border-zinc-800 rounded-full"></div>
                        <div className="absolute inset-0 border-2 border-neon-green rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="text-zinc-400 font-medium animate-pulse text-sm">正在加载歌单...</p>
                </div>
            </div>
        ) : songs.length > 0 ? (
            <div className="space-y-1">
                {songs.map((song, index) => {
                    const isCurrent = currentSong?.id === song.id
                    
                    return (
                        <motion.div
                            key={song.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            // Only stagger the first 20 items to avoid long delays on scroll
                            transition={{ delay: index < 20 ? index * 0.05 : 0 }}
                            className={`group flex items-center p-3 rounded-md transition-all hover:bg-white/5 cursor-pointer ${
                                isCurrent ? 'bg-white/10' : ''
                            }`}
                            onClick={() => {
                                if (isCurrent) {
                                    togglePlay()
                                } else {
                                    playSong(song, songs)
                                }
                            }}
                        >
                            {/* Index / Play Icon */}
                            <div className="w-8 text-center text-sm text-zinc-500 font-medium mr-4 flex justify-center relative">
                                {isCurrent ? (
                                    isPlaying ? (
                                        <PlayingIndicator />
                                    ) : (
                                        <div className="flex gap-[3px] items-center justify-center">
                                            <div className="w-[3px] h-3 bg-neon-green rounded-full" />
                                            <div className="w-[3px] h-3 bg-neon-green rounded-full" />
                                        </div>
                                    )
                                ) : (
                                    <span className="group-hover:hidden">{index + 1}</span>
                                )}
                                
                                {!isCurrent ? (
                                    <button 
                                         className="hidden group-hover:flex items-center justify-center absolute inset-0 m-auto"
                                         onClick={(e) => {
                                             e.stopPropagation()
                                             playSong(song, songs)
                                         }}
                                     >
                                         <Play className="w-4 h-4 fill-white text-white" />
                                     </button>
                                ) : null}
                            </div>

                            {/* Title & Artist */}
                            <div className="flex-1 min-w-0 mr-8">
                                <div className={`font-medium truncate ${isCurrent ? 'text-neon-green' : 'text-white'}`}>
                                    {song.title}
                                </div>
                                <div className="text-sm text-zinc-400 truncate flex items-center gap-2 group-hover:text-zinc-300">
                                    {song.artist}
                                </div>
                            </div>

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

                        </motion.div>
                    )
                })}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                <Disc className="w-12 h-12 mb-4 opacity-20" />
                <p>歌单内还没有歌曲</p>
            </div>
        )}
      </div>
    </div>
  )
}
