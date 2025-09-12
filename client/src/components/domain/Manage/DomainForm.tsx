import LevelDialog from "@/components/admin/LevelDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import type { AddLevel, LevelFormData } from "@/types/levelTypes";
import { Circle, CircleOff, Edit, Image, Trash, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type CreateDomainReq } from "@/types/request/domain";
import { domainSchema } from "@/utils/validations/domain";
import type { GetDomainForAdminRes } from "@/types/response/domain";
import type { LevelRes } from "@/types/response/level";
import { useMutation } from "@tanstack/react-query";
import { updateLevelBlockStatus } from "@/services/adminService.ts/levelApi";
import { toast } from "sonner";
import AlertDialogComponent from "@/components/common/AlertDialogComponent";
import { queryClient } from "@/config/tanstackConfig/tanstackConfig";

type Props = {
  mode: "create" | "edit";
  onSubmit: (data: CreateDomainReq) => void;
  loading: boolean;
  domainData?: GetDomainForAdminRes & { levels: LevelRes[] };
};
const DomainForm = ({ domainData, onSubmit, mode, loading }: Props) => {
  const [prevImage, setPrevImage] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateDomainReq>({
    resolver: zodResolver(domainSchema),
    defaultValues: {
      name: domainData?.name || "",
      description: domainData?.description || "",
      motive: domainData?.motive || "",
      image: domainData?.image || undefined,
      levels: domainData?.levels || [],
    },
  });

  const { mutate: changeLevelBlockStatus } = useMutation({
    mutationFn: updateLevelBlockStatus,
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["getDomainForAdmin"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const levels = watch("levels");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setPrevImage(file);
      setValue("image", file);
    }
  };

  //add level
  const addLevel = (level: AddLevel) => {
    setValue("levels", [...levels, level]);
  };

  const handleRemoveLevel = (index: number) => {
    setValue(
      "levels",
      levels.filter((_, i) => i !== index)
    );
  };

  //edit level
  const editLevel = (updatedLevel: LevelFormData) => {
    const updatedLevels = levels.map((level) =>
      level._id === updatedLevel._id ? updatedLevel : level
    );

    setValue("levels", updatedLevels);
  };

  const handleLevelBlockStatus = (
    levelId: string | undefined,
    status: boolean
  ) => {
    if (levelId) changeLevelBlockStatus({ levelId, status });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-screen grid grid-cols-1 md:grid-cols-2 p-5 gap-5"
    >
      {/* LEFT SIDE */}
      <div className="flex-1 flex flex-col gap-5 items-center">
        <h3 className="font-medium text-2xl">{mode.toUpperCase()} DOMAIN</h3>

        {/* IMAGE UPLOAD */}
        <Label
          htmlFor="domainImage"
          className={`${
            !prevImage ? "p-9 px-12" : "p-4"
          } border-5 relative border-red-200 border-dashed bg-red-200/40 rounded-[50%] flex flex-col`}
        >
          {!prevImage ? (
            <div>
              <Image className="text-red-400/70" size={70} />
              <p className="text-red-400/70 font-medium">Add Image</p>
              {errors?.image && (
                <div className="bg-red-400 text-white p-3 rounded-xl absolute top-0 -right-6">
                  {errors.image.message?.toString()}
                </div>
              )}
            </div>
          ) : (
            <img
              src={URL.createObjectURL(prevImage)}
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
          <Input
            className="hidden"
            type="file"
            accept="image/*"
            id="domainImage"
            onChange={handleImageChange}
          />
        </Label>

        {/* NAME */}
        <div className="w-full">
          <Label className="font-medium text-md">Name</Label>
          <Input {...register("name")} placeholder="domain name.." />
          {errors?.name && (
            <p className="text-red-400 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="w-full">
          <Label className="font-medium text-lg">Description</Label>
          <Textarea
            {...register("description")}
            placeholder="Describe about the Domain.."
          />
          {errors?.description && (
            <p className="text-red-400 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* MOTIVE */}
        <div className="w-full">
          <Label className="font-medium text-lg">Why Should I Learn?</Label>
          <Textarea
            {...register("motive")}
            placeholder="Describe about the Domain.."
          />
          {errors?.motive && (
            <p className="text-red-400 text-sm">{errors.motive.message}</p>
          )}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col gap-5 items-center">
        <LevelDialog
          mode="create"
          triggerer={<Button>ADD Level</Button>}
          submitHandler={addLevel}
        />
        <ScrollArea className="h-4/5 w-full rounded-md border">
          <div className="p-4 flex flex-col gap-3">
            {levels.map((level, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 items-center border rounded-2xl py-2 relative"
              >
                {mode === "create" && (
                  <X
                    onClick={() => handleRemoveLevel(index)}
                    size={30}
                    className="absolute cursor-pointer top-0 right-0 bg-red-500 text-white p-1 scale-75 rounded-2xl"
                  />
                )}
                <div className="font-medium text-2x px-4 py-2 bg-black rounded-4xl text-white">
                  {index + 1}
                </div>
                <div className="w-full flex justify-between px-5">
                  <div>
                    <h5 className="font-semibold text-muted-foreground">
                      Level Name:{" "}
                      <span className="text-black">
                        {level.name.length > 15
                          ? level.name.slice(0, 15) + "..."
                          : level.name}
                      </span>
                    </h5>

                    <h5 className="font-semibold text-muted-foreground">
                      Description:{" "}
                      <span className="text-black">
                        {level.description.length > 15
                          ? level.description.slice(0, 15) + "..."
                          : level.description}
                      </span>
                    </h5>

                    <h5 className="font-semibold text-muted-foreground">
                      No of Tasks:{" "}
                      <span className="text-black">{level.tasks.length}</span>
                    </h5>
                  </div>
                  <div className="flex flex-col justify-center gap-4">
                    <LevelDialog
                      mode="edit"
                      triggerer={
                        <Button>
                          <Edit />
                          Edit
                        </Button>
                      }
                      submitHandler={editLevel}
                      initialData={level}
                    />
                    {mode === "create" ? (
                      <Button className="bg-red-600">
                        <Trash />
                        Remove
                      </Button>
                    ) : (
                      <div
                        className={`flex gap-2 items-center rounded-md shadow-md border-2 p-2 bg-gradient-to-r ${
                          level.isBlocked
                            ? "from-green-700 to-black"
                            : "from-red-700 to-black"
                        } text-white`}
                      >
                        {" "}
                        <AlertDialogComponent
                          alertTriggerer={
                            <div>
                              {level.isBlocked ? (
                                <div className="flex gap-2 ">
                                  <span>Tap to Unblock</span> <Circle />
                                </div>
                              ) : (
                                <div className="flex gap-2">
                                  <span>Tap to Block</span> <CircleOff />
                                </div>
                              )}
                            </div>
                          }
                          alertDescription="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
                          handleClick={() =>
                            handleLevelBlockStatus(level._id, !level.isBlocked)
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        {errors?.levels && (
          <p className="text-red-400 text-sm">
            {errors.levels.message?.toString()}
          </p>
        )}
        <Button disabled={loading} type="submit" className="w-full">
          {loading ? "Adding..." : `SUBMIT`}
        </Button>
      </div>
    </form>
  );
};

export default DomainForm;
