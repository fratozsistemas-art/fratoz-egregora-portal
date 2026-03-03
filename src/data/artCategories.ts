// Hero images
import heroCinema from "@/assets/heroes/hero-cinema.jpg";
import heroTeatro from "@/assets/heroes/hero-teatro.jpg";
import heroMusica from "@/assets/heroes/hero-musica.jpg";
import heroFotografia from "@/assets/heroes/hero-fotografia.jpg";
import heroPintura from "@/assets/heroes/hero-pintura.jpg";
import heroDanca from "@/assets/heroes/hero-danca.jpg";
import heroLiteratura from "@/assets/heroes/hero-literatura.jpg";
import heroEscultura from "@/assets/heroes/hero-escultura.jpg";

// Artwork images
import obra01 from "@/assets/obras/obra-01.jpg";
import obra02 from "@/assets/obras/obra-02.jpg";
import obra03 from "@/assets/obras/obra-03.jpg";
import obra04 from "@/assets/obras/obra-04.jpg";
import obra05 from "@/assets/obras/obra-05.jpg";
import obra06 from "@/assets/obras/obra-06.jpg";
import obra07 from "@/assets/obras/obra-07.jpg";
import obra08 from "@/assets/obras/obra-08.jpg";
import obra09 from "@/assets/obras/obra-09.jpg";
import obra10 from "@/assets/obras/obra-10.jpg";
import obra11 from "@/assets/obras/obra-11.jpg";
import obra12 from "@/assets/obras/obra-12.jpg";
import obra13 from "@/assets/obras/obra-13.jpg";
import obra14 from "@/assets/obras/obra-14.jpg";
import obra15 from "@/assets/obras/obra-15.jpg";
import obra16 from "@/assets/obras/obra-16.jpg";

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
    name: "Cinema",
    slug: "cinema",
    heroImage: heroCinema,
    description: "Explore o mundo do cinema.",
  },
  {
    name: "Teatro",
    slug: "teatro",
    heroImage: heroTeatro,
    description: "Descubra a magia do teatro.",
  },
  {
    name: "Música",
    slug: "musica",
    heroImage: heroMusica,
    description: "Deixe-se levar pelos sons da música.",
  },
  {
    name: "Fotografia",
    slug: "fotografia",
    heroImage: heroFotografia,
    description: "Capture momentos através da fotografia.",
  },
  {
    name: "Pintura",
    slug: "pintura",
    heroImage: heroPintura,
    description: "Admire a beleza da pintura.",
  },
  {
    name: "Dança",
    slug: "danca",
    heroImage: heroDanca,
    description: "Sinta o ritmo da dança.",
  },
  {
    name: "Literatura",
    slug: "literatura",
    heroImage: heroLiteratura,
    description: "Aventure-se no mundo da literatura.",
  },
  {
    name: "Escultura",
    slug: "escultura",
    heroImage: heroEscultura,
    description: "Contemple a forma da escultura.",
  },
];

// Re-export HpTheme from shared source
export type { HpTheme } from "./hp-collection";

export interface TransmidiaObra {
  id: string;
  title: string;
  author: string;
  year: number;
  technique: string;
  theme: string;
  dimensions: string;
  description: string;
  room: number;
  category: string;
  image: string;
  collection?: string;
  continent?: string;
  hpTheme?: import("./hp-collection").HpTheme;
}

const obraImages: Record<string, string> = {
  "1": obra01, "2": obra02, "3": obra03, "4": obra04,
  "5": obra05, "6": obra06, "7": obra07, "8": obra08,
  "9": obra09, "10": obra10, "11": obra11, "12": obra12,
  "13": obra13, "14": obra14, "15": obra15, "16": obra16,
};

import { hpToTransmidiaObras } from "./hp-collection";

const baseObras: TransmidiaObra[] = [
  { id: "1", title: "Fragmentos do Silêncio", author: "Marina Veloso", year: 2023, technique: "Instalação multimídia", theme: "Memória", dimensions: "4m × 3m × 2.5m", description: "Uma instalação imersiva que utiliza projeções e som ambiente para criar um espaço de introspecção e memória coletiva.", room: 1, category: "cinema", image: obraImages["1"] },
  { id: "2", title: "Raízes Aéreas", author: "Tomás Junqueira", year: 2024, technique: "Escultura cinética", theme: "Natureza", dimensions: "2.8m × 1.5m", description: "Escultura suspensa que responde ao vento e ao movimento dos visitantes, evocando a relação entre raízes e voo.", room: 1, category: "escultura", image: obraImages["2"] },
  { id: "3", title: "Códigos do Corpo", author: "Lara Santos", year: 2023, technique: "Vídeo-performance", theme: "Identidade", dimensions: "Duração: 18min", description: "Performance filmada que explora as marcas, cicatrizes e gestos do corpo como linguagem autobiográfica.", room: 1, category: "danca", image: obraImages["3"] },
  { id: "4", title: "Ecos Urbanos", author: "Felipe Braga", year: 2022, technique: "Fotografia em grande formato", theme: "Cidade", dimensions: "180cm × 120cm", description: "Série fotográfica que captura os espaços abandonados da cidade, revelando camadas de história e esquecimento.", room: 1, category: "fotografia", image: obraImages["4"] },
  { id: "5", title: "A Cor do Tempo", author: "Isabela Ramos", year: 2024, technique: "Pintura a óleo sobre linho", theme: "Tempo", dimensions: "200cm × 150cm", description: "Uma grande tela que explora a passagem do tempo através de camadas cromáticas que se sobrepõem e se dissolvem.", room: 2, category: "pintura", image: obraImages["5"] },
  { id: "6", title: "Manifesto em Sol Menor", author: "Bruno Cavalcanti", year: 2023, technique: "Composição eletroacústica", theme: "Resistência", dimensions: "Duração: 24min", description: "Peça sonora que combina samples urbanos, instrumentos acústicos e síntese eletrônica em um manifesto auditivo.", room: 2, category: "musica", image: obraImages["6"] },
  { id: "7", title: "Cartografia Invisível", author: "Renata Moura", year: 2024, technique: "Instalação interativa", theme: "Território", dimensions: "Sala inteira", description: "Mapa sensorial que convida o público a redesenhar fronteiras e territórios a partir de suas memórias afetivas.", room: 2, category: "literatura", image: obraImages["7"] },
  { id: "8", title: "Pele de Concreto", author: "André Oliveira", year: 2022, technique: "Técnica mista", theme: "Cidade", dimensions: "300cm × 200cm", description: "Painel que funde fotografia, pintura e colagem para criar uma textura urbana viva e pulsante.", room: 2, category: "pintura", image: obraImages["8"] },
  { id: "9", title: "Diálogos com o Vazio", author: "Camila Freitas", year: 2023, technique: "Teatro experimental", theme: "Existência", dimensions: "Duração: 45min", description: "Espetáculo minimalista para um único ator que explora a solidão e a busca por conexão em tempos líquidos.", room: 2, category: "teatro", image: obraImages["9"] },
  { id: "10", title: "Ondas de Papel", author: "Lucas Mendonça", year: 2024, technique: "Origami em grande escala", theme: "Transformação", dimensions: "5m × 3m × 2m", description: "Instalação feita inteiramente de papel dobrado que simula ondas oceânicas em perpétuo movimento.", room: 3, category: "escultura", image: obraImages["10"] },
  { id: "11", title: "Retratos Líquidos", author: "Patrícia Nogueira", year: 2023, technique: "Aquarela digital", theme: "Identidade", dimensions: "Série de 12 peças", description: "Série de retratos que se dissolvem e reformam, questionando a estabilidade da identidade contemporânea.", room: 3, category: "pintura", image: obraImages["11"] },
  { id: "12", title: "Sussurros do Asfalto", author: "Marcos Ribeiro", year: 2022, technique: "Documentário sonoro", theme: "Cidade", dimensions: "Duração: 32min", description: "Paisagem sonora que captura os sons imperceptíveis das ruas, criando uma sinfonia do cotidiano urbano.", room: 3, category: "musica", image: obraImages["12"] },
  { id: "13", title: "Constelações Internas", author: "Júlia Vasconcelos", year: 2024, technique: "Projeção mapeada", theme: "Cosmos", dimensions: "Espaço imersivo 360°", description: "Ambiente imersivo com projeções que transformam o espaço em um cosmos interior, convidando à meditação.", room: 3, category: "cinema", image: obraImages["13"] },
  { id: "14", title: "Tecendo o Impossível", author: "Sandra Machado", year: 2023, technique: "Tapeçaria contemporânea", theme: "Sonho", dimensions: "400cm × 250cm", description: "Grande tapeçaria que mescla técnicas ancestrais com materiais industriais para narrar paisagens oníricas.", room: 3, category: "escultura", image: obraImages["14"] },
  { id: "15", title: "Versos em Chamas", author: "Ricardo Bastos", year: 2024, technique: "Poesia visual", theme: "Resistência", dimensions: "Série de 8 peças", description: "Poemas visuais que utilizam tipografia, fogo e fotografia para criar manifestos poéticos inflamáveis.", room: 1, category: "literatura", image: obraImages["15"] },
  { id: "16", title: "Corpo-Território", author: "Aline Duarte", year: 2023, technique: "Dança-filme", theme: "Território", dimensions: "Duração: 12min", description: "Curta que funde dança contemporânea com paisagem natural, explorando o corpo como extensão da terra.", room: 2, category: "danca", image: obraImages["16"] },
];

// Merge base obras with HP collection (single source of truth)
export const transmidiaObras: TransmidiaObra[] = [
  ...baseObras,
  ...hpToTransmidiaObras(),
];
