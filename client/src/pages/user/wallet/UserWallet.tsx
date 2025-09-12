import PaginationComponent from "@/components/common/PaginationComponent";
import Wallet from "@/components/wallet/Wallet";
import { useGetWalletAndTransactionsQuery } from "@/hooks/tanstack/wallet";
import { useState } from "react";

const UserWallet = () => {

    const [currentPage,setCurrentPage]=useState(1)
  const {
    data: walletAndTransactions,
    isLoading,
    isError,
  } = useGetWalletAndTransactionsQuery(currentPage);

  if (isLoading) {
    return (
      <div className="text-center mt-10 text-lg text-gray-600">
        Loading wallet information...
      </div>
    );
  }

  if (isError || !walletAndTransactions) {
    return (
      <div className="text-center mt-10 text-red-500 font-semibold">
        Failed to load wallet information. Please try again later.
      </div>
    );
  }

  console.log(walletAndTransactions)
  return (
    <div>
      <Wallet
        balance={walletAndTransactions.balance}
        totalPages={walletAndTransactions.totalPages}
        transactions={walletAndTransactions.transactions}
      />
      <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={walletAndTransactions.totalPages}/>
    </div>
  );
};

export default UserWallet;
