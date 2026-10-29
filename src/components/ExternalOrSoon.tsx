'use client';

import { useToast } from '@/providers/ToastProvider';

interface ExternalOrSoonProps {
  url: string | null | undefined;
  soonMessage: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}

// Link externo quando a URL existe; enquanto o conteúdo não tem link, avisa em vez de quebrar.
export function ExternalOrSoon({
  url,
  soonMessage,
  className,
  children,
  ariaLabel,
}: ExternalOrSoonProps) {
  const toast = useToast();
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      onClick={() => toast(soonMessage, 'clock')}
    >
      {children}
    </button>
  );
}
