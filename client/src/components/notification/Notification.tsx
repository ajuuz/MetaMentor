import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { NotificationEntity } from "@/types/entity/notification";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { markAsRead } from "@/services/userService/notificationApi";
import { queryClient } from "@/config/tanstackConfig/tanstackConfig";

type NotificationProps = {
  filter: "all" | "unRead";
  setFilter: React.Dispatch<React.SetStateAction<"all" | "unRead">>;
  notifications: Omit<NotificationEntity, "userId">[];
  onClose: () => void;
};

const NotificationComponent = ({
  notifications,
  onClose,
  filter,
  setFilter,
}: NotificationProps) => {
  const navigate = useNavigate();

  const {mutate:markAsReadMutation}=useMutation({
    mutationFn:markAsRead,
    onSuccess:(response)=>{
        toast.success(response.message)
        queryClient.invalidateQueries({ queryKey: ["getNotifications"] });
    },
    onError:(error)=>{
        toast.error(error.message)
    }
  })

  return (
    <div className="absolute  top-12 right-4 w-96 bg-white shadow-lg rounded-md border border-gray-200 p-4 z-50">
      <div className="flex w-full justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Notifications</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
          <X size={20} />
        </button>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("unRead")}
            className={`px-3 py-1 rounded ${
              filter === "unRead" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded ${
              filter === "all" ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
        </div>
        {filter==='unRead'&&<Button onClick={()=>markAsReadMutation()}>Mark as Read</Button>}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No notifications</div>
      ) : (
        <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification._id}
              className={`p-3 border rounded ${
                notification.isRead ? "bg-gray-100" : "bg-white shadow"
              }`}
            >
              <h3 className="font-medium">{notification.title}</h3>
              <p className="text-sm text-gray-700">{notification.body}</p>

              {notification.navigate && (
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-2"
                  onClick={() => navigate(notification.navigate!)}
                >
                  View Details
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationComponent;
