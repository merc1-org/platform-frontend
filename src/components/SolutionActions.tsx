'use client';

import { useProgress } from '@/providers/ProgressProvider';
import { useToast } from '@/providers/ToastProvider';
import { FavoriteButton } from './FavoriteButton';
import { Icon } from './Icon';
import { useCopyPrompt } from './useCopyPrompt';

export function DoneButton({ slug }: { slug: string }) {
  const { concluidas, toggleConcluida } = useProgress();
  const toast = useToast();
  const on = concluidas.has(slug);
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() =>
        toast(toggleConcluida(slug) ? 'Solução marcada como concluída' : 'Marcação removida')
      }
      className={`inline-flex h-8 items-center gap-2 rounded-full border px-3 text-[12.5px] font-semibold ${
        on ? 'border-transparent bg-ok-soft text-ok' : 'border-line bg-surface'
      }`}
    >
      <Icon name={on ? 'checkCircle' : 'check'} size={15} />
      {on ? 'Concluída' : 'Marcar como concluída'}
    </button>
  );
}

export function SolutionHeaderActions({ slug, prompt }: { slug: string; prompt: string }) {
  const copy = useCopyPrompt();
  return (
    <div className="flex flex-wrap items-center gap-[18px] text-[13px] text-ink-2">
      <button
        type="button"
        onClick={() => copy(prompt)}
        className="inline-flex items-center gap-[7px] border-b border-line pb-[3px] hover:border-ink"
      >
        <Icon name="copy" size={15} /> Copiar prompt
      </button>
      <FavoriteButton slug={slug} variant="text" />
    </div>
  );
}
