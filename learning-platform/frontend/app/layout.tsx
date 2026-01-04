import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Learning Platform - Progressive Project-Based Learning',
  description: 'Learn software development through hands-on projects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}

