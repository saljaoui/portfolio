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
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');

  useEffect(() => {
    const container = document.getElementById('projects-scroll-container');
    let scrollTimeout;
    
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

    const handleWheel = (e) => {
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
        // Set scroll direction
        setScrollDirection(direction > 0 ? 'down' : 'up');
        
        // Trigger animation
        setIsAnimating(true);
        
        // Change project content at the peak of animation (when screen is covered)
        setTimeout(() => {
          container.scrollTo({
            top: newIndex * container.clientHeight,
            behavior: 'auto' // Changed to 'auto' for instant change
          });
          setCurrentIndex(newIndex);
        }, 350); // Halfway through the 700ms animation
        
        // Remove animation overlay
        setTimeout(() => {
          setIsAnimating(false);
        }, 700);
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
      {/* Animation Overlay */}
      {isAnimating && (
        <div
          className="absolute inset-0 z-50 bg-white pointer-events-none"
          style={{
            animation: scrollDirection === 'down' 
              ? 'slideUpAndOut 0.7s ease-in-out forwards' 
              : 'slideDownAndOut 0.7s ease-in-out forwards'
          }}
        />
      )}
      
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
        
        @keyframes slideUpAndOut {
          0% {
            transform: translateY(100%);
          }
          50% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-100%);
          }
        }
        
        @keyframes slideDownAndOut {
          0% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </section>
  );
}