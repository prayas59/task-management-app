"use client";

import { useState } from "react";
import { useTaskActivity } from "@/hooks/useTaskActivity";
import { socket } from "@/lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
type Props = {
  taskId: string;
};

export default function ActivityModal({ taskId }: Props) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data, isLoading } = useTaskActivity(taskId);

  useEffect(() => {
    const handler = (data: any) => {
      if (data.taskId === taskId) {
        queryClient.invalidateQueries({
          queryKey: ["activity", taskId],
        });
      }
    };

    socket.on("activity-updated", handler);

    return () => {
      socket.off("activity-updated", handler);
    };
  }, [taskId, queryClient]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="border border-blue-500 text-blue-500 px-3 py-1 rounded-lg text-sm"
      >
        Activity
      </button>
    );
  }

  const activities = data?.data || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-300 dark:border-slate-800 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Task Activity</h2>

          <button onClick={() => setOpen(false)} className="text-slate-500">
            ✕
          </button>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : activities.length === 0 ? (
          <p>No activity found.</p>
        ) : (
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {activities.map((activity: any) => (
              <div
                key={activity.id}
                className="border border-slate-200 dark:border-slate-700 rounded-xl p-4"
              >
                <p className="font-semibold">{activity.action}</p>

                {activity.oldValue && (
                  <p className="text-sm text-slate-500 mt-1">
                    {activity.oldValue} → {activity.newValue}
                  </p>
                )}

                <p className="text-xs text-slate-400 mt-2">
                  {new Date(activity.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
