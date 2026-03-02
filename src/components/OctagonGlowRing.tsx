import { motion } from "framer-motion";

const OctagonGlowRing = ({ hoveredIndex }: { hoveredIndex: number | null }) => {
  const size = 400;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 2;

  const colors = [
    "#1a9e6e", "#2196c9", "#7b42d9", "#d94290",
    "#d94242", "#e88a1a", "#e8c71a", "#1a9e8e"
  ];

  const glowColor = hoveredIndex !== null ? colors[hoveredIndex] : "#7b42d9";

  return (
    <>
      {/* Rotating outer glow ring */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        <defs>
          <linearGradient id="glow-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            {colors.map((color, i) => (
              <stop
                key={i}
                offset={`${(i / colors.length) * 100}%`}
                stopColor={color}
                stopOpacity={0.15}
              />
            ))}
          </linearGradient>
        </defs>
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i * 45 - 90) * (Math.PI / 180);
          const px = cx + (r + 6) * Math.cos(angle);
          const py = cy + (r + 6) * Math.sin(angle);
          return `${px},${py}`;
        }).join(" ") && (
          <polygon
            points={Array.from({ length: 8 }, (_, i) => {
              const angle = (i * 45 - 90) * (Math.PI / 180);
              const px = cx + (r + 6) * Math.cos(angle);
              const py = cy + (r + 6) * Math.sin(angle);
              return `${px},${py}`;
            }).join(" ")}
            fill="none"
            stroke="url(#glow-ring-grad)"
            strokeWidth="2"
            opacity={0.6}
          />
        )}
      </motion.g>

      {/* Pulsating glow behind hovered segment */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={r * 0.85}
        fill="none"
        stroke={glowColor}
        strokeWidth="1"
        initial={{ opacity: 0 }}
        animate={{
          opacity: hoveredIndex !== null ? [0.1, 0.3, 0.1] : 0,
          scale: hoveredIndex !== null ? [1, 1.02, 1] : 1,
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: `${cx}px ${cy}px`, filter: `drop-shadow(0 0 8px ${glowColor})` }}
      />

      {/* Slow-rotating secondary outline */}
      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      >
        <polygon
          points={Array.from({ length: 8 }, (_, i) => {
            const angle = (i * 45 + 22.5 - 90) * (Math.PI / 180);
            const pr = r * 0.52 - 4;
            const px = cx + pr * Math.cos(angle);
            const py = cy + pr * Math.sin(angle);
            return `${px},${py}`;
          }).join(" ")}
          fill="none"
          stroke="hsl(280, 60%, 55%)"
          strokeWidth="0.5"
          opacity={0.2}
          strokeDasharray="4 8"
        />
      </motion.g>
    </>
  );
};

export default OctagonGlowRing;
