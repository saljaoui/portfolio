import { useState, useEffect, useRef } from 'react';

const projects = [
  {
    id: 1,
    title: "Project",
    number: '01',
    description: "A revolutionary approach to modern design",
    tags: ["Design", "UX", "Innovation"]
  },
  {
    id: 2,
    title: "Project",
    number: '02',
    description: "Building scalable solutions for tomorrow",
    tags: ["Development", "Cloud", "Architecture"]
  },
  {
    id: 3,
    title: "Project",
    number: '03',
    description: "Creating meaningful user experiences",
    tags: ["Product", "Strategy", "Growth"]
  },
  {
    id: 4,
    title: "Project",
    number: '04',
    description: "Pushing boundaries with cutting-edge tech",
    tags: ["AI", "Machine Learning", "Data"]
  },
  {
    id: 5,
    title: "Project",
    number: '05',
    description: "Transforming ideas into reality",
    tags: ["Innovation", "Research", "Impact"]
  }
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isTransitioningRef = useRef(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');

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
        // Set scroll direction
        setScrollDirection(direction > 0 ? 'down' : 'up');

        // Trigger animation
        setIsAnimating(true);

        // Change project content at the peak of animation (when screen is covered)
        setTimeout(() => {
          container.scrollTo({
            top: newIndex * container.clientHeight,
            behavior: 'auto'
          });
          setCurrentIndex(newIndex);
        }, 400);

        // Remove animation overlay
        setTimeout(() => {
          setIsAnimating(false);
        }, 800);
      }

      // Allow next scroll after animation completes
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 900);
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
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at ${50 + currentIndex * 10}% ${50 - currentIndex * 5}%, rgba(255, 255, 255, 0.1), transparent 70%)`
          }}
        />
      </div>
      
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] z-0">
        <div 
          className="absolute inset-0 transition-transform duration-1000"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            transform: `translate(${currentIndex * 5}px, ${currentIndex * 5}px)`
          }}
        />
      </div>

      {/* Animation Overlay */}
      {isAnimating && (
        <div
          className="absolute inset-0 z-50 pointer-events-none"
          style={{
            background: '#ffffff',
            animation: scrollDirection === 'down'
              ? 'slideUpAndOut 0.8s cubic-bezier(0.65, 0, 0.35, 1) forwards'
              : 'slideDownAndOut 0.8s cubic-bezier(0.65, 0, 0.35, 1) forwards'
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
        }}>
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative w-screen h-screen overflow-hidden flex items-center justify-center px-8 md:px-16 lg:px-24 group"
          >
            <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
              {/* Left Side - Content */}
              <div className="text-left h-full pt-4 transform transition-all duration-700 space-y-6">
                {/* Project Number */}
                        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-2">
            <span className="text-white">PROJECT</span>{" "}
            <span
              className="text-white/10"
              style={{
                letterSpacing: "-0.02em",
                WebkitTextStroke: "2px rgba(250, 250, 250, 0.6)",
              }}
            >
              {project.number}
            </span>
          </h1>
          <div className="h-px w-32 bg-white/80"></div>
          <p className="text-gray-500 text-sm mt-3 max-w-xl">
            Technologies I use to build modern, scalable applications
          </p>
        </div>

                {/* Description */}
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed transition-all duration-300 hover:text-gray-300">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      style={{ animationDelay: `${i * 100}ms` }}
                      className="px-4 py-2 bg-white/5 border border-white/20 rounded-full text-sm text-gray-300 hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-default hover:scale-110 animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Side - Project Image */}
              <div className="relative h-[400px] md:h-[500px] group/image">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 overflow-hidden transition-all duration-500 hover:border-white/40 hover:shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                  {/* Placeholder for project image */}
                  <div className="w-full h-full flex items-center justify-center bg-white/5">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                      />
                    ) : (
                      <div className="text-center space-y-4 p-8">
                        <div className="w-20 h-20 mx-auto border-2 border-white/30 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover/image:rotate-12 group-hover/image:scale-110">
                          <svg className="w-10 h-10 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-white/50 text-sm">Project Preview</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Decorative corner accents */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-white/30 rounded-tl-lg transition-all duration-500 group-hover/image:w-12 group-hover/image:h-12 group-hover/image:border-white/60"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-white/30 rounded-br-lg transition-all duration-500 group-hover/image:w-12 group-hover/image:h-12 group-hover/image:border-white/60"></div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute top-20 left-20 w-2 h-2 bg-white/20 rounded-full animate-[float_6s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-32 right-32 w-3 h-3 bg-white/15 rounded-full animate-[float_8s_ease-in-out_infinite]"></div>
            <div className="absolute top-1/3 right-20 w-2 h-2 bg-white/10 rounded-full animate-[float_7s_ease-in-out_infinite]"></div>
          </div>
        ))}
      </div>

      {/* Navigation Indicators */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[60] flex flex-col gap-3">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (!isTransitioningRef.current && i !== currentIndex) {
                const container = document.getElementById('projects-scroll-container');
                if (!container) return;

                const direction = i > currentIndex ? 1 : -1;
                isTransitioningRef.current = true;
                setScrollDirection(direction > 0 ? 'down' : 'up');
                setIsAnimating(true);

                setTimeout(() => {
                  container.scrollTo({
                    top: i * container.clientHeight,
                    behavior: 'auto'
                  });
                  setCurrentIndex(i);
                }, 400);

                setTimeout(() => {
                  setIsAnimating(false);
                  isTransitioningRef.current = false;
                }, 900);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex
                ? 'bg-white h-8 shadow-[0_0_20px_rgba(255,255,255,0.5)]'
                : 'bg-white/30 hover:bg-white/70 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]'
              }`}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>

      <style jsx>{`
        #projects-scroll-container::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes slideUpAndOut {
          0% {
            transform: translateY(100%);
            opacity: 1;
          }
          50% {
            transform: translateY(0%);
            opacity: 1;
          }
          100% {
            transform: translateY(-100%);
            opacity: 1;
          }
        }
        
        @keyframes slideDownAndOut {
          0% {
            transform: translateY(-100%);
            opacity: 1;
          }
          50% {
            transform: translateY(0%);
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 1;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}