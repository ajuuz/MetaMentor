
export interface IResponseSpecifier<T = any>{
    statusCode:number,
    content:{
        success:boolean,
        message:string,
        data?:T
    }
}

export function responSpecifier(success:boolean,statusCode:number,message:string,data?:any):IResponseSpecifier{
    return {statusCode,content:{success,message,data}};
}