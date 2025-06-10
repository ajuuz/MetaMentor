import { ImageMulterResponseDTO } from "shared/dto/imageMulterDTO";



export interface IUploadImageUsecase{
    execute(files:Express.Multer.File[]):ImageMulterResponseDTO
}