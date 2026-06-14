"use client";

import { useQuery } from "@tanstack/react-query";

import { getTasks } from "@/services/task.service";

export const useTasks = (filters: any) => {
  return useQuery({
    queryKey: ["tasks", filters],

    queryFn: () => getTasks(filters),

    placeholderData: (previousData) => previousData,
  });
};
