'use client'

import { Play } from 'lucide-react'

interface Song {
  id: string
  title: string
  artist: string
  duration: string
}

export function SongList({ songs }: { songs: Song[] }) {
  return (
    <div className="flex flex-col w-full">
      {songs.map((song, index) => (
        <div 
          key={song.id}
          className="group flex items-center py-3 px-4 hover:bg-white/5 rounded-md transition-colors cursor-pointer"
        >
          <span className="w-8 text-zinc-500 text-sm group-hover:hidden">{index + 1}</span>
          <span className="w-8 hidden group-hover:flex text-neon-green">
            <Play className="w-4 h-4 fill-current" />
          </span>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-white font-medium truncate group-hover:text-neon-green transition-colors">{song.title}</h4>
            <p className="text-zinc-500 text-sm truncate">{song.artist}</p>
          </div>
          
          <span className="text-zinc-500 text-sm tabular-nums">{song.duration}</span>
        </div>
      ))}
    </div>
  )
}
