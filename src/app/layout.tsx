import type { Metadata } from 'next'
import './globals.css'
import { Player } from '@/components/ui/Player'
import { ToastProvider } from '@/components/ui/Toast'

export const metadata: Metadata = {
  title: '聆清音乐',
  description: '好的声音，期待你的聆听',
  referrer: 'no-referrer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-white">
        <ToastProvider>
          {children}
          <Player />
        </ToastProvider>
      </body>
    </html>
  )
}
