import { Clock, FileText, MessageSquare, User } from "lucide-react"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

const ReviewCard = () => {
  return (
     <div className="ms-70 max-w-6xl border rounded-lg bg-white shadow flex gap-2 ">
            <div className="flex flex-col justify-center items-center gap-4 py-3 flex-1 rounded-l-md bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="flex items-center gap-2 text-slate-300">
                      <User className="w-4 h-4" />
                      <span className="text-sm">Student</span>
                    </div>
                <Avatar className="w-20 h-20 border-4 border-white/20 shadow-2xl">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                      A
                    </AvatarFallback>
                  </Avatar>
                <p className="text-lg font-medium font-serif text-white">Ajmal EA</p>
            </div>

        <div className="flex-2 flex p-5 gap-3">
            <div className="flex-1 px-5 flex flex-col justify-center items-center gap-2  rounded shadow-[inset_0_0_16px_1px_rgba(0,0,0,0.1)]">
              <div className="flex flex-col gap-2  items-center w-full">
                <div className="flex  items-center w-full">
                  <div className="flex-1 text-lg font-semibold bg-black h-full rounded-l-md text-white flex items-center px-2">Domain</div>
                  <Badge variant="secondary" className="flex-1 text-lg px-4 py-2 bg-blue-50 text-blue-700 border-blue-200 rounded-l-none">
                    MERN Stack
                  </Badge>
                </div>
                <div className="flex items-center w-full">
                  <div className="flex-1 justify-center text-lg font-semibold bg-black h-full rounded-l-md text-white flex items-center px-2">Level</div>
                  <Badge variant="outline" className="flex-1 text-lg px-4 py-2 border-green-200 text-green-700">
                    11
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2">
                    <Button size="sm" className="gap-2 bg-slate-900 hover:bg-slate-800">
                      <FileText className="w-4 h-4" />
                      Task File
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-2 border-slate-300 hover:bg-slate-50 bg-transparent"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Feedback
                    </Button>
                </div>
            </div>

            <div className="flex-1  flex flex-col  justify-center items-center  rounded shadow-[inset_0_0_16px_1px_rgba(0,0,0,0.1)] p-2">
                <div className=" flex flex-col gap-2 w-full">
                      <div className="flex justify-between bg-white rounded-lg p-4 shadow-sm border border-slate-100">
                        <p className="text-lg font-semibold text-slate-500 mb-1">Date</p>
                        <p className="text-lg font-semibold text-slate-900">March 27, 2025</p>
                      </div>

                      <div className="flex justify-between bg-white rounded-lg p-4 shadow-sm border border-slate-100">
                        <p className="text-lg font-semibold text-slate-500 mb-1">Day</p>
                        <p className="text-lg font-semibold text-slate-900">Wednesday</p>
                      </div>

                      <div className="flex justify-between  bg-white rounded-lg p-4 shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 justify-center mb-2">
                          <Clock className="w-4 h-4 text-slate-500" />
                          <p className="text-lg font-semibold text-slate-500">Duration</p>
                        </div>
                        <p className="text-lg font-semibold text-slate-900">12:00 - 12:30 PM</p>
                      </div>
                    </div>
            </div>      
        </div>
        </div>
  )
}

export default ReviewCard
