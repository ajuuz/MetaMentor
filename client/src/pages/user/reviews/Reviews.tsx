import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PaginationComponent from "@/components/common/PaginationComponent";
import SelectComponent from "@/components/common/SelectComponent";
import { Label } from "@/components/ui/label";
import { useGetReviewsForStudentQuery } from "@/hooks/tanstack/review";
import type { PopulatedReviewEntity } from "@/types/reviewTypes";
import type {
  DATE_RANGE,
  REVIEW_FILTER_STATUS,
  PENDING_REVIEW_STATE,
} from "@/utils/constants";
import StudentReviewCard from "@/components/review/reviewCard/StudentReviewCard";
import { useMutation } from "@tanstack/react-query";
import { cancelReviewByStudent } from "@/services/userService/reviewApi";
import { toast } from "sonner";
import { queryClient } from "@/config/tanstackConfig/tanstackConfig";

const TABS = ["completed", "pending", "rescheduled", "cancelled"] as const;
const StudentReviewsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialTab =
    (searchParams.get("tab") as (typeof TABS)[number]) || "completed";
  const initialPendingState =
    (searchParams.get("pendingReviewState") as PENDING_REVIEW_STATE) || undefined;

  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>(initialTab);
  const [dateRange, setDateRange] = useState<DATE_RANGE>("all");
  const [status, setStatus] = useState<REVIEW_FILTER_STATUS>(
    initialTab || "completed"
  );
  const [pendingReviewState, setPendingReviewState] = useState<
    PENDING_REVIEW_STATE | undefined
  >(initialPendingState);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reviews, setReviews] = useState<PopulatedReviewEntity[]>([]);

  const { data: reviewResponse } = useGetReviewsForStudentQuery(
    status,
    dateRange,
    currentPage,
    10,
    pendingReviewState
  );

  useEffect(() => {
    if (reviewResponse) {
      setReviews(reviewResponse.reviews);
      setTotalPages(reviewResponse.totalPages);
    }
  }, [reviewResponse]);

  const { mutate: cancelReviewMutation,isPending:isLoading } = useMutation({
    mutationFn: cancelReviewByStudent,
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["getReviewsForStudent"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCancelReview = (reviewId:string) => {
    cancelReviewMutation(reviewId);
  };

  const handleTabChange = (val: string) => {
    const newTab = val as (typeof TABS)[number];

    const data: Record<string, string> = {
      tab: newTab,
      dateRange: "all",
      status: newTab,
      currentPage: "1",
    };

    // Reset pendingReviewState if the new tab is "upcoming"
    if (newTab === "pending") {
      setPendingReviewState("notOver");
      data.pendingReviewState = "notOver";
    } else {
      setPendingReviewState(undefined);
    }

    setActiveTab(newTab);
    setDateRange("all");
    setStatus(newTab);
    setCurrentPage(1);

    setSearchParams(data);
  };

  const handleSelectChange = (selectKey: string, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(selectKey, value);
    setSearchParams(newParams.toString());

    if (selectKey === "dateRange") {
      setDateRange(value as DATE_RANGE);
    }
    if (selectKey === "status") {
      setStatus(value as REVIEW_FILTER_STATUS);
    }
    if (selectKey === "pendingReviewState") {
      setPendingReviewState(value as PENDING_REVIEW_STATE);
    }
  };

  return (
    <div
      onClick={() => console.log(status, dateRange, pendingReviewState)}
      className="p-6"
    >
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-6 border-b mx-auto">
          {TABS.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map((tab) => (
          <TabsContent key={tab} value={tab} className="min-h-[400px]">
            <div className="flex flex-wrap gap-5 mb-6 items-center justify-center">
              <div className="flex gap-3 items-center">
                <Label>Date Range</Label>
                <SelectComponent
                  placeHolder={`Date rage - ${dateRange}`}
                  selectKey="dateRange"
                  handleSelectChange={handleSelectChange}
                  disabled={false}
                  content={["all", "today", "week", "month"]}
                />
              </div>

              {tab === "completed" && (
                <div className="flex gap-3 items-center">
                  <Label>Status</Label>
                  <SelectComponent
                    placeHolder={`Select Status - ${status}`}
                    selectKey="status"
                    handleSelectChange={handleSelectChange}
                    disabled={false}
                    content={["completed", "pass", "fail"]}
                  />
                </div>
              )}

              {tab === "pending" && (
                <div className="flex gap-3 items-center">
                  <Label>Over State</Label>
                  <SelectComponent
                    placeHolder={`Over Status - ${pendingReviewState}`}
                    selectKey="pendingReviewState"
                    handleSelectChange={handleSelectChange}
                    disabled={false}
                    content={["over", "notOver"]}
                  />
                </div>
              )}
            </div>

            <div className="grid gap-5 min-h-[300px]">
              {reviews.length === 0 ? (
                <div className="text-center text-gray-500 py-20">
                  No {tab} reviews found.
                </div>
              ) : (
                reviews.map((review) => (
                  <StudentReviewCard
                    key={review._id}
                    review={review}
                    isNotOver={
                      status === "pending" && pendingReviewState === "notOver"
                    }
                    handleCancelReview={handleCancelReview}
                    isLoading={isLoading}
                  />
                ))
              )}
            </div>

            <div className="mt-10 flex justify-center">
              <PaginationComponent
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default StudentReviewsPage;
