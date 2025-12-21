'use client';

import { SetStateAction, useEffect, useRef, useState } from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Navigation from '@/components/layout/Navigation'

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

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      hasInteractedRef.current = true;
      if (isTransitioningRef.current) return;

      scrollIntentRef.current += e.deltaY;
      const THRESHOLD = 120;

      if (scrollIntentRef.current > THRESHOLD && currentSection < totalSections - 1) {
        isTransitioningRef.current = true;
        scrollIntentRef.current = 0;
        setCurrentSection((p) => p + 1);
      }

      if (scrollIntentRef.current < -THRESHOLD && currentSection > 0) {
        isTransitioningRef.current = true;
        scrollIntentRef.current = 0;
        setCurrentSection((p) => p - 1);
      }

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

  useEffect(() => {
    const baseX = -currentSection * window.innerWidth;

    if (!hasInteractedRef.current) return;

    const direction = currentSection > prevSectionRef.current ? -1 : 1;
    prevSectionRef.current = currentSection;

    setBounceOffset(0);
    setTranslateX(baseX);

    const t1 = setTimeout(() => setBounceOffset(15 * direction), 1200);
    const t2 = setTimeout(() => setBounceOffset(-5 * direction), 1500);
    const t3 = setTimeout(() => setBounceOffset(0), 1650);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [currentSection]);

  // ✅ KEY FIX: Handler function that checks transitioningRef
  const handleNavigation = (sectionIndex: SetStateAction<number>) => {
    if (!isTransitioningRef.current) {
      isTransitioningRef.current = true;
      setCurrentSection(sectionIndex);
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 2000);
    }
  };

  return (
    <div>
      {/* ✅ Pass callback and currentSection */}
      <Navigation 
        currentSection={currentSection}
        onNavigate={handleNavigation}
      />
      
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
        <Hero />
        <About active={currentSection === 1} />
        <Skills active={currentSection === 2} />
        <Projects />
        <Contact active={currentSection === 4}/>
      </main>
    </div>
  );
}
