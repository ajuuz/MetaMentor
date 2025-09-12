import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";
import type {
  GetDomainForStudRes,
  GetDomainsForStudRes,
  GetEnrolledDomainsRes,
} from "@/types/response/domain";
import type { LevelRes } from "@/types/response/level";
import type { MutationApiResponse } from "@/types/responseType";

export const getDomainsForStud = async (
  currentPage: number,
  limit: number,
  sortBy: string,
  searchTerm: string
): Promise<{ domains: GetDomainsForStudRes[]; totalPages: number }> => {
  try {
    const response = await userAxiosInstance.get(
      `/domains?currentPage=${currentPage}&limit=${limit}&sortBy=${sortBy}&searchTerm=${searchTerm}`
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getSpecificDomain = async (
  domainId: string
): Promise<GetDomainForStudRes & { levels: LevelRes[] }> => {
  try {
    const response = await userAxiosInstance.get(`/domains/${domainId}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const enrollDomain = async ({
  domainId,
  fullCourse,
  selectedLevelsId,
}: {
  domainId: string;
  fullCourse: boolean;
  selectedLevelsId?: string[]|undefined;
}): Promise<MutationApiResponse> => {
  try {
    const response = await userAxiosInstance.post(`/domains/${domainId}`,{fullCourse,selectedLevelsId});
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getEnrolledDomains = async (
  currentPage: number,
  limit: number
): Promise<{ domains: GetEnrolledDomainsRes[]; totalPages: number }> => {
  try {
    const response = await userAxiosInstance.get(
      `/dashboard?currentPage=${currentPage}&limit=${limit}`
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getEnrolledDomain = async (domainId: string) => {
  try {
    const response = await userAxiosInstance.get(`/dashboard/${domainId}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};
