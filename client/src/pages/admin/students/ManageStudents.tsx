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


const ManageStudents = () => {

    const [students,setStudents] = useState<TableDetailsType[]>([]);

    const [totalPages,setTotalPages] = useState<number>(0)
    const [currentPage,setCurrentPage] = useState<number>(1)

    const {data:getAllStudentsResponse} = useAdminGetAllStudentsQuery(currentPage,2)

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
                    student.name,
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

    const handleStatusChange=(userId:string,status:boolean)=>{
        updateStudentStatusMutate({userId,status})
    }

    const tableHeaders=["Student Name","Number","Country","Review Count","Status","Action","Point"]
  return (
    <div className="mx-5">
      <TableComponent tableHeaders={tableHeaders} tableBody={students}/>
      <PaginationComponent currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
    </div>
  )
}

export default ManageStudents
