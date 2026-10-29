'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';

export default function Home() {
  const { user, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready) router.replace(user ? '/inicio/' : '/login/');
  }, [ready, user, router]);

  return null;
}
