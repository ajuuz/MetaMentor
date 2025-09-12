import type { TaskRes } from "./level"



export type EnrolledLevelRes={
    _id:string,
    levelId:string,
    name:string,
    description:string,
    taskFile:string,
    tasks:TaskRes[]
    assignments:string[]
    isBlocked:boolean
}