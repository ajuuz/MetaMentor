import { Orders } from "razorpay/dist/types/orders";

export interface ICreateOrderUsecase{
    execute(slotId:string,amount:number):Promise<Orders.RazorpayOrder>
}