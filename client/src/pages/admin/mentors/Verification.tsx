"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingSpinnerComponent from "@/components/common/LoadingSpinnerComponent";
import { useGetMentorApplicationDetailsForAdminQuery } from "@/hooks/tanstack/mentor";
import { useNavigate, useParams } from "react-router-dom";
import UserDetails from "@/components/mentor/applicationVerification/UserDetails";
import { ProfessionalDetails } from "@/components/mentor/applicationVerification/ProfessionalDetails";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { acceptMentorApplication } from "@/services/adminService.ts/mentorApi";
import { toast } from "sonner";

const verificationSchema = z
  .object({
    status: z.enum(["accepted", "rejected"], {
      required_error: "Status is required",
    }),
    reason: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.status === "rejected") {
      if (!data.reason || data.reason.trim().length < 10) {
        ctx.addIssue({
          code: "too_small",
          minimum: 10,
          type: "string",
          inclusive: true,
          message: "Reason must be at least 10 characters when rejecting",
          path: ["reason"],
        });
      }
    }
  });

type VerificationForm = z.infer<typeof verificationSchema>;

export default function ApplicationVerification() {
  const { mentorId } = useParams();
  if (!mentorId) return <div>Mentor is not found</div>;

  const {
    data: mentorApplicationData,
    isFetching,
    isLoading,
    isError,
  } = useGetMentorApplicationDetailsForAdminQuery(mentorId);

  const [isRejecting, setIsRejecting] = useState(false);
  const navigate = useNavigate()
  const {
    mutate: mentorApplicationVerifyMutation,
    isPending: verificationLoading,
  } = useMutation({
    mutationFn: acceptMentorApplication,
    onSuccess: (response) => {
      toast.success(response.message);
      navigate("/admin/mentors");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerificationForm>({
    resolver: zodResolver(verificationSchema),
    defaultValues: { status: "accepted", reason: "" },
  });

  const onSubmit = (data: VerificationForm) => {
    mentorApplicationVerifyMutation({mentorId,email,...data})
  };

  // LOADING STATE
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinnerComponent />
      </div>
    );
  }

  // FETCHING STATE
  if (isFetching) {
    console.log("Background fetching in progress...");
  }

  // ERROR STATE
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Failed to load application details ❌
      </div>
    );
  }

  if (!mentorApplicationData) {
    return <div>No data available</div>;
  }

  const {
    name,
    email,
    country,
    gender,
    profileImage,
    mobileNumber,
    fee,
    about,
    workedAt,
    skills,
    domains,
    cv,
    experienceCirtificate,
  } = mentorApplicationData;

  const handleAccept = () => {
    setValue("status", "accepted", { shouldValidate: true });
    setValue("reason", "", { shouldValidate: true });
    handleSubmit(onSubmit)(); 
  };
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">
        Reviewer Verification
      </h1>

      <Card className="p-8 shadow-xl rounded-2xl">
        <CardContent className="space-y-8">
          {/* user details */}
          <UserDetails
            userData={{
              name,
              email,
              country,
              gender,
              profileImage,
              mobileNumber,
            }}
          />

          <ProfessionalDetails
            professionalDetails={{
              fee,
              about,
              workedAt,
              skills,
              domains,
              cv,
              experienceCirtificate,
            }}
          />

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 pt-6 border-t">
            <Button disabled={verificationLoading} onClick={handleAccept}>
              {verificationLoading ? <LoadingSpinnerComponent /> : "Accept"}
            </Button>

            <Button
              variant="destructive"
              onClick={() => {
                setIsRejecting(true);
                setValue("status", "rejected");
              }}
            >
              Reject
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reject Modal */}
      <AnimatePresence>
        {isRejecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="RejectReasonDiv fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-[70%] p-5 flex flex-col gap-4 items-center bg-white rounded-lg shadow-lg relative"
            >
              <X
                onClick={() => setIsRejecting(false)}
                strokeWidth={3}
                className="absolute right-2 top-2 bg-black text-white rounded-3xl p-1 cursor-pointer"
              />
              <Label className="text-center font-bold ">
                REASON FOR REJECTION
              </Label>
              <textarea
                {...register("reason")}
                className="border-2 bg-white w-full rounded-lg p-2"
                placeholder="Enter your reason here..."
              />
              {errors.reason && (
                <p className="text-red-500 text-sm">{errors.reason.message}</p>
              )}
              <Button disabled={verificationLoading} type="submit" className="w-full">
                {verificationLoading ? <LoadingSpinnerComponent /> : "Submit"}
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>
          <span className="font-bold text-black">
            META <span className="text-red-600">MENTOR</span>
          </span>
          <br />
          Your trusted source to find highly-vetted mentors & industry
          professionals to move your career ahead.
        </p>
        <p className="mt-4">&copy; 2025 Meta Mentor. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
