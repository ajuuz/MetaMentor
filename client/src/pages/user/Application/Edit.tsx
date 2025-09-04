import { useGetDomainsNameAndIdQuery } from "@/hooks/tanstack/domain";
import MentorDetailsManage from "@/components/mentor/application/Application";
import type { MentorApplicationFormReq } from "@/types/request/mentor";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useGetMentorApplicationDetailsQuery } from "@/hooks/tanstack/mentor";
import { updateMentorAplication } from "@/services/userService/mentorApi";

export default function EditMentorApplication() {
  const navigate = useNavigate();
  const { data: applicationData } = useGetMentorApplicationDetailsQuery();
  const { data: domainsData } = useGetDomainsNameAndIdQuery();

  const { mutate: updateMentorApplicationMutation, isPending: loading } = useMutation({
    mutationFn: updateMentorAplication,
    onSuccess: (response) => {
      toast.success(response.message);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (!applicationData || !domainsData) return <div>Loading...</div>;
  const {
    name,
    about,
    mobileNumber,
    country,
    email,
    profileImage,
    cv,
    experienceCirtificate,
    domains,
    fee,
    gender,
    skills,
    workedAt,
  } = applicationData;

  const onSubmit = (data: MentorApplicationFormReq) => {
    const formData = new FormData();
    if (data.about !== about) formData.append("about", data.about);

    if (data.fee !== fee) formData.append("fee", data.fee.toString());
    
    if (JSON.stringify(data.skills) !== JSON.stringify(skills))
      formData.append("skills", JSON.stringify(data.skills));

    if (JSON.stringify(data.workedAt) !== JSON.stringify(workedAt))
      formData.append("workedAt", JSON.stringify(data.workedAt));

    console.log(data.selectedDomains,domains);
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
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">
        Reviewer Registration
      </h1>
      <MentorDetailsManage
        purpose="EditApplication"
        userDetails={{
          name,
          country,
          mobileNumber,
          email,
          gender,
          profileImage,
        }}
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
        loading={loading}
      />
    </div>
  );
}
