'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { USUARIOS } from '@/config/users';
import { readStorage, writeStorage } from '@/utils/storage';

export interface Sessao {
  nome: string;
  email: string;
}

interface AuthContextValue {
  user: Sessao | null;
  ready: boolean;
  login: (email: string, senha: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Sessao | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(readStorage<Sessao | null>('user', null));
    setReady(true);
  }, []);

  const login = useCallback((email: string, senha: string) => {
    const normalizado = email.trim().toLowerCase();
    const encontrado = USUARIOS.find(u => u.email === normalizado && u.senha === senha);
    if (!encontrado) return false;
    const sessao = { nome: encontrado.nome, email: encontrado.email };
    setUser(sessao);
    writeStorage('user', sessao);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    writeStorage('user', null);
  }, []);

  const value = useMemo(() => ({ user, ready, login, logout }), [user, ready, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth precisa estar dentro de <AuthProvider>');
  return ctx;
}
