import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number; // depth layer
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  hue: number;
  saturation: number;
  lightness: number;
}

interface NebulaCloud {
  x: number;
  y: number;
  rx: number;
  ry: number;
  rotation: number;
  hue: number;
  saturation: number;
  lightness: number;
  opacity: number;
  driftX: number;
  driftY: number;
  pulseSpeed: number;
  pulseOffset: number;
  layers: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const MilkyWayBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });
  const animRef = useRef<number>(0);
  const shootingStarsRef = useRef<ShootingStar[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let w = 0, h = 0;
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ── Stars ──
    const starCount = Math.min(1200, Math.floor((window.innerWidth * window.innerHeight) / 1800));
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      // Milky way band: diagonal from bottom-left to upper-right
      const isBand = Math.random() < 0.55;
      let sx: number, sy: number;

      if (isBand) {
        const t = Math.random();
        const bandCenter = t;
        const spread = 0.12 + Math.random() * 0.15;
        sx = t;
        sy = bandCenter * 0.4 + 0.25 + (Math.random() - 0.5) * spread;
      } else {
        sx = Math.random();
        sy = Math.random();
      }

      const colorRoll = Math.random();
      let hue: number, sat: number, lit: number;
      if (colorRoll < 0.15) { hue = 220 + Math.random() * 30; sat = 60 + Math.random() * 30; lit = 80; }       // blue
      else if (colorRoll < 0.25) { hue = 30 + Math.random() * 20; sat = 70 + Math.random() * 20; lit = 85; }    // warm
      else if (colorRoll < 0.32) { hue = 0 + Math.random() * 15; sat = 50 + Math.random() * 30; lit = 82; }     // red giants
      else if (colorRoll < 0.36) { hue = 270 + Math.random() * 20; sat = 40 + Math.random() * 20; lit = 85; }   // violet
      else { hue = 50; sat = 5 + Math.random() * 15; lit = 90 + Math.random() * 10; }                            // white

      stars.push({
        x: sx, y: sy,
        z: Math.random(),
        size: isBand
          ? (Math.random() < 0.03 ? 2 + Math.random() * 2 : Math.random() * 1.4 + 0.2)
          : (Math.random() < 0.02 ? 1.8 + Math.random() * 1.5 : Math.random() * 1.0 + 0.2),
        baseOpacity: isBand ? 0.5 + Math.random() * 0.5 : 0.3 + Math.random() * 0.5,
        twinkleSpeed: 0.003 + Math.random() * 0.025,
        twinkleOffset: Math.random() * Math.PI * 2,
        hue, saturation: sat, lightness: lit,
      });
    }

    // ── Nebulae ── richer, multi-layered
    const nebulae: NebulaCloud[] = [
      // Main milky way band nebulae
      { x: 0.15, y: 0.32, rx: 320, ry: 110, rotation: 12, hue: 280, saturation: 50, lightness: 35, opacity: 0.06, driftX: 0.008, driftY: 0.003, pulseSpeed: 0.008, pulseOffset: 0, layers: 3 },
      { x: 0.3, y: 0.36, rx: 250, ry: 140, rotation: 8, hue: 220, saturation: 55, lightness: 30, opacity: 0.05, driftX: -0.005, driftY: 0.004, pulseSpeed: 0.006, pulseOffset: 1, layers: 3 },
      { x: 0.5, y: 0.42, rx: 380, ry: 130, rotation: 15, hue: 260, saturation: 45, lightness: 38, opacity: 0.07, driftX: 0.006, driftY: -0.003, pulseSpeed: 0.005, pulseOffset: 2, layers: 4 },
      { x: 0.65, y: 0.46, rx: 290, ry: 100, rotation: -8, hue: 310, saturation: 40, lightness: 32, opacity: 0.05, driftX: -0.007, driftY: 0.005, pulseSpeed: 0.007, pulseOffset: 3, layers: 3 },
      { x: 0.8, y: 0.52, rx: 260, ry: 120, rotation: 20, hue: 340, saturation: 45, lightness: 30, opacity: 0.04, driftX: 0.004, driftY: -0.004, pulseSpeed: 0.009, pulseOffset: 4, layers: 2 },
      { x: 0.92, y: 0.56, rx: 200, ry: 90, rotation: 5, hue: 200, saturation: 50, lightness: 28, opacity: 0.04, driftX: -0.006, driftY: 0.002, pulseSpeed: 0.004, pulseOffset: 5, layers: 2 },
      // Accent nebulae — bright emission patches
      { x: 0.38, y: 0.38, rx: 120, ry: 60, rotation: 30, hue: 350, saturation: 60, lightness: 45, opacity: 0.045, driftX: 0.003, driftY: -0.002, pulseSpeed: 0.01, pulseOffset: 0.5, layers: 2 },
      { x: 0.55, y: 0.44, rx: 100, ry: 80, rotation: -15, hue: 180, saturation: 55, lightness: 40, opacity: 0.035, driftX: -0.004, driftY: 0.003, pulseSpeed: 0.012, pulseOffset: 1.5, layers: 2 },
      // Dark nebula (absorption)
      { x: 0.42, y: 0.40, rx: 180, ry: 50, rotation: 10, hue: 240, saturation: 10, lightness: 5, opacity: 0.08, driftX: 0.002, driftY: -0.001, pulseSpeed: 0.003, pulseOffset: 3, layers: 2 },
    ];

    // ── Dust lane (dark rift along milky way) ──
    const drawDustLane = (time: number, px: number, py: number) => {
      ctx.save();
      ctx.translate(px * 0.2, py * 0.2);
      ctx.globalCompositeOperation = "multiply";
      
      const points = [
        { x: w * 0.05, y: h * 0.38 },
        { x: w * 0.25, y: h * 0.35 },
        { x: w * 0.45, y: h * 0.40 },
        { x: w * 0.65, y: h * 0.44 },
        { x: w * 0.85, y: h * 0.50 },
        { x: w * 1.05, y: h * 0.54 },
      ];

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y - 30);
      for (let i = 1; i < points.length; i++) {
        const xc = (points[i - 1].x + points[i].x) / 2;
        const yc = (points[i - 1].y + points[i].y) / 2;
        ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y - 20 + Math.sin(time * 0.001 + i) * 5, xc, yc - 20);
      }
      for (let i = points.length - 1; i >= 0; i--) {
        const xc = i > 0 ? (points[i - 1].x + points[i].x) / 2 : points[0].x;
        const yc = i > 0 ? (points[i - 1].y + points[i].y) / 2 : points[0].y;
        ctx.quadraticCurveTo(points[i].x, points[i].y + 25 + Math.sin(time * 0.001 + i) * 3, xc, yc + 25);
      }
      ctx.closePath();
      ctx.fillStyle = "hsla(240, 10%, 3%, 0.4)";
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
      ctx.restore();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.tx = e.clientX / window.innerWidth;
      mouseRef.current.ty = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;

    const animate = () => {
      time++;
      const m = mouseRef.current;
      m.x += (m.tx - m.x) * 0.02;
      m.y += (m.ty - m.y) * 0.02;

      const px = (m.x - 0.5) * 40;
      const py = (m.y - 0.5) * 25;

      // Cinematic slow drift
      const driftX = Math.sin(time * 0.0003) * 15;
      const driftY = Math.cos(time * 0.00025) * 10;

      // Deep space background with gradient
      const bgGrad = ctx.createRadialGradient(w * 0.4, h * 0.4, 0, w * 0.5, h * 0.5, w * 0.8);
      bgGrad.addColorStop(0, "hsl(245, 15%, 6%)");
      bgGrad.addColorStop(0.5, "hsl(240, 12%, 4%)");
      bgGrad.addColorStop(1, "hsl(235, 10%, 2%)");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // ── Milky way band diffuse glow ──
      ctx.save();
      ctx.translate(px * 0.15 + driftX * 0.5, py * 0.15 + driftY * 0.5);
      for (let layer = 0; layer < 3; layer++) {
        const bandGrad = ctx.createLinearGradient(
          w * -0.1, h * (0.15 + layer * 0.03),
          w * 1.1, h * (0.65 + layer * 0.03)
        );
        bandGrad.addColorStop(0, "hsla(220, 30%, 20%, 0)");
        bandGrad.addColorStop(0.2, `hsla(240, 25%, 18%, ${0.03 + layer * 0.01})`);
        bandGrad.addColorStop(0.4, `hsla(260, 30%, 22%, ${0.06 + layer * 0.015})`);
        bandGrad.addColorStop(0.5, `hsla(270, 35%, 25%, ${0.07 + layer * 0.015})`);
        bandGrad.addColorStop(0.6, `hsla(290, 25%, 20%, ${0.05 + layer * 0.01})`);
        bandGrad.addColorStop(0.8, `hsla(320, 20%, 18%, ${0.03 + layer * 0.008})`);
        bandGrad.addColorStop(1, "hsla(220, 30%, 15%, 0)");
        ctx.fillStyle = bandGrad;
        ctx.fillRect(-100, -100, w + 200, h + 200);
      }
      ctx.restore();

      // ── Draw nebulae ──
      ctx.save();
      nebulae.forEach((neb) => {
        const nebulaX = neb.x * w + px * 0.4 + driftX * 0.6 + Math.sin(time * neb.driftX) * 20;
        const nebulaY = neb.y * h + py * 0.4 + driftY * 0.6 + Math.cos(time * neb.driftY) * 15;
        const pulse = 1 + Math.sin(time * neb.pulseSpeed + neb.pulseOffset) * 0.08;
        const isDark = neb.lightness < 10;

        for (let l = 0; l < neb.layers; l++) {
          ctx.save();
          ctx.translate(nebulaX, nebulaY);
          ctx.rotate(((neb.rotation + l * 15 + time * 0.003) * Math.PI) / 180);

          const scaleX = (neb.rx + l * 30) * pulse / neb.rx;
          const scaleY = (neb.ry + l * 20) * pulse / neb.rx;
          ctx.scale(scaleX, scaleY);

          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, neb.rx);
          if (isDark) {
            grad.addColorStop(0, `hsla(${neb.hue}, ${neb.saturation}%, ${neb.lightness}%, ${neb.opacity * 1.2})`);
            grad.addColorStop(0.5, `hsla(${neb.hue}, ${neb.saturation}%, ${neb.lightness}%, ${neb.opacity * 0.8})`);
            grad.addColorStop(1, `hsla(${neb.hue}, ${neb.saturation}%, ${neb.lightness}%, 0)`);
          } else {
            const layerFade = 1 - l * 0.25;
            grad.addColorStop(0, `hsla(${neb.hue + l * 10}, ${neb.saturation}%, ${neb.lightness + 15}%, ${neb.opacity * 1.8 * layerFade})`);
            grad.addColorStop(0.25, `hsla(${neb.hue + l * 5}, ${neb.saturation}%, ${neb.lightness + 5}%, ${neb.opacity * 1.2 * layerFade})`);
            grad.addColorStop(0.6, `hsla(${neb.hue}, ${neb.saturation - 10}%, ${neb.lightness}%, ${neb.opacity * 0.5 * layerFade})`);
            grad.addColorStop(1, `hsla(${neb.hue - 10}, ${neb.saturation - 15}%, ${neb.lightness - 5}%, 0)`);
          }

          ctx.globalCompositeOperation = isDark ? "multiply" : "screen";
          ctx.beginPath();
          ctx.arc(0, 0, neb.rx, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
          ctx.restore();
        }
      });
      ctx.globalCompositeOperation = "source-over";
      ctx.restore();

      // ── Dust lane ──
      drawDustLane(time, px, py);

      // ── Stars ──
      stars.forEach((star) => {
        const parallax = 0.3 + star.z * 0.7;
        const sx = star.x * w + (px + driftX) * parallax;
        const sy = star.y * h + (py + driftY) * parallax;

        if (sx < -20 || sx > w + 20 || sy < -20 || sy > h + 20) return;

        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const alpha = star.baseOpacity * (0.55 + twinkle * 0.45);

        ctx.beginPath();
        ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, ${star.saturation}%, ${star.lightness}%, ${alpha})`;
        ctx.fill();

        if (star.size > 1.3) {
          const glowR = star.size * 5;
          const glow = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowR);
          glow.addColorStop(0, `hsla(${star.hue}, ${star.saturation}%, ${star.lightness}%, ${alpha * 0.3})`);
          glow.addColorStop(0.5, `hsla(${star.hue}, ${star.saturation}%, ${star.lightness - 10}%, ${alpha * 0.08})`);
          glow.addColorStop(1, `hsla(${star.hue}, ${star.saturation}%, ${star.lightness}%, 0)`);
          ctx.beginPath();
          ctx.arc(sx, sy, glowR, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          // Diffraction cross
          if (star.size > 2) {
            const sLen = star.size * 12;
            ctx.strokeStyle = `hsla(${star.hue}, ${star.saturation}%, ${star.lightness}%, ${alpha * 0.12})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(sx - sLen, sy); ctx.lineTo(sx + sLen, sy);
            ctx.moveTo(sx, sy - sLen); ctx.lineTo(sx, sy + sLen);
            ctx.stroke();
            // 45° spikes
            const sLen2 = sLen * 0.5;
            ctx.strokeStyle = `hsla(${star.hue}, ${star.saturation}%, ${star.lightness}%, ${alpha * 0.06})`;
            ctx.beginPath();
            ctx.moveTo(sx - sLen2, sy - sLen2); ctx.lineTo(sx + sLen2, sy + sLen2);
            ctx.moveTo(sx + sLen2, sy - sLen2); ctx.lineTo(sx - sLen2, sy + sLen2);
            ctx.stroke();
          }
        }
      });

      // ── Shooting stars ──
      if (Math.random() < 0.004) {
        const angle = Math.PI * 0.2 + Math.random() * Math.PI * 0.3;
        shootingStarsRef.current.push({
          x: Math.random() * w * 0.8,
          y: Math.random() * h * 0.5,
          vx: Math.cos(angle) * (4 + Math.random() * 4),
          vy: Math.sin(angle) * (3 + Math.random() * 3),
          life: 0,
          maxLife: 30 + Math.random() * 40,
          size: 1 + Math.random() * 1.5,
        });
      }

      shootingStarsRef.current = shootingStarsRef.current.filter((s) => {
        s.life++;
        s.x += s.vx;
        s.y += s.vy;
        const progress = s.life / s.maxLife;
        const alpha = progress < 0.1 ? progress * 10 : 1 - progress;

        // Trail
        const tailLen = 30;
        const grad = ctx.createLinearGradient(
          s.x, s.y, s.x - s.vx * tailLen * 0.3, s.y - s.vy * tailLen * 0.3
        );
        grad.addColorStop(0, `hsla(210, 60%, 90%, ${alpha * 0.8})`);
        grad.addColorStop(1, `hsla(210, 60%, 90%, 0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.size;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * tailLen * 0.3, s.y - s.vy * tailLen * 0.3);
        ctx.stroke();

        // Head glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 2, 0, Math.PI * 2);
        const hGlow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 2);
        hGlow.addColorStop(0, `hsla(200, 70%, 95%, ${alpha * 0.9})`);
        hGlow.addColorStop(1, `hsla(200, 70%, 95%, 0)`);
        ctx.fillStyle = hGlow;
        ctx.fill();

        return s.life < s.maxLife;
      });

      // ── Vignette ──
      const vig = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.8);
      vig.addColorStop(0, "transparent");
      vig.addColorStop(0.7, "hsla(240, 12%, 3%, 0.25)");
      vig.addColorStop(1, "hsla(240, 12%, 2%, 0.6)");
      ctx.fillStyle = vig;
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
