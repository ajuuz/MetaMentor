import type { mentorApplicationFormSchema } from "@/utils/validations/mentor";
import type z from "zod";

//application
export type MentorApplicationFormReq = z.infer<typeof mentorApplicationFormSchema>;
