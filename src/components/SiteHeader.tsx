import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoSrc from "@/assets/logo-egregora.jpg";
import { artCategories } from "@/data/artCategories";

const SiteHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="w-full py-6 px-6 flex items-center justify-between relative z-50">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logoSrc} alt="Egrégora logo" className="w-10 h-10 rounded-full object-cover" />
          <span className="font-display text-xl tracking-wide text-foreground group-hover:opacity-80 transition-opacity">
            Fratoz <span className="gradient-egregora-text">Egrégora</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/transmidia" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Transmídia
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Sobre
          </Link>
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md pt-24 px-6 overflow-y-auto md:hidden"
          >
            <div className="mb-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Linguagens</p>
              <div className="grid grid-cols-2 gap-2">
                {artCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/${cat.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: `var(--egregora-${cat.id === "cinema" ? "blue" : cat.id === "teatro" ? "purple" : cat.id === "musica" ? "magenta" : cat.id === "fotografia" ? "red" : cat.id === "pintura" ? "orange" : cat.id === "danca" ? "yellow" : cat.id === "literatura" ? "green" : "teal"})` }} />
                    <span className="text-sm text-foreground">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-4 space-y-2">
              <Link
                to="/transmidia"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                <span className="text-sm font-body gradient-egregora-text font-medium">Transmídia</span>
                <p className="text-xs text-muted-foreground mt-0.5">Museu digital — todas as linguagens</p>
              </Link>
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-lg hover:bg-secondary transition-colors"
              >
                <span className="text-sm text-foreground">Início</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteHeader;
