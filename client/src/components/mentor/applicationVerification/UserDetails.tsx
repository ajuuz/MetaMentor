import { Label } from "@/components/ui/label";
import type { UserDetailsType } from "@/types/userType";

type Props = {
  userData: Omit<UserDetailsType, "role" | "isVerified" | "_id">;
};
const UserDetails = ({ userData }: Props) => {
  return (
    <div className="space-y-8">
      {/* Profile */}
      <div className="flex flex-col items-center gap-3">
        {userData.profileImage && (
          <img
            src={userData.profileImage || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-full border shadow-sm"
          />
        )}
        <h2 className="text-xl font-semibold">Name - {userData.name}</h2>
        <p className="text-sm text-gray-500">Email - {userData.email}</p>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="text-gray-500">Country</Label>
          <p className="font-medium">{userData.country || "N/A"}</p>
        </div>
        <div>
          <Label className="text-gray-500">Gender</Label>
          <p className="font-medium">{userData.gender || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
