export interface IStudentEntity {
  userId: string;
  domains: ISelectedDomain[];
  isBlocked: boolean;
  point: number;
  isPremium: boolean;
  premiumPlan: string;
  premiumExpiry: Date;
  completedChallenges: string[];
}

export interface ISelectedDomain {
  domainId: string;
  currentLevel: number;
}