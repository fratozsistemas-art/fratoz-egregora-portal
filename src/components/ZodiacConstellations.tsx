import { motion } from "framer-motion";

// Simplified constellation patterns for each zodiac sign
// Each constellation is an array of {stars, lines} where stars are [x,y] normalized 0-1
// and lines connect star indices
const zodiacData: {
  name: string;
  symbol: string;
  stars: [number, number][];
  lines: [number, number][];
}[] = [
  {
    name: "Áries", symbol: "♈",
    stars: [[0.2, 0.6], [0.4, 0.3], [0.6, 0.2], [0.8, 0.4]],
    lines: [[0, 1], [1, 2], [2, 3]],
  },
  {
    name: "Touro", symbol: "♉",
    stars: [[0.1, 0.5], [0.3, 0.3], [0.5, 0.2], [0.7, 0.3], [0.5, 0.5], [0.3, 0.7]],
    lines: [[0, 1], [1, 2], [2, 3], [2, 4], [4, 5]],
  },
  {
    name: "Gêmeos", symbol: "♊",
    stars: [[0.3, 0.1], [0.3, 0.4], [0.3, 0.7], [0.7, 0.1], [0.7, 0.4], [0.7, 0.7]],
    lines: [[0, 1], [1, 2], [3, 4], [4, 5], [1, 4]],
  },
  {
    name: "Câncer", symbol: "♋",
    stars: [[0.2, 0.3], [0.4, 0.5], [0.6, 0.4], [0.8, 0.6], [0.5, 0.7]],
    lines: [[0, 1], [1, 2], [2, 3], [1, 4]],
  },
  {
    name: "Leão", symbol: "♌",
    stars: [[0.2, 0.3], [0.4, 0.15], [0.6, 0.2], [0.7, 0.4], [0.55, 0.6], [0.3, 0.55], [0.15, 0.5]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]],
  },
  {
    name: "Virgem", symbol: "♍",
    stars: [[0.15, 0.3], [0.35, 0.2], [0.55, 0.3], [0.7, 0.15], [0.55, 0.55], [0.35, 0.65], [0.7, 0.7]],
    lines: [[0, 1], [1, 2], [2, 3], [2, 4], [4, 5], [4, 6]],
  },
  {
    name: "Libra", symbol: "♎",
    stars: [[0.5, 0.2], [0.25, 0.5], [0.75, 0.5], [0.2, 0.75], [0.8, 0.75]],
    lines: [[0, 1], [0, 2], [1, 3], [2, 4]],
  },
  {
    name: "Escorpião", symbol: "♏",
    stars: [[0.1, 0.3], [0.25, 0.35], [0.4, 0.4], [0.55, 0.5], [0.65, 0.6], [0.75, 0.55], [0.85, 0.4], [0.8, 0.3]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]],
  },
  {
    name: "Sagitário", symbol: "♐",
    stars: [[0.2, 0.7], [0.35, 0.5], [0.5, 0.35], [0.7, 0.2], [0.55, 0.55], [0.65, 0.65]],
    lines: [[0, 1], [1, 2], [2, 3], [2, 4], [4, 5]],
  },
  {
    name: "Capricórnio", symbol: "♑",
    stars: [[0.15, 0.4], [0.35, 0.25], [0.55, 0.3], [0.75, 0.35], [0.6, 0.6], [0.35, 0.65]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 1]],
  },
  {
    name: "Aquário", symbol: "♒",
    stars: [[0.15, 0.35], [0.3, 0.25], [0.5, 0.3], [0.7, 0.2], [0.5, 0.55], [0.3, 0.7], [0.65, 0.65]],
    lines: [[0, 1], [1, 2], [2, 3], [2, 4], [4, 5], [4, 6]],
  },
  {
    name: "Peixes", symbol: "♓",
    stars: [[0.2, 0.3], [0.3, 0.45], [0.45, 0.5], [0.6, 0.45], [0.7, 0.3], [0.5, 0.65], [0.35, 0.7]],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 6]],
  },
];

interface ZodiacConstellationsProps {
  hoveredIndex: number | null;
}

const ZodiacConstellations = ({ hoveredIndex }: ZodiacConstellationsProps) => {
  const size = 400;
  const cx = size / 2;
  const cy = size / 2;
  const ringRadius = size / 2 + 18; // Just outside the octagon
  const constellationSize = 36; // Size of each constellation box

  return (
    <g className="pointer-events-none">
      {/* Slow rotating container */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        {zodiacData.map((zodiac, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const px = cx + ringRadius * Math.cos(angle);
          const py = cy + ringRadius * Math.sin(angle);
          const isNearHovered = hoveredIndex !== null && (
            Math.abs(i - hoveredIndex * 1.5) < 2 ||
            Math.abs(i - hoveredIndex * 1.5 + 12) < 2
          );
          const opacity = isNearHovered ? 0.7 : 0.25;

          // Counter-rotate text so it stays readable
          const counterAngle = -(i * 30);

          return (
            <g key={zodiac.name}>
              {/* Constellation stars and lines */}
              <g
                transform={`translate(${px - constellationSize / 2}, ${py - constellationSize / 2})`}
                opacity={opacity}
                style={{ transition: "opacity 0.6s ease" }}
              >
                {/* Lines */}
                {zodiac.lines.map(([a, b], li) => (
                  <line
                    key={`l-${li}`}
                    x1={zodiac.stars[a][0] * constellationSize}
                    y1={zodiac.stars[a][1] * constellationSize}
                    x2={zodiac.stars[b][0] * constellationSize}
                    y2={zodiac.stars[b][1] * constellationSize}
                    stroke="hsl(220, 40%, 70%)"
                    strokeWidth="0.4"
                    strokeOpacity={0.6}
                  />
                ))}
                {/* Stars */}
                {zodiac.stars.map(([sx, sy], si) => (
                  <g key={`s-${si}`}>
                    <circle
                      cx={sx * constellationSize}
                      cy={sy * constellationSize}
                      r={si === 0 ? 1.8 : 1.2}
                      fill="hsl(220, 50%, 85%)"
                      opacity={0.9}
                    />
                    <circle
                      cx={sx * constellationSize}
                      cy={sy * constellationSize}
                      r={si === 0 ? 4 : 2.5}
                      fill="hsl(220, 50%, 85%)"
                      opacity={0.1}
                    />
                  </g>
                ))}
              </g>

              {/* Symbol */}
              <text
                x={px}
                y={py + constellationSize / 2 + 10}
                textAnchor="middle"
                dominantBaseline="central"
                fill="hsl(220, 40%, 75%)"
                fontSize="8"
                fontFamily="serif"
                opacity={opacity * 0.8}
                style={{ transition: "opacity 0.6s ease" }}
                transform={`rotate(${counterAngle}, ${px}, ${py + constellationSize / 2 + 10})`}
              >
                {zodiac.symbol}
              </text>

              {/* Name (very subtle) */}
              <text
                x={px}
                y={py + constellationSize / 2 + 20}
                textAnchor="middle"
                dominantBaseline="central"
                fill="hsl(220, 30%, 55%)"
                fontSize="5"
                fontFamily="Outfit, sans-serif"
                fontWeight="300"
                letterSpacing="0.08em"
                opacity={opacity * 0.5}
                style={{ transition: "opacity 0.6s ease" }}
                transform={`rotate(${counterAngle}, ${px}, ${py + constellationSize / 2 + 20})`}
              >
                {zodiac.name.toUpperCase()}
              </text>
            </g>
          );
        })}
      </motion.g>
    </g>
  );
};

export default ZodiacConstellations;
