import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { highlights } from "@/data/highlights";

const HighlightCards = () => {
  return (
    <section className="w-full max-w-5xl mx-auto px-4">
      <h2 className="font-display text-2xl md:text-3xl text-foreground text-center mb-10">
        Destaques
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-panel rounded-xl p-6 flex flex-col justify-between hover:border-primary/30 transition-colors duration-300 group"
          >
            <div>
              <span className="text-xs font-body font-medium tracking-wider uppercase text-primary">
                {item.tag}
              </span>
              <h3 className="font-display text-lg text-foreground mt-2 mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
            <button className="mt-5 flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-300">
              {item.cta} <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* CTA final */}
      <div className="flex flex-wrap justify-center gap-4 mt-14">
        {["Participar", "Submeter obra", "Falar com a curadoria"].map((label) => (
          <button
            key={label}
            className="px-6 py-3 rounded-lg border border-border text-foreground font-body text-sm hover:bg-secondary hover:border-primary/30 transition-all duration-300"
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default HighlightCards;
