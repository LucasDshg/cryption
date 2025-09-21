export interface ISetupData {
  id: string;
  userId: string;
  tenantId: string;
  name: string;
  description: string;
  brokerProfileId: string;
  brokerId: string;
  brokerToken: string;
  brokerUserId: string;
  brokerMaxBalanceToUse: number;
  brokerUserEmail: string;
  brokerCopyTradeId: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  connectionActive: boolean;
  broker: {
    id: string;
    tenantId: string;
    brokerTenantId: string;
    name: string;
    url: string;
    imageUrl: string;
    active: boolean;
    maintenance: boolean;
    comingSoon: boolean;
    beta: boolean;
    createdAt: string;
    updatedAt: string;
  };
  brokerProfile: {
    id: string;
    profileTypeId: string;
    tenantId: string;
    brokerId: string;
    brokerTraderId: string;
    createdAt: string;
    updatedAt: string;
    profile: {
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
    };
  };
  brokerUserBalance: number;
  profit: number;
}

export interface ISetup {
  currentPage: number;
  perPage: number;
  lastPage: number;
  nextPage: number | null;
  prevPage: number;
  pages: number;
  total: number;
  count: number;
  data: ISetupData[];
}
