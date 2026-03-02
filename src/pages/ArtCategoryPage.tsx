import { useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { artCategories } from "@/data/artCategories";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const tabs = ["Sobre", "Galeria", "Agenda", "Acervo", "Participar"];

const ArtCategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState("Sobre");
  const category = artCategories.find((c) => c.slug === slug);

  if (!category) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="relative w-full h-[50vh] min-h-[360px] flex items-end overflow-hidden">
        <div className="absolute inset-0 gradient-egregora opacity-20" />
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
            <h2 className="font-display text-2xl text-foreground mb-4">Sobre</h2>
            <p className="text-muted-foreground leading-relaxed">{category.heroDescription}</p>
            <p className="text-muted-foreground leading-relaxed mt-4">{category.description}</p>
          </motion.div>
        )}
        {activeTab === "Galeria" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-display text-2xl text-foreground mb-6">Galeria</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
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
              {["15 Mar 2026 — Abertura da mostra", "22 Abr 2026 — Palestra com curadoria", "10 Mai 2026 — Encerramento"].map((evt) => (
                <div key={evt} className="glass-panel rounded-lg p-4 flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-sm text-foreground">{evt}</span>
                </div>
              ))}
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
  );
};

export default ArtCategoryPage;
