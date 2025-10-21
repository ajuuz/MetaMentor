import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PopulatedReviewEntity } from "@/types/reviewTypes";
import {
  getFormattedDayWithMonthAndYear,
  isoStringToLocalTime,
} from "@/utils/helperFunctions/toTimeString";
import { AnimatePresence } from "framer-motion";
import {
  Award,
  CheckCircle,
  FileText,
  MessageSquare,
  X,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { REVIEW_STATUS, type ReviewStatus } from "@/utils/constants";
import LoadingSpinnerComponent from "@/components/common/LoadingSpinnerComponent";
import { useMutation } from "@tanstack/react-query";
import { submitReviewFeedBack } from "@/services/mentorService.ts/reviewApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import ContentViewerModal from "@/components/common/ContentViewerModal";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  review: PopulatedReviewEntity;
  start: string;
  end: string;
};

//zod schema
const resultSchema = z
  .object({
    feedBack: z.string().min(6),
    theory: z
      .number({ invalid_type_error: "Theory must be a number" })
      .min(0, { message: "Theory must be at least 0" })
      .max(10, { message: "Theory must be at most 10" }),
    practical: z
      .number({ invalid_type_error: "Practical must be a number" })
      .min(0, { message: "Practical must be at least 0" })
      .max(10, { message: "Practical must be at most 10" }),
    status: z.enum([REVIEW_STATUS.PASS, REVIEW_STATUS.FAIL]) as z.ZodType<
      Extract<ReviewStatus, "pass" | "fail">
    >,
  })
  .superRefine((data, ctx) => {
    if (data.status === REVIEW_STATUS.PASS) {
      if (data.theory < 5) {
        ctx.addIssue({
          path: ["theory"],
          code: "custom",
          message: "Theory must be above 5 when status is PASS",
        });
      }

      if (data.practical < 5) {
        ctx.addIssue({
          path: ["practical"],
          code: "custom",
          message: "Practical must be above 5 when status is PASS",
        });
      }
    }

    if (data.status === REVIEW_STATUS.FAIL) {
      if (data.theory >= 5 && data.practical >= 5) {
        ctx.addIssue({
          path: ["status"],
          code: "custom",
          message:
            "Either theory or practical must be below 5 when status is FAIL",
        });
      }
    }
  });

type ResultForm = z.infer<typeof resultSchema>;

const MentorCompleted = ({ review, start, end }: Props) => {
  const startTime = new Date(start);
  const endTime = new Date(end);

  const [feedBackPopupToggle, setFeedBackPopupToggle] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ResultForm>({
    resolver: zodResolver(resultSchema),
    defaultValues: {
      feedBack: "",
      theory: undefined,
      practical: undefined,
      status: undefined,
    },
  });

  const { mutate: submitFeedBackMutation, isPending: isLoading } = useMutation({
    mutationFn: submitReviewFeedBack,
    onSuccess: (response) => {
      toast.success(response.message);
      navigate("/mentor/reviews?tab=pending&pendingReviewState=notOver");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

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

  const onSubmit = (data: ResultForm) => {
    submitFeedBackMutation({ reviewId: review._id, ...data });
  };

  return (
    <Card className="h-full">
      <AnimatePresence>
        {feedBackPopupToggle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className=" w-[70%]  fixed  bg-white border-3 rounded-lg  shadow-lg left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex justify-center"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-[70%] p-5 flex flex-col gap-4 items-center"
            >
              <X
                onClick={() => setFeedBackPopupToggle(false)}
                strokeWidth={3}
                className="absolute right-2 top-2 bg-black text-white rounded-3xl p-1 "
              />
              <div className="w-full">
                <Label className="text-center font-bold text-white">
                  FEED BACK
                </Label>
                <Textarea
                  disabled={review.status !== REVIEW_STATUS.PENDING}
                  {...register("feedBack")}
                  className="border-2 bg-white min-h-50 max-h-70"
                  placeholder="Enter your feedback here..."
                />
                {errors.feedBack && (
                  <p className="text-red-500">{errors.feedBack.message}</p>
                )}
              </div>
              <div className="w-full flex flex-col sm:flex-row gap-5 justify-between">
                <div className="flex gap-2">
                  <Label className="text-nowrap flex-1">Theory :</Label>
                  <Input
                    type="number"
                    {...register("theory", { valueAsNumber: true })}
                    placeholder="0-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Label className="text-nowrap flex-1">Practical :</Label>
                  <Input
                    type="number"
                    {...register("practical", { valueAsNumber: true })}
                    placeholder="0-10"
                  />
                </div>
              </div>
              <div className="w-full">
                {errors.theory && (
                  <p className="text-red-500">*{errors.theory.message}</p>
                )}
                {errors.practical && (
                  <p className="text-red-500">*{errors.practical.message}</p>
                )}
                {errors.status && (
                  <p className="text-red-500">*{errors.status.message}</p>
                )}
              </div>
              <div className="flex justify-center gap-5">
                {review.status === REVIEW_STATUS.PENDING && (
                  <>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      onClick={() => {
                        setValue("status", REVIEW_STATUS.PASS);
                        handleSubmit(onSubmit)();
                      }}
                      className="w-full bg-green-500 hover:bg-gradient-to-r from-green-500 to-green-700 cursor-pointer"
                    >
                      {isLoading ? <LoadingSpinnerComponent /> : "PASS"}
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      onClick={() => {
                        setValue("status", REVIEW_STATUS.FAIL);
                        handleSubmit(onSubmit)();
                      }}
                      className="w-full bg-red-500 hover:bg-gradient-to-r from-red-500 to-red-700 cursor-pointer"
                    >
                      {isLoading ? <LoadingSpinnerComponent /> : "FAIL"}
                    </Button>
                  </>
                )}
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

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

        <div className="flex gap-3">
          {review.status === "pending" ? (
            <Button
              onClick={() => setFeedBackPopupToggle(true)}
              variant="outline"
              className="gap-2"
            >
              <FileText className="w-5 h-5" />
              Add Feedback
            </Button>
          ) : (
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
      </CardContent>
    </Card>
  );
};

export default MentorCompleted;
