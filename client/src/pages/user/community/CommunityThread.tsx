import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { createCommunityPost } from '@/services/userService/communityApi';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { imageUploader } from '@/utils/helperFunctions/imageUploadFunction';

interface CommunityPost {
  id: string;
  communityId: string;
  title: string;
  image?: string;
  description: string;
  studentId: string;
  createdAt: string;
  comments: Comment[];
}

interface Comment {
  id: string;
  commenterId: string;
  comment: string;
  createdAt: string;
}

const dummyPosts: CommunityPost[] = [
  {
    id: '1',
    communityId: 'mern',
    title: 'How to optimize MongoDB queries?',
    image: '',
    description: 'I have performance issues when querying large data. Any suggestions?',
    studentId: 'stu123',
    createdAt: new Date().toISOString(),
    comments: [
      {
        id: 'c1',
        commenterId: 'stu456',
        comment: 'Try indexing the frequently queried fields.',
        createdAt: new Date().toISOString(),
      },
    ],
  },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>(dummyPosts);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imageFile, setImageFile] = useState<File|null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const {communityId} = useParams()

  const {mutate:createPostMutation}=useMutation({
    mutationFn:createCommunityPost,
    onSuccess:(response)=>{
        toast.success(response.message)
    },
    onError:(error)=>{
        toast.error(error.message)
    }
  })

  const handlePost = async() => {
    const newPost: CommunityPost = {
      id: Date.now().toString(),
      communityId: 'mern',
      title,
      image,
      description,
      studentId: 'currentStudentId',
      createdAt: new Date().toISOString(),
      comments: [],
    };

    if(communityId){
      const imageUrl = await imageUploader([imageFile!])
      console.log(imageUrl)
      return
      const createPostData={communityId,title,image,description}
    
    }
    setPosts([newPost, ...posts]);
    setTitle('');
    setDescription('');
    setImage('');
  };

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold">Community - MERN</h2>

      <Card>
        <CardContent className="space-y-4 p-4">
          <Input
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Upload image (optional)"
            value={image}
            type='file'
            accept="image/*"
            onChange={handleFileChange}
          />
          {previewUrl && 
          <div className='flex justify-center'><img src={previewUrl} className='max-w-50'/></div>
          }
          <Textarea
            placeholder="Write your question or share something..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button onClick={handlePost}>Share Post</Button>
        </CardContent>
      </Card>

      {/* Posts */}
      {posts.map((post) => (
        <Card key={post.id} className="bg-white shadow p-4">
          <CardContent className="space-y-2">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            {post.image && <img src={post.image} alt="Post" className="rounded w-full max-h-60 object-cover" />}
            <p>{post.description}</p>
            <p className="text-sm text-gray-500">Posted by: {post.studentId}</p>

            {/* Comments */}
            <div className="mt-4 space-y-2">
              <h4 className="font-medium">Comments</h4>
              {post.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="text-sm border border-gray-200 rounded p-2 bg-gray-50"
                >
                  <p>{comment.comment}</p>
                  <p className="text-xs text-gray-400">By: {comment.commenterId}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}