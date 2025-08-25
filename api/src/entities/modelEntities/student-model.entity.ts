import { ObjectId } from "mongoose";

export interface IStudentEntity {
  userId: ObjectId;
  domains: ISelectedDomain[];
  isBlocked: boolean;
  point: number;
  isPremium: boolean;
  premiumPlan: ObjectId;
  premiumExpiry: Date;
  completedChallenges: ObjectId[];
}

export interface ISelectedDomain {
  domainId: ObjectId;
  currentLevel: number;
}

export interface IGetStudentsForAdmin {
  userId: string;
  isBlocked: boolean;
  point: number;
  isPremium: boolean;
  name: string;
  country: string|null;
  mobileNumber: string|null;
}
