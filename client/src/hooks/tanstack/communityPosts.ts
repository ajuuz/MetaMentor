// getAllCommunityPosts

import {
  getAllCommunityPostLikes,
  getAllCommunityPosts,
} from "@/services/userService/communityApi";
import type { IGetCommunityPost } from "@/types/entity/communityPost";
import { useQuery } from "@tanstack/react-query";
import { getCommentsCountByPostId } from "@/services/userService/communityApi";

//user
export const useGetAllCommunityPostsForStudentQuery = (
  communityId: string
  //   currentPage: number,
  //   limit: number,
  //   sortBy: string,
  //   searchTerm: string
) => {
  return useQuery<IGetCommunityPost[]>({
    queryKey: [
      "getCommunityPostsForStudent",
      //   currentPage,
      //   limit,
      //   sortBy,
      //   searchTerm,
    ],
    queryFn: () =>
      getAllCommunityPosts(
        communityId
        // currentPage,
        // limit,
        // sortBy,
        // searchTerm
      ),
  });
};

export const useGetCommunityPostLikeQuery = (postId: string) => {
  return useQuery({
    queryKey: ["getCommunityPostLikes"],
    queryFn: () => getAllCommunityPostLikes(postId),
  });
};

export const useGetCommunityCommentCountQuery = (postId: string) => {
  return useQuery({
    queryKey: ["getCommunityPostCommentsCount", postId],
    queryFn: () => getCommentsCountByPostId(postId),
  });
};
