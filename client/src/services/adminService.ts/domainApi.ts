import { adminAxiosInstance } from "@/config/axiosConfig/adminAxiosConfig";
import type { GetDomainsForAdminRes } from "@/types/response/domain";
import type { MutationApiResponse } from "@/types/responseType";

export const addDomain = async (
  domainDetails: FormData
): Promise<MutationApiResponse> => {
  try {
    const response = await adminAxiosInstance.post("/domains", domainDetails, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getDomainsForAdmin = async (
  currentPage: number,
  limit: number,
  sortBy: string,
  searchTerm: string
): Promise<{ domains: GetDomainsForAdminRes[]; totalPages: number }> => {
  try {
    const response = await adminAxiosInstance.get(
      `/domains?currentPage=${currentPage}&limit=${limit}&sortBy=${sortBy}&searchTerm=${searchTerm}`
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const updateDomainStatus = async ({
  domainId,
  status,
}: {
  domainId: string;
  status: boolean;
}): Promise<MutationApiResponse> => {
  try {
    const response = await adminAxiosInstance.patch(`/domains/${domainId}`, {
      status,
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};
