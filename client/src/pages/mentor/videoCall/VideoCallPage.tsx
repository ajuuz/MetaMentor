import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import VideoCall from "@/components/videoCall/VideoCall";
import { useGetReviewForMentorQuery } from "@/hooks/tanstack/review";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VideoCallPage = () => {
  const [now, setNow] = useState(new Date());
  const { roomId } = useParams();
  const {
    data: review,
    error,
    isLoading: loading,
  } = useGetReviewForMentorQuery(roomId!);

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);


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

  const slotStart = new Date(review.slot.start);
  const tenMinutesBefore = new Date(slotStart.getTime() - 10 * 60 * 1000);
  const slotEnd = new Date(review.slot.end);

  if (now < tenMinutesBefore || now > slotEnd) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <Card className="w-96">
          <CardContent className="p-8">
            <Alert variant="destructive">
              <AlertDescription className="text-center">
                {now < tenMinutesBefore
                  ? "You can only join this session 10 minutes before it starts."
                  : "This session has been over"}
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
  const myUserKey = `${review.me._id}.${review.me.name}`;

  return <VideoCall myUserKey={myUserKey} />;
};

export default VideoCallPage;
