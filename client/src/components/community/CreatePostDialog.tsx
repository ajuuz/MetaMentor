import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createCommunityPost } from "@/services/userService/communityApi";
import { toast } from "sonner";
import LoadingSpinnerComponent from "../common/LoadingSpinnerComponent";

type Props = {
  communityId: string;
};

export function CreatePostDialog({ communityId }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const { mutate: createPostMutation, isPending } = useMutation({
    mutationFn: createCommunityPost,
    onSuccess: (response) => {
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("communityId", communityId);
    formData.append("title", title);
    formData.append("description", description);
    if (imageFile instanceof File) formData.append("images", imageFile);

    createPostMutation({ communityId, communityPostData: formData });
    setTitle("");
    setDescription("");
    setImage("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  if (!communityId) {
    return <div>No community Id</div>;
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Create A Post</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create A Post</DialogTitle>
            <DialogDescription>
              Add a post to share your ideas, showcase your skills and clear
              your doubts
            </DialogDescription>
          </DialogHeader>
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
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {previewUrl && (
                <div className="flex justify-center">
                  <img src={previewUrl} className="max-w-50" />
                </div>
              )}
              <Textarea
                placeholder="Write your question or share something..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </CardContent>
          </Card>
          <DialogFooter>
            <Button disabled={isPending} onClick={handlePost}>
              {isPending ? <LoadingSpinnerComponent /> : "Share Post"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
