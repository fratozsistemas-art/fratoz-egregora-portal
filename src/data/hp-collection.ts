// ─── Real images extracted from "Acervo Coleção HP.pdf" ───────────────────────
import guerreiros1 from "@/assets/hp-catalog/guerreiros-1.jpeg";
import guerreiros2 from "@/assets/hp-catalog/guerreiros-2.jpeg";
import dante1 from "@/assets/hp-catalog/dante-1.jpeg";
import dante2 from "@/assets/hp-catalog/dante-2.jpeg";
import dante3 from "@/assets/hp-catalog/dante-3.jpeg";
// Obá e Arogbo — 2 photos of the standing figures (PDF page 9)
import obaArogbo1 from "@/assets/hp-catalog/oba-arogbo-1.jpeg";
import obaArogbo2 from "@/assets/hp-catalog/oba-arogbo-2.jpeg";
// Cavalo Benin — 6 photos: 3 horse close-ups (PDF page 8) + 3 rearing/full-body (PDF page 11)
import cavaloBenin1 from "@/assets/hp-catalog/cavalo-benin-1.jpeg";
import cavaloBenin2 from "@/assets/hp-catalog/cavalo-benin-2.jpeg";
import cavaloBenin3 from "@/assets/hp-catalog/cavalo-benin-3.jpeg";
import cavaloBenin4 from "@/assets/hp-catalog/cavalo-benin-4.jpeg";
import cavaloBenin5 from "@/assets/hp-catalog/cavalo-benin-5.jpeg";
import cavaloBenin6 from "@/assets/hp-catalog/cavalo-benin-6.jpeg";
import vasoChines1 from "@/assets/hp-catalog/vaso-chines-1.jpeg";
import venusAfricana1 from "@/assets/hp-catalog/venus-africana-1.jpeg";
import mascaraTamil1 from "@/assets/hp-catalog/mascara-tamil-1.jpeg";
import phuDogs1 from "@/assets/hp-catalog/phu-dogs-1.jpeg";
import ovoTibet1 from "@/assets/hp-catalog/ovo-tibet-1.jpeg";
import paneisMarmore1 from "@/assets/hp-catalog/paineis-marmore-1.jpeg";
import paneisMarmore2 from "@/assets/hp-catalog/paineis-marmore-2.jpeg";
import paneisMarmore3 from "@/assets/hp-catalog/paineis-marmore-3.jpeg";
import paneisMarmore4 from "@/assets/hp-catalog/paineis-marmore-4.jpeg";
import paneisMarmore5 from "@/assets/hp-catalog/paineis-marmore-5.jpeg";
import gravurasGregas1 from "@/assets/hp-catalog/gravuras-gregas-1.jpeg";
import gravurasGregas2 from "@/assets/hp-catalog/gravuras-gregas-2.jpeg";
import gravurasGregas3 from "@/assets/hp-catalog/gravuras-gregas-3.jpeg";
import gravurasGregas4 from "@/assets/hp-catalog/gravuras-gregas-4.jpeg";

export type HpTheme = "Poder" | "Espiritualidade" | "Proteção" | "Beleza";

export interface HPArtwork {
  id: string;
  title: string;
  artist?: string;
  origin: string;
  continent: "Europa" | "Américas" | "Ásia" | "África";
  period: string;
  dimensions: string;
  materials: string[];
  description_commercial: string;
  description_narrative: string;
  themes: HpTheme[];
  images: {
    thumbnail: string;
    gallery: string[];
  };
  provenance: string;
  conservation_notes?: string;
  cultural_context: string;
  transmedia_connections: string[];
  sources?: string[];
}

export const HP_COLLECTION: HPArtwork[] = [
  // ── AMÉRICAS (3 peças) ──────────────────────────────────────────────────────
  {
    id: "hp-01",
    title: "Os Guerreiros (Os Candangos)",
    artist: "Bruno Giorgi",
    origin: "Américas — Brasil (Modernismo Brasileiro)",
    continent: "Américas",
    period: "1959–1960 (Modernismo Brasileiro, Século XX)",
    dimensions: "A 107 cm × L 56 cm × P 16 cm",
    materials: ["bronze fundido", "base de concreto"],
    description_commercial:
      "Escultura monumental em bronze assinada por Bruno Giorgi (1905–1993), um dos mais importantes escultores modernistas do mundo. Peça excepcional — possivelmente a maquete original apresentada à comissão liderada por Oscar Niemeyer para aprovação do monumento da Praça dos Três Poderes, em Brasília. Com cerca de um metro de altura, é uma das apenas três peças produzidas por Giorgi em seu ateliê nessas dimensões. Reconhecida pela UNESCO como patrimônio cultural da humanidade.",
    description_narrative:
      "Esculpida em 1959 e inaugurada em 1960, 'Os Guerreiros' ocupa lugar de destaque na Praça dos Três Poderes, em Brasília. A composição de duas figuras entrelaçadas traduz a ideia de equilíbrio entre força e harmonia — uma metáfora visual para o funcionamento dos poderes da República. Com o tempo, a obra ganhou o nome popular de 'Os Candangos': homenagem aos trabalhadores que ergueram Brasília. O termo 'candango', originalmente pejorativo, foi ressignificado como símbolo de coragem, trabalho árduo e construção coletiva.",
    themes: ["Poder"],
    images: {
      thumbnail: guerreiros1,
      gallery: [guerreiros1, guerreiros2],
    },
    provenance:
      "Ateliê de Bruno Giorgi (Rio de Janeiro) → Aprovação comissão Oscar Niemeyer (1959) → Acervo HP",
    conservation_notes:
      "Pátina original em excelente estado. Bronze com coloração escura uniforme, característico do período. Assinatura do artista preservada.",
    cultural_context:
      "Bruno Giorgi (1905–1993) conviveu com figuras centrais do modernismo brasileiro: Mário de Andrade, Lasar Segall, Oswald de Andrade. Estudou em Paris com Aristide Maillol, na Academia La Grande Chaumière. Suas obras públicas incluem 'O Meteoro' (Ministério das Relações Exteriores, Brasília) e 'Integração' (Memorial da América Latina, São Paulo).",
    transmedia_connections: ["hp-02", "hp-03"],
    sources: [
      "https://en.wikipedia.org/wiki/Bruno_Giorgi",
      "https://www.archdaily.com.br/br/01-35329/os-candangos-bruno-giorgi",
    ],
  },

  // ── EUROPA (5 peças) ────────────────────────────────────────────────────────
  {
    id: "hp-02",
    title: "Dante Alighieri, il sommo poeta",
    artist: "Émile Guillemin",
    origin: "Europa — França (Neoclassicismo Europeu — Fine Art Antique)",
    continent: "Europa",
    period: "Final do Século XIX (Belle Époque)",
    dimensions: "A 28 cm × L 18 cm × P 14 cm",
    materials: ["bronze fundido", "patina original"],
    description_commercial:
      "Escultura em bronze de excepcional acabamento, assinada por Émile Coriolan Hippolyte Guillemin — um dos escultores mais celebrados da Belle Époque francesa. Presença constante no Salão de Paris entre 1870 e 1899, com menção honrosa em 1897. Em 2008, duas esculturas de Guillemin foram arrematadas pela Sotheby's de Nova York por mais de US$ 1,2 milhão. Peça que representa o ápice técnico da escultura figurativa europeia do século XIX.",
    description_narrative:
      "Ao representar Dante Alighieri — poeta, filósofo e autor da Divina Comédia —, Guillemin traduz em bronze a ideia de elevação espiritual, reflexão moral e busca pela transcendência. A escultura combina densidade intelectual, refinamento estético e presença simbólica. Dante é o guia da humanidade pelo Inferno, Purgatório e Paraíso: uma jornada simbólica da alma que encontra eco nas cosmologias budistas e nas tradições espirituais africanas presentes nesta coleção.",
    themes: ["Espiritualidade"],
    images: {
      thumbnail: dante1,
      gallery: [dante1, dante2, dante3],
    },
    provenance:
      "Ateliê de Émile Guillemin (Paris, final séc. XIX) → Coleção europeia → Acervo HP",
    conservation_notes:
      "Pátina original escura preservada. Assinatura do artista na base. Bronze em excelente estado estrutural.",
    cultural_context:
      "A Belle Époque (1871–1914) foi um período de sofisticação estética e grande valorização das artes na Europa. Guillemin destacou-se pela habilidade em representar personagens históricos, literários e exóticos, unindo rigor acadêmico e força narrativa.",
    transmedia_connections: ["hp-01", "hp-03"],
    sources: [
      "https://en.m.wikipedia.org/wiki/Émile_Guillemin",
      "https://www.sothebys.com/en/auctions/ecatalogue/2008/property-from-the-estate-of-rochelle-sepenuk-n08508/lot.92.html",
      "https://www.christies.com/en/lot/lot-6338694",
    ],
  },

  // ── ÁFRICA — Bronzes do Benin (3 peças) ─────────────────────────────────────
  {
    id: "hp-03",
    title: "Obá e Arogbo do Antigo Reino do Benin",
    origin: "África — Nigéria (Antigo Reino do Benin, 1440–1897)",
    continent: "África",
    period: "Antigo Reino do Benin (Séc. XV–XIX)",
    dimensions:
      "Obá: A 125 cm × L 21 cm × P 16 cm | Arogbo: A 84 cm × L 19 cm × P 27 cm",
    materials: ["bronze (técnica da cera perdida)", "liga metálica Edo"],
    description_commercial:
      "Par de esculturas monumentais em bronze — Obá (Rei) e Arogbo (Camponês) — do Antigo Reino do Benin, um dos impérios mais impressionantes da África Ocidental (1440–1897). Peças grandes, raras e pesadas. Trajetória de valorização: 1953 £5.500 (Sotheby's) → 1968 £21.000 (Christie's) → 2007 US$ 4,7 milhões → 2016 venda privada £10 milhões. Nível de raridade excepcional, sobretudo em esculturas completas de grandes dimensões.",
    description_narrative:
      "O Obá, o rei divinizado, símbolo supremo do poder e da justiça. O Arogbo, o camponês, representando a fertilidade da terra e a prosperidade coletiva. Juntas, essas figuras expressam o equilíbrio fundamental que sustentou uma das civilizações mais sofisticadas da África. Cada detalhe em bronze revela maestria técnica e profunda compreensão simbólica. São peças que afirmam a vitalidade de uma tradição artística cuja influência atravessou séculos e oceanos.",
    themes: ["Poder"],
    images: {
      thumbnail: obaArogbo1,
      gallery: [obaArogbo1, obaArogbo2],
    },
    provenance:
      "Corte Real do Antigo Reino do Benin → Coleção europeia (pós-1897) → Acervo HP",
    conservation_notes:
      "Bronze com pátina histórica característica. Ligamentos e detalhes esculpidos preservados. Peças pesadas e estáveis.",
    cultural_context:
      "O povo Edo governou o Reino do Benin por quase cinco séculos. A tecnologia escultórica dos Bronzes do Benin — desenvolvida no século XV — revelava nível de desenvolvimento técnico comparável às grandes tradições escultóricas mundiais. Os portugueses, chegando no século XVI, não tiveram acesso às obras. Somente com a colonização britânica (1897) as peças foram levadas à Europa, causando espanto pela sofisticação.",
    transmedia_connections: ["hp-04", "hp-05"],
    sources: [
      "https://www.bbc.com/news/world-africa-56292809",
      "https://ensinarhistoria.com.br/bronzes-de-benin-arte-africana-tecnologia/",
      "https://youtu.be/hoTxiRWrvp8",
    ],
  },
  {
    id: "hp-04",
    title: "O Cavalo dos Reis Guerreiros do Benin",
    origin: "África — Nigéria (Antigo Reino do Benin, 1440–1897)",
    continent: "África",
    period: "Antigo Reino do Benin (Séc. XV–XIX)",
    dimensions:
      "Cavalo: A 136 cm × L 35 cm × P 100 cm | Base de Madeira: A 11 cm × L 59 cm × P 65 cm",
    materials: ["bronze monumental", "base de madeira original"],
    description_commercial:
      "Escultura monumental em bronze representando o cavalo da cavalaria do Reino do Benin. Peça de grande porte que se impõe com força visual e profundo impacto simbólico. Acompanha base de madeira original. Os cavalos eram o símbolo máximo do poder militar e político — ao final da ocupação aliada de Berlim (1945), os dois grandes cavalos de bronze da Chancelaria do Terceiro Reich desapareceram e foram localizados apenas em 2015, sendo negociados por € 8 milhões.",
    description_narrative:
      "A Grande Muralha do Benin, cuja extensão rivalizava com a da Grande Muralha da China, protegia a capital do império. Construída em madeira e argila, a muralha revela a grandiosidade estratégica daquele povo. O cavalo tornou-se o símbolo universal do poder político e militar: de impérios antigos a nações modernas, quase não há país que não celebre seus grandes líderes com esculturas em bronze de figuras montadas em cavalos imponentes. Esse cavalo revela a grandiosidade dos reis guerreiros do Benin.",
    themes: ["Poder"],
    images: {
      thumbnail: cavaloBenin1,
      gallery: [cavaloBenin1, cavaloBenin2, cavaloBenin3, cavaloBenin4, cavaloBenin5, cavaloBenin6],
    },
    provenance:
      "Corte Real do Antigo Reino do Benin → Coleção europeia (pós-1897) → Acervo HP",
    conservation_notes:
      "Bronze monumental em excelente estado estrutural. Base de madeira original estável. Pátina histórica preservada.",
    cultural_context:
      "A disciplina das tropas e a engenharia militar do Reino do Benin criaram uma das maiores civilizações da história. Ao longo da história, o cavalo tornou-se símbolo universal de poder político e militar, comunicando autodeterminação, vitória e soberania através de culturas e épocas.",
    transmedia_connections: ["hp-03", "hp-05"],
    sources: [
      "https://youtu.be/3exWTKhZBT8",
      "https://www.bbc.com/news/world-africa-56292809",
    ],
  },

  // ── ÁSIA — China ─────────────────────────────────────────────────────────────
  {
    id: "hp-05",
    title: "Vaso em Porcelana Chinesa da Dinastia Qing",
    origin: "Ásia — China (Tradicional região de Nanking)",
    continent: "Ásia",
    period: "Dinastia Qing (1644–1912)",
    dimensions: "A 34 cm × L 18 cm",
    materials: ["porcelana chinesa", "pigmentos minerais", "esmalte imperial"],
    description_commercial:
      "Vaso em porcelana chinesa com representação da Grande Batalha de Fundação da Dinastia Qing. Origem na tradicional região de Nanking. Casos de referência de mercado: Vaso Qianlong encontrado em sótão vendido por US$ 19 milhões (Sotheby's Paris); vaso de cozinha vendido por US$ 1,8 milhão; vaso Qianlong vendido por £ 43 milhões para comprador chinês; vaso avaliado em US$ 2.000 arrematado por US$ 9 milhões em leilão frenético. Uma das categorias de arte com maior potencial de valorização no mercado global.",
    description_narrative:
      "Há muitos séculos, as cerâmicas do Império Chinês ocupam lugar especial entre os objetos de luxo mais desejados do mundo. Desde o século IX, mercadores árabes navegavam até o Mar do Sul da China em busca desses tesouros. Marco Polo, no século XIII, associou o material ao interior de uma concha italiana, chamando-o de 'porcellana'. Somente em 1707 os químicos alemães revelaram o segredo da porcelana dura. Este vaso, com cena da Batalha de Fundação da Dinastia Qing, carrega séculos de técnica, história e poder imperial.",
    themes: ["Poder"],
    images: {
      thumbnail: vasoChines1,
      gallery: [vasoChines1],
    },
    provenance:
      "Produção imperial chinesa (Nanking) → Coleção asiática → Acervo HP",
    conservation_notes:
      "Porcelana em excelente estado. Esmalte e pigmentos sem fissuras significativas. Marca de reinado presente na base.",
    cultural_context:
      "A porcelana chinesa nasceu durante a dinastia Tang (séc. VII–X), unindo feldspato e caulim a 1.450°C. A Dinastia Qing (1644–1912) é considerada período de refinamento máximo da produção artística imperial chinesa. A maioria dos exemplares hoje está em grandes museus como o Museu do Palácio Nacional de Taipei.",
    transmedia_connections: ["hp-06", "hp-07"],
    sources: [
      "https://edition.cnn.com/style/article/france-qing-dynasty-vase-attic-intl/index.html",
      "https://www.smithsonianmag.com/smart-news/a-vase-kept-in-an-ordinary-kitchen-turned-out-to-be-a-qing-dynasty-artwork-worth-millions-180980154/",
      "https://www.bbc.com/news/uk-england-london-11739781",
      "https://edition.cnn.com/style/article/chinese-vase-bidding-war-france-scli-intl/index.html",
    ],
  },

  // ── ÁFRICA — Outros ──────────────────────────────────────────────────────────
  {
    id: "hp-06",
    title: "Vênus Africana da Cultura Fang do Gabão",
    origin: "África — Gabão (Cultura Fang)",
    continent: "África",
    period: "Século XIX",
    dimensions: "A 63 cm × L 20 cm",
    materials: ["madeira escura", "pátina ritual"],
    description_commercial:
      "Escultura em madeira da Cultura Fang do Gabão — uma das obras mais expressivas da arte africana tradicional. Figura feminina em estado avançado de gestação, de alto valor etnográfico e artístico. Altamente apreciada por colecionadores, museus e estudiosos da arte africana. As esculturas Fang foram a epifania de Picasso e Braque — o gatilho do cubismo moderno.",
    description_narrative:
      "A figura feminina é representada em estado avançado de gestação, com o ventre proeminente como eixo central da composição. O corpo, de proporções deliberadamente hieráticas, transmite solidez, equilíbrio e contenção. A madeira, escurecida pela pátina do tempo e do manuseio ritual, revela sinais inequívocos de uso e antiguidade. A gravidez não é apenas condição biológica, mas emblema de continuidade, fertilidade e transmissão espiritual — a mulher grávida encarna o elo entre os ancestrais e os que ainda virão.",
    themes: ["Espiritualidade"],
    images: {
      thumbnail: venusAfricana1,
      gallery: [venusAfricana1],
    },
    provenance:
      "Tradição ritual Fang (Gabão, séc. XIX) → Coleção etnográfica europeia → Acervo HP",
    conservation_notes:
      "Madeira com pátina natural de uso ritual. Pequenas fissuras naturais e irregularidades do material reforçam autenticidade. Superfície viva com polimento manual.",
    cultural_context:
      "A Cultura Fang do Gabão desenvolveu uma das tradições escultóricas mais expressivas da África. Suas obras exerceram influência decisiva sobre o cubismo europeu — Picasso e Braque encontraram nas máscaras e figuras Fang a ruptura com a representação naturalista que marcaria a arte do século XX.",
    transmedia_connections: ["hp-03", "hp-04"],
  },

  // ── ÁSIA — Índia / Sri Lanka ──────────────────────────────────────────────────
  {
    id: "hp-07",
    title: "Máscara Ritualística Drishti Bommai da Cultura Tâmil",
    origin: "Ásia — Sul da Índia / Sri Lanka (Cultura Tâmil)",
    continent: "Ásia",
    period: "Século XIX",
    dimensions: "A 40 cm × L 26 cm",
    materials: ["madeira entalhada", "pigmentos naturais"],
    description_commercial:
      "Escultura em madeira de Drishti Bommai — guardião apotropaico por excelência da tradição tâmil do Sul da Índia, nordeste do Sri Lanka e comunidades em Singapura, Malásia e Ilhas Maurício. Peça de alto valor etnográfico, espiritual e estético. Madeira naturalmente envelhecida com marcas do tempo e manuseio, evidenciando uso simbólico contínuo que aumenta seu prestígio e valor.",
    description_narrative:
      "Talhada manualmente, a figura de Drishti Bommai cumpre função ancestral: afastar o mau-olhado, as energias negativas e as influências desarmônicas. Sua expressão intensa, deliberadamente exagerada, não é mero efeito estético, mas recurso ritual preservado ao longo de séculos. Posicionada em entradas, telhados ou locais de passagem, atua como sentinela entre o visível e o invisível. Não busca agradar — busca proteger.",
    themes: ["Proteção"],
    images: {
      thumbnail: mascaraTamil1,
      gallery: [mascaraTamil1],
    },
    provenance:
      "Tradição tâmil (Sul da Índia / Sri Lanka, séc. XIX) → Coleção de arte asiática → Acervo HP",
    conservation_notes:
      "Madeira envelhecida naturalmente. Marcas do manuseio e do tempo são elementos de autenticidade — não diminuem o valor, aumentam o prestígio da peça.",
    cultural_context:
      "Drishti Bommai pertence a uma tradição viva, transmitida entre gerações de artesãos e comunidades tâmeis. Objeto de poder associado à ideia de equilíbrio, defesa e bem-estar coletivo. Transforma qualquer ambiente em espaço de presença, memória e proteção.",
    transmedia_connections: ["hp-05", "hp-08"],
  },

  // ── ÁSIA — China Sino-Budista ─────────────────────────────────────────────────
  {
    id: "hp-08",
    title: "Phu-Dogs entalhados em Placas de Marfim",
    origin: "Ásia — China (Mitologia Sino-Budista)",
    continent: "Ásia",
    period: "Século XIX",
    dimensions: "A 40 cm × L 20 cm (cada peça)",
    materials: ["marfim entalhado", "par de peças"],
    description_commercial:
      "Par de Phu-Dogs (Cães-Leões Mitológicos) entalhados em placas de marfim — obra de notável refino técnico e profundo significado cultural sino-budista. Peças em marfim historicamente raras, pois novas obras neste material estão sujeitas a restrições comerciais em diversos países. A comercialização de peças antigas continua autorizada, o que alavancou o valor e o prestígio dessas obras. De longe já é possível perceber a raridade desse material.",
    description_narrative:
      "Os Phu-Dogs, dispostos em pares, simbolizam o equilíbrio de forças complementares: proteção material e autoridade espiritual. Guardam entradas de lares e templos contra influências negativas. Representam a harmonia entre Yin e Yang — a presença conjunta das duas figuras potencializa o significado ritual, conferindo sentido completo como exige a tradição. São peças que testemunham uma tradição milenar em que arte, proteção e transcendência caminham juntas.",
    themes: ["Proteção"],
    images: {
      thumbnail: phuDogs1,
      gallery: [phuDogs1],
    },
    provenance:
      "Tradição sino-budista (China, séc. XIX) → Coleção asiática → Acervo HP",
    conservation_notes:
      "Marfim com pátina natural de envelhecimento. Entalhes precisos preservados. Expressão e detalhes faciais nítidos. Par completo com peças simétricas.",
    cultural_context:
      "Os Phu-Dogs (ou Cães de Fó) ocupam lugar central nas tradições sino-budistas, associados à proteção do Dharma. Não são figuras decorativas comuns, mas símbolos de autoridade moral e proteção contínua, concebidos para atuar nos limiares entre o mundo exterior e o espaço resguardado.",
    transmedia_connections: ["hp-07", "hp-09"],
  },

  // ── ÁSIA — Tibet ─────────────────────────────────────────────────────────────
  {
    id: "hp-09",
    title: "Ovo Primordial do Tibet",
    origin: "Ásia — Tibet (Budismo Tibetano)",
    continent: "Ásia",
    period: "Século XX (Budismo Tibetano)",
    dimensions: "A 26 cm × L 16 cm",
    materials: ["âmbar tibetano", "turquesa", "pedraria vermelha e azul"],
    description_commercial:
      "Peça esculpida em âmbar tibetano e ricamente incrustada com pedraria turquesa, vermelha e azul. O âmbar tibetano — material associado à proteção, cura e preservação da energia vital — confere à peça qualidade orgânica e atemporal. Contém as representações da Ashtamangala: os oito símbolos auspiciosos do Budismo Tibetano. Peça única que reúne cosmologia, espiritualidade e beleza em um objeto de rara completude.",
    description_narrative:
      "A forma ovóide simboliza o princípio de todas as coisas — o estado potencial do cosmos antes da diferenciação. No pensamento budista tibetano, remete ao ciclo contínuo de nascimento, transformação e iluminação. Os oito símbolos da Ashtamangala presentes na peça: o Guarda-Sol Precioso (proteção espiritual), os Peixes Dourados (liberdade e abundância), o Vaso do Tesouro (riqueza espiritual), a Flor de Lótus (pureza), a Concha Branca (ensinamentos do Dharma), o Nó Infinito (interdependência), o Estandarte da Vitória (triunfo da sabedoria) e a Roda do Dharma (caminho óctuplo).",
    themes: ["Espiritualidade"],
    images: {
      thumbnail: ovoTibet1,
      gallery: [ovoTibet1],
    },
    provenance:
      "Tradição do Budismo Tibetano (Himalaia, séc. XX) → Coleção asiática → Acervo HP",
    conservation_notes:
      "Âmbar com brilho natural preservado. Incrustações de pedraria firmes e completas. Combinação cromática (turquesa, vermelho, azul) íntegra.",
    cultural_context:
      "O âmbar tibetano é material de prestígio no Himalaia, associado à proteção, cura e energia vital. A Ashtamangala (os oito símbolos auspiciosos) representa o coração do ensinamento budista tibetano, sendo utilizada em objetos rituais, thangkas e arquitetura sagrada.",
    transmedia_connections: ["hp-07", "hp-08"],
    sources: [
      "https://grin.news/cosmic-eggs-in-the-east-and-west-and-how-the-world-began-106df1c6e6aa",
    ],
  },

  // ── ÁSIA — Índia (Rajastão) ───────────────────────────────────────────────────
  {
    id: "hp-10",
    title: "Conjunto de Painéis em Mármore de Instrumentos Musicais Carnáticos",
    origin: "Ásia — Índia (Cultura Hindu do Rajastão)",
    continent: "Ásia",
    period: "Século XX (Tradição Hindu do Rajastão)",
    dimensions: "A 38 cm × L 46 cm (cada quadro — total de 5 quadros)",
    materials: [
      "mármore branco polido",
      "incrustações de madrepérola",
      "detalhes em ouro",
    ],
    description_commercial:
      "Conjunto de cinco quadros em mármore branco do Rajastão — o maior estado da Índia e sede de muitos reinos históricos. Executados meticulosamente por artesãos locais, preservando técnicas transmitidas ao longo de gerações. Ricamente adornados com incrustações em madrepérola e detalhes em ouro. Representam instrumentos da tradição musical carnática — uma das formas de música mais antigas do mundo. Ideal para colecionadores de arte hindu.",
    description_narrative:
      "Este conjunto constitui uma homenagem simbólica à deusa Saraswati — divindade hindu da sabedoria, do conhecimento, das artes e da música, e também shákti (esposa dialética de Brahma, o deus da criação). Os instrumentos representados — mridangam (tambor), veena (alaúde), ghatam (percussão de cerâmica), kanjira (tamborim), venu (flauta) e tanpura (drone de cordas) — compõem o universo da música carnática, enraizada nos textos védicos, especialmente no Samaveda.",
    themes: ["Beleza"],
    images: {
      thumbnail: paneisMarmore1,
      gallery: [paneisMarmore1, paneisMarmore2, paneisMarmore3, paneisMarmore4, paneisMarmore5],
    },
    provenance:
      "Artesãos do Rajastão (Índia, séc. XX) → Coleção de arte oriental → Acervo HP",
    conservation_notes:
      "Mármore branco polido sem manchas. Incrustações de madrepérola íntegras. Detalhes em ouro preservados. Cinco quadros em conjunto completo.",
    cultural_context:
      "A tradição artística do Rajastão é reconhecida internacionalmente por sua precisão e elegância. A música carnática — uma das formas mais antigas de música do mundo — tem vasto repertório de composições sagradas (kritis) dos grandes mestres Thyagaraja, Muthuswami Dikshitar e Shyama Sastri. As performances podem assumir forma musical ou narrativa (Harikatha).",
    transmedia_connections: ["hp-07", "hp-09"],
  },

  // ── EUROPA — Grécia Clássica ──────────────────────────────────────────────────
  {
    id: "hp-11",
    title: "Conjunto de Calcogravuras da Grécia Clássica",
    origin: "Europa — Tradição Clássica Grega (Coleção Estilo Sir William Hamilton)",
    continent: "Europa",
    period: "Século XIX (Neoclassicismo Europeu)",
    dimensions: "A 33 cm × L 33 cm (cada quadro — total de 4 quadros)",
    materials: [
      "calcogravura em cobre",
      "molduras de madeira originais",
      "bordas ornamentais com pilares dóricos",
    ],
    description_commercial:
      "Refinado conjunto de quatro gravuras inspiradas nas célebres coleções de peças gregas, romanas e etruscas reunidas por Sir William Hamilton (1730–1803) — diplomata britânico e um dos mais influentes colecionadores da história da arte. As imagens reproduzem composições originalmente pintadas em cerâmicas antigas, características do período clássico — especialmente a obra do ceramista Brygos (séc. V a.C.). Possuem belíssimas molduras de madeira originais e bordas ornamentais com pilares dóricos e motivos de palmetas.",
    description_narrative:
      "A calcogravura — técnica de gravação em matrizes de cobre de altíssima precisão — foi um dos meios mais sofisticados e duradouros de difusão do repertório visual da Antiguidade. Desde o Renascimento, artistas, eruditos e editores recorreram a esse processo. A coleção de Sir William Hamilton exerceu papel decisivo na formação do gosto neoclássico na Europa, com a redescoberta da iconografia marcante da arte da Antiguidade Clássica. As cenas em figuras vermelhas sobre fundo preto representam a tradição da cerâmica grega em seu ápice.",
    themes: ["Beleza"],
    images: {
      thumbnail: gravurasGregas1,
      gallery: [
        gravurasGregas1,
        gravurasGregas2,
        gravurasGregas3,
        gravurasGregas4,
      ],
    },
    provenance:
      "Tradição calcográfica europeia (séc. XIX) → Coleção neoclássica → Acervo HP",
    conservation_notes:
      "Gravuras em excelente estado de conservação. Molduras de madeira originais preservadas. Bordas ornamentais com pilares dóricos e motivos de palmetas íntegros. Conjunto completo de quatro quadros.",
    cultural_context:
      "Sir William Hamilton (1730–1803) reuniu uma das maiores coleções de antiguidades gregas, romanas e etruscas da história. Sua coleção influenciou decisivamente o neoclassicismo europeu. As primeiras reproduções foram gravadas por Thomas Kirk (1765–1797) por meio da calcogravura. Entre os séculos XVI e XVIII, a calcogravura consolidou-se como o principal suporte gráfico erudito, valorizado pela fidelidade formal e elegância do traço.",
    transmedia_connections: ["hp-02", "hp-05"],
    sources: [
      "https://www.metmuseum.org/pt/perspectives/sir-william-hamilton",
      "https://www.royalacademy.org.uk/art-artists/name/william-hamilton",
    ],
  },
];

// ── Helper: convert HP_COLLECTION to TransmidiaObra format ──────────────────
import type { TransmidiaObra } from "./transmidiaObras";

export function hpToTransmidiaObras(): TransmidiaObra[] {
  return HP_COLLECTION.map((hp) => ({
    id: hp.id,
    title: hp.title,
    author: hp.artist ?? "Coleção HP",
    year: 0,
    technique: hp.materials.join(", "),
    theme: "Patrimônio",
    dimensions: hp.dimensions,
    description: hp.description_narrative,
    room: 4,
    category: "escultura",
    image: hp.images.thumbnail,
    collection: "HP",
    continent: hp.continent,
    hpTheme: hp.themes[0] as HpTheme,
  }));
}
