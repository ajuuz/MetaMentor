import { ISlotLockRepository } from "entities/repositoryInterfaces/slotLockRepository.interface";
import { ICreateOrderUsecase } from "entities/usecaseInterfaces/payment/createOrderUsecase.interface";
import { razorpay } from "frameworks/razorpay/razorpay";
import { Orders } from "razorpay/dist/types/orders";
import { inject, injectable } from "tsyringe";



@injectable()
export class CreateOrderUsecase implements ICreateOrderUsecase{

    constructor(
        @inject('ISlotLockRepository')
        private _slotLockRepository:ISlotLockRepository
    ){}

    async execute(slotId:string,amount:number):Promise<Orders.RazorpayOrder>{
        // const isLocked = await this._slotLockRepository.isSlotLocked(slotId)
        // if(isLocked){
        //     throw new CustomError(HTTP_STATUS.CONFLICT,"Slot is already locked, Please try another")
        // }

        const options={
        amount:amount*100,
        currency:'INR',
        receipt:'receipt_' + Math.random().toString(36).substring(7),
        }

        const order = await razorpay.orders.create(options);
        // await this._slotLockRepository.lockSlot(slotId);
        return order;
    }
}