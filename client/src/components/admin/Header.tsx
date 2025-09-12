import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/services/authService.ts/authApi";
import { toast } from "sonner";
import { useUserStore } from "@/zustand/userStore";
import { useMemo } from "react";

const Header = () => {
  const location = useLocation();
  const pathname = useMemo(() => location.pathname, [location]);
  const logoutDispatch = useUserStore((state) => state.logout);
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

  const handleLogout = () => {
    logoutMutation();
  };

  const navItmes = [
    { itemName: "Dashboard", itemEndPoint: "dashboard" },
    { itemName: "Mentors", itemEndPoint: "mentors" },
    { itemName: "Students", itemEndPoint: "students" },
    { itemName: "Mentor Application", itemEndPoint: "mentors/application" },
    { itemName: "Domains", itemEndPoint: "Domains" },
    { itemName: "Wallet", itemEndPoint: "wallet" },
    { itemName: "Communities", itemEndPoint: "communities" },
  ];

  return (
    <header className="w-screen fixed top-0 left-0 shadow-md bg-gray-100 p-5">
      <div className=" flex items-center justify-between">
        <div className="text-[#E63946] font-bold text-xl text-nowrap">
          META MENTOR
        </div>
        <div className="flex  items-center">
          <NavigationMenu className="flex items-center md:space-x-4">
            <NavigationMenuList>
              {navItmes.map((item) => (
                <NavigationMenuItem key={item.itemName}>
                  <NavigationMenuLink
                    className={`${
                      pathname === `/admin/${item.itemEndPoint}`
                        ? "text-white bg-gradient-to-r from-red-600 to-black hover:text-white hover:from-black hover:to-red-600"
                        : "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-black hover:text-black"
                    }  text-nowrap transition-colors duration-1000 font-medium `}
                  >
                    <Link to={`/admin/${item.itemEndPoint}`}>
                      {item.itemName}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
