import { Card, CardContent } from "@/components/ui/card";
import { toTimeString } from "@/utils/helperFunctions/toTimeString";
import { X } from "lucide-react";
import RazorPayButton from "../common/RazorPayButton";

type SlotViewCardProps = {
  domainId:string,
  levelId:string,
  mentorId:string,
  slotId:string,
  mentor: {
    name: string;
    title: string;
    company: string;
    image: string;
  };
  fee: number;
  walletBalance: number;
  slot:{isoStartTime:Date,isoEndTime:Date,day:string,start:number,end:number},
  setSelectedSlotPopup:React.Dispatch<React.SetStateAction<string>>
};


export const SlotViewCard = ({domainId,levelId,mentorId,slotId,mentor,fee,walletBalance,slot,setSelectedSlotPopup}: SlotViewCardProps) => {

    const handleClose=(e: React.MouseEvent)=>{
        e.stopPropagation()
        setSelectedSlotPopup('')
    }
  return (
    <Card className="fixed left-1/2 top-1/2 w-[90%] max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-2xl shadow-xl p-6 md:p-10 bg-white z-50">

        <X onClick={handleClose} className=" right-3 top-2 bg-black text-white rounded-full p-1"/>
      <CardContent className="space-y-6">
        <h2 className="text-2xl font-bold text-center">
          Book Your Slot with {mentor.name}
        </h2>

        <div className="flex items-center gap-4">
          <img
            src={mentor.image}
            alt={mentor.name}
            width={80}
            height={80}
            className="rounded-md object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold">{mentor.name}</h3>
            <p className="text-sm text-muted-foreground">
              {mentor.title} | {mentor.company}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between text-center gap-4 text-white">
          <div className="bg-gray-800 flex-1 p-4 rounded-xl">
             <h5 className="font-medium">SLOT</h5>
             <p>Day : {slot.day}</p>
             <p>Start at : {toTimeString(slot.start)}</p>
             <p>Ends at : {toTimeString(slot.end)}</p>
          </div>

          <div className="flex-1 rounded-xl  p-4 bg-gray-800">
            <p className="text-sm">Slot booking cost</p>
            <p className="text-xl font-bold">{fee} Rs</p>
          </div>
          {/* <div className="flex-1 rounded-xl  p-4 bg-gray-800">
            <p className="text-sm">My Wallet Balance</p>
            <p className="text-xl font-bold">{walletBalance} points</p>
          </div> */}
        </div>

        <p className="text-sm text-center text-muted-foreground">
           by clicking Pay you will open to payment gateway
        </p>

        <div className="space-y-4 text-center">
          <RazorPayButton slotId={slotId} reviewDetails={{domainId,levelId,mentorId,amount:fee,slot}}/>
          {/* <div className="text-sm font-medium">or</div>
          <Button
            variant="secondary"
            className="w-full bg-black text-white text-base font-semibold"
            onClick={handlePayWithWallet}
          >
            PAY using Wallet
          </Button> */}
        </div>
      </CardContent>
    </Card>
  );
};
