export interface IWithdrawalsItem {
  id: string;
  externalId: string;
  autoApproved: boolean;
  isInfluencer: boolean;
  tenantId: string;
  userId: string;
  params: {
    documentNumber: string;
    pixKey: string;
    pixKeyType: string;
  };
  ipAddress: string;
  tenantPaymentMethodId: string;
  providerData: {
    amount: number;
    currency: 'BRL';
    providerTransactionId: string;
  };
  method: string;
  provider: string;
  feeAmount: number;
  amount: number;
  amountFrom: number;
  currencyFrom: 'BRL';
  currencyTo: 'USD';
  reviewedById: string;
  rejectionReason: null | string;
  walletId: string;
  status: 'FINISHED' | 'REJECTED' | 'PEDDING';
  approvedAt: string;
  feeParams: {
    paymentMethodFee: number;
    traderVipDiscountFee: number;
  };
  rejectedAt: null | string;
  finishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface IWithdrawals {
  currentPage: number;
  perPage: number;
  lastPage: number;
  nextPage: null;
  prevPage: number;
  pages: number;
  total: number;
  count: number;
  data: IWithdrawalsItem[];
}
