'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { readStorage, writeStorage } from '@/utils/storage';

// Favoritas e concluídas são estado do usuário, não conteúdo: hoje no navegador,
// depois numa tabela por usuário no backend.
interface ProgressContextValue {
  favoritas: ReadonlySet<string>;
  concluidas: ReadonlySet<string>;
  toggleFavorita: (slug: string) => boolean;
  toggleConcluida: (slug: string) => boolean;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

function toggle(set: ReadonlySet<string>, key: string) {
  const next = new Set(set);
  if (next.has(key)) next.delete(key);
  else next.add(key);
  return next;
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [favoritas, setFavoritas] = useState<ReadonlySet<string>>(new Set());
  const [concluidas, setConcluidas] = useState<ReadonlySet<string>>(new Set());

  useEffect(() => {
    setFavoritas(new Set(readStorage<string[]>('favoritas', [])));
    setConcluidas(new Set(readStorage<string[]>('concluidas', [])));
  }, []);

  const toggleFavorita = useCallback(
    (slug: string) => {
      const next = toggle(favoritas, slug);
      setFavoritas(next);
      writeStorage('favoritas', [...next]);
      return next.has(slug);
    },
    [favoritas]
  );

  const toggleConcluida = useCallback(
    (slug: string) => {
      const next = toggle(concluidas, slug);
      setConcluidas(next);
      writeStorage('concluidas', [...next]);
      return next.has(slug);
    },
    [concluidas]
  );

  const value = useMemo(
    () => ({ favoritas, concluidas, toggleFavorita, toggleConcluida }),
    [favoritas, concluidas, toggleFavorita, toggleConcluida]
  );
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress precisa estar dentro de <ProgressProvider>');
  return ctx;
}
