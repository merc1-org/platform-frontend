'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !user) router.replace('/login/');
  }, [ready, user, router]);

  if (!ready || !user) return null;
  return <>{children}</>;
}
