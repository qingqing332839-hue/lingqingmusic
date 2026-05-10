'use client'

import { useState, useEffect } from 'react'
import { Play, ChevronRight, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Song } from '@/lib/data'
import { usePlayerStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { getPlaylistFallback } from '@/lib/playlist-fallbacks'

interface ChartData {
  id: string
  title: string
  songs: Song[]
  loading: boolean
}

// Chart IDs configuration
const CHART_CONFIG = [
  { id: 'soaring', title: '飙升榜' },
  { id: 'netease_new', title: '新歌榜' },
  { id: 'top', title: '热歌榜' }
]

function ChartCard({ chart }: { chart: ChartData }) {
  const router = useRouter()
  const { playSong, currentSong } = usePlayerStore()

  const handlePlayAll = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (chart.songs.length > 0) {
      playSong(chart.songs[0], chart.songs)
    }
  }

  const handlePlaySong = (e: React.MouseEvent, song: Song) => {
    e.stopPropagation()
    // Play song with the rest of the chart as queue
    playSong(song, chart.songs)
  }

  return (
    <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-colors">
      {/* Header */}
      <div 
        className="flex items-center justify-between mb-6 cursor-pointer group"
        onClick={() => router.push(`/playlist/${chart.id}`)}
      >
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-white group-hover:text-neon-green transition-colors">
            {chart.title}
          </h3>
          <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-neon-green transition-colors" />
        </div>
        
        <button 
          onClick={handlePlayAll}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>播放</span>
        </button>
      </div>

      {/* Song List */}
      {chart.loading ? (
        <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-zinc-500" />
        </div>
      ) : (
        <div className="space-y-3">
          {chart.songs.slice(0, 3).map((song, index) => (
            <div 
              key={song.id}
              onClick={(e) => handlePlaySong(e, song)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer group/item transition-colors"
            >
              {/* Cover - Hidden per request */}
              {/* <div className="relative w-12 h-12 shrink-0 rounded overflow-hidden bg-zinc-800">
                <img 
                  src={song.cover} 
                  alt={song.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover/item:opacity-100 transition-opacity">
                    <Play className="w-4 h-4 text-white fill-white" />
                </div>
              </div> */}

              {/* Rank & Info */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span className={cn(
                  "text-lg font-bold w-4 text-center tabular-nums",
                  index === 0 ? "text-red-500" :
                  index === 1 ? "text-orange-500" :
                  index === 2 ? "text-yellow-500" : "text-zinc-500"
                )}>
                  {index + 1}
                </span>
                
                <div className="flex flex-col min-w-0">
                  <span className={cn(
                    "text-sm font-medium truncate transition-colors",
                    currentSong?.id === song.id ? "text-neon-green" : "text-zinc-200 group-hover/item:text-white"
                  )}>
                    {song.title}
                  </span>
                  <span className="text-xs text-zinc-500 truncate">
                    {song.artist}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {chart.songs.length === 0 && (
             <div className="text-center py-8 text-xs text-zinc-600">
                暂无数据
             </div>
          )}
        </div>
      )}
    </div>
  )
}

export function HomeCharts() {
  const [charts, setCharts] = useState<ChartData[]>([
    { id: 'soaring', title: '飙升榜', songs: [], loading: true },
    { id: 'netease_new', title: '新歌榜', songs: [], loading: true },
    { id: 'top', title: '热歌榜', songs: [], loading: true }
  ])

  useEffect(() => {
    const fetchChart = async (id: string) => {
      try {
        const res = await fetch(`/api/playlist?id=${id}`)
        if (res.ok) {
          const data = await res.json()
          const songs = data.songs || []
          return songs.length > 0 ? songs : getPlaylistFallback(id)
        }
      } catch (e) {
        console.error(`Failed to fetch chart ${id}`, e)
      }
      return getPlaylistFallback(id)
    }

    // Fetch all in parallel
    const loadCharts = async () => {
      const results = await Promise.all(
        CHART_CONFIG.map(config => fetchChart(config.id))
      )
      
      setCharts(prev => prev.map((chart, index) => ({
        ...chart,
        songs: results[index],
        loading: false
      })))
    }

    loadCharts()
  }, [])

  return (
    <div className="w-full mt-12 mb-8 px-4 md:px-0 max-w-[1400px] mx-auto">
      {/* Section Title (Optional) */}
      {/* <h2 className="text-2xl font-bold text-white mb-6 px-2">巅峰榜</h2> */}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {charts.map(chart => (
          <ChartCard key={chart.id} chart={chart} />
        ))}
      </div>
    </div>
  )
}
