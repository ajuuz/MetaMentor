import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import LoadingSpinnerComponent from "@/components/common/LoadingSpinnerComponent";
import SelectComponent from "@/components/common/SelectComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { updateProfile } from "@/services/userService/userApi";

import { Edit, Eye, Image } from "lucide-react";

import countries from "world-countries";

import { toast } from "sonner";
import type { UserDetailsReq } from "@/types/request/user";
import { userDetailSchema } from "@/utils/validations/user";
import { config } from "@/config/configuration";
import type { UserDetailsRes } from "@/types/response/user";

type Props={
  profileData:UserDetailsRes
}
const UserDetails = ({profileData}:Props) => {
  const [isViewMode, setIsViewMode] = useState(true);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const countryNames = useMemo(() => countries.map((c) => c.name.common), []);

  // --------------- React Hook Form ----------------
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserDetailsReq>({
    resolver: zodResolver(userDetailSchema),
    defaultValues: {
      name: profileData.name||"",
      profileImage: profileData?.profileImage||null,
      country: profileData?.country||null,
      gender: profileData?.gender||null,
      mobileNumber:profileData?.mobileNumber|| null,
      email:profileData?.email ||"",
    },
  });


  // --------------- Mutation ----------------
  const { mutate: updateProfileMutation , isPending:loading} = useMutation({
    mutationFn: updateProfile,
    onSuccess: (response) => {
      setIsViewMode(true);
      setProfileImage(null);
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // --------------- Submit Handler ----------------
  const onSubmit = async (data: UserDetailsReq) => {
    const formData = new FormData();
    if (data.name !== profileData?.name) formData.append("name", data.name);
    if (data.mobileNumber && data.mobileNumber !== profileData?.mobileNumber) formData.append("mobileNumber", data.mobileNumber);
    if (data.country && data.country !== profileData?.country) formData.append("country", data.country);
    if (data.gender && data.gender !== profileData?.gender) formData.append("gender", data.gender);
    if (profileImage) formData.append("image", profileImage);

    updateProfileMutation(formData);
  };

  // --------------- Image Change ----------------
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setProfileImage(file);
    setValue("profileImage", file); 
  };

  return (
    <div className="flex flex-col gap-5 px-5 z-1 w-[450px] relative ">
      <div
        onClick={() => setIsViewMode((prev) => !prev)}
        className="absolute top-2 right-2 border-4 bg-red-300 border-red-400 text-red-100 p-2 rounded-4xl scale-75 cursor-pointer"
      >
        {isViewMode ? <Edit /> : <Eye />}
      </div>

      {/* Profile Header */}
      <div className="flex items-center gap-3">
        {isViewMode &&
        profileData?.profileImage &&
        typeof profileData?.profileImage === "string" ? (
          <div className="bg-black/30 border-5 text-white rounded-[50%] p-3 text-[0.6rem] relative flex justify-center font-medium">
            <img
              src={profileData.profileImage.startsWith('http')?profileData.profileImage.split('=')[0]:config.IMAGE_BASE_URL+profileData.profileImage}
              className="rounded-4xl"
              alt={`${profileData.name}'s profile pic`}
            />
          </div>
        ) : !isViewMode ? (
          <Label
            htmlFor="profilePic"
            className={`bg-black/30 border-5 text-white rounded-full  ${
              profileImage ? "p-3" : "p-6"
            } text-[0.6rem] relative flex justify-center font-medium`}
          >
            {profileImage ? (
              <img
                src={URL.createObjectURL(profileImage)}
                className="rounded-4xl"
              />
            ) : (
              <>
                <span className="absolute top-2 text-muted">upload</span>
                <Image />
                <span className="absolute bottom-2 text-muted">Image</span>
              </>
            )}
            <Input
              id="profilePic"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </Label>
        ) : (
          <div className=" bg-black text-white rounded-[50%] p-6 px-8 font-bold text-xl">
            A
          </div>
        )}
        <div
          className={`${profileData?.profileImage && "flex flex-col gap-5"}`}
        >
          <p
            className={`${
              profileData?.profileImage ? "text-3xl" : "text-4xl"
            } font-medium`}
          >
            {profileData?.name.toUpperCase()}
          </p>
          <span className="text-muted-foreground">{profileData?.email}</span>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-5"
      >
        {/* Name */}
        <div className="col-span-2 flex flex-col gap-2">
          <Label>Name</Label>
          <Input {...register("name")} disabled={isViewMode} />
          <p className="text-red-400 text-xs">{errors.name?.message}</p>
        </div>

        {/* Mobile */}
        <div className="col-span-2 flex flex-col gap-2">
          <Label>Mobile Number</Label>
          <Input type="text" {...register("mobileNumber")} disabled={isViewMode} />
          <p className="text-red-400 text-xs">{errors.mobileNumber?.message}</p>
        </div>

        {/* Country */}
        <div className="flex flex-col gap-2">
          <Label>Country</Label>
          <SelectComponent
            disabled={isViewMode}
            selectKey="country"
            placeHolder={profileData?.country??"Country"}
            handleSelectChange={(key, value) =>
              setValue(key as keyof UserDetailsReq, value)
            }
            content={countryNames}
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-2 ms-4">
          <Label>Gender</Label>
          <SelectComponent
            disabled={isViewMode}
            selectKey="gender"
            placeHolder={profileData?.gender??"Gender"}
            handleSelectChange={(key, value) =>
              setValue(key as keyof UserDetailsReq, value)
            }
            content={["male", "female", "other"]}
          />
        </div>

        {/* Submit Button */}
        {!isViewMode && (
          <Button
            type="submit"
            disabled={loading}
            className="col-span-2 cursor-pointer"
          >
            {loading ? <LoadingSpinnerComponent /> : "Update"}
          </Button>
        )}
      </form>
    </div>
  );
};

export default UserDetails;
