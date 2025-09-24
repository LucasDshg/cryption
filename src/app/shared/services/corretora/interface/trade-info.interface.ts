export interface ITradeInfo {
  maxTradeAmount: number;
  minTradeAmount: number;
  totalProfit: number;
  totalHistoricalProfit: number;
  depositAmount: number;
  tradeAmount: number;
  tradeCount: number;
  withdrawAmount: number;
  withdrawCount: number;
  depositCount: number;
  maxProfit: number;
  minProfit: number;
  average: number;
  roiPercentage: number;
  roiPercentageHistorical: null | number;
  totalTradesCount: number;
  followersCount: number;
  totalWon: number;
  totalLost: number;
  totalAvailableWithdrawalBalance: number;
  totalRolloverBalance: number;
  totalBalance: number;
  totalBonusBalance: number;
  firstTimeDepositDate: string;
  firstTimeDepositAmount: number;
  totalCashbackClaimedAmount: number;
  partialProfit: number;
}
