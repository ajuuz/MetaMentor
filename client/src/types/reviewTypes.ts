import type {
  PAYMENT_METHOD,
  PAYMENT_STATUS,
  ReviewStatus,
} from "@/utils/constants";

export type ReviewSlotType = {
  _id: string;
  start: string;
  end: string;
};

export type ReviewEntity = {
  _id: string;
  studentId: string;
  mentorId: string;
  domainId: string;
  levelId: string;
  slot: ReviewSlotType;
  feedBack: string;
  payment: {
    method: PAYMENT_METHOD;
    status: PAYMENT_STATUS;
  };
  status: ReviewStatus;
};

export type BookReviewDTO = Pick<
  ReviewEntity,
  "mentorId" | "domainId" | "levelId" | "slot"
>;

export type StudentReviewCard = {
  _id: string;
  mentorName: string;
  commissionAmount: number;
  mentorEarning: number;
  level: {
    name: string;
    taskFile: string;
  };
  status: ReviewStatus;
  payment: {
    method: string;
    status: PAYMENT_STATUS;
  };
  theory: number;
  practical: number;
  feedBack: string;
  slot: ReviewSlotType;
};

export type PopulatedReviewEntity = {
  _id: string;
  me: {
    _id: string;
    name: string;
    profileImage: string;
  };
  otherAttendee: {
    _id: string;
    name: string;
    profileImage: string;
  };
  domainName: string;
  level: {
    name: string;
    taskFile: string;
  };
  status: ReviewStatus;
  payment: {
    method: string;
    status: PAYMENT_STATUS;
  };
  feedBack: string;
  mentorEarning: number;
  commissionAmount: number;
  isRescheduledOnce: boolean;
  slot: ReviewSlotType;
  theory: number;
  practical: number;
};

export type GetStudentReviewResponseDTO = {
  _id: string;
  mentor: {
    _id: string;
    name: string;
    profileImage: string;
  };
  domainName: string;
  level: {
    name: string;
    taskFile: string;
  };
  status: ReviewStatus;
  payment: {
    method: string;
    status: PAYMENT_STATUS;
  };
  feedBack: string;
  isRescheduledOnce: boolean;
  slot: ReviewSlotType;
};

export type GetDomainReviewSlotResponseDTO = {
  mentorId: string;
  slots: ReviewSlotType[];
};
