import { FC } from "react";

interface HeroFooterProps {
  mounted: boolean;
  animate: boolean;
}

export const HeroFooter: FC<HeroFooterProps> = ({ mounted, animate }) => {
  return (
    <div
      className={`absolute bottom-20 left-24 right-24 z-20 flex flex-col items-center transition-all duration-1000 ${
        mounted && animate ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{ transitionDelay: "600ms" }}
    >
      <div className="flex items-center w-full">
        <div className="flex-1 h-px bg-gradient-to-r from-white/20 via-white/40 to-white/30 relative overflow-hidden">
        </div>

        <div className="relative px-4">
          <div
            className="absolute inset-0 bg-white/20 blur-xl rounded-full"
            style={{
              animationName: "glow",
              animationDuration: "2s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
          />
          <div
            className="relative text-white/70 text-base"
            style={{
              textShadow: "0 0 20px rgba(255,255,255,0.6)",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16.66 9.353c1.787 1.154 1.787 4.14 0 5.294L5.87 21.614C4.135 22.736 2 21.276 2 18.968V5.033c0-2.31 2.134-3.769 3.87-2.648l10.79 6.968Z" />
                <path strokeLinecap="round" d="M22 5v14" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-0.5 flex justify-between items-center w-full">
        <p className="text-white/40 text-xs tracking-widest mt-auto">
          © 2025 SOUFIANE ALJAOUI. All Rights Reserved.
        </p>

        <p className="text-white/60 text-xs tracking-widest mt-auto">
          SCROLL HORIZONTAL
        </p>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes flowRight {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(800%);
            opacity: 0;
          }
        }

        @keyframes glow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.3);
          }
        }
      `}</style>
    </div>
  );
};
