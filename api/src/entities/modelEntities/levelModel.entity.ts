import { LEVEL_TASK_TYPE } from "shared/constants"

export interface ILevelEntity{
    _id:string
    domainId:string
    name:string
    description:string,
    taskFile:string,
    tasks:Task[]
}

interface Task{
    _id:string
    type:LEVEL_TASK_TYPE,
    content:string,
    isCompleted:boolean
}