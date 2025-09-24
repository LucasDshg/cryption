import { EMonths } from '../enums/months.enum';

const today = new Date();
export const MONTHS_DIC = new Map<
  EMonths,
  { name: string; start: Date | null; end: Date | null }
>();
MONTHS_DIC.set(EMonths.HOJE, {
  name: 'Hoje',
  start: getDate(0, 'start'),
  end: getDate(0, 'end'),
});
MONTHS_DIC.set(EMonths.D_MENOS_1, {
  name: dateFormated(getDate(1, 'start')),
  start: getDate(1, 'start'),
  end: getDate(1, 'end'),
});
MONTHS_DIC.set(EMonths.D_MENOS_2, {
  name: dateFormated(getDate(2, 'start')),
  start: getDate(2, 'start'),
  end: getDate(2, 'end'),
});
MONTHS_DIC.set(EMonths.D_MENOS_3, {
  name: dateFormated(getDate(3, 'start')),
  start: getDate(3, 'start'),
  end: getDate(3, 'end'),
});
MONTHS_DIC.set(EMonths.D_MENOS_4, {
  name: dateFormated(getDate(4, 'start')),
  start: getDate(3, 'start'),
  end: getDate(3, 'end'),
});

export const MONTHS = Array.from(MONTHS_DIC).map(([key, value]) => ({
  id: key,
  name: value.name,
}));

function dateFormated(date: Date): string {
  return date.toLocaleDateString('pt-br', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
  });
}
function getDate(day: number, type: 'start' | 'end'): Date {
  if (type === 'start') {
    return new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - day,
      0,
      0,
      0,
      0,
    );
  } else {
    return new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - day,
      23,
      59,
      59,
      999,
    );
  }
}
