import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Social Mirror - See How People May Perceive You Online',
  description: 'Analyze your social posts, emails, and bios with AI-powered sentiment analysis, intent detection, and tone analysis to understand how others might interpret your content.',
  keywords: 'AI, sentiment analysis, tone analysis, social media, email, dating profile, job application',
  authors: [{ name: 'AI Social Mirror Team' }],
  openGraph: {
    title: 'AI Social Mirror - See How People May Perceive You Online',
    description: 'Analyze your social posts, emails, and bios with AI-powered sentiment analysis, intent detection, and tone analysis.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Social Mirror - See How People May Perceive You Online',
    description: 'Analyze your social posts, emails, and bios with AI-powered sentiment analysis, intent detection, and tone analysis.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  )
} 