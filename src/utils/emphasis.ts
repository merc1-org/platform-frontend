export interface EmphasisPart {
  text: string;
  em: boolean;
}

// Conteúdo não carrega HTML: trechos entre *asteriscos* viram destaque.
export function parseEmphasis(text: string): EmphasisPart[] {
  const parts: EmphasisPart[] = [];
  const re = /\*(.+?)\*/g;
  let last = 0;
  for (const match of text.matchAll(re)) {
    const start = match.index ?? 0;
    if (start > last) parts.push({ text: text.slice(last, start), em: false });
    parts.push({ text: match[1], em: true });
    last = start + match[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), em: false });
  return parts;
}

export interface PromptPart {
  text: string;
  placeholder: boolean;
}

export function splitPlaceholders(prompt: string): PromptPart[] {
  return prompt
    .split(/(\[[^\]]+\])/g)
    .filter(Boolean)
    .map(text => ({ text, placeholder: /^\[[^\]]+\]$/.test(text) }));
}
