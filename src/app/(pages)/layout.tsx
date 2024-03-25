import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full grid grid-rows-[1fr_auto_1fr]">
      <Nav />
      { children }
      <Footer />
    </div>
  )
}
