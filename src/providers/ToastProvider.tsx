'use client';

import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { Icon, type IconName } from '@/components/Icon';

type ToastFn = (message: string, icon?: IconName) => void;

const ToastContext = createContext<ToastFn | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{ message: string; icon: IconName } | null>(null);
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const show = useCallback<ToastFn>((message, icon = 'check') => {
    setToast({ message, icon });
    setVisible(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), 2400);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 z-[60] flex max-w-[calc(100%-32px)] -translate-x-1/2 items-center gap-2.5 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-medium text-primary-fg shadow-float transition-all duration-200 ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
        }`}
      >
        {toast && (
          <>
            <Icon name={toast.icon} size={16} />
            <span>{toast.message}</span>
          </>
        )}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast precisa estar dentro de <ToastProvider>');
  return ctx;
}
