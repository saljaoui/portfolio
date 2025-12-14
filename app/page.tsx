'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const throttleRef = useRef(false);

  const sections = ['Hero', 'About', 'Projects'];
  const colors = ['bg-slate-900', 'bg-emerald-700', 'bg-rose-700'];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();

      // Throttle to prevent multiple triggers
      if (throttleRef.current) return;
      
      throttleRef.current = true;
      
      setTimeout(() => {
        throttleRef.current = false;
      }, 1000); // 1 second delay between scrolls

      const delta = event.deltaY;
      let newSection = currentSection;

      // Determine next section
      if (delta > 0 && currentSection < sections.length - 1) {
        newSection = currentSection + 1;
      } else if (delta < 0 && currentSection > 0) {
        newSection = currentSection - 1;
      }

      // Scroll to new section
      if (newSection !== currentSection) {
        setCurrentSection(newSection);
        container.scrollTo({
          left: newSection * window.innerWidth,
          behavior: 'smooth'
        });
      }
    };

    // Add event listener to container instead of window
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      container.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = '';
    };
  }, [currentSection, sections.length]);

  const goToSection = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    
    setCurrentSection(index);
    container.scrollTo({
      left: index * window.innerWidth,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <div
        ref={containerRef}
        className="flex h-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory"
        style={{ 
          scrollBehavior: 'smooth',
          width: '100vw',
          overflow: 'hidden'
        }}
      >
        {sections.map((section, index) => (
          <section
            key={section}
            className={`flex h-screen w-screen flex-shrink-0 snap-start items-center justify-center ${colors[index]} text-5xl font-bold text-white flex-col gap-4`}
          >
            <div>{section}</div>
            <div className="text-2xl">Section {index + 1} of {sections.length}</div>
          </section>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="fixed bottom-8 left-1/2 flex -translate-x-1/2 gap-3 z-10">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSection(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              currentSection === index
                ? 'w-8 bg-white'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to ${sections[index]}`}
          />
        ))}
      </div>

      {/* Debug Info */}
      <div className="z-50 fixed top-4 right-4 bg-black/80 text-white p-4 rounded text-sm font-mono z-10">
        <div>Current Section: {currentSection}</div>
        <div>Scroll and check console!</div>
      </div>
    </>
  );
}