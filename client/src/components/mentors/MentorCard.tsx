import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import type { MentorCardType } from "@/types/mentorType";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

interface MentorCardProps {
  mentor: MentorCardType;
}

export default function MentorCard({ mentor }: MentorCardProps) {
  return (
    <Card className="w-full position relative z-2 max-w-4xl mx-auto rounded-2xl shadow-md hover:shadow-lg transition bg-gradient-to-r from-rose-50 via-white to-rose-100 border-0">
      <CardContent className="p-6 flex flex-row gap-6">
        {/* Left Side - Avatar */}
        <div className="flex flex-col items-center gap-3 w-40">
          <Avatar className="h-24 w-24 border-2 border-rose-300 shadow">
            {mentor.profileImage && (
              <AvatarImage src={mentor.profileImage} alt={mentor.name} />
            )}
            <AvatarFallback className="bg-rose-200 text-rose-700 font-bold">
              {mentor.name ? mentor.name.charAt(0) : "M"}
            </AvatarFallback>
          </Avatar>

          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="h-4 w-4 fill-yellow-400" />
            <span className="text-sm font-medium">
              {mentor.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Right Side - Info */}
        <div className="flex flex-col justify-between flex-1">
          {/* Name & Country */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{mentor.name}</h2>
            {mentor.country && (
              <p className="text-sm text-gray-500">{mentor.country}</p>
            )}
          </div>

          {/* Domains */}
          <div className="flex gap-2 flex-wrap mt-2">
            {mentor.domains.map((d) => (
              <Badge
                key={d._id}
                className="bg-rose-100 text-rose-700 border border-rose-200 flex items-center gap-1"
              >
                <img
                  src={d.image}
                  alt={d.name}
                  width={30}
                  height={16}
                  className="rounded-sm"
                />
                {d.name}
              </Badge>
            ))}
          </div>

          {/* About */}
          <p className="text-sm text-gray-600 line-clamp-2 mt-2">{mentor.about}</p>

          {/* Skills */}
          {mentor.skills.length > 0 && (
            <div className="flex gap-2 flex-wrap mt-2">
              {mentor.skills.map((skill, i) => (
                <Badge key={i} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          )}

          {/* Worked At */}
          {mentor.workedAt.length > 0 && (
            <p className=" text-gray-500 italic mt-1">
              Worked at: {mentor.workedAt.join(", ")}
            </p>
          )}

          {/* Footer */}
          <div className="flex justify-between items-center mt-4 gap-4">
            <span className="text-rose-600 font-semibold text-lg">
              ₹{mentor.fee} / session
            </span>
            <Button variant="default" className="bg-rose-500 hover:bg-rose-600 rounded-xl px-6">
              View Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
