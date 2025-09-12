import ContentViewerModal from "@/components/common/ContentViewerModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { EnrolledLevelRes } from "@/types/response/enrolledLevel";
import { FileText } from "lucide-react";
import { AssignmentEditor } from "./AssignmentDialog";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type Props = {
  domainId:string,
  index: number;
  noOfLevelPassed: number;
  nextLevel: EnrolledLevelRes;
};

const NextLevelsCard = ({ domainId,index, noOfLevelPassed, nextLevel }: Props) => {
  const navigate = useNavigate();
  const handleScheduleReview = (
    levelId: string,
    noOfTasks: number,
    noOfFinishedTasks: number
  ) => {
    if (noOfFinishedTasks < noOfTasks)
      return toast.info("Complete your task to schedule review");
    navigate(`/review/schedule/${domainId}/${levelId}`);
  };

  return (
    <Card
      key={index}
      className="bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition p-6"
    >
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            LEVEL {noOfLevelPassed + index + 1}: {nextLevel.name}
          </h2>
          <div className="text-sm text-gray-500">Upcoming</div>
        </div>

        <p className="text-gray-600">{nextLevel.description}</p>

        <div className="text-sm text-gray-700">
          <span className="font-medium">Reviewer:</span>
          {" Not yet assigned"}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() =>
              handleScheduleReview(
                nextLevel.levelId,
                nextLevel.tasks.length,
                nextLevel.assignments.length
              )
            }
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Schedule Review
          </Button>

          <ContentViewerModal
            triggerer={
              <Button
                size="sm"
                className="flex items-center gap-2 bg-gray-800 text-white hover:bg-gray-900"
              >
                <FileText className="w-4 h-4" /> Task File
              </Button>
            }
            title="Task File"
            description="Task File"
            content={nextLevel.taskFile}
          />
          <AssignmentEditor
            enrolledLevelId={nextLevel._id}
            tasks={nextLevel.tasks}
            assignments={nextLevel.assignments}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default NextLevelsCard;
