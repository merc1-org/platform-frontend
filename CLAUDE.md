# CLAUDE.md — Merc1 Plataforma

Produto separado dos sistemas da Merc1 (CRM): não importar nada de `backend-svc` ou `merc-front`. Visão geral, comandos e regras de conteúdo estão no `README.md`.

## Regras

- **Conteúdo só no `src/content/content.json`.** Nenhum texto de solução, módulo ou recurso escrito direto em componente. Campo novo no JSON → atualizar `src/types/content.ts` e `src/utils/validateContent.ts`.
- **Telas acessam conteúdo só por `src/services/content.ts`** (funções assíncronas). É o ponto de troca para backend.
- **Estado do usuário (sessão, favoritas, concluídas) não é conteúdo**: fica nos providers, via `src/utils/storage.ts`.
- **Site estático** (`output: 'export'`): sem API routes, middleware, `cookies()` ou qualquer coisa que precise de servidor. Rota dinâmica precisa de `generateStaticParams`.
- **Cores só por token** (`bg-surface`, `text-muted`, `text-accent-ink`…, definidos em `globals.css`). Nada de `dark:`; o tema troca as variáveis.
- Lógica pura em `src/utils/` com teste em `src/utils/__tests__/`.
- Server Component por padrão; `'use client'` só onde há estado, efeito ou evento.

## Validação antes de commitar

```bash
npm test && npm run type-check && npm run lint && npm run build
```

Commits no nome do autor, sem trailer de co-autoria nem menção a ferramenta de IA.
