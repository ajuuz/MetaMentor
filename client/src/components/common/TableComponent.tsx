import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TableDetailsType } from "@/types/tableDataTypes";
import type { ReactNode } from "react";

type Prop = {
    tableHeaders:string[],
    tableBody:TableDetailsType[]
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
              <TableRow key={row.id}  className="text-center">
                  {row.content.map((data:(number|string|ReactNode),index:number)=>(
                      <TableCell key={index}>{data}</TableCell>
                  ))}
          </TableRow>
          ))
        }
        
      </TableBody>
    </Table>
  );
};

export default TableComponent;
