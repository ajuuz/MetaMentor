

export interface ISaveLevelAssignmentUsecase{
    execute(enrolledLevelId:string,assignments:string[]):Promise<void>
}