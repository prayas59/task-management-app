"use client";
import { useRealtimeTasks } from "@/hooks/useRealtimeTasks";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { logout } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useTasks } from "@/hooks/useTasks";
import { useTaskMutations } from "@/hooks/useTaskMutations";
import AuthGuard from "@/components/auth/AuthGuard";
import TaskModal from "@/components/task/TaskModal";
import Navbar from "@/components/ui/Navbar";
import { useAuth } from "@/hooks/useAuth";
import EmptyState from "@/components/ui/EmptyState";
import ErrorState from "@/components/ui/ErrorState";
import PageLoader from "@/components/ui/PageLoader";
export default function DashboardPage() {
  useRealtimeTasks();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [debouncedSearch] = useDebounce(search, 500);
  const { data: me } = useAuth();
  const { data, isLoading, isFetching, error } = useTasks({
    page,
    limit: 10,
    search: debouncedSearch || undefined,
    status: status || undefined,
    sortBy,
    sortOrder: "desc",
  });
  const handleLogout = async () => {
    await logout();

    router.push("/login");
  };
  const { deleteTaskMutation, updateTaskMutation } = useTaskMutations();

  if (isLoading && !data) {
    return <PageLoader />;
  }

  if (error) {
    return <ErrorState message="Failed to load tasks" />;
  }

  const tasks = data?.data?.tasks ?? [];

  return (
    <AuthGuard>
      <main className="min-h-screen bg-white text-black dark:bg-slate-950 dark:text-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold">Welcome {me?.data?.name}</h2>

            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {me?.data?.email}
            </p>

            <p className="text-blue-400 mt-2">Role: {me?.data?.role}</p>

            {me?.data?.role === "ADMIN" && (
              <button
                onClick={() => router.push("/admin")}
                className="mt-4 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg"
              >
                Open Admin Dashboard
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <h3 className="text-slate-600 dark:text-slate-400">
                Total Tasks
              </h3>

              <p className="text-3xl font-bold mt-2">
                {data?.data?.total || 0}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <h3 className="text-slate-600 dark:text-slate-400">Completed</h3>

              <p className="text-3xl font-bold mt-2">
                {tasks.filter((t: any) => t.status === "COMPLETED").length}
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <h3 className="text-slate-600 dark:text-slate-400">Pending</h3>

              <p className="text-3xl font-bold mt-2">
                {tasks.filter((t: any) => t.status !== "COMPLETED").length}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-4xl font-bold">TaskFlow</h1>

              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Manage your work efficiently
              </p>
            </div>

            <div className="flex items-center gap-4">
              {isFetching && (
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Updating...
                </span>
              )}

              <TaskModal />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {" "}
            <input
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-3 outline-none"
            />
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-3"
            >
              <option value="">All Statuses</option>

              <option value="TODO">TODO</option>

              <option value="IN_PROGRESS">IN PROGRESS</option>

              <option value="COMPLETED">COMPLETED</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-3"
            >
              <option value="createdAt">Sort: Created Date</option>

              <option value="priority">Sort: Priority</option>

              <option value="dueDate">Sort: Due Date</option>
            </select>
          </div>

          {tasks.length === 0 ? (
            <EmptyState
              title="No tasks found"
              description="Create your first task to get started"
            />
          ) : (
            <div className="grid gap-4">
              {tasks.map((task: any) => (
                <div
                  key={task.id}
                  className="rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold">{task.title}</h2>

                      <p className="text-slate-600 dark:text-slate-400 mt-2">
                        {task.description}
                      </p>
                      {task.dueDate && (
                        <div className="mt-2">
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            Due Date:
                          </span>{" "}
                          <span
                            className={`text-sm ${
                              new Date(task.dueDate) < new Date() &&
                              task.status !== "COMPLETED"
                                ? "text-red-400"
                                : "text-white"
                            }`}
                          >
                            {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      task.priority === "HIGH"
                        ? "bg-red-500/20 text-red-400"
                        : task.priority === "MEDIUM"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                    }`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-5">
                    <span
                      className={`text-sm font-medium
                    ${
                      task.status === "COMPLETED"
                        ? "text-green-400"
                        : task.status === "IN_PROGRESS"
                          ? "text-yellow-400"
                          : "text-slate-600 dark:text-slate-400"
                    }`}
                    >
                      {task.status}
                    </span>

                    <div className="flex gap-2">
                      {task.status !== "COMPLETED" && (
                        <button
                          onClick={() =>
                            updateTaskMutation.mutate({
                              id: task.id,
                              data: {
                                status: "COMPLETED",
                              },
                            })
                          }
                          className="border border-green-700 text-green-400 px-3 py-1 rounded-lg text-sm"
                        >
                          Complete
                        </button>
                      )}

                      <TaskModal task={task} />

                      <button
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to delete this task?",
                            )
                          ) {
                            deleteTaskMutation.mutate(task.id);
                          }
                        }}
                        className="border border-red-500 dark:border-red-700 text-red-600 dark:text-red-400 px-3 py-1 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center gap-3 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="border border-slate-300 dark:border-slate-700 px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Previous
            </button>

            <span className="px-4 py-2">
              Page {data?.data?.page || 1} of {data?.data?.totalPages || 1}
            </span>

            <button
              disabled={page >= (data?.data?.totalPages || 1)}
              onClick={() => setPage((prev) => prev + 1)}
              className="border border-slate-300 dark:border-slate-700 px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Next
            </button>
          </div>
        </div>
        <footer className="text-center text-slate-600 dark:text-slate-500 text-sm mt-16 pb-6 border-t border-slate-300 dark:border-slate-800 pt-6">
          <p>TaskFlow - Full Stack Task Management Application</p>

          <p className="mt-3 text-slate-800 dark:text-slate-300 font-semibold">
            Developed by Prayas Godara
          </p>

          <p>📧 prayasgodara.workspace@gmail.com</p>

          <p>📱 +91 70147 40148</p>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-600">
            Built using Next.js, Express.js, PostgreSQL, Prisma & TypeScript
          </p>
        </footer>
      </main>
    </AuthGuard>
  );
}
