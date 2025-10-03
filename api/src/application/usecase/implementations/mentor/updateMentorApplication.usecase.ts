import { IMentorEntity } from "domain/entities/mentor-model.entity";
import { NotFoundError } from "domain/errors/notFounError";
import { IMentorRepository } from "domain/repositoryInterfaces/mentorRepository.interface";

import { UpdateMentorApplicationReqDTO } from "application/dto/requset/mentor.dto";
import { IUpdateMentorApplicationUsecase } from "application/usecase/interfaces/mentor/updateMentorApplicationUsecase.interface";
import { inject, injectable } from "tsyringe";

@injectable()
export class UpdateMentorApplicationUsecase
  implements IUpdateMentorApplicationUsecase
{
  constructor(
    @inject("IMentorRepository")
    private _mentorRepository: IMentorRepository
  ) {}

  async execute(
    userId: string,
    mentorDetails: UpdateMentorApplicationReqDTO
  ): Promise<void> {
    const isMentorExists = await this._mentorRepository.findById(userId);
    if (!isMentorExists) {
      throw new NotFoundError("application not found");
    }

    const mappedFilterFields: {
      field: keyof IMentorEntity;
      value: string | boolean | number;
    }[] = [];
    mappedFilterFields.push({ field: "userId", value: userId });

    const mappedUpdationFields: Partial<
      Pick<
        IMentorEntity,
        | "about"
        | "domains"
        | "cv"
        | "experienceCirtificate"
        | "skills"
        | "workedAt"
        | "fee"
      >
    > = {};
    if (mentorDetails.about) mappedUpdationFields.about = mentorDetails.about;
    if (mentorDetails.domains)
      mappedUpdationFields.domains = mentorDetails.domains;

    if (mentorDetails.imageIndexMap?.length && mentorDetails.images?.length) {
      const imageIndexMap = mentorDetails.imageIndexMap;
      const images = mentorDetails.images;
      imageIndexMap.forEach((item, index) => {
        if (item === "cv") mappedUpdationFields.cv = images[index];
        if (item === "experienceCirtificate")
          mappedUpdationFields.experienceCirtificate = images[index];
      });
    }
    if (mentorDetails.skills)
      mappedUpdationFields.skills = mentorDetails.skills;

    if (mentorDetails.workedAt)
      mappedUpdationFields.workedAt = mentorDetails.workedAt;

    if (mentorDetails.fee) mappedUpdationFields.fee = mentorDetails.fee;

    console.log(mappedFilterFields, mappedUpdationFields);
    await this._mentorRepository.updateOne(
      mappedFilterFields,
      mappedUpdationFields
    );
  }
}
