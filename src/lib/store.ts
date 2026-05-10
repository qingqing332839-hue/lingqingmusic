import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Song {
  id: string
  title: string
  artist: string
  cover: string
  src: string
  duration?: string
  lyric?: string // LRC format lyric
}

export type PlaybackMode = 'sequence' | 'random' | 'repeat'

interface PlayerStore {
  currentSong: Song | null
  playlist: Song[] // Current playlist queue
  favorites: Song[] // User favorite songs
  history: Song[] // Listening history
  dailySongs: Song[] // Daily recommendation list
  fmSongs: Song[] // Private FM list
  addictiveSongs: Song[] // Addictive Radio list
  discoverySongs: Song[] // Hear Different list
  searchHistory: string[] // Search history
  lastDailyDate: string // Date of last daily recommendation generation (YYYY-MM-DD)
  isPlaying: boolean
  hasHydrated: boolean // Whether the store has been rehydrated from storage
  volume: number
  mode: PlaybackMode
  playSong: (song: Song, queue?: Song[]) => Promise<void>
  togglePlay: () => void
  setIsPlaying: (isPlaying: boolean) => void
  setVolume: (volume: number) => void
  setMode: (mode: PlaybackMode) => void
  playNext: () => void
  playPrev: () => void
  playNextSameName: (song: Song) => Promise<void>
  addToQueue: (song: Song) => void
  addToPlaylist: (song: Song) => void
  removeFromPlaylist: (songId: string) => void
  setPlaylist: (playlist: Song[]) => void
  toggleFavorite: (song: Song) => void
  isFavorite: (songId: string) => boolean
  addToHistory: (song: Song) => void
  addToSearchHistory: (query: string) => void
  clearSearchHistory: () => void
  setDailySongs: (songs: Song[]) => void
  setFmSongs: (songs: Song[]) => void
  setAddictiveSongs: (songs: Song[]) => void
  setDiscoverySongs: (songs: Song[]) => void
  setHasHydrated: (hydrated: boolean) => void
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      currentSong: null,
      playlist: [],
      favorites: [],
      history: [],
      dailySongs: [],
      fmSongs: [],
      addictiveSongs: [],
      discoverySongs: [],
      searchHistory: [],
      lastDailyDate: '',
      isPlaying: false,
      hasHydrated: false,
      volume: 1, // Default volume 100%
      mode: 'sequence',
      playSong: async (song, queue) => {
    if (!song) return; // Gracefully exit if song is null or undefined

    // Add to history whenever a song starts playing
    const { addToHistory } = get();
    addToHistory(song);

    // 1. Set basic state optimistically
    set((state) => ({ 
      currentSong: song, 
      playlist: queue ? queue : (state.playlist.find(s => s.id === song.id) ? state.playlist : [...state.playlist, song]),
      isPlaying: true 
    }));

    // 2. Determine if we need to fetch details
    // Condition: No src OR src is empty OR duration is placeholder '00:00'
    const needsFetch = !song.src || song.duration === '00:00';

    if (needsFetch) {
        try {
            // Use title + artist for search query
            const query = `${song.title} ${song.artist}`;
            
            // Call our unified song detail API
            const res = await fetch(`/api/song?q=${encodeURIComponent(query)}&id=${song.id}`);
            
            if (res.ok) {
                const fullSong = await res.json();
                
                // IMPORTANT: The API might return a song object, but we MUST check if it has a valid src.
                if (fullSong && fullSong.src) {
                    set((state) => {
                        // Only update if the user hasn't switched songs in the meantime
                        if (state.currentSong?.id === song.id) {
                            // Merge the new details (src, lyric, cover, duration) into current song
                            const updatedSong = { ...state.currentSong, ...fullSong };
                            
                            // Also update the song in the playlist to avoid re-fetching next time
                            const updatedPlaylist = state.playlist.map(s => s.id === song.id ? updatedSong : s);

                            // Update other lists if they contain this song (to sync cover/details)
                            const updatedDailySongs = state.dailySongs.map(s => s.id === song.id ? updatedSong : s);
                            const updatedFmSongs = state.fmSongs.map(s => s.id === song.id ? updatedSong : s);
                            const updatedAddictiveSongs = state.addictiveSongs.map(s => s.id === song.id ? updatedSong : s);
                            const updatedDiscoverySongs = state.discoverySongs.map(s => s.id === song.id ? updatedSong : s);

                            return {
                                currentSong: updatedSong,
                                playlist: updatedPlaylist,
                                dailySongs: updatedDailySongs,
                                fmSongs: updatedFmSongs,
                                addictiveSongs: updatedAddictiveSongs,
                                discoverySongs: updatedDiscoverySongs
                            };
                        }
                        return {};
                    });
                } else {
                    console.warn(`No playable source found for: ${song.title}`);
                    // Optionally, trigger a toast or auto-skip here if we had access to those actions
                }
            } else {
                 console.error("Song detail API failed", res.status);
            }
        } catch (e) {
            console.error("Failed to fetch song details", e);
        }
    }
  },
  addToQueue: (song) => set((state) => {
    // 1. Remove song if it already exists in the playlist (to avoid duplicates, or just move it)
    const currentPlaylist = state.playlist.filter(s => s.id !== song.id)
    
    // 2. Find current song index
    const currentIndex = currentPlaylist.findIndex(s => s.id === state.currentSong?.id)
    
    // 3. If no song is playing, just add to end or make it current if empty
    if (currentIndex === -1) {
        if (state.currentSong === null) {
             return { 
                 currentSong: song,
                 playlist: [song],
                 isPlaying: true
             }
        }
        return { playlist: [...currentPlaylist, song] }
    }
    
    // 4. Insert after current song
    const newPlaylist = [...currentPlaylist]
    newPlaylist.splice(currentIndex + 1, 0, song)
    return { playlist: newPlaylist }
  }),
  addToPlaylist: (song) => set((state) => {
      // If playlist is empty and no song is playing, play this song immediately
      if (state.playlist.length === 0 && !state.currentSong) {
          return {
              currentSong: song,
              playlist: [song],
              isPlaying: true
          }
      }
      return { 
        playlist: [...state.playlist.filter(s => s.id !== song.id), song] 
      }
  }),
  removeFromPlaylist: (songId) => set((state) => {
      const newPlaylist = state.playlist.filter(s => s.id !== songId)
      // If the removed song is current song, play next or stop
      if (state.currentSong?.id === songId) {
          if (newPlaylist.length === 0) {
              return { playlist: [], currentSong: null, isPlaying: false }
          }
          // Find next song
          // For simplicity, just pick the first one or next one?
          // Let's rely on playNext logic? No, we are in reducer.
          // Let's just pick the next available song in sequence
          const currentIndex = state.playlist.findIndex(s => s.id === songId)
          const nextSong = newPlaylist[currentIndex % newPlaylist.length]
          return { playlist: newPlaylist, currentSong: nextSong }
      }
      return { playlist: newPlaylist }
  }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setVolume: (volume) => set({ volume }),
  setMode: (mode) => set({ mode }),
  playNext: () => {
    const { playlist, currentSong, mode, playSong } = get()
    if (!currentSong || playlist.length === 0) return
    
    // Repeat Single Mode: Just restart current song
    if (mode === 'repeat') {
        const audio = document.querySelector('audio')
        if (audio) {
            audio.currentTime = 0
            audio.play()
        }
        return
    }

    // Random Mode
    if (mode === 'random') {
        const nextIndex = Math.floor(Math.random() * playlist.length)
        playSong(playlist[nextIndex])
        return
    }

    // Sequence Mode
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id)
    if (currentIndex === -1) {
        if (playlist.length > 0) playSong(playlist[0])
        return
    }
    const nextIndex = (currentIndex + 1) % playlist.length
    playSong(playlist[nextIndex])
  },
  playPrev: () => {
    const { playlist, currentSong, mode, playSong } = get()
    if (!currentSong || playlist.length === 0) return
    
    if (mode === 'repeat') {
        const audio = document.querySelector('audio')
        if (audio) {
            audio.currentTime = 0
            audio.play()
        }
        return
    }

    if (mode === 'random') {
        const prevIndex = Math.floor(Math.random() * playlist.length)
        playSong(playlist[prevIndex])
        return
    }
    
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id)
    if (currentIndex === -1) return

    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length
    playSong(playlist[prevIndex])
  },
  playNextSameName: async (failedSong) => {
    const { playlist, playSong, playNext } = get()
    console.log(`[Smart Recovery] Attempting to find replacement for: ${failedSong.title}`)

    // 1. Try finding same name song in current playlist (different ID)
    const sameNameSong = playlist.find(s => s.title === failedSong.title && s.id !== failedSong.id)
    if (sameNameSong) {
        console.log(`[Smart Recovery] Found same name song in playlist: ${sameNameSong.title}`)
        playSong(sameNameSong)
        return
    }

    // 2. Try fetching a new version via Fuzzy Search (Title only)
    try {
        const res = await fetch(`/api/song?q=${encodeURIComponent(failedSong.title)}`)
        if (res.ok) {
            const altSong = await res.json()
            if (altSong && altSong.id !== failedSong.id && altSong.src) {
                 console.log(`[Smart Recovery] Found alternative: ${altSong.title} (${altSong.artist})`)
                 
                 // Replace the failed song in playlist with this new working one
                 const newPlaylist = playlist.map(s => s.id === failedSong.id ? altSong : s)
                 set({ playlist: newPlaylist })
                 
                 // Play it!
                 playSong(altSong)
                 return
            }
        }
    } catch (e) {
        console.error("Smart recovery failed", e)
    }
    
    // 3. Fallback: If all else fails, just play next (original behavior)
    console.warn(`[Smart Recovery] No alternative found, skipping to next song.`)
    playNext()
  },
  setPlaylist: (playlist) => set({ playlist }),
      toggleFavorite: (song) => set((state) => {
        const isFav = state.favorites.some(s => s.id === song.id)
        if (isFav) {
          return { favorites: state.favorites.filter(s => s.id !== song.id) }
        } else {
          return { favorites: [...state.favorites, song] }
        }
      }),
      isFavorite: (songId) => get().favorites.some(s => s.id === songId),
      addToHistory: (song) => set((state) => {
        // Keep unique songs, most recent first, limit to 200
        const newHistory = [song, ...state.history.filter(s => s.id !== song.id)].slice(0, 200);
        return { history: newHistory };
      }),
      addToSearchHistory: (query) => set((state) => {
        if (!query.trim()) return {};
        const newHistory = [query, ...state.searchHistory.filter(q => q !== query)].slice(0, 20);
        return { searchHistory: newHistory };
      }),
      clearSearchHistory: () => set({ searchHistory: [] }),
      setDailySongs: (songs) => set({ 
        dailySongs: songs, 
        lastDailyDate: new Date().toISOString().split('T')[0] 
      }),
      setFmSongs: (songs) => set({ fmSongs: songs }),
      setAddictiveSongs: (songs) => set({ addictiveSongs: songs }),
      setDiscoverySongs: (songs) => set({ discoverySongs: songs }),
      setHasHydrated: (hydrated) => set({ hasHydrated: hydrated }),
    }),
    {
      name: 'player-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
      partialize: (state) => ({ 
        currentSong: state.currentSong,
        playlist: state.playlist,
        isPlaying: state.isPlaying,
        volume: state.volume, 
        mode: state.mode, 
        favorites: state.favorites,
        history: state.history,
        dailySongs: state.dailySongs,
        fmSongs: state.fmSongs,
        addictiveSongs: state.addictiveSongs,
        discoverySongs: state.discoverySongs,
        lastDailyDate: state.lastDailyDate,
        searchHistory: state.searchHistory
      })
    }
  )
)
