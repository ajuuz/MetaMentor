import { useState, type ReactNode } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"

type Props={
    dialogTriggerer:ReactNode,
    dialogTitle:string,
    dialogDescription:string,
    content:{label:string,name:string,typeOfInput:string,placeHolder:string}[]
    handleApproval:(data:Record<string,string>)=>void
}

export function ModalComponent({dialogTriggerer,dialogTitle,dialogDescription,content,handleApproval}:Props) {

    const [errors,setErrors]=useState<Record<string,string>>({});
    const [open,setOpen]=useState<boolean>(false)

    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(
          Array.from(formData.entries()).map(([key, value]) => [
            key,
            typeof value === "string" ? value : "",
          ])
        ) as Record<string, string>;

        let isError=false;
        for(let i in data){
            const value = data[i]
            if(typeof value==='string' && !value.trim()){
                setErrors(prev=>({...prev,[i]:"cannot be empty"}))
                isError=true;
            }
        }
        if(isError){
            setTimeout(()=>{
                setErrors({})
            },3000)
            return
        };
        
        handleApproval(data)
        setOpen(false)
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {dialogTriggerer}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription className="mb-4">
             {dialogDescription}
            </DialogDescription>
          </DialogHeader>
                <div className="grid gap-4">
                  {content.map((item)=>(
                      <div key={item.label} className="grid gap-2">
                        <Label onClick={()=>console.log(errors)} htmlFor={item.label}>{item.label}</Label>
                        {item.typeOfInput==='textArea'
                        ?<Textarea id={item.label} name={item.name} placeholder={item.placeHolder}/>
                        :<Input id={item.label} name={item.name} placeholder={item.placeHolder}/>
                        }
                        {errors[item.name] && <p className="text-red-400 text-sm">{errors[item.name]}</p>}
                      </div>
                  ))}
                </div>

          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button onClick={()=>setOpen(false)} variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>

        </form>
        </DialogContent>
    </Dialog>
  )
}
