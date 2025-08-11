import { Exclude, Expose } from "class-transformer";
import { ROLES } from "shared/constants";

@Exclude()
export class LoginResDTO {

  @Expose()
  name!: string;

  @Expose()
  email!: string;

  @Expose()
  role!: ROLES;
}
