import { IUploadImageUsecase } from "entities/usecaseInterfaces/common/uploadImageUsecase.interface";
import { ImageMulterResponseDTO } from "shared/dto/imageMulterDTO";
import { injectable } from "tsyringe";


@injectable()
export class UploadImageUsecase implements IUploadImageUsecase{

     execute(files:Express.Multer.File[]):ImageMulterResponseDTO{
        return files.map((file:any)=>({
            url:file.path,
            public_id:file.filename,
            }));
    }
}