import lacosHonra01 from "@/assets/obras/lacos-honra-01.jpg";
import lacosHonra02 from "@/assets/obras/lacos-honra-02.jpg";
import lacosHonra03 from "@/assets/obras/lacos-honra-03.jpg";
import lacosHonra04 from "@/assets/obras/lacos-honra-04.jpg";
import lacosHonra05 from "@/assets/obras/lacos-honra-05.jpg";
import lacosHonra06 from "@/assets/obras/lacos-honra-06.jpg";

export interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  caption?: string;
  year?: number;
  location?: string;
  orientation: "landscape" | "portrait" | "square";
}

export const LACOS_HONRA_GALLERY: GalleryPhoto[] = [
  {
    id: "lh-01",
    src: lacosHonra01,
    title: "Formação ao amanhecer",
    caption: "Cadetes em formação durante os primeiros raios de luz na EsPCEx, Campinas (SP).",
    year: 2016,
    location: "EsPCEx, Campinas",
    orientation: "landscape",
  },
  {
    id: "lh-02",
    src: lacosHonra02,
    title: "Determinação",
    caption: "Retrato intimista de um cadete — o olhar que carrega o peso da missão e a certeza do propósito.",
    year: 2017,
    location: "AMAN, Resende",
    orientation: "portrait",
  },
  {
    id: "lh-03",
    src: lacosHonra03,
    title: "Marcha sob chuva",
    caption: "A formação não para. Cadetes avançam sob temporal durante treinamento de campo na AMAN.",
    year: 2018,
    location: "AMAN, Resende",
    orientation: "landscape",
  },
  {
    id: "lh-04",
    src: lacosHonra04,
    title: "Laços",
    caption: "O aperto de mão que simboliza a fraternidade forjada nos anos de formação — o laço que dá nome ao projeto.",
    year: 2019,
    location: "EsAO, Rio de Janeiro",
    orientation: "square",
  },
  {
    id: "lh-05",
    src: lacosHonra05,
    title: "Aspirantado",
    caption: "O momento da consagração: cadetes lançam os quepes ao céu na cerimônia de formatura da AMAN.",
    year: 2020,
    location: "AMAN, Resende",
    orientation: "landscape",
  },
  {
    id: "lh-06",
    src: lacosHonra06,
    title: "Corredor da ECEME",
    caption: "Silhuetas nos corredores da Escola de Comando e Estado-Maior — os altos estudos militares.",
    year: 2020,
    location: "ECEME, Rio de Janeiro",
    orientation: "landscape",
  },
];
