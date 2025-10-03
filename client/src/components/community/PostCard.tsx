import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Heart, MessageSquare, MoreHorizontal } from "lucide-react";
import type { IGetCommunityPost } from "@/types/entity/communityPost";
import { config } from "@/config/configuration";
import { useGetCommunityPostLikeQuery } from "@/hooks/tanstack/communityPosts";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {  likePost, unLikePost } from "@/services/userService/communityApi";
import { queryClient } from "@/config/tanstackConfig/tanstackConfig";

const PostCard = ({ post }: { post: IGetCommunityPost }) => {
  const { data, isError, isPending } = useGetCommunityPostLikeQuery(post._id);


   const { mutate: likeMutation } = useMutation({
    mutationFn: likePost,
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["getCommunityPostLikes"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
   const { mutate: unLikeMutation } = useMutation({
    mutationFn: unLikePost,
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["getCommunityPostLikes"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (isPending) {
    return <div>loding...</div>;
  }
  if (isError || !data) {
    return <div>error...</div>;
  }


  const toggleLike=(postId:string)=>{
    if(data.doILiked) unLikeMutation(postId)
    else likeMutation(postId)
  }
  return (
    <Card
      key={post._id}
      className="bg-white hover:shadow-lg transition-all duration-200 border border-gray-200 overflow-hidden"
    >
      {/* Post Header */}
      <div className="flex items-start justify-between p-4 pb-3">
        <div className="flex items-start gap-3 flex-1">
          <Avatar className="h-11 w-11 ring-2 ring-gray-100">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-full flex justify-center items-center rounded-full text-white font-semibold">
              {post.studentName.charAt(0).toUpperCase()}
            </div>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-900 truncate">
                {post.studentName}
              </p>
              <span className="text-gray-400">·</span>
              <p className="text-sm text-gray-500 whitespace-nowrap">
                {new Date(post.postedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mt-1 leading-snug">
              {post.title}
            </h3>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full flex-shrink-0"
        >
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Post Content */}
      <CardContent className="p-0">
        <p className="px-4 pb-3 text-gray-700 leading-relaxed whitespace-pre-wrap">
          {post.description}
        </p>

        {post.image && (
          <div className="relative bg-gray-100">
            <img
              src={config.IMAGE_BASE_URL + post.image || "/placeholder.svg"}
              alt="Post content"
              className="w-full object-cover max-h-[600px]"
            />
          </div>
        )}
      </CardContent>

      {/* Engagement Bar */}
      <div className="px-4 py-2 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
              {data.noOfLikes}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
            </span>
          </div>
          <span className="text-xs">#{post._id.slice(-6)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center border-t border-gray-100 px-2 py-1">
        <button
          onClick={() => toggleLike(post._id)}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-all hover:bg-gray-50 ${
            data.doILiked ? "text-red-500" : "text-gray-600"
          }`}
        >
          <Heart
            className={`h-5 w-5 transition-all ${
              data.doILiked ? "fill-red-500" : ""
            }`}
          />
          <span className="font-medium text-sm">Like</span>
        </button>

        <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-all">
          <MessageSquare className="h-5 w-5" />
          <span className="font-medium text-sm">Comment</span>
        </button>
      </div>
    </Card>
  );
};

export default PostCard;
