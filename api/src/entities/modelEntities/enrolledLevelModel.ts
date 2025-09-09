export interface IEnrolledLevelEntity {
  _id: string;
  studentId: string;
  domainId: string;
  levelId: string;
  assignments: string[];
}

export interface IGetEnrolledLevel {
  name: string;
  description: string;
  taskFile: string;
  tasks:string;
  assignments: string[];
}
