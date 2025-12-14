"use client";

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const mainRef = useRef(null);
  const [translateX, setTranslateX] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const scrollTimeoutRef = useRef(null);
  const totalSections = 5;

  useEffect(() => {
    let isTransitioning = false;
    
    const handleWheel = (e) => {
      e.preventDefault();
      
      // If already transitioning, ignore all scroll events
      if (isTransitioning) return;
      
      // Calculate new section based on scroll direction
      const delta = e.deltaY;
      
      if (Math.abs(delta) > 5) { // Lower threshold but strict control
        isTransitioning = true;
        
        if (delta > 0 && currentSection < totalSections - 1) {
          // Scroll down - go to next section
          setCurrentSection(prev => prev + 1);
        } else if (delta < 0 && currentSection > 0) {
          // Scroll up - go to previous section
          setCurrentSection(prev => prev - 1);
        } else {
          // If at boundary, release lock immediately
          isTransitioning = false;
          return;
        }
        
        // Wait for full transition to complete before allowing next scroll
        setTimeout(() => { 
          isTransitioning = false; 
        }, 1300);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' && currentSection < totalSections - 1) {
        e.preventDefault();
        setCurrentSection(prev => prev + 1);
      } else if (e.key === 'ArrowUp' && currentSection > 0) {
        e.preventDefault();
        setCurrentSection(prev => prev - 1);
      }
    };

    const setScrollHeight = () => {
      if (!mainRef.current) return;
      document.body.style.height = '100vh';
      document.body.style.overflow = 'hidden';
    };

    setScrollHeight();
    
    // Add wheel event listener with passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', setScrollHeight);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', setScrollHeight);
      document.body.style.height = '';
      document.body.style.overflow = '';
    };
  }, [currentSection]);

  // Update translateX when section changes
  useEffect(() => {
    const targetScroll = currentSection * window.innerWidth;
    setTranslateX(-targetScroll);
  }, [currentSection]);

  return (
    <main 
      ref={mainRef}
      className="fixed top-0 left-0 min-h-screen flex flex-col lg:flex-row w-full lg:w-fit h-auto lg:h-full"
      style={{
        transform: `translateX(${translateX}px)`,
        transition: 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
    >
      {/* Hero Section - Black Background */}
      <section className="w-full h-auto min-h-screen lg:w-screen lg:h-screen flex-shrink-0 bg-black text-white overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Hero Section</h1>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
            Scroll to explore
          </p>
        </div>
      </section>

      {/* About Section - White Background */}
      <section
        id="about"
        className="w-full h-auto min-h-screen lg:w-screen lg:h-screen flex-shrink-0 bg-white text-black relative overflow-hidden flex items-center justify-center"
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>
        <div className="relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-4">About</h2>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
            About Section
          </p>
        </div>
      </section>

      {/* Tech Stack Section - Dark Gray Background */}
      <section
        id="tech"
        className="w-full h-auto min-h-screen lg:w-screen lg:h-screen flex-shrink-0 bg-neutral-950 text-white relative flex items-center justify-center"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
        <div className="relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-4">Tech Stack</h2>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
            Tech Stack Section
          </p>
        </div>
      </section>

      {/* Projects Section - Black Background */}
      <section
        id="projects"
        className="w-full h-auto min-h-screen lg:w-screen lg:h-screen flex-shrink-0 bg-black text-white relative flex items-center justify-center"
      >
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-4">Projects</h2>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
            Projects Section
          </p>
        </div>
      </section>

      {/* Contact Section - White Background */}
      <section
        id="contact"
        className="w-full h-auto min-h-screen lg:w-screen lg:h-screen flex-shrink-0 bg-white text-black relative flex items-center justify-center"
      >
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        ></div>
        <div className="relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-4">Contact</h2>
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
            Contact Section
          </p>
        </div>
      </section>

      {/* Section Indicators */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {[...Array(totalSections)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSection(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentSection 
                ? 'bg-white scale-150' 
                : 'bg-gray-500 hover:bg-gray-300'
            }`}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </div>
    </main>
  );
}