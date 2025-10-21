import { userAxiosInstance } from "@/config/axiosConfig/userAxiosConfig";
import type { DomainEntity } from "@/types/domainTypes";
import type { IGetCommunityChat } from "@/types/entity/communityChat";
import type { IGetCommunityPost } from "@/types/entity/communityPost";
import type { MutationApiResponse } from "@/types/responseType";

export const createCommunityPost = async ({
  communityId,
  communityPostData,
}: {
  communityId: string;
  communityPostData: FormData;
}): Promise<MutationApiResponse> => {
  try {
    const response = await userAxiosInstance.post(
      `/communities/${communityId}/posts`,
      communityPostData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getAllCommunityPosts = async (
  communityId: string
  //   currentPage: number,
  //   limit: number,
  //   sortBy: string,
  //   searchTerm: string
): Promise<IGetCommunityPost[]> => {
  try {
    const response = await userAxiosInstance.get(
      `/communities/${communityId}/posts`
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const likePost = async (
  postId: string
): Promise<MutationApiResponse> => {
  try {
    const response = await userAxiosInstance.post(`/posts/${postId}/like`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const unLikePost = async (
  postId: string
): Promise<MutationApiResponse> => {
  try {
    const response = await userAxiosInstance.post(`/posts/${postId}/unLike`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getAllCommunityPostLikes = async (
  postId: string
): Promise<{
  noOfLikes: number;
  doILiked: boolean;
}> => {
  try {
    const response = await userAxiosInstance.get(`/posts/${postId}/like`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getEnrolledCommunities = async (
  currentPage: number,
  limit: number
): Promise<DomainEntity> => {
  try {
    const response = await userAxiosInstance.get(
      `/communities?currentPage=${currentPage}&limit=${limit}`
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getCommunityChats = async (
  communityId: string
): Promise<IGetCommunityChat[]> => {
  try {
    const response = await userAxiosInstance.get(
      `/communities/${communityId}/chat`
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

// ---------------- Comments API ----------------
export const getCommentsByPostId = async (postId: string): Promise<any[]> => {
  try {
    const response = await userAxiosInstance.get(`/posts/${postId}/comments`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const addComment = async (
  postId: string,
  payload: { parentCommentId?: string | null; text: string }
) => {
  try {
    const response = await userAxiosInstance.post(
      `/posts/${postId}/comments`,
      payload
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const deleteCommentById = async (commentId: string) => {
  try {
    const response = await userAxiosInstance.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const getCommentsCountByPostId = async (postId: string) => {
  try {
    const response = await userAxiosInstance.get(
      `/posts/${postId}/comments/count`
    );
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

export const deletePost = async (
  postId: string
): Promise<MutationApiResponse> => {
  try {
    const response = await userAxiosInstance.delete(`/posts/${postId}`);
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};
