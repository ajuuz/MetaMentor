import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";
import type { DomainEntity } from "@/types/domainTypes";
import type { MentorRegistrationFormDataType } from "@/types/mentorType";
import type { MutationApiResponse } from "@/types/responseType";

export const registerForm = async (
  formData: MentorRegistrationFormDataType
): Promise<MutationApiResponse> => {
  try {
    const response = await userAxiosInstance.post("/mentor/register", formData);
    return response.data;
  } catch (error: any) {
    throw error?.response.data || error;
  }
};
export const mentorRegistration = async (
  formData: FormData
): Promise<MutationApiResponse> => {
  try {
    const response = await userAxiosInstance.post("/mentor/register", formData,{
        headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: any) {
    throw error?.response.data || error;
  }
};


export const getDomainsNameAndId = async (): Promise<
  Pick<DomainEntity, "_id" | "name"|"image">[]
> => {
  try {
    const response = await userAxiosInstance.get("/common/domains");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};
