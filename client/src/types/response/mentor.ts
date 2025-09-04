//

import type { GENDER } from "@/utils/constants";

export type MentorResBase = {
  name: string;
  profileImage: string;
  country: string;
  domains: { _id: string; name: string ,image:string}[];
  skills: string[];
  workedAt: string[];
  fee: number;
};


//admin
export type GetMentorForAdminRes = MentorResBase & {
  about: string;
  cv: string;
  experienceCirtificate: string;
  gender: GENDER;
  mobileNumber: number;
  email: string;
};


//student
export type GetMentorApplicationDetialsRes=GetMentorForAdminRes
