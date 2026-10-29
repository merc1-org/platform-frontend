'use client';

import { AuthProvider } from './AuthProvider';
import { ProgressProvider } from './ProgressProvider';
import { SearchProvider } from './SearchProvider';
import { ToastProvider } from './ToastProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProgressProvider>
        <SearchProvider>
          <ToastProvider>{children}</ToastProvider>
        </SearchProvider>
      </ProgressProvider>
    </AuthProvider>
  );
}
