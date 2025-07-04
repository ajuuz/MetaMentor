import { ILevelRepository } from "entities/repositoryInterfaces/levelRepository.interface";
import { IInsertManyLevelUsecase } from "entities/usecaseInterfaces/level/insertManyLevelUsecase.interface";
import { levelDTO } from "shared/dto/levelsDTO";
import { inject, injectable } from "tsyringe";

@injectable()
export class InsertManyLevelUsecase implements IInsertManyLevelUsecase{

    constructor(
        @inject('ILevelRepository')
        private _levelRepository:ILevelRepository
    ){}

   async execute(levels:levelDTO[]):Promise<void>{
      await this._levelRepository.insertMany(levels)
   }
}