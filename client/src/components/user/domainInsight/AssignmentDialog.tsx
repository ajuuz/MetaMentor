import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import type { TaskRes } from "@/types/response/level";

type ViewerProps = {
  tasks: TaskRes[];
  assignments: string[];
};

export const AssignmentViewer = ({ tasks, assignments }: ViewerProps) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">View Assignments</Button>
    </DialogTrigger>

    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>View Assignments</DialogTitle>
      </DialogHeader>

      <div className="space-y-4">
        <Accordion type="single" collapsible>
          {tasks.map((task, index) => (
            <AccordionItem key={task._id} value={`task-${index}`}>
              <AccordionTrigger>
                <span className="font-medium">
                  {index + 1}. {task.type.toUpperCase()} Task
                </span>
              </AccordionTrigger>

              <AccordionContent>
                <div className="mb-4">
                  <Label className="font-semibold">Question:</Label>
                  <p>{task.content}</p>
                </div>

                <div>
                  <Label className="font-semibold">Assignment:</Label>
                  <p className="p-2 bg-gray-100 rounded">
                    {assignments[index] || "No assignment provided."}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FileWarning } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { submitAssignments } from "@/services/userService/enrolledLevelApi";

// ------------------- Zod Schema -------------------
const assignmentSchema = z.object({
  assignments: z.array(z.string().trim().min(1, "Assignment cannot be empty")),
});

type AssignmentFormValues = z.infer<typeof assignmentSchema>;

// ------------------- Props -------------------
type EditorProps = {
  enrolledLevelId:string,
  tasks: TaskRes[];
  assignments: string[];
};

// ------------------- Component -------------------
export const AssignmentEditor = ({enrolledLevelId, tasks, assignments = [] }: EditorProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AssignmentFormValues>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      assignments: tasks.map((_, index) => assignments[index] || ""),
    },
  });

  const {mutate:assignmentMutation,isPending}=useMutation({
    mutationFn:submitAssignments,
    onSuccess:(response)=>{
        toast.success(response.message)
    },
    onError:(error)=>{
        toast.error(error.message)
    }
  })

  const handleSubmitForm = (data: AssignmentFormValues) => {
    const assignments = data.assignments;
    if (assignments.length < tasks.length) {
      return toast.warning("Need to complete all Assignment task to submit");
    }
    assignmentMutation({levelId:enrolledLevelId,assignments})
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Assignments</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Assignments</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleSubmitForm)} className="space-y-4">
          <Accordion type="single" collapsible>
            {tasks.map((task, index) => (
              <AccordionItem key={task._id} value={`task-${index}`}>
                <AccordionTrigger>
                  <span className="font-medium">
                    {index + 1}. {task.type.toUpperCase()} Task
                  </span>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="mb-4">
                    <Label className="font-semibold">Question:</Label>
                    <p>{task.content}</p>
                  </div>

                  <div>
                    <Label className="font-semibold">Assignment:</Label>
                    <Controller
                      name={`assignments.${index}`}
                      control={control}
                      render={({ field }) => (
                        <Textarea
                          {...field}
                          placeholder="Write your assignment answer here..."
                        />
                      )}
                    />
                    {errors.assignments?.[index] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.assignments[index]?.message}
                      </p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {errors.assignments?.length &&<div className="py-2 text-center  text-lg flex justify-center bg-blue-500 text-white">
             <FileWarning/>  "Complete all tasks to submit"
          </div>}
          <DialogFooter className="mt-4 flex justify-between">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={isPending} type="submit">{isPending?"Saving...":"Save Assignments"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
