import PaginationComponent from "@/components/common/PaginationComponent";
import ReviewStatsCard from "@/components/dashboard/mentor/ReviewStatsCard";
import DomainCard from "@/components/user/DomainCard";
import { useEnrolledDomainsQuery } from "@/hooks/tanstack/domain";
import {
  useGetReviewCountsForStudentQuery,
  useGetReviewsForStudentQuery,
} from "@/hooks/tanstack/review";
import type { GetEnrolledDomainsRes } from "@/types/response/domain";
import { REVIEW_STATUS } from "@/utils/constants";
import { isoStringToLocalTime } from "@/utils/helperFunctions/toTimeString";
import { useEffect, useState } from "react";

const enrolledDomainss = [
  {
    id: 1,
    name: "MERNCraft: Full-Stack from Scratch",
    description: `Unlock the power of modern web development by mastering MongoDB, Express.js, React, and Node.js. This hands-on course takes you from the basics to building real-world full-stack applications. Whether you're starting your career or upskilling for the next big opportunity, this is your all-in-one roadmap to becoming a MERN stack pro.`,
    image: "/mern-logo.png",
    weeks: 29,
    progress: 75,
    reviewer: "Alexandar",
    upcomingReview: {
      date: "May 15 2025",
      time: "11:00 am - 11:30 am",
      domain: "MERN",
    },
    completed: true,
  },
  {
    id: 2,
    name: "MERNCraft: Full-Stack from Scratch",
    description: `Unlock the power of modern web development by mastering MongoDB, Express.js, React, and Node.js. This hands-on course takes you from the basics to building real-world full-stack applications. Whether you're starting your career or upskilling for the next big opportunity, this is your all-in-one roadmap to becoming a MERN stack pro.`,
    image: "/mern-logo.png",
    weeks: 29,
    progress: 0,
    reviewer: "Alexandar",
    completed: false,
  },
];

const Dashboard = () => {
  const [domains, setDomains] = useState<GetEnrolledDomainsRes[]>();
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const { data: counts } = useGetReviewCountsForStudentQuery();
  const {
    data: enrolledDomains,
    isLoading,
    isError,
  } = useEnrolledDomainsQuery(currentPage, 10);
  const { data: reviewResponse } = useGetReviewsForStudentQuery(
    "pending",
    "all",
    1,
    1,
    "notOver"
  );

  useEffect(() => {
    if (enrolledDomains) {
      const { domains, totalPages } = enrolledDomains;
      setDomains(domains);
      setTotalPages(totalPages);
    }
  }, [enrolledDomains]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span>Loading...</span>
      </div>
    );
  }

  if (isError && !reviewResponse) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span>Something went wrong. Please try again.</span>
      </div>
    );
  }

  const upcomingReview = reviewResponse?.reviews[0];

  const enrolledCount = enrolledDomainss.length;
  const upcoming = enrolledDomainss[0].upcomingReview;
  const reviewer = enrolledDomainss[0].reviewer;
  const domain = enrolledDomainss[0].upcomingReview?.domain;

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
    <div className="min-h-screen bg-[#f7f7f7]">
      <div className="px-30 py-5">
        <ReviewStatsCard
          todayCount={todayCount}
          totalReviewCount={totalReviewCount}
          rescheduledCount={rescheduledCount}
          completedCount={completedCount}
          pendingCount={pendingCount}
        />
      </div>
      {/* Dashboard Main */}
      <div className="bg-[#18184a] rounded-2xl max-w-6xl mx-auto mt-8 mb-20 p-6 md:p-12 relative">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 tracking-wide">
          Enrolled Domains
        </h1>
        <div className="flex flex-col md:flex-row gap-6 md:gap-0 md:justify-between items-center">
          <div className="text-white text-lg md:text-xl font-semibold bg-[#18184a]/80 rounded-2xl px-8 py-6">
            <div>
              Completed Domains :{" "}
              <span className="font-bold">{completedCount}</span>
            </div>
            <div>
              Currently Enrolled Domains :{" "}
              <span className="font-bold">{enrolledCount}</span>
            </div>
          </div>
          <div className="bg-black/90 text-white rounded-xl px-8 py-6 text-center md:absolute md:right-12 md:top-12 shadow-lg">
            <div className="font-bold text-lg mb-2">UPCOMING Review</div>
            {upcomingReview ? (
              <div>
                <div className="text-base mb-1">
                  {isoStringToLocalTime(upcomingReview.slot.start)},{" "}
                  {isoStringToLocalTime(upcomingReview.slot.end)}
                </div>
                <div className="text-base mb-1">
                  Reviewer :{" "}
                  <span className="font-bold">
                    {upcomingReview.otherAttendee.name}
                  </span>
                </div>
                <div className="text-base">
                  Domain :{" "}
                  <span className="font-bold">{upcomingReview.domainName}</span>
                </div>
              </div>
            ) : (
              <div>No review scheduled.</div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-5 relative -top-30">
        {domains?.map((domain) => (
          <DomainCard domain={domain} />
        ))}
      </div>

      <PaginationComponent
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default Dashboard;
