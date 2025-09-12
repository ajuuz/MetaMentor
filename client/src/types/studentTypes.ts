import type { GENDER } from "@/utils/constants"

type StudentData={
   _id: string,
   seq:number,
    userId: string,
    isBlocked: boolean,
    point: number,
    isPremium: boolean,
    premiumPlan: string|null,
    premiumExpiry: Date|null,
    name: string,
    country: string,
    gender: GENDER,
    email: string,
    mobileNumber: number
}
export type GetAllStudentResponseType={
    students:StudentData[]
    totalPages:number
}