import DomainForm from "@/components/domain/Manage/DomainForm";
import { queryClient } from "@/config/tanstackConfig/tanstackConfig";
import { useGetDomainForAdminQuery } from "@/hooks/tanstack/domain";
import { editDomain } from "@/services/adminService.ts/domainApi";
import type { AddLevel, LevelFormData } from "@/types/levelTypes";
import type { CreateDomainReq } from "@/types/request/domain";
import { useMutation } from "@tanstack/react-query";
import { isEqual } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditDomain = () => {
  const { domainId } = useParams();

  if (!domainId) {
    return <div className="text-red-500 text-center">Invalid Domain Id</div>;
  }

  const {
    data: domainData,
    isLoading,
    isError,
  } = useGetDomainForAdminQuery(domainId);

  const navigate = useNavigate();
  const { mutate: editDomainMutation, isPending: loading } = useMutation({
    mutationFn: editDomain,
    onSuccess: (response) => {
      toast.success(response.message);
      navigate("/admin/domains");
      queryClient.invalidateQueries({ queryKey: ["getDomainsForAdmin"] });
      queryClient.invalidateQueries({ queryKey: ["getDomainForAdmin"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: CreateDomainReq) => {
    const updationLevels = data.levels;
    const initialLevels = domainData?.levels;
    const newLevels: AddLevel[] = [];
    const editRequiredLevels: LevelFormData[] = [];
    updationLevels.forEach((level) => {
      const initialLevel = initialLevels?.find((l) => l._id === level._id);

      if (!initialLevel) {
        newLevels.push(level);
      } else if (!isEqual(level, initialLevel)) {
        editRequiredLevels.push(level);
      }
    });
    const formData = new FormData();

    if (domainData?.name !== data.name) formData.append("name", data.name);
    if (domainData?.description !== data.description)
      formData.append("description", data.description);
    if (domainData?.motive !== data.motive)
      formData.append("motive", data.motive);

    console.log(data.image);
    if (data.image instanceof File) formData.append("image", data.image);
    if (editRequiredLevels.length)
      formData.append("editRequiredLevels", JSON.stringify(editRequiredLevels));
    if (newLevels.length)
      formData.append("newLevels", JSON.stringify(newLevels));
    editDomainMutation({ domainId, domainDetails: formData });
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading domain data...</div>;
  }

  if (isError || !domainData) {
    return (
      <div className="text-red-500 text-center">
        Failed to load domain data.
      </div>
    );
  }

  return (
    <DomainForm
      domainData={domainData}
      onSubmit={onSubmit}
      mode="edit"
      loading={loading}
    />
  );
};

export default EditDomain;
