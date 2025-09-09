import TableComponent from "@/components/common/TableComponent"
import type { MentorTableDetailsType } from "@/types/tableDataTypes"
import PaginationComponent from "@/components/common/PaginationComponent"
import FilterComponent from "@/components/common/FilterComponent"
import { useQuery } from "@tanstack/react-query"
import { getDomainsNameAndId } from "@/services/mentorService.ts/registrationApi"
import { useMemo } from "react"

type Prop={
  tableHeaders:string[]
  mentors: MentorTableDetailsType[],
  currentPage: number,
  setCurrentPage:React.Dispatch<React.SetStateAction<number>>,
  limit: number,
  setLimit:React.Dispatch<React.SetStateAction<number>>,
  totalPage: number
  sortBy:string
  setSortBy:React.Dispatch<React.SetStateAction<string>>
  searchTerm:string
  setSearchTerm:React.Dispatch<React.SetStateAction<string>>,
  selectedDomains:string[],
  setSelectedDomains:React.Dispatch<React.SetStateAction<string[]>>
  h1Content:string
}
const Mentors = ({tableHeaders,
  mentors,
  currentPage,
  setCurrentPage,
  limit,
  setLimit,
  totalPage,
  sortBy,
  setSortBy,
  searchTerm,
  setSearchTerm,
  selectedDomains,
  setSelectedDomains,
  h1Content
}:Prop) => {
  
  const { data: domains } = useQuery({
    queryKey: ["domains-name-id"],
    queryFn: getDomainsNameAndId,
  })

  const availableDomains = useMemo(() => {
   return domains ? domains.map((domain)=>{
      return{
        value:domain._id,
        label:domain.name
      }
    }) : []
  }, [domains])

  function handleSelectFilter(heading:string,value:string){
    if(heading==='Domains'){
      setSelectedDomains((prev)=>{
        if(prev.includes(value)){
          return prev.filter((item)=>item!==value)
        }else{
          return [...prev,value]
        }
      })
    }
  }
  
  const contentForFilterDropdown=[
    {
      heading:'Domains',
      contents:availableDomains,
      selectedData:selectedDomains,
      handleSelectFilter:handleSelectFilter,
    }
  ]


  const contentForSortSelect=[{value:"name-asc",label:"Name (A → Z)"},
    {value:"name-desc",label:"Name (Z → A)"},
    {value:"createdAt-desc",label:"Newest First"},
    {value:"createdAt-asc",label:"Oldest First"}]

  
  return (
    <div className="flex flex-col gap-5">
       <h1 className="text-center font-medium text-2xl bg-gradient-to-r from-red-600 to-black text-transparent bg-clip-text">{h1Content}</h1>
    {/* Filters */}
    <div className='flex justify-center'>
    <FilterComponent searchTerm={searchTerm} 
    setSearchTerm={setSearchTerm} 
    sortBy={sortBy} 
    setSortBy={setSortBy} 
    setCurrentPage={setCurrentPage}
    limit={limit}
    setLimit={setLimit}
    contentForSortSelect={contentForSortSelect}
    contentForFilterDropdown={contentForFilterDropdown}
    resetFilterDropdown={()=>setSelectedDomains([])}
    />
    </div>

    <div className="mx-5 space-y-4">
      <TableComponent tableHeaders={tableHeaders} tableBody={mentors} />
      <PaginationComponent
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPage}
      />
    </div>
  </div>
  )
}

export default Mentors
