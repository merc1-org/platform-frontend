import type { Modulo } from '@/types/content';
import { ExternalOrSoon } from './ExternalOrSoon';
import { Icon } from './Icon';
import { Chip } from './ui';

export const SEM_LINK_CAKTO = 'Link da Cakto entra aqui assim que for configurado';
export const ordemModulo = (m: Modulo) => String(m.ordem).padStart(2, '0');

export function ModuleCard({ modulo, cursoUrl }: { modulo: Modulo; cursoUrl: string | null }) {
  const gravando = modulo.status === 'em_gravacao';

  const content = (
    <>
      <div
        className={`glow glow-bottom flex aspect-video max-w-full flex-col justify-between bg-[#151514] p-4 text-night-text ${gravando ? 'opacity-60 grayscale' : ''}`}
      >
        <span className="font-mono text-[11px] tracking-[0.1em] text-night-muted">
          MÓDULO {ordemModulo(modulo)}
        </span>
        <span className="max-w-[14ch] font-display text-[21px] leading-[1.15]">
          {modulo.titulo}
        </span>
        <span className="absolute bottom-3.5 right-3.5 grid size-9 place-items-center rounded-full bg-white/12 backdrop-blur-sm">
          <Icon name={gravando ? 'lock' : 'play'} size={15} />
        </span>
      </div>
      <div className="grid gap-1.5 px-4 pb-4 pt-3.5">
        <p className="text-[13px] text-muted">{modulo.descricao}</p>
        <div
          className={`mt-1 flex items-center justify-between gap-2 text-[12.5px] font-semibold ${gravando ? 'text-muted' : 'text-accent-ink'}`}
        >
          {gravando ? (
            <Chip>em gravação</Chip>
          ) : (
            <>
              <span>Assistir na Cakto</span>
              <Icon name="external" size={14} />
            </>
          )}
        </div>
      </div>
    </>
  );

  const className = `flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface text-left transition duration-200 ${
    gravando ? '' : 'hover:-translate-y-0.5 hover:shadow-card'
  }`;

  return (
    <ExternalOrSoon
      url={gravando ? null : (modulo.url ?? cursoUrl)}
      soonMessage={gravando ? `O módulo ${modulo.titulo} está em gravação` : SEM_LINK_CAKTO}
      className={className}
    >
      {content}
    </ExternalOrSoon>
  );
}
