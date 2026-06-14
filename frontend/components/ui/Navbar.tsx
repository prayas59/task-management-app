"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function Navbar() {
  const { data } = useAuth();
  const router = useRouter();
  const user = data?.data;
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    await logout();

    queryClient.clear();

    router.replace("/login");
  };
  return (
    <nav className="border-b border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      {" "}
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex gap-6">
          <Link className="text-slate-900 dark:text-white" href="/dashboard">
            Dashboard
          </Link>

          {user?.role === "ADMIN" && (
            <Link className="text-slate-900 dark:text-white" href="/admin">
              Admin
            </Link>
          )}
        </div>
        <ThemeToggle />
        <button
          onClick={handleLogout}
          className="bg-red-600 px-3 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
