import type { ReactNode } from "react"

export type  StudentDetailsType={
    name:string,
    phoneNumber:number,
    reviewCount:number,
    status:boolean,
    action:ReactNode,
    view:ReactNode
}