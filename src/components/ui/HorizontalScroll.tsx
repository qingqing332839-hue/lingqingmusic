'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Play } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Playlist } from '@/lib/data'

interface HorizontalScrollProps {
  title: string
  items: Playlist[]
}

export function HorizontalScroll({ title, items }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  
  return (
    <div className="py-8 w-full overflow-hidden">
      <div className="flex items-center justify-between px-6 mb-4">
        <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          {title}
          <ChevronRight className="w-6 h-6 text-neon-green opacity-50" />
        </h2>
      </div>

      <div 
        className="flex gap-6 overflow-x-auto px-6 pb-8 no-scrollbar snap-x snap-mandatory"
        ref={containerRef}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="flex-none w-[200px] snap-start group cursor-pointer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push(`/playlist/${item.id}`)}
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-zinc-800 mb-3 relative shadow-lg group-hover:shadow-neon-green/20 transition-all">
              <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
              
              {/* Overlay Play Button */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-neon-green rounded-full flex items-center justify-center text-black">
                  <Play className="w-6 h-6 fill-current ml-1" />
                </div>
              </div>
            </div>
            <h3 className="font-bold text-white truncate">{item.title}</h3>
            <p className="text-sm text-zinc-400 truncate">{item.songs.length} songs</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
