import type { IconName } from '@/components/Icon';

export interface Plataforma {
  nome: string;
}

export interface Categoria {
  id: string;
  nome: string;
  icone: IconName;
  ordem: number;
}

export type ModuloStatus = 'publicado' | 'em_gravacao';

export interface Modulo {
  id: string;
  titulo: string;
  descricao: string;
  ordem: number;
  status: ModuloStatus;
  url: string | null;
}

export interface Curso {
  id: string;
  titulo: string;
  descricao: string;
  destaque: { titulo: string; texto: string };
  plataformaVideo: 'cakto';
  url: string | null;
  modulos: Modulo[];
}

export type SolucaoStatus = 'publicado' | 'rascunho';

export interface Arquivo {
  tipo: 'guia';
  formato: 'pdf' | 'md';
  titulo: string;
  descricao: string;
  url: string | null;
}

export interface AulaRelacionada {
  curso: string;
  modulo: string;
}

export interface Solucao {
  id: string;
  slug: string;
  categoria: string;
  titulo: string;
  resumo: string;
  descricao: string;
  tempoMinutos: number;
  ordem: number;
  status: SolucaoStatus;
  ferramentas: string[];
  video: { url: string | null; chamada: string; subtitulo: string };
  prompt: string;
  arquivos: Arquivo[];
  aulasRelacionadas: AulaRelacionada[];
}

export type RecursoAcao =
  | { tipo: 'rota'; destino: string; texto: string }
  | { tipo: 'externo'; destino: string; texto: string };

export interface Recurso {
  id: string;
  titulo: string;
  descricao: string;
  icone: IconName;
  status: 'disponivel' | 'em_breve';
  rotulo: string;
  aviso?: string;
  acao: RecursoAcao | null;
  menu: { grupo: 'chegando' | 'ferramentas'; titulo: string } | null;
}

export interface Content {
  schemaVersion: number;
  atualizadoEm: string;
  plataforma: Plataforma;
  categorias: Categoria[];
  cursos: Curso[];
  solucoes: Solucao[];
  recursos: Recurso[];
}
