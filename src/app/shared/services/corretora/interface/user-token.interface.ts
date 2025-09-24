export interface IUserToken {
  currentPage: number;
  perPage: number;
  lastPage: number;
  nextPage: null;
  prevPage: number;
  pages: number;
  total: number;
  count: number;
  data: {
    id: string;
    userId: string;
    tenantId: string;
    name: string;
    token: string;
    createdAt: string;
    updatedAt: string[];
  }[];
}
