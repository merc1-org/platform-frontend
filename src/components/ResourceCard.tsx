'use client';

import Link from 'next/link';
import type { Recurso } from '@/types/content';
import { useToast } from '@/providers/ToastProvider';
import { Icon } from './Icon';
import { Chip, Tile } from './ui';

const CARD =
  'flex flex-col gap-2.5 rounded-[14px] border border-line p-[18px] text-left transition';

export function ResourceCard({ recurso }: { recurso: Recurso }) {
  const toast = useToast();
  const emBreve = recurso.status === 'em_breve';

  const body = (
    <>
      <div className="flex items-center justify-between gap-2">
        <Tile icon={recurso.icone} accent={!emBreve} />
        <Chip tone={emBreve ? 'default' : 'ok'}>{recurso.rotulo}</Chip>
      </div>
      <h3 className="text-[15px] font-semibold">{recurso.titulo}</h3>
      <p className="text-[13px] text-muted">{recurso.descricao}</p>
    </>
  );

  if (emBreve || !recurso.acao) {
    return (
      <button
        type="button"
        className={CARD}
        onClick={() => toast(recurso.aviso ?? 'Em breve', 'clock')}
      >
        {body}
        <span className="mt-auto inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-muted">
          <Icon name="clock" size={14} /> Em preparação
        </span>
      </button>
    );
  }

  const externo = recurso.acao.tipo === 'externo';
  const footer = (
    <span className="mt-auto inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-accent-ink">
      {recurso.acao.texto} <Icon name={externo ? 'external' : 'arrow'} size={14} />
    </span>
  );
  const interactive = `${CARD} bg-surface hover:border-accent/40 hover:shadow-card`;

  return externo ? (
    <a
      href={recurso.acao.destino}
      target="_blank"
      rel="noopener noreferrer"
      className={interactive}
    >
      {body}
      {footer}
    </a>
  ) : (
    <Link href={recurso.acao.destino} className={interactive}>
      {body}
      {footer}
    </Link>
  );
}
