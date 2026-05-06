import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Menu from '@/components/Menu'
import Story from '@/components/Story'
import Gallery from '@/components/Gallery'
import Quote from '@/components/Quote'
import Reservation from '@/components/Reservation'
import Locations from '@/components/Locations'
import Footer from '@/components/Footer'

const Seam = () => (
  <div className="max-w-container mx-auto px-6 md:px-12">
    <div className="section-seam" />
  </div>
)

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Menu />
      <Seam />
      <Story />
      <Seam />
      <Gallery />
      <Quote />
      <Seam />
      <Reservation />
      <Seam />
      <Locations />
      <Footer />
    </main>
  )
}
