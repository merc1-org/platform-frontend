import { ICON_NAMES } from '@/components/Icon';
import type { Content } from '@/types/content';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function duplicados(ids: string[]) {
  return ids.filter((id, i) => ids.indexOf(id) !== i);
}

// Conteúdo é editado à mão; este check pega id digitado errado antes do build.
export function validateContent(content: Content): string[] {
  const erros: string[] = [];
  const icones = new Set<string>(ICON_NAMES);
  const categorias = new Set(content.categorias.map(c => c.id));
  const modulosPorCurso = new Map(
    content.cursos.map(c => [c.id, new Set(c.modulos.map(m => m.id))])
  );

  for (const id of duplicados(content.categorias.map(c => c.id)))
    erros.push(`categoria duplicada: ${id}`);
  for (const id of duplicados(content.cursos.map(c => c.id))) erros.push(`curso duplicado: ${id}`);
  for (const id of duplicados(content.solucoes.map(s => s.id)))
    erros.push(`solução com id duplicado: ${id}`);
  for (const slug of duplicados(content.solucoes.map(s => s.slug)))
    erros.push(`solução com slug duplicado: ${slug}`);
  for (const id of duplicados(content.recursos.map(r => r.id)))
    erros.push(`recurso duplicado: ${id}`);

  for (const c of content.categorias) {
    if (!icones.has(c.icone)) erros.push(`categoria ${c.id}: ícone inexistente "${c.icone}"`);
  }

  for (const curso of content.cursos) {
    for (const id of duplicados(curso.modulos.map(m => m.id)))
      erros.push(`curso ${curso.id}: módulo duplicado ${id}`);
  }

  for (const s of content.solucoes) {
    const ref = `solução ${s.slug}`;
    if (!SLUG.test(s.slug)) erros.push(`${ref}: slug inválido (use letras minúsculas e hífen)`);
    if (!categorias.has(s.categoria)) erros.push(`${ref}: categoria inexistente "${s.categoria}"`);
    if (!s.prompt.trim()) erros.push(`${ref}: prompt vazio`);
    if (!Number.isInteger(s.tempoMinutos) || s.tempoMinutos <= 0)
      erros.push(`${ref}: tempoMinutos deve ser inteiro positivo`);
    for (const a of s.aulasRelacionadas) {
      const modulos = modulosPorCurso.get(a.curso);
      if (!modulos) erros.push(`${ref}: curso inexistente "${a.curso}"`);
      else if (!modulos.has(a.modulo))
        erros.push(`${ref}: módulo inexistente "${a.modulo}" no curso ${a.curso}`);
    }
  }

  for (const r of content.recursos) {
    const ref = `recurso ${r.id}`;
    if (!icones.has(r.icone)) erros.push(`${ref}: ícone inexistente "${r.icone}"`);
    if (r.status === 'em_breve' && !r.aviso) erros.push(`${ref}: "em_breve" precisa de aviso`);
    if (r.status === 'disponivel' && !r.acao) erros.push(`${ref}: "disponivel" precisa de acao`);
    if (r.acao?.tipo === 'rota' && !r.acao.destino.startsWith('/'))
      erros.push(`${ref}: rota deve começar com "/"`);
    if (r.acao?.tipo === 'externo' && !/^https:\/\//.test(r.acao.destino))
      erros.push(`${ref}: link externo deve ser https`);
  }

  return erros;
}
