type Props = {
  message: string;
};

export default function ErrorState({ message }: Props) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-2xl p-8 shadow-lg">
        <div className="text-6xl mb-4">⚠️</div>

        <h2 className="text-2xl font-bold text-red-500">{message}</h2>

        <p className="mt-3 text-slate-600 dark:text-slate-400">
          Something went wrong. Please try again.
        </p>
      </div>
    </div>
  );
}
