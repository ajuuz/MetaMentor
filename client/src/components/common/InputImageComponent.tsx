import { Label } from "@radix-ui/react-label";
import { UploadCloud } from "lucide-react";
import { Input } from "../ui/input";
import { config } from "@/config/configuration";

type Prop = {
  containerDivStyle: string;
  images: (string | File | null)[];
  handleImageChange: (file: File | null, index: number) => void;
  labels: string[];
};
const InputImageComponent = ({
  containerDivStyle,
  images,
  handleImageChange,
  labels,
}: Prop) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    handleImageChange(file, index);
  };

  return (
    <div className={containerDivStyle}>
      {images.map((image, index) => (
        <div>
          <Label>{labels[index]}</Label>
          <div className="mt-2 p-6 border border-red-200 bg-red-50 rounded-lg text-center">
            {image ? (
              <img className="max-h-100 w-full" src={image instanceof File?URL.createObjectURL(image):config.IMAGE_BASE_URL+image} />
            ) : (
              <>
                <UploadCloud className="mx-auto mb-2" />
                <p className="text-sm">click add image</p>
              </>
            )}
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              id={`imageInput-${index}`}
              onChange={(e) => handleChange(e, index)}
            />
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
