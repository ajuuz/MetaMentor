import { LEVEL_TASK_TYPE } from "shared/constants"

export interface ILevelEntity{
    _id:string
    domainId:string
    name:string
    description:string,
    taskFile:string,
    tasks:ITask[]
}

interface ITask{
    _id:string
    type:LEVEL_TASK_TYPE,
    content:string,
    isCompleted:boolean
}

export interface ICreateTaskEntity extends Omit<ITask,'_id'>{}
export interface ICreateLevelEntity extends Omit<ILevelEntity,"_id"|'tasks'>{
    tasks:ICreateTaskEntity[]
}