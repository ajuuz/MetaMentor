import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/services/userService/notificationApi";
import type { NotificationEntity } from "@/types/entity/notification";

export const useGetNotificationQuery = (filter: 'all' | 'unRead') => {
  return useQuery<Omit<NotificationEntity, 'userId'>[]>({
    queryKey: ["getNotifications", filter],
    queryFn: () => getNotifications(filter),
  });
};
