import { IUserCommunityPostController } from "application/interfaces/controller/user/communityPostController.interface";
import { IAddCommentUseCase } from "application/usecase/interfaces/communityPost/addCommentUseCase.interface";
import { ICreateAPostUsecase } from "application/usecase/interfaces/communityPost/createAPostUsecase.interface";
import { IDeletePostUseCase } from "application/usecase/interfaces/communityPost/deleteAPostUsecase.interface";
import { IDeleteCommentUseCase } from "application/usecase/interfaces/communityPost/deleteCommentUsecase.interface";
import { IEditPostUseCase } from "application/usecase/interfaces/communityPost/editPostUsecase.interface";
import { IGetCommentsCountUseCase } from "application/usecase/interfaces/communityPost/getCommentsCountUsecase.interface";
import { IGetCommunityPostsUsecase } from "application/usecase/interfaces/communityPost/getCommunityPostsUsecase.interface";
import { IGetPostCommentsUseCase } from "application/usecase/interfaces/communityPost/getPostCommentsUsecase.interface";
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
    private _IGetPostLikesUsecase: IGetPostLikesUsecase,
    @inject("IAddCommentUseCase")
    private _addCommentUsecase: IAddCommentUseCase,
    @inject("IGetPostCommentsUseCase")
    private _getPostCommentsUsecase: IGetPostCommentsUseCase,
    @inject("IDeleteCommentUseCase")
    private _deleteCommentUsecase: IDeleteCommentUseCase,
    @inject("IGetCommentsCountUseCase")
    private _getCommentsCountUsecase: IGetCommentsCountUseCase,
    @inject("IEditPostUseCase")
    private _editPostUsecase: IEditPostUseCase,
    @inject("IDeletePostUseCase")
    private _deletePostUsecase: IDeletePostUseCase
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
    const data = await this._IGetPostLikesUsecase.execute(postId, likedBy);
    res.status(HTTP_STATUS.OK).json(data);
  }

  async commentAPost(req: Request, res: Response): Promise<void> {
    const postId = req.params.postId;
    const commenterId = (req as ModifiedRequest).user.id;
    const { text, parentCommentId } = req.body;

    const comment = await this._addCommentUsecase.execute({
      postId,
      text,
      commenterId,
      parentCommentId,
    });

    res.status(HTTP_STATUS.CREATED).json(comment);
  }

  async getPostComments(req: Request, res: Response): Promise<void> {
    const postId = req.params.postId;
    const comments = await this._getPostCommentsUsecase.execute(postId);
    res.status(HTTP_STATUS.OK).json(comments);
  }

  async deleteComment(req: Request, res: Response): Promise<void> {
    const commentId = req.params.commentId;
    const userId = (req as ModifiedRequest).user.id;

    await this._deleteCommentUsecase.execute(commentId, userId);
    res
      .status(HTTP_STATUS.OK)
      .json({ message: "Comment deleted successfully" });
  }

  async getPostCommentsCount(req: Request, res: Response): Promise<void> {
    const postId = req.params.postId;
    const count = await this._getCommentsCountUsecase.execute(postId);
    res.status(HTTP_STATUS.OK).json({ count });
  }

  async editPost(req: Request, res: Response): Promise<void> {
    const postId = req.params.postId;
    const studentId = (req as ModifiedRequest).user.id;
    const updates = {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
    };

    await this._editPostUsecase.execute(postId, studentId, updates);
    res.status(HTTP_STATUS.OK).json({ message: "Post updated successfully" });
  }

  async deletePost(req: Request, res: Response): Promise<void> {
    const postId = req.params.postId;
    const studentId = (req as ModifiedRequest).user.id;

    await this._deletePostUsecase.execute(postId, studentId);
    res.status(HTTP_STATUS.OK).json({ message: "Post deleted successfully" });
  }
}
