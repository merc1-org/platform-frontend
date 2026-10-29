'use client';

import { useProgress } from '@/providers/ProgressProvider';
import { useToast } from '@/providers/ToastProvider';
import { Icon } from './Icon';

interface FavoriteButtonProps {
  slug: string;
  variant: 'round' | 'text' | 'line';
  className?: string;
}

const VARIANT = {
  round: (on: boolean) =>
    `grid size-8 place-items-center rounded-full border border-line bg-surface transition hover:scale-105 hover:text-accent ${on ? 'text-accent' : 'text-muted'}`,
  text: (on: boolean) =>
    `inline-flex items-center gap-[7px] border-b pb-[3px] ${on ? 'border-accent text-accent-ink' : 'border-line hover:border-ink'}`,
  line: (on: boolean) =>
    `flex w-full items-center gap-2 border-b border-line pb-2.5 text-[13px] font-medium ${on ? 'text-accent-ink' : ''}`,
};

export function FavoriteButton({ slug, variant, className = '' }: FavoriteButtonProps) {
  const { favoritas, toggleFavorita } = useProgress();
  const toast = useToast();
  const on = favoritas.has(slug);

  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label={variant === 'round' ? (on ? 'Remover dos favoritos' : 'Favoritar') : undefined}
      className={`${VARIANT[variant](on)} ${className}`}
      onClick={e => {
        e.stopPropagation();
        const agora = toggleFavorita(slug);
        toast(agora ? 'Adicionada às favoritas' : 'Removida das favoritas', 'heart');
      }}
    >
      <Icon name="heart" size={15} filled={on} />
      {variant !== 'round' && (on ? 'Favoritada' : 'Favoritar')}
    </button>
  );
}
