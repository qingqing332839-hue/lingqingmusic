'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export const PlayingIndicator = ({ className }: { className?: string }) => (
  <div className={cn("flex gap-[2px] items-end h-3 justify-center", className)}>
    <motion.div
      animate={{ height: [4, 12, 6, 12] }}
      transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
      className="w-[3px] bg-neon-green rounded-[1px]"
    />
    <motion.div
      animate={{ height: [12, 6, 12, 5] }}
      transition={{ duration: 0.5, repeat: Infinity, ease: "linear", delay: 0.1 }}
      className="w-[3px] bg-neon-green rounded-[1px]"
    />
    <motion.div
      animate={{ height: [6, 10, 5, 10] }}
      transition={{ duration: 0.5, repeat: Infinity, ease: "linear", delay: 0.2 }}
      className="w-[3px] bg-neon-green rounded-[1px]"
    />
  </div>
)
