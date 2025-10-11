export interface IUserBots {
  id: string;
  name: string;
  description: string;
  active: boolean;
  reactivate: boolean;
  brokerUserBalance: number;
  profit: number;
  brokerMaxBalanceToUse: number;
}
