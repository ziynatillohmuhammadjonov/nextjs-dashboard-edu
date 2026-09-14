import Link from "next/link";

const user = {
  id: 1,
  name: "Ali Valiyev",
  email: "ali@gmail.com",
  username: "@alivaliyev",
  role: "teacher",
  bio: "Full Stack Developer focused on Next.js, React, Laravel and scalable web applications.",
  joined: "January 2025",
  posts: 24,
  blogs: 8,
  followers: "1.2K",
};

const recentPosts = [
  {
    id: 1,
    title: "Understanding Server Actions in Next.js",
    category: "Next.js",
    date: "Sep 10, 2026",
  },
  {
    id: 2,
    title: "React Server Components Deep Dive",
    category: "React",
    date: "Sep 3, 2026",
  },
  {
    id: 3,
    title: "Building APIs with Laravel",
    category: "Laravel",
    date: "Aug 28, 2026",
  },
];

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="bg-slate-50 dark:bg-slate-950">
      {/* Profile Header */}
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <Link href="/users" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            ← Back to Users
          </Link>

          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl font-bold text-white ring-8 ring-indigo-50 dark:ring-indigo-500/10">AV</div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold">{user.name}</h1>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">Active</span>
              </div>

              <p className="mt-1 text-slate-500">{user.username}</p>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">{user.bio}</p>

              <p className="mt-3 text-sm text-slate-400">
                {user.role} · Joined {user.joined}
              </p>
            </div>

            <button className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500">Follow</button>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 border-t border-slate-200 pt-8 dark:border-slate-800">
            <div className="text-center">
              <p className="text-2xl font-bold">{user.posts}</p>

              <p className="mt-1 text-sm text-slate-500">Posts</p>
            </div>

            <div className="border-x border-slate-200 text-center dark:border-slate-800">
              <p className="text-2xl font-bold">{user.blogs}</p>

              <p className="mt-1 text-sm text-slate-500">Blogs</p>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold">{user.followers}</p>

              <p className="mt-1 text-sm text-slate-500">Followers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Recent Posts</h2>

          <p className="mt-1 text-sm text-slate-500">Latest articles written by {user.name}</p>
        </div>

        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Link key={post.id} href={`/posts/${post.id}`} className="group block rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-indigo-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{post.category}</span>

                  <h3 className="mt-2 text-lg font-semibold transition group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{post.title}</h3>
                </div>

                <span className="shrink-0 text-sm text-slate-500">{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
