import { Button } from "@/components/ui/button";
import { enrollDomain } from "@/services/userService/domainApi";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import LoadingSpinnerComponent from "@/components/common/LoadingSpinnerComponent";
import { useUserGetSpecificDomainQuery } from "@/hooks/tanstack/domain";
import type { DomainEntity } from "@/types/domainTypes";
import type { LevelRes } from "@/types/response/level";
import LevelRoadMap from "@/components/Level/roadMap/RoadMap";
import DomainAbout from "@/components/domain/About/About";

const DomainDetail = () => {
  const [domainDetails, setDomainDetails] =
    useState<Omit<DomainEntity, "isBlocked">>();
  const [levels, setLevels] = useState<LevelRes[]>();
  const [tab, setTab] = useState<"about" | "roadMap">("about");
  const [selectedLevels, setSelectedLevels] = useState<
    { index: number; levelId: string }[]
  >([]);
  const navigate = useNavigate();
  const { domainId } = useParams();

  if (!domainId) navigate(-1);

  const {
    data: specifcDomain,
    isError,
    isLoading,
  } = useUserGetSpecificDomainQuery(domainId as string);

  const { mutate: enrollDomainMutation, isPending: enrollPending } =
    useMutation({
      mutationFn: enrollDomain,
      onSuccess: (response) => {
        toast.success(response.message);
        navigate("/dashboard");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  useEffect(() => {
    if (specifcDomain) {
      const domain = specifcDomain;
      const { levels, ...rest } = domain;
      setLevels(levels);
      setDomainDetails(rest);
    }
  }, [specifcDomain]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
  }, [tab]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span>Loading...</span>
      </div>
    );
  }

  if (isError || !domainDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span>Something went wrong. Please try again.</span>
      </div>
    );
  }

  const handleEnroll = () => {
    if (!domainId) return;
    let enrollDetails: {
      domainId: string;
      fullCourse: boolean;
      selectedLevelsId?: string[];
    } = {
      domainId,
      fullCourse: true,
    };
    if (selectedLevels.length) {
      const selectedLevelsId = selectedLevels.map((level) => level.levelId);
      const totalNoOfLevels = levels?.length;
      const totalNofSelectedLevels = selectedLevelsId.length;
      if (totalNoOfLevels !== totalNofSelectedLevels) {
        enrollDetails.fullCourse = false;
        enrollDetails.selectedLevelsId = selectedLevelsId;
      }
    }
    enrollDomainMutation(enrollDetails);
  };

  return (
    <div className="font-['Roboto','Arial','sans-serif'] bg-white">
      {tab === "about" ? (
        <DomainAbout domainDetails={domainDetails} />
      ) : (
        <LevelRoadMap
          levels={levels!}
          selectedLevels={selectedLevels}
          setSelectedLevels={setSelectedLevels}
        />
      )}

      <div className="flex justify-center">
        <Button
          className="my-5"
          onClick={() =>
            setTab((prev) => (prev === "about" ? "roadMap" : "about"))
          }
        >
          {tab === "about" ? "Road Map" : "About"}
        </Button>
      </div>

      {/* Call to Action */}
      <section className="bg-gradient-to-b from-[#8B0000] to-[#0b182e] text-white py-12 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-bold text-2xl mb-6">Ready to Take the Leap?</h2>
          <p className="font-medium text-lg mb-8">
            By the end of our course, you won’t just “know” {domainDetails.name}{" "}
            - you'll master it. Build real-world projects, craft responsive
            designs, and create full-stack applications from scratch.
            <br />
            Join today and become the full-stack developer companies are
            searching for.
          </p>
          <button
            disabled={enrollPending}
            onClick={handleEnroll}
            className="bg-white text-[#222] border-none rounded-xl px-16 py-4 font-bold text-xl cursor-pointer mt-2"
          >
            {enrollPending ? <LoadingSpinnerComponent /> : "Enroll"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default DomainDetail;
