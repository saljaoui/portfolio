"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const mainRef = useRef(null);

  const [currentSection, setCurrentSection] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [bounceOffset, setBounceOffset] = useState(0);

  const isTransitioningRef = useRef(false);
  const scrollIntentRef = useRef(0);
  const prevSectionRef = useRef(0);

  const totalSections = 5;

  /* ===============================
     INPUT: WHEEL + KEYBOARD
  =============================== */
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (isTransitioningRef.current) return;

      scrollIntentRef.current += e.deltaY;

      const THRESHOLD = 120;

      if (
        scrollIntentRef.current > THRESHOLD &&
        currentSection < totalSections - 1
      ) {
        isTransitioningRef.current = true;
        scrollIntentRef.current = 0;
        setCurrentSection((p) => p + 1);
      }

      if (
        scrollIntentRef.current < -THRESHOLD &&
        currentSection > 0
      ) {
        isTransitioningRef.current = true;
        scrollIntentRef.current = 0;
        setCurrentSection((p) => p - 1);
      }

      // lock until full animation ends
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 2000);
    };

    const handleKeyDown = (e) => {
      if (isTransitioningRef.current) return;

      if (e.key === "ArrowDown" && currentSection < totalSections - 1) {
        e.preventDefault();
        isTransitioningRef.current = true;
        setCurrentSection((p) => p + 1);
      }

      if (e.key === "ArrowUp" && currentSection > 0) {
        e.preventDefault();
        isTransitioningRef.current = true;
        setCurrentSection((p) => p - 1);
      }

      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 2000);
    };

    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.height = "";
      document.body.style.overflow = "";
    };
  }, [currentSection]);

  /* ===============================
     MAIN MOVE + SETTLE ANIMATION
  =============================== */
  useEffect(() => {
    const baseX = -currentSection * window.innerWidth;
    const direction =
      currentSection > prevSectionRef.current ? -1 : 1;

    prevSectionRef.current = currentSection;

    setBounceOffset(0);
    setTranslateX(baseX);

    // direction-aware settle
    const t1 = setTimeout(() => setBounceOffset(15 * direction), 1200);
    const t2 = setTimeout(() => setBounceOffset(-5 * direction), 1500);
    const t3 = setTimeout(() => setBounceOffset(0), 1650);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [currentSection]);

  /* ===============================
     RENDER
  =============================== */
  return (
    <>
      <style jsx>{`
        @keyframes oscillate {
          0% { transform: translateX(0px); }
          25% { transform: translateX(50px); }
          50% { transform: translateX(-50px); }
          75% { transform: translateX(30px); }
          100% { transform: translateX(0px); }
        }
      `}</style>

      <main
        ref={mainRef}
        className="fixed top-0 left-0 min-h-screen flex flex-row w-fit h-full"
        style={{
          transform: `translateX(${translateX + bounceOffset}px)`,
          transition:
            bounceOffset === 0
              ? "transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
              : "transform 0.25s ease-out",
          willChange: "transform",
        }}
      >
        {/* Hero Section */}
        <section className="w-screen h-screen flex-shrink-0 bg-black text-white overflow-hidden flex items-center justify-center relative">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-6xl font-bold mb-4">Hero Section</h1>
            <p className="text-sm font-mono text-gray-400 uppercase tracking-widest">
              Scroll down to explore
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-screen h-screen flex-shrink-0 bg-white text-black relative overflow-hidden flex items-center justify-center">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>
          <div className="relative z-10 text-center">
            <h2 className="text-6xl font-bold mb-4">About</h2>
            <p className="text-sm font-mono text-gray-600 uppercase tracking-widest">
              Learn more about me
            </p>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech" className="w-screen h-screen flex-shrink-0 bg-neutral-950 text-white relative flex items-center justify-center">
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          ></div>
          <div className="relative z-10 text-center">
            <h2 className="text-6xl font-bold mb-4">Tech Stack</h2>
            <p className="text-sm font-mono text-gray-500 uppercase tracking-widest">
              Spring Boot, Angular, Docker
            </p>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="w-screen h-screen flex-shrink-0 bg-black text-white relative flex items-center justify-center">
          <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-6xl font-bold mb-4">Projects</h2>
            <p className="text-sm font-mono text-gray-500 uppercase tracking-widest">
              01Blog, Portfolio, More
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-screen h-screen flex-shrink-0 bg-white text-black relative flex items-center justify-center">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>
          <div className="relative z-10 text-center">
            <h2 className="text-6xl font-bold mb-4">Contact</h2>
            <p className="text-sm font-mono text-gray-600 uppercase tracking-widest">
              Let's work together
            </p>
          </div>
        </section>
      </main>
      {/* Section Indicators */}
      <div className="fixed bottom-8 right-1/2 -translate-y-1/2 z-50 flex gap-4">
        {[...Array(totalSections)].map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (!isTransitioningRef.current) {
                isTransitioningRef.current = true;
                setCurrentSection(i);
                setTimeout(() => {
                  isTransitioningRef.current = false;
                }, 2000);
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentSection
                ? "bg-white scale-150"
                : "bg-gray-500 hover:bg-gray-300"
              }`}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}
