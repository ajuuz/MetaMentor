
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