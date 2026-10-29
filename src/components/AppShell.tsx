'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Recurso } from '@/types/content';
import { useAuth } from '@/providers/AuthProvider';
import { useSearch } from '@/providers/SearchProvider';
import { useToast } from '@/providers/ToastProvider';
import { Icon, type IconName } from './Icon';
import { Merc1Symbol, Wordmark } from './Merc1Symbol';
import { ThemeToggle } from './ThemeToggle';
import { Chip } from './ui';

interface AppShellProps {
  recursos: Recurso[];
  totalSolucoes: number;
  children: React.ReactNode;
}

const NAV_ITEM =
  'flex h-[38px] w-full items-center gap-[11px] rounded-[10px] px-2.5 text-left text-[13.5px] font-medium transition-colors';

function NavLink({
  href,
  icon,
  label,
  active,
  extra,
}: {
  href: string;
  icon: IconName;
  label: string;
  active: boolean;
  extra?: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`${NAV_ITEM} ${active ? 'bg-primary text-primary-fg' : 'text-ink-2 hover:bg-surface-2 hover:text-ink'}`}
    >
      <Icon name={icon} />
      <span className="flex-1">{label}</span>
      {extra}
    </Link>
  );
}

function RecursoNav({ recurso }: { recurso: Recurso }) {
  const toast = useToast();
  const titulo = recurso.menu?.titulo ?? recurso.titulo;

  if (recurso.status === 'em_breve') {
    return (
      <button
        type="button"
        className={`${NAV_ITEM} text-muted hover:bg-surface-2`}
        onClick={() => toast(recurso.aviso ?? 'Em breve', 'clock')}
      >
        <span className="opacity-55">
          <Icon name={recurso.icone} />
        </span>
        <span className="flex-1">{titulo}</span>
        <Chip>{recurso.rotulo}</Chip>
      </button>
    );
  }
  if (recurso.acao?.tipo === 'externo') {
    return (
      <a
        href={recurso.acao.destino}
        target="_blank"
        rel="noopener noreferrer"
        className={`${NAV_ITEM} text-ink-2 hover:bg-surface-2 hover:text-ink`}
      >
        <Icon name={recurso.icone} />
        <span className="flex-1">{titulo}</span>
        <Icon name="external" size={14} />
      </a>
    );
  }
  return (
    <Link
      href={recurso.acao?.destino ?? '/inicio/'}
      className={`${NAV_ITEM} text-ink-2 hover:bg-surface-2 hover:text-ink`}
    >
      <Icon name={recurso.icone} />
      <span className="flex-1">{titulo}</span>
    </Link>
  );
}

function NavGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <nav aria-label={label} className="grid gap-0.5">
      <div className="eyebrow px-2.5 pb-1.5 text-[10px]">{label}</div>
      {children}
    </nav>
  );
}

export function AppShell({ recursos, totalSolucoes, children }: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { q, setQ } = useSearch();
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => setNavOpen(false), [pathname]);

  const isActive = (base: string) => pathname === base || pathname.startsWith(`${base}/`);
  const chegando = recursos.filter(r => r.menu?.grupo === 'chegando');
  const ferramentas = recursos.filter(r => r.menu?.grupo === 'ferramentas');
  const iniciais = (user?.nome ?? '?')
    .split(' ')
    .map(p => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  function onSearch(value: string) {
    setQ(value);
    if (!isActive('/solucoes') || pathname.split('/').filter(Boolean).length > 1)
      router.push('/solucoes/');
  }

  function onLogout() {
    logout();
    router.replace('/login/');
  }

  return (
    <div className="grid min-h-dvh grid-cols-1 min-[901px]:grid-cols-[248px_minmax(0,1fr)]">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[272px] flex-col gap-[22px] overflow-y-auto border-r border-line bg-surface px-3.5 py-5 shadow-float transition-transform duration-200 min-[901px]:sticky min-[901px]:top-0 min-[901px]:h-dvh min-[901px]:w-auto min-[901px]:translate-x-0 min-[901px]:shadow-none ${
          navOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Link href="/inicio/" className="flex items-center gap-3 px-2 pb-1.5 pt-0.5">
          <Merc1Symbol width={34} />
          <Wordmark />
        </Link>

        <NavGroup label="Aprendizado">
          <NavLink href="/inicio/" icon="home" label="Início" active={isActive('/inicio')} />
          <NavLink href="/formacao/" icon="cap" label="Formação" active={isActive('/formacao')} />
          <NavLink
            href="/solucoes/"
            icon="spark"
            label="Soluções"
            active={isActive('/solucoes')}
            extra={
              isActive('/solucoes') ? (
                <Chip>{totalSolucoes}</Chip>
              ) : (
                <Chip tone="accent">{totalSolucoes}</Chip>
              )
            }
          />
        </NavGroup>

        {chegando.length > 0 && (
          <NavGroup label="Chegando">
            {chegando.map(r => (
              <RecursoNav key={r.id} recurso={r} />
            ))}
          </NavGroup>
        )}

        {ferramentas.length > 0 && (
          <NavGroup label="Ferramentas">
            {ferramentas.map(r => (
              <RecursoNav key={r.id} recurso={r} />
            ))}
          </NavGroup>
        )}

        <div className="mt-auto flex items-center gap-2.5 border-t border-line px-1.5 pt-3.5">
          <span className="grid size-[34px] flex-none place-items-center rounded-full bg-accent-soft text-[13px] font-bold text-accent-ink">
            {iniciais}
          </span>
          <span className="min-w-0 flex-1">
            <b className="block truncate text-[13px] font-semibold">{user?.nome}</b>
            <small className="block truncate text-[11.5px] text-muted">{user?.email}</small>
          </span>
          <button
            type="button"
            onClick={onLogout}
            aria-label="Sair"
            title="Sair"
            className="grid size-[34px] flex-none place-items-center rounded-[9px] text-muted hover:bg-surface-2 hover:text-ink"
          >
            <Icon name="logout" size={17} />
          </button>
        </div>
      </aside>

      {navOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 min-[901px]:hidden"
          onClick={() => setNavOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="flex min-w-0 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-bg/85 px-4 backdrop-blur-md sm:px-7">
          <button
            type="button"
            onClick={() => setNavOpen(true)}
            aria-label="Abrir menu"
            className="grid size-[34px] place-items-center rounded-[9px] text-muted hover:bg-surface-2 hover:text-ink min-[901px]:hidden"
          >
            <Icon name="menu" />
          </button>
          <label className="relative max-w-[460px] flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">
              <Icon name="search" size={16} />
            </span>
            <input
              id="busca-global"
              type="search"
              value={q}
              onChange={e => onSearch(e.target.value)}
              placeholder="Buscar soluções…"
              aria-label="Buscar soluções"
              className="h-[38px] w-full rounded-[10px] border border-line bg-surface pl-9 pr-3 text-[13px] outline-none focus:border-accent focus:ring-3 focus:ring-accent-soft"
            />
          </label>
          <div className="ml-auto flex items-center gap-1.5">
            <ThemeToggle />
          </div>
        </header>
        <main className="w-full max-w-[1320px] animate-enter px-4 pb-12 pt-6 sm:px-7 sm:pb-16 sm:pt-8">
          {children}
        </main>
      </div>
    </div>
  );
}
