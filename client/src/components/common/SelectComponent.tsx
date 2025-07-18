import { Select,SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type SelectComponentProps = {
  selectKey:string,
  placeHolder: string;
  content: string[];
  handleSelectChange: (name:string,value: string) => void;
  disabled:boolean
}


const SelectComponent = ({selectKey,placeHolder,handleSelectChange,content,disabled}:SelectComponentProps) => {
  console.log(selectKey)
  return (
    <Select disabled={disabled}  onValueChange={(value)=>handleSelectChange(selectKey,value)}>
        <SelectTrigger  className="w-[180px]">
          <SelectValue  placeholder={placeHolder} />
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
