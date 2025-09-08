import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { config } from "@/config/configuration";
import type { MentorDataType } from "@/types/mentorType";

type Props = {
  professionalDetails: Pick<MentorDataType,'domains'|'fee'|'cv'|'about'|'experienceCirtificate'|'skills'|'workedAt'>; // For editing
};

export const ProfessionalDetails = ({professionalDetails}:Props) => {
  return (
    <>
      {/* Domains */}
      <div>
        <Label className="text-gray-500">Selected Domains</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {professionalDetails.domains?.map((domain: any) => (
            <Badge key={domain._id} variant="secondary" className="px-3 py-1">
              {domain.name}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-gray-500">Fee</Label>
        <p className="font-medium">{professionalDetails.fee} Rs</p>
      </div>
      {/* About */}
      <div>
        <Label className="text-gray-500">About</Label>
        <p className="mt-2 text-gray-700 leading-relaxed">{professionalDetails.about}</p>
      </div>

      {/* Worked At */}
      <div>
        <Label className="text-gray-500">Worked At</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {professionalDetails.workedAt?.map((company: string, index: number) => (
            <Badge key={index} className="bg-gray-100 text-gray-800">
              {company}
            </Badge>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div>
        <Label className="text-gray-500">Skills</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {professionalDetails.skills?.map((skill: string, index: number) => (
            <Badge key={index} className="bg-blue-100 text-blue-800">
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="text-gray-500">CV</Label>
          <img
            src={`${config.IMAGE_BASE_URL}/${professionalDetails.cv}`}
            alt="CV"
            className="border rounded-lg shadow-sm mt-2"
          />
        </div>
        <div>
          <Label className="text-gray-500">Certificate</Label>
          <img
            src={`${
              config.IMAGE_BASE_URL
            }/${professionalDetails.experienceCirtificate}`}
            alt="Certificate"
            className="border rounded-lg shadow-sm mt-2"
          />
        </div>
      </div>
    </>
  );
};

