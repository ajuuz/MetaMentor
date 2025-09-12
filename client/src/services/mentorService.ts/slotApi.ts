import { mentorInstance } from "@/config/axiosConfig/mentorAxiosConfig";
import type { MutationApiResponse } from "@/types/responseType";
import type { Slot, WeekSlotsType } from "@/types/slotTypes";

export const updateSlot = async (
  weekSlots: WeekSlotsType
): Promise<MutationApiResponse> => {
  try {
    const response = await mentorInstance.patch("/slots", weekSlots);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getMentorSlots = async (): Promise<WeekSlotsType> => {
  try {
    const response = await mentorInstance.get("/slots");
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getSlotsOfADayForMent = async (day: string): Promise<Slot[]> => {
  try {
    const response = await mentorInstance.get(`/slots/${day}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const updateSlotStatus = async ({
  day,
  slotId,
  slotStatus,
}: {
  day: string;
  slotId: string;
  slotStatus: boolean;
}): Promise<MutationApiResponse> => {
  try {
    console.log(day, slotId, slotStatus);
    const response = await mentorInstance.patch(`/slots/${day}/${slotId}`, {
      slotStatus,
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};


export const slotValidityChecker = async ({
  date,
  slotId,
}: {
  date: Date;
  slotId: string;
}): Promise<MutationApiResponse> => {
  try {
    const response = await mentorInstance.post(
      `/slots/${date.toISOString()}/${slotId}`
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};