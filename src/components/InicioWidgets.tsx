'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Categoria, Solucao } from '@/types/content';
import { useAuth } from '@/providers/AuthProvider';
import { useProgress } from '@/providers/ProgressProvider';
import { progressoPorCategoria } from '@/utils/solucoes';
import { Icon } from './Icon';
import { SolutionCard } from './SolutionCard';
import { SolutionModal } from './SolutionModal';
import { buttonClass } from './ui';

export function Saudacao() {
  const { user } = useAuth();
  const [periodo, setPeriodo] = useState('Olá');

  useEffect(() => {
    const hora = new Date().getHours();
    setPeriodo(hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite');
  }, []);

  return (
    <>
      {periodo}, {user?.nome.split(' ')[0]}
    </>
  );
}

export function ProgressoSolucoes({
  solucoes,
  categorias,
}: {
  solucoes: Solucao[];
  categorias: Categoria[];
}) {
  const { concluidas } = useProgress();
  const linhas = progressoPorCategoria(solucoes, categorias, concluidas);
  const feitas = solucoes.filter(s => concluidas.has(s.slug)).length;

  return (
    <div className="flex flex-col gap-3.5 rounded-[18px] border border-line bg-surface p-6">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-[15px] font-semibold">Soluções aplicadas</h3>
        <span className="font-mono text-xs text-muted">
          {feitas} de {solucoes.length}
        </span>
      </div>
      <div className="grid gap-2.5">
        {linhas.map(l => (
          <div key={l.id} className="flex items-center justify-between gap-3 text-[13px]">
            <span>{l.nome}</span>
            <span className="h-1.5 max-w-[140px] flex-1 overflow-hidden rounded-full bg-surface-2">
              <i
                className="block h-full rounded-full bg-accent transition-[width]"
                style={{ width: `${l.total ? Math.round((l.concluidas / l.total) * 100) : 0}%` }}
              />
            </span>
            <span className="min-w-11 text-right font-mono text-xs tabular-nums text-muted">
              {l.concluidas}/{l.total}
            </span>
          </div>
        ))}
      </div>
      <p className="text-[13px] text-muted">
        Marque uma solução como concluída depois de usar o prompt pela primeira vez.
      </p>
      <Link href="/solucoes/" className={`${buttonClass('ghost')} mt-auto`}>
        Ver todas as soluções <Icon name="arrow" size={15} />
      </Link>
    </div>
  );
}

export function FavoritasInicio({
  solucoes,
  categorias,
}: {
  solucoes: Solucao[];
  categorias: Categoria[];
}) {
  const { favoritas } = useProgress();
  const [aberta, setAberta] = useState<string | null>(null);
  const fechar = useCallback(() => setAberta(null), []);
  const porId = useMemo(() => new Map(categorias.map(c => [c.id, c])), [categorias]);
  const lista = solucoes.filter(s => favoritas.has(s.slug)).slice(0, 3);
  const solucaoAberta = aberta ? solucoes.find(s => s.slug === aberta) : undefined;

  if (lista.length === 0) return null;

  return (
    <>
      <div className="mb-3.5 flex items-baseline justify-between gap-3">
        <h2 className="text-base font-bold">Suas favoritas</h2>
        <Link href="/solucoes/" className="text-[13px] font-semibold text-accent-ink">
          Ver todas
        </Link>
      </div>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
        {lista.map(s => {
          const categoria = porId.get(s.categoria);
          return categoria ? (
            <SolutionCard key={s.slug} solucao={s} categoria={categoria} onOpen={setAberta} />
          ) : null;
        })}
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
