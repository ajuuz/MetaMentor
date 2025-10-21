import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { PopulatedReviewEntity } from "@/types/reviewTypes";
import type { ROLES } from "@/utils/constants";
import Active from "./components/Active";
import Waiting from "./components/Waiting";
import Completed from "./components/Completed";
import SideBar from "./components/SideBar";
import MentorCompleted from "./components/MentorCompleted";

type Props = {
  role: Exclude<ROLES, "admin">;
  review: PopulatedReviewEntity;
  loading: boolean;
  error: Error | null;
};
const ReviewDetail = ({ role, review, loading, error }: Props) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
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

  const startTime = new Date(review.slot.start);
  const endTime = new Date(review.slot.end);
  const now = currentTime;

  const getReviewStatus = () => {
    if (
      review.status === "cancelled" ||
      review.status === "pass" ||
      review.status === "fail"
    ) {
      return "completed";
    }

    if (review.status === "pending") {
      if (now >= startTime && now <= endTime) {
        return "active";
      } else if (now < startTime) {
        return "waiting";
      } else {
        return "completed";
      }
    }

    return "completed";
  };

  const status = getReviewStatus();

  const renderMainContent = () => {
    switch (status) {
      case "active":
        return <Active role={role} end={review.slot.end} now={now} reviewId={review._id} />;

      case "waiting":
        return (
          <Waiting role={role} start={review.slot.start} now={now} reviewId={review._id} />
        );

      case "completed":
        if (role === "mentor") {
          return (
            <MentorCompleted
              review={review}
              start={review.slot.start}
              end={review.slot.end}
            />
          );
        } else {
          return (
            <Completed
              review={review}
              start={review.slot.start}
              end={review.slot.end}
            />
          );
        }

      default:
        return null;
    }
  };

  return (
    <div className=" p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-3rem)] relative">
          {/* Left Sidebar - Student Details */}
          <div className="lg:col-span-2">
            <Button
              className="w-full"
              onClick={() => navigate(-1)}
              variant="outline"
            >
              Back
            </Button>
            <SideBar role={role} review={review} />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 ">{renderMainContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;
