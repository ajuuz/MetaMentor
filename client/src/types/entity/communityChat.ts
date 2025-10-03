export interface ICommunityChatEnitity {
  _id: string;
  communityId: string;
  studentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGetCommunityChat
  extends Omit<ICommunityChatEnitity, "studentId"> {
  studentName: string;
}
