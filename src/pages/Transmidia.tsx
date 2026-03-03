import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Grid3X3, Eye, Search, X, ZoomIn, ChevronRight, Play, Map, Gem, Globe, Sparkles, Shield, Crown, Heart } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MilkyWayBackground from "@/components/MilkyWayBackground";
import { transmidiaObras, type TransmidiaObra, type HpTheme } from "@/data/artCategories";

const themes = [...new Set(transmidiaObras.map((o) => o.theme))];
const rooms = [1, 2, 3, 4];

const ROOM_COLORS = [
  "from-egregora-blue/20 to-egregora-purple/20",
  "from-egregora-magenta/20 to-egregora-orange/20",
  "from-egregora-green/20 to-egregora-teal/20",
  "from-amber-900/20 to-yellow-700/10",
];
const ROOM_NAMES = ["Sala Memória", "Sala Transformação", "Sala Cosmos", "Sala HP — Diálogos Entre Civilizações"];

const HP_THEME_META: Record<HpTheme, { icon: React.ElementType; color: string; description: string }> = {
  "Poder": {
    icon: Crown,
    color: "text-amber-400",
    description: "Objetos que simbolizam autoridade, governança e prestígio através das civilizações. Do cetro europeu ao selo imperial asiático, o poder se manifesta em formas distintas mas universais.",
  },
  "Espiritualidade": {
    icon: Sparkles,
    color: "text-violet-400",
    description: "Peças que conectam o humano ao transcendente. Representações de devoção, ritual e busca pelo sagrado em diferentes tradições filosóficas e religiosas do mundo.",
  },
  "Proteção": {
    icon: Shield,
    color: "text-emerald-400",
    description: "Artefatos criados para guardar, defender e preservar. De amuletos a armaduras cerimoniais, a arte da proteção revela os medos e esperanças de cada cultura.",
  },
  "Beleza": {
    icon: Heart,
    color: "text-rose-400",
    description: "A busca universal pela harmonia estética. Peças que celebram a forma, a proporção e o ornamento como expressões do ideal de beleza de cada civilização.",
  },
};

const HP_THEMES: HpTheme[] = ["Poder", "Espiritualidade", "Proteção", "Beleza"];

const Transmidia = () => {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<"visita" | "colecao">("visita");
  const [selectedObra, setSelectedObra] = useState<TransmidiaObra | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTheme, setFilterTheme] = useState<string | null>(null);
  const [activeRoom, setActiveRoom] = useState(1);

  // Handle deep-link ?sala=4
  useEffect(() => {
    const sala = searchParams.get("sala");
    if (sala) setActiveRoom(Number(sala));
  }, [searchParams]);

  const filteredObras = transmidiaObras.filter((o) => {
    const matchSearch = !searchQuery || o.title.toLowerCase().includes(searchQuery.toLowerCase()) || o.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTheme = !filterTheme || o.theme === filterTheme;
    return matchSearch && matchTheme;
  });

  const roomObras = transmidiaObras.filter((o) => o.room === activeRoom);
  const relatedObras = selectedObra ? transmidiaObras.filter((o) => o.theme === selectedObra.theme && o.id !== selectedObra.id).slice(0, 3) : [];

  return (
    <div className="min-h-screen flex flex-col relative">
      <MilkyWayBackground tintHue={275} tintStrength={0.4} />
      <div className="relative z-10 flex flex-col min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative w-full py-16 md:py-24 text-center px-6">
        <div className="absolute inset-0 gradient-egregora opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar à Home
          </Link>
          <h1 className="font-display text-4xl md:text-6xl gradient-egregora-text mb-4">Transmídia</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            O núcleo central da Egrégora. Uma experiência de museu digital onde todas as linguagens se encontram.
          </p>

          {/* Mode toggle */}
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setMode("visita")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-body transition-all ${mode === "visita" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}
            >
              <Eye className="w-4 h-4" /> Modo Visita
            </button>
            <button
              onClick={() => setMode("colecao")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-body transition-all ${mode === "colecao" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}
            >
              <Grid3X3 className="w-4 h-4" /> Modo Coleção
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="flex-1 px-6 pb-16">
        <AnimatePresence mode="wait">
          {mode === "visita" ? (
            <motion.div key="visita" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-6xl mx-auto">
              {/* Room map */}
              <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
                <Map className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground mr-2">Planta:</span>
                {rooms.map((room) => (
                  <button
                    key={room}
                    onClick={() => setActiveRoom(room)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${activeRoom === room ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}
                  >
                    {room === 4 ? "Sala HP" : ROOM_NAMES[room - 1]}
                  </button>
                ))}
              </div>

              {/* Gallery room */}
              <div className={`relative rounded-2xl border border-border bg-gradient-to-br ${ROOM_COLORS[activeRoom - 1]} p-8 min-h-[500px]`}>
                <h2 className="font-display text-2xl text-foreground mb-2">{ROOM_NAMES[activeRoom - 1]}</h2>
                <p className="text-sm text-muted-foreground mb-8">Sala {activeRoom} · {roomObras.length} obras</p>

                {/* Sala HP — Cultural/Educational intro */}
                {activeRoom === 4 && <SalaHPIntro roomObras={roomObras} />}

                {/* Thematic grouping for Sala HP */}
                {activeRoom === 4 ? (
                  <SalaHPThematicGrid obras={roomObras} onSelectObra={setSelectedObra} />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {roomObras.map((obra, i) => (
                      <ObraCard key={obra.id} obra={obra} index={i} onClick={() => setSelectedObra(obra)} />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div key="colecao" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-6xl mx-auto">
              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar obra ou artista..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setFilterTheme(null)}
                    className={`px-3 py-1.5 rounded-md text-xs transition-colors ${!filterTheme ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}
                  >
                    Todos
                  </button>
                  {themes.map((theme) => (
                    <button
                      key={theme}
                      onClick={() => setFilterTheme(theme)}
                      className={`px-3 py-1.5 rounded-md text-xs transition-colors ${filterTheme === theme ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"}`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredObras.map((obra, i) => (
                  <motion.div
                    key={obra.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedObra(obra)}
                    className="glass-panel rounded-xl overflow-hidden cursor-pointer group hover:border-primary/40 transition-all duration-300"
                  >
                    <div className="aspect-square bg-secondary flex items-center justify-center">
                      <span className="text-muted-foreground text-xs">Imagem</span>
                    </div>
                    <div className="p-3">
                      <h3 className="font-display text-sm text-foreground truncate">{obra.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{obra.author}</p>
                      <p className="text-xs text-muted-foreground">{obra.year > 0 ? obra.year : ""} · {obra.technique}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              {filteredObras.length === 0 && (
                <p className="text-center text-muted-foreground py-16">Nenhuma obra encontrada.</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Obra Modal */}
      <AnimatePresence>
        {selectedObra && (
          <ObraModal
            obra={selectedObra}
            relatedObras={relatedObras}
            onClose={() => setSelectedObra(null)}
            onSelectObra={setSelectedObra}
          />
        )}
      </AnimatePresence>

      <SiteFooter />
      </div>
    </div>
  );
};

/* ─── Sub-components ─── */

const ObraCard = ({ obra, index, onClick }: { obra: TransmidiaObra; index: number; onClick: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    onClick={onClick}
    className="glass-panel rounded-xl overflow-hidden cursor-pointer group hover:border-primary/40 transition-all duration-300"
  >
    <div className="aspect-[4/3] bg-secondary relative overflow-hidden">
      {obra.image ? (
        <img src={obra.image} alt={obra.title} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          <Gem className="w-6 h-6 text-muted-foreground/50" />
          <span className="text-xs text-muted-foreground">Imagem reservada</span>
        </div>
      )}
      <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
        <ZoomIn className="w-6 h-6 text-foreground" />
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-display text-sm text-foreground">{obra.title}</h3>
      <p className="text-xs text-muted-foreground mt-1">
        {obra.collection ? `Coleção ${obra.collection}` : obra.author} {obra.year > 0 && `· ${obra.year}`}
      </p>
      {obra.continent && (
        <p className="text-xs text-primary/70 mt-0.5">{obra.continent}</p>
      )}
    </div>
  </motion.div>
);

const SalaHPIntro = ({ roomObras }: { roomObras: TransmidiaObra[] }) => (
  <div className="mb-10 space-y-6">
    {/* Main intro panel */}
    <div className="rounded-xl border border-primary/20 bg-background/40 backdrop-blur-sm p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Gem className="w-5 h-5 text-primary" />
        <h3 className="font-display text-xl text-foreground">Diálogos Entre Civilizações</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Uma jornada educativa através de vinte peças que representam quatro continentes e quatro dimensões fundamentais 
        da experiência humana: <strong className="text-foreground">Poder</strong>, <strong className="text-foreground">Espiritualidade</strong>, <strong className="text-foreground">Proteção</strong> e <strong className="text-foreground">Beleza</strong>. 
        Cada obra é um fragmento de uma conversa milenar entre civilizações que, apesar de separadas por oceanos e séculos, 
        expressaram seus valores mais profundos através das mesmas linguagens simbólicas.
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed">
        Explore os agrupamentos temáticos abaixo e descubra como culturas da Europa, Américas, Ásia e África 
        dialogam sobre os grandes temas da condição humana.
      </p>
      <div className="flex gap-4 pt-2 flex-wrap">
        {(["Europa", "Américas", "Ásia", "África"] as const).map((cont) => {
          const count = roomObras.filter((o) => o.continent === cont).length;
          return (
            <div key={cont} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Globe className="w-3.5 h-3.5 text-primary/70" />
              <span>{cont}</span>
              <span className="text-foreground font-medium">({count})</span>
            </div>
          );
        })}
      </div>
    </div>

    {/* Cross-link to commercial page */}
    <Link
      to="/categoria/escultura"
      className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors group"
    >
      <div>
        <p className="text-xs text-muted-foreground">Interessado na aquisição?</p>
        <p className="text-sm font-medium text-foreground">Ver catálogo completo na página de Escultura →</p>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
    </Link>
  </div>
);

const SalaHPThematicGrid = ({ obras, onSelectObra }: { obras: TransmidiaObra[]; onSelectObra: (o: TransmidiaObra) => void }) => (
  <div className="space-y-10">
    {HP_THEMES.map((theme) => {
      const meta = HP_THEME_META[theme];
      const Icon = meta.icon;
      const themeObras = obras.filter((o) => o.hpTheme === theme);
      if (themeObras.length === 0) return null;

      return (
        <div key={theme}>
          {/* Theme header with educational context */}
          <div className="flex items-start gap-3 mb-4">
            <Icon className={`w-5 h-5 mt-0.5 ${meta.color}`} />
            <div>
              <h3 className="font-display text-lg text-foreground">{theme}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-1">{meta.description}</p>
            </div>
          </div>

          {/* Obras grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {themeObras.map((obra, i) => (
              <ObraCard key={obra.id} obra={obra} index={i} onClick={() => onSelectObra(obra)} />
            ))}
          </div>
        </div>
      );
    })}
  </div>
);

const ObraModal = ({
  obra,
  relatedObras,
  onClose,
  onSelectObra,
}: {
  obra: TransmidiaObra;
  relatedObras: TransmidiaObra[];
  onClose: () => void;
  onSelectObra: (o: TransmidiaObra) => void;
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex items-center justify-center p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="font-display text-2xl text-foreground">{obra.title}</h2>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary transition-colors">
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Image */}
        <div className="aspect-square bg-secondary flex items-center justify-center">
          {obra.image ? (
            <img src={obra.image} alt={obra.title} className="w-full h-full object-cover" />
          ) : (
            <span className="text-muted-foreground">Visualização da obra</span>
          )}
        </div>

        {/* Info */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Artista</span>
              <span className="text-foreground">{obra.author}</span>
            </div>
            {obra.year > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ano</span>
                <span className="text-foreground">{obra.year}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Técnica</span>
              <span className="text-foreground">{obra.technique}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Dimensões</span>
              <span className="text-foreground">{obra.dimensions}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tema</span>
              <span className="text-foreground">{obra.theme}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Sala</span>
              <span className="text-foreground">{ROOM_NAMES[obra.room - 1]}</span>
            </div>
            {obra.hpTheme && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Eixo temático</span>
                <span className={`font-medium ${HP_THEME_META[obra.hpTheme].color}`}>{obra.hpTheme}</span>
              </div>
            )}
            {obra.continent && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Continente</span>
                <span className="text-foreground">{obra.continent}</span>
              </div>
            )}
          </div>

          <div className="border-t border-border pt-4">
            <p className="text-sm text-muted-foreground leading-relaxed">{obra.description}</p>
          </div>

          {/* Audio guide */}
          <button className="flex items-center gap-2 text-sm text-primary hover:opacity-80 transition-opacity">
            <Play className="w-4 h-4" /> Áudio-guia
          </button>
        </div>
      </div>

      {/* Related */}
      {relatedObras.length > 0 && (
        <div className="p-6 border-t border-border">
          <h3 className="font-display text-lg text-foreground mb-4">Obras relacionadas</h3>
          <div className="flex gap-4 overflow-x-auto">
            {relatedObras.map((r) => (
              <div
                key={r.id}
                onClick={() => onSelectObra(r)}
                className="flex-shrink-0 w-40 glass-panel rounded-lg overflow-hidden cursor-pointer hover:border-primary/40 transition-colors"
              >
                <div className="aspect-square bg-secondary flex items-center justify-center">
                  {r.image ? (
                    <img src={r.image} alt={r.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-muted-foreground text-xs">Img</span>
                  )}
                </div>
                <div className="p-2">
                  <p className="text-xs text-foreground truncate">{r.title}</p>
                  <p className="text-xs text-muted-foreground">{r.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  </motion.div>
);

export default Transmidia;
