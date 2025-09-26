import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FaHamburger } from "react-icons/fa";
import { X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/services/authService.ts/authApi";
import { useUserStore } from "@/zustand/userStore";
import "./layoutStyle.css";
import { toast } from "sonner";

const UserProfileLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [active, setActive] = useState(0);
  const logoutDispatch = useUserStore((state) => state.logout);
  const navigate = useNavigate();

  const navigationPathMap = {
    Profile: "/profile",
    Reviews: "/reviews",
  };
  const handleClick = (
    element: keyof typeof navigationPathMap,
    index: number
  ) => {
    setActive(index);
    navigate(navigationPathMap[element]);
  };

  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onSuccess: (response) => {
      logoutDispatch();
      toast.success(response.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="min-h-[90vh] flex relative">
      <div className="flex items-center relative  z-2">
        <div
          onClick={() => setSidebarOpen((prev) => !prev)}
          className={`absolute z-3 sm:hidden transition-all duration-300 ${
            sidebarOpen ? "top-5 translate-x-43 p-1" : "top-5 translate-x-2 p-2"
          }  bg-black text-white  rounded-4xl`}
        >
          {!sidebarOpen ? <FaHamburger /> : <X />}
        </div>
        <div
          className={`h-7/8 sm:h-full bg-white fixed shadow-lg sm:relative z-2 flex flex-col gap-6 px-2  justify-center transition-all duration-300  -translate-x-full sm:translate-x-0 ${
            sidebarOpen && "translate-x-0"
          }`}
        >
          {["Profile","Reviews", "Settings"].map(
            (element, index) => (
              <div
                onClick={() =>
                  handleClick(element as keyof typeof navigationPathMap, index)
                }
                className={`font-medium ${
                  active === index ? "bg-red-500 text-white" : "text-black"
                }  px-20 py-2 rounded-md`}
              >
                {element}
              </div>
            )
          )}
          <div
            onClick={() => logoutMutation()}
            className={`cursor-pointer font-medium bg-black text-white  px-20 py-2 rounded-md`}
          >
            Logout
          </div>
        </div>
      </div>

      <div className="absolute bg-red-100/50 blur-3xl w-[300px] h-[100px] left-60"></div>
      <div className="absolute bg-red-300/20 blur-3xl w-[300px] h-[100px] right-0 bottom-0"></div>
      <div className="flex-1  flex justify-center items-center transition-all duration-300 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default UserProfileLayout;
