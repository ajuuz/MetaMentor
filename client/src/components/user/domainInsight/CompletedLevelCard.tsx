import ContentViewerModal from "@/components/common/ContentViewerModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { StudentReviewCard } from "@/types/reviewTypes"
import { CheckCircle, FileText, LucideClockFading, MessageSquare, XCircle } from "lucide-react"


const CompletedLevelCard = ({ review, index }: { review: StudentReviewCard, index: number }) => {

    const dateFormatter=(date:Date)=>{
        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
    }
    return (
        <Card
            key={review._id}
            className="text-black rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200"
        >
            <CardContent className="p-5 space-y-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-lg text-gray-800">
                        LEVEL {index + 1}: {review.level.name || "HTML & CSS"}
                    </h2>
                    {review.status === "pass" ? (
                        <span className="flex items-center gap-1 text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full text-sm font-medium">
                            <CheckCircle className="w-4 h-4" />
                            Passed
                        </span>
                    ) : review.status === "fail" ? (
                        <span className="flex items-center gap-1 text-red-700 bg-red-100 px-3 py-1 rounded-full text-sm font-medium">
                            <XCircle className="w-4 h-4" />
                            Failed
                        </span>
                    ) : (
                        <span className="flex items-center gap-1 text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full text-sm font-medium">
                            <LucideClockFading className="w-4 h-4" />
                            Pending
                        </span>
                    )}
                </div>

                {/* Divider */}
                <hr className="border-gray-200" />

                {/* Details */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="text-gray-600 ">
                        <h4 className="font-semibold">Description</h4>
                        <p className="">Build the Web’s Foundation</p>
                    </div>
                    <div className="text-gray-600 ">
                        <h4 className="font-semibold">slot</h4>
                        <div className="flex flex-wrap gap-2">
                        <p className='text-muted-foreground bg-slate-100 p-1 px-2 rounded'>Date: {dateFormatter(new Date(review.slot.isoStartTime))}</p>
                        <p className='text-muted-foreground bg-slate-100 p-1 px-2 rounded'>Day: {review.slot.day}</p>
                        <p className='text-muted-foreground bg-slate-100 p-1 px-2 rounded'>Start At: {new Date(review.slot.isoStartTime).toLocaleTimeString()}</p>
                        <p className='text-muted-foreground bg-slate-100 p-1 px-2 rounded'>End At: {new Date(review.slot.isoEndTime).toLocaleTimeString()}</p>
                        </div>
                    </div>

                    <div className="text-gray-600">
                        <h4 className="font-semibold">Reviewer</h4>
                        <span className="font-semibold capitalize text-lg">{review.mentorName}</span>
                    </div>

                    <div className="text-gray-600">
                        <h4 className="font-semibold">Fee</h4>
                        <span className="font-semibold capitalize text-lg">Rs. {review.commissionAmount+review.mentorEarning}</span>
                    </div>
                </div>


                {/* Actions */}
                <div className="flex gap-3 flex-wrap">
                    {["fail", "pass"].includes(review.status) && (
                        <ContentViewerModal
                            triggerer={
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className={`gap-2 cursor-pointer rounded-full px-4 py-2 text-sm ${review.status === "pass"
                                        ? "border-emerald-300 hover:bg-emerald-50 bg-transparent text-emerald-700"
                                        : "border-red-300 hover:bg-red-50 bg-transparent text-red-700"
                                        }`}
                                >
                                    <MessageSquare className="w-4 h-4" />
                                    Feedback
                                </Button>
                            }
                            title="Feedback"
                            description="Feedback"
                            content={review.feedBack}
                        />
                    )}
                    <ContentViewerModal
                        triggerer={
                            <Button
                                size="sm"
                                className="gap-2 cursor-pointer rounded-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 text-sm"
                            >
                                <FileText className="w-4 h-4" />
                                Task File
                            </Button>
                        }
                        title="Task File"
                        description="Task File"
                        content={review.level.taskFile}
                    />
                </div>

                {/* Status Badge */}
                <div
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${review.status === "pass"
                        ? "bg-emerald-100 text-emerald-700"
                        : review.status === "fail"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    Status: {review.status}
                </div>
            </CardContent>
        </Card>

    )
}

export default CompletedLevelCard