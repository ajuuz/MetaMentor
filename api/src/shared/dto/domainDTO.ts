import { levelDTO } from "./levelsDTO"

export type DomainRequestDTO={
    name:string,
    image:string,
    description:string,
    motive:string,
    levels:levelDTO[]
}