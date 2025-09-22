export const TRADE_RESULT_DIC = new Map<
  string,
  { color: string; name: string; symbol: string }
>();

TRADE_RESULT_DIC.set('WON', { color: 'success', name: 'Win', symbol: '' });
TRADE_RESULT_DIC.set('LOST', { color: 'danger', name: 'Loss', symbol: '-' });
TRADE_RESULT_DIC.set('DRAW', { color: 'medium', name: 'Draw', symbol: '' });

export const TRADE_DIRECTION_DIC = new Map<
  string,
  { color: string; name: string; icon: string }
>();

TRADE_DIRECTION_DIC.set('SELL', {
  color: 'success',
  name: 'Venda',
  icon: 'trending-up',
});
TRADE_DIRECTION_DIC.set('BUY', {
  color: 'danger',
  name: 'Compra',
  icon: 'trending-down',
});

export const TRADE_ROBO_DIC = new Map<string, { name: string }>();

TRADE_ROBO_DIC.set('AGRESSIVE', {
  name: 'Agressivo',
});
TRADE_ROBO_DIC.set('MODERATE', {
  name: 'Moderado',
});
TRADE_ROBO_DIC.set('CONSERVATIVE', {
  name: 'Conservador',
});
