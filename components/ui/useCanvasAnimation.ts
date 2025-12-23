import { useRef, useEffect } from "react";

interface MouseRef {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

export const useCanvasAnimation = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  loading: boolean,
  animate: boolean
) => {
  const mouseRef = useRef<MouseRef>({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || loading) return;

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
    const resizeListener = () => resize();
    window.addEventListener("resize", resizeListener);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const draw = () => {
      if (!animate) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      time += 0.016;

      mouseRef.current.x +=
        (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y +=
        (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

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

      // Draw layers
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
          const mousePull =
            Math.cos(angleToMouse) * mouseDist * 35 * easeOut;

          const radius =
            (baseRadius +
              spiral +
              wave1 +
              wave2 +
              wave3 +
              mousePull) *
            easeOut;

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

      // Draw connections
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

          const pull1 =
            Math.cos(angle1 - mouseAngle) * mouseDist * 25;
          const pull2 =
            Math.cos(angle2 - mouseAngle) * mouseDist * 25;

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

      // Draw particles
      const numParticles = 25;
      for (let i = 0; i < numParticles; i++) {
        const particleAngle = (i / numParticles) * Math.PI * 2 + time * 0.5;
        const depth = (i % 3) / 3;
        const orbitRadius =
          baseRadius *
          (1.1 + depth * 0.4 + Math.sin(time + i) * 0.15);

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

      // Draw core glow
      const breathe = Math.sin(time * 1.5) * 0.15 + 1;
      const coreGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        baseRadius * 0.25 * breathe
      );
      coreGradient.addColorStop(0, `rgba(255, 255, 255, ${0.2 * easeOut})`);
      coreGradient.addColorStop(0.6, `rgba(255, 255, 255, ${0.08 * easeOut})`);
      coreGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.shadowBlur = 30;
      ctx.shadowColor = `rgba(255, 255, 255, ${0.2 * easeOut})`;
      ctx.fillStyle = coreGradient;
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        baseRadius * 0.25 * breathe * easeOut,
        0,
        Math.PI * 2
      );
      ctx.fill();

      ctx.shadowBlur = 0;
      rotation += 0.007;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeListener);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [loading, animate, canvasRef]);

  return mouseRef;
};
