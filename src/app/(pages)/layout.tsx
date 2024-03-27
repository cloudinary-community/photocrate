import '@/app/globals.css';
import { Image, Sparkles, Star, Trash } from 'lucide-react'

import Nav from '@/components/Nav';
import SidebarLinks from '@/components/SidebarLinks';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-rows-[auto_1fr] h-screen">
      <Nav />
      <div className="grid grid-rows-[auto_1fr] md:grid-rows-none md:grid-cols-[12rem_auto]">
        <aside className="flex flex-col justify-between md:py-6">
          <SidebarLinks
            links={[
              {
                icon: <Image className="w-5 h-5" />,
                label: 'Photos',
                path: '/'
              },
              {
                icon: <Sparkles className="w-5 h-5" />,
                label: 'Creations',
                path: '/creations'
              },
              {
                icon: <Star className="w-5 h-5" />,
                label: 'Favorites',
                path: '/favorites'
              },
              {
                icon: <Trash className="w-5 h-5" />,
                label: 'Trash',
                path: '/trash'
              },
            ]}
          />
        </aside>
        <main>{ children }</main>
      </div>
    </div>
  )
}
