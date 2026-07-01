import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import ScrollTop from '@/components/ScrollTop'

export default function Home() {
  return (
    <>
      <ScrollProgress />

      {/* Grid background */}
      <div className="fixed inset-0 bg-grid pointer-events-none z-0 opacity-60" />

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96"
          style={{ background: 'radial-gradient(circle,rgba(0,255,136,0.04) 0%,transparent 70%)' }} />
        <div className="absolute bottom-1/3 left-0 w-80 h-80"
          style={{ background: 'radial-gradient(circle,rgba(0,196,255,0.03) 0%,transparent 70%)' }} />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>

      <ScrollTop />
    </>
  )
}
