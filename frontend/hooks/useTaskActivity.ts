import { useQuery } from "@tanstack/react-query";
import { getTaskActivity } from "@/services/activity.service";

export const useTaskActivity = (taskId: string) => {
  return useQuery({
    queryKey: ["activity", taskId],
    queryFn: () => getTaskActivity(taskId),
    enabled: !!taskId,
  });
};
