
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
  UNAUTHORIZED_ACCESS:"Unauthorized access.",
  SERVER_ERROR:"An error occurred, please try again later.",
}

export enum MENTOR_APPLICATION_STATUS{
    ACCEPTED='accepted',
    REJECTED='rejected'
}