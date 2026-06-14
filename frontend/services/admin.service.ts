import { api } from "@/lib/axios";

export const getAllTasks = async (query: any) => {
  const response = await api.get("/admin/tasks", {
    params: query,
  });

  return response.data;
};
