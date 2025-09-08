import type { userDetailSchema } from "@/utils/validations/user";
import z from "zod";

export type UserDetailsReq = z.infer<typeof userDetailSchema>;
