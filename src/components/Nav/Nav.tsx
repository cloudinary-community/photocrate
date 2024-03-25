import Link from 'next/link';
import { Upload } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import { getConfig } from '@/lib/config';

import Container from '@/components/Container';
import UploadButton from '@/components/UploadButton';

const Nav = () => {
  const { title, logo } = getConfig();
  return (
    <nav className="flex items-center h-16 border border-zinc-200">
      <Container className="flex gap-6 items-center flex-row">
        <p className="w-40 flex-grow-0 mb-0">
          <Link href="/" className="flex gap-2 items-center font-semibold text-lg">
            { logo } { title }
          </Link>
        </p>
        <ul className="flex flex-grow justify-end gap-6 m-0">
          <li>
            {process.env.NEXT_PUBLIC_PHOTOBOX_MODE !== 'read-only' && (
              <UploadButton />
            )}
            {process.env.NEXT_PUBLIC_PHOTOBOX_MODE === 'read-only' && (
              <TooltipProvider delayDuration={200}>
                <Tooltip>
                  <TooltipTrigger className="flex items-center text-zinc-400" aria-label="Uploading is disabled">
                    <Upload className="mr-2 h-4 w-4" /> Upload
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Uploading is Disabled</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </li>
        </ul>
      </Container>
    </nav>
  )
}

export default Nav;