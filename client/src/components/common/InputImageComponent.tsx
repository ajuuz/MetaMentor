import { Label } from "@radix-ui/react-label";
import { UploadCloud } from "lucide-react";
import { Input } from "../ui/input";

type Prop = {
  containerDivStyle: string;
  images: (null|Blob)[];
  setImages:React.Dispatch<React.SetStateAction<(null|Blob)[]>>
  labels: string[];
};
const InputImageComponent = ({ containerDivStyle, images,setImages, labels }: Prop) => {

  const handleImageChange=(e:React.ChangeEvent<HTMLInputElement>,index:number)=>{
    const file = e.target.files?e.target.files[0]:null;
    setImages(prev=>{
      const images = [...prev];
      images[index] = file;
      return images
    })
  }

  return (
    <div className={containerDivStyle}>
      {images.map((image,index) => (
        <div>
          <Label>{labels[index]}</Label>
          <div className="mt-2 p-6 border border-red-200 bg-red-50 rounded-lg text-center">
            {!image
            ?<>
              <UploadCloud className="mx-auto mb-2" />
              <p className="text-sm">
               click add image
              </p>
            </>
            :<img src={URL.createObjectURL(image)}/>
            }
            <Input type="file" accept="image/*" className="hidden" id={`imageInput-${index}`} onChange={(e)=>handleImageChange(e,index)}/>
            <Label
              htmlFor={`imageInput-${index}`} 
              className="mt-2 bg-white inline-block py-2 px-4 border-2 rounded-lg"
            >
              Add Image
            </Label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InputImageComponent;
