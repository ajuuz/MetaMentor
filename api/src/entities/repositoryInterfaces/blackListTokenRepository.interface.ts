

export interface IBlackListTokenRepository{
    blacklistToken(fieldName:string,expiry:number,token:string):Promise<void>
    getToken(fieldName:string):Promise<string|null>
    removeToken(fieldName:string):Promise<void>
}