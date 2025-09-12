export type DomainResBase = {
  _id: string;
  name: string;
  image: string;
  description: string;
  motive: string;
};

export type DomainPreviewType = { _id: string; name: string; image: string };

//====admin=====//
export type GetDomainsForAdminRes = DomainResBase & {
  isBlocked: boolean;
};
export type GetDomainForAdminRes = DomainResBase;

//=====students=====//
//multiple
export type GetDomainsForStudRes = DomainResBase;
export type GetEnrolledDomainsRes = DomainResBase;
//single
export type GetDomainForStudRes = DomainResBase;
