import type { LevelTask } from "./levelTypes"


export type LevelType={
    _id:string,
    name:string,
    description:string,
    taskFile:string,
    tasks:LevelTask[]
    isBlocked:boolean
}