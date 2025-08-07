
export enum ROLES{
    ADMIN='admin',
    USER='user',
    MENTOR='mentor'
}

export enum GENDER{
    MALE="male",
    FEMALE="female",
    OTHER="other"
}


export enum HTTP_STATUS  {
  OK= 200,
  CREATED= 201,
  ACCEPTED=202,
  NO_CONTENT = 204,
  BAD_REQUEST= 400,
  UNAUTHORIZED= 401,
  FORBIDDEN= 403,
  NOT_FOUND= 404,
  CONFLICT= 409,
  GONE= 410,
  UNPROCESSED_ENTITY=422,
  INTERNAL_SERVER_ERROR= 500,
};

export enum REVIEW_STATUS{
  PASS='pass',
  FAIL='fail',
  PENDING='pending',
  CANCELLED='cancelled'
}
export enum REVIEW_FILTER_STATUS{
  PASS='pass',
  FAIL='fail',
  PENDING='pending',
  CANCELLED='cancelled',
  COMPLETED='completed'
}

export enum PENDING_REVIEW_STATE{
  OVER='over',
  NOTOVER='notOver'
}

export enum PAYMENT_STATUS{
  SUCCESS='success',
  FAILED='failed'
}

export enum PAYMENT_METHOD{
  WALLET='wallet',
  UPI='upi'
}

export enum TRANSACTION_TYPE{
  CREDIT='credit',
  DEBIT='debit'
}

export const SUCCESS_MESSAGE={
   AUTH:{
     CREATED:'User Registered Successfully',
     LOGIN:'User logged in Successfully',
     GOOGLE_LOGIN:"User logged in via google",
     RESEND_OTP:"otp has been resended successfully",
     FORGOT_PASSWORD_SEND_MAIL:"Password reset link has been send to your mail id",
     FORGOT_PASSWORD:"Password reset link has been send to your mail id"
   },
   STUDENT:{
      STATUS_UPDATE:'student status updated successfully',
      FETCH_ALL:"Fetched all students successfully",
      FETCH_SINGLE:"Student fetched successfully"
   },
   DOMAINS:{
    CREATED:'Domain created successfully',
    ENROLL:'Successfully enrolled in domain',
    FETCH_ALL:'Fetched all Domains successfully',
    FETCH_SINGLE:'Domain fetched successfully',
    UPDATE_STATUS:'Updated domain status successfully'
   },
   COMMUNITY:{
    FETCH_ALL:'Fetched all Communities successfully',
    FETCH_SINGLE:'Community fetched successfully',
    UPDATE_STATUS:'Updated Community status successfully'
   },
   REVIEWS:{
    UPDATE_STATUS:'Updated Review status successfully'
   }
}

export const ERROR_MESSAGE={
  UNAUTHORIZED_ACCESS_NOT_LOGIN:"Unauthorized access. You have'nt Logged in",
  UNAUTHORIZED_ACCESS:"Unauthorized access.",
  INVALID_TOKEN:"Access Denied due to Invalid token",
  TOKEN_EXPIRED_FORGOT:"Link Validity Expired. Try verify email once more",
  TOKEN_EXPIRED_ACCESS:"Access Token time out",
  TOKEN_EXPIRED_REFRESH:"Token time out, Please loggin again",
  SERVER_ERROR:"An error occurred, please try again later.",
  BLOCKED_ERROR:"You are blocked by Admin. please contact admin",
  NOT_FOUND:'Resource not found',
  VALIDATION:'Necessary Credential Not recieved',
  SLOT:{
    GONE:'The resource you’re trying to access used to exist, but it is permanently gone and will never be available again.',
    UNPROCESSED_ENTITY:'Slot is not available currently. Try another one',
    CONFLICT:'Slot already booked. Please select another time.'
  },
  REVIEW:{
    INVALID_STATUS:'Invalid Status',
    CANCEL_ERROR:'Cannot update within 2 hours of the review slot'
  }
}

export enum MENTOR_APPLICATION_STATUS{
    ACCEPTED='accepted',
    REJECTED='rejected'
}


export enum EVENT_EMITTER_TYPE{
    SENDMAIL='sendmail'
}

export enum MAIL_CONTENT_PURPOSE{
  OTP='otp',
  MENTOR_ACCEPTANCE='mentorAcceptance',
  MENTOR_REJECTION='mentorRejection',
  FORGOT_PASSWORD='forgotPassword'
}

export enum NOTIFICATION_TYPE{
  MENTOR_ACCEPTANCE='mentorAcceptance',
  MENTOR_REJECTION='mentorRejection',
  SLOT_BOOKING='slotBooking',
  SLOT_CANCEL='slotCancel',
  SLOT_RESCHEDULE='slotReschedule',
}

export enum NOTIFICATION_TITLE{
  MENTOR_ACCEPTANCE='APPLICATION ACCEPTED',
  MENTOR_REJECTION='APPLICATION REJECTED',
  REVIEW_BOOKED='REVIEW BOOKED',
  REVIEW_CANCEL='REVIEW CANCEL',
  REVIEW_RESCHEDULE='REVIEW RESCHEDULE',
  REVIEW_FEEDBACK_UPDATED='REVIEW FEEDBACK UPDATED'
}
export enum NOTIFICATION_MESSAGE{
  MENTOR_ACCEPTANCE='Your Mentor Application Accepted Successfully',
  MENTOR_REJECTION='Your Mentor Application Rejected',
  REVIEW_BOOKED='Review Booked Successfully',
  REVIEW_CANCEL_MENTOR='Your Review has been cancelled! Review amount has been credited to your wallet',
  REVIEW_RECHEDULE='Your Review slot has been reschedule',
  REVIEW_FEEDBACK_UPDATED="Your Review's feedback has been updated. Please check it"
}