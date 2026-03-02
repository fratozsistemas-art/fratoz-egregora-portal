import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { artCategories } from "@/data/artCategories";
import OctagonParticles from "./OctagonParticles";
import OctagonGlowRing from "./OctagonGlowRing";

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

  const segments = artCategories.map((cat, i) => {
    const startAngle = i * 45 - 22.5;
    const endAngle = startAngle + 45;
    const steps = 8;
    const outerPoints: string[] = [];
    const innerPoints: string[] = [];

    for (let s = 0; s <= steps; s++) {
      const a = startAngle + (endAngle - startAngle) * (s / steps);
      const p = getPoint(a, outerR);
      outerPoints.push(`${p.x},${p.y}`);
    }
    for (let s = steps; s >= 0; s--) {
      const a = startAngle + (endAngle - startAngle) * (s / steps);
      const p = getPoint(a, innerR);
      innerPoints.push(`${p.x},${p.y}`);
    }

    const pathData = `M ${outerPoints[0]} ${outerPoints.map((p) => `L ${p}`).join(" ")} ${innerPoints.map((p) => `L ${p}`).join(" ")} Z`;

    const labelAngle = startAngle + 22.5;
    const labelR = (outerR + innerR) / 2;
    const labelPos = getPoint(labelAngle, labelR);

    return { cat, pathData, labelPos, labelAngle, index: i };
  });

  return (
    <div className="relative flex items-center justify-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[560px] lg:h-[560px]"
        role="navigation"
        aria-label="Navegação principal por tipo de arte"
      >
        <defs>
          {segments.map(({ index }) => {
            const colors = [
              "#1a9e6e", "#2196c9", "#7b42d9", "#d94290",
              "#d94242", "#e88a1a", "#e8c71a", "#1a9e8e"
            ];
            return (
              <linearGradient key={index} id={`seg-grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={colors[index]} stopOpacity={hoveredIndex === index ? 1 : 0.5} />
                <stop offset="100%" stopColor={colors[(index + 1) % 8]} stopOpacity={hoveredIndex === index ? 1 : 0.5} />
              </linearGradient>
            );
          })}
          <radialGradient id="center-grad" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#7b42d9" stopOpacity={centerHovered ? 0.9 : 0.3} />
            <stop offset="100%" stopColor="#d94290" stopOpacity={centerHovered ? 0.7 : 0.15} />
          </radialGradient>
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

        {/* Segments */}
        {segments.map(({ cat, pathData, labelPos, labelAngle, index }) => (
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
          >
            <path
              d={pathData}
              fill={`url(#seg-grad-${index})`}
              stroke="hsl(240 6% 12%)"
              strokeWidth="1.5"
              className="transition-all duration-300"
              style={{
                filter: hoveredIndex === index ? "brightness(1.4) drop-shadow(0 0 12px rgba(123,66,217,0.3))" : "none",
              }}
            />
            <text
              x={labelPos.x}
              y={labelPos.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill={hoveredIndex === index ? "#fff" : "hsl(40 20% 85%)"}
              fontSize="12"
              fontFamily="Outfit, sans-serif"
              fontWeight={hoveredIndex === index ? "600" : "400"}
              className="pointer-events-none select-none transition-all duration-200"
              style={{
                textShadow: hoveredIndex === index ? "0 0 8px rgba(0,0,0,0.5)" : "none",
              }}
            >
              {cat.name}
            </text>
          </g>
        ))}

        {/* Center - Transmídia */}
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
            filter: centerHovered ? "drop-shadow(0 0 20px rgba(123,66,217,0.5))" : "none",
          }}
          onMouseEnter={() => setCenterHovered(true)}
          onMouseLeave={() => setCenterHovered(false)}
          onClick={() => navigate("/transmidia")}
          role="button"
          tabIndex={0}
          aria-label="Explorar Transmídia"
          onKeyDown={(e) => e.key === "Enter" && navigate("/transmidia")}
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
