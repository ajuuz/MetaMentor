import type { LevelTaskType } from "@/utils/constants"


export type LevelType={
    _id:string,
    name:string,
    description:string,
    taskFile:string,
    tasks:LevelTask[]
}

export type AddLevel= Omit<LevelType,'_id'|'tasks'> &{
    tasks:Omit<LevelTask,'isCompleted'>[]
}

export type LevelTask={
    type:LevelTaskType,
    content:string,
    isCompleted:boolean
}