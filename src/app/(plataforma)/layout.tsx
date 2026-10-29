import { AppShell } from '@/components/AppShell';
import { AuthGuard } from '@/components/AuthGuard';
import { getRecursos, getSolucoes } from '@/services/content';

export default async function PlataformaLayout({ children }: { children: React.ReactNode }) {
  const [recursos, solucoes] = await Promise.all([getRecursos(), getSolucoes()]);
  return (
    <AuthGuard>
      <AppShell recursos={recursos} totalSolucoes={solucoes.length}>
        {children}
      </AppShell>
    </AuthGuard>
  );
}
