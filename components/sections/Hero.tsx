"use client";

import { useRef, useEffect, useState } from "react";

export default function Hero() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Loading sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            setMounted(true);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || loading) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let rotation = 0;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      time += 0.016;

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const mouse = mouseRef.current;
      const introEase = Math.min(time / 2, 1);
      const easeOut = 1 - Math.pow(1 - introEase, 3);

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = Math.min(canvas.width, canvas.height) * 0.3;

      const mouseDist = Math.sqrt(mouse.x ** 2 + mouse.y ** 2);
      const mouseAngle = Math.atan2(mouse.y, mouse.x);

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

          const wave1 = Math.sin(angle * 8 + rotation * 3 + layer * 0.5) * 15;
          const wave2 = Math.cos(angle * 6 - rotation * 2.5) * 10;
          const wave3 = Math.sin(angle * 4 + rotation * 4) * 6;
          const spiral = layer * 5;

          const angleToMouse = rotatedAngle - mouseAngle;
          const mousePull = Math.cos(angleToMouse) * mouseDist * 35 * easeOut;

          const radius = (baseRadius + spiral + wave1 + wave2 + wave3 + mousePull) * easeOut;

          const posWaveX = Math.sin(angle * 5 + rotation * 2.5) * 4;
          const posWaveY = Math.cos(angle * 7 - rotation * 3) * 4;

          const x = centerX + Math.cos(rotatedAngle) * radius + posWaveX * easeOut;
          const y = centerY + Math.sin(rotatedAngle) * radius + posWaveY * easeOut;

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

      if (easeOut > 0.5) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.06 * (easeOut - 0.5) * 2})`;
        ctx.lineWidth = 0.8;

        const numConnections = 50;
        for (let i = 0; i < numConnections; i++) {
          const angle1 = (i / numConnections) * Math.PI * 2 + rotation * 1.8;
          const angle2 = ((i + numConnections * 0.618) / numConnections) * Math.PI * 2 + rotation * 1.8;

          const r1 = baseRadius * 0.4 + Math.sin(rotation * 5 + i * 0.15) * 25;
          const r2 = baseRadius * 1.4 + Math.cos(rotation * 4 + i * 0.15) * 30;

          const pull1 = Math.cos(angle1 - mouseAngle) * mouseDist * 25;
          const pull2 = Math.cos(angle2 - mouseAngle) * mouseDist * 25;

          const x1 = centerX + Math.cos(angle1) * (r1 + pull1) * easeOut;
          const y1 = centerY + Math.sin(angle1) * (r1 + pull1) * easeOut;
          const x2 = centerX + Math.cos(angle2) * (r2 + pull2) * easeOut;
          const y2 = centerY + Math.sin(angle2) * (r2 + pull2) * easeOut;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      const numParticles = 25;
      for (let i = 0; i < numParticles; i++) {
        const particleAngle = (i / numParticles) * Math.PI * 2 + time * 0.5;
        const depth = (i % 3) / 3;
        const orbitRadius = baseRadius * (1.1 + depth * 0.4 + Math.sin(time + i) * 0.15);
        
        const px = centerX + Math.cos(particleAngle) * orbitRadius * easeOut;
        const py = centerY + Math.sin(particleAngle) * orbitRadius * easeOut;
        
        const size = 2 + depth * 1.5;
        const pulse = Math.sin(time * 2 + i * 0.5) * 0.3;
        const opacity = (0.4 + pulse + depth * 0.2) * easeOut;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.shadowBlur = 8 + depth * 6;
        ctx.shadowColor = `rgba(255, 255, 255, ${opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      const breathe = Math.sin(time * 1.5) * 0.15 + 1;
      const coreGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, baseRadius * 0.25 * breathe
      );
      coreGradient.addColorStop(0, `rgba(255, 255, 255, ${0.2 * easeOut})`);
      coreGradient.addColorStop(0.6, `rgba(255, 255, 255, ${0.08 * easeOut})`);
      coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.shadowBlur = 30;
      ctx.shadowColor = `rgba(255, 255, 255, ${0.2 * easeOut})`;
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 0.25 * breathe * easeOut, 0, Math.PI * 2);
      ctx.fill();

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
  }, [loading]);

  return (
    <>
      {/* Loading Screen */}
      <div 
        className={`absolute w-screen h-screen inset-0 bg-black z-50 flex items-center justify-center transition-all duration-700 ${
          loading ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {/* Logo or Name */}
          <h1 className="text-5xl font-bold text-white tracking-wider">
            SOUFIANE
          </h1>
          
          {/* Loading Bar */}
          <div className="w-64 h-0.5 bg-white/20 relative overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          
          {/* Percentage */}
          <p className="text-white/60 text-sm tracking-widest">
            {loadingProgress}%
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative w-screen h-screen overflow-hidden bg-black">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />
        
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className={`absolute -top-20 -left-20 w-[600px] h-[600px] transition-all duration-1000 ${
              mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%)',
              filter: 'blur(40px)',
            }}
          />
          <div
            className={`absolute top-0 left-0 w-1/3 h-1/2 transition-all duration-1000 delay-200 ${
              mounted ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
            }}
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-between px-12 z-10">
          <div className="flex-1 flex flex-col justify-center items-start pl-12">
            <div 
              className={`flex items-center gap-3 mb-8 transition-all duration-700 ${
                mounted ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-white/60 text-xs tracking-widest">
                OPEN TO WORK
              </p>
            </div>
            
            <h1
              className={`text-6xl font-semibold text-white mb-4 transition-all duration-700 delay-100 ${
                mounted ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}
              style={{ letterSpacing: "-0.02em" }}
            >
              FULL <span className="font-sans font-semibold">STACK</span>
            </h1>
            
            <h1
              className={`text-6xl font-medium text-white/10 mb-10 transition-all duration-700 delay-200 ${
                mounted ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}
              style={{
                letterSpacing: "-0.02em",
                WebkitTextStroke: "1px rgba(255,255,255,0.4)",
              }}
            >
              DEVELOPER
            </h1>

            <p 
              className={`text-white/40 text-xs tracking-wider mt-8 transition-all duration-700 delay-300 ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              /// DOWNLOAD RESUME
            </p>
            
            <div 
              className={`flex gap-4 mt-4 transition-all duration-700 delay-400 ${
                mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <button className="px-3 py-3 border border-white/30 bg-white text-black text-sm transition-all hover:scale-105 flex gap-2">
                ENGLISH VERSION
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                    <path d="M12.25 2.834c-.46-.078-1.088-.084-2.22-.084c-1.917 0-3.28.002-4.312.14c-1.012.135-1.593.39-2.016.812c-.423.423-.677 1.003-.812 2.009c-.138 1.028-.14 2.382-.14 4.29v4c0 1.906.002 3.26.14 4.288c.135 1.006.389 1.586.812 2.01c.423.422 1.003.676 2.009.811c1.028.139 2.382.14 4.289.14h4c1.907 0 3.262-.002 4.29-.14c1.005-.135 1.585-.389 2.008-.812c.423-.423.677-1.003.812-2.009c.138-1.027.14-2.382.14-4.289v-.437c0-1.536-.01-2.264-.174-2.813h-3.13c-1.133 0-2.058 0-2.79-.098c-.763-.103-1.425-.325-1.954-.854c-.529-.529-.751-1.19-.854-1.955c-.098-.73-.098-1.656-.098-2.79V2.835Zm1.5.776V5c0 1.2.002 2.024.085 2.643c.08.598.224.891.428 1.094c.203.204.496.348 1.094.428c.619.083 1.443.085 2.643.085h2.02a45.815 45.815 0 0 0-1.17-1.076l-3.959-3.563A37.2 37.2 0 0 0 13.75 3.61Zm-3.575-2.36c1.385 0 2.28 0 3.103.315c.823.316 1.485.912 2.51 1.835l.107.096l3.958 3.563l.125.112c1.184 1.065 1.95 1.754 2.361 2.678c.412.924.412 1.954.411 3.546v.661c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433V9.944c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.75-.749 1.701-1.08 2.878-1.238c1.144-.153 2.607-.153 4.455-.153h.202Z" />
                    <path d="M7.987 19.047a.75.75 0 0 0 1.026 0l2-1.875a.75.75 0 0 0-1.026-1.094l-.737.69V13.5a.75.75 0 1 0-1.5 0v3.269l-.737-.691a.75.75 0 1 0-1.026 1.094l2 1.875Z" />
                  </g>
                </svg>
              </button>
              <button className="px-3 py-3 border border-white/40 text-white/60 text-sm transition-all hover:bg-white/10 hover:border-white hover:text-white hover:scale-105 flex">
                FRANÇAIS
              </button>
            </div>
          </div>

          <div className="flex-shrink-0 relative">
            <div
              className={`relative w-[300px] h-[450px] lg:w-[500px] lg:h-[550px] group transition-all duration-1000 delay-300 ${
                mounted ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
              }`}
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
                  alt="Soufian ALJAOUI"
                  className="w-full h-full object-contain rounded-lg shadow-2xl scale-x-[-1]"
                  style={{
                    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center items-end pr-12 text-right">
            <p 
              className={`text-white/60 text-sm leading-relaxed max-w-md mb-8 transition-all duration-700 delay-200 ${
                mounted ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
              }`}
            >
              Building seamless digital experiences where solid
              <br />
              full-stack engineering meets thoughtful UI/UX
              <br />
              design. Based in morocco.
            </p>

            <button 
              className={`px-8 py-4 border border-white/30 text-white text-sm tracking-widest hover:bg-white hover:text-black transition-all mb-16 flex items-center gap-4 hover:scale-105 ${
                mounted ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              MORE ABOUT ME
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M16.66 9.353c1.787 1.154 1.787 4.14 0 5.294L5.87 21.614C4.135 22.736 2 21.276 2 18.968V5.033c0-2.31 2.134-3.769 3.87-2.648l10.79 6.968Z" />
                  <path strokeLinecap="round" d="M22 5v14" />
                </g>
              </svg>
            </button>
          </div>
        </div>

        <div 
          className={`absolute w-full flex justify-center right-0 left-0 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-1000 delay-500 ${
            mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          }`}
        >
          <span className="text-[17rem] font-bold text-white/5 leading-none">
            SOUFIANE
          </span>
        </div>

        <div 
          className={`absolute bottom-20 left-24 right-24 z-20 flex flex-col items-center transition-all duration-1000 delay-600 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-gradient-to-r from-white/20 via-white/40 to-white/30 relative overflow-hidden">
              <div
                className="absolute inset-0 h-full w-32 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                style={{
                  animation: 'flowRight 2.5s ease-in-out infinite',
                }}
              />
            </div>

            <div className="relative px-4">
              <div
                className="absolute inset-0 bg-white/20 blur-xl rounded-full"
                style={{
                  animation: 'glow 2s ease-in-out infinite',
                }}
              />
              <div
                className="relative text-white/70 text-base"
                style={{
                  textShadow: '0 0 20px rgba(255,255,255,0.6)',
                  animation: 'arrowPulse 2.5s ease-in-out infinite',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
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
        </div>

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
            0%, 100% {
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
    </>
  );
}