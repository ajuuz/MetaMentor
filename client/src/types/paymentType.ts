export type VerifyPaymentDTO = {
  razorPayDetails: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  };
  reviewDetails: {
    amount: number;
    domainId: string;
    levelId: string;
    mentorId: string;
    slot: {
      start: string;
      end: string;
    };
  };
};
