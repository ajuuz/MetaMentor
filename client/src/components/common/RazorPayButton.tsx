import {
  createOrder,
  verifyPayment,
} from "@/services/paymentService/paymentApi";
import { useUserStore } from "@/zustand/userStore";
import { useRazorpay, type RazorpayOrderOptions } from "react-razorpay";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingSpinnerComponent from "./LoadingSpinnerComponent";

type Props = {
  slotIds: string[];
  amount: number;
  domainId: string;
  levelId: string;
  mentorId: string;
  start: string;
  end: string;
  content: string;
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RazorPayButton = ({
  slotIds,
  amount,
  domainId,
  levelId,
  mentorId,
  start,
  end,
  content,
  setSheetOpen,
}: Props) => {
  const { Razorpay } = useRazorpay();
  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
  const { user } = useUserStore();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const response = await createOrder(slotIds, amount);
      setSheetOpen(false);
      setIsLoading(false);
      const order = response.data;

      const options: RazorpayOrderOptions = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Meta Mentor",
        description: "Slot Booking Payment",
        order_id: order.id,
        handler: async (response: any) => {
          try {
            const paymentDetails = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };
            console.log(paymentDetails);
            await verifyPayment({
              razorPayDetails: paymentDetails,
              reviewDetails: {
                amount,
                domainId,
                levelId,
                mentorId,
                slot: {
                  start,
                  end,
                },
              },
            });
            navigate("/reviews/upcoming");
            setSheetOpen(false);
            setIsLoading(false);
          } catch (err: any) {
            setSheetOpen(true);
            setIsLoading(false);
            toast.error("Payment failed: " + err.message);
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzpay = new Razorpay(options);
      rzpay.open();
    } catch (err: any) {
      toast.error("Error creating order: " + err.message);
    }
  };

  return (
    <Button disabled={isLoading} onClick={handlePayment}>
      {isLoading ? <LoadingSpinnerComponent /> : content}
    </Button>
  );
};

export default RazorPayButton;
