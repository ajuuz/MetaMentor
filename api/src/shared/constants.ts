
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
  INTERNAL_SERVER_ERROR= 500,
};

export enum REVIEW_STATUS{
  PASS='pass',
  FAIL='fail',
  PENDING='pending'
}

export enum PAYMENT_STATUS{
  SUCCESS='success',
  FAILED='failed'
}
export enum PAYMENT_METHOD{
  WALLET='wallet',
  UPI='upi'
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