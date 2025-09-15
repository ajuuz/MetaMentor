import { IOtpEntity } from "domain/entities/otp-model.entity";
import mongoose, { ObjectId } from "mongoose";

import { otpSchema } from "../schemas/otp.schema";
export interface IOtpModel extends IOtpEntity, Document {
    _id: ObjectId;
}

export const otpModel = mongoose.model<IOtpModel>('otps',otpSchema);