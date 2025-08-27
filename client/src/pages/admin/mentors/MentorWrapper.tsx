import AlertDialogComponent from "@/components/common/AlertDialogComponent"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { queryClient } from "@/config/tanstackConfig/tanstackConfig"
import { useGetMentorsForAdminQuery } from "@/hooks/tanstack/mentor"
import {  updateMentorStatus } from "@/services/adminService.ts/mentorApi"
import type { TableDetailsType } from "@/types/tableDataTypes"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState, type ReactNode } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "sonner"

type Prop={
    isVerified:boolean,
    children: (
        tableHeaders:string[],
        mentors: TableDetailsType[],
        currentPage: number,
        setCurrentPage:React.Dispatch<React.SetStateAction<number>>,
        totalPage: number,
        sortBy:string,
        setSortBy:React.Dispatch<React.SetStateAction<string>>,
        searchTerm:string,
        setSearchTerm:React.Dispatch<React.SetStateAction<string>>,
        selectedDomains:string[],
        setSelectedDomains:React.Dispatch<React.SetStateAction<string[]>>
    ) => ReactNode
}

const MentorWrapper = ({isVerified,children}:Prop) => {
     const [mentors,setMentors] = useState<TableDetailsType[]>([])
     const [totalPage,setTotalPages] = useState<number>(0)
     
     const [searchParams,setSearchParams]=useSearchParams();
     const [currentPage,setCurrentPage] = useState<number>(Number(searchParams.get("currentPage")) || 1);
     const [searchTerm,setSearchTerm]=useState<string>(searchParams.get("searchTerm") || "")
     const [sortBy,setSortBy]=useState<string>(searchParams.get("sortBy") || "name-asc")
     const [selectedDomains, setSelectedDomains] = useState<string[]>(searchParams.get("selectedDomains")?.split(",") || [])

      const navigate=useNavigate();
      const {data:getMentorResponse,isError}=useGetMentorsForAdminQuery(currentPage,5,isVerified,sortBy,searchTerm,selectedDomains)

      if (isError) {
        return <div>Something went Wrong</div>;
      }

      useEffect(()=>{
        if(getMentorResponse){
            const {mentors,totalPages} = getMentorResponse;
            setTotalPages(totalPages);
            const transformedDetails=mentors.map((mentor)=>{
              return {
                id:mentor.userId,
                content:[
                mentor.name,
                mentor.mobileNumber??"Unavailable",
                0,
                mentor.country,
                mentor.domains.join(', ').length>15?mentor.domains.join(', ').slice(0,15)+'...':mentor.domains.join(', '),
                mentor.skills.join(', ').length>15?mentor.skills.join(', ').slice(0,15)+'...':mentor.skills.join(', '),
                isVerified
                ?<Badge className={!mentor.isBlocked?"bg-green-700 text-white":"bg-red-700 text-white"}>{mentor.isBlocked?"BLOCKED":"ACTIVE"}</Badge>
                :<Badge>PENDING</Badge>,
                isVerified
                ?<AlertDialogComponent alertTriggerer={<Switch checked={mentor.isBlocked}/>}  alertDescription={`Are you Sure do you want to ${mentor.isBlocked?"Unblock":"Block"} the mentor?`} handleClick={()=>handleStatusChange(mentor.userId,!mentor.isBlocked)}/>
                :<Button onClick={()=>navigate(`/admin/mentors/${mentor.userId}/verify`)}>Verify</Button>
            ]}
            })
            setMentors(transformedDetails)
        }
    },[getMentorResponse])

    useEffect(()=>{
        setCurrentPage(1);
        setSortBy('name-asc')
        setSearchTerm('')
    },[isVerified])

    useEffect(()=>{
        setSearchParams({
            currentPage: String(currentPage),
            searchTerm,
            sortBy,
            selectedDomains: selectedDomains.join(","),
        });
    }, [currentPage, searchTerm, sortBy, selectedDomains, setSearchParams]);

    const {mutate:updateMentorStatusMutation}=useMutation({
        mutationFn:updateMentorStatus,
        onSuccess:(response)=>{
             toast.success(response.message);
            queryClient.invalidateQueries({ queryKey: ["getMentorsForAdmin"] });
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

      const handleStatusChange=(mentorId:string,status:boolean)=>{
        updateMentorStatusMutation({mentorId,status})
    }


    const tableHeaders=["Mentor Name","Number","Review Count","Country","Domains","Skills",isVerified?"Status":"Verification Status","Action"]

    return <>{children(tableHeaders,
        mentors,
        currentPage,
        setCurrentPage,
        totalPage,
        sortBy,
        setSortBy,
        searchTerm,
        setSearchTerm,
        selectedDomains,
        setSelectedDomains
    )}</>
}

export default MentorWrapper
