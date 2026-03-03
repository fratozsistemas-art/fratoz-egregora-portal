// Hero images
import heroCinema from "@/assets/heroes/hero-cinema.jpg";
import heroTeatro from "@/assets/heroes/hero-teatro.jpg";
import heroMusica from "@/assets/heroes/hero-musica.jpg";
import heroFotografia from "@/assets/heroes/hero-fotografia.jpg";
import heroPintura from "@/assets/heroes/hero-pintura.jpg";
import heroDanca from "@/assets/heroes/hero-danca.jpg";
import heroLiteratura from "@/assets/heroes/hero-literatura.jpg";
import heroEscultura from "@/assets/heroes/hero-escultura.jpg";
import torreDeBabel from "@/assets/obras/torre-de-babel.png";

export interface ArtCategory {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  color: string;
  angle: number;
  heroDescription: string;
  curator: string;
  status: string;
  heroImage: string;
  featuredArtist: string;
  featuredWork: string;
  featuredWorkYear?: number;
  featuredWorkTechnique?: string;
  featuredWorkDescription?: string;
  featuredWorkImage?: string;
}

export const artCategories: ArtCategory[] = [
  {
    id: "cinema",
    name: "Cinema",
    slug: "cinema",
    tagline: "A tela como portal do imaginário",
    description: "Exploramos a sétima arte como linguagem universal de transformação e reflexão. Do curta experimental ao longa documental, o cinema da Egrégora transcende fronteiras narrativas.",
    color: "var(--egregora-blue)",
    angle: 0,
    heroDescription: "Narrativas visuais que expandem horizontes. Curtas, longas, documentários e filmes experimentais que desafiam a percepção e provocam diálogos essenciais.",
    curator: "Ana Beatriz Souza",
    status: "Convocatória aberta",
    heroImage: heroCinema,
    featuredArtist: "Artista a definir",
    featuredWork: "Obra a definir",
    featuredWorkYear: 2024,
    featuredWorkTechnique: "Longa-metragem",
    featuredWorkDescription: "Obra carro-chefe do eixo Cinema — em definição pela curadoria.",
  },
  {
    id: "teatro",
    name: "Teatro",
    slug: "teatro",
    tagline: "O palco como espaço de encontro",
    description: "O teatro na Egrégora é presença, corpo e voz. Exploramos montagens contemporâneas, performances e dramaturgias que dialogam com o agora.",
    color: "var(--egregora-purple)",
    angle: 45,
    heroDescription: "Do palco à rua, o teatro como ato de presença e resistência. Dramaturgias contemporâneas que convidam à experiência coletiva.",
    curator: "Carlos Mendes",
    status: "Em temporada",
    heroImage: heroTeatro,
    featuredArtist: "Artista a definir",
    featuredWork: "Obra a definir",
    featuredWorkYear: 2024,
    featuredWorkTechnique: "Dramaturgia contemporânea",
    featuredWorkDescription: "Obra carro-chefe do eixo Teatro — em definição pela curadoria.",
  },
  {
    id: "musica",
    name: "Música",
    slug: "musica",
    tagline: "Frequências que conectam almas",
    description: "A música é vibração, ritmo e identidade. Celebramos composições autorais, experimentais e híbridas que redefinem a escuta.",
    color: "var(--egregora-magenta)",
    angle: 90,
    heroDescription: "Composições que transcendem gêneros. Da música erudita ao experimental, sons que criam pontes entre tempos e culturas.",
    curator: "Mariana Costa",
    status: "Programação ativa",
    heroImage: heroMusica,
    featuredArtist: "Artista a definir",
    featuredWork: "Obra a definir",
    featuredWorkYear: 2024,
    featuredWorkTechnique: "Composição autoral",
    featuredWorkDescription: "Obra carro-chefe do eixo Música — em definição pela curadoria.",
  },
  {
    id: "fotografia",
    name: "Fotografia",
    slug: "fotografia",
    tagline: "O instante como eternidade",
    description: "A fotografia como arte de ver além do visível. Ensaios, séries e projetos autorais que capturam a essência do efêmero.",
    color: "var(--egregora-red)",
    angle: 135,
    heroDescription: "Olhares que revelam o invisível. Ensaios fotográficos que documentam, questionam e reinventam a realidade visual.",
    curator: "Pedro Almeida",
    status: "Exposição em cartaz",
    heroImage: heroFotografia,
    featuredArtist: "Paula Mariane",
    featuredWork: "Laços de Honra",
    featuredWorkYear: 2024,
    featuredWorkTechnique: "Ensaio fotográfico",
    featuredWorkDescription: "Ensaio autoral de Paula Mariane que investiga vínculos familiares e afetivos através de retratos intimistas, revelando a força invisível dos laços que nos sustentam.",
  },
  {
    id: "pintura",
    name: "Pintura",
    slug: "pintura",
    tagline: "Cores que narram o indizível",
    description: "A pintura como gesto primordial da expressão humana. Do figurativo ao abstrato, cada tela é um universo em si.",
    color: "var(--egregora-orange)",
    angle: 180,
    heroDescription: "Telas que pulsam com vida própria. Pinturas que desafiam o olhar e convidam à contemplação profunda.",
    curator: "Luísa Fernandes",
    status: "Acervo permanente",
    heroImage: heroPintura,
    featuredArtist: "Siron Franco",
    featuredWork: "Torre de Babel",
    featuredWorkYear: 1996,
    featuredWorkTechnique: "Pintura — técnica mista sobre tela",
    featuredWorkDescription: "Obra monumental do artista goiano Siron Franco, Torre de Babel é uma reflexão visceral sobre a incomunicabilidade humana e a fragmentação das linguagens. Referência central do eixo de Pintura da Egrégora.",
  },
  {
    id: "danca",
    name: "Dança",
    slug: "danca",
    tagline: "O corpo como linguagem viva",
    description: "A dança na Egrégora é movimento, presença e ritual. Exploramos coreografias contemporâneas e performances que desafiam a gravidade.",
    color: "var(--egregora-yellow)",
    angle: 225,
    heroDescription: "Corpos em diálogo com o espaço. Coreografias que exploram a vulnerabilidade e a potência do movimento humano.",
    curator: "Rafael Torres",
    status: "Residência artística",
    heroImage: heroDanca,
    featuredArtist: "Artista a definir",
    featuredWork: "Obra a definir",
    featuredWorkYear: 2024,
    featuredWorkTechnique: "Coreografia contemporânea",
    featuredWorkDescription: "Obra carro-chefe do eixo Dança — em definição pela curadoria.",
  },
  {
    id: "literatura",
    name: "Literatura",
    slug: "literatura",
    tagline: "Palavras que constroem mundos",
    description: "A literatura como território de liberdade. Poesia, prosa, ensaio e narrativas experimentais que expandem o pensamento.",
    color: "var(--egregora-green)",
    angle: 270,
    heroDescription: "Textos que desafiam o silêncio. Poesia, ficção e ensaio como formas de reinventar a linguagem e o mundo.",
    curator: "Fernanda Lima",
    status: "Publicações abertas",
    heroImage: heroLiteratura,
    featuredArtist: "Artista a definir",
    featuredWork: "Obra a definir",
    featuredWorkYear: 2024,
    featuredWorkTechnique: "Poesia / Prosa",
    featuredWorkDescription: "Obra carro-chefe do eixo Literatura — em definição pela curadoria.",
  },
  {
    id: "escultura",
    name: "Escultura",
    slug: "escultura",
    tagline: "A matéria como expressão do espírito",
    description: "A escultura como diálogo entre forma e vazio. Instalações, objetos e intervenções que ocupam o espaço com presença e significado.",
    color: "var(--egregora-teal)",
    angle: 315,
    heroDescription: "Formas que habitam o espaço. Esculturas e instalações que transformam materiais em narrativas tridimensionais.",
    curator: "Diego Nascimento",
    status: "Exposição itinerante",
    heroImage: heroEscultura,
    featuredArtist: "Artista a definir",
    featuredWork: "Obra a definir",
    featuredWorkYear: 2024,
    featuredWorkTechnique: "Escultura / Instalação",
    featuredWorkDescription: "Obra carro-chefe do eixo Escultura — em definição pela curadoria.",
  },
];

// Re-export HpTheme for backwards-compat consumers
export type { HpTheme } from "./hp-collection";
// TransmidiaObra type and collection data live in transmidiaObras.ts
export type { TransmidiaObra } from "./transmidiaObras";
export { transmidiaObras } from "./transmidiaObras";
