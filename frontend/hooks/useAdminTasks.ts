"use client";

import { useQuery } from "@tanstack/react-query";

import { getAllTasks } from "@/services/admin.service";

export const useAdminTasks = (filters: any) => {
  return useQuery({
    queryKey: ["admin-tasks", filters],

    queryFn: () => getAllTasks(filters),
  });
};
