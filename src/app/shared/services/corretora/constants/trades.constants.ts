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

TRADE_DIRECTION_DIC.set('BUY', {
  color: 'success',
  name: 'Compra',
  icon: 'trending-up',
});
TRADE_DIRECTION_DIC.set('SELL', {
  color: 'danger',
  name: 'Venda',
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

export const TRADE_SYMBOLS_DIC = new Map<
  string,
  { name: string; icon: string }
>();

TRADE_SYMBOLS_DIC.set('ADAUSDT', {
  icon: 'assets/symbol/adausdt.png',
  name: 'ADA',
});

TRADE_SYMBOLS_DIC.set('XRPUSDT', {
  icon: 'assets/symbol/XRPUSDT.png',
  name: 'XRP',
});
TRADE_SYMBOLS_DIC.set('ETHUSDT', {
  icon: 'assets/symbol/ETHUSDT.png',
  name: 'Ethereum',
});
TRADE_SYMBOLS_DIC.set('SOLUSDT', {
  icon: 'assets/symbol/solusdt.png',
  name: 'SOL',
});
TRADE_SYMBOLS_DIC.set('BTCUSDT', {
  icon: 'assets/symbol/BTCUSDT.png',
  name: 'Bitcoin',
});
