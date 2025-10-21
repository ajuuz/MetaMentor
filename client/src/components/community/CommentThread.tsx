"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getCommentsByPostId,
  addComment,
  deleteCommentById,
} from "@/services/userService/communityApi";
import { queryClient } from "@/config/tanstackConfig/tanstackConfig";
import { Avatar } from "@radix-ui/react-avatar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useUserStore } from "@/zustand/userStore";

interface IComment {
  _id: string;
  commenterName?: string;
  commenterId?: string;
  text: string;
  commentedAt: string;
  parentCommentId?: string | null;
  replies?: IComment[];
}

interface CommentThreadProps {
  postId: string;
  level?: number;
}

const CommentThread = ({ postId, level = 0 }: CommentThreadProps) => {
  const [expandedComments, setExpandedComments] = useState<string[]>([]);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const toggleExpanded = (commentId: string) => {
    setExpandedComments((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId]
    );
  };

  const getIndentationClass = (level: number) => {
    const indents: Record<number, string> = {
      0: "pl-0",
      1: "pl-4",
      2: "pl-8",
      3: "pl-12",
      4: "pl-16",
    };
    return indents[Math.min(level, 4)] || "pl-16";
  };
  // use react-query to fetch comments
  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["postComments", postId],
    queryFn: () => getCommentsByPostId(postId),
    enabled: !!postId,
  });

  const addCommentMutation = useMutation({
    mutationFn: ({
      parentCommentId,
      text,
    }: {
      parentCommentId?: string | null;
      text: string;
    }) => addComment(postId, { parentCommentId, text }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postComments", postId] });
      queryClient.invalidateQueries({
        queryKey: ["getCommunityPostCommentsCount", postId],
      });
      setNewCommentText("");
      setReplyingTo(null);
      setFocusedInput(null);
    },
  });

  const user = useUserStore((s) => s.user);

  const deleteMutation = useMutation({
    mutationFn: (commentId: string) => deleteCommentById(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postComments", postId] });
      queryClient.invalidateQueries({
        queryKey: ["getCommunityPostCommentsCount", postId],
      });
    },
  });

  const handleSubmitComment = async (parentId?: string | null) => {
    if (!newCommentText.trim()) return;
    addCommentMutation.mutate({
      parentCommentId: parentId ?? null,
      text: newCommentText.trim(),
    });
  };

  if (isLoading)
    return <div className="p-4 text-sm text-gray-500">Loading comments...</div>;
  if (isError)
    return (
      <div className="p-4 text-sm text-red-500">Failed to load comments.</div>
    );

  const renderComments = (items: IComment[], lvl = level) => {
    return (
      <div className="space-y-0">
        {items.map((comment) => {
          const hasReplies = comment.replies && comment.replies.length > 0;
          const isExpanded = expandedComments.includes(comment._id);

          return (
            <div key={comment._id} className={`${getIndentationClass(lvl)}`}>
              {/* Comment Container */}
              <div className="flex gap-3 py-3 border-l-2 border-transparent hover:border-gray-200 hover:bg-gray-50 px-3 transition-colors">
                {/* Avatar */}
                <Avatar className="h-8 w-8 flex-shrink-0 mt-0.5">
                  <div className="bg-gradient-to-br from-blue-400 to-blue-600 h-full w-full flex justify-center items-center rounded-full text-white font-semibold text-xs">
                    {(comment.commenterName || "?").charAt(0).toUpperCase()}
                  </div>
                </Avatar>

                {/* Comment Content */}
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-sm text-gray-900">
                      {comment.commenterName || "User"}
                    </p>
                    <span className="text-xs text-gray-400">
                      {new Date(comment.commentedAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>

                  {/* Comment Text */}
                  <p className="text-sm text-gray-700 mt-1 leading-relaxed break-words">
                    {comment.text}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      onClick={() =>
                        setReplyingTo(
                          replyingTo === comment._id ? null : comment._id
                        )
                      }
                      className="text-xs text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      Reply
                    </button>

                    {user && user._id === comment.commenterId && (
                      <button
                        onClick={() => deleteMutation.mutate(comment._id)}
                        className="text-xs text-red-500 hover:text-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    )}

                    {/* Show Replies Count */}
                    {hasReplies && (
                      <button
                        onClick={() => toggleExpanded(comment._id)}
                        className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 transition-colors font-medium"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-3.5 w-3.5" />
                            Hide {comment.replies!.length}{" "}
                            {comment.replies!.length === 1
                              ? "reply"
                              : "replies"}
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3.5 w-3.5" />
                            View {comment.replies!.length}{" "}
                            {comment.replies!.length === 1
                              ? "reply"
                              : "replies"}
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Reply Form */}
              {replyingTo === comment._id && (
                <div className="pl-12 pr-3 py-2">
                  <div className="flex gap-2">
                    <input
                      value={focusedInput === comment._id ? newCommentText : ""}
                      onFocus={() => setFocusedInput(comment._id)}
                      onBlur={() => setFocusedInput(null)}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-md border"
                      placeholder="Write a reply..."
                    />
                    <button
                      onClick={() => handleSubmitComment(comment._id)}
                      className="bg-[#2563eb] text-white px-3 py-2 rounded-md"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              )}

              {/* Nested Replies */}
              {hasReplies && isExpanded && (
                <div className="border-l-2 border-gray-200">
                  {renderComments(comment.replies!, lvl + 1)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      {/* New comment input */}
      <div className="px-3 py-3 border-b border-gray-100">
        <div className="flex gap-2">
          <input
            value={focusedInput === "main" ? newCommentText : ""}
            onFocus={() => setFocusedInput("main")}
            onBlur={() => setFocusedInput(null)}
            onChange={(e) => setNewCommentText(e.target.value)}
            className="flex-1 px-3 py-2 rounded-md border"
            placeholder="Write a comment..."
          />
          <button
            onClick={() => handleSubmitComment(null)}
            className="bg-[#111827] text-white px-4 py-2 rounded-md"
          >
            Comment
          </button>
        </div>
      </div>

      <div className="px-2 py-2">
        {comments && comments.length > 0 ? (
          renderComments(comments as IComment[])
        ) : (
          <div className="text-sm text-gray-500">No comments yet.</div>
        )}
      </div>
    </div>
  );
};

export default CommentThread;
