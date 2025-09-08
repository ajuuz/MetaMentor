import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { UserDetailsType } from "@/types/userType"

type Props={
    userData:Omit<UserDetailsType,"role"|"isVerified"|"_id">
}
const UserDetails = ({userData}:Props) => {
  return (
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* User Info (immutable) */}
      <div className="flex flex-col gap-1">
        <Label>Name</Label>
        <Input value={userData.name} disabled />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Email</Label>
        <Input value={userData.email} disabled />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Country</Label>
        <Input value={userData.country || "N/A"} disabled />
      </div>
      <div className="flex flex-col gap-1">
        <Label>Gender</Label>
        <Input value={userData.gender || "N/A"} disabled />
      </div>
    </CardContent>
  )
}

export default UserDetails
