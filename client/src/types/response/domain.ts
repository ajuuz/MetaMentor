export type DomainResBase = {
  _id: string;
  name: string;
  image: string;
  description: string;
  motive: string;
};


//admin
export type GetDomainsForAdminRes = DomainResBase & {
    isBlocked: boolean;
}

//students

//multiple
export type GetDomainsForStudRes = DomainResBase
export type GetEnrolledDomainsRes = DomainResBase

//single
export type GetDomainForStudRes = DomainResBase