import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Calendar, DollarSign, User, X } from "lucide-react";
import { FaHamburger } from "react-icons/fa";

const MentorSideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { label: "Profile", icon: <User />, path: "/mentor" },
    { label: "Dashboard", icon: <Home />, path: "/mentor/dashboard" },
    { label: "Reviews", icon: <Calendar />, path: "/mentor/reviews" },
    { label: "Slots", icon: <Calendar />, path: "/mentor/slots" },
    { label: "Wallet", icon: <DollarSign />, path: "/mentor/wallet" },
  ];

  const handleClick = (path: string, index: number) => {
    setActive(index);
    navigate(path);
    setSidebarOpen(false); // auto-close on mobile
  };

  return (
    <div className="flex relative">
      {/* Hamburger button (mobile only) */}
      <div
        onClick={() => setSidebarOpen((prev) => !prev)}
        className={`absolute z-30 sm:hidden transition-all duration-300 ${
          sidebarOpen ? "top-5 translate-x-44 p-1" : "top-5 translate-x-2 p-2"
        } bg-black text-white rounded-2xl cursor-pointer`}
      >
        {!sidebarOpen ? <FaHamburger /> : <X />}
      </div>

      {/* Sidebar */}
      <div
        className={`h-screen bg-white px-10  fixed shadow-lg  z-20 flex flex-col gap-6  justify-center transition-all duration-300 -translate-x-full md:translate-x-0 ${
          sidebarOpen && "translate-x-0"
        }`}
      >
        {links.map(({ label, icon, path }, index) => (
          <div
            key={path}
            onClick={() => handleClick(path, index)}
            className={`flex items-center gap-2 font-medium cursor-pointer px-6 py-2 rounded-md transition-colors ${
              active === index || location.pathname === path
                ? "bg-red-500 text-white"
                : "text-black hover:bg-gray-100"
            }`}
          >
            {icon}
            <span>{label}</span>
          </div>
        ))}

        {/* Logout */}
        <div
          onClick={() => {
            // you can plug in logout mutation here
            console.log("logout");
          }}
          className="cursor-pointer font-medium bg-black text-white px-6 py-2 rounded-md"
        >
          Logout
        </div>
      </div>

      {/* Background Blurs (optional) */}
      <div className="absolute bg-red-100/50 blur-3xl w-[300px] h-[100px] left-60"></div>
      <div className="absolute bg-red-300/20 blur-3xl w-[300px] h-[100px] right-0 bottom-0"></div>
    </div>
  );
};

export default MentorSideBar;
