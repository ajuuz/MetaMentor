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

export interface IGetMentors {
  name: string;
  profileImage:string,
  country: string;
  domains: { _id: string; name: string ,image:string}[];
  skills: string[];
  workedAt: string[];
  fee: number;
  userId: string;
  mobileNumber: number;
  rating: {
    totalStars: number;
    noOfRaters: number;
  };
  about: string;
  isBlocked: boolean;
}


export interface IGetMentorForAdmin {
  name: string;
  profileImage: string;
  country: string;
  domains: { _id: string; name: string ,image:string}[];
  skills: string[];
  workedAt: string[];
  fee: number;
  about: string;
  cv: string;
  experienceCirtificate: string;
  gender: GENDER;
  mobileNumber: number;
  email: string;
}
