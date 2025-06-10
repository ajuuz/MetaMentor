import TableComponent from "@/components/common/TableComponent"
import "./manageMentors.css"
import { useMutation } from "@tanstack/react-query"
import { getAllMentors } from "@/services/adminService.ts/mentorApi"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import type { MentorTableDetailsType } from "@/types/tableDataTypes"
import PaginationComponent from "@/components/common/PaginationComponent"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const ManageMentors = () => {

  const [mentors,setMentors] = useState<MentorTableDetailsType[]>([])
  const [currentPage,setCurrentPage] = useState<number>(1);
  const [totalPage,setTotalPages] = useState<number>(0)

  const navigate = useNavigate()

    const mentorMutaion = useMutation({
      mutationFn:getAllMentors,
      onSuccess:(response)=>{
        const {mentors,totalPages} = response.data
         const transformedDetails=mentors.map((mentor)=>{
                return {
                    id:mentor.userId,
                    content:[
                    mentor.name,
                    mentor.mobileNumber,
                    0,
                    mentor.country,
                    mentor.domains.join(' , ').length<17?`${mentor.domains.join(' , ').slice(0,17)}+...`:mentor.domains.join(' , '),
                    mentor.skills.join(' , '),
                    <Button onClick={()=>navigate(`/admin/mentors/${mentor.userId}/verify`)}>Verify</Button>
                ]}
            })
            setMentors(transformedDetails)
            setTotalPages(totalPages)
      },
      onError:(error)=>{
        toast.error(error.message)
      }
    })

    useEffect(()=>{
      mentorMutaion.mutate({currentPage:1,limit:5,isVerified:false})
    },[])

    const tableHeaders=["Mentor Name","Number","Review Count","Country","Domains","Skills","Action"]
  return (
    <div className="mx-5">
      <TableComponent tableHeaders={tableHeaders} tableBody={mentors}/>
      <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPage}/>
    </div>
  )
}

export default ManageMentors
