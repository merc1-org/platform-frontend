import raw from '@/content/content.json';
import type { Categoria, Content, Curso, Modulo, Recurso, Solucao } from '@/types/content';

// Fonte única de conteúdo do MVP. As funções são assíncronas de propósito:
// quando houver backend, só o corpo delas troca para chamadas à API.
const content = raw as unknown as Content;

const byOrdem = <T extends { ordem: number }>(a: T, b: T) => a.ordem - b.ordem;

export const CURSO_PRINCIPAL = 'metodo-merc1';

export async function getPlataforma() {
  return content.plataforma;
}

export async function getCategorias(): Promise<Categoria[]> {
  return [...content.categorias].sort(byOrdem);
}

export async function getCurso(id: string = CURSO_PRINCIPAL): Promise<Curso | undefined> {
  const curso = content.cursos.find(c => c.id === id);
  if (!curso) return undefined;
  return { ...curso, modulos: [...curso.modulos].sort(byOrdem) };
}

export async function getModulos(cursoId: string = CURSO_PRINCIPAL): Promise<Modulo[]> {
  return (await getCurso(cursoId))?.modulos ?? [];
}

export async function getSolucoes(): Promise<Solucao[]> {
  return content.solucoes.filter(s => s.status === 'publicado').sort(byOrdem);
}

export async function getSolucao(slug: string): Promise<Solucao | undefined> {
  return (await getSolucoes()).find(s => s.slug === slug);
}

export async function getRecursos(): Promise<Recurso[]> {
  return content.recursos;
}

export function getRawContent(): Content {
  return content;
}
