import Callender from "@/components/common/Callender";
import PaginationComponent from "@/components/common/PaginationComponent";
import MentorCard from "@/components/mentors/MentorCard";
import { useGetMentorsForDomainQuery } from "@/hooks/tanstack/mentor";
import type { MentorCardType } from "@/types/mentorType";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ScheduleReview() {
  const [selectedMentor, setSelectedMentor] = useState<null | MentorCardType>(
    null
  );
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("name-asc");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [mentors, setMentors] = useState<MentorCardType[]>([]);

  const { domainId, levelId } = useParams();
  if (!domainId || !levelId) {
    console.log(setSortBy,setSearchTerm);
    return <div>some thing wrong</div>;
  }

  const { data: mentorsForDomainResponse } = useGetMentorsForDomainQuery(
    currentPage,
    10,
    sortBy,
    searchTerm,
    domainId
  );

  useEffect(() => {
    if (mentorsForDomainResponse) {
      setMentors(mentorsForDomainResponse.mentors);
      setTotalPages(mentorsForDomainResponse.totalPages);
    }
  }, [mentorsForDomainResponse]);

  useEffect(() => {
    if (!sheetOpen) {
      setSelectedMentor(null);
    }
  }, [sheetOpen]);

  const handleSelectMentor = (mentor: MentorCardType) => {
    setSheetOpen(true);
    setSelectedMentor(mentor);
  };
  return (
    <div
      className="p-5 flex justify-center "
    >
      <div className="flex flex-col w-full items-center justify-between gap-10">
        <div className="grid grid-cols-1  lg:grid-cols-2 ">
          {mentors.map((mentor) => (
            <div onClick={() => handleSelectMentor(mentor)}>
              <MentorCard mentor={mentor} />
            </div>
          ))}
        </div>

        <PaginationComponent
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
      {sheetOpen && (
        <Callender
          sheetOpen={sheetOpen}
          setSheetOpen={setSheetOpen}
          selectedMentor={selectedMentor!}
          domainId={domainId}
          levelId={levelId}
        />
      )}
    </div>
  );
}
