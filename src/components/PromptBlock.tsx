'use client';

import { splitPlaceholders } from '@/utils/emphasis';
import { Icon } from './Icon';
import { buttonClass } from './ui';
import { useCopyPrompt } from './useCopyPrompt';

export function CopyPromptButton({ prompt, block = false }: { prompt: string; block?: boolean }) {
  const copy = useCopyPrompt();
  return (
    <button
      type="button"
      onClick={() => copy(prompt)}
      className={buttonClass('primary', { size: block ? 'md' : 'sm', block })}
    >
      <Icon name="copy" size={block ? 15 : 14} /> {block ? 'Copiar prompt' : 'Copiar'}
    </button>
  );
}

export function PromptBlock({ slug, prompt }: { slug: string; prompt: string }) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-line bg-surface">
      <div className="flex items-center justify-between gap-2.5 border-b border-line bg-surface-2 py-2.5 pl-4 pr-3">
        <span className="eyebrow">prompt · {slug}.md</span>
        <CopyPromptButton prompt={prompt} />
      </div>
      <pre
        id="prompt-texto"
        className="m-0 max-h-[520px] overflow-auto whitespace-pre-wrap break-words p-[18px] font-mono text-[12.5px] leading-[1.7] text-ink-2"
      >
        {splitPlaceholders(prompt).map((part, i) =>
          part.placeholder ? (
            <mark key={i} className="rounded px-[3px] bg-mark text-ink">
              {part.text}
            </mark>
          ) : (
            <span key={i}>{part.text}</span>
          )
        )}
      </pre>
    </div>
  );
}
