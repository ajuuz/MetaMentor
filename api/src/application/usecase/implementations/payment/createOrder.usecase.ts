import { ISlotLockRepository } from "domain/repositoryInterfaces/slotLockRepository.interface";
import { ICreateOrderUsecase } from "application/usecase/interfaces/payment/createOrderUsecase.interface";
import { razorpay } from "infrastructure/config/razorpay/razorpay.config";
import { Orders } from "razorpay/dist/types/orders";
import { HTTP_STATUS } from "shared/constants";
import { CustomError } from "domain/errors/customError";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateOrderUsecase implements ICreateOrderUsecase {
  constructor(
    @inject("ISlotLockRepository")
    private _slotLockRepository: ISlotLockRepository
  ) {}

  async execute(
    slotId: string[],
    amount: number
  ): Promise<Orders.RazorpayOrder> {
    const lockedSlot = await this._slotLockRepository.isSlotLocked(slotId);
    if (lockedSlot) {
      throw new CustomError(
        HTTP_STATUS.CONFLICT,
        `${lockedSlot} slot is locked`
      );
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    };

    const order = await razorpay.orders.create(options);
    await this._slotLockRepository.lockSlot(slotId);
    return order;
  }
}
