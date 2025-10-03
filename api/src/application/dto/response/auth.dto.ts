import { Exclude, Expose, Transform } from "class-transformer";
import { ROLES } from "shared/constants";

@Exclude()
export class LoginResDTO {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id!: string;

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  role!: ROLES;
}
