import { MulterResDTO } from "shared/dto/response/multer.dto";

export interface IUploadImageUsecase {
  execute(files: Express.Multer.File[]): MulterResDTO[];
}
