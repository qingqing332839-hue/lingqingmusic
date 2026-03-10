
'use client'

import { useParams, useRouter } from 'next/navigation'
import { Play, ArrowLeft, Clock, Disc, ListPlus, ListVideo, Loader2 } from 'lucide-react'
import { usePlayerStore } from '@/lib/store'
import { playlists, Song } from '@/lib/data'
import { motion } from 'framer-motion'
import { PlayingIndicator } from '@/components/ui/PlayingIndicator'
import { useToast } from '@/components/ui/Toast'
import { Tooltip } from '@/components/ui/Tooltip'
import { useState, useEffect } from 'react'

export default function PlaylistPage() {
  const params = useParams()
  const router = useRouter()
  const { playSong, currentSong, isPlaying, togglePlay, addToQueue, addToPlaylist } = usePlayerStore()
  const { showToast } = useToast()
  
  const [songs, setSongs] = useState<Song[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const playlist = playlists.find(p => p.id === params.id)
  
  useEffect(() => {
    if (!params.id) return

    const fetchSongs = async () => {
        setIsLoading(true)
        try {
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

  if (!playlist) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-2xl font-bold">Playlist Not Found</h1>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header / Cover */}
      <div className="relative h-[40vh] w-full overflow-hidden">
        {/* Background Blur using Gradient */}
        <div 
            className={`absolute inset-0 bg-gradient-to-br ${playlist.gradient} blur-3xl opacity-30 scale-110`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        
        <div className="absolute inset-0 flex items-end p-8 max-w-screen-xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 w-full">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`w-[200px] h-[200px] rounded-lg shadow-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br ${playlist.gradient} flex items-center justify-center p-4`}
                >
                    <h1 className="font-black text-white text-2xl md:text-3xl text-center leading-tight drop-shadow-md whitespace-pre-line">
                        {playlist.title.replace(/榜单|歌手|歌单|热歌|民谣|金曲|古风|唛榜|排行/, (match) => `\n${match}`)}
                    </h1>
                </motion.div>
                
                <div className="flex-1 flex flex-col justify-between h-[200px]">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4">{playlist.title}</h1>
                        <h2 className="text-sm font-medium tracking-wide text-zinc-400/60 mb-2">更新时间：{new Date().toISOString().split('T')[0]}</h2>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-4"
                    >
                         <button 
                            onClick={() => router.back()}
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
      <div className="max-w-screen-xl mx-auto px-8 mt-8">

        {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                <Loader2 className="w-10 h-10 animate-spin mb-4" />
                <p>正在同步榜单数据...</p>
            </div>
        ) : (
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

                            {/* Album (Hidden on mobile) */}
                            {/* <div className="hidden md:block flex-1 text-sm text-zinc-500 truncate mr-8">
                                {song.artist}
                            </div> */}

                            {/* Duration */}
                            {/* <div className="text-sm text-zinc-500 w-12 text-right font-variant-numeric tabular-nums">
                                {song.duration}
                            </div>
                            
                            {/* Actions (Hover) */}
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
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
        )}
      </div>
    </div>
  )
}
