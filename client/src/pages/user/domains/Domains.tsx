import PaginationComponent from "@/components/common/PaginationComponent";
import DomainCard from "@/components/user/DomainCard";
import { useUserGetAllDomainsQuery } from "@/hooks/domain";
import type { DomainEntity } from "@/types/domainTypes";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Domains = () => {

    const [domains,setDomains] = useState<DomainEntity[]>()
    const [totalpages,setTotalPages] = useState<number>(0)
    const [currentPage,setCurrentPage] = useState<number>(1);

    const {data:allDomains,isError,error}=useUserGetAllDomainsQuery(currentPage,10)

    useEffect(()=>{
      if(allDomains){
          console.log(allDomains)
          const domains=allDomains.domains || []
          const totalPages = allDomains.totalPages;
          setTotalPages(totalPages)
          setDomains(domains)
      }
    },[allDomains])

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
