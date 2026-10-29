'use client';

import { createContext, useContext, useMemo, useState } from 'react';

interface SearchContextValue {
  q: string;
  setQ: (q: string) => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [q, setQ] = useState('');
  const value = useMemo(() => ({ q, setQ }), [q]);
  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearch precisa estar dentro de <SearchProvider>');
  return ctx;
}
