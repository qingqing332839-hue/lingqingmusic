'use client'

import { Play, Pause, SkipBack, SkipForward, Disc } from 'lucide-react'
import { usePlayerStore } from '@/lib/store'
import { useEffect, useRef, useState } from 'react'

export function Player() {
  const { currentSong, isPlaying, togglePlay, setIsPlaying, playNext, playPrev } = usePlayerStore()
  const audioRef = useRef<HTMLAudioElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  // Reset error when song changes
  useEffect(() => {
    setError(false)
    setCurrentTime(0)
  }, [currentSong])

  // Handle audio playback
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch((e) => {
            console.error("Playback failed:", e)
            // If failed, wait 2s then skip to next
            setTimeout(() => {
                if (isPlaying && audioRef.current?.error) {
                    playNext()
                }
            }, 2000)
          })
        }
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentSong])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
      setDuration(audioRef.current.duration || 0)
    }
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && audioRef.current) {
      const rect = progressRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = Math.min(Math.max(x / rect.width, 0), 1)
      audioRef.current.currentTime = percentage * audioRef.current.duration
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  if (!currentSong) return null

  // Ensure cover image is valid
  // const coverImage = currentSong.cover || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300'

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-zinc-800 p-4 pb-8 z-50">
      <audio 
        ref={audioRef}
        key={currentSong.id} // Force re-render on song change
        src={currentSong.src}
        onEnded={playNext} // Auto play next
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onTimeUpdate={handleTimeUpdate}
        onError={() => {
            console.error("Audio error, skipping to next")
            playNext() // Skip invalid songs automatically
        }}
      />

      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Info */}
        <div className="flex items-center gap-4 w-1/3">
          {/* Cover Image Removed */}
          <div className="min-w-0">
            <h4 className="font-bold text-white text-base truncate">{currentSong.title}</h4>
            <p className="text-xs text-zinc-400 truncate">{currentSong.artist}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-8 justify-center w-1/3">
          <SkipBack 
            className="w-6 h-6 text-zinc-400 hover:text-white cursor-pointer transition-colors" 
            onClick={playPrev}
          />
          <button 
            className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/20"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current ml-1" />
            )}
          </button>
          <SkipForward 
            className="w-6 h-6 text-zinc-400 hover:text-white cursor-pointer transition-colors" 
            onClick={playNext}
          />
        </div>

        {/* Progress */}
        <div className="hidden md:flex w-1/3 justify-end items-center gap-2">
           <span className="text-xs text-zinc-500 w-10 text-right">{formatTime(currentTime)}</span>
           <div 
             ref={progressRef}
             className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden max-w-[150px] cursor-pointer group"
             onClick={handleSeek}
           >
             <div 
                className="h-full bg-white rounded-full relative group-hover:bg-neon-green transition-colors"
                style={{ width: `${(currentTime / duration) * 100}%` }}
             ></div>
           </div>
           <span className="text-xs text-zinc-500 w-10">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  )
}
