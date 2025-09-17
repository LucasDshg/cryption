export interface ITradesData {
  id: string;
  reverted: boolean;
  withBonus: boolean;
  isDemo: boolean;
  isInfluencer: boolean;
  fromBot: boolean;
  fromApiToken: boolean;
  tenantId: string;
  wallets: [
    {
      id: string;
      type: 'REAL';
      amount: number;
      tradePercent: number;
      balancePercent: number;
      balance: number;
    },
  ];
  totalWalletsBalancePercent: number;
  symbolSlotName: string;
  symbol: string;
  userId: string;
  payout: number;
  amount: number;
  fromCopy: boolean;
  botSynced: boolean;
  copyCommissionRate: number;
  copyCommissionAmount: number;
  appCommissionRate: number;
  appCommissionAmount: number;
  fromCopyTradeId: string;
  fromTradeId: string;
  status: 'COMPLETED';
  direction: 'SELL' | 'BUY';
  expirationType: 'CANDLE_CLOSE';
  closeType: string;
  requestTime: number;
  openTime: number;
  openPrice: number;
  openPriceTime: number;
  pnl: number;
  closePrice: number;
  closeTime: number;
  closePriceTime: number;
  attemptsToClose: number;
  result: 'WON' | 'LOSS';
  tenantFeeAmount: number;
  createdAt: string;
  updatedAt: string;
  syncOpensearchAt: string;
  needSync: boolean;
  copyTrade: {
    id: string;
    tenantId: string;
    userId: string;
    bot: boolean;
    traderUserId: string;
    active: boolean;
    maxBalanceToUse: number;
    pnl: number;
    traderCommission: number;
    stopLoss: number;
    status: 'APPROVED';
    createdAt: string;
    updatedAt: string;
    trader: {
      id: string;
      nickname: string;
      bot: boolean;
    };
  };
}

export interface ITrades {
  currentPage: number;
  perPage: number;
  lastPage: number;
  nextPage: null;
  prevPage: number;
  pages: number;
  total: number;
  count: number;
  data: ITradesData[];
}
