export interface ITransactions {
  currentPage: number;
  perPage: number;
  lastPage: number;
  nextPage: number;
  prevPage: number;
  pages: number;
  total: number;
  count: number;
  data: {
    id: string;
    tenantId: string;
    walletId: string;
    isInfluencer: boolean;
    userId: string;
    originId: string;
    type: string;
    amount: number;
    balance: number;
    description: string;
    createdAt: string;
    updatedAt: string;
  }[];
}
