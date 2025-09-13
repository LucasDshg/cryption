import {
  MaskitoElementPredicate,
  MaskitoMask,
  MaskitoOptions,
} from '@maskito/core';
import {
  maskitoCaretGuard,
  maskitoDateOptionsGenerator,
  maskitoNumberOptionsGenerator,
  maskitoTimeOptionsGenerator,
} from '@maskito/kit';

export function maskedInput(
  mask: MaskitoMask | Required<MaskitoOptions>,
): MaskitoOptions {
  if (Object.keys(mask).includes('plugins')) {
    const { plugins, ...numberOptions } = mask as Required<MaskitoOptions>;
    return {
      ...numberOptions,
      plugins: [...plugins],
    };
  }
  return {
    mask: mask as MaskitoMask,
    plugins: [maskitoCaretGuard((value) => [0, value.length - 1])],
    postprocessors: [
      ({ value, selection }): any => ({
        value: value.toUpperCase(),
        selection,
      }),
    ],
  };
}

const predicate: MaskitoElementPredicate = (el) =>
  (el as unknown as HTMLIonInputElement).getInputElement();
export const mask = {
  predicate: predicate,
  number: maskitoNumberOptionsGenerator({
    decimalSeparator: ',',
    thousandSeparator: '.',
    precision: 2,
  }),
  time: maskitoTimeOptionsGenerator({
    mode: 'HH:MM',
  }),
  date: maskitoDateOptionsGenerator({
    mode: 'dd/mm/yyyy',
    separator: '/',
  }),
  phone: {
    mask: [
      '(',
      /\d/,
      /\d/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ],
  },
  cpf: {
    mask: [
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ],
  },
  cnpj: {
    mask: [
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '.',
      /\d/,
      /\d/,
      /\d/,
      '/',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
    ],
  },
  cep: {
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
  },
};
