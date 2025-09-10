import z from "zod";
import { levelSchema } from "./level";

export const domainSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters"),
  motive: z.string().trim().min(10, "Motive must be at least 10 characters"),
  image: z
    .union([z.instanceof(File), z.string()])
    .nullable()
    .refine(
      (file) => file !== null && (typeof file === "string" || file.size > 0),
      {
        message: "Image is required",
      }
    ),
  levels: z.array(levelSchema).min(3, "Need more than 2 levels"),
});
