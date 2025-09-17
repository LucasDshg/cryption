import { EMonths } from '../enums/months.enum';

const today = new Date();
export const MONTHS_DIC = new Map<
  EMonths,
  { name: string; date: Date | null }
>();
MONTHS_DIC.set(EMonths.HOJE, { name: 'Hoje', date: today });
MONTHS_DIC.set(EMonths.D_MENOS_1, {
  name: 'D-1',
  date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
});
MONTHS_DIC.set(EMonths.D_MENOS_2, {
  name: 'D-2',
  date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2),
});
MONTHS_DIC.set(EMonths.D_MENOS_3, {
  name: 'D-3',
  date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3),
});
MONTHS_DIC.set(EMonths.SEMANA, { name: 'Semana', date: null });
MONTHS_DIC.set(EMonths.MES, { name: 'Mês', date: null });

export const MONTHS = Array.from(MONTHS_DIC).map(([key, value]) => ({
  id: key,
  name: value.name,
}));
