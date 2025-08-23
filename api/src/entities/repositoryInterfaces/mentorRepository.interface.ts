import { IMentorEntity } from "entities/modelEntities/mentor-model.entity";
import { GetAllMentorResponseDTO, MentorDataDTO, MentorFindFilterDTO, MentorRegisterRequestDTO, MentorUpdateDTO } from "shared/dto/mentorDTO";

export interface IMentorRepository {
  findById(userId: string): Promise<MentorDataDTO|undefined>;
  register(userId:string,mentorDetails:Partial<IMentorEntity>):Promise<void>
  find(filter: Partial<MentorFindFilterDTO>, skip: number, limit: number):Promise<Omit<Omit<GetAllMentorResponseDTO,"cv"|"experienceCirtificate">,'totalPages'>>
  updateOne(filter:Partial<MentorUpdateDTO.filter>,update:Partial<MentorUpdateDTO.update>):Promise<void>
  getStatus(userId:string):Promise<IMentorEntity|null>
}
