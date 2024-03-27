import './globals.css';
import type { Metadata } from 'next';
import { getCldOgImageUrl } from 'next-cloudinary';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Photobox',
  description: 'Open Source image library and interactive editor built with Next.js',
  openGraph: {
    images: [
      {
        width: 1200,
        height: 627,
        url: getCldOgImageUrl({
          src: 'assets/photobox-social-og_mppn8w'
        })
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen`}>
        { children }
      </body>
    </html>
  )
}
