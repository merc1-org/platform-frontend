'use client';

import type { Categoria, Solucao } from '@/types/content';
import { useProgress } from '@/providers/ProgressProvider';
import { FavoriteButton } from './FavoriteButton';
import { Chip, Tile } from './ui';

interface SolutionCardProps {
  solucao: Solucao;
  categoria: Categoria;
  onOpen: (slug: string) => void;
}

export function SolutionCard({ solucao, categoria, onOpen }: SolutionCardProps) {
  const { concluidas } = useProgress();
  const formatos = [...new Set(['md', ...solucao.arquivos.map(a => a.formato)])];

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={solucao.titulo}
      onClick={() => onOpen(solucao.slug)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(solucao.slug);
        }
      }}
      className="relative flex min-w-0 cursor-pointer flex-col gap-3 rounded-[14px] border border-line bg-surface p-5 text-left transition duration-200 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-card"
    >
      <FavoriteButton
        slug={solucao.slug}
        variant="round"
        className="absolute right-4 top-4 z-[2]"
      />
      <div className="flex items-center gap-3 pr-9">
        <Tile icon={categoria.icone} />
        <span className="eyebrow">{categoria.nome}</span>
      </div>
      <h3 className="text-[15.5px] font-semibold leading-[1.35]">{solucao.titulo}</h3>
      <p className="line-clamp-2 text-[13px] text-muted">{solucao.resumo}</p>
      <div className="mt-auto flex items-center justify-between gap-2.5 border-t border-line pt-3 font-mono text-[11px] text-muted">
        <span>
          {concluidas.has(solucao.slug) ? (
            <Chip tone="ok">concluída</Chip>
          ) : (
            `Prompt · ${solucao.tempoMinutos} min`
          )}
        </span>
        <span className="flex gap-1.5">
          {formatos.map(f => (
            <Chip key={f}>{f}</Chip>
          ))}
        </span>
      </div>
    </article>
  );
}
