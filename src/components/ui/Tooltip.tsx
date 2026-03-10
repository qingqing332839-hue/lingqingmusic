import React from 'react'
import { cn } from '@/lib/utils'

interface TooltipProps {
  content: string
  children: React.ReactNode
  className?: string
  side?: 'top' | 'bottom' | 'left' | 'right'
}

export function Tooltip({ content, children, className, side = 'top' }: TooltipProps) {
  return (
    <div className={cn("relative flex items-center justify-center group/tooltip", className)}>
      {children}
      <div 
        className={cn(
          "absolute pointer-events-none px-2 py-1 bg-zinc-800 text-zinc-200 text-xs rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-75 whitespace-nowrap z-50 shadow-lg border border-zinc-700/50",
          side === 'top' && "bottom-full mb-2",
          side === 'bottom' && "top-full mt-2",
          side === 'left' && "right-full mr-2",
          side === 'right' && "left-full ml-2"
        )}
      >
        {content}
      </div>
    </div>
  )
}
