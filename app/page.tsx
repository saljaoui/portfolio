"use client";

import { useEffect, useRef, useState } from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

export default function Home() {
  const mainRef = useRef(null);

  const [currentSection, setCurrentSection] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [bounceOffset, setBounceOffset] = useState(0);

  const isTransitioningRef = useRef(false);
  const scrollIntentRef = useRef(0);
  const prevSectionRef = useRef(0);
  const hasInteractedRef = useRef(false);

  const totalSections = 5;

  /* ===============================
     INPUT: WHEEL + KEYBOARD
  =============================== */
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      hasInteractedRef.current = true;
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

    const handleKeyDown = (e: KeyboardEvent) => {

      hasInteractedRef.current = true;
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

    if (!hasInteractedRef.current) {
      return;
    }

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
    <div>
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
        <Hero />

        {/* About Section */}
        <About />

        {/* Tech Stack Section */}

        <Skills />

        {/* Projects Section */}
        <Projects />

        {/* Contact Section */}
        <Contact />

      </main>
      {/* Section Indicators */}
      <div className="fixed bottom-7 right-1/2 translate-x-1/2 z-50 flex gap-3">
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
            className={`px-3 py-1 border border-white transition-all duration-300 hover:bg-white/10 ${i === currentSection
                ? "bg-white text-black font-medium"
                : "bg-transparent text-white"
              }`}
            aria-label={`Go to section ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
