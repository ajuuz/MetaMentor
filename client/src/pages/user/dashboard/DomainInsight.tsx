import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Lock, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { StudentReviewCard } from "@/types/reviewTypes";
import type { DomainEntity } from "@/types/domainTypes";
import type { LevelType } from "@/types/levelTypes";
import { useEnrolledDomainQuery } from "@/hooks/tanstack/domain";
import ContentViewerModal from "@/components/common/ContentViewerModal";
import CompletedLevelCard from "@/components/user/domainInsight/CompletedLevelCard";
import { config } from "@/config/configuration";

const DomainInsight = () => {
  const [reviews, setReviews] = useState<StudentReviewCard[]>([]);
  const [noOfLevelPassed, setNoOfLevelPassed] = useState<number>(0);
  const [domain, setDomain] = useState<Omit<DomainEntity, "isBlocked">>();
  const [nextLevels, setNextLevels] = useState<LevelType[]>();
  const { domainId } = useParams();

  const navigate = useNavigate();

  if (!domainId) {
    return <div>NO Domain ID Recieved</div>;
  }

  const { data: enrolledDomain, isError } = useEnrolledDomainQuery(domainId);

  useEffect(() => {
    if (enrolledDomain) {
      const { reviews, domain, nextLevels } = enrolledDomain;
      setReviews(reviews);
      console.log(reviews);
      setDomain(domain);
      console.log(reviews, noOfLevelPassed, nextLevels);
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
            src={config.IMAGE_BASE_URL+domain?.image}
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
            <Card key={index} className="text-black">
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-lg">
                    LEVEL {noOfLevelPassed + index + 1}: {nextLevel.name}
                  </h2>
                </div>
                <p className="text-sm">{nextLevel.description}</p>
                <p className="text-sm">Reviewer:</p>
                {/* <p className="text-sm">Attempt: {item.attempt}</p> */}
                <Button
                  onClick={() =>
                    navigate(`/review/schedule/${domainId}/${nextLevel._id}`)
                  }
                >
                  Schedule Review
                </Button>
                <div className="flex gap-2">
                  <ContentViewerModal
                    triggerer={
                      <Button
                        size="sm"
                        className="gap-2 cursor-pointer bg-black"
                      >
                        <FileText className="w-4 h-4" />
                        Task File
                      </Button>
                    }
                    title="Task File"
                    description="Task File"
                    content={nextLevel.taskFile}
                  />
                </div>
                <div className="bg-violet-200 text-sm rounded p-1">
                  Remark: Upcoming
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="opacity-60 relative">
              <CardContent className="p-4 text-center">
                <Lock className="mx-auto text-black" size={32} />
                <p className="mt-2 font-semibold">
                  LEVEL {noOfLevelPassed + index + 2}: {nextLevel.name}
                </p>
                <p className="text-sm">Complete The Previous Level To Unlock</p>
              </CardContent>
            </Card>
          )
        )}
      </div>

      {/* Timeline & Review */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* <Card>
          <CardContent className="p-4 space-y-2 text-black">
            <h3 className="font-semibold">Course Time Line</h3>
            <p>Start Date: May 1, 2025</p>
            <p>Expected Completion: Jan 27, 2026</p>
            <Button>Challenges</Button>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default DomainInsight;
