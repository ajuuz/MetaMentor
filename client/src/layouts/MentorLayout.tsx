import Header from "@/components/mentor/Header";
import SideBar from "@/components/mentor/SideBar";
import { Outlet } from "react-router-dom";

const MentorLayout = () => {

  return (
    <div className="pt-20">
      <Header  />
      <div className="flex">
        {/* Sidebar */}
        <SideBar  />

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8 md:ps-68 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MentorLayout;
