import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PopulatedReviewEntity } from "@/types/reviewTypes";
import {
  getFormattedDayWithMonthAndYear,
  isoStringToLocalTime,
} from "@/utils/helperFunctions/toTimeString";
import { Award, CheckCircle, MessageSquare, XCircle } from "lucide-react";
import { REVIEW_STATUS } from "@/utils/constants";
import StarRating from "@/components/common/StarRating";
import { useRateMentorMutation } from "@/hooks/tanstack/mentorHooks";
import { useState } from "react";
import ContentViewerModal from "@/components/common/ContentViewerModal";

type Props = {
  review: PopulatedReviewEntity;
  start: string;
  end: string;
};

//zod schema

const Completed = ({ review, start, end }: Props) => {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const [userRating, setUserRating] = useState(0);
  const { mutate: rateMentorMutation } = useRateMentorMutation(
    review.otherAttendee._id
  );

  const getCompletedIcon = () => {
    switch (review.status) {
      case "pass":
        return <Award className="w-16 h-16 text-green-600" />;
      case "fail":
        return <XCircle className="w-16 h-16 text-red-600" />;
      case "cancelled":
        return <XCircle className="w-16 h-16 text-gray-600" />;
      default:
        return <CheckCircle className="w-16 h-16 text-green-600" />;
    }
  };

  const getCompletedTitle = () => {
    switch (review.status) {
      case "pass":
        return "Review Passed!";
      case "fail":
        return "Review Failed";
      case "cancelled":
        return "Review Cancelled";
      default:
        return "Review Completed";
    }
  };

  const getCompletedColor = () => {
    switch (review.status) {
      case "pass":
        return "from-green-100 to-green-200";
      case "fail":
        return "from-red-100 to-red-200";
      case "cancelled":
        return "from-gray-100 to-gray-200";
      default:
        return "from-green-100 to-green-200";
    }
  };

  const getStatusBadge = () => {
    switch (review.status) {
      case "pass":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Passed
          </Badge>
        );
      case "fail":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            Failed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Pending
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            Cancelled
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-green-600">
          <CheckCircle className="w-6 h-6" />
          {getCompletedTitle()}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-full space-y-6">
        <div className="text-center">
          <div
            className={`w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br ${getCompletedColor()} flex items-center justify-center`}
          >
            {getCompletedIcon()}
          </div>
          <h3 className="text-2xl font-semibold text-slate-900 mb-2">
            {getCompletedTitle()}
          </h3>
          <p className="text-slate-600 mb-4">
            This review session ended on {getFormattedDayWithMonthAndYear(end)}{" "}
            at {isoStringToLocalTime(review.slot.end)}
          </p>
          {getStatusBadge()}
        </div>

        <div className="bg-slate-50 rounded-lg p-6 w-full max-w-md">
          <h4 className="font-semibold text-slate-800 mb-3">Session Summary</h4>
          <div className="space-y-2 text-sm text-slate-700">
            <p>
              • Duration:{" "}
              {Math.floor(
                (endTime.getTime() - startTime.getTime()) / (1000 * 60)
              )}{" "}
              minutes
            </p>
            <p>• Student: {review.otherAttendee.name}</p>
            <p>• Domain: {review.domainName}</p>
            <p>• Level: {review.level.name}</p>
            <p>
              • Payment: {review.payment.status}{" "}
              <span className="text-blue-600">
                ( Method : {review.payment.method} )
              </span>{" "}
              <span className="text-green-600">
                Amount : {review.commissionAmount + review.mentorEarning}
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          {review.status === REVIEW_STATUS.PASS && (
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Rate your mentor</p>
              <StarRating
                rating={userRating}
                onRate={(stars) => {
                  setUserRating(stars);
                  rateMentorMutation(stars);
                }}
                size="lg"
                className="justify-center"
              />
            </div>
          )}

          <div className="flex gap-3">
            {(review.status === REVIEW_STATUS.FAIL ||
              review.status === REVIEW_STATUS.PASS) && (
              <ContentViewerModal
                triggerer={
                  <Button size="sm" variant="outline" className="gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Feedback
                  </Button>
                }
                title="Feedback"
                description="Feedback"
                content={review.feedBack}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Completed;
