export interface IWallets {
  id: string;
  userId: string;
  tenantId: string;
  type: 'default' | 'referral';
  balance: number;
  createdAt: string;
  updatedAt: string;
}
