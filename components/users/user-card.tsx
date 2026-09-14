type UserCardProps = {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
};

export function UserCard({ user }: UserCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-lg font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">{user.name.charAt(0).toUpperCase()}</div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">{user.name}</h3>

            <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
          </div>
        </div>

        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">{user.role}</span>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
        <a href={`/users/${user.id}`} className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
          View profile →
        </a>
      </div>
    </article>
  );
}
