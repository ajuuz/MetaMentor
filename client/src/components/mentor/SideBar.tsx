import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useMemo } from "react";
import { Home, Calendar, DollarSign, UserCheck, User } from "lucide-react";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = useMemo(() => location.pathname, [location]);

  const links = [
    { label: "Profile", icon: <User />, path: "/mentor" },
    { label: "Dashboard", icon: <Home />, path: "/mentor/dashboard" },
    { label: "Upcoming", icon: <Calendar />, path: "/mentor/reviews/upcoming" },
    {
      label: "Completed",
      icon: <UserCheck />,
      path: "/mentor/reviews/completed",
    },
    { label: "Slots", icon: <Calendar />, path: "/mentor/slots" },
    { label: "Wallet", icon: <DollarSign />, path: "/mentor/wallet" },
  ];

  return (
    <aside className="fixed top-16 left-0 w-64 h-full bg-white shadow-lg flex flex-col p-4 space-y-3">
      {links.map(({ label, icon, path }) => (
        <Button
          key={path}
          variant="ghost"
          className={`justify-start text-[#222] ${
            pathname === path
              ? "bg-[#e9182c] text-white font-semibold rounded-lg shadow-sm"
              : ""
          }`}
          onClick={() => navigate(path)}
        >
          <span className="mr-2">{icon}</span>
          {label}
        </Button>
      ))}
    </aside>
  );
};

export default SideBar;
