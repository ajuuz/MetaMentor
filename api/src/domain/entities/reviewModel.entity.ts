import {
  PAYMENT_METHOD,
  PAYMENT_STATUS,
  REVIEW_STATUS,
} from "shared/constants";

//herper interfaces
interface ReviewSlot {
  _id: string;
  start: Date;
  end: Date;
}
interface ReviewPayment {
  method: PAYMENT_METHOD;
  status: PAYMENT_STATUS;
}

//main entity
export interface IReviewEntity {
  _id: string;
  studentId: string;
  mentorId: string;
  domainId: string;
  levelId: string;
  mentorEarning: number;
  commissionAmount: number;
  payment: ReviewPayment;
  status: REVIEW_STATUS;
  slot: ReviewSlot;
  theory: number;
  practical: number;
  feedBack: string;
  bookedAt: Date;
  isRescheduledOnce: boolean;
}

export interface ICreateReview
  extends Omit<
    IReviewEntity,
    | "_id"
    | "status"
    | "slot"
    | "theory"
    | "practical"
    | "feedBack"
    | "bookedAt"
    | "isRescheduledOnce"
  > {
  slot: Omit<ReviewSlot, "_id">;
}
export interface ICreateReviewPoplutedEntity {
  _id: string;
  student: {
    _id:string,
    name: string;
    email: string;
  };
  mentor: {
    _id:string,
    name: string;
    email: string;
  };
  levelName: string;
  domainName: string;
  slot:ReviewSlot
}

//students
export interface IGetReviewsForStudAndDomain {
  _id: string;
  slot: ReviewSlot;
  feedBack: string;
  payment: ReviewPayment;
  status: REVIEW_STATUS;
  level: {
    name: string;
    taskFile: string;
  };
  theory: number;
  practical: number;
  mentorName: string;
  mentorEarning: number;
  commissionAmount: number;
}

export interface IGetBookedSlotsForStud {
  mentorId: string;
  slots: ReviewSlot;
}

//mentor

export interface IPopulatedReviewEntity {
  _id: string;
  mentorId: 1;
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
  status: REVIEW_STATUS;
  payment: ReviewPayment;
  feedBack: string;
  mentorEarning: number;
  commissionAmount: number;
  isRescheduledOnce: boolean;
  slot: ReviewSlot;
  theory: number;
  practical: number;
}
