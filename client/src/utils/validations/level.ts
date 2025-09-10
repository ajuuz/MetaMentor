import { LEVEL_TASK_TYPE } from "@/utils/constants";
import z from "zod";

export const levelSchema = z.object({
  _id: z.string().min(1, "Level ID must be a non-empty string").optional(),
  isBlocked: z.boolean().optional(),
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(20, { message: "Name must be at most 20 characters" }),
  description: z.string().min(1, { message: "Description is required" }),
  taskFile: z.string().min(1, { message: "TaskFile is required" }),
  tasks: z
    .array(
      z.object({
        _id: z.string().min(1, "task ID must be a non-empty string").optional(),
        type: z.nativeEnum(LEVEL_TASK_TYPE),
        content: z.string().min(1, { message: "Task content is required" }),
      })
    )
    .max(3, { message: "You can add up to 3 tasks" }),
});
