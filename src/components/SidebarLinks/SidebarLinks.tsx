'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface SidebarLink {
  icon?: ReactNode;
  label: string;
  path: string;
}

interface SidebarLinksProps {
  className?: string;
  links: Array<SidebarLink>;
}

export default function SidebarLinks({ className, links }: SidebarLinksProps) {
  const activePath = usePathname();
  return (
    <ul className={cn('', className)}>
      {links.map(({ label, path, icon }) => {
        const isActive = path === activePath;
        return (
          <li key={`${label}-${path}`} className="mb-2">
            <Link
              className={cn(
                'flex w-full items-center gap-3 px-8 py-2 md:rounded-r-lg',
                isActive && 'text-white bg-blue-500'
              )} href={path}
            >
              { icon } { label }
            </Link>
          </li>
        )
      })}
    </ul>
  )
}