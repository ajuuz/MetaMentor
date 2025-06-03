import TableComponent from "@/components/common/TableComponent"
import "./manageMentors.css"

const ManageMentors = () => {

    const tableHeaders=["Mentor Name","Number","Review Count","Status","Action","view"]
  return (
    <div className="container mx-auto">
      <TableComponent tableHeaders={tableHeaders}/>
    </div>
  )
}

export default ManageMentors
