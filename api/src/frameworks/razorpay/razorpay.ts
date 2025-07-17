import Razorpay from "razorpay";
import { config } from "shared/config";

export const razorpay = new Razorpay({
  key_id: config.RAZORPAY.RAZORPAY_KEY_ID,
  key_secret: config.RAZORPAY.RAZORPAY_KEY_SECRET
});