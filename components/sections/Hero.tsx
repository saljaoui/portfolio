"use client";

import { useRef, useEffect, useState } from "react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let rotation = 0;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      // Canvas mouse tracking
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      time += 0.016;

      // Smooth mouse interpolation
      mouseRef.current.x +=
        (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y +=
        (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const mouse = mouseRef.current;
      const introEase = Math.min(time / 2, 1);
      const easeOut = 1 - Math.pow(1 - introEase, 3);

      // Clear canvas
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = Math.min(canvas.width, canvas.height) * 0.3;

      // Mouse influence
      const mouseDist = Math.sqrt(mouse.x ** 2 + mouse.y ** 2);
      const mouseAngle = Math.atan2(mouse.y, mouse.x);

      // Main spirograph pattern - 15 layers
      const numLayers = 15;
      const pointsPerLayer = 100;

      for (let layer = 0; layer < numLayers; layer++) {
        if (layer > numLayers * easeOut) continue;

        const progress = layer / numLayers;
        const opacity = (0.1 + progress * 0.3) * easeOut;

        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 1.5 - progress * 0.8;
        ctx.shadowBlur = 2;
        ctx.shadowColor = `rgba(255, 255, 255, ${opacity * 0.5})`;
        ctx.beginPath();

        for (let i = 0; i <= pointsPerLayer; i++) {
          const angle = (i / pointsPerLayer) * Math.PI * 2;
          const rotatedAngle = angle + rotation * (1 + layer * 0.08);

          // Complex mathematical curves
          const wave1 =
            Math.sin(angle * 8 + rotation * 3 + layer * 0.5) * 15;
          const wave2 = Math.cos(angle * 6 - rotation * 2.5) * 10;
          const wave3 = Math.sin(angle * 4 + rotation * 4) * 6;
          const spiral = layer * 5;

          // Mouse distortion
          const angleToMouse = rotatedAngle - mouseAngle;
          const mousePull =
            Math.cos(angleToMouse) * mouseDist * 35 * easeOut;

          const radius =
            (baseRadius + spiral + wave1 + wave2 + wave3 + mousePull) *
            easeOut;

          // Position waves
          const posWaveX = Math.sin(angle * 5 + rotation * 2.5) * 4;
          const posWaveY = Math.cos(angle * 7 - rotation * 3) * 4;

          const x =
            centerX + Math.cos(rotatedAngle) * radius + posWaveX * easeOut;
          const y =
            centerY + Math.sin(rotatedAngle) * radius + posWaveY * easeOut;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.closePath();
        ctx.stroke();
      }

      ctx.shadowBlur = 0;

      // Geometric connection lines
      if (easeOut > 0.5) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 * (easeOut - 0.5) * 2})`;
        ctx.lineWidth = 0.8;

        const numConnections = 50;
        for (let i = 0; i < numConnections; i++) {
          const angle1 =
            (i / numConnections) * Math.PI * 2 + rotation * 1.8;
          const angle2 =
            ((i + numConnections * 0.618) / numConnections) * Math.PI * 2 +
            rotation * 1.8;

          const r1 =
            baseRadius * 0.4 + Math.sin(rotation * 5 + i * 0.15) * 25;
          const r2 =
            baseRadius * 1.4 + Math.cos(rotation * 4 + i * 0.15) * 30;

          const pull1 = Math.cos(angle1 - mouseAngle) * mouseDist * 25;
          const pull2 = Math.cos(angle2 - mouseAngle) * mouseDist * 25;

          const x1 =
            centerX + Math.cos(angle1) * (r1 + pull1) * easeOut;
          const y1 =
            centerY + Math.sin(angle1) * (r1 + pull1) * easeOut;
          const x2 =
            centerX + Math.cos(angle2) * (r2 + pull2) * easeOut;
          const y2 =
            centerY + Math.sin(angle2) * (r2 + pull2) * easeOut;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      ctx.shadowBlur = 0;
      rotation += 0.007;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />
      {/* Dramatic light from top left */}
{/* Light effects */}
<div className="absolute inset-0 pointer-events-none overflow-hidden">
  {/* Main light from top left */}
  <div 
    className="absolute -top-20 -left-20 w-[600px] h-[600px]"
    style={{
      background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%)',
      filter: 'blur(40px)',
    }}
  />
  {/* Secondary glow */}
  <div 
    className="absolute top-0 left-0 w-1/3 h-1/3"
    style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
    }}
  />
</div>

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-between px-12 z-10">
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center items-start pl-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <p className="text-white/60 text-xs tracking-widest">
              SYSTEM ONLINE / OPEN TO WORK
            </p>
          </div>

          <h1
            className="text-5xl font-semibold text-white mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            FULL <span className="italic font-semibold">STACK</span>
          </h1>
          <h1
            className="text-5xl font-light text-white/10 mb-12"
            style={{
              letterSpacing: "-0.02em",
              WebkitTextStroke: "1px rgba(255,255,255,0.2)",
            }}
          >
            DEVELOPER
          </h1>

          <p className="text-white/40 text-xs tracking-wider mt-8">
            /// DOWNLOAD RESUME
          </p>
          <div className="flex gap-4 mt-4">
            <button className="px-6 py-3 border border-white/30 text-white text-sm tracking-wider hover:bg-white hover:text-black transition-all">
              ENGLISH VERSION ↓
            </button>
            <button className="px-6 py-3 border border-white/30 text-white/60 text-sm tracking-wider hover:bg-white hover:text-black transition-all">
              FRANÇAIS ↓
            </button>
          </div>
        </div>

        <div
          className="flex-shrink-0 relative"
          ref={imageContainerRef}
        >
          <div
            className="relative w-[300px] h-[450px] lg:w-[500px] lg:h-[500px] group"
            style={{
              perspective: "1000px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <img
                src="/images/my_image.png"
                alt="Your Image"
                className="w-full h-full object-contain rounded-lg shadow-2xl scale-x-[-1]"
                style={{
                  boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                }}
              />
            </div>
          </div>

          {/* Large Background Text */}
          <div className="absolute -right-32 top-1/2 -translate-y-1/2 pointer-events-none">
            <span className="text-[20rem] font-bold text-white/5 leading-none">
              CODES
            </span>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 flex flex-col justify-center items-end pr-12 text-right">
          <p className="text-white/60 text-sm leading-relaxed max-w-md mb-8">
            Building seamless digital experiences where solid
            <br />
            full-stack engineering meets thoughtful UI/UX
            <br />
            design. Based in morocco.
          </p>

          <button className="px-8 py-4 border border-white/30 text-white text-sm tracking-widest hover:bg-white hover:text-black transition-all mb-16">
            MORE ABOUT ME →
          </button>

          <p className="text-white/40 text-xs tracking-widest mt-auto">
            SCROLL HORIZONTAL →
          </p>
        </div>
      </div>
    </div>
  );
}