import { IUploadImageUsecase } from "entities/usecaseInterfaces/common/uploadImageUsecase.interface";
import { MulterResDTO } from "shared/dto/response/multer.dto";
import { injectable } from "tsyringe";


@injectable()
export class UploadImageUsecase implements IUploadImageUsecase{

     execute(files:Express.Multer.File[]):MulterResDTO[]{
        return files.map((file:any)=>({
            url:file.path,
            public_id:file.filename,
            }));
    }
}