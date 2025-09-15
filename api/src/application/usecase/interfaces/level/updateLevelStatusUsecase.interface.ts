

export interface IUpdateLevelStatusUsecase{
    execute(levelId:string,status:boolean):Promise<void>
}