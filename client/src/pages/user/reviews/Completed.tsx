// import PaginationComponent from "@/components/common/PaginationComponent";
// import SelectComponent from "@/components/common/SelectComponent";
// import StudentReviewCard from "@/components/review/reviewCard/StudentReviewCard";
// import { Label } from "@/components/ui/label";
// import { useGetReviewsForStudentQuery } from "@/hooks/tanstack/review";
// import type {  PopulatedReviewEntity } from "@/types/reviewTypes";
// import type { DATE_RANGE, REVIEW_FILTER_STATUS } from "@/utils/constants";
// import { useEffect, useState } from "react";

// const Completed = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [dateRange, setDateRange] = useState<DATE_RANGE>("all");
//   const [status, setStatus] = useState<REVIEW_FILTER_STATUS>("completed");
//   const [reviews, setReviews] = useState<PopulatedReviewEntity[]>([]);
//   const { data: reviewResponse } = useGetReviewsForStudentQuery(
//     status,
//     dateRange,
//     currentPage,
//     10
//   );

//   useEffect(() => {
//     if (reviewResponse) {
//       setTotalPages(reviewResponse.totalPages);
//       setReviews(reviewResponse.reviews);
//     }
//   }, [reviewResponse]);

//   const handleSelectChange = (selectKey: string, value: string) => {
//     if (selectKey === "dateRange") setDateRange(value as DATE_RANGE);
//     else if (selectKey === "status") setStatus(value as REVIEW_FILTER_STATUS);
//   };
//   return (
//     <div className="flex flex-col gap-5  z-1  relative">
//       <div className="flex justify-around">
//         <div className="flex gap-5">
//           <Label>Date Range</Label>
//           <SelectComponent
//             placeHolder="Date Range"
//             selectKey="dateRange"
//             handleSelectChange={handleSelectChange}
//             disabled={false}
//             content={["all", "today", "week", "month"]}
//           />
//         </div>
//         <div className="flex gap-5">
//           <Label>Status</Label>
//           <SelectComponent
//             placeHolder="Status"
//             selectKey="status"
//             handleSelectChange={handleSelectChange}
//             disabled={false}
//             content={["completed", "pass", "fail", "cancelled"]}
//           />
//         </div>
//       </div>
//       <div className="w-full">
//         {reviews.length === 0 ? (
//           <div>No {status} reviews...</div>
//         ) : (
//           reviews.map((review) => <StudentReviewCard review={review} />)
//         )}
//       </div>
//       <div className="mt-10">
//         <PaginationComponent
//           currentPage={currentPage}
//           setCurrentPage={setCurrentPage}
//           totalPages={totalPages}
//         />
//       </div>
//     </div>
//   );
// };

// export default Completed;
