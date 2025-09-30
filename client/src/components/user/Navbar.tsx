"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useUserStore, type UserType } from "@/zustand/userStore";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Bell } from "lucide-react";
import { FaUserCircle, FaPaperPlane } from "react-icons/fa";
import {
  listenForForegroundMessages,
  requestForToken,
} from "@/config/firebaseConfig/firebaseConfig";
import { saveFcmToken } from "@/services/commonApi";
import { useMutation } from "@tanstack/react-query";
import NotificationComponent from "../notification/Notification";
import { useGetNotificationQuery } from "@/hooks/tanstack/notification";

const Navbar = () => {
  const user: UserType | null = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = useMemo(() => location.pathname, [location]);

  const [showNotifications, setShowNotifications] = useState(false);
  const [filter, setFilter] = useState<"all" | "unRead">("unRead");

  const { data: notifications } = useGetNotificationQuery(filter);

  const { mutate: saveFcmTokenMutation } = useMutation({
    mutationFn: saveFcmToken,
    onSuccess: (response, token) => {
      console.log(response)
      localStorage.setItem("fcmToken", token);
    },
    onError: (err) => console.error("Failed to save token:", err),
  });

  const setupFCM = useCallback(async () => {
    if (!user || user.role === "admin") return;
    console.log("setup fcm token")
    try {
      if (Notification.permission === "denied") return;
      
      const cachedToken = localStorage.getItem("fcmToken");
      const token = await requestForToken();
      
      console.log("setup fcm token 2",token)
      if (token && token !== cachedToken) {
        saveFcmTokenMutation(token);
      }

      listenForForegroundMessages();
    } catch (error) {
      console.log('error in creating fcm token')
      console.error("FCM setup error:", error);
    }
  }, [user, saveFcmTokenMutation]);

  useEffect(() => {
    setupFCM();
  }, [setupFCM]);

  useEffect(() => {
    setFilter("unRead");
  }, [showNotifications]);

  const navItems = [
    { itemName: "Domains", itemEndPoint: "domains" },
    { itemName: "Dashboard", itemEndPoint: "dashboard" },
  ];

  return (
    <header className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Left: Logo */}
          <div
            className="text-[#E63946] font-bold text-xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-black">META</span> MENTOR
          </div>

          {/* Center: Nav Items */}
          <div className="hidden md:flex flex-1 justify-center">
            <NavigationMenu className="flex items-center">
              <NavigationMenuList className="flex gap-5">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.itemName}>
                    <NavigationMenuLink
                      className={`${
                        pathname === `/${item.itemEndPoint}`
                          ? "text-white bg-gradient-to-r from-red-600 to-black hover:text-white hover:from-black hover:to-red-600"
                          : "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-black hover:text-black"
                      } text-nowrap transition-colors duration-1000 font-medium`}
                    >
                      <Link to={`/${item.itemEndPoint}`}>{item.itemName}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right: Icons + Buttons */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="relative">
                <button onClick={() => setShowNotifications((prev) => !prev)}>
                  <Bell className="w-6 h-6 text-gray-600" />
                  {filter === "unRead" &&
                    notifications &&
                    notifications.length > 0 && (
                      <span className="absolute top-0 right-0 w-4 h-4 text-xs text-white bg-red-500 rounded-full flex items-center justify-center">
                        {notifications.length}
                      </span>
                    )}
                </button>

                {showNotifications && notifications && (
                  <NotificationComponent
                    filter={filter}
                    setFilter={setFilter}
                    notifications={notifications}
                    onClose={() => setShowNotifications(false)}
                  />
                )}
              </div>
            )}

            <FaUserCircle
              onClick={() => navigate("/profile")}
              className="cursor-pointer scale-[1.2]"
            />
            <FaPaperPlane />

            {!user ? (
              <Button
                onClick={() => navigate("/signup")}
                className="bg-[#E63946] text-white hover:bg-[#dc2f3c]"
              >
                Sign Up
              </Button>
            ) : (
              <>
                {user.role === "mentor" && (
                  <Button onClick={() => navigate("/mentor")}>
                    Switch to mentor
                  </Button>
                )}
                {user.role === "admin" && (
                  <Button onClick={() => navigate("/admin/dashboard")}>
                    Switch to admin
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger className="md:hidden cursor-pointer">
              <Menu className="h-6 w-6" />
            </SheetTrigger>

            <SheetContent className="rounded-l-2xl h-[98vh] my-auto">
              <div className="flex flex-col gap-3 mt-6 px-6 py-4 rounded-2xl">
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-2">
                  Explore
                </h2>

                {[
                  "Communities",
                  "Mentors",
                  "About",
                  "Network",
                  "Rooms",
                  "Highlights",
                  "Dashboard",
                ].map((item, index) => (
                  <Link
                    key={index}
                    to={`/${item.toLowerCase()}`}
                    className="text-[16px] font-medium text-gray-700 hover:text-[#E63946] hover:pl-2 transition-all duration-200 ease-in-out px-2 py-1 rounded-md hover:bg-[#E63946]/10"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
