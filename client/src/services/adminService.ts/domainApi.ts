import { adminAxiosInstance } from "@/config/axiosConfig/adminAxiosConfig";
import type {
  GetDomainForAdminRes,
  GetDomainsForAdminRes,
} from "@/types/response/domain";
import type { LevelRes } from "@/types/response/level";
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
export const editDomain = async ({
  domainId,
  domainDetails,
}: {
  domainId: string;
  domainDetails: FormData;
}): Promise<MutationApiResponse> => {
  try {
    const response = await adminAxiosInstance.patch(`/domains/${domainId}`, domainDetails, {
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

export const getDomainForAdmin = async (
  domainId: string
): Promise<GetDomainForAdminRes & { levels: LevelRes[] }> => {
  try {
    const response = await adminAxiosInstance.get(`/domains/${domainId}`);
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
    const response = await adminAxiosInstance.patch(`/domains/${domainId}/status`, {
      status,
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};
