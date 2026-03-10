'use client'

import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  currentTime: number
  duration: number
  onSeek: (time: number) => void
  onSeekStart?: () => void
  onSeekEnd?: () => void
  className?: string
}

export function ProgressBar({
  currentTime,
  duration,
  onSeek,
  onSeekStart,
  onSeekEnd,
  className,
}: ProgressBarProps) {
  const [value, setValue] = React.useState([0])
  const [isDragging, setIsDragging] = React.useState(false)
  const [hoverTime, setHoverTime] = React.useState<number | null>(null)
  const [hoverPosition, setHoverPosition] = React.useState(0)
  const progressBarRef = React.useRef<HTMLDivElement>(null)

  // Sync with external time only when not dragging
  React.useEffect(() => {
    if (!isDragging) {
      setValue([currentTime])
    }
  }, [currentTime, isDragging])

  const handleValueChange = (newValue: number[]) => {
    setIsDragging(true)
    setValue(newValue)
    onSeekStart?.()
    // Optimistic update
    onSeek(newValue[0])
  }

  const handleValueCommit = (newValue: number[]) => {
    setIsDragging(false)
    setValue(newValue)
    onSeekEnd?.()
    onSeek(newValue[0])
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return
    const rect = progressBarRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = Math.min(Math.max(x / rect.width, 0), 1)
    setHoverTime(percentage * duration)
    setHoverPosition(percentage * 100)
  }

  const handleMouseLeave = () => {
    setHoverTime(null)
  }

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div 
      className={cn("group relative flex items-center select-none touch-none w-full h-4 -mt-2 cursor-pointer", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={progressBarRef}
    >
      {/* Time Tooltip */}
      {hoverTime !== null && (
        <div 
          className="absolute -top-8 bg-zinc-900 text-white text-[10px] px-2 py-1 rounded border border-zinc-800 tabular-nums transform -translate-x-1/2 pointer-events-none z-50 whitespace-nowrap"
          style={{ left: `${hoverPosition}%` }}
        >
          {formatTime(hoverTime)} / {formatTime(duration)}
        </div>
      )}

      <SliderPrimitive.Root
        className="relative flex items-center select-none touch-none w-full h-full"
        value={value}
        max={duration || 100}
        step={0.1}
        onValueChange={handleValueChange}
        onValueCommit={handleValueCommit}
      >
        <SliderPrimitive.Track className="relative h-[2px] w-full grow overflow-hidden rounded-full bg-zinc-800/50 group-hover:bg-zinc-800 transition-colors">
          <SliderPrimitive.Range className="absolute h-full bg-zinc-600 group-hover:bg-neon-green transition-colors" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb 
          className="block h-0 w-0 rounded-full border-0 bg-transparent ring-offset-background transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50" 
        />
      </SliderPrimitive.Root>
    </div>
  )
}
