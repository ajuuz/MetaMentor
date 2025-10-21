"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating?: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  onRate?: (rating: number) => void;
  className?: string;
}

const StarRating = ({
  rating = 0,
  maxRating = 5,
  size = "md",
  onRate,
  className,
}: StarRatingProps) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [showRateButton, setShowRateButton] = useState(false);

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const handleStarClick = (starNumber: number) => {
    setSelectedRating(starNumber);
    setShowRateButton(true);
  };

  const handleSubmit = () => {
    if (selectedRating && onRate) {
      onRate(selectedRating);
      setShowRateButton(false); // hide button after rating
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-1">
        {[...Array(maxRating)].map((_, index) => {
          const starNumber = index + 1;
          const isFilled = starNumber <= (selectedRating ?? rating);

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleStarClick(starNumber)}
              className={cn(
                "focus:outline-none transition-colors",
                "hover:text-yellow-400 cursor-pointer"
              )}
              title={`${starNumber} star${starNumber === 1 ? "" : "s"}`}
            >
              <Star
                className={cn(
                  sizeClasses[size],
                  isFilled
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                )}
              />
            </button>
          );
        })}
        {(selectedRating ?? rating) > 0 && (
          <span className="text-sm text-gray-600 ml-1">
            {(selectedRating ?? rating).toFixed(1)}
          </span>
        )}
      </div>

      {showRateButton && (
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded-md hover:bg-blue-700 transition"
        >
          Rate Mentor
        </button>
      )}
    </div>
  );
};

export default StarRating;
