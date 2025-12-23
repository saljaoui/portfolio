import { FC } from "react";

interface GradientOverlayProps {
  mounted: boolean;
  animate: boolean;
}

export const GradientOverlay: FC<GradientOverlayProps> = ({
  mounted,
  animate,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div
        className={`absolute -top-20 -left-20 w-[600px] h-[600px] transition-all duration-1000 ${
          mounted && animate ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className={`absolute top-0 left-0 w-1/3 h-1/2 transition-all duration-1000 delay-200 ${
          mounted && animate ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
        }}
      />
    </div>
  );
};
