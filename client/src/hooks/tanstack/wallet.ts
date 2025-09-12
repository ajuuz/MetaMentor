import { getWalletAndTransactions } from "@/services/userService/walletApi";
import type { WalletAndTransactionRes } from "@/types/response/wallet";
import { useQuery } from "@tanstack/react-query";


export const useGetWalletAndTransactionsQuery=(currentPage:number)=>{
    return useQuery<WalletAndTransactionRes>({
        queryKey:['getWalletAndTransactions',currentPage],
        queryFn:()=>getWalletAndTransactions(currentPage)
    })
};
