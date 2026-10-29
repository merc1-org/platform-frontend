'use client';

import { useEffect, useState } from 'react';
import { THEME_KEY } from '@/utils/theme';
import { Icon } from './Icon';

function currentIsDark() {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr) return attr === 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => setDark(currentIsDark()), []);

  function toggle() {
    const next = currentIsDark() ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem(THEME_KEY, JSON.stringify(next));
    } catch {
      // tema só não fica salvo entre visitas
    }
    setDark(next === 'dark');
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Alternar tema"
      title="Alternar tema"
      className="grid size-[34px] place-items-center rounded-[9px] text-muted hover:bg-surface-2 hover:text-ink"
    >
      <Icon name={dark ? 'sun' : 'moon'} size={17} />
    </button>
  );
}
