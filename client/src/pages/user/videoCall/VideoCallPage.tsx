import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import VideoCall from "@/components/videoCall/VideoCall";
import {  useGetReviewForStudentQuery } from "@/hooks/tanstack/review";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";

const VideoCallPage = () => {
  const { roomId } = useParams();
  const {
    data: review,
    error,
    isLoading: loading,
  } = useGetReviewForStudentQuery(roomId!);
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="flex flex-col items-center justify-center p-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Loading Review
            </h3>
            <p className="text-slate-600 text-center">
              Please wait while we fetch the review details...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !review) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <Card className="w-96">
          <CardContent className="p-8">
            <Alert variant="destructive">
              <AlertDescription>
                {error?.message || "Review not found"}
              </AlertDescription>
            </Alert>
            <div className="mt-6 text-center">
              <Button onClick={() => window.history.back()} variant="outline">
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const myUserKey= `${review.me._id}.${review.me.name}`
  console.log("from the review data",myUserKey)

  return <VideoCall myUserKey={myUserKey}/>;
};

export default VideoCallPage;
