import ReviewStatsCard from "@/components/dashboard/mentor/ReviewStatsCard";
import ReviewGrowthChart from "@/components/dashboard/ReviewChart";
import { Card } from "@/components/ui/card";
import {
  useGetReviewCountsForAdminQuery,
  useGetReviewGrowthForAdminQuery,
} from "@/hooks/tanstack/review";
import {
  REVIEW_STATUS,
  type TimePeriod,
  type TimePeriodGroupBy,
} from "@/utils/constants";
import { useUserStore } from "@/zustand/userStore";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const Dashboard = () => {
  const { user } = useUserStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const [revenue, setRevenue] = useState<number>(0);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>(
    (searchParams.get("timePeriod") as TimePeriod) || "today"
  );

  const [groupBy, setGroupBy] = useState<TimePeriodGroupBy>(
    (searchParams.get("timePeriodGroupBy") as TimePeriodGroupBy) || "day"
  );

  const { data: counts } = useGetReviewCountsForAdminQuery();
  const { data, isError, isPending } = useGetReviewGrowthForAdminQuery(
    timePeriod,
    groupBy
  );

  let todayCount = 0;
  let rescheduledCount = 0;
  let completedCount = 0;
  let pendingCount = 0;
  let totalReviewCount = 0;
  if (counts) {
    for (let { _id, count } of counts) {
      if (_id === REVIEW_STATUS.FAIL || _id === REVIEW_STATUS.PASS) {
        totalReviewCount += count;
        completedCount += count;
      } else if (_id === REVIEW_STATUS.PENDING) {
        totalReviewCount += count;
        pendingCount += count;
      } else if (_id === REVIEW_STATUS.RESCHEDULED) {
        totalReviewCount += count;
        rescheduledCount += count;
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#fff] flex flex-col flex-1 px-8 md:px-8 lg:px-12 py-6 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
          Good Morning{" "}
          <span className="bg-gradient-to-r to-[#2c080e] from-[#ff0000] text-transparent bg-clip-text font-bold capitalize">
            {user?.name}
          </span>
        </h2>
      </div>

      {/* Red Card Section */}
      <ReviewStatsCard
        revenue={revenue}
        todayCount={todayCount}
        totalReviewCount={totalReviewCount}
        rescheduledCount={rescheduledCount}
        completedCount={completedCount}
        pendingCount={pendingCount}
      />

      {/* Review Growth Section */}
      <div>
        <h3 className="text-lg sm:text-xl font-bold mb-4">Review Growth</h3>
        <Card className="rounded-2xl p-4 sm:p-6 shadow-md overflow-x-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-[#222]">Activity</span>
            <select className="bg-transparent text-[#222] font-semibold border p-1 rounded text-sm sm:text-base">
              <option>Month</option>
            </select>
          </div>

          {/* Scrollable Bar Chart */}
          <ReviewGrowthChart
            data={data}
            isError={isError}
            isPending={isPending}
            timePeriod={timePeriod}
            setTimePeriod={setTimePeriod}
            groupBy={groupBy}
            setGroupBy={setGroupBy}
            setRevenue={setRevenue}
            setSearchParams={setSearchParams}
          />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
