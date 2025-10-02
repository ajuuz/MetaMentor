export enum ROLES {
  ADMIN = "admin",
  USER = "user",
  MENTOR = "mentor",
}

export enum GENDER {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  GONE = 410,
  UNPROCESSED_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
}

export enum REVIEW_STATUS {
  PASS = "pass",
  FAIL = "fail",
  PENDING = "pending",
  CANCELLED = "cancelled",
  RESCHEDULED = "rescheduled",
}
export enum REVIEW_FILTER_STATUS {
  PASS = "pass",
  FAIL = "fail",
  PENDING = "pending",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
  RESCHEDULED = "rescheduled",
}

export enum DATE_RANGE {
  TODAY = "today",
  WEEK = "week",
  MONTH = "month",
  ALL = "all",
}

export enum PENDING_REVIEW_STATE {
  OVER = "over",
  NOTOVER = "notOver",
}

export enum PAYMENT_STATUS {
  SUCCESS = "success",
  FAILED = "failed",
}

export enum PAYMENT_METHOD {
  WALLET = "wallet",
  UPI = "upi",
}

export enum TRANSACTION_TYPE {
  CREDIT = "credit",
  DEBIT = "debit",
}

export enum DAYS {
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
  SUNDAY = "Sunday",
}

export const SUCCESS_MESSAGE = {
  AUTH: {
    CREATED: "User Registered Successfully",
    LOGIN: "User logged in Successfully",
    GOOGLE_LOGIN: "User logged in via google",
    RESEND_OTP: "otp has been resended successfully",
    FORGOT_PASSWORD_SEND_MAIL:
      "Password reset link has been send to your mail id",
    FORGOT_PASSWORD: "Password reset link has been send to your mail id",
  },
  STUDENT: {
    STATUS_UPDATE: "student status updated successfully",
    FETCH_ALL: "Fetched all students successfully",
    FETCH_SINGLE: "Student fetched successfully",
  },
  DOMAINS: {
    CREATED: "Domain created successfully",
    UPDATED: "Domain updated successfully",
    ENROLL: "Successfully enrolled in domain",
    FETCH_ALL: "Fetched all Domains successfully",
    FETCH_SINGLE: "Domain fetched successfully",
    UPDATE_STATUS: "Updated domain status successfully",
  },
  LEVEL: {
    UPDATE_STATUS: "Updated domain status successfully",
    SUBMIT_ASSIGNMENT: "Assignment submitted successfully",
  },
  COMMUNITY: {
    FETCH_ALL: "Fetched all Communities successfully",
    FETCH_SINGLE: "Community fetched successfully",
    UPDATE_STATUS: "Updated Community status successfully",
  },
  REVIEWS: {
    CANCEL_REVIEW_BY_MENTOR: "Review cancelled successfully",
    UPDATE_STATUS: "Updated Review status successfully",
    RESCHEDULE: "Reschedule request has been sent successfully",
    CANCEL_REVIEW_BY_STUDENT:
      "Platform fee has been debited from your amount. Balance is credited to your wallet",
  },
};

export const ERROR_MESSAGE = {
  UNAUTHORIZED_ACCESS_NOT_LOGIN: "Unauthorized access. You have'nt Logged in",
  UNAUTHORIZED_ACCESS: "Unauthorized access.",
  UNAUTHORIZED_ROLE: "Your role is not allowed.",
  INVALID_TOKEN: "Access Denied due to Invalid token",
  TOKEN_EXPIRED_FORGOT: "Link Validity Expired. Try verify email once more",
  TOKEN_EXPIRED_ACCESS: "Access Token time out",
  TOKEN_EXPIRED_REFRESH: "Token time out, Please loggin again",
  SERVER_ERROR: "An error occurred, please try again later.",
  BLOCKED_ERROR: "You are blocked by Admin. please contact admin",
  NOT_FOUND: "Resource not found",
  VALIDATION: "Necessary Credential Not recieved",
  SLOT: {
    GONE: "The resource you’re trying to access used to exist, but it is permanently gone and will never be available again.",
    UNPROCESSED_ENTITY: "Slot is not available currently. Try another one",
    CONFLICT: "Slot already booked. Please select another time.",
  },
  REVIEW: {
    INVALID_STATUS: "Invalid Status",
    CANCEL_ERROR: "Cannot update within 2 hours of the review slot",
  },
};

export enum MENTOR_APPLICATION_STATUS {
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export enum EVENT_EMITTER_TYPE {
  SEND_MAIL = "sendmail",
  SEND_PUSH_NOTIFICATION = "sendNotification",
}

export enum MAIL_CONTENT_PURPOSE {
  OTP = "otp",
  MENTOR_ACCEPTANCE = "mentorAcceptance",
  MENTOR_REJECTION = "mentorRejection",
  FORGOT_PASSWORD = "forgotPassword",
  REVIEW_REMINDER = "reviewReminder",
}

export enum NOTIFICATION_TYPE {
  MENTOR_ACCEPTANCE = "mentorAcceptance",
  MENTOR_REJECTION = "mentorRejection",
  SLOT_BOOKING = "slotBooking",
  SLOT_CANCEL = "slotCancel",
  SLOT_RESCHEDULE = "slotReschedule",
  REVIEW_FEEDBACK_UPDATED = "ReviewFeedBackUpdated",
  REVIEW_REMINDER = "reviewReminder",
  MENTOR_EARNINGS_CREDITED = "MentorEarningsCredited",
}

export enum NOTIFICATION_TITLE {
  MENTOR_ACCEPTANCE = "APPLICATION ACCEPTED",
  MENTOR_REJECTION = "APPLICATION REJECTED",
  REVIEW_BOOKED = "REVIEW BOOKED",
  REVIEW_CANCEL = "REVIEW CANCEL",
  REVIEW_RESCHEDULE = "REVIEW RESCHEDULE",
  REVIEW_RESCHEDULE_ACCEPTED = "REVIEW RESCHEDULE ACCEPTED",
  REVIEW_FEEDBACK_UPDATED = "REVIEW FEEDBACK UPDATED",
  REVIEW_REMINDER = "REVIEW REMINDER",
  MENTOR_EARNINGS_CREDITED = "MENTOR EARNINGS CREDITED",
}
export enum NOTIFICATION_MESSAGE {
  MENTOR_ACCEPTANCE = "Congratulations! Your mentor application has been accepted successfully.",
  MENTOR_REJECTION = "We regret to inform you that your mentor application has been rejected.",
  REVIEW_BOOKED = "Your review session has been successfully booked.",
  REVIEW_CANCEL_MENTOR = "Your review has been cancelled. The review amount has been refunded to your wallet.",
  REVIEW_CANCEL_STUDENT = "The student has cancelled your scheduled review session.",
  REVIEW_RESCHEDULE = "You have a request to reschedule your upcoming review session.",
  REVIEW_RESCHEDULE_ACCEPTED = "Your review reschedule request has been accepted successfully.",
  REVIEW_FEEDBACK_UPDATED = "The feedback for your review session has been updated. Please check it.",
  REVIEW_REMINDER = "Reminder: Your review session is scheduled to start in 30 minutes. Please be ready to join on time.",
  MENTOR_EARNINGS_CREDITED = "Congratulations! Your earnings for the recent session have been successfully credited to your account.",
}

export enum SORT_ORDER {
  ASC = "asc",
  DESC = "desc",
}

export enum LEVEL_TASK_TYPE {
  LINK = "link",
  TEXT = "text",
}

export enum TIME_PERIOD {
  ALL = "all",
  TODAY = "today",
  "7DAYS" = "7days",
  MONTH = "month",
  "3MONTHS" = "3months",
  YEAR = "year",
}

export enum TIME_PERIOD_GROUP_BY {
  HOUR = "hour",
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
}
