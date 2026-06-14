"use client";

import { useState } from "react";

import { useTaskMutations } from "@/hooks/useTaskMutations";

type TaskModalProps = {
  task?: any;
};

export default function TaskModal({ task }: TaskModalProps) {
  const isEdit = !!task;

  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(task?.title || "");

  const [description, setDescription] = useState(task?.description || "");

  const [priority, setPriority] = useState(task?.priority || "MEDIUM");

  const [status, setStatus] = useState(task?.status || "TODO");

  const { createTaskMutation, updateTaskMutation } = useTaskMutations();
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? task.dueDate.slice(0, 10) : "",
  );

  const handleSubmit = async () => {
    try {
      if (!title.trim()) {
        alert("Title is required");
        return;
      }

      if (isEdit) {
        await updateTaskMutation.mutateAsync({
          id: task.id,
          data: {
            title,
            description,
            priority,
            status,
            dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
          },
        });
      } else {
        await createTaskMutation.mutateAsync({
          title,
          description,
          priority,
          status,
          dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
        });
      }

      setOpen(false);

      if (!isEdit) {
        setTitle("");
        setDescription("");
        setPriority("MEDIUM");
        setStatus("TODO");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!open) {
    return isEdit ? (
      <button
        onClick={() => setOpen(true)}
        className="border border-slate-300 dark:border-slate-700 px-3 py-1 rounded-lg text-sm"
      >
        Edit
      </button>
    ) : (
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-medium"
      >
        + New Task
      </button>
    );
  }
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
          {isEdit ? "✏️ Edit Task" : "🚀 Create Task"}
        </h2>

        <div className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
            rows={4}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-3 text-slate-900 dark:text-white"
          >
            <option value="LOW">🟢 LOW</option>
            <option value="MEDIUM">🟡 MEDIUM</option>
            <option value="HIGH">🔴 HIGH</option>
          </select>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-3 text-slate-900 dark:text-white"
            />
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 p-3 text-slate-900 dark:text-white"
          >
            <option value="TODO">📋 TODO</option>
            <option value="IN_PROGRESS">⚡ IN PROGRESS</option>
            <option value="COMPLETED">✅ COMPLETED</option>
          </select>

          <div className="flex gap-3 pt-3">
            <button
              onClick={handleSubmit}
              disabled={
                createTaskMutation.isPending || updateTaskMutation.isPending
              }
              className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white hover:opacity-90 transition"
            >
              {createTaskMutation.isPending || updateTaskMutation.isPending
                ? "Saving..."
                : isEdit
                  ? "Update Task"
                  : "Create Task"}
            </button>

            <button
              onClick={() => setOpen(false)}
              className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 py-3 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
