// import LevelDialog from "@/components/admin/LevelDialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Textarea } from "@/components/ui/textarea";
// import { addDomain } from "@/services/adminService.ts/domainApi";
// import type { AddLevel } from "@/types/levelTypes";
// import { useMutation } from "@tanstack/react-query";
// import { Image, X } from "lucide-react";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { queryClient } from "@/config/tanstackConfig/tanstackConfig";
// import { type CreateDomainReq } from "@/types/request/domain";
// import { domainSchema } from "@/utils/validations/domain";

// const ManageDomain = () => {
//   const navigate = useNavigate();
//   const [prevImage, setPrevImage] = useState<File | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//     reset,
//   } = useForm<CreateDomainReq>({
//     resolver: zodResolver(domainSchema),
//     defaultValues: {
//       name: "",
//       description: "",
//       motive: "",
//       image: undefined,
//       levels: [],
//     },
//   });

//   const levels = watch("levels");

//   const { mutate: addDomainMutation } = useMutation({
//     mutationFn: addDomain,
//     onSuccess: (response) => {
//       toast.success(response.message);
//       navigate("/admin/domains");
//       reset();
//       setPrevImage(null);
//       setIsLoading(false);
//       queryClient.invalidateQueries({ queryKey: ["getDomainsForAdmin"] });
//     },
//     onError: (error: any) => {
//       setIsLoading(false);
//       toast.error(error.message);
//     },
//   });

//   const onSubmit = async (data: CreateDomainReq) => {
//     setIsLoading(true);
//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("description", data.description);
//     formData.append("motive", data.motive);
//     formData.append("image", data.image);
//     formData.append("levels", JSON.stringify(data.levels));
//     addDomainMutation(formData);
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files ? e.target.files[0] : null;
//     if (file) {
//       setPrevImage(file);
//       setValue("image", file); 
//     }
//   };

//   const addLevel = (level: AddLevel) => {
//     setValue("levels", [...levels, level]);
//   };

//   const handleRemoveLevel = (index: number) => {
//     setValue(
//       "levels",
//       levels.filter((_, i) => i !== index)
//     );
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       className="w-screen grid grid-cols-1 md:grid-cols-2 p-5 gap-5"
//     >
//       {/* LEFT SIDE */}
//       <div className="flex-1 flex flex-col gap-5 items-center">
//         <h3 className="font-medium text-2xl">ADD DOMAIN</h3>

//         {/* IMAGE UPLOAD */}
//         <Label
//           htmlFor="domainImage"
//           className={`${
//             !prevImage ? "p-9 px-12" : "p-4"
//           } border-5 relative border-red-200 border-dashed bg-red-200/40 rounded-[50%] flex flex-col`}
//         >
//           {!prevImage ? (
//             <div>
//               <Image className="text-red-400/70" size={70} />
//               <p className="text-red-400/70 font-medium">Add Image</p>
//               {errors?.image && (
//                 <div className="bg-red-400 text-white p-3 rounded-xl absolute top-0 -right-6">
//                   {errors.image.message?.toString()}
//                 </div>
//               )}
//             </div>
//           ) : (
//             <img
//               src={URL.createObjectURL(prevImage)}
//               className="w-24 h-24 rounded-full object-cover"
//             />
//           )}
//           <Input
//             className="hidden"
//             type="file"
//             accept="image/*"
//             id="domainImage"
//             onChange={handleImageChange}
//           />
//         </Label>

//         {/* NAME */}
//         <div className="w-full">
//           <Label className="font-medium text-md">Name</Label>
//           <Input {...register("name")} placeholder="domain name.." />
//           {errors?.name && (
//             <p className="text-red-400 text-sm">{errors.name.message}</p>
//           )}
//         </div>

//         {/* DESCRIPTION */}
//         <div className="w-full">
//           <Label className="font-medium text-lg">Description</Label>
//           <Textarea
//             {...register("description")}
//             placeholder="Describe about the Domain.."
//           />
//           {errors?.description && (
//             <p className="text-red-400 text-sm">{errors.description.message}</p>
//           )}
//         </div>

//         {/* MOTIVE */}
//         <div className="w-full">
//           <Label className="font-medium text-lg">Why Should I Learn?</Label>
//           <Textarea
//             {...register("motive")}
//             placeholder="Describe about the Domain.."
//           />
//           {errors?.motive && (
//             <p className="text-red-400 text-sm">{errors.motive.message}</p>
//           )}
//         </div>
//       </div>

//       {/* RIGHT SIDE */}
//       <div className="flex-1 flex flex-col gap-5 items-center">
//         <LevelDialog addLevel={addLevel} />
//         <ScrollArea className="h-4/5 w-full rounded-md border">
//           <div className="p-4 flex flex-col gap-3">
//             {levels.map((level, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col gap-3 items-center border rounded-2xl py-2 relative"
//               >
//                 <X
//                   onClick={() => handleRemoveLevel(index)}
//                   size={30}
//                   className="absolute cursor-pointer top-0 right-0 bg-red-500 text-white p-1 scale-75 rounded-2xl"
//                 />
//                 <div className="font-medium text-2x px-4 py-2 bg-black rounded-4xl text-white">
//                   {index + 1}
//                 </div>
//                 <h5 className="font-medium text-lg">
//                   {level.name.length > 15
//                     ? level.name.slice(0, 15) + "..."
//                     : level.name}
//                 </h5>
//               </div>
//             ))}
//           </div>
//         </ScrollArea>
//         {errors?.levels && (
//           <p className="text-red-400 text-sm">
//             {errors.levels.message?.toString()}
//           </p>
//         )}
//         <Button disabled={isLoading} type="submit" className="w-full">
//           {isLoading ? "Adding..." : "ADD DOMAIN"}
//         </Button>
//       </div>
//     </form>
//   );
// };

// export default ManageDomain;
