import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { artCategories } from "@/data/artCategories";
import OctagonParticles from "./OctagonParticles";
import OctagonGlowRing from "./OctagonGlowRing";
import ZodiacConstellations from "./ZodiacConstellations";

const SEGMENT_COLORS = [
  "from-egregora-blue to-egregora-teal",
  "from-egregora-purple to-egregora-blue",
  "from-egregora-magenta to-egregora-purple",
  "from-egregora-red to-egregora-magenta",
  "from-egregora-orange to-egregora-red",
  "from-egregora-yellow to-egregora-orange",
  "from-egregora-green to-egregora-yellow",
  "from-egregora-teal to-egregora-green",
];

const OctagonNav = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [centerHovered, setCenterHovered] = useState(false);
  const navigate = useNavigate();

  const hoveredCategory = hoveredIndex !== null ? artCategories[hoveredIndex] : null;

  // Octagon points for clipping segments
  const size = 400;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 4;
  const innerR = outerR * 0.52;
  const centerR = outerR * 0.32;

  const getPoint = (angle: number, r: number) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  // 3D pyramid: each segment has a main face, a light bevel edge, and a shadow edge
  const segments = artCategories.map((cat, i) => {
    const startAngle = i * 45 - 22.5;
    const endAngle = startAngle + 45;
    const midAngle = startAngle + 22.5;
    const steps = 8;

    // Main face path
    const outerPoints: string[] = [];
    const innerPoints: string[] = [];
    for (let s = 0; s <= steps; s++) {
      const a = startAngle + (endAngle - startAngle) * (s / steps);
      outerPoints.push((() => { const p = getPoint(a, outerR); return `${p.x},${p.y}`; })());
    }
    for (let s = steps; s >= 0; s--) {
      const a = startAngle + (endAngle - startAngle) * (s / steps);
      innerPoints.push((() => { const p = getPoint(a, innerR); return `${p.x},${p.y}`; })());
    }
    const pathData = `M ${outerPoints[0]} ${outerPoints.map((p) => `L ${p}`).join(" ")} ${innerPoints.map((p) => `L ${p}`).join(" ")} Z`;

    // Left edge (bevel highlight)
    const oStart = getPoint(startAngle, outerR);
    const iStart = getPoint(startAngle, innerR);
    const oStartInset = getPoint(startAngle + 2, outerR - 6);
    const iStartInset = getPoint(startAngle + 2, innerR + 4);
    const leftBevel = `M ${oStart.x},${oStart.y} L ${oStartInset.x},${oStartInset.y} L ${iStartInset.x},${iStartInset.y} L ${iStart.x},${iStart.y} Z`;

    // Right edge (shadow)
    const oEnd = getPoint(endAngle, outerR);
    const iEnd = getPoint(endAngle, innerR);
    const oEndInset = getPoint(endAngle - 2, outerR - 6);
    const iEndInset = getPoint(endAngle - 2, innerR + 4);
    const rightBevel = `M ${oEnd.x},${oEnd.y} L ${oEndInset.x},${oEndInset.y} L ${iEndInset.x},${iEndInset.y} L ${iEnd.x},${iEnd.y} Z`;

    // Top edge (outer bevel - catches light)
    const topBevelPoints: string[] = [];
    const topBevelInner: string[] = [];
    for (let s = 0; s <= steps; s++) {
      const a = startAngle + (endAngle - startAngle) * (s / steps);
      topBevelPoints.push((() => { const p = getPoint(a, outerR); return `${p.x},${p.y}`; })());
      topBevelInner.push((() => { const p = getPoint(a, outerR - 8); return `${p.x},${p.y}`; })());
    }
    const topBevel = `M ${topBevelPoints[0]} ${topBevelPoints.map(p => `L ${p}`).join(" ")} ${[...topBevelInner].reverse().map(p => `L ${p}`).join(" ")} Z`;

    // Bottom edge (inner bevel - in shadow)
    const bottomBevelPoints: string[] = [];
    const bottomBevelInner: string[] = [];
    for (let s = 0; s <= steps; s++) {
      const a = startAngle + (endAngle - startAngle) * (s / steps);
      bottomBevelPoints.push((() => { const p = getPoint(a, innerR); return `${p.x},${p.y}`; })());
      bottomBevelInner.push((() => { const p = getPoint(a, innerR + 6); return `${p.x},${p.y}`; })());
    }
    const bottomBevel = `M ${bottomBevelPoints[0]} ${bottomBevelPoints.map(p => `L ${p}`).join(" ")} ${[...bottomBevelInner].reverse().map(p => `L ${p}`).join(" ")} Z`;

    const labelR = (outerR + innerR) / 2;
    const labelPos = getPoint(midAngle, labelR);

    return { cat, pathData, leftBevel, rightBevel, topBevel, bottomBevel, labelPos, labelAngle: midAngle, index: i, midAngle };
  });

  // Depth layers — concentric rings between innerR and centerR to simulate tunnel
  const depthLayers = 6;
  const depthRings = Array.from({ length: depthLayers }, (_, d) => {
    const t = d / depthLayers;
    const tNext = (d + 1) / depthLayers;
    const rOuter = innerR - t * (innerR - centerR - 4);
    const rInner = innerR - tNext * (innerR - centerR - 4);
    return { rOuter, rInner, depth: t, index: d };
  });

  return (
    <div className="relative flex items-center justify-center" style={{ perspective: "900px" }}>
      {/* Particles layer */}
      <div className="absolute w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] md:w-[580px] md:h-[580px] lg:w-[660px] lg:h-[660px]">
        <OctagonParticles active={hoveredIndex !== null || centerHovered} />
      </div>

      <svg
        viewBox="-60 -60 520 520"
        className="w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] md:w-[580px] md:h-[580px] lg:w-[660px] lg:h-[660px] relative z-10"
        style={{ transformStyle: "preserve-3d", transform: "rotateX(2deg)" }}
        role="navigation"
        aria-label="Navegação principal por tipo de arte"
      >
        <defs>
          {segments.map(({ index, midAngle }) => {
            const colors = [
              "#1a9e6e", "#2196c9", "#7b42d9", "#d94290",
              "#d94242", "#e88a1a", "#e8c71a", "#1a9e8e"
            ];
            // Directional gradient to simulate light from top-left
            const lightAngle = midAngle - 90;
            const rad = (lightAngle * Math.PI) / 180;
            const x1 = 50 - Math.cos(rad) * 50;
            const y1 = 50 - Math.sin(rad) * 50;
            const x2 = 50 + Math.cos(rad) * 50;
            const y2 = 50 + Math.sin(rad) * 50;
            const isHovered = hoveredIndex === index;
            return (
              <linearGradient key={index} id={`seg-grad-${index}`} x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}>
                <stop offset="0%" stopColor={colors[index]} stopOpacity={isHovered ? 1 : 0.6} />
                <stop offset="50%" stopColor={colors[index]} stopOpacity={isHovered ? 0.8 : 0.35} />
                <stop offset="100%" stopColor={colors[(index + 1) % 8]} stopOpacity={isHovered ? 0.6 : 0.2} />
              </linearGradient>
            );
          })}
          <radialGradient id="center-grad" cx="50%" cy="40%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity={centerHovered ? 0.95 : 0.35} />
            <stop offset="60%" stopColor="#7b42d9" stopOpacity={centerHovered ? 0.7 : 0.2} />
            <stop offset="100%" stopColor="#d94290" stopOpacity={centerHovered ? 0.5 : 0.1} />
          </radialGradient>
          {/* Depth tunnel gradients */}
          {depthRings.map(({ index: di, depth }) => {
            const segColors = ["#1a9e6e","#2196c9","#7b42d9","#d94290","#d94242","#e88a1a","#e8c71a","#1a9e8e"];
            return segColors.map((col, si) => (
              <radialGradient key={`depth-${di}-${si}`} id={`depth-grad-${di}-${si}`} cx="50%" cy="50%">
                <stop offset="0%" stopColor={col} stopOpacity={Math.max(0.02, 0.12 - depth * 0.12)} />
                <stop offset="100%" stopColor={col} stopOpacity={Math.max(0.01, 0.06 - depth * 0.06)} />
              </radialGradient>
            ));
          })}
          {/* Abyss gradient — deep center */}
          <radialGradient id="abyss-grad" cx="50%" cy="50%">
            <stop offset="0%" stopColor="hsl(260,20%,3%)" stopOpacity="0.9" />
            <stop offset="40%" stopColor="hsl(250,15%,5%)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="hsl(240,10%,8%)" stopOpacity="0" />
          </radialGradient>
          {/* 3D lighting filter */}
          <filter id="bevel-shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
            <feOffset in="blur" dx="1" dy="2" result="offsetBlur" />
            <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
          </filter>
        </defs>

        {/* Background octagon outline */}
        <polygon
          points={Array.from({ length: 8 }, (_, i) => {
            const p = getPoint(i * 45, outerR + 2);
            return `${p.x},${p.y}`;
          }).join(" ")}
          fill="none"
          stroke="hsl(240 6% 18%)"
          strokeWidth="1"
        />

        {/* Glow ring effects */}
        <OctagonGlowRing hoveredIndex={hoveredIndex} />

        {/* ── Depth tunnel — concentric rings creating cone-to-infinity illusion ── */}
        {/* Abyss background — dark void in the center */}
        <circle cx={cx} cy={cy} r={innerR + 2} fill="url(#abyss-grad)" className="pointer-events-none" />
        
        {/* Concentric depth rings per segment */}
        {depthRings.map(({ rOuter, rInner, depth, index: di }) => {
          const segColors = ["#1a9e6e","#2196c9","#7b42d9","#d94290","#d94242","#e88a1a","#e8c71a","#1a9e8e"];
          return (
            <g key={`depth-ring-${di}`} className="pointer-events-none">
              {artCategories.map((_, si) => {
                const startAngle = si * 45 - 22.5;
                const endAngle = startAngle + 45;
                const steps = 6;
                const outerPts: string[] = [];
                const innerPts: string[] = [];
                for (let s = 0; s <= steps; s++) {
                  const a = startAngle + (endAngle - startAngle) * (s / steps);
                  const po = getPoint(a, rOuter);
                  outerPts.push(`${po.x},${po.y}`);
                  const pi = getPoint(a, rInner);
                  innerPts.push(`${pi.x},${pi.y}`);
                }
                const ringPath = `M ${outerPts[0]} ${outerPts.map(p => `L ${p}`).join(" ")} ${[...innerPts].reverse().map(p => `L ${p}`).join(" ")} Z`;
                
                const isSegHov = hoveredIndex === si;
                const baseOpacity = Math.max(0.03, 0.18 - depth * 0.16);
                const opacity = isSegHov ? baseOpacity * 2.5 : baseOpacity;
                const lightness = Math.max(4, 16 - depth * 14);
                const breatheDelay = (di * 0.4 + si * 0.15).toFixed(2);
                
                return (
                  <path
                    key={`d-${di}-${si}`}
                    d={ringPath}
                    fill={segColors[si]}
                    fillOpacity={opacity}
                    stroke={`hsla(240,6%,${lightness}%,${Math.max(0.05, 0.2 - depth * 0.18)})`}
                    strokeWidth="0.5"
                    className="transition-all duration-500"
                    style={{
                      animation: `tunnel-breathe ${3 + di * 0.5}s ease-in-out ${breatheDelay}s infinite`,
                    }}
                  />
                );
              })}
              {/* Ring edge highlight — concentric octagon line */}
              <polygon
                points={Array.from({ length: 8 }, (_, i) => {
                  const p = getPoint(i * 45, rInner);
                  return `${p.x},${p.y}`;
                }).join(" ")}
                fill="none"
                stroke={`hsla(260,20%,30%,${Math.max(0.03, 0.15 - depth * 0.13)})`}
                strokeWidth="0.6"
              />
            </g>
          );
        })}

        {/* Segments — 3D pyramid sections */}
        {segments.map(({ cat, pathData, leftBevel, rightBevel, topBevel, bottomBevel, labelPos, labelAngle, index }) => {
          const isHov = hoveredIndex === index;
          const segColors = ["#1a9e6e","#2196c9","#7b42d9","#d94290","#d94242","#e88a1a","#e8c71a","#1a9e8e"];
          return (
            <g
              key={cat.id}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => navigate(`/${cat.slug}`)}
              role="button"
              tabIndex={0}
              aria-label={`Explorar ${cat.name}`}
              onKeyDown={(e) => e.key === "Enter" && navigate(`/${cat.slug}`)}
              style={{
                transform: isHov ? `scale(1.04)` : "scale(1)",
                transformOrigin: `${cx}px ${cy}px`,
                transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              {/* Main face */}
              <path
                d={pathData}
                fill={`url(#seg-grad-${index})`}
                stroke="hsl(240 6% 10%)"
                strokeWidth="0.8"
                className="transition-all duration-300"
                style={{
                  filter: isHov
                    ? `brightness(1.4) drop-shadow(0 0 18px rgba(123,66,217,0.4)) drop-shadow(0 0 6px ${segColors[index]}88)`
                    : "brightness(0.9)",
                  transition: "filter 0.4s ease",
                }}
              />
              {/* Top bevel — light edge (outer rim catches light) */}
              <path
                d={topBevel}
                fill={isHov ? "hsla(0,0%,100%,0.18)" : "hsla(0,0%,100%,0.08)"}
                className="pointer-events-none transition-all duration-300"
              />
              {/* Bottom bevel — shadow edge (inner rim in shadow) */}
              <path
                d={bottomBevel}
                fill={isHov ? "hsla(0,0%,0%,0.25)" : "hsla(0,0%,0%,0.15)"}
                className="pointer-events-none transition-all duration-300"
              />
              {/* Left bevel — highlight */}
              <path
                d={leftBevel}
                fill={isHov ? "hsla(0,0%,100%,0.14)" : "hsla(0,0%,100%,0.05)"}
                className="pointer-events-none transition-all duration-300"
              />
              {/* Right bevel — shadow */}
              <path
                d={rightBevel}
                fill={isHov ? "hsla(0,0%,0%,0.2)" : "hsla(0,0%,0%,0.1)"}
                className="pointer-events-none transition-all duration-300"
              />
              {/* Segment divider line — crisp edge */}
              <path
                d={(() => {
                  const oS = getPoint(index * 45 - 22.5, outerR);
                  const iS = getPoint(index * 45 - 22.5, innerR);
                  return `M ${oS.x},${oS.y} L ${iS.x},${iS.y}`;
                })()}
                stroke={isHov ? "hsla(0,0%,100%,0.15)" : "hsla(0,0%,100%,0.06)"}
                strokeWidth="1"
                className="pointer-events-none transition-all duration-300"
              />
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={isHov ? "#fff" : "hsl(40 20% 85%)"}
                fontSize="12"
                fontFamily="Outfit, sans-serif"
                fontWeight={isHov ? "600" : "400"}
                className="pointer-events-none select-none transition-all duration-200"
                style={{
                  textShadow: isHov ? "0 2px 6px rgba(0,0,0,0.7)" : "0 1px 3px rgba(0,0,0,0.4)",
                }}
              >
                {cat.name}
              </text>
            </g>
          );
        })}

        {/* Center - Transmídia (3D dome) */}
        <circle
          cx={cx}
          cy={cy}
          r={centerR}
          fill="url(#center-grad)"
          stroke={centerHovered ? "hsl(280 60% 55%)" : "hsl(240 6% 22%)"}
          strokeWidth="2"
          className="cursor-pointer transition-all duration-500"
          style={{
            animation: centerHovered ? "breathe 2s ease-in-out infinite" : "none",
            filter: centerHovered ? "drop-shadow(0 0 24px rgba(123,66,217,0.6))" : "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
          }}
          onMouseEnter={() => setCenterHovered(true)}
          onMouseLeave={() => setCenterHovered(false)}
          onClick={() => navigate("/transmidia")}
          role="button"
          tabIndex={0}
          aria-label="Explorar Transmídia"
          onKeyDown={(e) => e.key === "Enter" && navigate("/transmidia")}
        />
        {/* Dome highlight */}
        <ellipse
          cx={cx - centerR * 0.15}
          cy={cy - centerR * 0.2}
          rx={centerR * 0.5}
          ry={centerR * 0.35}
          fill="hsla(0,0%,100%,0.08)"
          className="pointer-events-none"
          style={{ transition: "opacity 0.3s", opacity: centerHovered ? 0.15 : 0.06 }}
        />
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          dominantBaseline="central"
          fill={centerHovered ? "#fff" : "hsl(40 20% 80%)"}
          fontSize="13"
          fontFamily="Outfit, sans-serif"
          fontWeight="600"
          className="pointer-events-none select-none"
          letterSpacing="0.1em"
        >
          TRANSMÍDIA
        </text>
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          dominantBaseline="central"
          fill="hsl(40 20% 60%)"
          fontSize="9"
          fontFamily="Outfit, sans-serif"
          fontWeight="300"
          className="pointer-events-none select-none"
        >
          núcleo central
        </text>
        {/* Zodiac Constellations */}
        <ZodiacConstellations hoveredIndex={hoveredIndex} />
      </svg>

      {/* Hover info panel */}
      <AnimatePresence>
        {hoveredCategory && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute -bottom-24 left-1/2 -translate-x-1/2 glass-panel rounded-lg px-6 py-3 text-center max-w-xs z-10"
          >
            <p className="font-display text-lg text-foreground">{hoveredCategory.name}</p>
            <p className="text-sm text-muted-foreground mt-1">{hoveredCategory.tagline}</p>
          </motion.div>
        )}
        {centerHovered && !hoveredCategory && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute -bottom-24 left-1/2 -translate-x-1/2 glass-panel rounded-lg px-6 py-3 text-center max-w-xs z-10"
          >
            <p className="font-display text-lg gradient-egregora-text">Transmídia</p>
            <p className="text-sm text-muted-foreground mt-1">Experiência imersiva de museu digital</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OctagonNav;
