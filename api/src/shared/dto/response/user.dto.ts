import { Exclude, Expose } from "class-transformer"

@Exclude()
export class GetUserDetailsResDTO{
    @Expose()
    name!: string

    @Expose()
    profileImage!: string

    @Expose()
    country!: string|null

    @Expose()
    gender!: string|null

    @Expose()
    mobileNumber!: number|null

    @Expose()
    email!: string
}