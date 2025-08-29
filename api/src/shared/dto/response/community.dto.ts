import { Exclude, Expose, Transform } from "class-transformer";

@Exclude()
export class CommunityResDTO {
  @Expose()
  @Transform(({ obj }) => obj.communityId.toString())
  communityId!: string;

  @Expose()
  name!: string;

  @Expose()
  image!: string;

  @Expose()
  isBlocked!:boolean
}

export class GetCommunitiesForAdminResDTO extends CommunityResDTO{}