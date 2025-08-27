import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import type { ReactNode } from "react"


type Props={
    triggerer:string|ReactNode,
    title:string,
    description:string,
    content:string
}

const ContentViewerModal = ({triggerer,title,description,content}:Props) => {
    return (
        <Dialog>
                <DialogTrigger asChild>
                    {triggerer}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-center">{title}</DialogTitle>
                        <DialogDescription>
                           Description: {description}
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <p className="whitespace-pre-line">{content}</p>
                    </div>
                </DialogContent>
        </Dialog>
    )
}

export default ContentViewerModal;