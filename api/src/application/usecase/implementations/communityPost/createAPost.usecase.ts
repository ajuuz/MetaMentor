import { inject, injectable } from "tsyringe";
import { ICreateAPostUsecase } from "application/usecase/interfaces/communityPost/createAPostUsecase.interface";
import { CreateCommunityPostReqDTO } from "application/dto/requset/communityPost.dto";
import { ICommunityPostEntity } from "domain/entities/communityPostModel.entity";
import { ICommunityPostRepository } from "domain/repositoryInterfaces/communityPostRepository.interface";

@injectable()
export class CreateAPostUsecase implements ICreateAPostUsecase {
  constructor(
    @inject("ICommunityPostRepository")
    private _communityPostRepository: ICommunityPostRepository
  ) {}

  async execute(
    userId: string,
    post: CreateCommunityPostReqDTO
  ): Promise<void> {
    const { communityId, title, images, description } = post;

    const mappedPost: Partial<ICommunityPostEntity> = {
      studentId:userId,
      communityId,
      title,
      description,
    };

    let image: string;
    if (images) {
      image = images[0];
      mappedPost.image=image;
    }

    await this._communityPostRepository.createAPost(mappedPost);
  }
}
