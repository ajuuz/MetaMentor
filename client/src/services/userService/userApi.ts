import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";
import type { UserDetailsRes } from "@/types/response/user";
import type { MutationApiResponse } from "@/types/responseType";
import type { UserDetailsType } from "@/types/userType";

export const getSpecificUser = async (): Promise<
  Omit<UserDetailsType, "role" | "isVerified" | "_id">
> => {
  try {
    const response = await userAxiosInstance.get("/user");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getProfile = async (): Promise<UserDetailsRes> => {
  try {
    const response = await userAxiosInstance.get("/user");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const updateProfile = async (
  updationDetails: FormData
): Promise<MutationApiResponse> => {
  try {
    const response = await userAxiosInstance.patch("/user", updationDetails, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};
