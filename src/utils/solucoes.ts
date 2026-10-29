import type { Categoria, Solucao } from '@/types/content';

export type SolucoesTab = 'todas' | 'favoritas' | string;
export type SolucoesSort = 'ordem' | 'az';

export interface SolucoesFilter {
  tab: SolucoesTab;
  q: string;
  favoritas: ReadonlySet<string>;
  sort: SolucoesSort;
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');

export function filterSolucoes(
  solucoes: Solucao[],
  categorias: Categoria[],
  { tab, q, favoritas, sort }: SolucoesFilter
): Solucao[] {
  const nomeCategoria = new Map(categorias.map(c => [c.id, c.nome]));
  const termo = normalize(q.trim());

  const list = solucoes.filter(s => {
    if (tab === 'favoritas' && !favoritas.has(s.slug)) return false;
    if (tab !== 'todas' && tab !== 'favoritas' && s.categoria !== tab) return false;
    if (!termo) return true;
    return normalize(`${s.titulo} ${s.resumo} ${nomeCategoria.get(s.categoria) ?? ''}`).includes(
      termo
    );
  });

  if (sort === 'az') return [...list].sort((a, b) => a.titulo.localeCompare(b.titulo, 'pt-BR'));
  return [...list].sort((a, b) => a.ordem - b.ordem);
}

export function progressoPorCategoria(
  solucoes: Solucao[],
  categorias: Categoria[],
  concluidas: ReadonlySet<string>
) {
  return categorias.map(c => {
    const daCategoria = solucoes.filter(s => s.categoria === c.id);
    return {
      id: c.id,
      nome: c.nome,
      total: daCategoria.length,
      concluidas: daCategoria.filter(s => concluidas.has(s.slug)).length,
    };
  });
}
