
'use client'

import { Search, X, Loader2, ListVideo, ListPlus } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { playlists, Song } from '@/lib/data'
import { usePlayerStore } from '@/lib/store'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Tooltip } from './Tooltip'

function CoverImage({ src, alt, className }: { src: string, alt: string, className?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  return (
    <div className={cn("bg-black rounded overflow-hidden shrink-0 relative", className)}>
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
    </div>
  );
}

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [remoteResults, setRemoteResults] = useState<Song[]>([])
  const [isSearching, setIsSearching] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const { playSong, addToQueue, addToPlaylist } = usePlayerStore()
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleOpen = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    setIsOpen(true)
  }

  const handleClose = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 200) // 200ms delay
  }

  // Flatten all songs for local search
  const allSongs = playlists.flatMap(p => p.songs)

  // Filter songs based on query
  const filteredSongs = query 
    ? allSongs.filter(song => 
        song.title.toLowerCase().includes(query.toLowerCase()) || 
        song.artist.toLowerCase().includes(query.toLowerCase())
      )
    : []

  // Remote search effect
  useEffect(() => {
    if (!query) {
      setRemoteResults([]);
      setIsSearching(false);
      return;
    }

    // Debounce
    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setRemoteResults(data.results || []);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handlePlay = (song: Song) => {
    // Check if song has a valid cover, if not, it might be updated later by playSong logic
    // But playSong logic mainly fetches src/lyric, it might not update cover if it's already "there" but empty/broken.
    // Actually, search results usually have covers.
    // If cover is missing or placeholder, we should ensure playSong fetches fresh details.
    
    // Pass the song as is. The Player component handles loading state.
    // However, if the search result itself has a broken cover URL, we need to handle that.
    
    // Let's ensure we don't clear the src if we want to play what we found,
    // BUT for search results (especially if from a crawler that doesn't get full details),
    // we might want to force a refresh.
    // In our current setup, search results (remoteResults) come from /api/search which calls searchMusic -> searchNetEase/searchKuGou.
    // These services DO return covers.
    
    playSong(song, [song]) 
    setIsOpen(false)
    setQuery('') 
  }

  const hasResults = filteredSongs.length > 0 || remoteResults.length > 0;

  return (
    <div 
      ref={containerRef} 
      className="relative w-full max-w-md mx-auto group z-50"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
    >
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10">
        <Search className="w-5 h-5 text-zinc-500 transition-colors group-focus-within:text-zinc-400" />
      </div>
      <input 
        type="search" 
         value={query}
         onChange={(e) => {
           setQuery(e.target.value)
           handleOpen() // Force open on input change
         }}
         className="block w-full p-4 pl-10 pr-10 text-sm text-white border border-zinc-500 rounded-full bg-zinc-800/30 placeholder-zinc-500 outline-none transition-all focus:ring-0 focus:border-zinc-400 focus:bg-zinc-800/60 focus:brightness-110 opacity-70 focus:opacity-100" 
         placeholder="搜索歌曲、歌手..." 
         required 
       />
      
      {/* Clear Button */}
      {query && (
        <button 
          onClick={() => {
            setQuery('')
            setIsOpen(false)
            setRemoteResults([])
          }}
          className="absolute inset-y-0 right-3 flex items-center justify-center"
        >
          <div className="w-5 h-5 rounded-full bg-zinc-500 flex items-center justify-center hover:bg-zinc-400 transition-colors">
            <X className="w-3 h-3 text-zinc-900" strokeWidth={4} />
          </div>
        </button>
      )}

      {/* Dropdown Results */}
      <AnimatePresence>
        {isOpen && query && (hasResults || isSearching) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-xl shadow-2xl overflow-hidden max-h-[80vh] overflow-y-auto"
          >
            {/* Local Results */}
            {filteredSongs.length > 0 && (
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  本地结果
                </div>
                <ul>
                  {filteredSongs.map((song) => (
                    <li key={song.id}>
                      <div
                        onClick={() => handlePlay(song)}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors text-left group/item cursor-pointer"
                      >
                        <CoverImage 
                          src={song.cover} 
                          alt={song.title} 
                          className="w-10 h-10 shadow-sm group-hover/item:shadow-md transition-all"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-zinc-200 truncate group-hover/item:text-white transition-colors">
                            {song.title}
                          </div>
                          <div className="text-xs text-zinc-400 truncate">
                            {song.artist}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity ml-auto">
                          <Tooltip content="下一首播放">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                addToQueue(song);
                              }}
                              className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                            >
                              <ListVideo className="w-4 h-4" />
                            </button>
                          </Tooltip>
                          <Tooltip content="添加到列表">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                addToPlaylist(song);
                              }}
                              className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                            >
                              <ListPlus className="w-4 h-4" />
                            </button>
                          </Tooltip>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Remote Results */}
            {(remoteResults.length > 0 || isSearching) && (
               <div className="py-2 border-t border-zinc-800/50">
                <div className="px-4 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center justify-between">
                  <span>全网搜索结果</span>
                  {isSearching && <Loader2 className="w-3 h-3 animate-spin" />}
                </div>
                {remoteResults.length > 0 ? (
                  <ul>
                    {remoteResults.map((song) => (
                      <li key={song.id}>
                        <div
                          onClick={() => handlePlay(song)}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/10 transition-colors text-left group/item cursor-pointer"
                        >
                          <CoverImage 
                            src={song.cover} 
                            alt={song.title} 
                            className="w-10 h-10 shadow-sm group-hover/item:shadow-md transition-all"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-zinc-200 truncate group-hover/item:text-white transition-colors">
                              {song.title}
                            </div>
                            <div className="text-xs text-zinc-400 truncate">
                              {song.artist}
                            </div>
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                            <Tooltip content="下一首播放">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToQueue(song);
                                }}
                                className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                              >
                                <ListVideo className="w-4 h-4" />
                              </button>
                            </Tooltip>
                            <Tooltip content="添加到列表">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToPlaylist(song);
                                }}
                                className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                              >
                                <ListPlus className="w-4 h-4" />
                              </button>
                            </Tooltip>
                          </div>
                          
                          <div className="text-xs text-zinc-500 ml-auto min-w-[32px] text-right">
                             {song.id.startsWith('kg') ? '酷狗' : song.id.startsWith('ne') ? '网易' : '网络'}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  !isSearching && (
                    <div className="px-4 py-8 text-center text-zinc-500 text-sm">
                      未找到相关歌曲
                    </div>
                  )
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
