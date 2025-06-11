import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type React from "react";


type Prop={
    currentPage:number,
    totalPages:number,
    setCurrentPage:React.Dispatch<React.SetStateAction<number>>
}

const PaginationComponent = ({currentPage,totalPages,setCurrentPage}:Prop) => {

    const handlePreviousClick=()=>{
      if(currentPage===1) return;
      setCurrentPage(prev=>prev-1)
    }

    const handleNextClick=()=>{
      if(currentPage===totalPages) return
      setCurrentPage(prev=>prev+1)
    }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={handlePreviousClick}/>
        </PaginationItem>

            {Array(totalPages).fill(null).map((_,index)=>(
        <PaginationItem key={index+1}>
                <PaginationLink onClick={()=>setCurrentPage(index+1)} isActive={index+1 === currentPage}>{index+1}</PaginationLink>
        </PaginationItem>
            ))}
        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}

        <PaginationItem>
          <PaginationNext onClick={handleNextClick}/>
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
