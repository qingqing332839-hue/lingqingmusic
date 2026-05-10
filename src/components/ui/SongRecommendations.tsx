'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Headphones } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface Playlist {
  id: number;
  title: string;
  playCount: string;
  cover: string;
}

interface SongRecommendationsProps {
  title?: string;
  section?: 'default' | 'mixed' | 'scene';
}

function CoverImage({ src, alt, className }: { src: string, alt: string, className?: string }) {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <div className={cn("bg-zinc-800 rounded-lg overflow-hidden shrink-0 relative w-full h-full", className)}>
            {src ? (
                <img 
                    src={src} 
                    alt={alt} 
                    className={cn(
                        "w-full h-full object-cover transition-opacity duration-500", 
                        isLoaded ? "opacity-100" : "opacity-0"
                    )}
                    onLoad={() => setIsLoaded(true)}
                    onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop";
                    }}
                />
            ) : (
                <div className="w-full h-full bg-zinc-800 animate-pulse" />
            )}
        </div>
    );
}

export function SongRecommendations({ title = "「她」宇宙 · 听见她声", section = "default" }: SongRecommendationsProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/migu-recommendations?type=${section}`);
        const data = await res.json();
        setPlaylists(data);
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [section]);

  const handlePlaylistClick = (playlist: Playlist) => {
    // Navigate to playlist page with query params for metadata
    // Split title and subtitle if possible for cleaner passing
    let mainTitle = playlist.title;
    let subtitle = "";
    
    if (playlist.title.includes(' · ')) {
        const parts = playlist.title.split(' · ');
        mainTitle = parts[0];
        subtitle = parts[1];
    }

    const params = new URLSearchParams({
      title: mainTitle,
      cover: playlist.cover,
      is_migu: 'true'
    });
    
    if (subtitle) {
        params.append('subtitle', subtitle);
    }
    
    router.push(`/playlist/${playlist.id}?${params.toString()}`);
  };

  return (
    <div className="w-full mb-12 -mt-2">
      <div className="w-full px-4 md:px-8 mb-6">
        <h2 className="text-xl font-bold text-white">
          {title.startsWith('「') ? title : <>&nbsp;&nbsp;{title.trim()}</>}
        </h2>
      </div>

      <div className="relative">
        {isLoading ? (
          <div className="flex justify-center items-center h-[250px]">
            <div className="w-8 h-8 border-2 border-neon-green border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6 w-full px-4">
            {playlists.map((playlist, index) => (
              <motion.div
                key={playlist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer flex flex-col items-center"
                onClick={() => handlePlaylistClick(playlist)}
              >
                {/* 统一图片容器样式：200x200，圆角，阴影，悬停效果 */}
                <div className="relative w-[200px] h-[200px] rounded-lg overflow-hidden mb-2 shadow-lg group-hover:shadow-white/20 transition-all duration-300 bg-zinc-800">
                  {/* 图片缩放效果 */}
                  <div className="w-full h-full group-hover:scale-110 transition-transform duration-500">
                    <CoverImage src={playlist.cover} alt={playlist.title} className="" />
                  </div>
                  
                  {/* 播放量 - 保留在左下角 */}
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 text-white/90 bg-black/20 backdrop-blur-[2px] px-2 py-0.5 rounded-full z-10">
                    <Headphones className="w-3 h-3" />
                    <span className="text-xs font-medium">{playlist.playCount}</span>
                  </div>

                  {/* 播放按钮遮罩 - 与 page.tsx 一致 */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 z-20">
                    <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:scale-105 transition-transform">
                      <Play className="w-6 h-6 fill-white ml-1 text-white" />
                    </button>
                  </div>
                </div>
                
                {/* 标题 */}
                <h4 className="text-sm text-zinc-200 font-medium leading-tight line-clamp-2 w-[200px] group-hover:text-white transition-colors">
                  {playlist.title}
                </h4>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
