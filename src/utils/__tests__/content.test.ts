import { describe, expect, it } from 'vitest';
import { getRawContent } from '@/services/content';
import type { Content } from '@/types/content';
import { validateContent } from '../validateContent';

const base = (): Content => structuredClone(getRawContent());

describe('content.json', () => {
  it('não tem referência quebrada nem id duplicado', () => {
    expect(validateContent(getRawContent())).toEqual([]);
  });
});

describe('validateContent', () => {
  it('acusa solução apontando para categoria inexistente', () => {
    const c = base();
    c.solucoes[0].categoria = 'nao-existe';
    expect(validateContent(c)).toContainEqual(
      expect.stringContaining('categoria inexistente "nao-existe"')
    );
  });

  it('acusa aula relacionada com módulo inexistente', () => {
    const c = base();
    c.solucoes[0].aulasRelacionadas = [{ curso: 'metodo-merc1', modulo: 'fantasma' }];
    expect(validateContent(c)).toContainEqual(
      expect.stringContaining('módulo inexistente "fantasma"')
    );
  });

  it('acusa slug duplicado e slug fora do padrão', () => {
    const c = base();
    c.solucoes[1].slug = c.solucoes[0].slug;
    c.solucoes[2].slug = 'Com Espaço';
    const erros = validateContent(c);
    expect(erros).toContainEqual(expect.stringContaining('slug duplicado'));
    expect(erros).toContainEqual(expect.stringContaining('slug inválido'));
  });

  it('exige aviso em recurso "em breve" e https em link externo', () => {
    const c = base();
    const emBreve = c.recursos.find(r => r.status === 'em_breve')!;
    delete emBreve.aviso;
    const externo = c.recursos.find(r => r.acao?.tipo === 'externo')!;
    externo.acao = { tipo: 'externo', destino: 'http://inseguro.com', texto: 'x' };
    const erros = validateContent(c);
    expect(erros).toContainEqual(expect.stringContaining('precisa de aviso'));
    expect(erros).toContainEqual(expect.stringContaining('deve ser https'));
  });

  it('acusa ícone que não existe no conjunto de ícones', () => {
    const c = base();
    (c.categorias[0] as { icone: string }).icone = 'unicornio';
    expect(validateContent(c)).toContainEqual(
      expect.stringContaining('ícone inexistente "unicornio"')
    );
  });
});
