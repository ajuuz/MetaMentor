import PaginationComponent from "@/components/common/PaginationComponent";
import DomainCard from "@/components/user/DomainCard";
import { getDomains } from "@/services/userService/domainApi";
import type { DomainType, GetAllDomainType } from "@/types/domainTypes";
import type { ApiResponseType } from "@/types/responseType";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type DomainResponse = Required<ApiResponseType<GetAllDomainType>>
const Domains = () => {

    const [domains,setDomains] = useState<Omit<DomainType,'levels'>[]>()
    const [totalpages,setTotalPages] = useState<number>(0)
    const [currentPage,setCurrentPage] = useState<number>(1);

    const {data:domainsResponse,isError,error}=useQuery<DomainResponse>({
        queryKey:['unBlockedDomains'],
        queryFn:()=>getDomains(currentPage,10),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry:false
    });

    useEffect(()=>{
      if(domainsResponse){
          const domains=domainsResponse?.data.domains || []
          const totalPages = domainsResponse?.data.totalPages;
          setTotalPages(totalPages)
          setDomains(domains)
      }
    },[domainsResponse])

    if(isError){
      toast.error(error.message)
    }
    
  return (
    <div className="flex flex-col gap-10 pt-10 flex-1">
      {/* <div className="w-260 border">
        <div>
          <h4>Filter</h4>
        </div>
      </div> */}
      <div className="flex flex-col items-center gap-9 justify-center">
        {domains?.map((domain)=>
          <DomainCard domain={domain}/>
        )}
      </div>
      <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalpages}/>
    </div>
  )
}

export default Domains
