import { useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, Tag, ArrowLeft, Star, Eye, MapPin, Ruler, Layers, X, Globe } from "lucide-react";
import { Link } from "react-router-dom";
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

const tabs = ["Sobre", "Galeria", "Agenda", "Acervo", "Participar"];

const CATEGORY_EVENTS: Record<string, { date: string; title: string; note?: string }[]> = {
  pintura: [
    { date: "06 Mar 2026", title: "Abertura da mostra", note: "Exibição única" },
  ],
};

const CONTINENT_COLORS: Record<string, string> = {
  Europa: "border-blue-500/30 bg-blue-500/10 text-blue-300",
  Américas: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  Ásia: "border-amber-500/30 bg-amber-500/10 text-amber-300",
  África: "border-rose-500/30 bg-rose-500/10 text-rose-300",
};

const ArtCategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState("Sobre");
  const [selectedPiece, setSelectedPiece] = useState<HPArtwork | null>(null);
  const [continentFilter, setContinentFilter] = useState<string | null>(null);
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
        <img src={category.heroImage} alt={category.name} className="absolute inset-0 w-full h-full object-cover opacity-40" loading="lazy" />
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

            {/* HP Collection — Escultura — COMMERCIAL FOCUS */}
            {category.slug === "escultura" && (
              <div className="mt-12 space-y-10">
                {/* Header with stats */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Gem className="w-6 h-6 text-primary" />
                    <div>
                      <h2 className="font-display text-2xl text-foreground tracking-wide uppercase">Coleção HP — Oportunidade de Aquisição</h2>
                      <Badge variant="outline" className="mt-2 text-xs border-primary/40 text-primary">
                        Para Colecionadores e Curadores
                      </Badge>
                    </div>
                  </div>
                  <p className="text-lg text-foreground font-medium">{HP_COLLECTION.length} peças históricas · 4 continentes · Dupla curadoria</p>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                    Este é um acervo disponível para aquisição em lote fechado. Para colecionadores e curadores interessados em incorporar um núcleo curatorial sofisticado a acervos institucionais ou privados.
                  </p>

                  {/* CTA buttons */}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-body text-sm hover:opacity-90 transition-opacity">
                      Explorar o Acervo Completo
                    </button>
                    <button className="px-6 py-2.5 rounded-lg border border-border text-foreground font-body text-sm hover:bg-secondary transition-colors">
                      Agendar Visita Presencial
                    </button>
                    <button className="px-6 py-2.5 rounded-lg border border-border text-foreground font-body text-sm hover:bg-secondary transition-colors">
                      Baixar Catálogo Detalhado
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
                    <p className="text-sm font-medium text-foreground">Experiência Cultural</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Você também pode explorar a Coleção HP como experiência transmídia em nosso museu digital.
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-primary font-medium">
                    <span className="hidden sm:inline">Visitar Sala HP</span>
                    <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                {/* Apresentação */}
                <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 md:p-8 space-y-5">
                  <h3 className="font-display text-lg text-foreground border-b border-border pb-3">Apresentação</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A Coleção HP faz parte do acervo pessoal de um professor de Relações Internacionais da UFRJ. As obras foram adquiridas pelo professor de um marchand catalão que estava encerrando suas atividades no Rio de Janeiro e voltando para a Europa.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    No contexto do auge do dinamismo cultural e do boom imobiliário do Rio de Janeiro, em função dos megaeventos ocorridos na cidade desde o início do século XXI, muitos estrangeiros e empresários bem-sucedidos resolveram se estabelecer no Rio.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Foi nesse cenário que um importante marchand catalão resolveu trazer parte expressiva de suas obras de Barcelona para o Rio, passando também a arrematar leilões no Brasil, para compor o acervo de sua importante galeria de arte que funcionou até 2020.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Com a pandemia, o marchand resolveu encerrar suas atividades comerciais no Rio e levar de volta as suas principais peças para Barcelona. Em função do lockdown, não estava sendo possível fazer o traslado logístico dessas peças em contêineres de volta ao ateliê espanhol.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    O nascimento da Coleção HP somente foi possível porque o conjunto valioso de peças reunidas estava aguardando novas medidas de flexibilização de trânsito logístico internacional por causa da pandemia. As peças compradas pelo professor nessa ocasião são algumas das peças mais valiosas que o marchand havia reservado para serem colocadas nos contêineres que voltariam para Barcelona depois do fim da pandemia.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Trata-se, portanto, de uma rara oportunidade de aquisição em lote fechado de um conjunto artístico de algumas das manifestações artísticas mais importantes da história da arte. Um lote montado pela dupla curadoria resultado do encontro entre o conhecimento histórico e a sensibilidade estética do professor com o olhar experiente e a seleção criteriosa do marchand catalão.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Para além do valor simbólico dessas peças com narrativas culturais marcantes, trata-se também de uma estratégia financeira pessoal de busca por diversificação patrimonial. A possibilidade de alienação integral para um comprador qualificado faz parte da nova etapa de vida do professor.
                  </p>
                  <p className="text-sm text-muted-foreground/80 italic leading-relaxed border-l-2 border-primary/40 pl-4">
                    "Não há dúvidas de que o novo proprietário vai se orgulhar do reforço que o seu acervo receberá a partir da incorporação dessas peças extraordinárias à sua já elegante coleção."
                  </p>
                </div>

                {/* Avaliação de Mercado */}
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 md:p-8 space-y-5">
                  <h3 className="font-display text-lg text-foreground border-b border-border pb-3">Avaliação de Mercado</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    As peças da Coleção HP têm o estilo <strong className="text-foreground">Sotheby's</strong> e <strong className="text-foreground">Christie's</strong>, líderes em obras de arte com valor histórico-etnográfico, bem como em bens de luxo. Para as obras asiáticas, as melhores casas para avaliar seriam as gigantes <strong className="text-foreground">China Guardian</strong> e <strong className="text-foreground">Poly International Auction Company</strong>.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Em algumas fontes indicadas para aprofundar a pesquisa sobre a história das peças, é possível perceber o valor do patrimônio oferecido. Não é uma oportunidade que costuma aparecer com frequência.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Perceba a grandeza da história por trás de cada uma das peças. As descrições sucintas e as fotos singelas não fazem jus à grandeza, à beleza e à marcante presença dessas obras.
                  </p>
                </div>

                {/* Proveniência & Conservação */}
                <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 md:p-8 space-y-5">
                  <h3 className="font-display text-lg text-foreground border-b border-border pb-3">Proveniência & Conservação</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Outro ponto a ser observado diz respeito ao estado de conservação das peças. É natural que peças com décadas e séculos de existência, que passaram por diferentes acervos, tenham algumas marcas do tempo — marcas que revelam a sua história, a sua trajetória e a sua autenticidade.
                  </p>
                  <div className="rounded-lg bg-secondary/50 p-5 space-y-3">
                    <h4 className="font-display text-sm text-foreground uppercase tracking-wider">Kintsugi — A beleza das cicatrizes</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Os japoneses desenvolveram o conceito filosófico e estético do <em>kintsugi</em>, que se refere não apenas à técnica milenar de reparar as rachaduras das peças com uma solda de ouro, mas também à valorização das marcas deixadas pelas cicatrizes da vida. Em vez de buscar a perfeição idealizada e artificializada, o <em>kintsugi</em> celebra aquilo que foi vivido e transformado pelo tempo.
                    </p>
                    <p className="text-sm text-muted-foreground/80 italic leading-relaxed border-l-2 border-primary/40 pl-4">
                      "Cada cicatriz dourada conta uma história. As marcas não são defeitos, são testemunhos. A fragilidade, quando assumida, revela força."
                    </p>
                  </div>
                </div>

                {/* O Acervo */}
                <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 md:p-8 space-y-5">
                  <h3 className="font-display text-lg text-foreground border-b border-border pb-3">O Acervo</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    O acervo da Coleção HP reúne <strong className="text-foreground">{HP_COLLECTION.length} peças dos continentes americano, europeu, asiático e africano</strong>. As peças têm valor artístico, etnográfico e simbólico de diferentes tradições filosóficas, religiosas e civilizacionais. Trata-se de um acervo que chama atenção de todos e permanece na memória daqueles que tiverem o privilégio de entrar em contato com as obras.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A coleção foi feita por uma dupla curadoria estética: a do marchand catalão e a do professor da UFRJ. Não se trata da compra de peças isoladas, mas da aquisição de um sofisticado núcleo curatorial pronto para enriquecer imediatamente qualquer acervo.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    As obras selecionadas são representativas de um alto capital cultural e causam forte impacto visual e emocional. O poder simbólico do capital cultural revela-se de modo discreto e elegante, marcando profundamente o inconsciente dos ilustres convidados do anfitrião.
                  </p>
                  <p className="text-sm text-muted-foreground/80 italic leading-relaxed border-l-2 border-primary/40 pl-4">
                    "A verdade é que algumas obras mudam o ambiente; mas outras transformam o destino."
                  </p>
                  <div className="mt-4 rounded-lg bg-primary/10 border border-primary/20 p-4 text-center">
                    <p className="text-sm text-muted-foreground">
                      Caso haja interesse, é possível compartilhar um material com imagens e informações essenciais das obras da coleção, em caráter estritamente reservado.
                    </p>
                  </div>
                </div>

                {/* CTA para Colecionadores */}
                <div className="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 p-6 md:p-8 text-center space-y-4">
                  <Gem className="w-8 h-8 text-primary mx-auto" />
                  <h3 className="font-display text-xl text-foreground">Contato para Colecionadores</h3>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Interessado na aquisição do acervo? Entre em contato para receber o catálogo completo com imagens, fichas técnicas e condições em caráter reservado.
                  </p>
                  <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-body text-sm hover:opacity-90 transition-opacity">
                    Solicitar Catálogo Reservado
                  </button>
                  <p className="text-xs text-muted-foreground">Acesso restrito a compradores qualificados</p>
                </div>
              </div>
            )}
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
            </div>
            {/* Empty state when no further gallery images are available */}
            <div className="mt-8 flex flex-col items-center justify-center py-16 text-center rounded-xl border border-dashed border-border">
              <Eye className="w-8 h-8 text-muted-foreground/40 mb-3" />
              <p className="text-sm text-muted-foreground">
                Galeria em construção — obras em breve.
              </p>
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
            {category.slug === "escultura" ? (
              <>
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                  <div>
                    <h2 className="font-display text-2xl text-foreground">Coleção HP — Catálogo</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {filteredHP.length} peça{filteredHP.length !== 1 ? "s" : ""} · 4 continentes
                    </p>
                  </div>
                  {/* Continent filters */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setContinentFilter(null)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        !continentFilter
                          ? "border-primary bg-primary/20 text-primary"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Todas
                    </button>
                    {(["Europa", "Américas", "Ásia", "África"] as const).map((c) => (
                      <button
                        key={c}
                        onClick={() => setContinentFilter(continentFilter === c ? null : c)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                          continentFilter === c
                            ? CONTINENT_COLORS[c]
                            : "border-border text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {c} ({HP_COLLECTION.filter((p) => p.continent === c).length})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredHP.map((piece, i) => (
                    <motion.button
                      key={piece.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => setSelectedPiece(piece)}
                      className="text-left rounded-xl border border-border bg-secondary/30 hover:bg-secondary/60 hover:border-primary/30 transition-all group p-5 space-y-3"
                    >
                      {/* Thumbnail */}
                      <div className="aspect-[4/3] rounded-lg overflow-hidden bg-secondary/60 flex items-center justify-center">
                        {piece.images.thumbnail ? (
                          <img
                            src={piece.images.thumbnail}
                            alt={piece.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <Gem className="w-7 h-7 text-primary/40" />
                        )}
                      </div>
                      {/* Continent badge */}
                      <Badge variant="outline" className={`text-[10px] ${CONTINENT_COLORS[piece.continent]}`}>
                        <Globe className="w-3 h-3 mr-1" />
                        {piece.origin}
                      </Badge>
                      <h3 className="font-display text-base text-foreground group-hover:text-primary transition-colors leading-tight">
                        {piece.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">{piece.description_commercial}</p>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted-foreground/70 pt-1 border-t border-border/50">
                        <span>{piece.period}</span>
                        <span>{piece.dimensions}</span>
                      </div>
                      {/* Theme pills */}
                      <div className="flex gap-1.5 flex-wrap">
                        {piece.themes.map((t) => (
                          <span key={t} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-10 rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-accent/5 p-6 text-center space-y-3">
                  <Gem className="w-7 h-7 text-primary mx-auto" />
                  <p className="text-sm text-muted-foreground max-w-md mx-auto">
                    Interessado na aquisição do acervo completo? Solicite o catálogo reservado com fichas técnicas detalhadas.
                  </p>
                  <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-body text-sm hover:opacity-90 transition-opacity">
                    Solicitar Catálogo Reservado
                  </button>
                </div>

                {/* Detail modal */}
                <AnimatePresence>
                  {selectedPiece && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
                      onClick={() => setSelectedPiece(null)}
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 md:p-8 space-y-5"
                      >
                        <button
                          onClick={() => setSelectedPiece(null)}
                          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>

                        <Badge variant="outline" className={`text-xs ${CONTINENT_COLORS[selectedPiece.continent]}`}>
                          <Globe className="w-3 h-3 mr-1" /> {selectedPiece.origin}
                        </Badge>

                        <h2 className="font-display text-2xl text-foreground">{selectedPiece.title}</h2>

                        {/* Photo gallery */}
                        {selectedPiece.images.gallery.length > 0 && (
                          <div className={`grid gap-2 ${selectedPiece.images.gallery.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                            {selectedPiece.images.gallery.slice(0, 4).map((img, gi) => (
                              <div key={gi} className="aspect-[4/3] rounded-lg overflow-hidden bg-secondary/60">
                                <img
                                  src={img}
                                  alt={`${selectedPiece.title} — foto ${gi + 1}`}
                                  className="w-full h-full object-cover"
                                  loading="lazy"
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Metadata grid */}
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                            <div><span className="text-muted-foreground">Período</span><p className="text-foreground">{selectedPiece.period}</p></div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Ruler className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                            <div><span className="text-muted-foreground">Dimensões</span><p className="text-foreground">{selectedPiece.dimensions}</p></div>
                          </div>
                          <div className="flex items-start gap-2 col-span-2">
                            <Layers className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                            <div><span className="text-muted-foreground">Materiais</span><p className="text-foreground">{selectedPiece.materials.join(", ")}</p></div>
                          </div>
                        </div>

                        {/* Descriptions */}
                        <div className="space-y-4 border-t border-border pt-4">
                          <div>
                            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Descrição Comercial</h4>
                            <p className="text-sm text-foreground leading-relaxed">{selectedPiece.description_commercial}</p>
                          </div>
                          <div>
                            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Contexto Cultural</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{selectedPiece.cultural_context}</p>
                          </div>
                        </div>

                        {/* Provenance */}
                        <div className="border-t border-border pt-4">
                          <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Proveniência</h4>
                          <p className="text-sm text-foreground">{selectedPiece.provenance}</p>
                        </div>

                        {selectedPiece.conservation_notes && (
                          <div className="rounded-lg bg-secondary/50 p-4">
                            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Conservação</h4>
                            <p className="text-sm text-muted-foreground">{selectedPiece.conservation_notes}</p>
                          </div>
                        )}

                        {selectedPiece.sources && selectedPiece.sources.length > 0 && (
                          <div className="rounded-lg bg-secondary/50 p-4">
                            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Fontes</h4>
                            <ul className="space-y-1">
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

                        {/* Themes */}
                        <div className="flex gap-2 flex-wrap">
                          {selectedPiece.themes.map((t) => (
                            <span key={t} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{t}</span>
                          ))}
                        </div>

                        {/* Cross-link to transmedia */}
                        <Link
                          to="/transmidia?sala=4"
                          onClick={() => setSelectedPiece(null)}
                          className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4 hover:bg-primary/10 transition-colors group"
                        >
                          <Eye className="w-5 h-5 text-primary" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">Ver na experiência transmídia</p>
                            <p className="text-xs text-muted-foreground">Explore a narrativa cultural desta peça</p>
                          </div>
                          <ArrowLeft className="w-4 h-4 rotate-180 text-primary group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <>
                <h2 className="font-display text-2xl text-foreground mb-6">Acervo / Obras</h2>
                <div className="flex flex-col items-center justify-center py-16 text-center rounded-xl border border-dashed border-border">
                  <Eye className="w-8 h-8 text-muted-foreground/40 mb-3" />
                  <p className="text-sm text-muted-foreground">
                    Acervo em construção — obras em breve.
                  </p>
                </div>
              </>
            )}
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
