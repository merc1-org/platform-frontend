'use client';

import { useCallback, useMemo, useState } from 'react';
import type { Categoria, Solucao } from '@/types/content';
import { useProgress } from '@/providers/ProgressProvider';
import { useSearch } from '@/providers/SearchProvider';
import { filterSolucoes, type SolucoesSort, type SolucoesTab } from '@/utils/solucoes';
import { SolutionCard } from './SolutionCard';
import { SolutionModal } from './SolutionModal';

interface SolutionsBrowserProps {
  solucoes: Solucao[];
  categorias: Categoria[];
}

export function SolutionsBrowser({ solucoes, categorias }: SolutionsBrowserProps) {
  const { favoritas } = useProgress();
  const { q } = useSearch();
  const [tab, setTab] = useState<SolucoesTab>('todas');
  const [sort, setSort] = useState<SolucoesSort>('ordem');
  const [aberta, setAberta] = useState<string | null>(null);

  const porId = useMemo(() => new Map(categorias.map(c => [c.id, c])), [categorias]);
  const lista = useMemo(
    () => filterSolucoes(solucoes, categorias, { tab, q, favoritas, sort }),
    [solucoes, categorias, tab, q, favoritas, sort]
  );
  const tabs: [SolucoesTab, string, number][] = [
    ['todas', 'Todas', solucoes.length],
    ...categorias.map(
      c =>
        [c.id, c.nome, solucoes.filter(s => s.categoria === c.id).length] as [
          string,
          string,
          number,
        ]
    ),
    ['favoritas', 'Favoritas', solucoes.filter(s => favoritas.has(s.slug)).length],
  ];
  const solucaoAberta = aberta ? solucoes.find(s => s.slug === aberta) : undefined;
  const fechar = useCallback(() => setAberta(null), []);

  return (
    <>
      <nav
        role="tablist"
        className="mb-[22px] flex gap-1 overflow-x-auto border-b border-line [scrollbar-width:none]"
      >
        {tabs.map(([id, nome, n]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`-mb-px inline-flex h-10 items-center gap-[7px] whitespace-nowrap border-b-2 px-3 text-[13.5px] ${
              tab === id
                ? 'border-ink font-semibold text-ink'
                : 'border-transparent font-medium text-muted hover:text-ink'
            }`}
          >
            {nome}
            <span className="rounded-full bg-surface-2 px-1.5 py-px font-mono text-[10.5px] text-muted">
              {n}
            </span>
          </button>
        ))}
      </nav>

      <div className="mb-[18px] flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-xs text-muted">
          {lista.length} {lista.length === 1 ? 'solução' : 'soluções'}
          {q && ` para “${q}”`}
        </span>
        <div className="flex items-center gap-3.5 text-[12.5px] text-muted">
          <span className="eyebrow">Ordenar</span>
          {(
            [
              ['ordem', 'Por etapa'],
              ['az', 'A–Z'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setSort(id)}
              className={`border-b pb-0.5 ${sort === id ? 'border-ink font-semibold text-ink' : 'border-transparent text-muted'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
        {lista.length > 0 ? (
          lista.map(s => {
            const categoria = porId.get(s.categoria);
            return categoria ? (
              <SolutionCard key={s.slug} solucao={s} categoria={categoria} onOpen={setAberta} />
            ) : null;
          })
        ) : (
          <div className="col-span-full rounded-[14px] border border-dashed border-line px-6 py-12 text-center text-muted">
            <b className="mb-1 block text-[15px] text-ink">Nenhuma solução encontrada</b>
            {tab === 'favoritas' && !q
              ? 'Toque no coração de uma solução para guardá-la aqui.'
              : 'Tente outra palavra ou limpe a busca.'}
          </div>
        )}
      </section>

      {solucaoAberta && porId.get(solucaoAberta.categoria) && (
        <SolutionModal
          solucao={solucaoAberta}
          categoria={porId.get(solucaoAberta.categoria)!}
          onClose={fechar}
        />
      )}
    </>
  );
}
