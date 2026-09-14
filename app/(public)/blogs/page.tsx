import Link from "next/link";
import { BlogCard } from "@/components/blogs/blog-card";

const blogs = [
  {
    id: 1,
    title: "The Future of Full Stack Development",
    excerpt: "How modern frameworks, AI and cloud infrastructure are changing the way developers build applications.",
    category: "Technology",
    author: "Ali Valiyev",
    publishedAt: "Sep 10, 2026",
    featured: true,
  },
  {
    id: 2,
    title: "Why PostgreSQL Is Still a Great Choice",
    excerpt: "A look at the features that make PostgreSQL one of the most powerful relational databases.",
    category: "Database",
    author: "Vali Karimov",
    publishedAt: "Sep 8, 2026",
  },
  {
    id: 3,
    title: "Building Better Developer Habits",
    excerpt: "Small engineering habits that can dramatically improve your productivity and code quality.",
    category: "Career",
    author: "Hasan Aliyev",
    publishedAt: "Sep 6, 2026",
  },
  {
    id: 4,
    title: "Understanding Modern Web Architecture",
    excerpt: "From browsers and CDNs to servers and databases — understand the complete request lifecycle.",
    category: "Architecture",
    author: "Ali Valiyev",
    publishedAt: "Sep 4, 2026",
  },
  {
    id: 5,
    title: "The Importance of Clean Code",
    excerpt: "Why readability and maintainability matter more as your application grows.",
    category: "Programming",
    author: "Vali Karimov",
    publishedAt: "Sep 1, 2026",
  },
  {
    id: 6,
    title: "Learning Programming in 2026",
    excerpt: "A practical roadmap for developers who want to build real-world full-stack applications.",
    category: "Education",
    author: "Hasan Aliyev",
    publishedAt: "Aug 28, 2026",
  },
];

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Our Blog</span>

              <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Insights & Stories</h1>

              <p className="mt-3 max-w-2xl text-slate-500 dark:text-slate-400">Ideas, stories and practical knowledge from our team.</p>
            </div>

            <Link href="/admin/blogs/create" className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500">
              + Create Blog
            </Link>
          </div>
        </header>

        {/* Featured */}
        <section className="mb-10">
          <div className="grid overflow-hidden rounded-3xl bg-slate-900 md:grid-cols-2">
            <div className="min-h-[280px] bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-800" />

            <div className="flex flex-col justify-center p-8 md:p-10">
              <span className="mb-4 w-fit rounded-full bg-amber-400 px-3 py-1.5 text-xs font-bold text-amber-950">Featured Article</span>

              <h2 className="text-3xl font-bold text-white">{blogs[0].title}</h2>

              <p className="mt-4 leading-7 text-slate-300">{blogs[0].excerpt}</p>

              <Link href={`/blogs/${blogs[0].id}`} className="mt-6 w-fit rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                Read article →
              </Link>
            </div>
          </div>
        </section>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {["All", "Technology", "Programming", "Career", "Architecture", "Education"].map((category, index) => (
              <button key={category} type="button" className={index === 0 ? "whitespace-nowrap rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white" : "whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"}>
                {category}
              </button>
            ))}
          </div>

          <input type="search" placeholder="Search..." className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white" />
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.slice(1).map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center gap-2">
          <button disabled className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-400 dark:border-slate-800 dark:bg-slate-900">
            ← Previous
          </button>

          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white">1</button>

          <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">2</button>

          <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">Next →</button>
        </div>
      </div>
    </main>
  );
}
