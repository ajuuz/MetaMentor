import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rateMentor } from "@/services/userService/mentorService";
import { toast } from "sonner";

export const useRateMentorMutation = (mentorId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (stars: number) => rateMentor({ mentorId, stars }),
    onSuccess: (data) => {
      toast.success(data.message);
      // Invalidate mentor queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["mentor", mentorId] });
      queryClient.invalidateQueries({ queryKey: ["mentors"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to rate mentor");
    },
  });
};
