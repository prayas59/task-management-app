type Props = {
  title: string;
  description: string;
};

export default function EmptyState({ title, description }: Props) {
  return (
    <div className="rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center shadow-sm">
      <div className="text-6xl mb-4">📋</div>

      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="text-slate-600 dark:text-slate-400 mt-3">{description}</p>
    </div>
  );
}
