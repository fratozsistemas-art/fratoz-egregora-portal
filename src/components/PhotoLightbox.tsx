import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MapPin, Calendar } from "lucide-react";
import type { GalleryPhoto } from "@/data/lacosHonraGallery";

interface PhotoLightboxProps {
  photos: GalleryPhoto[];
  currentIndex: number;
  open: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
  credit?: string;
}

const PhotoLightbox = ({ photos, currentIndex, open, onClose, onNavigate, credit }: PhotoLightboxProps) => {
  const photo = photos[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onNavigate(currentIndex - 1);
  }, [hasPrev, currentIndex, onNavigate]);

  const goNext = useCallback(() => {
    if (hasNext) onNavigate(currentIndex + 1);
  }, [hasNext, currentIndex, onNavigate]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose, goPrev, goNext]);

  // Lock body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open]);

  if (!open || !photo) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-secondary/80 text-foreground hover:bg-secondary transition-colors"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter */}
          <span className="absolute top-5 left-1/2 -translate-x-1/2 text-xs text-muted-foreground font-body">
            {currentIndex + 1} / {photos.length}
          </span>

          {/* Prev */}
          {hasPrev && (
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-50 p-2 md:p-3 rounded-full bg-secondary/80 text-foreground hover:bg-secondary transition-colors"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          )}

          {/* Next */}
          {hasNext && (
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-50 p-2 md:p-3 rounded-full bg-secondary/80 text-foreground hover:bg-secondary transition-colors"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          )}

          {/* Content */}
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center gap-4 max-w-4xl w-full px-14 md:px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="max-h-[65vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
              draggable={false}
            />
            <div className="text-center space-y-1 max-w-lg">
              <h3 className="font-display text-lg text-foreground">{photo.title}</h3>
              {photo.caption && (
                <p className="text-sm text-muted-foreground leading-relaxed">{photo.caption}</p>
              )}
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-1">
                {photo.location && (
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {photo.location}</span>
                )}
                {photo.year && (
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {photo.year}</span>
                )}
              </div>
              {credit && (
                <p className="text-xs text-muted-foreground/60 pt-1">© {credit}</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PhotoLightbox;
