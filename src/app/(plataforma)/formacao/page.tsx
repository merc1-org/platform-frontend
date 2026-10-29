import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ExternalOrSoon } from '@/components/ExternalOrSoon';
import { Icon } from '@/components/Icon';
import { ModuleCard, SEM_LINK_CAKTO } from '@/components/ModuleCard';
import { PageHead } from '@/components/PageHead';
import { buttonClass, Chip } from '@/components/ui';
import { getCurso } from '@/services/content';

export const metadata: Metadata = { title: 'Formação' };

export default async function FormacaoPage() {
  const curso = await getCurso();
  if (!curso) notFound();
  const emGravacao = curso.modulos.filter(m => m.status === 'em_gravacao');

  return (
    <>
      <PageHead eyebrow="Formação" title={curso.titulo} description={curso.descricao} />

      <section className="mb-7 grid grid-cols-1 items-center gap-6 rounded-[18px] border border-line bg-surface p-6 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div>
          <h2 className="font-display text-2xl font-medium">Comece pela Introdução</h2>
          <p className="mt-1.5 max-w-[60ch] text-muted">
            Os módulos seguem a ordem do funil. Assista na sequência e use as soluções prontas para
            aplicar cada etapa no mesmo dia.
          </p>
          <div className="mt-3.5 flex flex-wrap gap-2">
            <Chip>{curso.modulos.length} módulos</Chip>
            <Chip>aulas na Cakto</Chip>
            {emGravacao.map(m => (
              <Chip key={m.id} tone="accent">
                {m.titulo.toLowerCase()} em gravação
              </Chip>
            ))}
          </div>
        </div>
        <ExternalOrSoon
          url={curso.url}
          soonMessage={SEM_LINK_CAKTO}
          className={buttonClass('accent', { size: 'lg' })}
        >
          Acessar área de membros <Icon name="external" size={15} />
        </ExternalOrSoon>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
        {curso.modulos.map(m => (
          <ModuleCard key={m.id} modulo={m} cursoUrl={curso.url} />
        ))}
      </section>
    </>
  );
}
