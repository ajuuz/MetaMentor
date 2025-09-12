import { Card } from "@/components/ui/card";
import type { EnrolledLevelRes } from "@/types/response/enrolledLevel";
import { Lock } from "lucide-react";

type Props = {
  index: number;
  noOfLevelPassed: number;
  nextLevel: EnrolledLevelRes;
}
const LockedCard = ({index,noOfLevelPassed,nextLevel}:Props) => {
  return (
    <Card
      key={index}
      className="bg-gray-100 opacity-70 rounded-lg p-6 text-center border border-gray-300"
    >
      <Lock className="mx-auto text-gray-600" size={32} />
      <p className="mt-4 text-lg font-semibold text-gray-800">
        LEVEL {noOfLevelPassed + index + 1}: {nextLevel.name}
      </p>
      <p className="mt-2 text-gray-600">
        Complete the previous level to unlock this.
      </p>
    </Card>
  );
};

export default LockedCard;
