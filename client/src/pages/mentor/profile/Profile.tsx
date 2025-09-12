import ProfessionalDetails from "@/components/mentor/mentorDetails/ProfessionalDetails";
import UserDetails from "@/components/user/userDetails/UserDetails";
import { useGetDomainsNameAndIdQuery } from "@/hooks/tanstack/domain";
import { useGetProfessionalDetailsForMentQuery } from "@/hooks/tanstack/mentor";
import { useProfileQuery } from "@/hooks/tanstack/profile";
import { updateMentorAplication } from "@/services/userService/mentorApi";
import type { MentorApplicationFormReq } from "@/types/request/mentor";
import { useMutation } from "@tanstack/react-query";
import { Edit, Eye } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const [isViewMode,setIsViewMode]=useState<boolean>(true)
  const { data: profileData, isLoading, isError } = useProfileQuery();
  const { data: domainsData } = useGetDomainsNameAndIdQuery();
  const { data: professionalData } = useGetProfessionalDetailsForMentQuery();
  const navigate = useNavigate();

  const { mutate: updateMentorApplicationMutation, isPending: loading } =
    useMutation({
      mutationFn: updateMentorAplication,
      onSuccess: (response) => {
        toast.success(response.message);
        navigate("/");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center">Error</div>;
  }

  if (!professionalData || !profileData || !domainsData)
    return <div>Loading...</div>;
  const { about, cv, experienceCirtificate, domains, fee, skills, workedAt } =
    professionalData;

  const onSubmit = (data: MentorApplicationFormReq) => {
    console.log(data)
    console.log("working")
    const formData = new FormData();
    if (data.about !== about) formData.append("about", data.about);

    if (data.fee !== fee) formData.append("fee", data.fee.toString());

    if (JSON.stringify(data.skills) !== JSON.stringify(skills))
      formData.append("skills", JSON.stringify(data.skills));

    if (JSON.stringify(data.workedAt) !== JSON.stringify(workedAt))
      formData.append("workedAt", JSON.stringify(data.workedAt));

    if (JSON.stringify(data.selectedDomains) !== JSON.stringify(domains))
      formData.append(
        "domains",
        JSON.stringify(data.selectedDomains.map((domain) => domain._id))
      );

    let imageIndexMap = [];
    if (data.images[0] instanceof File) {
      formData.append("images", data.images[0]);
      imageIndexMap.push("cv");
    }
    if (data.images[1] instanceof File) {
      formData.append("images", data.images[1]);
      imageIndexMap.push("experienceCirtificate");
    }
    formData.append("imageIndexMap", JSON.stringify(imageIndexMap));
    updateMentorApplicationMutation(formData);
  };


  return (
    <div className="flex flex-col gap-15 justify-center items-center min-h-[90vh] pb-10">
      <UserDetails profileData={profileData} />
      <div className=" w-[950px] flex flex-col gap-4">
        <div className="relative border-y-2 py-3 bg-red-500 text-white">
          <h3 className="text-xl font-semibold text-center">
            Professional Details
          </h3>
          <div
            onClick={() => setIsViewMode((prev) => !prev)}
            className="absolute top-1 right-1 border-4 bg-red-300 border-red-400 text-red-100 p-2 rounded-4xl scale-75 cursor-pointer"
          >
            {isViewMode ? <Edit /> : <Eye />}
          </div>
        </div>
        <ProfessionalDetails
          purpose="Profile"
          domains={domainsData}
          applicationDetails={{
            about,
            fee,
            images: [cv, experienceCirtificate],
            selectedDomains: domains,
            skills,
            workedAt,
          }}
          images={[cv, experienceCirtificate]}
          onSubmit={onSubmit}
          isViewMode={isViewMode}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Profile;
