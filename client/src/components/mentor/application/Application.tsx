import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import InputImageComponent from "@/components/common/InputImageComponent";
import LoadingSpinnerComponent from "@/components/common/LoadingSpinnerComponent";
import type { DomainEntity } from "@/types/domainTypes";
import type { UserDetailsType } from "@/types/userType";
import type { MentorApplicationFormReq } from "@/types/request/mentor";
import { mentorApplicationFormSchema } from "@/utils/validations/mentor";
import { config } from "@/config/configuration";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type MentorFormProps = {
  purpose: "CreateApplication" | "EditApplication" | "Profile";
  userDetails: Omit<UserDetailsType, "role" | "isVerified" | "_id">;
  domains: Pick<DomainEntity, "_id" | "name" | "image">[];
  applicationDetails?: Partial<MentorApplicationFormReq>; // For editing
  images?: string[]; // For editing
  onSubmit: (values: MentorApplicationFormReq) => void;
  loading?: boolean;
};

export default function MentorForm({
  purpose,
  userDetails,
  domains: initialDomains,
  applicationDetails,
  images,
  onSubmit,
  loading = false,
}: MentorFormProps) {
  const [skillInput, setSkillInput] = useState("");
  const [companyInput, setCompanyInput] = useState("");
  const [editMode, setEditMode] = useState<boolean>(false);
  const [availableDomains, setAvailableDomains] = useState<
    Pick<DomainEntity, "_id" | "name" | "image">[]
  >(
    initialDomains.filter((d) => {
      const isPresent = (applicationDetails?.selectedDomains || []).some(
        (sel) => sel._id === d._id
      );
      if (!isPresent) return d;
    })
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<MentorApplicationFormReq>({
    resolver: zodResolver(mentorApplicationFormSchema),
    defaultValues: {
      about: applicationDetails?.about || "",
      fee: applicationDetails?.fee || 0,
      skills: applicationDetails?.skills || [],
      workedAt: applicationDetails?.workedAt || [],
      selectedDomains: applicationDetails?.selectedDomains || [],
      images: applicationDetails?.images || [null, null],
    },
  });

  const watchedSelectedDomains = watch("selectedDomains");
  const watchedSkills = watch("skills");
  const watchedWorkedAt = watch("workedAt");
  const watchedImages = watch("images");

  // ------------------ Domains ------------------
  const handleSelectDomain = (index: number) => {
    const domain = availableDomains[index];
    setValue("selectedDomains", [...watchedSelectedDomains, domain], {
      shouldValidate: true,
    });
    setAvailableDomains((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveDomain = (index: number) => {
    const domainObj = watchedSelectedDomains[index];
    if (!domainObj) return;
    setAvailableDomains((prev) => [...prev, domainObj]);
    setValue(
      "selectedDomains",
      watchedSelectedDomains.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  // ------------------ Skills ------------------
  const handleAddSkill = () => {
    const skill = skillInput.trim();
    if (!skill || watchedSkills.includes(skill)) return;
    setValue("skills", [...watchedSkills, skill], { shouldValidate: true });
    setSkillInput("");
  };

  const handleRemoveSkill = (index: number) => {
    setValue(
      "skills",
      watchedSkills.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  // ------------------ Worked At ------------------
  const handleAddCompany = () => {
    const company = companyInput.trim();
    if (!company || watchedWorkedAt.includes(company)) return;
    setValue("workedAt", [...watchedWorkedAt, company], {
      shouldValidate: true,
    });
    setCompanyInput("");
  };

  const handleRemoveCompany = (index: number) => {
    setValue(
      "workedAt",
      watchedWorkedAt.filter((_, i) => i !== index),
      { shouldValidate: true }
    );
  };

  // ------------------ Images ------------------
  const handleImageChange = (file: File | null, index: number) => {
    const newImages = [...watchedImages];
    newImages[index] = file;
    setValue("images", newImages, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-6">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Info (immutable) */}
          <div className="flex flex-col gap-1">
            <Label>Name</Label>
            <Input value={userDetails.name} disabled />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Email</Label>
            <Input value={userDetails.email} disabled />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Country</Label>
            <Input value={userDetails.country || "N/A"} disabled />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Gender</Label>
            <Input value={userDetails.gender || "N/A"} disabled />
          </div>

          {/* Domains */}
          <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
            <Label>Available Domains</Label>
            <div className="flex flex-wrap gap-2 border p-2">
              {availableDomains.map((d, i) => (
                <Tooltip>
                  <TooltipTrigger>
                    <img
                      key={d._id}
                      onClick={() => handleSelectDomain(i)}
                      src={config.IMAGE_BASE_URL + d.image}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{d.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
            <Label>Selected Domains</Label>
            <div className="flex flex-wrap gap-2 border p-2">
              {watchedSelectedDomains.map((domain, i) => {
                return (
                  <div key={domain._id} className="relative px-2 py-1 rounded">
                    <Tooltip>
                      <TooltipTrigger>
                        <img
                          key={domain._id}
                          src={config.IMAGE_BASE_URL + domain.image}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{domain.name}</p>
                      </TooltipContent>
                    </Tooltip>

                    <X
                      className="absolute  rounded-full   bg-red-600 top-2 right-2 cursor-pointer text-white p-1"
                      onClick={() => handleRemoveDomain(i)}
                    />
                  </div>
                );
              })}
            </div>
            {errors.selectedDomains && (
              <p className="text-red-500">{errors.selectedDomains.message}</p>
            )}
          </div>

          {/* About */}
          <div className="col-span-2 flex flex-col gap-1">
            <Label>About</Label>
            <Textarea {...register("about")} rows={4} />
            {errors.about && (
              <p className="text-red-500">{errors.about.message}</p>
            )}
          </div>

          {/* Worked At */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
            <Label>Worked At</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add company"
                value={companyInput}
                onChange={(e) => setCompanyInput(e.target.value)}
              />
              <Button type="button" onClick={handleAddCompany}>
                Add
              </Button>
            </div>
            <Controller
              control={control}
              name="workedAt"
              render={({ field }) => (
                <div className="flex flex-col gap-2 mt-2">
                  {field.value.map((company, i) => (
                    <div key={i} className="relative border px-2 py-1 rounded">
                      {company}
                      <X
                        className="absolute  rounded-full   bg-red-600 -top-2 -right-2 cursor-pointer text-white p-1"
                        onClick={() => handleRemoveCompany(i)}
                      />
                    </div>
                  ))}
                </div>
              )}
            />
            {errors.workedAt && (
              <p className="text-red-500">{errors.workedAt.message}</p>
            )}
          </div>

          {/* Skills */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
            <Label>Skills</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add skill"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
              />
              <Button type="button" onClick={handleAddSkill}>
                Add
              </Button>
            </div>
            <Controller
              control={control}
              name="skills"
              render={({ field }) => (
                <div className="flex flex-col gap-2 mt-2">
                  {field.value.map((skill, i) => (
                    <div key={i} className="relative border px-2 py-1 rounded">
                      {skill}
                      <X
                        className="absolute  rounded-full   bg-red-600 -top-2 -right-2 cursor-pointer text-white p-1"
                        onClick={() => handleRemoveSkill(i)}
                      />
                    </div>
                  ))}
                </div>
              )}
            />
            {errors.skills && (
              <p className="text-red-500">{errors.skills.message}</p>
            )}
          </div>

          {/* Fee */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-1">
            <Label>Fee</Label>
            <Input
              {...register("fee", { valueAsNumber: true })}
              type="number"
            />
            {errors.fee && <p className="text-red-500">{errors.fee.message}</p>}
          </div>

          {/* Images */}
          <div className="col-span-2 space-y-4">
            {purpose !== "CreateApplication" && !editMode && images ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex flex-col gap-2">
                  <Label>CV</Label>
                  <div className="flex flex-col gap-2">
                    <img src={config.IMAGE_BASE_URL + images[0]} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Verification Certificate</Label>
                  <div className="flex flex-col gap-2">
                    <img src={config.IMAGE_BASE_URL + images[1]} />
                  </div>
                </div>
              </div>
            ) : (
              <Controller
                control={control}
                name="images"
                render={() => (
                  <div>
                    <InputImageComponent
                      containerDivStyle="grid grid-cols-1 md:grid-cols-2 gap-4"
                      images={watchedImages}
                      handleImageChange={handleImageChange}
                      labels={["Change CV", "Change Experience Cirtificate"]}
                    />
                    {errors.images && (
                      <p className="text-red-500">{errors.images.message}</p>
                    )}
                  </div>
                )}
              />
            )}
            {purpose !== "CreateApplication" && (
              <Button
                type="button"
                variant="outline"
                className="w-full "
                onClick={() => setEditMode((prev) => !prev)}
              >
                {editMode ? "Back" : "Change CV"}
              </Button>
            )}
          </div>
        </CardContent>

        <Button type="submit" disabled={loading} className="mt-4">
          {loading ? <LoadingSpinnerComponent /> : "Submit"}
        </Button>
      </Card>
    </form>
  );
}
