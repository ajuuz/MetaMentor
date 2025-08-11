import { Exclude, Expose, Type } from "class-transformer";
import { ROLES } from "shared/constants";

@Exclude()
export class LoginDTO {

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  role!: ROLES;
}
