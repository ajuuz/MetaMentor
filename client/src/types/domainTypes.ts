export type DomainType={
    _id:string,
    name:string,
    description:string,
    motive:string,
    image:string,
    isBlocked:boolean,
    levels:{_id:string,name:string,description:string,taskFile:string}[]
}

export type DomainCreationType={
    name:string,
    description:string,
    motive:string,
    image:string,
    levels:{name:string,description:string,taskFile:string}[]
}

export type GetAllDomainType={
   domains:Omit<DomainType,'levels'>[],
   totalPages:number
}

