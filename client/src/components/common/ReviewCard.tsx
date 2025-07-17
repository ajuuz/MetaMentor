import type { PAYMENT_STATUS, REVIEW_STATUS } from "@/utils/constants";
import React from "react";
import { Button } from "../ui/button";
import { toTimeString } from "@/utils/helperFunctions/toTimeString";

interface ReviewCardProps {
  mentorName: string;
  domainName: string;
  level: {
    name: string;
    taskFile: string;
  };
  status: REVIEW_STATUS
  payment: {
    method: string;
    status: PAYMENT_STATUS 
  };
  feedBack: string;
  slot: {
    day: string;
    start: number;
    end: number;
  };
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  mentorName,
  domainName,
  level,
  status,
  payment,
  feedBack,
  slot,
}) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 max-w-md w-full border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{domainName}</h2>
      
      <div className="text-sm text-gray-600 mb-1">
        <span className="font-semibold">Mentor:</span> {mentorName}
      </div>

      <div className="text-sm text-gray-600 mb-1">
        <span className="font-semibold">Level:</span> {level.name}
      </div>

      <div className="text-sm text-gray-600 mb-1">
        <span className="font-semibold">Task File:</span>{" "}
        <Button>
          View Task
        </Button>
      </div>

      <div className="text-sm text-gray-600 mb-1">
        <span className="font-semibold">Status:</span> {status}
      </div>

      <div className="text-sm text-gray-600 mb-1">
        <span className="font-semibold">Payment Method:</span> {payment.method}
      </div>

      <div className="text-sm text-gray-600 mb-1">
        <span className="font-semibold">Payment Status:</span> {payment.status}
      </div>

      <div className="text-sm text-gray-600 mb-1">
        <span className="font-semibold">Slot:</span> {slot.day} ({toTimeString(slot.start)} - {toTimeString(slot.end)})
      </div>

      <div className="text-sm text-gray-600 mt-3">
        <span className="font-semibold">Feedback:</span> <br />
        <span className="text-gray-700 italic">{feedBack || "No feedback yet."}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
