export type WalletAndTransactionRes = {
  balance: number;
  totalPages: number;
  transactions:Transaction[]
};

type Transaction = {
  amount: number;
  createdAt: string;
  description: string;
  domainName: string;
  levelName: string;
  reviewId: string;
  type:string;
  walletId:string;
  _id: string;
};
