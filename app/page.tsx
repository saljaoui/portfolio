import Hero from '@/components/sections/Hero.jsx'
import About from '@/components/sections/About.jsx'
import Skills from '@/components/sections/Skills.jsx'
import Projects from '@/components/sections/Projects.jsx'
import Contact from '@/components/sections/Contact.jsx'
import MouseFollower from '@/components/ui/MouseFollower.jsx'

export default function Home() {
  return (
    <main className="scroll-wrapper">
      <MouseFollower />
      <div className="scroll-container">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </main>
  )
}