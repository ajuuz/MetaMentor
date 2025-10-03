"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router-dom"
import { CreatePostDialog } from "@/components/community/CreatePostDialog"
import { useGetAllCommunityPostsForStudentQuery } from "@/hooks/tanstack/communityPosts"
import { config } from "@/config/configuration"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Heart, MessageSquare, MoreHorizontal, Users, TrendingUp } from "lucide-react"
import { useState } from "react"
import PostCard from "@/components/community/PostCard"

export default function CommunityPage() {
  const { communityId } = useParams()
  const navigate = useNavigate()
  const { data: posts, isError, isLoading } = useGetAllCommunityPostsForStudentQuery(communityId!)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())

  const toggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="flex items-center justify-center">
            <div className="animate-pulse space-y-4 w-full">
              <div className="h-12 bg-gray-200 rounded-lg w-1/3 mx-auto"></div>
              <div className="h-64 bg-gray-200 rounded-xl"></div>
              <div className="h-64 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isError || !posts) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Error loading posts</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className=" border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MERN Community</h1>
                <p className="text-sm text-gray-500">{posts.length} posts</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CreatePostDialog communityId={communityId!} />
              <Button variant="outline" onClick={() => navigate(`/chat/${communityId}`)} className="hidden sm:flex">
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {posts.map((post) => (
           <PostCard post={post}/>
          ))}

          {/* Empty State */}
          {posts.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <TrendingUp className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-500 mb-4">Be the first to share something with the community!</p>
              <CreatePostDialog communityId={communityId!} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
