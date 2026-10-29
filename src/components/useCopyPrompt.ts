'use client';

import { useCallback } from 'react';
import { useToast } from '@/providers/ToastProvider';

export function useCopyPrompt() {
  const toast = useToast();
  return useCallback(
    async (prompt: string) => {
      try {
        await navigator.clipboard.writeText(prompt);
        toast('Prompt copiado. Agora é só colar na sua IA.');
      } catch {
        const pre = document.getElementById('prompt-texto');
        const selection = window.getSelection();
        if (pre && selection) {
          const range = document.createRange();
          range.selectNodeContents(pre);
          selection.removeAllRanges();
          selection.addRange(range);
          toast('Texto selecionado. Use Ctrl+C para copiar.', 'copy');
        } else {
          toast('Não foi possível copiar. Selecione o texto do prompt manualmente.', 'copy');
        }
      }
    },
    [toast]
  );
}
