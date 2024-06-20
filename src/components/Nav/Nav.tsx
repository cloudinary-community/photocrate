import Link from 'next/link';

import Container from '@/components/Container';
import { Focus, Github } from 'lucide-react';

const Nav = () => {
  return (
    <nav className="flex items-center h-16 border border-zinc-200">
      <Container className="flex gap-6 items-center flex-row">
        <p className="w-40 flex-grow-0 mb-0">
          <Link href="/" className="flex gap-2 items-center font-semibold text-lg">
            <Focus className="w-4 h-4" /> PhotoCrate
          </Link>
        </p>
        <ul className="flex flex-grow justify-end gap-6 m-0">
          <li>
            <a className="flex items-center gap-3 text-sm font-semibold" href="https://github.com/cloudinary-community/photocrate">
              <Github className="w-4 h-4" /> View on GitHub
            </a>
          </li>
        </ul>
      </Container>
    </nav>
  )
}

export default Nav;