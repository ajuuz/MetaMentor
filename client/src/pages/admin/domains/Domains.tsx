import AlertDialogComponent from "@/components/common/AlertDialogComponent";
import FilterComponent from "@/components/common/FilterComponent";
import PaginationComponent from "@/components/common/PaginationComponent";
import TableComponent from "@/components/common/TableComponent";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { queryClient } from "@/config/tanstackConfig/tanstackConfig";
import { useAdminGetAllDomainsQuery } from "@/hooks/domain";
import { updateDomainStatus } from "@/services/adminService.ts/domainApi";
import type { TableDetailsType } from "@/types/tableDataTypes";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const Domains = () => {
  const [domains, setDomains] = useState<TableDetailsType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  
  const [searchParams,setSearchParams]=useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get("currentPage")) || 1);
  const [searchTerm, setSearchTerm] = useState<string>(searchParams.get("searchTerm") || "");
  const [sortBy, setSortBy] = useState<string>(searchParams.get("sortBy") || "name-asc");

  const navigate = useNavigate()
  const { data: domainsResponse, isError } = useAdminGetAllDomainsQuery(
    currentPage,
    10,
    sortBy,
    searchTerm,
  );

  if (isError) {
    return <div>Something went Wrong</div>;
  }

  useEffect(() => {
    if (domainsResponse) {
      const transformedDetails = domainsResponse.domains.map((domain) => {
        return {
          id: domain._id,
          content: [
            domain.name.length>15?domain.name.slice(0,15)+'...':domain.name,
            <div className="flex justify-center w-full">
              <img className="w-30 rounded-2xl" src={domain.image} />
            </div>,
            domain.description.length>15?domain.description.slice(0,15)+'...':domain.description,
            domain.motive.length>15?domain.motive.slice(0,15)+'...':domain.motive,
            <AlertDialogComponent
              alertTriggerer={<Switch checked={domain.isBlocked} />}
              alertDescription="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
              handleClick={() =>
                handleStatusChange(domain._id, !domain.isBlocked)
              }
            />,
          ],
        };
      });
      setDomains(transformedDetails);
      setTotalPages(domainsResponse.totalPages);
    }
  }, [domainsResponse]);

  const { mutate: updateStatusMutation } = useMutation({
    mutationFn: updateDomainStatus,
    onSuccess: (response) => {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["adminGetAllDomains"] });
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  useEffect(()=>{
    setSearchParams({
      currentPage: String(currentPage),
      searchTerm,
      sortBy,
    });
  }, [currentPage, searchTerm, sortBy, setSearchParams]);

  function handleStatusChange(domainId: string, status: boolean) {
    updateStatusMutation({ domainId, status });
  }

  const headers = ["name", "image", "description", "motive", "status"];

  const contentForSortSelect=[{value:"name-asc",label:"Name (A → Z)"},
    {value:"name-desc",label:"Name (Z → A)"},
    {value:"createdAt-desc",label:"Newest First"},
    {value:"createdAt-asc",label:"Oldest First"}]
    
  return (
    <div className="flex flex-col gap-5">
      {/* Filters */}
      <div className='flex justify-between gap-10 px-5'>
        <div className="flex-6">
          <FilterComponent searchTerm={searchTerm}
           setSearchTerm={setSearchTerm}
           sortBy={sortBy}
           setSortBy={setSortBy}
           contentForSortSelect={contentForSortSelect}
           setCurrentPage={setCurrentPage}/>
       </div>
        <div className="flex-1 flex items-center justify-center">
          <Button onClick={()=>navigate('/admin/domains/add')}>Add Domain</Button>
        </div>
      </div>

      <div className="mx-5 space-y-4">
        <TableComponent tableHeaders={headers} tableBody={domains} />
        <PaginationComponent
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>

  );
};

export default Domains;
