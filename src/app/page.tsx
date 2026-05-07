import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TrustedBy from '@/components/TrustedBy'
import Services from '@/components/Services'
import HowWeWork from '@/components/HowWeWork'
import Portfolio from '@/components/Portfolio'
import Results from '@/components/Results'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
    return (
        <main>
            <Navbar />
            <Hero />
            <TrustedBy />
            <Services />
            <HowWeWork />
            <Portfolio />
            <Results />
            <Testimonials />
            <Pricing />
            <FAQ />
            <Contact />
            <Footer />
        </main>
    )
}