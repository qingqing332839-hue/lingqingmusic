import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Player } from '@/components/ui/Player'
import { ToastProvider } from '@/components/ui/Toast'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={`${inter.className} bg-background text-white`}>
        <ToastProvider>
          {children}
          <Player />
        </ToastProvider>
      </body>
    </html>
  )
}
