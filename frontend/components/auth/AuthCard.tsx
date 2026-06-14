"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";

type Props = {
  title: string;
  subtitle: string;
  buttonText: string;
  loading: boolean;
  footerText: string;
  footerLinkText: string;
  footerHref: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
};

export default function AuthCard({
  title,
  subtitle,
  buttonText,
  loading,
  footerText,
  footerLinkText,
  footerHref,
  children,
  onSubmit,
}: Props) {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center px-4 overflow-hidden">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      {/* Decorative Blobs */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

      {/* Auth Card */}
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-3xl border border-slate-300 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl p-8"
      >
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-2xl font-bold shadow-lg mb-4">
            T
          </div>

          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            TaskFlow
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Modern Task Management Platform
          </p>

          <h2 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
            {title}
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">{subtitle}</p>
        </div>
        {/* Inputs */}
        <div className="space-y-4">{children}</div>
        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 py-3 font-semibold text-white shadow-lg hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Please wait..." : buttonText}
        </button>
        {/* Footer */}
        <div className="mt-6 text-center text-sm">
          <span className="text-slate-500 dark:text-slate-400">
            {footerText}
          </span>{" "}
          <Link
            href={footerHref}
            className="font-semibold text-blue-500 hover:text-blue-600 transition"
          >
            {footerLinkText}
          </Link>
        </div>

        {/* Bottom Branding */}
        <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-4 text-center">
          <p className="text-xs text-slate-500 dark:text-slate-500">
            Built by Prayas Godara
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Full Stack Task Management Platform
          </p>
        </div>
      </form>
    </main>
  );
}
