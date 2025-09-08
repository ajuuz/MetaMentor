import { Button } from "../ui/button";
import { useUserStore } from "@/zustand/userStore";
import { logout } from "@/services/authService.ts/authApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UserCircle2 } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const logoutDispatch = useUserStore((state) => state.logout);

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

      {/* User Info + Logout */}
      <div className="flex items-center space-x-4">
        <UserCircle2 className="w-8 h-8 text-gray-600" />
        <Button
          variant="outline"
          onClick={handleLogout}
          disabled={isPending}
        >
          {isPending ? "Logging Out..." : "Logout"}
        </Button>
      </div>
    </header>
  );
};

export default Header;
