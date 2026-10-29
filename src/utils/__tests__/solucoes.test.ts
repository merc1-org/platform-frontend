import { describe, expect, it } from 'vitest';
import type { Categoria, Solucao } from '@/types/content';
import { filterSolucoes, progressoPorCategoria } from '../solucoes';

const categorias: Categoria[] = [
  { id: 'marketing', nome: 'Marketing', icone: 'megaphone', ordem: 1 },
  { id: 'vendas', nome: 'Vendas', icone: 'target', ordem: 2 },
];

const solucao = (slug: string, categoria: string, titulo: string, ordem: number): Solucao => ({
  id: slug,
  slug,
  categoria,
  titulo,
  resumo: `Resumo de ${titulo}`,
  descricao: '',
  tempoMinutos: 5,
  ordem,
  status: 'publicado',
  ferramentas: [],
  video: { url: null, chamada: '', subtitulo: '' },
  prompt: 'x',
  arquivos: [],
  aulasRelacionadas: [],
});

const solucoes = [
  solucao('reels', 'marketing', 'Roteiros de Reels', 2),
  solucao('anuncio', 'marketing', 'Anúncio de portal', 1),
  solucao('objecoes', 'vendas', 'Respostas a objeções', 3),
];

const filtro = { tab: 'todas', q: '', favoritas: new Set<string>(), sort: 'ordem' as const };

describe('filterSolucoes', () => {
  it('ordena pela ordem editorial por padrão', () => {
    expect(filterSolucoes(solucoes, categorias, filtro).map(s => s.slug)).toEqual([
      'anuncio',
      'reels',
      'objecoes',
    ]);
  });

  it('ordena de A a Z respeitando acentos', () => {
    const r = filterSolucoes(solucoes, categorias, { ...filtro, sort: 'az' });
    expect(r.map(s => s.slug)).toEqual(['anuncio', 'objecoes', 'reels']);
  });

  it('filtra por categoria', () => {
    expect(
      filterSolucoes(solucoes, categorias, { ...filtro, tab: 'vendas' }).map(s => s.slug)
    ).toEqual(['objecoes']);
  });

  it('mostra só favoritas na aba de favoritas', () => {
    const r = filterSolucoes(solucoes, categorias, {
      ...filtro,
      tab: 'favoritas',
      favoritas: new Set(['reels']),
    });
    expect(r.map(s => s.slug)).toEqual(['reels']);
  });

  it('busca ignorando acentos e caixa, inclusive pelo nome da categoria', () => {
    expect(
      filterSolucoes(solucoes, categorias, { ...filtro, q: 'ANUNCIO' }).map(s => s.slug)
    ).toEqual(['anuncio']);
    expect(
      filterSolucoes(solucoes, categorias, { ...filtro, q: 'vendas' }).map(s => s.slug)
    ).toEqual(['objecoes']);
  });
});

describe('progressoPorCategoria', () => {
  it('conta concluídas por categoria', () => {
    expect(progressoPorCategoria(solucoes, categorias, new Set(['reels']))).toEqual([
      { id: 'marketing', nome: 'Marketing', total: 2, concluidas: 1 },
      { id: 'vendas', nome: 'Vendas', total: 1, concluidas: 0 },
    ]);
  });
});
