import { useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, Tag, ArrowLeft, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { artCategories } from "@/data/artCategories";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MilkyWayBackground from "@/components/MilkyWayBackground";
import { Badge } from "@/components/ui/badge";
import { Gem } from "lucide-react";

// Map category slugs to hue values for the milky way tint
const CATEGORY_HUES: Record<string, number> = {
  cinema: 220,      // blue
  teatro: 270,      // purple
  musica: 320,      // magenta
  fotografia: 0,    // red
  pintura: 30,      // orange
  danca: 50,        // yellow
  literatura: 140,  // green
  escultura: 180,   // teal
};

const tabs = ["Sobre", "Galeria", "Agenda", "Acervo", "Participar"];

const CATEGORY_EVENTS: Record<string, { date: string; title: string; note?: string }[]> = {
  pintura: [
    { date: "06 Mar 2026", title: "Abertura da mostra", note: "Exibição única" },
  ],
};

const ArtCategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState("Sobre");
  const category = artCategories.find((c) => c.slug === slug);

  if (!category) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen flex flex-col relative">
      <MilkyWayBackground tintHue={CATEGORY_HUES[category.slug] ?? 240} tintStrength={0.55} />
      <div className="relative z-10 flex flex-col min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative w-full h-[50vh] min-h-[360px] flex items-end overflow-hidden">
        <img src={category.heroImage} alt={category.name} className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto w-full px-6 pb-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl text-foreground"
          >
            {category.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-muted-foreground mt-2 max-w-xl"
          >
            {category.tagline}
          </motion.p>
          {category.featuredWork && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 text-sm text-muted-foreground/80 mt-3"
            >
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-foreground font-medium">{category.featuredWork}</span> — {category.featuredArtist}
            </motion.p>
          )}
        </div>
      </section>

      {/* Metadata bar */}
      <div className="border-y border-border">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-wrap gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2"><Tag className="w-4 h-4" /> Eixo: {category.name}</span>
          <span className="flex items-center gap-2"><User className="w-4 h-4" /> Curadoria: {category.curator}</span>
          <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {category.status}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto w-full px-6 py-6 flex flex-wrap gap-3">
        <button className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-body text-sm hover:opacity-90 transition-opacity">
          Participar
        </button>
        <button className="px-5 py-2.5 rounded-lg border border-border text-foreground font-body text-sm hover:bg-secondary transition-colors">
          Submeter obra
        </button>
        <button className="px-5 py-2.5 rounded-lg border border-border text-foreground font-body text-sm hover:bg-secondary transition-colors">
          Ver agenda
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 flex gap-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-body transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-5xl mx-auto w-full px-6 py-10 flex-1">
        {activeTab === "Sobre" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
            {/* Featured work card */}
            {category.featuredWork && (
              <div className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-primary fill-primary" />
                  <h3 className="font-display text-lg text-foreground">{category.featuredWork}</h3>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {category.featuredArtist}
                  {category.featuredWorkYear && ` · ${category.featuredWorkYear}`}
                  {category.featuredWorkTechnique && ` · ${category.featuredWorkTechnique}`}
                </p>
                {category.featuredWorkDescription && (
                  <p className="text-muted-foreground leading-relaxed mt-3 text-sm">{category.featuredWorkDescription}</p>
                )}
              </div>
            )}
            <h2 className="font-display text-2xl text-foreground mb-4">Sobre</h2>
            <p className="text-muted-foreground leading-relaxed">{category.heroDescription}</p>
            <p className="text-muted-foreground leading-relaxed mt-4">{category.description}</p>
          </motion.div>
        )}
        {activeTab === "Galeria" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-display text-2xl text-foreground mb-6">Galeria</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Featured work — spans 2 columns */}
              {category.featuredWork && (
                <div className="col-span-2 relative rounded-lg bg-secondary/80 border border-primary/20 overflow-hidden flex flex-col justify-end aspect-[2/1]">
                  {category.featuredWorkImage && (
                    <img src={category.featuredWorkImage} alt={category.featuredWork} className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                  <div className="relative z-10 p-5">
                    <Badge className="mb-2 bg-primary/90 text-primary-foreground border-0">
                      <Star className="w-3 h-3 mr-1 fill-current" /> Destaque
                    </Badge>
                    <h3 className="font-display text-lg text-foreground">{category.featuredWork}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.featuredArtist}
                      {category.featuredWorkYear && ` · ${category.featuredWorkYear}`}
                      {category.featuredWorkTechnique && ` · ${category.featuredWorkTechnique}`}
                    </p>
                  </div>
                </div>
              )}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square rounded-lg bg-secondary flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">Obra {i}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        {activeTab === "Agenda" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-display text-2xl text-foreground mb-6">Agenda</h2>
            <div className="space-y-4">
              {(CATEGORY_EVENTS[category.slug] ?? []).map((evt) => (
                <div key={evt.date + evt.title} className="glass-panel rounded-lg p-4 flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">{evt.date} — {evt.title}</span>
                    {evt.note && <span className="text-xs text-muted-foreground">{evt.note}</span>}
                  </div>
                </div>
              ))}
              {(CATEGORY_EVENTS[category.slug] ?? []).length === 0 && (
                <p className="text-sm text-muted-foreground">Nenhum evento agendado no momento.</p>
              )}
            </div>
          </motion.div>
        )}
        {activeTab === "Acervo" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-display text-2xl text-foreground mb-6">Acervo / Obras</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="glass-panel rounded-lg p-5">
                  <h3 className="font-display text-lg text-foreground">Obra #{i}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Artista convidado · 2024 · Técnica mista</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        {activeTab === "Participar" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl">
            <h2 className="font-display text-2xl text-foreground mb-4">Participar</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Artistas, coletivos e projetos independentes podem submeter propostas para integrar o eixo de {category.name} da Egrégora.
            </p>
            <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-body text-sm hover:opacity-90 transition-opacity">
              Submeter proposta
            </button>
          </motion.div>
        )}
      </div>

      <SiteFooter />
      </div>
    </div>
  );
};

export default ArtCategoryPage;
