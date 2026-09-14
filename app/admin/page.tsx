import Link from "next/link";

const stats = [
  {
    title: "Total Users",
    value: "1,248",
    change: "+12.5%",
    description: "from last month",
    icon: "◎",
  },
  {
    title: "Total Posts",
    value: "324",
    change: "+8.2%",
    description: "from last month",
    icon: "◫",
  },
  {
    title: "Total Blogs",
    value: "86",
    change: "+5.4%",
    description: "from last month",
    icon: "▤",
  },
  {
    title: "Total Views",
    value: "48.2K",
    change: "+18.7%",
    description: "from last month",
    icon: "◉",
  },
];

const recentPosts = [
  {
    title: "Understanding Server Actions in Next.js",
    author: "Ali Valiyev",
    category: "Next.js",
    status: "Published",
    date: "Sep 10, 2026",
  },
  {
    title: "Building Production-Ready Laravel Applications",
    author: "Vali Karimov",
    category: "Laravel",
    status: "Published",
    date: "Sep 8, 2026",
  },
  {
    title: "TypeScript Generics Explained",
    author: "Hasan Aliyev",
    category: "TypeScript",
    status: "Draft",
    date: "Sep 5, 2026",
  },
  {
    title: "React Server Components Deep Dive",
    author: "Ali Valiyev",
    category: "React",
    status: "Published",
    date: "Sep 3, 2026",
  },
];

const activities = [
  {
    title: "New user registered",
    description: "John Doe created an account",
    time: "5 min ago",
    icon: "◎",
  },
  {
    title: "New post published",
    description: "Server Actions in Next.js",
    time: "32 min ago",
    icon: "◫",
  },
  {
    title: "Blog updated",
    description: "Laravel Architecture Guide",
    time: "1 hour ago",
    icon: "▤",
  },
  {
    title: "User profile updated",
    description: "Hasan Aliyev changed his profile",
    time: "2 hours ago",
    icon: "✎",
  },
];

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>

        <Link href="/admin/posts/create" className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500">
          + Create Post
        </Link>
      </div>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>

                <p className="mt-2 text-3xl font-bold tracking-tight">{stat.value}</p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-lg text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">{stat.icon}</div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">{stat.change}</span>

              <span className="text-slate-500">{stat.description}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Main Grid */}
      <div className="grid gap-6 xl:grid-cols-3">
        {/* Recent Posts */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
            <div>
              <h2 className="font-semibold">Recent Posts</h2>

              <p className="mt-1 text-sm text-slate-500">Latest content published on the platform</p>
            </div>

            <Link href="/admin/posts" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              View all →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr className="text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4 font-semibold">Post</th>

                  <th className="px-6 py-4 font-semibold">Category</th>

                  <th className="px-6 py-4 font-semibold">Status</th>

                  <th className="px-6 py-4 font-semibold">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {recentPosts.map((post) => (
                  <tr key={post.title} className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="px-6 py-4">
                      <div>
                        <p className="max-w-sm truncate text-sm font-semibold">{post.title}</p>

                        <p className="mt-1 text-xs text-slate-500">by {post.author}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">{post.category}</span>
                    </td>

                    <td className="px-6 py-4">
                      <span className={post.status === "Published" ? "rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" : "rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"}>{post.status}</span>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">{post.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Activity */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-800">
            <h2 className="font-semibold">Recent Activity</h2>

            <p className="mt-1 text-sm text-slate-500">Latest system activity</p>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {activities.map((activity) => (
              <div key={activity.title} className="flex gap-4 px-6 py-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">{activity.icon}</div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold">{activity.title}</p>

                  <p className="mt-1 text-xs text-slate-500">{activity.description}</p>

                  <p className="mt-2 text-xs text-slate-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Quick Actions */}
      <section>
        <div className="mb-4">
          <h2 className="font-semibold">Quick Actions</h2>

          <p className="mt-1 text-sm text-slate-500">Frequently used management actions</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/admin/posts/create" className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">+</div>

            <h3 className="font-semibold">Create Post</h3>

            <p className="mt-1 text-sm text-slate-500">Publish a new article</p>
          </Link>

          <Link href="/admin/blogs/create" className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">+</div>

            <h3 className="font-semibold">Create Blog</h3>

            <p className="mt-1 text-sm text-slate-500">Write a new blog post</p>
          </Link>

          <Link href="/admin/users" className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">◎</div>

            <h3 className="font-semibold">Manage Users</h3>

            <p className="mt-1 text-sm text-slate-500">View and manage users</p>
          </Link>

          <Link href="/" className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">↗</div>

            <h3 className="font-semibold">View Website</h3>

            <p className="mt-1 text-sm text-slate-500">Open public website</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
