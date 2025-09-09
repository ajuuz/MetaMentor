import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TableDetailsType } from "@/types/tableDataTypes";
import type { ReactNode } from "react";

type Prop = {
  tableHeaders: string[];
  tableBody: TableDetailsType[];
};
const TableComponent = ({ tableHeaders, tableBody }: Prop) => {
  return (
    <Table className="min-w-full text-white rounded-lg overflow-hidden">
      <TableHeader>
        <TableRow className="border-4">
          {tableHeaders.map((header) => (
            <TableHead
              key={header}
              className="text-center py-3 px-4 font-bold border-4"
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody className="border-4">
        {tableBody.map((row, rowIndex) => (
          <TableRow
            key={row.id}
            className={`text-center ${
              rowIndex % 6 === 0
                ? "bg-gray-100 text-black"
                : rowIndex % 6 === 1
                ? "bg-gray-300 text-black"
                : rowIndex % 6 === 2
                ? "bg-gray-500 text-black"
                : rowIndex % 6 === 3
                ? "bg-gray-700 text-white"
                : rowIndex % 6 === 4
                ? "bg-gray-800 text-white"
                : "bg-black text-white"
            }`}
          >
            {row.content.map(
              (data: number | string | ReactNode, index: number) => (
                <TableCell key={index} className="py-2 px-4 border-4">
                  {data}
                </TableCell>
              )
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableComponent;
