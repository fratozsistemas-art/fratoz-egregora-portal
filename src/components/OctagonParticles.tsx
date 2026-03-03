import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  hue: number;
  life: number;
  maxLife: number;
}

const OctagonParticles = ({ active = false }: { active?: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  // Track active via ref so toggling it never restarts the animation loop
  const activeRef = useRef(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 560;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 30;

    const hues = [150, 220, 270, 320, 0, 25, 45, 180];

    const spawnParticle = (): Particle => {
      const angle = Math.random() * Math.PI * 2;
      const r = radius * (0.45 + Math.random() * 0.55);
      const hue = hues[Math.floor(Math.random() * hues.length)];
      return {
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.15,
        size: Math.random() * 2.5 + 0.5,
        opacity: 0,
        hue,
        life: 0,
        maxLife: 80 + Math.random() * 120,
      };
    };

    const animate = () => {
      ctx.clearRect(0, 0, size, size);

      // Spawn new particles — read from ref so active changes don't restart loop
      const isActive = activeRef.current;
      const targetCount = isActive ? 40 : 18;
      while (particlesRef.current.length < targetCount) {
        particlesRef.current.push(spawnParticle());
      }

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        const progress = p.life / p.maxLife;
        p.opacity = progress < 0.2 ? progress * 5 : progress > 0.8 ? (1 - progress) * 5 : 1;
        p.opacity *= isActive ? 0.7 : 0.35;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${p.opacity})`;
        ctx.fill();

        // Glow
        if (p.size > 1.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
          grad.addColorStop(0, `hsla(${p.hue}, 80%, 65%, ${p.opacity * 0.3})`);
          grad.addColorStop(1, `hsla(${p.hue}, 80%, 65%, 0)`);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        return p.life < p.maxLife;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default OctagonParticles;
