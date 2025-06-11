import AlertDialogComponent from "@/components/common/AlertDialogComponent"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { getAllMentors, updateMentorStatus } from "@/services/adminService.ts/mentorApi"
import type { TableDetailsType } from "@/types/tableDataTypes"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

type Prop={
    isVerified:boolean,
    children: (
        tableHeaders:string[],
        mentors: TableDetailsType[],
        currentPage: number,
        setCurrentPage:React.Dispatch<React.SetStateAction<number>>,
        totalPage: number
    ) => ReactNode
}

const ManageMentorWrapper = ({isVerified,children}:Prop) => {
     const [mentors,setMentors] = useState<TableDetailsType[]>([])
      const [currentPage,setCurrentPage] = useState<number>(1);
      const [totalPage,setTotalPages] = useState<number>(0)

    const navigate=useNavigate();

    const {mutate:updateMentorStatusMutation}=useMutation({
        mutationFn:updateMentorStatus,
        onSuccess:(response)=>{
            toast.success(response.message)
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

   const mentorMutaion = useMutation({
      mutationFn:getAllMentors,
      onSuccess:(response)=>{
        console.log(response.data)
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
                    isVerified
                    ?<Badge className={!mentor.isBlocked?"bg-green-700 text-white":"bg-red-700 text-white"}>{mentor.isBlocked?"BLOCKED":"ACTIVE"}</Badge>
                    :<Badge>PENDING</Badge>,
                    isVerified
                    ?<AlertDialogComponent alertTriggerer={<Switch checked={mentor.isBlocked}/>}  alertDescription={`Are you Sure do you want to ${mentor.isBlocked?"Unblock":"Block"} the mentor?`} handleClick={()=>handleStatusChange(mentor.userId,!mentor.isBlocked)}/>
                    :<Button onClick={()=>navigate(`/admin/mentors/${mentor.userId}/verify`)}>Verify</Button>
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
      mentorMutaion.mutate({currentPage:1,limit:5,isVerified})
    },[isVerified])

      const handleStatusChange=(mentorId:string,status:boolean)=>{
        updateMentorStatusMutation({mentorId,status})
         setMentors((prev)=>{
            const mentors=[...prev];
            const mentor = mentors.find(mentor=>mentor.id===mentorId);

            if(!mentor) return mentors;

            mentor.content[6]=<Badge className={!status?"bg-green-700 text-white":"bg-red-700 text-white"}>{status?"BLOCKED":"ACTIVE"}</Badge>
            mentor.content[7]=<AlertDialogComponent alertTriggerer={<Switch checked={status}/>} alertDescription={`Are you Sure do you want to ${status?"Block":"Unblock"} the mentor?`} handleClick={()=>handleStatusChange(mentor.id,!status)}/>
            return mentors;
        })
    }


        const tableHeaders=["Mentor Name","Number","Review Count","Country","Domains","Skills",isVerified?"Status":"Verification Status","Action"]

    return <>{children(tableHeaders,mentors,currentPage,setCurrentPage,totalPage)}</>
}

export default ManageMentorWrapper
