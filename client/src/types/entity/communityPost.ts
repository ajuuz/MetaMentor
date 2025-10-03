
export interface ICommunityPostEntity {
  _id: string;
  communityId: string;
  studentId: string;
  title: string;
  image?: string;
  description: string;
  postedAt: Date;
  isBlocked: boolean;
}

export interface IGetCommunityPost extends Omit<ICommunityPostEntity,'studentId'|'isBlocked'>{
    studentName:string
}
