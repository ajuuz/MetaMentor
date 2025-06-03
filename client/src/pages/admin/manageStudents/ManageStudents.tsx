//hooks
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'


//types
import {type StudentDetailsType } from '@/types/admin/tableDataTypes'

//components
import TableComponent from '@/components/common/TableComponent'

const ManageStudents = () => {

    const [students,setStudents] = useState<StudentDetailsType[]>([])

    // const {mutate:studentMutate,isPending:studentFetchLoading} = useMutation({
    //     mutationFn:
    // })
    //  const fetchStudents=async():Promise<void>=>{
    //     const response
    // }


    const tableHeaders=["Student Name","Number","Review Count","Status","Action","view"]
  return (
    <div className="container mx-auto">
      <TableComponent tableHeaders={tableHeaders}/>
    </div>
  )
}

export default ManageStudents
