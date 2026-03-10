'use client'

import { playlists } from '@/lib/data'
import { Play } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { SearchBar } from '@/components/ui/SearchBar'

const shadowColors: Record<string, string> = {
  top: 'group-hover:shadow-purple-500/40',
  ustop: 'group-hover:shadow-blue-500/40',
  ndtop: 'group-hover:shadow-indigo-600/40',
  douyin: 'group-hover:shadow-rose-500/40',
  korean: 'group-hover:shadow-pink-500/40',
  ktv: 'group-hover:shadow-purple-600/40',
  japanese: 'group-hover:shadow-red-500/40',
  folk: 'group-hover:shadow-lime-600/40',
  soaring: 'group-hover:shadow-cyan-500/40',
  new: 'group-hover:shadow-emerald-500/40',
  ost: 'group-hover:shadow-slate-700/40',
  ancient_sad: 'group-hover:shadow-cyan-700/40',
}

export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-background pb-32 p-8 flex flex-col items-center">
      <div className="w-full max-w-[1400px]">
        {/* Hero Title */}
        <div className="mb-8 mt-8 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">
            聆清音乐
          </h1>
          <p className="text-zinc-400 text-lg mb-8">捕捉乐坛潮流，引领听歌风向标🐱</p>
          
          <SearchBar />
        </div>

        {/* Grid Layout - Changed to Horizontal Scroll 2 Rows */}
        <div className="grid grid-rows-2 grid-flow-col gap-4 overflow-x-auto pb-4 snap-x snap-mandatory justify-start no-scrollbar">
          {playlists.map((playlist, index) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer w-[160px] md:w-[200px] snap-start"
              onClick={() => router.push(`/playlist/${playlist.id}`)}
            >
              {/* Card Image - Replaced with Gradient Block */}
              <div className={`relative w-full aspect-square rounded-xl overflow-hidden mb-2 shadow-lg ${shadowColors[playlist.id] || 'group-hover:shadow-white/20'} transition-all duration-300 bg-gradient-to-br ${playlist.gradient} flex items-center justify-center p-4`}>
                {/* Centered Title */}
                <h3 className="font-black text-white text-xl md:text-2xl text-center leading-tight drop-shadow-md whitespace-pre-line group-hover:scale-110 transition-transform duration-300">
                  {playlist.title.replace(/榜单|歌手|歌单|热歌|民谣|金曲|古风|唛榜|排行/, (match) => `\n${match}`)}
                </h3>
                
                {/* Overlay Play Button */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button 
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:scale-105 transition-transform"
                  >
                    <Play className="w-5 h-5 md:w-6 md:h-6 fill-white ml-1 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
