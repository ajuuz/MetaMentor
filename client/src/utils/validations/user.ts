import z from "zod";

const optionalString = z
  .string().nullable()
  .transform((val) => (val === "" ? undefined : val))
  .optional();

export const userDetailSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(20, "Name cannot exceed 20 characters")
    .regex(/^[A-Za-z\s]+$/, "Name must contain only letters"),

  mobileNumber: optionalString.refine(
    (val) => !val || /^\d{10}$/.test(val),
    "Mobile number must be a valid 10-digit number"
  ),

  country: optionalString,

  gender: z
    .union([z.enum(["male", "female", "other"]), z.string().nullable()])
    .transform((val) => (val === "" ? undefined : val))
    .optional(),

  email: z.any(),

  profileImage: z.union([z.instanceof(File), z.string()]).nullable(),
});