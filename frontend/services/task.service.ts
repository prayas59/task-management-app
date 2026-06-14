import { api } from "@/lib/axios";
import { TaskQuery } from "@/types/task";

export const getTasks = async (query: any) => {
  const cleanedQuery = Object.fromEntries(
    Object.entries(query).filter(
      ([_, value]) => value !== "" && value !== undefined && value !== null,
    ),
  );

  const response = await api.get("/tasks", {
    params: cleanedQuery,
  });

  return response.data;
};
export const createTask = async (data: any) => {
  const response = await api.post("/tasks", data);

  return response.data;
};

export const updateTask = async (id: string, data: any) => {
  const response = await api.patch(`/tasks/${id}`, data);

  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await api.delete(`/tasks/${id}`);

  return response.data;
};
