import Container from '@/components/Container';

const Footer = () => {
  return (
    <footer className="bg-primary text-blue-100">
      <Container className="p-6">
        <p className="text-center">
          Built with <a className="underline font-medium text-inherit" href="https://cloudinary.com/">Cloudinary</a> &amp; <a className="underline font-medium text-inherit" href="https://nextjs.org/">Next.js</a> by <a className="underline font-medium text-inherit" href="https://twitter.com/colbyfayock">Colby Fayock</a>
        </p>
      </Container>
    </footer>
  );
}

export default Footer;