export default function PageLoader() {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
      <div className="text-center">
        <div className="h-14 w-14 border-4 border-slate-300 dark:border-slate-700 border-t-blue-500 rounded-full animate-spin mx-auto" />

        <h3 className="mt-6 text-lg font-semibold text-slate-900 dark:text-white">
          Loading...
        </h3>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Please wait while we fetch your data
        </p>
      </div>
    </div>
  );
}
