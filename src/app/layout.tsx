import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getCldOgImageUrl } from 'next-cloudinary';

import Providers from '@/app/providers';

import { getConfig } from '@/lib/config';

const inter = Inter({ subsets: ['latin'] })
const { title } = getConfig();

export const metadata: Metadata = {
  title,
  description: 'Learn more at photobox.dev!',
  openGraph: {
    images: [
      {
        width: 1200,
        height: 627,
        url: getCldOgImageUrl({
          src: 'https://res.cloudinary.com/photoboxdev/image/upload/v1711559782/assets/photobox-social-og_mppn8w.png'
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
      <body className={inter.className}>
        <Providers>{ children }</Providers>
      </body>
    </html>
  )
}
