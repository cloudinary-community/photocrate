import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getCldOgImageUrl } from 'next-cloudinary';
import { Analytics } from '@vercel/analytics/react';

import Providers from '@/app/providers';

import { getConfig } from '@/lib/config';

const inter = Inter({ subsets: ['latin'] })
const { title } = getConfig();

export const metadata: Metadata = {
  title,
  // description: 'Learn more at ',
  openGraph: {
    images: [
      {
        width: 1200,
        height: 627,
        url: getCldOgImageUrl({
          src: 'https://res.cloudinary.com/photocrate/image/upload/v1718902268/assets/photocrate-social-og_ta1w3j.png'
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
        <Analytics />
      </body>
    </html>
  )
}
