import AlertDialogComponent from "@/components/common/AlertDialogComponent";
import PaginationComponent from "@/components/common/PaginationComponent";
import TableComponent from "@/components/common/TableComponent";
import { Switch } from "@/components/ui/switch";
import { queryClient } from "@/config/tanstackConfig/tanstackConfig";
import { useAdminGetAllDomainsQuery } from "@/hooks/domain";
import {  updateDomainStatus } from "@/services/adminService.ts/domainApi";
import type{ TableDetailsType } from "@/types/tableDataTypes"
import { useMutation } from "@tanstack/react-query";
import { useEffect,useState} from "react"
import { toast } from "sonner";

const Domains = () => {
    const [domains,setDomains] = useState<TableDetailsType[]>([]);
    const [currentPage,setCurrentPage]=useState<number>(1);
    const [totalPages,setTotalPages]=useState<number>(0);

    const {data:domainsResponse,isError}=useAdminGetAllDomainsQuery(currentPage,10)

     if(isError){
        <div>Something went Wrong</div>
    }

    useEffect(()=>{
        if(domainsResponse){
            const transformedDetails=domainsResponse.domains.map(domain=>{
                return {
                    id:domain._id,
                    content:[
                        domain.name,
                        <div className="flex justify-center w-full">
                            <img className="w-30 rounded-2xl" src={domain.image}/>
                        </div>,
                        domain.description,
                        domain.motive,
                        <AlertDialogComponent alertTriggerer={<Switch checked={domain.isBlocked}/>} alertDescription="This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers." handleClick={()=>handleStatusChange(domain._id,!domain.isBlocked)}/>
                    ]
                }
            })
            setDomains(transformedDetails)
            setTotalPages(domainsResponse.totalPages)
        }
    },[domainsResponse])

    const {mutate:updateStatusMutation}=useMutation({
        mutationFn:updateDomainStatus,
        onSuccess:(response)=>{
            toast.success(response.message)
             queryClient.invalidateQueries({queryKey:['adminGetAllDomains']})
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    function handleStatusChange(domainId:string,status:boolean){
        updateStatusMutation({domainId,status})
    }

    const headers=['name','image','description','motive','status']
  return (
    <div className="mx-5">
        <TableComponent tableHeaders={headers} tableBody={domains}/>
        <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </div>
  )
}

export default Domains
