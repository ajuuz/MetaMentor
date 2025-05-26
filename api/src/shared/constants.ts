
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


export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};