import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ExternalLink, Award } from "lucide-react";
import type { Artist } from "@/data/artists";

interface ArtistModalProps {
  artist: Artist | null;
  onClose: () => void;
}

const ArtistModal = ({ artist, onClose }: ArtistModalProps) => {
  if (!artist) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="artist-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          key="artist-panel"
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.97 }}
          transition={{ type: "spring", duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl"
        >
          {/* Header with optional image */}
          {artist.featuredWorkImage ? (
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
              <img
                src={artist.featuredWorkImage}
                alt={artist.featuredWork}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <span className="text-xs text-primary font-medium uppercase tracking-wider">{artist.role}</span>
                </div>
                <h2 className="font-display text-2xl text-foreground">{artist.name}</h2>
              </div>
            </div>
          ) : (
            <div className="px-6 pt-6 pb-2">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span className="text-xs text-primary font-medium uppercase tracking-wider">{artist.role}</span>
              </div>
              <h2 className="font-display text-2xl text-foreground">{artist.name}</h2>
            </div>
          )}

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/80 border border-border flex items-center justify-center hover:bg-secondary transition-colors z-10"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>

          <div className="px-6 pb-6 pt-4 space-y-5">
            {/* Featured work */}
            {artist.featuredWork && (
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm font-medium text-foreground">{artist.featuredWork}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {artist.featuredWorkYear && `${artist.featuredWorkYear} · `}
                  {artist.featuredWorkTechnique}
                </p>
              </div>
            )}

            {/* Bio */}
            <p className="text-sm text-muted-foreground leading-relaxed">{artist.bio}</p>

            {/* Highlights */}
            {artist.highlights.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-medium text-foreground uppercase tracking-wider">Destaques</h3>
                <ul className="space-y-1.5">
                  {artist.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Award className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Links */}
            {artist.links && artist.links.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-medium text-foreground uppercase tracking-wider">Links</h3>
                <div className="flex flex-wrap gap-2">
                  {artist.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ArtistModal;
