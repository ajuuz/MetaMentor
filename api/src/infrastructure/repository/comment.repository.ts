import { ObjectId, Types } from "mongoose";
import { ICommentEntity } from "domain/entities/commentModel.entity";
import {
  commentModel,
  ICommentModel,
} from "infrastructure/database/models/comment.model";
import {
  CommentTree,
  ICommentRepository,
} from "domain/repositoryInterfaces/commentRepository.interface";
import { BaseRepository } from "./base.repository";

function docToEntity(
  doc: Partial<ICommentModel> & { _id?: ObjectId }
): ICommentEntity {
  return {
    _id: doc._id ? String(doc._id) : "",
    postId: doc.postId ? String(doc.postId) : "",
    parentCommentId: doc.parentCommentId
      ? String(doc.parentCommentId)
      : (null as any),
    text: doc.text ?? "",
    commenterId: doc.commenterId ? String(doc.commenterId) : "",
    commentedAt: doc.commentedAt ?? new Date(),
    isBlocked: !!doc.isBlocked,
  };
}

export class CommentRepository
  extends BaseRepository<ICommentEntity, ICommentModel>
  implements ICommentRepository
{
  constructor() {
    super(commentModel);
  }
  async createComment(comment: ICommentEntity): Promise<ICommentEntity> {
    const payload: Partial<ICommentEntity> = {
      postId: comment.postId,
      parentCommentId: comment.parentCommentId || null,
      text: comment.text ?? "",
      commenterId: comment.commenterId,
      commentedAt: comment.commentedAt ?? new Date(),
      isBlocked: comment.isBlocked ?? false,
    };

    const created = await commentModel.create(payload);
    return docToEntity(created.toObject());
  }

  async getByPostId(postId: string): Promise<CommentTree[]> {
    const docs = await commentModel
      .find({ postId: new Types.ObjectId(postId), isBlocked: false })
      .sort({ commentedAt: -1 })
      .lean<Partial<ICommentModel>[]>()
      .exec();

    // recursive Node type so replies are always Node[]
    type Node = CommentTree & { replies: Node[] };

    const map = new Map<string, Node>();

    const nodes: Node[] = docs.map((d) => {
      const e = docToEntity(d as any) as CommentTree;
      const node: Node = { ...e, replies: [] };
      map.set(node._id, node);
      return node;
    });

    const roots: Node[] = [];
    for (const node of nodes) {
      const parentId = node.parentCommentId as string | null;
      if (!parentId || parentId === "null" || parentId === "") {
        roots.push(node);
      } else {
        const parent = map.get(parentId);
        if (parent) {
          parent.replies.push(node);
        } else {
          roots.push(node); // fallback if parent missing
        }
      }
    }

    // sort and normalize replies recursively
    const sortRec = (arr: Node[]) => {
      arr.sort((a, b) => b.commentedAt.getTime() - a.commentedAt.getTime());
      arr.forEach((n) => {
        if (!n.replies) n.replies = [];
        sortRec(n.replies);
      });
    };
    sortRec(roots);

    return roots;
  }

  async getParentCommentsCount(postId: string): Promise<number> {
    return await commentModel.countDocuments({
      postId: new Types.ObjectId(postId),
      parentCommentId: null,
      isBlocked: false,
    });
  }

  async deleteComment(commentId: string): Promise<void> {
    // First delete all replies recursively
    const deleteReplies = async (parentId: string) => {
      const replies = await commentModel.find({
        parentCommentId: new Types.ObjectId(parentId),
      });

      for (const reply of replies) {
        await deleteReplies(reply._id.toString());
        await commentModel.deleteOne({ _id: reply._id });
      }
    };

    // Delete all replies first
    await deleteReplies(commentId);

    // Then delete the comment itself
    await commentModel.deleteOne({ _id: new Types.ObjectId(commentId) });
  }
}
