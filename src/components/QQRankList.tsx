'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Song } from '@/lib/data';
import { Loader2 } from 'lucide-react';
import { getPlaylistFallback } from '@/lib/playlist-fallbacks';

interface RankChart {
  id: string;
  title: string;
  subtitle: string;
  bgGradient: string;
}

const RANK_CHARTS: RankChart[] = [
  { 
    id: 'ndtop', 
    title: '内地榜', 
    subtitle: '巅峰榜', 
    bgGradient: 'from-[#FF5D8C] to-[#FF4B7D]' 
  },
  { 
    id: 'ustop', 
    title: '欧美榜', 
    subtitle: '巅峰榜', 
    bgGradient: 'from-[#4CD6C4] to-[#3BBCAF]' 
  },
  { 
    id: 'ancient_sad', 
    title: '小语种', 
    subtitle: '巅峰榜', 
    bgGradient: 'from-[#55C3E8] to-[#3BA8CF]' 
  },
  { 
    id: 'korean', 
    title: '韩国榜', 
    subtitle: '巅峰榜', 
    bgGradient: 'from-[#56C6CA] to-[#43A6AA]' 
  },
  { 
    id: 'japanese', 
    title: '日本榜', 
    subtitle: '巅峰榜', 
    bgGradient: 'from-[#FF7AA3] to-[#FF4B7D]' 
  }
];

export default function QQRankList() {
  const router = useRouter();
  const [chartData, setChartData] = useState<Record<string, Song[]>>({});
  const [loading, setLoading] = useState(true);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let isSubscribed = true;

    const fetchCharts = async () => {
      try {
        const promises = RANK_CHARTS.map(async (chart) => {
          try {
            const res = await fetch(`/api/playlist?id=${chart.id}`);
            if (!res.ok) return { id: chart.id, songs: getPlaylistFallback(chart.id) };
            const data = await res.json();
            const songs = (data && Array.isArray(data.songs)) ? data.songs : [];
            return { id: chart.id, songs: songs.length > 0 ? songs : getPlaylistFallback(chart.id) };
          } catch (err) {
            console.error(`Failed to fetch ${chart.id}`, err);
            return { id: chart.id, songs: getPlaylistFallback(chart.id) };
          }
        });

        const results = await Promise.all(promises);
        
        if (isSubscribed) {
          const newData: Record<string, Song[]> = {};
          results.forEach(res => {
            newData[res.id] = res.songs.slice(0, 3);
          });
          setChartData(newData);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching rank charts:', error);
        if (isSubscribed) {
            setLoading(false);
        }
      }
    };

    fetchCharts();

    return () => { isSubscribed = false; };
  }, []);

  const handleCardClick = (id: string, title: string) => {
    router.push(`/playlist/${id}?title=${encodeURIComponent(title)}&is_migu=true`);
  };

  // Prevent hydration mismatch and ensure client-side only rendering
  if (!mounted) return null;

  return (
    <div className="w-full px-4 md:px-8">
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {RANK_CHARTS.map((chart) => {
            const songs = chartData[chart.id] || [];
            
            return (
              <div 
                key={chart.id}
                onClick={() => handleCardClick(chart.id, chart.title)}
                className={`
                  relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]
                  bg-gradient-to-b ${chart.bgGradient}
                  h-[360px] flex flex-col items-center pt-10 px-6
                `}
              >
                {/* Header */}
                <div className="text-center mb-8 relative z-10">
                  <div className="text-white/90 text-xl font-medium tracking-widest mb-1">{chart.subtitle}</div>
                  <div className="text-white text-3xl font-bold tracking-wider">{chart.title}</div>
                  <div className="w-8 h-[2px] bg-white/60 mx-auto mt-4"></div>
                </div>

                {/* Song List */}
                <div className="w-full flex flex-col gap-5 relative z-10">
                  {songs.map((song, index) => (
                    <div key={song.id || index} className="flex flex-col w-full text-center group">
                      <div className="text-white font-medium text-sm truncate w-full px-2 group-hover:text-white/90">
                         {index + 1} {song.title}
                      </div>
                      <div className="text-white/70 text-xs truncate w-full px-2 mt-1 group-hover:text-white/80">
                        {song.artist}
                      </div>
                    </div>
                  ))}
                  {songs.length === 0 && (
                    <div className="text-white/50 text-sm text-center">
                      暂无数据
                    </div>
                  )}
                </div>
                
                {/* Background Pattern Effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/10 pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
