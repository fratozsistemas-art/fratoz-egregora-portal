import { useParams, Navigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, Tag, ArrowLeft, Star, Eye, MapPin, Ruler, Layers, X, Globe, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LACOS_HONRA_GALLERY } from "@/data/lacosHonraGallery";
import PhotoLightbox from "@/components/PhotoLightbox";
import { artCategories } from "@/data/artCategories";
import { HP_COLLECTION, type HPArtwork } from "@/data/hp-collection";
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

const CONTINENT_COLORS: Record<string, string> = {
  Europa: "border-blue-500/30 bg-blue-500/10 text-blue-300",
  Américas: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  Ásia: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  África: "border-rose-500/30 bg-rose-500/10 text-rose-300",
};

const CATEGORY_EVENTS: Record<string, { date: string; title: string; note?: string }[]> = {
  pintura: [
    { date: "06 Mar 2026", title: "Abertura da mostra", note: "Exibição única" },
  ],
};

const ArtCategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  const tabs = [
    t("category.tabs.about"),
    t("category.tabs.gallery"),
    t("category.tabs.agenda"),
    t("category.tabs.collection"),
    t("category.tabs.participate"),
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [selectedPiece, setSelectedPiece] = useState<HPArtwork | null>(null);
  const [continentFilter, setContinentFilter] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);
  const category = artCategories.find((c) => c.slug === slug);

  const filteredHP = continentFilter
    ? HP_COLLECTION.filter((p) => p.continent === continentFilter)
    : HP_COLLECTION;

  if (!category) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen flex flex-col relative">
      <MilkyWayBackground tintHue={CATEGORY_HUES[category.slug] ?? 240} tintStrength={0.55} />
      <div className="relative z-10 flex flex-col min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative w-full h-[50vh] min-h-[360px] flex items-end overflow-hidden">
        <img src={category.heroImage} alt={category.name} className="absolute inset-0 w-full h-full object-cover scale-125 opacity-40" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative z-10 max-w-5xl mx-auto w-full px-6 pb-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> {t("category.back")}
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
          <span className="flex items-center gap-2"><Tag className="w-4 h-4" /> {t("category.axis")}: {category.name}</span>
          <span className="flex items-center gap-2"><User className="w-4 h-4" /> {t("category.curatorship")}: {category.curator}</span>
          <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {category.status}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto w-full px-6 py-6 flex flex-wrap gap-3">
        <button className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-body text-sm hover:opacity-90 transition-opacity">
          {t("category.cta_join")}
        </button>
        <button className="px-5 py-2.5 rounded-lg border border-border text-foreground font-body text-sm hover:bg-secondary transition-colors">
          {t("category.cta_submit")}
        </button>
        <button className="px-5 py-2.5 rounded-lg border border-border text-foreground font-body text-sm hover:bg-secondary transition-colors">
          {t("category.cta_agenda")}
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
        {activeTab === t("category.tabs.about") && (
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
            <h2 className="font-display text-2xl text-foreground mb-4">{t("category.about_heading")}</h2>
            <p className="text-muted-foreground leading-relaxed">{category.heroDescription}</p>
            <p className="text-muted-foreground leading-relaxed mt-4">{category.description}</p>

            {/* HP Collection — Escultura — COMMERCIAL FOCUS */}
            {category.slug === "escultura" && (
              <div className="mt-12 space-y-10">
                {/* Header with stats */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Gem className="w-6 h-6 text-primary" />
                    <div>
                      <h2 className="font-display text-2xl text-foreground tracking-wide uppercase">
                        {t("category.hp_acquisition_title")}
                      </h2>
                      <Badge variant="outline" className="mt-2 text-xs border-primary/40 text-primary">
                        {t("category.hp_acquisition_badge")}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-lg text-foreground font-medium">
                    {t("category.hp_acquisition_stats", { count: HP_COLLECTION.length })}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                    {t("category.hp_acquisition_desc")}
                  </p>

                  {/* CTA buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-body text-sm hover:opacity-90 transition-opacity">
                      {t("category.hp_cta_explore")}
                    </button>
                    <button className="px-6 py-2.5 rounded-lg border border-border text-foreground font-body text-sm hover:bg-secondary transition-colors">
                      {t("category.hp_cta_visit")}
                    </button>
                    <button className="px-6 py-2.5 rounded-lg border border-border text-foreground font-body text-sm hover:bg-secondary transition-colors">
                      {t("category.hp_cta_download")}
                    </button>
                  </div>
                </div>

                {/* Cross-link banner to transmedia experience */}
                <Link
                  to="/transmidia?sala=4"
                  className="flex items-center gap-4 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 p-5 hover:from-primary/10 hover:to-accent/10 transition-all group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{t("category.hp_crosslink_label")}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {t("category.hp_crosslink_desc")}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-primary font-medium">
                    <span className="hidden sm:inline">{t("category.hp_crosslink_btn")}</span>
                    <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                {/* Apresentação */}
                <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 md:p-8 space-y-5">
                  <h3 className="font-display text-lg text-foreground border-b border-border pb-3">
                    {t("category.hp_presentation_title")}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t("category.hp_presentation_p1")}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t("category.hp_presentation_p2")}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t("category.hp_presentation_p3")}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t("category.hp_presentation_p4")}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t("category.hp_presentation_p5")}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t("category.hp_presentation_p6")}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t("category.hp_presentation_p7")}</p>
                  <p className="text-sm text-muted-foreground/80 italic leading-relaxed border-l-2 border-primary/40 pl-4">
                    {t("category.hp_presentation_quote")}
                  </p>
                </div>

                {/* Avaliação de Mercado */}
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 md:p-8 space-y-5">
                  <h3 className="font-display text-lg text-foreground border-b border-border pb-3">
                    {t("category.hp_market_title")}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("category.hp_market_p1")}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("category.hp_market_p2")}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("category.hp_market_p3")}
                  </p>
                </div>

                {/* Proveniência & Conservação */}
                <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 md:p-8 space-y-5">
                  <h3 className="font-display text-lg text-foreground border-b border-border pb-3">
                    {t("category.hp_provenance_title")}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("category.hp_provenance_p1")}
                  </p>
                  <div className="rounded-lg bg-secondary/50 p-5 space-y-3">
                    <h4 className="font-display text-sm text-foreground uppercase tracking-wider">
                      {t("category.hp_kintsugi_title")}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t("category.hp_kintsugi_p1")}
                    </p>
                    <p className="text-sm text-muted-foreground/80 italic leading-relaxed border-l-2 border-primary/40 pl-4">
                      {t("category.hp_kintsugi_quote")}
                    </p>
                  </div>
                </div>

                {/* O Acervo */}
                <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 md:p-8 space-y-5">
                  <h3 className="font-display text-lg text-foreground border-b border-border pb-3">
                    {t("category.hp_collection_section_title")}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("category.hp_collection_section_p1", { count: HP_COLLECTION.length })}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("category.hp_collection_section_p2")}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("category.hp_collection_section_p3")}
                  </p>
                  <p className="text-sm text-muted-foreground/80 italic leading-relaxed border-l-2 border-primary/40 pl-4">
                    {t("category.hp_collection_section_quote")}
                  </p>
                  <div className="mt-4 rounded-lg bg-primary/10 border border-primary/20 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      {t("category.hp_collection_section_note")}
                    </p>
                  </div>
                </div>

                {/* CTA para Colecionadores */}
                <div className="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 p-6 md:p-8 text-center space-y-4">
                  <Gem className="w-8 h-8 text-primary mx-auto" />
                  <h3 className="font-display text-xl text-foreground">{t("category.hp_contact_title")}</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                    {t("category.hp_contact_desc")}
                  </p>
                  <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-body text-sm hover:opacity-90 transition-opacity">
                    {t("category.hp_contact_btn")}
                  </button>
                  <p className="text-xs text-muted-foreground">{t("category.hp_contact_note")}</p>
                </div>
              </div>
            )}
          </motion.div>
        )}
        {activeTab === t("category.tabs.gallery") && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-display text-2xl text-foreground mb-6">{t("category.gallery_heading")}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* Featured work — spans 2 columns */}
              {category.featuredWork && (
                <div className="col-span-2 relative rounded-lg bg-secondary/80 border border-primary/20 overflow-hidden flex flex-col justify-end aspect-[3/4]">
                  {category.featuredWorkImage && (
                    <img src={category.featuredWorkImage} alt={category.featuredWork} className="absolute inset-0 w-full h-full object-contain p-2" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                  <div className="relative z-10 p-5">
                    <Badge className="mb-2 bg-primary/90 text-primary-foreground border-0">
                      <Star className="w-3 h-3 mr-1 fill-current" /> {t("category.featured_label")}
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
            </div>

            {/* Photography gallery — Laços de Honra */}
            {category.slug === "fotografia" && LACOS_HONRA_GALLERY.length > 0 ? (
              <>
                <h3 className="font-display text-xl text-foreground mt-10 mb-1 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" /> Laços de Honra
                </h3>
                <p className="text-sm text-muted-foreground mb-4">Ensaio fotográfico por Paula Mariane · Clique para ampliar</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {LACOS_HONRA_GALLERY.map((photo, i) => (
                    <motion.button
                      key={photo.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => openLightbox(i)}
                      className={`relative rounded-lg overflow-hidden bg-secondary/60 border border-border/40 hover:border-primary/40 transition-colors group ${
                        photo.orientation === "portrait" ? "row-span-2" : ""
                      }`}
                    >
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-full h-full object-cover aspect-[4/3] group-hover:opacity-90 transition-opacity"
                        loading="lazy"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs font-body text-foreground">{photo.title}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
                <PhotoLightbox
                  photos={LACOS_HONRA_GALLERY}
                  currentIndex={lightboxIndex}
                  open={lightboxOpen}
                  onClose={() => setLightboxOpen(false)}
                  onNavigate={setLightboxIndex}
                  credit="Paula Mariane"
                />
              </>
            ) : category.slug !== "fotografia" ? (
              <div className="mt-8 flex flex-col items-center justify-center py-16 text-center rounded-xl border border-dashed border-border">
                <Eye className="w-8 h-8 text-muted-foreground/40 mb-3" />
                <p className="text-sm text-muted-foreground">
                  {t("category.gallery_empty")}
                </p>
              </div>
            ) : null}
          </motion.div>
        )}
        {activeTab === t("category.tabs.agenda") && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-display text-2xl text-foreground mb-6">{t("category.agenda_heading")}</h2>
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
                <p className="text-sm text-muted-foreground">{t("category.agenda_empty")}</p>
              )}
            </div>
          </motion.div>
        )}
        {activeTab === t("category.tabs.collection") && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {category.slug === "escultura" ? (
              <>
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                  <div>
                    <h2 className="font-display text-2xl text-foreground">{t("category.hp_catalog_title")}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t("category.hp_catalog_count_other", { count: filteredHP.length })}
                    </p>
                  </div>
                  {/* Continent filters */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setContinentFilter(null)}
                      className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                        !continentFilter
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-muted"
                      }`}
                    >
                      {t("category.collection_filter_all")}
                    </button>
                    {["Europa", "Américas", "Ásia", "África"].map((cont) => (
                      <button
                        key={cont}
                        onClick={() => setContinentFilter(cont)}
                        className={`px-3 py-1.5 rounded-md text-xs border transition-colors ${
                          continentFilter === cont
                            ? CONTINENT_COLORS[cont]
                            : "bg-secondary text-secondary-foreground hover:bg-muted border-transparent"
                        }`}
                      >
                        {cont}
                      </button>
                    ))}
                  </div>
                </div>

                {/* HP artwork grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredHP.map((piece, i) => (
                    <motion.div
                      key={piece.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSelectedPiece(piece)}
                      className="glass-panel rounded-xl overflow-hidden cursor-pointer group hover:border-primary/40 transition-all duration-300"
                    >
                      <div className="aspect-[4/3] bg-secondary relative overflow-hidden">
                        {piece.images.thumbnail ? (
                          <img
                            src={piece.images.thumbnail}
                            alt={t("artwork.photo_alt", { title: piece.title, n: 1 })}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Gem className="w-8 h-8 text-muted-foreground/40" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Eye className="w-6 h-6 text-foreground" />
                        </div>
                        {piece.continent && (
                          <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs border ${CONTINENT_COLORS[piece.continent] ?? "border-border bg-secondary text-foreground"}`}>
                            {piece.continent}
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-display text-sm text-foreground leading-tight">{piece.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{piece.origin} · {piece.period}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{piece.description_commercial}</p>
                        {piece.themes[0] && (
                          <span className="inline-block mt-2 text-xs text-primary/80 bg-primary/10 px-2 py-0.5 rounded-full">
                            {piece.themes[0]}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-12 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center space-y-3">
                  <p className="text-sm text-muted-foreground">{t("category.collection_cta_text")}</p>
                  <button className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-body text-sm hover:opacity-90 transition-opacity">
                    {t("category.collection_cta_btn")}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center rounded-xl border border-dashed border-border">
                <Gem className="w-8 h-8 text-muted-foreground/40 mb-3" />
                <h3 className="font-display text-lg text-foreground mb-2">{t("category.collection_empty_heading")}</h3>
                <p className="text-sm text-muted-foreground">{t("category.collection_empty_text")}</p>
              </div>
            )}
          </motion.div>
        )}
        {activeTab === t("category.tabs.participate") && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl">
            <h2 className="font-display text-2xl text-foreground mb-4">{t("category.participate_heading")}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("category.participate_text", { name: category.name })}
            </p>
            <button className="mt-6 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-body text-sm hover:opacity-90 transition-opacity">
              {t("category.participate_btn")}
            </button>
          </motion.div>
        )}
      </div>

      {/* Piece detail modal */}
      <AnimatePresence>
        {selectedPiece && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedPiece(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="font-display text-2xl text-foreground">{selectedPiece.title}</h2>
                <button onClick={() => setSelectedPiece(null)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Gallery thumbnails */}
                <div className="p-4 space-y-3">
                  <div className="aspect-square bg-secondary rounded-xl overflow-hidden">
                    {selectedPiece.images.thumbnail ? (
                      <img
                        src={selectedPiece.images.thumbnail}
                        alt={t("artwork.photo_alt", { title: selectedPiece.title, n: 1 })}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Gem className="w-10 h-10 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>
                  {selectedPiece.images.gallery && selectedPiece.images.gallery.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {selectedPiece.images.gallery.slice(0, 4).map((img, i) => (
                        <div key={i} className="aspect-square rounded-lg overflow-hidden bg-secondary">
                          <img
                            src={img}
                            alt={t("artwork.photo_alt", { title: selectedPiece.title, n: i + 1 })}
                            className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Transmedia link */}
                  <Link
                    to={`/transmidia?sala=4`}
                    className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3 hover:bg-primary/10 transition-colors group"
                  >
                    <Globe className="w-4 h-4 text-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground">{t("category.transmedia_link")}</p>
                      <p className="text-xs text-muted-foreground truncate">{t("category.transmedia_link_sub")}</p>
                    </div>
                    <ArrowLeft className="w-4 h-4 text-primary rotate-180 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Info */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("artwork.artist")}</span>
                      <span className="text-foreground">{selectedPiece.artist}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("artwork.origin")}</span>
                      <span className="text-foreground">{selectedPiece.origin}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("artwork.period")}</span>
                      <span className="text-foreground">{selectedPiece.period}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("artwork.dimensions")}</span>
                      <span className="text-foreground text-right">{selectedPiece.dimensions}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t("artwork.materials")}</span>
                      <span className="text-foreground text-right">{selectedPiece.materials.join(", ")}</span>
                    </div>
                    {selectedPiece.continent && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t("artwork.continent")}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${CONTINENT_COLORS[selectedPiece.continent] ?? ""}`}>
                          {selectedPiece.continent}
                        </span>
                      </div>
                    )}
                    {selectedPiece.themes[0] && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{t("artwork.theme")}</span>
                        <span className="text-foreground">{selectedPiece.themes[0]}</span>
                      </div>
                    )}
                  </div>

                  {/* Narrative description */}
                  <div className="border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedPiece.description_narrative}
                    </p>
                  </div>

                  {/* Cultural context */}
                  <div className="rounded-lg bg-secondary/50 p-4 space-y-2">
                    <h4 className="text-xs font-medium text-foreground uppercase tracking-wider">{t("artwork.cultural_context")}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{selectedPiece.cultural_context}</p>
                  </div>

                  {/* Provenance */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t("artwork.provenance")}</h4>
                    <p className="text-xs text-muted-foreground">{selectedPiece.provenance}</p>
                  </div>

                  {/* Conservation */}
                  {selectedPiece.conservation_notes && (
                    <div className="space-y-1">
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t("artwork.conservation")}</h4>
                      <p className="text-xs text-muted-foreground">{selectedPiece.conservation_notes}</p>
                    </div>
                  )}

                  {/* Sources */}
                  {selectedPiece.sources && selectedPiece.sources.length > 0 && (
                    <div className="space-y-1">
                      <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t("artwork.sources")}</h4>
                      <ul className="space-y-0.5">
                        {selectedPiece.sources.map((src) => (
                          <li key={src}>
                            <a
                              href={src}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline break-all"
                            >
                              {src}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SiteFooter />
      </div>
    </div>
  );
};

export default ArtCategoryPage;
