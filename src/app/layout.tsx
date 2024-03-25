import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cloudinary Photos',
  description: 'Image and video library',
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
