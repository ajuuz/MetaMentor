import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Prop = {
    tableHeaders:string[],
    tableBody:any[]
}
const TableComponent = ({tableHeaders,tableBody}:Prop) => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader className="bg-black text-white">
        <TableRow>
          {tableHeaders.map((header)=><TableHead className="text-white border text-center">{header}</TableHead>)}
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          tableBody.map(row=>(
              <TableRow  className="text-center">
                  {row.content.map((data:any)=>(
                      <TableCell>{data}</TableCell>
                  ))}
          </TableRow>
          ))
        }
        
      </TableBody>
    </Table>
  );
};

export default TableComponent;
