import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  hue: number;
  saturation: number;
}

interface Nebula {
  x: number;
  y: number;
  rx: number;
  ry: number;
  rotation: number;
  hue: number;
  opacity: number;
  rotSpeed: number;
}

const MilkyWayBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate stars
    const starCount = Math.min(800, Math.floor((window.innerWidth * window.innerHeight) / 2500));
    const stars: Star[] = Array.from({ length: starCount }, () => {
      // Concentrate stars along a diagonal band (milky way)
      const bandAngle = Math.PI * 0.15;
      const bandSpread = Math.random();
      const alongBand = Math.random();
      const perpOffset = (Math.random() - 0.5) * (bandSpread < 0.6 ? 0.25 : 0.8);

      const baseX = alongBand;
      const baseY = alongBand * Math.tan(bandAngle) + perpOffset + 0.3;

      return {
        x: baseX,
        y: baseY,
        size: Math.random() < 0.05 ? Math.random() * 2.5 + 1.5 : Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        hue: Math.random() < 0.3 ? 220 + Math.random() * 60 : (Math.random() < 0.5 ? 30 + Math.random() * 20 : 0),
        saturation: Math.random() * 30 + 10,
      };
    });

    // Nebula clouds along the milky way band
    const nebulae: Nebula[] = [
      { x: 0.2, y: 0.35, rx: 250, ry: 80, rotation: 15, hue: 270, opacity: 0.04, rotSpeed: 0.0001 },
      { x: 0.45, y: 0.42, rx: 300, ry: 100, rotation: 10, hue: 220, opacity: 0.035, rotSpeed: -0.00008 },
      { x: 0.7, y: 0.5, rx: 280, ry: 90, rotation: 18, hue: 320, opacity: 0.03, rotSpeed: 0.00012 },
      { x: 0.35, y: 0.4, rx: 200, ry: 120, rotation: -5, hue: 200, opacity: 0.025, rotSpeed: -0.0001 },
      { x: 0.6, y: 0.45, rx: 220, ry: 70, rotation: 12, hue: 280, opacity: 0.03, rotSpeed: 0.00006 },
      { x: 0.85, y: 0.55, rx: 180, ry: 90, rotation: 20, hue: 350, opacity: 0.025, rotSpeed: -0.00007 },
    ];

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / window.innerWidth;
      mouseRef.current.targetY = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;

    const animate = () => {
      const w = canvas.width;
      const h = canvas.height;
      time++;

      // Smooth mouse follow
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.03;
      m.y += (m.targetY - m.y) * 0.03;

      // Parallax offset
      const px = (m.x - 0.5) * 30;
      const py = (m.y - 0.5) * 20;

      // Dark space background
      ctx.fillStyle = "hsl(240, 10%, 3%)";
      ctx.fillRect(0, 0, w, h);

      // Draw milky way band glow
      ctx.save();
      ctx.translate(px * 0.3, py * 0.3);
      const bandGrad = ctx.createLinearGradient(0, h * 0.2, w, h * 0.7);
      bandGrad.addColorStop(0, "hsla(220, 40%, 15%, 0)");
      bandGrad.addColorStop(0.3, "hsla(250, 30%, 12%, 0.08)");
      bandGrad.addColorStop(0.5, "hsla(270, 35%, 15%, 0.12)");
      bandGrad.addColorStop(0.7, "hsla(300, 25%, 12%, 0.06)");
      bandGrad.addColorStop(1, "hsla(220, 40%, 15%, 0)");
      ctx.fillStyle = bandGrad;
      ctx.fillRect(-50, -50, w + 100, h + 100);
      ctx.restore();

      // Draw nebulae
      nebulae.forEach((neb) => {
        neb.rotation += neb.rotSpeed;
        const nx = neb.x * w + px * 0.5;
        const ny = neb.y * h + py * 0.5;

        ctx.save();
        ctx.translate(nx, ny);
        ctx.rotate((neb.rotation * Math.PI) / 180);

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, neb.rx);
        grad.addColorStop(0, `hsla(${neb.hue}, 50%, 40%, ${neb.opacity * 1.5})`);
        grad.addColorStop(0.4, `hsla(${neb.hue}, 40%, 30%, ${neb.opacity})`);
        grad.addColorStop(1, `hsla(${neb.hue}, 30%, 20%, 0)`);

        ctx.scale(1, neb.ry / neb.rx);
        ctx.beginPath();
        ctx.arc(0, 0, neb.rx, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
      });

      // Draw stars
      stars.forEach((star) => {
        const sx = star.x * w + px * (star.size > 1.5 ? 0.8 : 0.4);
        const sy = star.y * h + py * (star.size > 1.5 ? 0.8 : 0.4);

        if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) return;

        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const alpha = star.opacity * (0.6 + twinkle * 0.4);

        // Star core
        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}%, 90%, ${alpha})`;
        ctx.fill();

        // Star glow for brighter stars
        if (star.size > 1.2) {
          ctx.beginPath();
          ctx.arc(sx, sy, star.size * 4, 0, Math.PI * 2);
          const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, star.size * 4);
          glow.addColorStop(0, `hsla(${star.hue}, ${star.saturation}%, 80%, ${alpha * 0.25})`);
          glow.addColorStop(1, `hsla(${star.hue}, ${star.saturation}%, 80%, 0)`);
          ctx.fillStyle = glow;
          ctx.fill();

          // Cross-shaped diffraction spikes for biggest stars
          if (star.size > 2) {
            ctx.strokeStyle = `hsla(${star.hue}, ${star.saturation}%, 90%, ${alpha * 0.15})`;
            ctx.lineWidth = 0.5;
            const spikeLen = star.size * 8;
            ctx.beginPath();
            ctx.moveTo(sx - spikeLen, sy);
            ctx.lineTo(sx + spikeLen, sy);
            ctx.moveTo(sx, sy - spikeLen);
            ctx.lineTo(sx, sy + spikeLen);
            ctx.stroke();
          }
        }
      });

      // Subtle vignette
      const vigGrad = ctx.createRadialGradient(w / 2, h / 2, w * 0.25, w / 2, h / 2, w * 0.75);
      vigGrad.addColorStop(0, "transparent");
      vigGrad.addColorStop(1, "hsla(240, 10%, 2%, 0.5)");
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, w, h);

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

export default MilkyWayBackground;
