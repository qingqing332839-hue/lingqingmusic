import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Player } from '@/components/ui/Player'
import { ToastProvider } from '@/components/ui/Toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Neon Music',
  description: 'A futuristic music experience',
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
