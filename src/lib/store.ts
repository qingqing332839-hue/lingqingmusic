import { create } from 'zustand'

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
  isPlaying: boolean
  volume: number
  mode: PlaybackMode
  playSong: (song: Song, queue?: Song[]) => Promise<void>
  togglePlay: () => void
  setIsPlaying: (isPlaying: boolean) => void
  setVolume: (volume: number) => void
  setMode: (mode: PlaybackMode) => void
  playNext: () => void
  playPrev: () => void
  addToQueue: (song: Song) => void
  addToPlaylist: (song: Song) => void
  removeFromPlaylist: (songId: string) => void
  setPlaylist: (playlist: Song[]) => void
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  playlist: [],
  isPlaying: false,
  volume: 1, // Default volume 100%
  mode: 'sequence',
  playSong: async (song, queue) => {
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

                            return {
                                currentSong: updatedSong,
                                playlist: updatedPlaylist
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
    const { playlist, currentSong, mode } = get()
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
        set({ currentSong: { ...playlist[nextIndex] }, isPlaying: true })
        return
    }

    // Sequence Mode
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id)
    if (currentIndex === -1) {
        if (playlist.length > 0) set({ currentSong: { ...playlist[0] }, isPlaying: true })
        return
    }
    const nextIndex = (currentIndex + 1) % playlist.length
    set({ currentSong: { ...playlist[nextIndex] }, isPlaying: true })
  },
  playPrev: () => {
    const { playlist, currentSong, mode } = get()
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
        set({ currentSong: { ...playlist[prevIndex] }, isPlaying: true })
        return
    }
    
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id)
    if (currentIndex === -1) return

    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length
    set({ currentSong: { ...playlist[prevIndex] }, isPlaying: true })
  },
  setPlaylist: (playlist) => set({ playlist })
}))
