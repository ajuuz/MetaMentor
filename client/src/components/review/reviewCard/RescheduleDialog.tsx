"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useGetRescheduledReviewQuery } from "@/hooks/tanstack/rescheduleReview";
import { format } from "date-fns"; // For date formatting
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { rescheduleReviewSubmit } from "@/services/mentorService.ts/reviewApi";
import { queryClient } from "@/config/tanstackConfig/tanstackConfig";

type RescheduleDialogProps = {
  reviewId: string;
};

const RescheduleDialog = ({ reviewId }: RescheduleDialogProps) => {
  const { data: rescheduleDetails, isLoading } = useGetRescheduledReviewQuery(reviewId);
  const [mentorText, setMentorText] = useState<string>("");

  useEffect(() => {
    if (rescheduleDetails) {
      setMentorText(rescheduleDetails.mentorText || "");
    }
  }, [rescheduleDetails]);


  const {mutate:rescheduleSubmitMutation}=useMutation({
    mutationFn:rescheduleReviewSubmit,
    onSuccess:(response)=>{
        toast.success(response.message)
        queryClient.invalidateQueries({ queryKey: ["getReviewsForMentor"] });
    },
    onError:(error)=>{
        toast.error(error.message)
    }
  })

  const handleAccept = () => {
    rescheduleSubmitMutation({reviewId,status:'accept'})
};

const handleReject = () => {
    rescheduleSubmitMutation({reviewId,status:'cancel'})
  };

  if (isLoading || !rescheduleDetails) {
    return <div>Loading...</div>;
  }

  const startDate = new Date(rescheduleDetails.slot.start);
  const endDate = new Date(rescheduleDetails.slot.end);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Reschedule Request</Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Reschedule Request Details</DialogTitle>
          <DialogDescription>
            Review the reschedule request below and take appropriate action.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <div>
            <Label>Initiated By</Label>
            <Input value={rescheduleDetails.initiativeBy} readOnly />
          </div>

          <div>
            <Label>Review ID</Label>
            <Input value={rescheduleDetails.reviewId} readOnly />
          </div>

          <div>
            <Label>Student Text</Label>
            <Textarea value={rescheduleDetails.studentText} readOnly />
          </div>

          <div>
            <Label>Mentor Text</Label>
            {rescheduleDetails.initiativeBy === "mentor" ? (
              <Textarea value={mentorText} readOnly />
            ) : (
              <Textarea
                value={mentorText}
                onChange={(e) => setMentorText(e.target.value)}
                placeholder="Write your response here..."
              />
            )}
          </div>

          <div>
            <Label>Reschedule Slot</Label>
            <div className="space-y-1">
              <Input
                value={`Day: ${format(startDate, "EEEE")}`}
                readOnly
              />
              <Input
                value={`Date: ${format(startDate, "dd MMMM yyyy")}`}
                readOnly
              />
              <Input
                value={`Start Time: ${format(startDate, "hh:mm a")}`}
                readOnly
              />
              <Input
                value={`End Time: ${format(endDate, "hh:mm a")}`}
                readOnly
              />
            </div>
          </div>
        </div>

        {rescheduleDetails.initiativeBy === "user" && (
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={handleReject}>
              Reject
            </Button>
            <Button variant="default" onClick={handleAccept}>
              Accept
            </Button>
          </DialogFooter>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleDialog;
