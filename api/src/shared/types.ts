import { Request } from "express"

import { ROLES } from "./constants"

export interface ModifiedRequest extends Request{
    user:{
        id:string
        role:ROLES
    }
}