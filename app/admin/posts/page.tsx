import Link from "next/link";

const posts = [
  {
    id: 1,
    title: "Understanding Server Actions in Next.js",
    author: "Ali Valiyev",
    category: "Next.js",
    status: "Published",
    date: "Sep 10, 2026",
  },
  {
    id: 2,
    title: "Building Production Ready APIs with Laravel",
    author: "Vali Karimov",
    category: "Laravel",
    status: "Published",
    date: "Sep 8, 2026",
  },
  {
    id: 3,
    title: "TypeScript Generics Explained",
    author: "Hasan Aliyev",
    category: "TypeScript",
    status: "Draft",
    date: "Sep 5, 2026",
  },
];

export default function AdminPostsPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Posts</h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Create and manage your posts.</p>
          </div>

          <Link href="/admin/posts/create" className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500">
            + Add Post
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {/* Search */}
          <div className="border-b border-slate-200 p-4 dark:border-slate-800">
            <input type="search" placeholder="Search posts..." className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-950">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">Post</th>

                  <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">Category</th>

                  <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">Author</th>

                  <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">Status</th>

                  <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">Date</th>

                  <th className="px-6 py-4 text-right font-semibold text-slate-600 dark:text-slate-300">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-16 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600" />

                        <div>
                          <p className="max-w-xs font-medium text-slate-900 dark:text-white">{post.title}</p>

                          <p className="mt-1 text-xs text-slate-500">ID #{post.id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">{post.category}</span>
                    </td>

                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{post.author}</td>

                    <td className="px-6 py-4">
                      <span className={post.status === "Published" ? "rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" : "rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"}>{post.status}</span>
                    </td>

                    <td className="px-6 py-4 text-slate-500">{post.date}</td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/posts/${post.id}/edit`} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                          Edit
                        </Link>

                        <button type="button" className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 dark:border-slate-800">
            <p className="text-sm text-slate-500">Showing 1–3 of 24 posts</p>

            <div className="flex gap-2">
              <button disabled className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-400 dark:border-slate-700">
                Previous
              </button>

              <button className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm text-white">1</button>

              <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm dark:border-slate-700 dark:text-slate-300">2</button>

              <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm dark:border-slate-700 dark:text-slate-300">Next</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
