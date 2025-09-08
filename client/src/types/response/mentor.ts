//

import type { GENDER } from "@/utils/constants";
import type { DomainPreviewType } from "./domain";

export type MentorResBase = {
  name: string;
  profileImage: string;
  country: string;
  domains: DomainPreviewType[];
  skills: string[];
  workedAt: string[];
  fee: number;
};

//====admin=====//
export type GetMentorForAdminRes = MentorResBase & {
  about: string;
  cv: string;
  experienceCirtificate: string;
  gender: GENDER;
  mobileNumber: number;
  email: string;
};

export type GetMentorApplicationDetialsForAdminRes = GetMentorForAdminRes;

//=====student=====//
export type GetMentorApplicationDetialsForUserRes = GetMentorForAdminRes;

//=====mentor=====//
export type GetProfessionalDetailsForMentorRes = {
  about: string;
  domains: DomainPreviewType[];
  cv: string;
  experienceCirtificate: string;
  skills: string[];
  workedAt: string[];
  fee: number;
};
