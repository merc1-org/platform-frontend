'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import type { Categoria, Solucao } from '@/types/content';
import { FavoriteButton } from './FavoriteButton';
import { Icon } from './Icon';
import { VideoPoster } from './VideoPoster';
import { buttonClass, Chip } from './ui';

const INCLUI = [
  'Prompt pronto para copiar e colar',
  'Passo a passo de uso',
  'Guia em PDF com exemplos',
  'Aulas do Método Merc1 relacionadas',
];

interface SolutionModalProps {
  solucao: Solucao;
  categoria: Categoria;
  onClose: () => void;
}

export function SolutionModal({ solucao, categoria, onClose }: SolutionModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 grid animate-fade place-items-center bg-black/45 p-4 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        className="relative grid max-h-full w-full max-w-[980px] animate-rise grid-cols-1 overflow-auto rounded-[20px] bg-surface shadow-float min-[901px]:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3.5 top-3.5 z-10 grid size-[34px] place-items-center rounded-[9px] text-muted hover:bg-surface-2 hover:text-ink"
        >
          <Icon name="x" size={17} />
        </button>
        <VideoPoster
          video={solucao.video}
          className="m-3.5 min-h-[220px] rounded-[14px] min-[901px]:min-h-[360px]"
        />
        <div className="flex flex-col gap-3.5 px-[22px] pb-[22px] min-[901px]:py-7 min-[901px]:pl-3.5 min-[901px]:pr-7">
          <div className="eyebrow flex items-center gap-1.5">
            <Icon name={categoria.icone} size={13} /> {categoria.nome}
          </div>
          <h2 id="modal-titulo" className="font-display text-[26px] font-medium leading-[1.2]">
            {solucao.titulo}
          </h2>
          <p className="text-[13.5px] text-ink-2">{solucao.descricao}</p>
          <div className="eyebrow mt-1.5">O que vem na solução</div>
          <ul className="grid gap-2">
            {INCLUI.map(item => (
              <li key={item} className="flex items-center gap-2.5 text-[13px] text-ink-2">
                <span className="text-accent">
                  <Icon name="check" size={15} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="eyebrow mt-1.5">Funciona com</div>
          <div className="flex flex-wrap gap-2">
            {solucao.ferramentas.map(f => (
              <Chip key={f}>{f}</Chip>
            ))}
          </div>
          <div className="mt-auto grid gap-2.5 pt-2">
            <FavoriteButton slug={solucao.slug} variant="line" />
            <Link
              href={`/solucoes/${solucao.slug}/`}
              className={buttonClass('primary', { size: 'lg', block: true })}
            >
              Abrir solução <Icon name="arrow" size={16} />
            </Link>
            <small className="text-center font-mono text-[10.5px] tracking-[0.06em] text-muted">
              ESC OU CLIQUE FORA PARA FECHAR
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
