import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Emphasis } from '@/components/Emphasis';
import { ExternalOrSoon } from '@/components/ExternalOrSoon';
import { Icon } from '@/components/Icon';
import { FavoritasInicio, ProgressoSolucoes, Saudacao } from '@/components/InicioWidgets';
import { SEM_LINK_CAKTO } from '@/components/ModuleCard';
import { PageHead } from '@/components/PageHead';
import { ResourceCard } from '@/components/ResourceCard';
import { getCategorias, getCurso, getRecursos, getSolucoes } from '@/services/content';

export const metadata: Metadata = { title: 'Início' };

export default async function InicioPage() {
  const [curso, solucoes, categorias, recursos] = await Promise.all([
    getCurso(),
    getSolucoes(),
    getCategorias(),
    getRecursos(),
  ]);
  if (!curso) notFound();

  return (
    <>
      <PageHead eyebrow={<Saudacao />} title="Sua plataforma" />

      <section className="mb-9 grid grid-cols-1 gap-[18px] min-[901px]:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="glow flex min-h-60 flex-col justify-between gap-7 rounded-[18px] bg-night p-[22px] text-night-text sm:p-[30px]">
          <div>
            <div className="eyebrow !text-night-muted">Formação · {curso.titulo}</div>
            <h2 className="mt-2.5 max-w-[22ch] font-display text-[clamp(22px,2.3vw,30px)] font-medium leading-[1.2]">
              <Emphasis text={curso.destaque.titulo} emClassName="text-night-accent" />
            </h2>
            <p className="mt-2.5 max-w-[48ch] text-[#bdbdb7]">{curso.destaque.texto}</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <ExternalOrSoon
              url={curso.url}
              soonMessage={SEM_LINK_CAKTO}
              className="inline-flex h-10 items-center gap-2 rounded-[9px] bg-night-text px-4 text-[13.5px] font-semibold text-night hover:opacity-90"
            >
              <Icon name="play" size={15} /> Assistir às aulas
            </ExternalOrSoon>
            <Link
              href="/formacao/"
              className="inline-flex h-10 items-center rounded-[9px] border border-night-line px-4 text-[13.5px] font-semibold text-night-text hover:border-night-muted"
            >
              Ver módulos
            </Link>
          </div>
        </div>
        <ProgressoSolucoes solucoes={solucoes} categorias={categorias} />
      </section>

      <h2 className="mb-3.5 text-base font-bold">O que está na sua plataforma</h2>
      <section className="mb-10 grid grid-cols-1 gap-3.5 sm:grid-cols-2 min-[1081px]:grid-cols-3">
        {recursos.map(r => (
          <ResourceCard key={r.id} recurso={r} />
        ))}
      </section>

      <FavoritasInicio solucoes={solucoes} categorias={categorias} />
    </>
  );
}
