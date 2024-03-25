import Footer from '@/components/Footer';

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full grid grid-rows-[1fr_auto]">
      { children }
      <Footer />
    </div>
  )
}
