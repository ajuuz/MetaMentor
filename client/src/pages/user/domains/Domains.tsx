import DomainCard from "@/components/user/DomainCard";
import { getDomains } from "@/services/userService.ts/domainApi";
import type { DomainType, GetAllDomainType } from "@/types/domainTypes";
import type { ApiResponseType } from "@/types/responseType";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type DomainResponse = Required<ApiResponseType<GetAllDomainType>>
const Domains = () => {

    const [domains,setDomains] = useState<Omit<DomainType,'levels'>[]>()
    const [totalpages,setTotalPages] = useState<number>(0)

    const {data:domainsResponse,isError,error}=useQuery<DomainResponse>({
        queryKey:['domains'],
        queryFn:()=>getDomains(1,10),
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
    <div className="flex justify-center pt-10 flex-1">
      {/* <div className="w-260 border">
        <div>
          <h4>Filter</h4>
        </div>
      </div> */}
      {domains?.map((domain)=>
        <DomainCard domain={domain}/>
      )}
      {/* <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalpages}/> */}
    </div>
  )
}

export default Domains
