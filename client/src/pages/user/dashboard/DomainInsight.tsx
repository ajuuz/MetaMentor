import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { StudentReviewCard } from "@/types/reviewTypes";
import type { DomainEntity } from "@/types/domainTypes";
import { useEnrolledDomainQuery } from "@/hooks/tanstack/domain";
import CompletedLevelCard from "@/components/user/domainInsight/CompletedLevelCard";
import { config } from "@/config/configuration";
import type { EnrolledLevelRes } from "@/types/response/enrolledLevel";
import NextLevelsCard from "@/components/user/domainInsight/NextLevelsCard";
import LockedCard from "@/components/user/domainInsight/LockedCard";

const DomainInsight = () => {
  const [reviews, setReviews] = useState<StudentReviewCard[]>([]);
  const [noOfLevelPassed, setNoOfLevelPassed] = useState<number>(0);
  const [domain, setDomain] = useState<Omit<DomainEntity, "isBlocked">>();
  const [nextLevels, setNextLevels] = useState<EnrolledLevelRes[]>();
  const { domainId } = useParams();


  if (!domainId) {
    return <div>NO Domain ID Recieved</div>;
  }

  const { data: enrolledDomain, isError } = useEnrolledDomainQuery(domainId);

  useEffect(() => {
    if (enrolledDomain) {
      const { reviews, domain, nextLevels } = enrolledDomain;
      setReviews(reviews);
      setDomain(domain);
      setNoOfLevelPassed(noOfLevelPassed);
      setNextLevels(nextLevels);
    }
  }, [enrolledDomain]);

  if (isError) {
    return (
      <div className="flex h-screen justify-center items-center">
        Some thing happend . Please contact Admin
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0824] text-white px-6 py-4 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">{domain?.name}</h1>
        <p className="max-w-3xl mx-auto text-sm">{domain?.description}</p>
        <div className="mx-auto flex justify-center">
          <img
            src={config.IMAGE_BASE_URL + domain?.image}
            alt="MERN Stack"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        <div className="bg-gray-800 p-2 rounded-xl w-full max-w-md mx-auto">
          <Progress value={75} className="h-6" />
          <p className="text-center mt-2">75% completed</p>
        </div>
      </div>

      {/* Level Section */}
      <div className="flex justify-between items-center bg-black p-6 rounded-xl">
        <div>
          <p className="text-xl">
            Current Level : {noOfLevelPassed + 1} {nextLevels?.[0]?.name}
          </p>
          <Button className="mt-2">Schedule Review</Button>
        </div>
        <div className="text-right">
          <p className="text-lg">Next Level</p>
          <p className="text-4xl font-bold">{noOfLevelPassed + 2}</p>
          <p className="text-sm">{nextLevels?.[0]?.name}</p>
        </div>
      </div>

      {/* Level Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {reviews.map((item, index) => (
          <CompletedLevelCard review={item} index={index} />
        ))}

        {/* Locked Card */}
        {nextLevels?.map((nextLevel, index) =>
          index === 0 && reviews?.[reviews.length - 1]?.status !== "pending" ? (
            <NextLevelsCard
              domainId={domainId}
              index={index}
              noOfLevelPassed={noOfLevelPassed}
              nextLevel={nextLevel}
            />
          ) : (
            <LockedCard
              index={index}
              noOfLevelPassed={noOfLevelPassed}
              nextLevel={nextLevel}
            />
          )
        )}
      </div>
    </div>
  );
};

export default DomainInsight;
