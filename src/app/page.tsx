import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Menu from '@/components/Menu'
import Story from '@/components/Story'
import Gallery from '@/components/Gallery'
import Quote from '@/components/Quote'
import Reservation from '@/components/Reservation'
import Locations from '@/components/Locations'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Menu />
      <Story />
      <Gallery />
      <Quote />
      <Reservation />
      <Locations />
      <Footer />
    </main>
  )
}
