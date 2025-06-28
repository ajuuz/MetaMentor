import { Response } from "express"

class SSEClientManger{
    private _client:Map<string,Response>
    constructor(){
        this._client=new Map()
    }


    addClient(email:string,res:Response):void{
        this._client.set(email,res)
    }

    removeClient(email:string):void{
        this._client.delete(email)
    }

    notifyClient(email:string,message:string):void{
        const client = this._client.get(email);
        if(client){
            client.write(`data: ${JSON.stringify({message})}\n\n`)
        }
    }
}

export default new SSEClientManger()