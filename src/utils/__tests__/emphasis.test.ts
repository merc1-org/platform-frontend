import { describe, expect, it } from 'vitest';
import { parseEmphasis, splitPlaceholders } from '../emphasis';

describe('parseEmphasis', () => {
  it('separa trechos entre asteriscos como destaque', () => {
    expect(parseEmphasis('Do primeiro lead à *visita agendada*.')).toEqual([
      { text: 'Do primeiro lead à ', em: false },
      { text: 'visita agendada', em: true },
      { text: '.', em: false },
    ]);
  });

  it('devolve o texto inteiro quando não há destaque', () => {
    expect(parseEmphasis('Sem destaque')).toEqual([{ text: 'Sem destaque', em: false }]);
  });
});

describe('splitPlaceholders', () => {
  it('marca os campos entre colchetes', () => {
    expect(splitPlaceholders('Bairro: [bairro], cidade [cidade]')).toEqual([
      { text: 'Bairro: ', placeholder: false },
      { text: '[bairro]', placeholder: true },
      { text: ', cidade ', placeholder: false },
      { text: '[cidade]', placeholder: true },
    ]);
  });
});
