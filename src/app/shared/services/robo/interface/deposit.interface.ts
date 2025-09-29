export interface IDepositPix {
  id: string;
  status: number;
  internalId: number;
  externalTransactionId: string;
  tenantId: string;
  userId: string;
  externalCustomerId: string;
  accountId: number;
  serviceType: 'pix_qrcode';
  walletId: number;
  serviceId: number;
  pointId: number;
  amount: number;
  amountCurrency: 'BRL';
  accountWalletAmount: number;
  qrCodeString: string;
  createdAt: string;
  updatedAt: string;
}
