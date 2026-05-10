'use client'

import { useState, useRef, useEffect } from 'react'
import { usePlayerStore } from '@/lib/store'
import { ProgressBar } from './ProgressBar'
import { LyricsView } from './LyricsView'
import { Play, SkipBack, SkipForward, ListMusic, Trash2, Repeat, Repeat1, Shuffle, ChevronDown, ListVideo, X, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

import { PlayingIndicator } from './PlayingIndicator'
import { VolumeControl } from './VolumeControl'
import { PlaybackMode } from '@/lib/store'
import { Tooltip } from './Tooltip'

export function Player() {
  const { 
    currentSong, 
    isPlaying, 
    togglePlay, 
    setIsPlaying, 
    playNext, 
    playPrev, 
    playlist, 
    setPlaylist, 
    playSong,
    volume,
    setVolume,
    mode,
    setMode,
    addToQueue,
    removeFromPlaylist,
    playNextSameName,
    toggleFavorite,
    isFavorite
  } = usePlayerStore()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showLyrics, setShowLyrics] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [isCoverLoaded, setIsCoverLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Playback timeout logic: Skip if loading > 10s (increased from 3s to allow backend fallback)
  useEffect(() => {
    let timeout: any;

    if (isLoading && currentSong) {
      timeout = setTimeout(() => {
        console.warn(`Playback timeout for "${currentSong.title}", skipping to next similar song...`);
        // Use smart recovery instead of just playNext
        playNextSameName(currentSong);
      }, 10000); // 10 seconds timeout
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isLoading, currentSong, playNextSameName]);

  // Reset error when song changes
  useEffect(() => {
    setCurrentTime(0)
    setIsCoverLoaded(false) // Reset loading state when song changes
    setIsLoading(true) // Start loading when song changes
  }, [currentSong])

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Handle audio playback
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise.catch((e) => {
            if (e.name !== 'AbortError') {
              console.error("Playback failed:", e)
            }
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
      
      // Force stop loading if music is playing
      if (isLoading && audioRef.current.currentTime > 0) {
        setIsLoading(false)
      }
    }
  }

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const toggleMode = () => {
    const modes: PlaybackMode[] = ['sequence', 'random', 'repeat']
    const currentIndex = modes.indexOf(mode)
    const nextMode = modes[(currentIndex + 1) % modes.length]
    setMode(nextMode)
  }

  const ModeIcon = () => {
    switch (mode) {
      case 'random':
        return <Shuffle className="w-5 h-5" />
      case 'repeat':
        return <Repeat1 className="w-5 h-5" />
      default:
        return <Repeat className="w-5 h-5" />
    }
  }

  const scrollToCurrentSong = () => {
    // Logic to scroll to current song in playlist
    const activeEl = document.getElementById(`playlist-item-${currentSong?.id}`)
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  useEffect(() => {
    if (showPlaylist) {
      // Small delay to ensure render
      setTimeout(scrollToCurrentSong, 100)
    }
  }, [showPlaylist, currentSong])

  if (!currentSong) return null

  return (
    <>
      {/* Full Screen Backdrop for Playlist Closing */}
      {showPlaylist && (
        <div 
          className="fixed inset-0 z-[2002] bg-transparent"
          onClick={() => setShowPlaylist(false)}
        />
      )}

      {/* Lyrics View */}
      <LyricsView 
        isOpen={showLyrics}
        onClose={() => setShowLyrics(false)}
        currentSong={currentSong}
        currentTime={currentTime}
        onSeek={handleSeek}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        audioRef={audioRef}
        isCoverLoaded={isCoverLoaded}
      />

      {/* Playlist Popup */}
      <AnimatePresence>
        {showPlaylist && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[90px] right-4 w-96 max-h-[calc(100vh-120px)] bg-[#121212] rounded-xl shadow-2xl flex flex-col z-[2003] overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-[#121212] backdrop-blur-md flex items-center justify-between sticky top-0 z-10">
              <div>
                <h3 className="text-white font-bold text-lg">播放列表</h3>
                <p className="text-xs text-zinc-400">{playlist.length} 首歌曲</p>
              </div>
              <button 
                onClick={() => setShowPlaylist(false)}
                className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
                title="收起列表"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
            
            {/* List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent overscroll-contain">
              {playlist.map((song, index) => {
                const isCurrent = currentSong.id === song.id
                return (
                  <div 
                    key={song.id}
                    id={`playlist-item-${song.id}`}
                    onClick={() => {
                        if (isCurrent) {
                            togglePlay()
                        } else {
                            playSong(song)
                        }
                    }}
                    className={cn(
                      "group flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors",
                      isCurrent ? "bg-zinc-800" : "hover:bg-zinc-800/50"
                    )}
                  >
                    {/* Index or Icon */}
                    <div className="w-6 flex justify-center text-xs text-zinc-500">
                      {isCurrent ? (
                        isPlaying ? (
                          <PlayingIndicator className="h-3" />
                        ) : (
                          <div className="flex gap-[2px] items-center justify-center">
                              <div className="w-[3px] h-2.5 bg-neon-green rounded-full" />
                              <div className="w-[3px] h-2.5 bg-neon-green rounded-full" />
                          </div>
                        )
                      ) : (
                        <>
                          <span className="group-hover:hidden">{index + 1}</span>
                          <Play className="w-3 h-3 hidden group-hover:block text-zinc-400 fill-current" />
                        </>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className={cn("text-sm truncate", isCurrent ? "text-neon-green" : "text-zinc-200")}>
                        {song.title}
                      </div>
                      <div className="text-xs text-zinc-500 truncate">
                        {song.artist}
                      </div>
                    </div>

                    {/* Hover Actions - Visible on hover, but we need to keep space for it */}
                    <div className="flex items-center gap-1 w-[60px] justify-end">
                         <div className="hidden group-hover:flex items-center gap-1">
                            <Tooltip content="下一首播放" side="left">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        addToQueue(song)
                                    }}
                                    className="p-1.5 hover:bg-zinc-700 rounded-full text-zinc-400 hover:text-white transition-colors"
                                >
                                    <ListVideo className="w-3.5 h-3.5" />
                                </button>
                            </Tooltip>
                            <Tooltip content="从列表移除" side="left">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        removeFromPlaylist(song.id)
                                    }}
                                    className="p-1.5 hover:bg-zinc-700 rounded-full text-zinc-400 hover:text-red-400 transition-colors"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </Tooltip>
                         </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Player Bar */}
      <div 
        className="fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-zinc-900 pb-safe z-[2001]"
        onClick={(e) => {
            // Prevent clicks on the bar from closing the playlist (optional, but good UX)
            // e.stopPropagation() 
            // Actually, user said "Clicking ANYWHERE else". 
            // If I stop propagation here, clicking the bar won't close it.
            // But usually the bar is the "parent" context.
            // Let's NOT stop propagation, so clicking the bar (empty space) *might* close it?
            // Wait, if the backdrop is BEHIND the bar, clicking the bar triggers the bar's events, not the backdrop's.
            // So clicking the bar will NOT close the playlist unless I add logic here.
            // But usually you don't close the playlist when clicking the play button.
        }}
      >
        {/* Progress Bar - Absolute Top */}
        <div className="absolute -top-[1px] left-0 right-0 z-20 hover:h-4 group transition-all">
           <ProgressBar 
             currentTime={currentTime}
             duration={duration}
             onSeek={handleSeek}
           />
        </div>

        <audio 
            ref={audioRef}
            key={currentSong.id}
            src={currentSong.src}
            // @ts-ignore
            referrerPolicy="no-referrer"
            // crossOrigin removed to avoid strict CORS errors with non-CORS audio sources
            onEnded={playNext}
            onPause={() => setIsPlaying(false)}
            onPlay={() => {
                setIsPlaying(true)
                setIsLoading(false)
            }}
            onPlaying={() => setIsLoading(false)}
            onWaiting={() => setIsLoading(true)}
            onCanPlay={() => setIsLoading(false)}
            onLoadedData={() => setIsLoading(false)}
            onCanPlayThrough={() => setIsLoading(false)}
            onTimeUpdate={handleTimeUpdate}
            onError={() => {
                console.error("Audio error, attempting smart recovery")
                setIsLoading(false)
                playNextSameName(currentSong)
            }}
        />

        <div className="max-w-screen-xl mx-auto flex items-center justify-between h-[80px] px-4">
            {/* Left: Info */}
            <div className="flex items-center gap-4 w-1/3">
                <div 
                  className="relative group cursor-pointer"
                  onClick={() => setShowLyrics(!showLyrics)}
                >
                    <div className={cn(
                        "w-12 h-12 rounded-full overflow-hidden shadow-lg transition-transform duration-500 bg-black animate-spin-slow"
                    )} style={{ 
                        animationDuration: '10s',
                        animationPlayState: isPlaying ? 'running' : 'paused'
                    }}>
                        <img 
                          key={currentSong.id}
                          src={currentSong.cover} 
                          alt={currentSong.title} 
                          className={cn(
                            "w-full h-full object-cover transition-opacity duration-500", 
                            isCoverLoaded ? "opacity-100" : "opacity-0"
                          )}
                          onLoad={(e) => {
                            setIsCoverLoaded(true);
                          }}
                          onError={(e) => {
                              // Reset to black if image fails
                              setIsCoverLoaded(false);
                          }}
                        />
                    </div>
                </div>
                
                <div className="min-w-0 flex flex-col justify-center">
                    <div className="flex items-center gap-2">
                        <h4 
                            className="font-bold text-white text-sm truncate max-w-[200px] cursor-pointer hover:text-neon-green transition-colors"
                            onClick={() => setShowLyrics(true)}
                        >
                            {currentSong.title}
                        </h4>
                    </div>
                    <p className="text-xs text-zinc-400 truncate">
                        {currentSong.artist}
                    </p>
                </div>
                
                {/* Favorite Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(currentSong);
                    }}
                    className={cn(
                        "p-2 rounded-full transition-colors",
                        isFavorite(currentSong.id) 
                            ? "text-red-500 hover:text-red-400" 
                            : "text-zinc-400 hover:text-white"
                    )}
                    title={isFavorite(currentSong.id) ? "取消收藏" : "添加到收藏"}
                >
                    <Heart className={cn("w-5 h-5", isFavorite(currentSong.id) && "fill-current")} />
                </button>
            </div>

            {/* Center: Controls */}
            <div className="flex items-center gap-6 justify-center w-1/3">
                <SkipBack 
                    className="w-5 h-5 text-zinc-400 hover:text-white cursor-pointer transition-colors" 
                    onClick={playPrev}
                />
                <button 
                    className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-white/10"
                    onClick={togglePlay}
                >
                    {isLoading ? (
                        // Loading Spinner
                        <div className="w-5 h-5 border-2 border-zinc-300 border-t-black rounded-full animate-spin" />
                    ) : isPlaying ? (
                        // Custom Rounded Pause
                        <div className="flex gap-1">
                            <div className="w-[4px] h-4 bg-black rounded-full" />
                            <div className="w-[4px] h-4 bg-black rounded-full" />
                        </div>
                    ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                    )}
                </button>
                <SkipForward 
                    className="w-5 h-5 text-zinc-400 hover:text-white cursor-pointer transition-colors" 
                    onClick={playNext}
                />
            </div>

            {/* Right: Actions */}
            <div className="flex items-center justify-end gap-4 w-1/3">
                <div className="flex items-center gap-4">
                  {/* Volume Control */}
                  <VolumeControl volume={volume} onVolumeChange={setVolume} />

                  {/* Playback Mode */}
                  <button 
                    onClick={toggleMode}
                    className="text-zinc-400 hover:text-white transition-colors"
                    title={`当前模式: ${mode === 'sequence' ? '顺序播放' : mode === 'random' ? '随机播放' : '单曲循环'}`}
                  >
                    <ModeIcon />
                  </button>
                </div>
                
                <div className="relative">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation()
                            setShowPlaylist(!showPlaylist)
                        }}
                        className={cn(
                            "p-2 transition-colors relative",
                            showPlaylist ? "text-neon-green" : "text-zinc-400 hover:text-white"
                        )}
                    >
                        <ListMusic className="w-5 h-5" />
                        {/* Playlist Playing Indicator */}
                        {isPlaying && !showPlaylist && (
                             <div className="absolute top-1 right-1 w-2 h-2 bg-neon-green rounded-full animate-pulse" />
                        )}
                    </button>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}
