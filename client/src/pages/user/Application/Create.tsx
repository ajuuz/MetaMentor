"use client";

import { useGetDomainsNameAndIdQuery } from "@/hooks/tanstack/domain";
import { useGetUserDetailsQuery } from "@/hooks/tanstack/user";
import MentorDetailsManage from "@/components/mentor/application/Application";
import type { MentorApplicationFormReq } from "@/types/request/mentor";
import { mentorRegistration } from "@/services/mentorService.ts/registrationApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function CreateMentorApplication() {
  const navigate = useNavigate();
  const { data: userData , isLoading:userLoading} = useGetUserDetailsQuery();
  const { data: domainsData ,isLoading:domainsLoading} = useGetDomainsNameAndIdQuery();

  const { mutate: mentorRegisterMutation, isPending: loading } = useMutation({
    mutationFn: mentorRegistration,
    onSuccess: (response) => {
      toast.success(response.message);
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (userLoading || domainsLoading) {
    return <div>Loading...</div>;
  }
  if (!userData || !domainsData) {
    return <div>Error: Missing data</div>;
  }

  const onSubmit = (data: MentorApplicationFormReq) => {
    const formData = new FormData();
    formData.append("about", data.about);
    formData.append("fee", data.fee.toString());
    formData.append("skills", JSON.stringify(data.skills));
    formData.append("workedAt", JSON.stringify(data.workedAt));
    formData.append("domains", JSON.stringify(data.selectedDomains.map((domain)=>domain._id)));
    data.images.forEach((file) => {
      if (file) formData.append("images", file);
    });

    mentorRegisterMutation(formData);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">
        Reviewer Registration
      </h1>
      <MentorDetailsManage
        purpose="CreateApplication"
        userDetails={userData}
        domains={domainsData}
        onSubmit={onSubmit}
        loading={loading}
      />
    </div>
  );
}
