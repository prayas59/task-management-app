"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTask, updateTask, deleteTask } from "@/services/task.service";

import { toast } from "sonner";

export const useTaskMutations = () => {
  const queryClient = useQueryClient();

  const invalidate = () =>
    queryClient.invalidateQueries({
      queryKey: ["tasks"],
    });

  const createTaskMutation = useMutation({
    mutationFn: (data: any) => createTask(data),

    onSuccess: () => {
      invalidate();
      toast.success("Task created successfully");
    },

    onError: () => {
      toast.error("Failed to create task");
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateTask(id, data),

    onSuccess: () => {
      invalidate();
      toast.success("Task updated successfully");
    },

    onError: () => {
      toast.error("Failed to update task");
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),

    onSuccess: () => {
      invalidate();
      toast.success("Task deleted successfully");
    },

    onError: () => {
      toast.error("Failed to delete task");
    },
  });

  return {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  };
};
