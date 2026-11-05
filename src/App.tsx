import { MotionConfig } from 'framer-motion'
import Header from './sections/Header'
import Hero from './sections/Hero'
import { Departures, Destinations, Services } from './sections/Offer'
import RequestFunnel from './sections/RequestFunnel'
import { Contacts, FAQ, FinalCTA, FloatingWhatsApp, Footer, WhyUs } from './sections/Closing'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        <Hero />
        <Departures />
        <Destinations />
        <Services />
        <RequestFunnel />
        <WhyUs />
        <Contacts />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </MotionConfig>
  )
}
