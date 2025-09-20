import { Expose } from "class-transformer";

@Expose()
export class MulterResDTO {
  @Expose()
  url!: string;

  @Expose()
  public_id!: string;
}
