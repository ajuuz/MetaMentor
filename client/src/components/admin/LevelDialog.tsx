import { Label } from "@radix-ui/react-label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { LEVEL_TASK_TYPE } from "@/utils/constants";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AddLevel } from "@/types/levelTypes";
import { levelSchema, type CreateLevelReq } from "@/types/request/level";


type Props={
    addLevel: (level: AddLevel) => void
}
const LevelDialog = ({addLevel}: Props) => {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"details" | "tasks">("details");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<CreateLevelReq>({
    resolver: zodResolver(levelSchema),
    defaultValues: {
      name: "",
      description: "",
      taskFile: "",
      tasks: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  const handleAddTask = () => {
    if (fields.length >= 3) {
      toast.info("You can add up to 3 tasks");
      return;
    }
    append({ type: LEVEL_TASK_TYPE.TEXT, content: "" });
  };

  const onSubmit = (data: CreateLevelReq) => {
    setOpen(false);
    addLevel(data)
    reset()
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>ADD Level</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add new Level</DialogTitle>
            <DialogDescription className="mb-4">
              You can remove the level before publishing
            </DialogDescription>
          </DialogHeader>

          <div>
            {tab === "details" ? (
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="eg: HTML AND CSS"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    {...register("description")}
                    placeholder="Enter a short description..."
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="taskFile">TaskFile</Label>
                  <Textarea
                    id="taskFile"
                    {...register("taskFile")}
                    placeholder="Enter the taskFile"
                  />
                  {errors.taskFile && (
                    <p className="text-red-500 text-sm">
                      {errors.taskFile.message}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <ScrollArea className="h-[300px] border rounded-md p-2">
                  <div className="flex flex-col gap-4">
                    {fields.map((field, index) => (
                      <div
                        key={field.id}
                        className="border p-3 rounded-md relative"
                      >
                        <X
                          className="bg-red-400 rounded-full text-white absolute top-2 right-2 cursor-pointer"
                          onClick={() => remove(index)}
                        />

                        <div className="flex items-center gap-2">
                          <Label>Link</Label>
                          <Input
                            className="w-[15px]"
                            type="radio"
                            value={LEVEL_TASK_TYPE.LINK}
                            {...register(`tasks.${index}.type`)}
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <Label>Text</Label>
                          <Input
                            className="w-[15px]"
                            type="radio"
                            value={LEVEL_TASK_TYPE.TEXT}
                            {...register(`tasks.${index}.type`)}
                          />
                        </div>

                        <div className="mt-2">
                          <Label>Content</Label>
                          <Textarea
                            {...register(`tasks.${index}.content`)}
                            placeholder="Enter task content..."
                          />
                          {errors.tasks?.[index]?.content && (
                            <p className="text-red-500 text-sm">
                              {errors.tasks[index]?.content?.message}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="flex justify-center py-2">
                  <Button
                    type="button"
                    onClick={handleAddTask}
                    className="rounded-full"
                  >
                    <Plus />
                  </Button>
                </div>
              </div>
            )}
          </div>

          <Button
            type="button"
            onClick={() =>
              setTab((prev) => (prev === "details" ? "tasks" : "details"))
            }
            className="w-full mt-5"
          >
            {tab === "details" ? "Assign Task" : "Back to Details"}
          </Button>

          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button
                type="button"
                onClick={() => setOpen(false)}
                variant="outline"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LevelDialog;
