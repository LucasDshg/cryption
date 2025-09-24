export interface IBotsType {
  currentPage: number;
  perPage: number;
  lastPage: number;
  nextPage: null | number;
  prevPage: number;
  pages: number;
  total: number;
  count: number;
  data: {
    id: string;
    tenantId: string;
    name: string;
    brokerId: string;
    description: string;
    risk: string;
    averageMonthlyIncome: number;
    maxAccountBalance: number;
    imageUrl: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
}
