import { Select,SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type SelectComponentProps = {
  placeHolder: string;
  content: string[];
  handleSelectChange: (name:string,value: string) => void;
}


const SelectComponent = ({placeHolder,handleSelectChange,content}:SelectComponentProps) => {
  return (
    <Select onValueChange={(value)=>handleSelectChange(placeHolder,value)}>
        <SelectTrigger  className="w-[180px]">
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent>
          {
            content.map((item:string)=>(
              <SelectItem key={item} value={item}>{item}</SelectItem>
            ))
          }
        </SelectContent>
    </Select>
  )
}

export default SelectComponent
