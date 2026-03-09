import { create } from 'zustand'

interface Song {
  id: string
  title: string
  artist: string
  cover: string
  src: string
  duration?: string
}

interface PlayerStore {
  currentSong: Song | null
  playlist: Song[] // Current playlist queue
  isPlaying: boolean
  playSong: (song: Song, queue?: Song[]) => void
  togglePlay: () => void
  setIsPlaying: (isPlaying: boolean) => void
  playNext: () => void
  playPrev: () => void
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  playlist: [],
  isPlaying: false,
  playSong: (song, queue) => set({ 
    currentSong: { ...song }, 
    playlist: queue || [song], // If queue provided, use it; otherwise just this song
    isPlaying: true 
  }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  playNext: () => {
    const { playlist, currentSong } = get()
    if (!currentSong || playlist.length === 0) return
    
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id)
    const nextIndex = (currentIndex + 1) % playlist.length
    set({ currentSong: { ...playlist[nextIndex] }, isPlaying: true })
  },
  playPrev: () => {
    const { playlist, currentSong } = get()
    if (!currentSong || playlist.length === 0) return
    
    const currentIndex = playlist.findIndex(s => s.id === currentSong.id)
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length
    set({ currentSong: { ...playlist[prevIndex] }, isPlaying: true })
  }
}))
