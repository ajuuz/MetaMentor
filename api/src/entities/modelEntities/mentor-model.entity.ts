import { GENDER } from "shared/constants";

export interface IMentorEntity {
  userId: string;
  about: string;
  domains: string[];
  isBlocked: boolean;
  cv: string;
  experienceCirtificate: string;
  rating: {
    totalStars: number;
    noOfRaters: number;
  };
  skills: string[];
  workedAt: string[];
  isVerified: boolean;
  isRejected: boolean;
  fee: number;
}

export interface IGetMentorsForAdmin {
  name: string;
  country: string;
  mobileNumber: number;
  userId: string;
  domains: string[];
  skills: string[];
  workedAt: string[];
  fee: number;
  isBlocked: boolean;
}

export interface IGetMentorForAdmin {
  about: string;
  cv: string;
  experienceCirtificate: string;
  skills: string[];
  workedAt: string[];
  fee: number;
  name: string;
  country: string;
  gender: GENDER;
  mobileNumber: number;
  email: string;
  profileImage: string;
  domains: { _id: string; name: string }[];
}
