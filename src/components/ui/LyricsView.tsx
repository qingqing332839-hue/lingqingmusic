'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Pause } from 'lucide-react'
import { usePlayerStore } from '@/lib/store'
import { cn } from '@/lib/utils'

interface LyricsViewProps {
  isOpen: boolean
  onClose: () => void
  currentSong: any
  currentTime: number
  onSeek: (time: number) => void
  isPlaying: boolean
  onTogglePlay: () => void
}

export function LyricsView({
  isOpen,
  onClose,
  currentSong,
  currentTime,
  onSeek,
  isPlaying,
  onTogglePlay
}: LyricsViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [lyrics, setLyrics] = useState<{ time: number; text: string }[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isUserScrolling, setIsUserScrolling] = useState(false)
  const [isCoverLoaded, setIsCoverLoaded] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Parse lyrics
  useEffect(() => {
    setIsCoverLoaded(false) // Reset loading state when song changes
    if (currentSong?.lyric) {
      const parsed = currentSong.lyric
        .split('\n')
        .map((line: string) => {
          const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/)
          if (match) {
            const minutes = parseInt(match[1])
            const seconds = parseInt(match[2])
            const milliseconds = parseInt(match[3])
            return {
              time: minutes * 60 + seconds + milliseconds / 1000,
              text: match[4].trim()
            }
          }
          return null
        })
        .filter(Boolean) as { time: number; text: string }[]
      setLyrics(parsed)
    } else {
        setLyrics([])
    }
  }, [currentSong])

  // Find active lyric
  useEffect(() => {
    const index = lyrics.findIndex((line, i) => {
      const nextLine = lyrics[i + 1]
      return currentTime >= line.time && (!nextLine || currentTime < nextLine.time)
    })
    
    if (index !== -1 && index !== activeIndex) {
      setActiveIndex(index)
      
      if (!isUserScrolling && containerRef.current) {
        scrollToIndex(index)
      }
    }
  }, [currentTime, lyrics, isUserScrolling, activeIndex])

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return
    const container = containerRef.current
    const activeEl = container.children[index] as HTMLElement
    if (activeEl) {
      // Calculate target position to center the element
      const containerHeight = container.clientHeight
      const elTop = activeEl.offsetTop
      const elHeight = activeEl.offsetHeight
      
      // Target scroll position = element top - (half container height) + (half element height)
      // Shift up by 1/4 of container height: add (containerHeight / 4) to scroll target (scrolling more down reveals lower content, so to move content UP, we scroll DOWN? No.)
      // To move the active element UP relative to the viewport, we need to scroll DOWN (increase scrollTop).
      // Wait, let's visualize:
      // scrollTop = 0 => element is at top.
      // We want element to be at 1/4 from top instead of 1/2 from top.
      // Center position: scrollTop = elTop - containerHeight/2 + elHeight/2
      // 1/4 from top position: scrollTop = elTop - containerHeight/4 + elHeight/2
      // Let's try adjusting the offset.
      const target = elTop - (containerHeight * 0.4) + (elHeight / 2)
      
      container.scrollTo({ top: target, behavior: 'smooth' })
    }
  }

  const handleLyricClick = (time: number, index: number) => {
    onSeek(time)
    setActiveIndex(index)
    // Force reset scrolling state to allow immediate snap
    setIsUserScrolling(false) 
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    
    // Immediate scroll to target
    scrollToIndex(index)
  }


  // Simplify interactions: avoid global keyboard hooks to keep behavior predictable

  // Handle user scroll interaction
  const handleScroll = () => {
    setIsUserScrolling(true)
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    scrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false)
    }, 2000)
  }

  if (!isOpen || !currentSong) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-50 bg-[#121212]/95 backdrop-blur-xl text-white flex flex-col md:flex-row overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none z-0">
            <div 
              className="absolute inset-0 bg-cover bg-center scale-125 blur-3xl opacity-50"
              style={{ backgroundImage: `url(${currentSong.cover})` }}
            />
            <div className="absolute inset-0 bg-[#121212]/60 backdrop-blur-2xl" />
          </div>
          
          <button 
            onClick={onClose}
            className="absolute top-24 right-24 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={3} />
          </button>

          {/* Left: Cover & Info */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 relative z-10">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full max-w-[400px] aspect-square rounded-2xl overflow-hidden shadow-2xl mb-8 relative group bg-black"
            >
              <img 
                src={currentSong.cover} 
                alt={currentSong.title} 
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-500",
                  isCoverLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setIsCoverLoaded(true)}
                onError={(e) => {
                  setIsCoverLoaded(false);
                  e.currentTarget.style.display = 'none';
                }}
              />
              {/* Play/Pause Overlay */}
              {isCoverLoaded && (
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    onClick={onTogglePlay}
                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:scale-105 transition-transform"
                  >
                      {isPlaying ? (
                          <div className="flex gap-1.5">
                              <div className="w-[5px] h-5 bg-white rounded-full" />
                              <div className="w-[5px] h-5 bg-white rounded-full" />
                          </div>
                      ) : (
                          <Play className="w-6 h-6 fill-white ml-1" />
                      )}
                    </button>
                </div>
              )}
            </motion.div>
            
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">{currentSong.title}</h2>
              <p className="text-xl text-zinc-400">{currentSong.artist}</p>
            </div>
          </div>

          {/* Right: Lyrics */}
          <div className="flex-[2] h-full relative z-10 mask-linear-fade -ml-[10%]">
            <div 
              ref={containerRef}
              onScroll={handleScroll}
              className="h-full w-full overflow-y-auto scrollbar-hide px-8 py-[40vh] text-center"
            >
              {lyrics.length > 0 ? (
                lyrics.map((line, i) => {
                  const isCurrent = i === activeIndex
                  return (
                    <motion.p
                      key={i}
                      layout
                      onClick={() => handleLyricClick(line.time, i)}
                      className={cn(
                        "py-2 text-base md:text-lg transition-colors cursor-pointer",
                        isCurrent ? "text-white font-bold scale-105" : "text-zinc-400/80 hover:text-white"
                      )}
                    >
                      {line.text}
                    </motion.p>
                  )
                })
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-500">
                  暂无歌词
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
