import { motion } from "framer-motion";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import OctagonNav from "@/components/OctagonNav";
import HighlightCards from "@/components/HighlightCards";
import MilkyWayBackground from "@/components/MilkyWayBackground";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <MilkyWayBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
      <SiteHeader />

      {/* Hero / Manifesto */}
      <section className="flex flex-col items-center justify-center pt-10 pb-6 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4 text-balance"
        >
          Arte é <span className="gradient-egregora-text italic">egrégora</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed text-balance"
        >
          Uma rede viva de artistas, linguagens e públicos conectados pela força coletiva da criação.
          Oito artes. Um núcleo transmídia. Experiência sem fronteiras.
        </motion.p>
      </section>

      {/* Octagon Navigation */}
      <section className="flex items-center justify-center py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          <OctagonNav />
        </motion.div>
      </section>

      {/* Highlights */}
      <section className="py-16 md:py-24">
        <HighlightCards />
      </section>

      <SiteFooter />
    </div>
  );
};

export default Index;
