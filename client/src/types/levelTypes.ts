import type { LevelTaskType } from "@/utils/constants"


export type LevelType={
    _id:string,
    name:string,
    description:string,
    taskFile:string,
    tasks:LevelTask[]
    isBlocked:boolean
}


export type LevelFormData = {
  _id?: string;
  isBlocked?: boolean;
  name: string;
  description: string;
  taskFile: string;
  tasks: { type: "link" | "text"; content: string; _id?: string }[];
};

export type AddLevel= Omit<LevelType,'_id'|'isBlocked'>

export type LevelTask={
    type:LevelTaskType,
    content:string,
}