"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { socket } from "@/lib/socket";

export const useRealtimeTasks = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const refresh = () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      queryClient.invalidateQueries({
        queryKey: ["admin-tasks"],
      });
    };

    socket.on("task-created", refresh);
    socket.on("task-updated", refresh);
    socket.on("task-deleted", refresh);

    return () => {
      socket.off("task-created", refresh);
      socket.off("task-updated", refresh);
      socket.off("task-deleted", refresh);
    };
  }, [queryClient]);
};
