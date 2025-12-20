import { useState, useEffect, useRef } from 'react';

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    number: '01',
    description: "A revolutionary approach to modern design with seamless user experience and innovative features",
    tags: ["Design", "UX", "Innovation"],
    github: "https://github.com",
    demo: "https://demo.example.com"
  },
  {
    id: 2,
    title: "Cloud Infrastructure",
    number: '02',
    description: "Building scalable solutions for tomorrow with cutting-edge cloud technologies",
    tags: ["Development", "Cloud", "Architecture"],
    github: "https://github.com",
    demo: "https://demo.example.com"
  },
  {
    id: 3,
    title: "Mobile Experience",
    number: '03',
    description: "Creating meaningful user experiences across all devices and platforms",
    tags: ["Product", "Strategy", "Growth"],
    github: "https://github.com",
    demo: "https://demo.example.com"
  },
  {
    id: 4,
    title: "AI Integration",
    number: '04',
    description: "Pushing boundaries with cutting-edge tech and machine learning capabilities",
    tags: ["AI", "Machine Learning", "Data"],
    github: "https://github.com",
    demo: "https://demo.example.com"
  },
  {
    id: 5,
    title: "Innovation Lab",
    number: '05',
    description: "Transforming ideas into reality through research and development",
    tags: ["Innovation", "Research", "Impact"],
    github: "https://github.com",
    demo: "https://demo.example.com"
  }
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isTransitioningRef = useRef(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [showContent, setShowContent] = useState(true);

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

        // Hide content first
        setShowContent(false);

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

        // Remove animation overlay and show content with stagger
        setTimeout(() => {
          setIsAnimating(false);
          setShowContent(true);
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

      {/* Particle Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particle-float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
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
            className="relative w-screen h-screen overflow-hidden flex items-center justify-center px-8 md:px-16 lg:px-24 group snap-start"
          >
            <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
              {/* Left Side - Content */}
              <div className={`text-left h-full pt-4 space-y-6 transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Header */}
                <div className="mb-8" style={{ animationDelay: '0ms' }}>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2">
                    <span className="text-white inline-block animate-[slideInLeft_0.6s_ease-out_forwards]">PROJECT</span>{" "}
                    <span
                      className="text-white/10 inline-block animate-[slideInRight_0.6s_ease-out_forwards]"
                      style={{
                        letterSpacing: "-0.02em",
                        WebkitTextStroke: "2px rgba(250, 250, 250, 0.6)",
                      }}
                    >
                      {project.number}
                    </span>
                  </h1>
                  <div className="h-px w-32 bg-white/80 animate-[expandWidth_0.8s_ease-out_forwards]"></div>
                </div>

                {/* Title */}
                <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight transition-all duration-500 ${showContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                    style={{ transitionDelay: '100ms' }}>
                  {project.title}
                </h2>

                {/* Description */}
                <p className={`text-base md:text-lg text-gray-400 leading-relaxed mb-6 transition-all duration-500 ${showContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                   style={{ transitionDelay: '200ms' }}>
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-xs font-medium text-gray-300 hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-default hover:scale-110 hover:rotate-2 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                      style={{ 
                        transitionDelay: `${300 + i * 100}ms`,
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className={`flex flex-wrap gap-4 pt-4 transition-all duration-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                     style={{ transitionDelay: '500ms' }}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:rotate-12 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      <span className="relative z-10">View Code</span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/20 text-white rounded-lg font-medium hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:scale-105 relative overflow-hidden backdrop-blur-sm"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700"></div>
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span className="relative z-10">Live Demo</span>
                    </a>
                  )}
                </div>

                {/* Project Stats */}
                <div className={`flex gap-6 pt-6 border-t border-white/10 transition-all duration-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                     style={{ transitionDelay: '600ms' }}>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">2024</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Year</div>
                  </div>
                  <div className="w-px bg-white/10"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">Web</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Platform</div>
                  </div>
                  <div className="w-px bg-white/10"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-1">Live</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Status</div>
                  </div>
                </div>
              </div>

              {/* Right Side - Project Image */}
              <div className={`relative h-[400px] md:h-[500px] group/image transition-all duration-700 ${showContent ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
                   style={{ transitionDelay: '300ms' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm border border-white/20 overflow-hidden transition-all duration-500 hover:border-white/40 hover:shadow-[0_0_50px_rgba(255,255,255,0.1)]">
                  {/* Placeholder for project image */}
                  <div className="w-full h-full flex items-center justify-center bg-white/5 relative overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-110"
                      />
                    ) : (
                      <div className="text-center space-y-4 p-8 relative z-10">
                        <div className="w-24 h-24 mx-auto border-2 border-white/30 rounded-xl flex items-center justify-center transition-all duration-500 group-hover/image:rotate-12 group-hover/image:scale-110 group-hover/image:border-white/60 relative">
                          <div className="absolute inset-0 bg-white/5 rounded-xl animate-pulse"></div>
                          <svg className="w-12 h-12 text-white/40 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-white/50 text-sm font-medium">Project Preview</p>
                        <div className="flex gap-2 justify-center">
                          <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"
                         style={{
                           background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                           animation: 'shimmer 2s infinite'
                         }}></div>
                  </div>

                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Decorative corner accents */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-white/30 rounded-tl-lg transition-all duration-500 group-hover/image:w-12 group-hover/image:h-12 group-hover/image:border-white/60"></div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-white/30 rounded-br-lg transition-all duration-500 group-hover/image:w-12 group-hover/image:h-12 group-hover/image:border-white/60"></div>
                
                {/* Floating orbs */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-20 left-20 w-2 h-2 bg-white/20 rounded-full animate-[float_6s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-32 right-32 w-3 h-3 bg-white/15 rounded-full animate-[float_8s_ease-in-out_infinite]"></div>
            <div className="absolute top-1/3 right-20 w-2 h-2 bg-white/10 rounded-full animate-[float_7s_ease-in-out_infinite]"></div>
            <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/10 rounded-full animate-[float_9s_ease-in-out_infinite]"></div>
          </div>
        ))}
      </div>

      {/* Navigation Indicators */}
      <div className="fixed top-1/2 pl-8 -translate-y-1/2 z-[60] flex flex-col gap-3">
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
                setShowContent(false);
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
                  setShowContent(true);
                  isTransitioningRef.current = false;
                }, 900);
              }
            }}
            className={`relative transition-all duration-300 ${i === currentIndex
              ? 'w-2 h-8'
              : 'w-2 h-2 hover:h-4'
              }`}
            aria-label={`Go to project ${i + 1}`}
          >
            <div className={`absolute inset-0 rounded-full transition-all duration-300 ${i === currentIndex
              ? 'bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)]'
              : 'bg-white/30 hover:bg-white/70 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]'
              }`}></div>
            {i === currentIndex && (
              <div className="absolute inset-0 rounded-full bg-white animate-ping opacity-75"></div>
            )}
          </button>
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

        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes expandWidth {
          0% {
            width: 0;
            opacity: 0;
          }
          100% {
            width: 8rem;
            opacity: 1;
          }
        }

        @keyframes scrollDown {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(16px);
            opacity: 0;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }

        @keyframes particle-float {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.2;
          }
          25% {
            transform: translate(10px, -10px);
            opacity: 0.4;
          }
          50% {
            transform: translate(-5px, -20px);
            opacity: 0.3;
          }
          75% {
            transform: translate(-10px, -10px);
            opacity: 0.4;
          }
        }
      `}</style>
    </section>
  );
}