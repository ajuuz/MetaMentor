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
    tableHeaders:string[]
}
const TableComponent = ({tableHeaders}:Prop) => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader className="bg-black text-white">
        <TableRow>
          {tableHeaders.map((header,index)=><TableHead className="text-white border text-center">{header}</TableHead>)}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="text-center">
          <TableCell>INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit </TableCell>
          <TableCell>$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TableComponent;
