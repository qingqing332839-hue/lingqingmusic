'use client'

import { playlists } from '@/lib/data'
import { Play } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-background pb-32 p-8 flex flex-col items-center">
      <div className="w-full max-w-[1400px]">
        {/* Hero Title */}
        <div className="mb-12 mt-8">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-2">
            聆清音乐
          </h1>
          <p className="text-zinc-400 text-lg">捕捉乐坛潮流，引领听歌风向标🐱</p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-10 justify-items-center">
          {playlists.map((playlist, index) => (
            <motion.div
              key={playlist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer w-[200px]"
              onClick={() => router.push(`/playlist/${playlist.id}`)}
            >
              {/* Card Image - Replaced with Gradient Block */}
              <div className={`relative w-[200px] h-[200px] rounded-xl overflow-hidden mb-3 shadow-lg group-hover:shadow-neon-green/20 transition-all duration-300 bg-gradient-to-br ${playlist.gradient} flex items-center justify-center p-4`}>
                {/* Centered Title */}
                <h3 className="font-black text-white text-2xl md:text-3xl text-center leading-tight drop-shadow-md whitespace-pre-line group-hover:scale-110 transition-transform duration-300">
                  {playlist.title.replace(/榜单|歌手|歌单|热歌|民谣|金曲|古风/, (match) => `\n${match}`)}
                </h3>
                
                {/* Overlay Play Button */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-black shadow-xl transform scale-50 group-hover:scale-100 transition-all duration-300">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
