import { levelDTO } from "shared/dto/levelsDTO";



export interface IInsertManyLevelUsecase{

    execute(levels:levelDTO[]):Promise<void>
}