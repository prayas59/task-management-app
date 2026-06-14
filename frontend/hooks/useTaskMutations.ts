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

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: ["tasks"],
      });

      const previousTasks = queryClient.getQueriesData({
        queryKey: ["tasks"],
      });

      queryClient.setQueriesData(
        {
          queryKey: ["tasks"],
        },
        (old: any) => {
          if (!old?.data?.tasks) return old;

          return {
            ...old,
            data: {
              ...old.data,
              tasks: old.data.tasks.map((task: any) =>
                task.id === id
                  ? {
                      ...task,
                      ...data,
                    }
                  : task,
              ),
            },
          };
        },
      );

      return { previousTasks };
    },

    onError: (_err, _variables, context) => {
      context?.previousTasks?.forEach(([key, value]) => {
        queryClient.setQueryData(key, value);
      });

      toast.error("Failed to update task");
    },

    onSuccess: () => {
      toast.success("Task updated successfully");
    },

    onSettled: () => {
      invalidate();
    },
  });
  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => deleteTask(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ["tasks"],
      });

      const previousTasks = queryClient.getQueriesData({
        queryKey: ["tasks"],
      });

      queryClient.setQueriesData(
        {
          queryKey: ["tasks"],
        },
        (old: any) => {
          if (!old?.data?.tasks) return old;

          return {
            ...old,
            data: {
              ...old.data,
              tasks: old.data.tasks.filter((task: any) => task.id !== id),
            },
          };
        },
      );

      return { previousTasks };
    },

    onError: (_err, _variables, context) => {
      context?.previousTasks?.forEach(([key, value]) => {
        queryClient.setQueryData(key, value);
      });

      toast.error("Failed to delete task");
    },

    onSuccess: () => {
      toast.success("Task deleted successfully");
    },

    onSettled: () => {
      invalidate();
    },
  });

  return {
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  };
};
