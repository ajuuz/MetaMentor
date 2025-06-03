import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ReactNode } from "react";

type Prop={
    dropDownTriggerrer:ReactNode,
    dropDownContents:string[]
}
const DropDownMenuComponent = ({dropDownTriggerrer,dropDownContents}:Prop) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{dropDownTriggerrer}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {dropDownContents.map(content=><DropdownMenuItem>{content}</DropdownMenuItem>)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMenuComponent;
