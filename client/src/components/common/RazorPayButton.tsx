import { createOrder, verifyPayment } from '@/services/paymentService/paymentApi';
import { useUserStore } from '@/zustand/userStore';
import {useRazorpay, type RazorpayOrderOptions} from 'react-razorpay'
import { toast } from 'sonner';
import { Button } from '../ui/button';


type Props={
    slotId:string,
    reviewDetails:{domainId:string,levelId:string,mentorId:string,amount:number,slot:{day:string,start:number,end:number}}
}
const RazorPayButton = ({slotId,reviewDetails}:Props) => {

    const {Razorpay} = useRazorpay();
    const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
    const {user} = useUserStore();

    const handlePayment=async()=>{
        try{
            const response = await createOrder(slotId,reviewDetails.amount);
            console.log(response.data)
            const order = response.data;
            
            const options:RazorpayOrderOptions={
                key:RAZORPAY_KEY_ID,
                amount:order.amount,
                currency:order.currency,
                name:'Meta Mentor',
                description: "Slot Booking Payment",
                order_id:order.id,
                handler: async (response: any) => {
                  try {
                    const paymentDetails={
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_signature: response.razorpay_signature
                    }
                    console.log(paymentDetails)
                    await verifyPayment({razorPayDetails:paymentDetails,reviewDetails})
                    } catch (err:any) {
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
            }

              const rzpay = new Razorpay(options);
              rzpay.open()
        }
        catch(err:any){
             toast.error("Error creating order: " + err.message);
        }
    }

  return (
    <Button onClick={handlePayment}>Pay with Razorpay</Button>
  )
}

export default RazorPayButton
