import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalOrSoon } from '@/components/ExternalOrSoon';
import { Icon } from '@/components/Icon';
import { ordemModulo, SEM_LINK_CAKTO } from '@/components/ModuleCard';
import { CopyPromptButton, PromptBlock } from '@/components/PromptBlock';
import { DoneButton, SolutionHeaderActions } from '@/components/SolutionActions';
import { Chip, Tile } from '@/components/ui';
import { VideoPoster } from '@/components/VideoPoster';
import { getCategorias, getCurso, getSolucao, getSolucoes } from '@/services/content';

interface Params {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getSolucoes()).map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const solucao = await getSolucao((await params).slug);
  return { title: solucao?.titulo ?? 'Solução' };
}

const PASSOS = [
  'Copie o prompt abaixo.',
  'Troque os campos [entre colchetes] pelos seus dados.',
  'Cole no ChatGPT, Claude ou Gemini e envie.',
  'Revise valores, metragens e nomes antes de publicar ou enviar.',
];

export default async function SolucaoPage({ params }: Params) {
  const { slug } = await params;
  const solucao = await getSolucao(slug);
  if (!solucao) notFound();

  const categoria = (await getCategorias()).find(c => c.id === solucao.categoria);
  const cursos = new Map<string, Awaited<ReturnType<typeof getCurso>>>();
  for (const a of solucao.aulasRelacionadas) {
    if (!cursos.has(a.curso)) cursos.set(a.curso, await getCurso(a.curso));
  }
  const aulas = solucao.aulasRelacionadas.flatMap(a => {
    const curso = cursos.get(a.curso);
    const modulo = curso?.modulos.find(m => m.id === a.modulo);
    return curso && modulo ? [{ curso, modulo }] : [];
  });

  return (
    <>
      <div className="mb-3.5 flex items-center gap-2">
        <Link href="/solucoes/" className="eyebrow inline-flex items-center gap-1.5 hover:text-ink">
          <Icon name="back" size={13} /> Soluções
        </Link>
        <span className="eyebrow">/</span>
        <span className="eyebrow">{categoria?.nome}</span>
      </div>

      <div className="mb-3.5 flex flex-wrap items-start justify-between gap-5">
        <div className="grid gap-3">
          <h1 className="font-display text-[clamp(26px,3vw,36px)] font-medium leading-[1.15] tracking-[-0.015em]">
            {solucao.titulo}
          </h1>
          <div>
            <DoneButton slug={solucao.slug} />
          </div>
        </div>
        <SolutionHeaderActions slug={solucao.slug} prompt={solucao.prompt} />
      </div>
      <p className="mb-[26px] max-w-[70ch] text-[14.5px] text-ink-2">{solucao.descricao}</p>

      <div className="grid grid-cols-1 items-start gap-7 min-[1081px]:grid-cols-[minmax(0,1fr)_330px]">
        <div className="min-w-0">
          <VideoPoster video={solucao.video} className="aspect-video max-w-full rounded-[18px]" />

          <section className="mt-7">
            <h2 className="mb-3 text-base font-bold">Como usar</h2>
            <ol className="grid gap-2.5">
              {PASSOS.map((passo, i) => (
                <li key={passo} className="grid grid-cols-[28px_minmax(0,1fr)] items-start gap-3">
                  <span className="grid size-7 place-items-center rounded-full border border-line bg-surface-2 font-mono text-xs text-ink-2">
                    {i + 1}
                  </span>
                  <span className="pt-[3px]">{passo}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-7">
            <h2 className="mb-3 text-base font-bold">Prompt</h2>
            <PromptBlock slug={solucao.slug} prompt={solucao.prompt} />
          </section>
        </div>

        <aside className="grid gap-[22px] min-[1081px]:sticky min-[1081px]:top-[88px]">
          <div>
            <div className="eyebrow mb-2.5">Arquivos e links</div>
            <div className="grid gap-3 rounded-[14px] border border-line bg-surface p-[18px] shadow-card">
              <div className="eyebrow text-[9.5px]">Solução incluída · {categoria?.nome}</div>
              <h3 className="text-[15px] font-semibold">Este material é seu.</h3>
              <p className="text-[13px] text-muted">
                Use quantas vezes quiser, em quantos imóveis quiser. Funciona em qualquer IA de
                texto.
              </p>
              <div className="flex flex-wrap gap-2">
                {solucao.ferramentas.map(f => (
                  <Chip key={f}>{f}</Chip>
                ))}
              </div>
              <CopyPromptButton prompt={solucao.prompt} block />
              {solucao.arquivos.map(a => (
                <ExternalOrSoon
                  key={a.titulo}
                  url={a.url}
                  soonMessage="O guia em PDF desta solução ainda está sendo preparado"
                  className="flex w-full items-center gap-3 rounded-[10px] border border-line p-2.5 text-left transition hover:border-muted"
                >
                  <Tile icon="file" size={17} />
                  <span className="min-w-0 flex-1">
                    <b className="block text-[13px] font-semibold">{a.titulo}</b>
                    <small className="font-mono text-[10.5px] text-muted">
                      {a.formato.toUpperCase()} · {a.descricao}
                    </small>
                  </span>
                  <Icon name={a.url ? 'external' : 'arrow'} size={15} />
                </ExternalOrSoon>
              ))}
            </div>
          </div>

          {aulas.length > 0 && (
            <div>
              <div className="eyebrow mb-1.5">Aulas que te ajudam · {aulas.length}</div>
              <div className="grid gap-1">
                {aulas.map(({ curso, modulo }) => {
                  const gravando = modulo.status === 'em_gravacao';
                  return (
                    <ExternalOrSoon
                      key={`${curso.id}-${modulo.id}`}
                      url={gravando ? null : (modulo.url ?? curso.url)}
                      soonMessage={
                        gravando ? `O módulo ${modulo.titulo} está em gravação` : SEM_LINK_CAKTO
                      }
                      className="flex w-full items-center gap-3 rounded-[10px] p-2 text-left hover:bg-surface-2"
                    >
                      <span className="grid size-[46px] flex-none place-items-center rounded-[9px] bg-[#151514] font-mono text-xs text-night-accent">
                        {ordemModulo(modulo)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <b className="block text-[13px] font-semibold">{modulo.titulo}</b>
                        <small className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                          Formação · {curso.titulo}
                        </small>
                      </span>
                      <Icon name={gravando ? 'lock' : 'external'} size={14} />
                    </ExternalOrSoon>
                  );
                })}
              </div>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
