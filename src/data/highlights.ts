export interface Highlight {
  tag: string;
  title: string;
  description: string;
  cta: string;
}

export const highlights: Highlight[] = [
  {
    tag: "Evento",
    title: "Mostra Egrégora 2026",
    description: "Exposição coletiva reunindo artistas de 8 linguagens em diálogo transmídia.",
    cta: "Saiba mais",
  },
  {
    tag: "Convocatória",
    title: "Chamada de Obras — Cinema",
    description: "Inscrições abertas para curtas e longas experimentais. Prazo: 30/04/2026.",
    cta: "Inscrever-se",
  },
  {
    tag: "Publicação",
    title: "Caderno Egrégora #3",
    description: "Nova edição do nosso caderno editorial com ensaios sobre arte e território.",
    cta: "Ler agora",
  },
];
