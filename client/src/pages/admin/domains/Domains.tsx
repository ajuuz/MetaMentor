import AlertDialogComponent from "@/components/common/AlertDialogComponent";
import TableComponent from "@/components/common/TableComponent";
import { Switch } from "@/components/ui/switch";
import { queryClient } from "@/config/tanstackConfig/tanstackConfig";
import { getDomains, updateDomainStatus } from "@/services/adminService.ts/domainApi";
import type { GetAllDomainType } from "@/types/domainTypes";
import type { ApiResponseType } from "@/types/responseType";
import type{ TableDetailsType } from "@/types/tableDataTypes"
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect,useState} from "react"
import { toast } from "sonner";

type DomainResponse = Required<ApiResponseType<GetAllDomainType>>;
const Domains = () => {
    const [domains,setDomains] = useState<TableDetailsType[]>([]);

    const {data:domainsResponse,isError,error}=useQuery<DomainResponse>({
        queryKey:['domains'],
        queryFn:()=>getDomains(1,10),
        staleTime:1000*60*5,
        refetchOnWindowFocus: false,
        retry:false
    });

    const {mutate:updateStatusMutation}=useMutation({
        mutationFn:updateDomainStatus,
        onSuccess:(response)=>{
            toast.success(response.message)
             queryClient.invalidateQueries({queryKey:['domains']})
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    useEffect(()=>{
        if(domainsResponse){
            const transformedDetails=domainsResponse?.data.domains.map(domain=>{
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
        }
    },[domainsResponse])

    if(isError){
        toast.error(error.message)
    }


    function handleStatusChange(domainId:string,status:boolean){
        updateStatusMutation({domainId,status})
    }

    const headers=['name','image','description','motive','status']
  return (
    <div className="mx-5">
        <TableComponent tableHeaders={headers} tableBody={domains}/>
    </div>
  )
}

export default Domains
