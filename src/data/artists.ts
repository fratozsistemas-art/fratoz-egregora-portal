import torreDeBabel from "@/assets/obras/torre-de-babel.png";
import franklinPaisagemInterior from "@/assets/obras/franklin-duarte-paisagem-interior.jpg";
import igorTerritorioMemoria from "@/assets/obras/igor-deodoro-territorio-memoria.jpg";

export interface Artist {
  id: string;
  name: string;
  category: string;
  role: string;
  bio: string;
  highlights: string[];
  featuredWork?: string;
  featuredWorkYear?: number;
  featuredWorkTechnique?: string;
  featuredWorkImage?: string;
  links?: { label: string; url: string }[];
}

export const artists: Artist[] = [
  {
    id: "siron-franco",
    name: "Siron Franco",
    category: "pintura",
    role: "Artista em destaque",
    bio: "Siron Franco é um artista plástico goiano de projeção internacional, nascido em Goiás Velho em 1947. Reconhecido por obras que investigam a condição humana com intensidade visceral, sua produção abrange pintura, escultura, gravura e instalação. Suas telas carregam uma força expressionista única, frequentemente abordando temas como violência, ecologia e a fragilidade do corpo. Com obras em acervos de museus como o MAM-SP, MAC-USP e instituições internacionais, Siron é considerado um dos artistas mais importantes da arte contemporânea brasileira.",
    highlights: [
      "Representou o Brasil na Bienal de Veneza",
      "Acervo em museus como MAM-SP e MAC-USP",
      "Mais de 50 anos de carreira artística",
      "Referência do expressionismo brasileiro contemporâneo",
    ],
    featuredWork: "Torre de Babel",
    featuredWorkYear: 2019,
    featuredWorkTechnique: "Pintura — técnica mista sobre tela (70×140cm)",
    featuredWorkImage: torreDeBabel,
  },
  {
    id: "franklin-duarte",
    name: "Franklin Duarte",
    category: "pintura",
    role: "Artista convidado",
    bio: "Franklin Duarte é um pintor contemporâneo cuja obra transita entre o figurativo e o onírico. Sua pintura explora memórias, paisagens interiores e a relação entre o visível e o sentido. Com uma paleta rica e gestualidade marcante, Franklin constrói narrativas visuais que convidam o espectador a habitar espaços de contemplação e descoberta. Sua participação na Egrégora reforça o diálogo entre tradição pictórica e experimentação contemporânea.",
    highlights: [
      "Obra entre o figurativo e o onírico",
      "Exploração de memórias e paisagens interiores",
      "Paleta rica e gestualidade marcante",
    ],
    featuredWork: "Paisagem Interior",
    featuredWorkYear: 2023,
    featuredWorkTechnique: "Óleo sobre tela",
    featuredWorkImage: franklinPaisagemInterior,
  },
  {
    id: "igor-deodoro",
    name: "Igor Deodoro",
    category: "pintura",
    role: "Artista convidado",
    bio: "Igor Deodoro é um artista emergente que combina técnica clássica com linguagem contemporânea, propondo novas leituras sobre identidade e território. Seu trabalho investiga a interseção entre o pessoal e o coletivo, utilizando a pintura como ferramenta de questionamento e afirmação cultural. Com uma produção crescente e participação em exposições coletivas, Igor representa a nova geração de pintores brasileiros que dialogam com a tradição sem abrir mão da inovação.",
    highlights: [
      "Técnica clássica com linguagem contemporânea",
      "Novas leituras sobre identidade e território",
      "Representante da nova geração de pintores brasileiros",
    ],
    featuredWork: "Território e Memória",
    featuredWorkYear: 2024,
    featuredWorkTechnique: "Técnica mista sobre tela",
    featuredWorkImage: igorTerritorioMemoria,
  },
  {
    id: "paula-mariane",
    name: "Paula Mariane",
    category: "fotografia",
    role: "Artista em destaque",
    bio: "Paula Mariane é fotojornalista e escritora, natural de Votorantim (SP). Formada em Jornalismo pela PUC-Campinas com bolsa integral e especialista em Relações Internacionais. Idealizadora do projeto \"Laços de Honra\", no qual documentou por cinco anos (2016–2020) a trajetória do oficial combatente do Exército Brasileiro, sendo a primeira pessoa a realizar uma série fotográfica de longa duração na Força Terrestre. Palestrante do TEDx Campinas 2019.",
    highlights: [
      "Primeira pessoa a documentar a formação militar em longa duração",
      "Sony World Photography Awards 2016 — Top 50 categoria Retrato",
      "Palestrante TEDx Campinas 2019",
      "Representou o Brasil em conferência de paz na Suíça",
    ],
    featuredWork: "Laços de Honra",
    featuredWorkYear: 2022,
    featuredWorkTechnique: "Livro fotográfico · Editora BIBLIEx",
    links: [
      { label: "Instagram", url: "https://www.instagram.com/paulamarianephoto/" },
      { label: "Amazon", url: "https://www.amazon.com.br/Laços-Honra-Paula-Mariane/dp/6557570420" },
      { label: "Folha de S.Paulo", url: "https://fotografia.folha.uol.com.br/galerias/1598748445693364-lacos-de-honra-o-outro-lado-do-exercito" },
      { label: "Spotify", url: "https://open.spotify.com/episode/28fnjDcOFO7rEM67PpM9pa" },
      { label: "YouTube", url: "https://www.youtube.com/watch?v=70iQA0GAbz0" },
    ],
  },
];

export const getArtistsByCategory = (category: string) =>
  artists.filter((a) => a.category === category);
