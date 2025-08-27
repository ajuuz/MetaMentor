//hooks
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

//components
import TableComponent from '@/components/common/TableComponent'
import AlertDialogComponent from '@/components/common/AlertDialogComponent';
import { updateStudentStatus } from '@/services/adminService.ts/studentApi'
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch"
import PaginationComponent from '@/components/common/PaginationComponent';
import { toast } from 'sonner';
import type {  TableDetailsType } from '@/types/tableDataTypes';
import { useAdminGetAllStudentsQuery } from '@/hooks/student';
import { queryClient } from '@/config/tanstackConfig/tanstackConfig';
import FilterComponent from '@/components/common/FilterComponent';
import { useSearchParams } from 'react-router-dom';


const ManageStudents = () => {

    const [students,setStudents] = useState<TableDetailsType[]>([]);
    const [totalPages,setTotalPages] = useState<number>(0)

    const [searchParams,setSearchParams]=useSearchParams();
    const [currentPage,setCurrentPage] = useState<number>(Number(searchParams.get("currentPage")) || 1)
    const [searchTerm,setSearchTerm] = useState<string>(searchParams.get("searchTerm") || "")
    const [sortBy,setSortBy] = useState<string>(searchParams.get("sortBy") || "name-asc")
    const [isPremium,setIsPremium] = useState<string[]>([searchParams.get("isPremium")||''])
    const {data:getAllStudentsResponse} = useAdminGetAllStudentsQuery(currentPage,4,sortBy,searchTerm,isPremium)

    const {mutate:updateStudentStatusMutate} = useMutation({
        mutationFn:updateStudentStatus,
        onSuccess:(response)=>{
            toast.success(response.message)
            queryClient.invalidateQueries({queryKey:['adminGetAllStudents']})
        },
        onError:(error)=>{
            toast.error(error.message);
        }
    })

    useEffect(()=>{
        if(getAllStudentsResponse){
            const {students,totalPages} = getAllStudentsResponse;
            setTotalPages(totalPages);

            const transformedDetails:TableDetailsType[]=students.map((student)=>{
                return {id:student.userId,
                    content:[
                    student.name.length>15?student.name.slice(0,15)+'...':student.name,
                    student.mobileNumber,
                    student.country,
                    0,
                    <Badge variant={student.isBlocked?'destructive':'outline'}>{student.isBlocked?"Blocked":"Active"}</Badge>,
                    <AlertDialogComponent alertTriggerer={<Switch checked={student.isBlocked}/>} alertDescription="This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers." handleClick={()=>handleStatusChange(student.userId,!student.isBlocked)}/>,
                    student.point
                ]}
            })
            setStudents(transformedDetails)
        }
    },[getAllStudentsResponse])

    useEffect(()=>{
      setSearchParams({
        currentPage: String(currentPage),
        searchTerm,
        sortBy,
        isPremium:isPremium[0]
      });
    }, [currentPage, searchTerm, sortBy,isPremium, setSearchParams]);

    const handleStatusChange=(userId:string,status:boolean)=>{
        updateStudentStatusMutate({userId,status})
    }

    const tableHeaders=["Student Name","Number","Country","Review Count","Status","Action","Point"]


    const contentForSortSelect=[{value:"name-asc",label:"Name (A → Z)"},
    {value:"name-desc",label:"Name (Z → A)"},
    {value:"createdAt-desc",label:"Newest First"},
    {value:"createdAt-asc",label:"Oldest First"}]


    const handleSelectFilter=(heading:string,value:string)=>{
      if(heading==='Premium'){
        setIsPremium([value])
      }
    }

    const contentForFilterDropdown=[
      {
        heading:'Premium',
        contents:[{label:'YES',value:'yes'},{label:'NO',value:'no'}],
        selectedData:isPremium,
        handleSelectFilter,
      }
    ]
  return (
    <div className="flex flex-col gap-5">
      {/* Filters */}
      <div className='flex justify-center'>
      <FilterComponent searchTerm={searchTerm}
       setSearchTerm={setSearchTerm} 
       sortBy={sortBy} setSortBy={setSortBy}
       setCurrentPage={setCurrentPage}
       contentForSortSelect={contentForSortSelect}
       contentForFilterDropdown={contentForFilterDropdown}
       resetFilterDropdown={()=>setIsPremium([])}
      />
      </div>

      <div className="mx-5 space-y-4">
        <TableComponent tableHeaders={tableHeaders} tableBody={students} />
        <PaginationComponent
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  )
}

export default ManageStudents
