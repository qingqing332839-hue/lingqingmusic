'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { Volume2, VolumeX, Volume1 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VolumeControlProps {
  volume: number
  onVolumeChange: (volume: number) => void
  className?: string
}

export function VolumeControl({ volume, onVolumeChange, className }: VolumeControlProps) {
  const [prevVolume, setPrevVolume] = React.useState(1)

  const handleVolumeClick = () => {
    if (volume > 0) {
      setPrevVolume(volume)
      onVolumeChange(0)
    } else {
      onVolumeChange(prevVolume)
    }
  }

  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX className="w-5 h-5" />
    if (volume < 0.5) return <Volume1 className="w-5 h-5" />
    return <Volume2 className="w-5 h-5" />
  }

  return (
    <div className={cn("flex items-center gap-2 group", className)}>
      <button 
        onClick={handleVolumeClick}
        className="text-zinc-400 hover:text-white transition-colors"
      >
        <VolumeIcon />
      </button>
      
      <div className="w-24">
        <SliderPrimitive.Root
          className="relative flex items-center select-none touch-none w-full h-5 cursor-pointer"
          value={[volume]}
          max={1}
          step={0.01}
          onValueChange={(vals) => onVolumeChange(vals[0])}
        >
          <SliderPrimitive.Track className="relative h-[2px] w-full grow overflow-hidden rounded-full bg-zinc-800 group-hover:bg-zinc-700 transition-colors">
            <SliderPrimitive.Range className="absolute h-full bg-white group-hover:bg-neon-green transition-colors" />
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb 
            className="block h-3 w-3 rounded-full border-2 border-white bg-white ring-offset-background transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 opacity-0 group-hover:opacity-100 hover:scale-110" 
          />
        </SliderPrimitive.Root>
      </div>
    </div>
  )
}
