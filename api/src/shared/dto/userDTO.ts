import { IUserEntity } from "entities/modelEntities/user-model.entity"
import { ROLES } from "shared/constants"

export type UserFindFilterDTO={
    _id:string,
    email:string,
    mobileNumber:number
}

export type UserDetailsResponseDTO=Pick<IUserEntity,"email"|"mobileNumber"|"name"|"profileImage"|"country"|"gender">



export namespace UserUpdateDTO{
   export type filter={
        _id:string
        name:string,
        email:string,
    }

   export type update={
        name:string,
        country:string,
        gender:string,
        profileImage:string,
        mobileNumber:string,
        email:string,
        password:string,
        role:ROLES,
        isBlocked:boolean
        isVerified:boolean
    }
}