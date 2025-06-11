//hooks
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'


//types
// import {type StudentDetailsType } from '@/types/tableDataTypes'

//components
import TableComponent from '@/components/common/TableComponent'
import AlertDialogComponent from '@/components/common/AlertDialogComponent';
import { getAllStudents, updateStudentStatus } from '@/services/adminService.ts/studentApi'
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch"
import PaginationComponent from '@/components/common/PaginationComponent';
import { toast } from 'sonner';
import type {  TableDetailsType } from '@/types/tableDataTypes';


const ManageStudents = () => {

    const [students,setStudents] = useState<TableDetailsType[]>([]);

    const [totalPages,setTotalPages] = useState<number>(0)
    const [currentPage,setCurrentPage] = useState<number>(1)


    const {mutate:updateStudentStatusMutate} = useMutation({
        mutationFn:updateStudentStatus,
        onSuccess:(response)=>{
            toast.success(response.message)
        },
        onError:(error)=>{
            toast.error(error.message);
        }
    })

    const {mutate:studentMutate} = useMutation({
        mutationFn:getAllStudents,
        onSuccess:(response)=>{
            const {students,totalPages} = response.data;
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
        },
        onError:(error)=>{
            console.log(error.message)
        }
    })



    useEffect(()=>{
        studentMutate({currentPage:1,limit:5})
       
    },[])
    
    const handleStatusChange=(userId:string,status:boolean)=>{
        updateStudentStatusMutate({userId,status})
         setStudents((prev)=>{
            const students=[...prev];
            const student = students.find(student=>student.id===userId);

            if(!student) return students;

            student.content[4]=<Badge variant={status?'destructive':'outline'}>{status?"Blocked":"Active"}</Badge>
            student.content[5]=<AlertDialogComponent alertTriggerer={<Switch checked={status}/>} alertDescription="This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers." handleClick={()=>handleStatusChange(student.id,!status)}/>
            return students;
        })
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
