'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

interface ToastContextType {
  showToast: (message: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ message: string; id: number } | null>(null)

  const showToast = (message: string) => {
    setToast({ message, id: Date.now() })
    setTimeout(() => {
      setToast(null)
    }, 2000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-24 left-1/2 bg-zinc-800 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-50 border border-zinc-700"
          >
            <div className="w-5 h-5 rounded-full bg-zinc-500 flex items-center justify-center">
                <Check className="w-3 h-3 text-zinc-900" strokeWidth={4} />
            </div>
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
