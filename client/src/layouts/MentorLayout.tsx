import Header from "@/components/mentor/Header";
import SideBar from "@/components/mentor/SideBar";
import { Outlet } from "react-router-dom";

const MentorLayout = () => {
  return (
    <div className="pt-20">
      <Header/>
      <div className="flex">
        <SideBar/>
        <div className="flex-1">
        <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default MentorLayout
