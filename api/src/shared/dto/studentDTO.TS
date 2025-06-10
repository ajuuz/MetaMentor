import { ObjectId } from "mongoose"
import {GENDER} from '../constants'

type StudentData={
   _id: ObjectId,
    userId: ObjectId,
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
export type GetAllStudentResponseDTO={
    students:StudentData[]
    totalDocuments:number
    totalPages:number
}