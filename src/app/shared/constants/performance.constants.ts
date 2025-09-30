const today = new Date();
export const PERFORMANCE_DIC = new Map<
  'SEMANA' | 'MES',
  { start: Date | null; end: Date | null }
>();

PERFORMANCE_DIC.set('SEMANA', {
  start: getDate('SEMANA', 'start'),
  end: getDate('SEMANA', 'end'),
});
PERFORMANCE_DIC.set('MES', {
  start: getDate('MES', 'start'),
  end: getDate('MES', 'end'),
});

export const PERFORMANCE_ARRAY = Array.from(PERFORMANCE_DIC).map(([key]) => ({
  name: key,
}));

function getDate(range: 'SEMANA' | 'MES', type: 'start' | 'end'): Date {
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();

  if (range === 'SEMANA') {
    const dayOfWeek = today.getDay();
    const sunday = new Date(year, month, date - dayOfWeek);

    if (type === 'start') {
      return new Date(
        sunday.getFullYear(),
        sunday.getMonth(),
        sunday.getDate(),
        0,
        0,
        0,
        0,
      );
    } else {
      return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59,
        999,
      );
    }
  }

  if (range === 'MES') {
    if (type === 'start') {
      return new Date(year, month, 1, 0, 0, 0, 0);
    } else {
      return new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59,
        999,
      );
    }
  }

  return today;
}
