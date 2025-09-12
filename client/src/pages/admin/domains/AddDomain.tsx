import DomainForm from "@/components/domain/Manage/DomainForm";
import { queryClient } from "@/config/tanstackConfig/tanstackConfig";
import { addDomain } from "@/services/adminService.ts/domainApi";
import type { CreateDomainReq } from "@/types/request/domain";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddDomain = () => {
   const navigate=useNavigate()
      const { mutate: addDomainMutation,isPending:loading} = useMutation({
        mutationFn: addDomain,
        onSuccess: (response) => {
          toast.success(response.message);
          navigate("/admin/domains");
          queryClient.invalidateQueries({ queryKey: ["getDomainsForAdmin"] });
        },
        onError: (error: any) => {
          toast.error(error.message);
        },
      });
    
      const onSubmit = async (data: CreateDomainReq) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("motive", data.motive);
        if(data.image instanceof File) formData.append("image", data.image);
        formData.append("levels", JSON.stringify(data.levels));
        addDomainMutation(formData);
      };
    
  return (
    <DomainForm mode="create" onSubmit={onSubmit} loading={loading}/>
  )
}

export default AddDomain
