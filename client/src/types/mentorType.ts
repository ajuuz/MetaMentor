import type { GENDER } from "@/utils/constants";
import type { DomainEntity } from "./domainTypes";

export type MentorRegistrationFormDataType = {
  domains: string[];
  about: string;
  workedAt: string[];
  skills: string[];
  cv: string;
  experienceCirtificate: string;
  fee: number;
};

export type MentorRegistrationErrorType = {
  selectedDomainsError?: string;
  descriptionError?: string;
  workedAtError?: string;
  skillsError?: string;
  images?: string;
};

export type MentorDataType = {
  name: string;
  profileImage: string | null;
  country: string | null;
  domains: Pick<DomainEntity, "_id" | "name" | "image">[];
  skills: string[];
  workedAt: string[];
  fee: number;
  userId: string;
  rating: number;
  about: string;
  email: string;
  isBlocked: boolean;
  cv: string;
  experienceCirtificate: string;
  gender: GENDER | null;
  mobileNumber: string | null;
};

export type MentorCardType = {
  name: string;
  profileImage: string | null;
  country: string | null;
  domains: Pick<DomainEntity, "_id" | "name" | "image">[];
  skills: string[];
  workedAt: string[];
  fee: number;
  userId: string;
  rating: number;
  about: string;
};

export type GetAllMentorResponseType = {
  mentors: Omit<MentorDataType, "cv" | "experienceCirtificate">[];
  totalPages: number;
};
