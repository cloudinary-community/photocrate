import { cn } from '@/lib/utils';

import Container from '@/components/Container';

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn('bg-zinc-900 text-zinc-400', className)}>
      <Container className="p-6">
        <p className="text-center">
          &copy; { new Date().getFullYear() } <a className="underline font-medium text-inherit" href="https://twitter.com/colbyfayock">Colby Fayock</a>
        </p>
      </Container>
    </footer>
  );
}

export default Footer;