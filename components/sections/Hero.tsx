"use client";

import { useRef } from "react";
import { useLoadingAnimation } from "../ui/useLoadingAnimation";
import { useCanvasAnimation } from "../ui/useCanvasAnimation";
import { LoadingScreen } from "../common/LoadingScreen";
import { GradientOverlay } from "../common/GradientOverlay";
import { HeroContent } from "../common/HeroContent";
import { HeroFooter } from "../common/HeroFooter";

interface HeroProps {
  active: boolean;
}

export default function Hero({ active }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { loading, loadingProgress, mounted, animate } =
    useLoadingAnimation(active);

  // Initialize canvas animation
  useCanvasAnimation(canvasRef as React.RefObject<HTMLCanvasElement>, loading, animate);

  return (
    <>
      {/* Loading Screen */}
      <LoadingScreen loading={loading} loadingProgress={loadingProgress} />

      {/* Main Content */}
      <div className="relative w-screen h-screen overflow-hidden bg-black">
        {/* Canvas Background Animation */}
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />

        {/* Gradient Overlay */}
        <GradientOverlay mounted={mounted} animate={animate} />

        {/* Hero Content */}
        <HeroContent mounted={mounted} animate={animate} />

        {/* Background Text */}
        <div
          className={`absolute w-full flex justify-center right-0 left-0 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-1000 ${
            mounted && animate ? "opacity-100 scale-100" : "opacity-0 scale-110"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <span className="text-[17rem] font-bold text-white/5 leading-none">
            SOUFIANE
          </span>
        </div>

        {/* Footer */}
        <HeroFooter mounted={mounted} animate={animate} />
      </div>
    </>
  );
}
