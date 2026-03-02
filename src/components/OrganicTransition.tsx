import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface OrganicTransitionProps {
  active: boolean;
  targetPath: string;
  originX: number;
  originY: number;
  mouseX: number;
  mouseY: number;
  onComplete?: () => void;
}

const OrganicTransition = ({
  active,
  targetPath,
  originX,
  originY,
  mouseX,
  mouseY,
  onComplete,
}: OrganicTransitionProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const animRef = useRef<number>(0);
  const [phase, setPhase] = useState<"idle" | "expanding" | "done">("idle");

  useEffect(() => {
    if (!active || phase !== "idle") return;
    setPhase("expanding");

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Direction vector from origin to mouse
    const dx = mouseX - originX;
    const dy = mouseY - originY;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const dirX = dx / dist;
    const dirY = dy / dist;

    // Max radius needed to cover screen
    const maxR =
      Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height) * 0.8;

    const startTime = performance.now();
    const duration = 900; // ms
    const blobPoints = 12;

    // Generate organic noise offsets for each blob point
    const noiseSeeds = Array.from({ length: blobPoints }, () => ({
      amp: 0.08 + Math.random() * 0.15,
      freq: 1.5 + Math.random() * 2,
      phase: Math.random() * Math.PI * 2,
    }));

    const colors = [
      "hsla(280, 60%, 45%, 1)",
      "hsla(320, 70%, 40%, 1)",
      "hsla(260, 50%, 35%, 1)",
    ];

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);

      // Easing: fast start, smooth end
      const ease = 1 - Math.pow(1 - t, 3);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentR = ease * maxR;

      // Center shifts toward mouse direction as it expands
      const shiftAmount = ease * maxR * 0.15;
      const cx = originX + dirX * shiftAmount;
      const cy = originY + dirY * shiftAmount;

      // Draw multiple layered blobs for depth
      for (let layer = 2; layer >= 0; layer--) {
        const layerScale = 1 + layer * 0.06;
        const layerR = currentR * layerScale;
        const timeOffset = elapsed / 1000;

        ctx.beginPath();
        for (let i = 0; i <= blobPoints * 4; i++) {
          const angle = (i / (blobPoints * 4)) * Math.PI * 2;
          const idx = i % blobPoints;
          const noise = noiseSeeds[idx];

          // Organic distortion based on angle relative to mouse direction
          const mouseAngle = Math.atan2(dirY, dirX);
          const angleDiff = angle - mouseAngle;
          const mouseInfluence = 1 + 0.25 * Math.cos(angleDiff) * ease;

          // Organic wobble
          const wobble =
            1 +
            noise.amp *
              Math.sin(angle * noise.freq + noise.phase + timeOffset * 3) *
              (1 - t * 0.5);

          const r = layerR * wobble * mouseInfluence;
          const px = cx + Math.cos(angle) * r;
          const py = cy + Math.sin(angle) * r;

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();

        ctx.fillStyle = colors[layer];
        ctx.fill();
      }

      // Fading glow at leading edge
      if (t < 0.7) {
        const glowR = currentR * 0.3;
        const glowX = cx + dirX * currentR * 0.8;
        const glowY = cy + dirY * currentR * 0.8;
        const grd = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, glowR);
        grd.addColorStop(0, `hsla(280, 80%, 60%, ${0.4 * (1 - t)})`);
        grd.addColorStop(1, "hsla(280, 80%, 60%, 0)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        // Navigate after animation completes
        navigate(targetPath);
        setPhase("done");
        onComplete?.();
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [active, phase, originX, originY, mouseX, mouseY, navigate, targetPath, onComplete]);

  if (!active && phase === "idle") return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
};

export default OrganicTransition;
