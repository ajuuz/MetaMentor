export type ROLES = "user" | "admin" | "mentor";

export type GENDER = "male" | "female" | "other";

export type PAYMENT_METHOD = "upi" | "wallet";

export type PAYMENT_STATUS = "success" | "failed";

export type REVIEW_FILTER_STATUS =
  | "pass"
  | "fail"
  | "pending"
  | "cancelled"
  | "completed"
  | "rescheduled";

export type DATE_RANGE = "today" | "week" | "month" | "all";

export type PENDING_REVIEW_STATE = "over" | "notOver";

export const MENTOR_APPLICATION_STATUS = {
  ACCEPTED: "accepted",
  REJECTED: "rejected",
} as const;
export type MentorApplicationStatus =
  (typeof MENTOR_APPLICATION_STATUS)[keyof typeof MENTOR_APPLICATION_STATUS];

export const REVIEW_STATUS = {
  PASS: "pass",
  FAIL: "fail",
  PENDING: "pending",
  CANCELLED: "cancelled",
  RESCHEDULED: "rescheduled",
} as const;

export type ReviewStatus = (typeof REVIEW_STATUS)[keyof typeof REVIEW_STATUS];

export const LEVEL_TASK_TYPE = {
  LINK: "link",
  TEXT: "text",
} as const;
export type LevelTaskType =
  (typeof LEVEL_TASK_TYPE)[keyof typeof LEVEL_TASK_TYPE];

export const TIME_PERIOD = {
  ALL: "all",
  TODAY: "today",
  "7DAYS": "7days",
  MONTH: "month",
  "3MONTHS": "3months",
  YEAR: "year",
} as const;
export type TimePeriod = (typeof TIME_PERIOD)[keyof typeof TIME_PERIOD];

export const TIME_PERIOD_GROUP_BY = {
  HOUR: "hour",
  DAY: "day",
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
} as const;
export type TimePeriodGroupBy =
  (typeof TIME_PERIOD_GROUP_BY)[keyof typeof TIME_PERIOD_GROUP_BY];
