import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";


export const getWalletAndTransactions = async (currentPage:number) => {
  try {
    const response = await userAxiosInstance.get(`/common/wallet?currentPage=${currentPage}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};
