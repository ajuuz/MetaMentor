import z from "zod";

//application
export const mentorApplicationFormSchema = z.object({
  about: z.string().min(10, "Description too short"),
  fee: z.number().min(100, "Fee must be at least 100").max(700, "Fee max 700"),
  skills: z.array(z.string()).min(1, "Add at least one skill"),
  workedAt: z.array(z.string()).min(1, "Add at least one company"),
  selectedDomains: z
    .array(z.object({ _id: z.string(), name: z.string(),image:z.string() }))
    .min(1, "Select at least one domain"),
  images: z
    .array(
      z.union([
        z.instanceof(File), // uploaded file
        z.string(), // existing file URL
        z.null(), // initial state
      ])
    )
    .length(2, "Add CV and certificate")
    .refine(
      (arr) => arr.every((item) => (item instanceof File && item.size > 0) || typeof item==='string'),
      "Both CV and certificate are required"
    ),
});
