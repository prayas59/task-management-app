import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-6">TaskFlow</h1>

      <p className="text-slate-600 dark:text-slate-400 mb-8">
        Modern Task Management Platform
      </p>

      <div className="flex gap-4">
        <Link href="/login" className="bg-blue-600 px-6 py-3 rounded-lg">
          Login
        </Link>

        <Link href="/signup" className="border px-6 py-3 rounded-lg">
          Sign Up
        </Link>
      </div>
    </main>
  );
}
