import { ICreateOrderUsecase } from "entities/usecaseInterfaces/payment/CreateOrderUsecase.interface";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";


@injectable()
export class PaymentController{

    constructor(
        @inject('ICreateOrderUsecase')
        private _createOrderUsecase:ICreateOrderUsecase
    ){}

    async createOrder(req:Request,res:Response,next:NextFunction):Promise<void>{
        const amount = req.body.amount;
        const slotId = req.body.slotId;
        console.log(amount,slotId)
        const order=await this._createOrderUsecase.execute(slotId,amount);
        res.status(200).json({success:true,message:'razorpay order created successully',data:order})
    }
}
