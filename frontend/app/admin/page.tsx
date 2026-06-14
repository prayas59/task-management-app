"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";

import AuthGuard from "@/components/auth/AuthGuard";
import Navbar from "@/components/ui/Navbar";

import { useAuth } from "@/hooks/useAuth";
import { useAdminTasks } from "@/hooks/useAdminTasks";
import PageLoader from "@/components/ui/PageLoader";
import ErrorState from "@/components/ui/ErrorState";
import { useRealtimeTasks } from "@/hooks/useRealtimeTasks";

export default function AdminPage() {
  useRealtimeTasks();
  const { data: me, isLoading: authLoading } = useAuth();

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [sortBy, setSortBy] = useState("createdAt");

  const [page, setPage] = useState(1);

  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading, error, isFetching } = useAdminTasks({
    page,
    limit: 10,
    search: debouncedSearch || undefined,
    status: status || undefined,
    sortBy,
    sortOrder: "desc",
  });

  if (authLoading) {
    return <PageLoader />;
  }

  if (me?.data?.role !== "ADMIN") {
    return <ErrorState message="Access Denied" />;
  }

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 text-red-500 flex items-center justify-center">
        Failed to load admin data
      </div>
    );
  }

  const tasks = data?.data?.tasks || [];

  return (
    <AuthGuard>
      <main className="min-h-screen bg-white text-black dark:bg-slate-950 dark:text-white">
        {" "}
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Profile Card */}

          <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-6 mb-8">
            <h2 className="text-2xl font-bold">Welcome {me?.data?.name}</h2>

            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {me?.data?.email}
            </p>

            <p className="text-blue-400 mt-2">Role: ADMIN</p>
          </div>

          {/* Header */}

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold">Admin Dashboard</h1>

              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Manage all users and tasks
              </p>
            </div>

            {isFetching && (
              <div className="text-slate-600 dark:text-slate-400">
                Updating...
              </div>
            )}
          </div>

          {/* Filters */}

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search task, user, email..."
              className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-lg p-3"
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

          {/* Stats */}

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
              <h3 className="text-slate-600 dark:text-slate-400">
                Current Page
              </h3>

              <p className="text-3xl font-bold mt-2">{data?.data?.page || 1}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition">
              <h3 className="text-slate-600 dark:text-slate-400">
                Total Pages
              </h3>

              <p className="text-3xl font-bold mt-2">
                {data?.data?.totalPages || 1}
              </p>
            </div>
          </div>

          {/* Tasks */}

          <div className="grid gap-4">
            {tasks.map((task: any) => (
              <div
                key={task.id}
                className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">{task.title}</h2>

                    <p className="text-slate-600 dark:text-slate-400 mt-2">
                      {task.description}
                    </p>

                    {task.dueDate && (
                      <p className="text-sm text-slate-600 dark:text-slate-500 mt-2">
                        Due Date: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}

                    <div className="mt-4">
                      <p className="text-blue-400 font-medium">
                        {task.user?.name}
                      </p>

                      <p className="text-slate-600 dark:text-slate-500 text-sm">
                        {task.user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-2">
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

                    <span
                      className={`text-sm
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

                    <span className="text-xs text-slate-600 dark:text-slate-500">
                      {new Date(task.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}

          <div className="flex justify-center gap-3 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="border border-slate-300 dark:border-slate-700 px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              Previous
            </button>

            <span className="px-4 py-2">Page {data?.data?.page || 1}</span>

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
