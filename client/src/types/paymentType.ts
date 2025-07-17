import type { BookReviewDTO } from "./reviewTypes"


export type VerifyPaymentDTO={
    razorPayDetails:{
        razorpay_order_id: string,
        razorpay_payment_id: string,
        razorpay_signature: string
    },
    reviewDetails:BookReviewDTO
}