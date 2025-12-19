import { useState, useEffect, useRef } from 'react';

const projects = [
  { id: 1, title: "Project 1" },
  { id: 2, title: "Project 2" },
  { id: 3, title: "Project 3" },
  { id: 4, title: "Project 4" },
  { id: 5, title: "Project 5" }
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isTransitioningRef = useRef(false);

  useEffect(() => {
    const container = document.getElementById('projects-scroll-container');
    let scrollTimeout: string | number | NodeJS.Timeout | undefined;
    
    const snapToSection = () => {
      if (!container) return;
      
      const scrollTop = container.scrollTop;
      const sectionHeight = container.clientHeight;
      const targetIndex = Math.round(scrollTop / sectionHeight);
      
      container.scrollTo({
        top: targetIndex * sectionHeight,
        behavior: 'smooth'
      });
      
      setCurrentIndex(targetIndex);
    };

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        snapToSection();
      }, 150);
    };

    const handleWheel = (e: { preventDefault: () => void; stopPropagation: () => void; deltaY: number; }) => {
      if (!container) return;
      
      // Block if currently transitioning
      if (isTransitioningRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtTop = scrollTop <= 1;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
      
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;
      
      if ((scrollingDown && isAtBottom) || (scrollingUp && isAtTop)) {
        return;
      }
      
      e.preventDefault();
      e.stopPropagation();
      
      // Start transition
      isTransitioningRef.current = true;
      
      const direction = e.deltaY > 0 ? 1 : -1;
      const newIndex = Math.max(0, Math.min(projects.length - 1, currentIndex + direction));
      
      if (newIndex !== currentIndex) {
        container.scrollTo({
          top: newIndex * container.clientHeight,
          behavior: 'smooth'
        });
        setCurrentIndex(newIndex);
      }
      
      // Allow next scroll after animation completes
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 800);
    };

    if (container) {
      container.addEventListener('scroll', handleScroll);
      container.addEventListener('wheel', handleWheel, { passive: false, capture: true });
      
      return () => {
        clearTimeout(scrollTimeout);
        container.removeEventListener('scroll', handleScroll);
        container.removeEventListener('wheel', handleWheel, true);
      };
    }
  }, [currentIndex]);

  return (
    <section className="w-screen h-screen flex-shrink-0 bg-black text-white relative overflow-hidden">
      <div
        id="projects-scroll-container"
        className="relative z-10 h-full overflow-y-scroll snap-y snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          overscrollBehavior: 'contain',
          scrollBehavior: 'smooth'
        }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="h-screen w-full snap-start flex items-center justify-center"
          >
            <h2 className="text-6xl font-bold">{project.title}</h2>
          </div>
        ))}
      </div>

      <style jsx>{`
        #projects-scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}