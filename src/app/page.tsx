import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Menu from '@/components/Menu'
import Story from '@/components/Story'
import Quote from '@/components/Quote'
import Reservation from '@/components/Reservation'
import Footer from '@/components/Footer'
import SectionOpener from '@/components/SectionOpener'

export default function Home() {
  return (
    <main className="overflow-x-hidden w-full">
      <Header />
      <Hero />

      <SectionOpener
        number="I"
        name="The Menu"
        bn="মেনু"
        urdu="مینیو"
        tagline="From the Karahi · Wari"
      />
      <Menu />

      <SectionOpener
        number="II"
        name="The Story"
        bn="গল্প"
        urdu="قصہ"
        tagline="Rankin Street · Since 2020"
      />
      <Story />

      <Quote />

      <SectionOpener
        number="III"
        name="Reserve"
        bn="বুকিং"
        urdu="بکنگ"
        tagline="A table awaits"
      />
      <Reservation />

      <Footer />
    </main>
  )
}
