import TableComponent from "@/components/common/TableComponent"
import type { MentorTableDetailsType } from "@/types/tableDataTypes"
import PaginationComponent from "@/components/common/PaginationComponent"

type Prop={
  tableHeaders:string[]
  mentors: MentorTableDetailsType[],
  currentPage: number,
  setCurrentPage:React.Dispatch<React.SetStateAction<number>>,
  totalPage: number
}
const Mentors = ({tableHeaders,mentors,currentPage,setCurrentPage,totalPage}:Prop) => {

  return (
    <div className="mx-5">
      <TableComponent   tableHeaders={tableHeaders} tableBody={mentors}/>
      <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPage}/>
    </div>
  )
}

export default Mentors
