import { ModalComponent } from "@/components/common/ModalComponent"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { addDomain } from "@/services/adminService.ts/domainApi"
import type { DomainType } from "@/types/domainTypes"
import { imageUploader } from "@/utils/helperFunctions/imageUploadFunction"
import { useMutation } from "@tanstack/react-query"
import { Image, X } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { z } from "zod";


const ManageDomain = () => {
    const [domainDetails,setDomainDetails]=useState<Omit<DomainType,'_id'|'isBlocked'>>({
        name:'',
        description:"",
        motive:"",
        image:"",
        levels:[]
    })
    const [errors,setErrors] = useState<Partial<DomainType&{noOfLevel:string}>>({})
    const [prevImage,setPrevImage]=useState<File|null>(null);
    const navigate = useNavigate()

    const {mutate:addDomainMutation}=useMutation({
        mutationFn:addDomain,
        onSuccess:(response)=>{
            toast.success(response.message)
            navigate('/admin/domains')
        },
        onError:(error)=>{
            toast.error(error.message)
        }
    })

    const handleChange=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
        setDomainDetails(prev=>({...prev,[e.target.name]:e.target.value}));
    }

    const handleImageChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?e.target.files[0]:null
    setPrevImage(file)
    }

    const addLevel=({name,description,taskFile}:Record<string,string>)=>{
        setDomainDetails(prev=>({...prev,levels:[...prev.levels,{name,description,taskFile}]}))
    }

    const handleRemoveLevel=(index:number)=>{
        setDomainDetails(prev=>({...prev,levels:prev.levels.filter((_,i)=>index!==i)}))
    }

    const formSchema = z.object({
      name: z.string().trim().min(1, "Name is required"),
      description: z.string().trim().min(10, "Description must be at least 10"),
      motive: z.string().trim().min(10, "Motive must be at least 10"),
      image:z.instanceof(File).refine(file => file.size > 0,"Image file is required"),
      noOfLevel:z.number().gt(2, "Need more than 2 levels"),
    });

    const handleSubmit=async()=>{
        const {levels,image,...rest}=domainDetails;
        const result = formSchema.safeParse({...rest,image:prevImage,noOfLevel:levels.length});
        if(!result.success){
            const fieldErrors:Partial<Omit<DomainType,'levels'> & {noOfLevel:string}>={}
            result.error.errors.forEach((error)=>{
                const k = error.path[0] as keyof (Omit<DomainType,'levels'|'_id'|'isBlocked'> & {noOfLevel:string});
                fieldErrors[k]=error.message
            })

            setErrors(prev=>({...prev,...fieldErrors}));
            setTimeout(()=>{
                setErrors({})
            },3000) 
            return;
        }

        const imageUrl = await imageUploader([prevImage!])
        domainDetails.image=imageUrl[0].url
        addDomainMutation(domainDetails)
    }

  return (
    <div className="w-screen h-screen border flex p-5 gap-5">
      <div className="flex-1 flex flex-col gap-5 items-center">
            <h3 className="font-medium text-2xl">ADD DOMAIN</h3>
            <Label htmlFor="domainImage" className={`${!prevImage?"p-9 px-12":"p-4"} border-5 relative border-red-200 border-dashed bg-red-200/40 rounded-[50%] flex flex-col`}>
                {
                  !prevImage
                  ?<div>
                    <Image className="text-red-400/70" size={70}/>
                    <p className="text-red-400/70 font-medium">Add Image</p>
                    {errors?.image && <div className="bg-red-400 text-white p-3 rounded-xl absolute top-0 -right-6">{errors.image}</div>}
                    </div>
                  :<img src={URL.createObjectURL(prevImage)} className="w-30 rounded-4xl"/>
                }
                <Input className="hidden" type="file" accept="image/*" id="domainImage" onChange={handleImageChange}/>
            </Label>

            <div className="w-full">
                <Label className="font-medium text-md">Name</Label>
                <Input name="name" onChange={handleChange} placeholder="domain name.."/>
                {errors?.name && <p className="text-red-400 text-sm">{errors.name}</p>}
            </div>

            <div className="w-full">
                <Label className="font-medium text-lg">Description</Label>
                <Textarea name="description" onChange={handleChange}  placeholder="Describe about the Domain.." className="h-35"/>
                {errors?.description && <p className="text-red-400 text-sm">{errors.description}</p>}
            </div>

            <div className="w-full">
                <Label className="font-medium text-lg">why Should i Learn?</Label>
                <Textarea name="motive" onChange={handleChange} placeholder="Describe about the Domain.." className="h-35"/>
                {errors?.motive && <p className="text-red-400 text-sm">{errors.motive}</p>}
            </div>
      </div>

      <div className="flex-1 flex flex-col gap-5 items-center">
            <ModalComponent dialogTriggerer={<Button>ADD Level</Button>} dialogTitle="Add new Level" dialogDescription="you can remove the level before publishing" content={[{label:'Name',name:'name',placeHolder:"HTML AND CSS",typeOfInput:'input'},{label:'Description',name:'description',placeHolder:"Enter a short description about the level..",typeOfInput:'textArea'},{label:'TaskFile',name:'taskFile',placeHolder:"Enter task file",typeOfInput:'textArea'}]} handleApproval={addLevel}/>
            <ScrollArea className="h-4/5 w-full rounded-md border">
              <div className="p-4">
                    {
                    domainDetails.levels.map((level,index)=>
                        (<div className="flex flex-col gap-3 items-center border rounded-2xl py-2 relative">
                            <X onClick={()=>handleRemoveLevel(index)} size={30} className="absolute cursor-pointer top-0 right-0 bg-red-500 text-white p-1 scale-75 rounded-2xl"/>
                            <div className="font-medium text-2x px-4 py-2 bg-black rounded-4xl  text-white">{index+1}</div>
                            <h5 className="font-medium text-lg">{level.name}</h5>
                        </div>)
                    )
                    }
              </div>
            </ScrollArea>
            {errors?.noOfLevel && <p className="text-red-400 text-sm">{errors.noOfLevel}</p>}
            <Button onClick={handleSubmit} className="w-full">ADD DOMAIN</Button>
      </div>
    </div>
  )
}

export default ManageDomain
