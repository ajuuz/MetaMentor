
export type DomainType={
    name:string,
    description:string,
    motive:string,
    image:string,
    levels:{name:string,description:string,taskFile:string}[]
}

export type GetAllDomainType={
   domains:Omit<DomainType & {_id:string,isBlocked:boolean},'levels'>[],
   totalPages:number
}