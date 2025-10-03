import { IUserCommunityPostController } from "application/interfaces/controller/user/communityPostController.interface";
import { ICreateAPostUsecase } from "application/usecase/interfaces/communityPost/createAPostUsecase.interface";
import { IGetCommunityPostsUsecase } from "application/usecase/interfaces/communityPost/getCommunityPostsUsecase.interface";
import { IGetPostLikesUsecase } from "application/usecase/interfaces/communityPost/getPostLikesUsecase.interface";
import { IManageLikeUsecase } from "application/usecase/interfaces/communityPost/manageLikeUsecase.interface";
import { Request, Response } from "express";
import { HTTP_STATUS } from "shared/constants";
import { inject, injectable } from "tsyringe";
import { ModifiedRequest } from "type/types";

@injectable()
export class UserCommunityPostController
  implements IUserCommunityPostController
{
  constructor(
    @inject("ICreateAPostUsecase")
    private _createAPostUsecase: ICreateAPostUsecase,
    @inject("IGetCommunityPostsUsecase")
    private _getCommunityPostsUsecase: IGetCommunityPostsUsecase,
    @inject("IManageLikeUsecase")
    private _manageLikeUsecase: IManageLikeUsecase,
    @inject("IGetPostLikesUsecase")
    private _IGetPostLikesUsecase: IGetPostLikesUsecase
  ) {}

  async createAPost(req: Request, res: Response): Promise<void> {
    const userId = (req as ModifiedRequest).user.id;
    const verifiedData = req.verifiedData;
    console.log(verifiedData);
    await this._createAPostUsecase.execute(userId, verifiedData);
    res.status(HTTP_STATUS.OK).json("post created successfully");
  }

  async getCommunityPost(req: Request, res: Response): Promise<void> {
    const communityId = req.params.communityId;
    const posts = await this._getCommunityPostsUsecase.execute(communityId);
    res.status(HTTP_STATUS.OK).json(posts);
  }

  async likeAPost(req: Request, res: Response): Promise<void> {
    const postId = req.params.postId;
    const likedBy = (req as ModifiedRequest).user.id;
    await this._manageLikeUsecase.execute(postId, likedBy, "like");
    res.status(HTTP_STATUS.OK).json("post liked successfully");
  }
  async unLikeAPost(req: Request, res: Response): Promise<void> {
    const postId = req.params.postId;
    const likedBy = (req as ModifiedRequest).user.id;
    await this._manageLikeUsecase.execute(postId, likedBy, "unLike");
    res.status(HTTP_STATUS.OK).json("post unliked successfully");
  }
  async getPostLikes(req: Request, res: Response): Promise<void> {
    const likedBy = (req as ModifiedRequest).user.id;
    const postId = req.params.postId;
    const data = await this._IGetPostLikesUsecase.execute(postId,likedBy);
    res.status(HTTP_STATUS.OK).json(data);
  }

  async commentAPost(req: Request, res: Response): Promise<void> {
    const communityId = req.params.communityId;
    const posts = await this._getCommunityPostsUsecase.execute(communityId);
    res.status(HTTP_STATUS.OK).json(posts);
  }
  async getPostComments(req: Request, res: Response): Promise<void> {
    const communityId = req.params.communityId;
    const posts = await this._getCommunityPostsUsecase.execute(communityId);
    res.status(HTTP_STATUS.OK).json(posts);
  }
}
