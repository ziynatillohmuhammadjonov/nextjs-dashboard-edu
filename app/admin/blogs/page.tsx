import Link from "next/link";

const blogs = [
  {
    id: 1,
    title: "The Future of Full Stack Development",
    category: "Technology",
    author: "Ali Valiyev",
    status: "Published",
    date: "Sep 10, 2026",
    featured: true,
  },
  {
    id: 2,
    title: "Why PostgreSQL Is Still a Great Choice",
    category: "Database",
    author: "Vali Karimov",
    status: "Published",
    date: "Sep 8, 2026",
    featured: false,
  },
  {
    id: 3,
    title: "Building Better Developer Habits",
    category: "Career",
    author: "Hasan Aliyev",
    status: "Draft",
    date: "Sep 6, 2026",
    featured: false,
  },
  {
    id: 4,
    title: "Understanding Modern Web Architecture",
    category: "Architecture",
    author: "Ali Valiyev",
    status: "Published",
    date: "Sep 4, 2026",
    featured: true,
  },
];

export default function AdminBlogsPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Blogs</h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage blog articles and publications.</p>
          </div>

          <Link href="/admin/blogs/create" className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500">
            + Add Blog
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {/* Toolbar */}
          <div className="flex flex-col gap-4 border-b border-slate-200 p-4 md:flex-row dark:border-slate-800">
            <input type="search" placeholder="Search blogs..." className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />

            <select className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white">
              <option>All statuses</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-950">
                <tr>
                  <th className="px-6 py-4 font-semibold">Blog</th>

                  <th className="px-6 py-4 font-semibold">Category</th>

                  <th className="px-6 py-4 font-semibold">Author</th>

                  <th className="px-6 py-4 font-semibold">Status</th>

                  <th className="px-6 py-4 font-semibold">Date</th>

                  <th className="px-6 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {blogs.map((blog) => (
                  <tr key={blog.id} className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-16 shrink-0 rounded-lg bg-gradient-to-br from-slate-700 via-indigo-700 to-violet-700" />

                        <div>
                          <div className="flex items-center gap-2">
                            <p className="max-w-sm font-medium text-slate-900 dark:text-white">{blog.title}</p>

                            {blog.featured && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">Featured</span>}
                          </div>

                          <p className="mt-1 text-xs text-slate-500">ID #{blog.id}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">{blog.category}</span>
                    </td>

                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{blog.author}</td>

                    <td className="px-6 py-4">
                      <span className={blog.status === "Published" ? "rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" : "rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"}>{blog.status}</span>
                    </td>

                    <td className="px-6 py-4 text-slate-500">{blog.date}</td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/blogs/${blog.id}/edit`} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
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

          {/* Pagination */}
          <div className="flex flex-col gap-4 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
            <p className="text-sm text-slate-500">Showing 1–4 of 18 blogs</p>

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
