import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useUserStore } from "@/zustand/userStore";
import { logout } from "@/services/authService.ts/authApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UserCircle2, Bell } from "lucide-react";
import NotificationComponent from "../notification/Notification";
import { useGetNotificationQuery } from "@/hooks/tanstack/notification";

const Header = () => {
  const navigate = useNavigate();
  const logoutDispatch = useUserStore((state) => state.logout);
  const [showNotifications, setShowNotifications] = useState(false);
  const [filter, setFilter] = useState<"all" | "unRead">("unRead");

  const {
    data: notifications,
    isLoading,
    isError,
  } = useGetNotificationQuery(filter);

  const { mutate: logoutMutation, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: (response) => {
      logoutDispatch();
      toast.success(response.message);
      navigate("/login");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    setFilter("unRead");
  }, [showNotifications]);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError || !notifications) {
    return <div>sorry no notifications</div>;
  }

  const handleLogout = () => {
    logoutMutation();
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex items-center justify-between z-50">
      {/* Logo */}
      <div
        className="text-2xl font-bold text-[#E63946] cursor-pointer"
        onClick={() => navigate("/mentor")}
      >
        META MENTOR
      </div>

      {/* Empty nav placeholder (optional) */}
      <nav className="hidden md:flex items-center space-x-6 text-gray-700">
        {/* Add more navigation links if needed */}
      </nav>

      {/* User Info + Notifications + Logout */}
      <div className="flex items-center space-x-4 relative">
        <button
          className="relative"
          onClick={() => setShowNotifications((prev) => !prev)}
        >
          <Bell className="w-8 h-8 text-gray-600" />
          {filter === "unRead" && (
            <span className="absolute top-0 right-0 w-5 h-5 flex items-center justify-center text-white bg-red-500 rounded-full">
              {notifications.length}
            </span>
          )}
        </button>

        {showNotifications && (
          <NotificationComponent
            filter={filter}
            setFilter={setFilter}
            notifications={notifications}
            onClose={() => setShowNotifications(false)}
          />
        )}

        <UserCircle2 className="w-8 h-8 text-gray-600" />
        <Button variant="outline" onClick={handleLogout} disabled={isPending}>
          {isPending ? "Logging Out..." : "Logout"}
        </Button>
      </div>
    </header>
  );
};

export default Header;
