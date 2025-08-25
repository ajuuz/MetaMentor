import { Exclude, Expose, Transform } from "class-transformer";

export class DomainResDTO {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  _id!: string;

  @Expose()
  name!: string;

  @Expose()
  image!: string;

  @Expose()
  description!: string;

  @Expose()
  motive!: string;
}

export class GetDomainResDTO extends DomainResDTO{}
export class GetEnrolledDomainsResDTO extends DomainResDTO{}

//admin
@Exclude()
export class GetDomainsForAdminResDTO extends DomainResDTO {
  @Expose()
  isBlocked!: boolean;
}

//students
@Exclude()
export class GetDomainsForStudResDTO extends DomainResDTO {}
