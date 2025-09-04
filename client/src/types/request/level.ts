import type { levelSchema } from "@/utils/validations/level";
import z from "zod";

export type CreateLevelReq = z.infer<typeof levelSchema>;