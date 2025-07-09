import SideBar from "@/components/mentor/SideBar";
import { Outlet } from "react-router-dom";

const MentorLayout = () => {
  return (
    <div className="pt-20 flex">
      <SideBar/>
      <div className="flex-1">
      <Outlet/>
      </div>
    </div>
  )
}

export default MentorLayout
