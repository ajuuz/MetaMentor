import {
  PAYMENT_METHOD,
  PAYMENT_STATUS,
  REVIEW_STATUS,
} from "shared/constants";


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
  theory:number;
  practical:number;
  feedBack: string;
  bookedAt: Date;
}




interface ReviewSlot {
  isoStartTime: Date;
  isoEndTime: Date;
  day: string;
  start: number;
  end: number;
}

interface ReviewPayment {
  method: PAYMENT_METHOD;
  status: PAYMENT_STATUS;
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
  theory:number,
  practical:number,
  mentorName: string;
  mentorEarning: number;
  commissionAmount: number;
}

export interface IGetReviewsForStud {
  _id: string;
  slot: ReviewSlot;
  feedBack: string;
  payment: ReviewPayment;
  status: REVIEW_STATUS;
  level: {
    name: string;
    taskFile: string;
  };
  mentor: {
    name: string;
    profileImage: string;
  };
  domainName: string;
}

export interface IGetBookedSlotsForStud {
  mentorId: string;
  slots: ReviewSlot;
}

//mentor
export interface IGetReviewForMent {
  _id: string;
  slot: ReviewSlot;
  feedBack: string;
  payment: ReviewPayment;
  status: REVIEW_STATUS;
  level: {
    name: string;
    taskFile: string;
  };
  student: {
    name: string;
    profileImage: string;
  };
  domainName: string;
}
