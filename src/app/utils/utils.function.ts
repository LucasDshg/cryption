export type TGroupBy<T> = {
  name: string | number;
  list: T[];
}[];

export function groupBy<T>(list: any[], key: string): TGroupBy<T> {
  const groups = list.reduce((group, item) => {
    const obj = item[key];
    group[obj] = group[obj] ?? [];

    group[obj].push(item);
    return group;
  }, {});

  return Object.keys(groups).map((name) => {
    return {
      name,
      list: groups[name],
    };
  });
}

/**
 * Remove all special caracters from value
 * @param value - Value Like 2.0.1 or Teste-teste
 * @return - Return the value without special caracters. 201 or Testeteste
 *
 * @usageNotes
 *
 * ```ts
 *  let newValue: string = removeMask('21/08/2021')
 * 	console.log('21082021')
 *
 * ```
 * ### Notes
 * * In case of error will be return `null`,
 *
 * @Annotation
 */
export const removeMask = (value: string): string | null =>
  value?.replace(/[^a-zA-Z0-9]/g, '') ?? null;

/**
 * Convert a string date to type date
 * @param value - Date like DD/MM/YYYY
 * @return - Return a new date like YYYY-MM-DD 00:00:00
 *
 * @usageNotes
 *
 * ```ts
 *  let date: Date = stringToDate('21/08/2021')
 *
 * ```
 * @Annotation
 */
export const stringToDate = (date: string, time?: string): Date => {
  if (time) {
    return new Date(date.split('/').reverse().join('-') + ` ${time}:00`);
  }
  return new Date(date.split('/').reverse().join('-') + ` 00:00:00`);
};

export const dateToString = (value: Date): string => {
  return value.toLocaleDateString('pt-br', { timeZone: 'America/Sao_Paulo' });
};

export function timeStampToDate(date: any): Date {
  const value: Date = date.toDate();
  return value;
}
/**
 * Formatar valor numerico
 * O valor precisa ser do tipo `number` ou `string`
 * @param value  tipo `number` ou `string`
 * @param option - default value: { maximumFraction: 2, minimumFraction: 2 }
 * @param locale - default value: pt-BR
 * @return - 20,00
 *
 * @usageNotes
 *
 * ```ts
 *  let price: string = formatterNumber(20, { minimumFraction: 3, style: 'currency', currency: 'BRL' })
 * // Output: R$ 20,000
 * ```
 * ### Notes
 * * In case value null or undefined return `-`,
 * * In case of error will be throw exception`,
 *
 * @Annotation
 */
export function formatterNumber(
  value: number | string,
  options: Intl.NumberFormatOptions = {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  },
  locale: string = 'pt-BR',
  symbol: string = '',
): string {
  if (value == undefined || value == null) {
    return '-';
  }

  return `${value.toLocaleString(locale, options)}${symbol}`;
}

export function parseToFloat(value: string): number {
  const replace = value.replace('.', '');
  const replace2 = replace.replace(',', '.');
  return parseFloat(replace2);
}

export function addLeftZero(value: number): string {
  const limit = 3;
  let valueString = value.toString();
  while (valueString.length < limit) {
    valueString = '0' + valueString;
  }
  return valueString;
}
