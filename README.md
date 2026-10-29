# Merc1 Plataforma

Área do aluno da Merc1: formação (Método Merc1, com aulas hospedadas na Cakto) e soluções prontas de IA para corretores de imóveis.

MVP **só front-end**: site estático gerado pelo Next.js, sem backend. Conteúdo vem de um JSON versionado e o login usa usuários fixos.

## Stack

Next.js 15 (App Router, `output: 'export'`) · React 19 · Tailwind CSS 4 · TypeScript · Vitest

## Comandos

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # gera o site estático em out/
npm start            # serve out/ localmente
npm test             # testes (inclui validação do content.json)
npm run type-check
npm run lint
npm run format
```

## Conteúdo

Tudo o que aparece na plataforma está em [`src/content/content.json`](src/content/content.json):

| Bloco              | O que é                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------- |
| `categorias`       | Abas das soluções (Marketing, Atendimento, Vendas)                                           |
| `cursos[].modulos` | Módulos da Formação. `url` é o link da aula na Cakto; `status: "em_gravacao"` mostra cadeado |
| `solucoes`         | Soluções prontas: textos, prompt, vídeo, arquivos e aulas relacionadas                       |
| `recursos`         | Cards do Início e itens extras do menu (ex.: "em breve", link para o app Merc1)              |

Regras:

- Relações são por `id`: `solucao.categoria` → `categorias[].id`; `aulasRelacionadas` → `{ curso, modulo }`.
- Link que ainda não existe fica `null`. A tela mostra "em breve" até ele ser preenchido.
- Só aparecem soluções com `status: "publicado"`. Ordem pela chave `ordem`.
- Destaque em texto curto usa `*asteriscos*` (vira itálico). Nada de HTML no JSON.
- No prompt, campos que o corretor preenche ficam `[entre colchetes]` e aparecem destacados.

Depois de editar, rode `npm test`: ele acusa id duplicado, slug inválido, categoria ou módulo inexistente, ícone que não existe e link externo sem https.

As telas nunca leem o JSON direto: passam por `src/services/content.ts`. Quando houver backend, só essas funções mudam.

## Login

Usuários em [`src/config/users.ts`](src/config/users.ts). Como o site é estático, esses dados vão para o navegador: serve para controlar acesso dos primeiros clientes, não é segurança. Favoritas, concluídas e sessão ficam no `localStorage`.

## Estrutura

```
src/
├── app/
│   ├── (plataforma)/    # rotas autenticadas: inicio, formacao, solucoes, solucoes/[slug]
│   └── login/
├── components/          # UI
├── config/users.ts      # usuários fixos do MVP
├── content/content.json # todo o conteúdo
├── providers/           # sessão, progresso, busca, toast
├── services/content.ts  # acesso ao conteúdo
├── types/content.ts     # contrato do conteúdo
└── utils/               # lógica pura (com testes)
```

## Deploy

Site estático: o build gera `out/`. O `amplify.yml` já descreve o build para o AWS Amplify Hosting.
