'use client'

import { useParams, useRouter } from 'next/navigation'
import { Play, ArrowLeft, Clock, Disc } from 'lucide-react'
import { usePlayerStore } from '@/lib/store'
import { playlists } from '@/lib/data'
import { motion } from 'framer-motion'

export default function PlaylistPage() {
  const params = useParams()
  const router = useRouter()
  const { playSong, currentSong, isPlaying } = usePlayerStore()
  
  const playlist = playlists.find(p => p.id === params.id)
  
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
            <div className="flex flex-col md:flex-row gap-8 items-end w-full">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`w-48 h-48 rounded-lg shadow-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br ${playlist.gradient} flex items-center justify-center p-4`}
                >
                    <h1 className="font-black text-white text-2xl text-center leading-tight drop-shadow-md whitespace-pre-line">
                        {playlist.title.replace(/榜单|歌手|歌单|热歌/, (match) => `\n${match}`)}
                    </h1>
                </motion.div>
                
                <div className="flex-1 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h2 className="text-sm font-bold tracking-widest text-neon-green uppercase mb-2">Playlist</h2>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4">{playlist.title}</h1>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-4"
                    >
                         <button 
                            onClick={() => router.back()}
                            className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                         >
                            <ArrowLeft className="w-6 h-6" />
                         </button>
                         <button 
                            onClick={() => playSong(playlist.songs[0], playlist.songs)}
                            className="px-8 py-3 bg-neon-green text-black font-bold rounded-full hover:scale-105 transition-transform flex items-center gap-2"
                         >
                            <Play className="w-5 h-5 fill-current" />
                            Play All
                         </button>
                    </motion.div>
                </div>
            </div>
        </div>
      </div>

      {/* Song List */}
      <div className="max-w-screen-xl mx-auto px-8 mt-8">


        <div className="space-y-1">
            {playlist.songs.map((song, index) => {
                const isCurrent = currentSong?.id === song.id
                
                return (
                    <motion.div
                        key={song.id}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        // Only stagger the first 20 items to avoid long delays on scroll
                        transition={{ delay: index < 20 ? index * 0.05 : 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        onClick={() => playSong(song, playlist.songs)}
                        className={`group grid grid-cols-[auto_1fr_auto] gap-4 items-center py-3 px-4 rounded-lg cursor-pointer transition-colors ${isCurrent ? 'bg-white/10' : 'hover:bg-white/5'}`}
                    >
                        <span className="w-8 flex justify-center text-zinc-500 font-mono">
                            {isCurrent && isPlaying ? (
                                <Disc className="w-4 h-4 animate-spin text-neon-green" />
                            ) : (
                                <span className="group-hover:hidden">{index + 1}</span>
                            )}
                            <Play className={`w-4 h-4 fill-current hidden ${!isCurrent && 'group-hover:block text-white'}`} />
                        </span>
                        
                        <div className="flex items-center gap-4">
                            <div className="min-w-0">
                                <h3 className={`font-medium truncate ${isCurrent ? 'text-neon-green' : 'text-white'}`}>{song.title}</h3>
                                <p className="text-xs text-zinc-400 truncate">{song.artist}</p>
                            </div>
                        </div>
                        
                        <span className="text-zinc-500 text-sm tabular-nums flex justify-end">{song.duration}</span>
                    </motion.div>
                )
            })}
        </div>
      </div>
    </div>
  )
}
