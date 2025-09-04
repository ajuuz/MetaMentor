import type { domainSchema } from "@/utils/validations/domain";
import type z from "zod";

export type CreateDomainReq = z.infer<typeof domainSchema>;