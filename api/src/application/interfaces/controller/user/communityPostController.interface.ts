import { Request, Response } from "express";

export interface IUserCommunityPostController {
  createAPost(req: Request, res: Response): Promise<void>;
  getCommunityPost(req: Request, res: Response): Promise<void>;
  likeAPost(req: Request, res: Response): Promise<void>;
  unLikeAPost(req: Request, res: Response): Promise<void>;
  getPostLikes(req: Request, res: Response): Promise<void>;
  commentAPost(req: Request, res: Response): Promise<void>;
  getPostComments(req: Request, res: Response): Promise<void>;
  deleteComment(req: Request, res: Response): Promise<void>;
  getPostCommentsCount(req: Request, res: Response): Promise<void>;
  editPost(req: Request, res: Response): Promise<void>;
  deletePost(req: Request, res: Response): Promise<void>;
}
