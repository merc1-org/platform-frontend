import type { Metadata } from 'next';
import { PageHead } from '@/components/PageHead';
import { SolutionsBrowser } from '@/components/SolutionsBrowser';
import { getCategorias, getSolucoes } from '@/services/content';

export const metadata: Metadata = { title: 'Soluções' };

export default async function SolucoesPage() {
  const [solucoes, categorias] = await Promise.all([getSolucoes(), getCategorias()]);
  return (
    <>
      <PageHead
        eyebrow="Soluções prontas"
        title="Todas as soluções"
        description="Prompts testados para o dia a dia do corretor. Abra, preencha os campos entre colchetes e cole na sua IA."
      />
      <SolutionsBrowser solucoes={solucoes} categorias={categorias} />
    </>
  );
}
