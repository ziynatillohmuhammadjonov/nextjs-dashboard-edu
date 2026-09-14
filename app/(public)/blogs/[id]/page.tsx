import Link from "next/link";

const blog = {
  id: 1,
  category: "Architecture",
  title: "How to Structure a Production-Ready Next.js Application",
  excerpt: "A practical guide to organizing your Next.js application for scalability, maintainability and clean architecture.",
  author: {
    name: "Ali Valiyev",
    role: "Full Stack Developer",
  },
  date: "September 8, 2026",
  readTime: "12 min read",
};

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="bg-white dark:bg-slate-950">
      {/* Header */}
      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:py-20">
          <Link href="/blogs" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            ← Back to Blogs
          </Link>

          <div className="mt-8">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-purple-50 px-3 py-1.5 text-sm font-semibold text-purple-600 dark:bg-purple-500/10 dark:text-purple-400">{blog.category}</span>

              <span className="text-sm text-slate-400">Featured</span>
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">{blog.title}</h1>

            <p className="mt-6 text-lg leading-8 text-slate-500 dark:text-slate-400">{blog.excerpt}</p>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 font-semibold text-white">AV</div>

              <div>
                <p className="font-semibold">{blog.author.name}</p>

                <div className="mt-1 flex gap-2 text-sm text-slate-500">
                  <span>{blog.author.role}</span>
                  <span>•</span>
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex aspect-[21/9] items-center justify-center rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-slate-950">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">Featured Article</p>

            <p className="mt-3 text-6xl font-bold text-white/20">Architecture</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-6 pb-20">
        <p className="text-xl leading-9 text-slate-600 dark:text-slate-300">Building a production-ready application is not only about writing code that works. The way we organize that code determines how easily the application can grow over time.</p>

        <h2 className="mt-12 text-3xl font-bold">Start with clear boundaries</h2>

        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">A good application should have clear boundaries between presentation, business logic and data access.</p>

        <h2 className="mt-12 text-3xl font-bold">Server Components</h2>

        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">Next.js Server Components allow us to fetch data directly on the server and send only the required UI to the client. This can make applications simpler and more efficient.</p>

        {/* Code */}
        <div className="mt-8 overflow-hidden rounded-2xl bg-slate-950">
          <div className="border-b border-white/10 px-5 py-3 text-xs text-slate-400">app/posts/page.tsx</div>

          <pre className="overflow-x-auto p-6 text-sm leading-7 text-slate-300">
            <code>{`export default async function PostsPage() {
    const posts = await getPosts();

    return (
        <PostList posts={posts} />
    );
}`}</code>
          </pre>
        </div>

        <h2 className="mt-12 text-3xl font-bold">Service and Repository layers</h2>

        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">As the application grows, moving business logic into services and database queries into repositories can make the code easier to maintain and test.</p>

        {/* Share */}
        <div className="mt-12 flex items-center justify-between border-y border-slate-200 py-6 dark:border-slate-800">
          <div>
            <p className="text-sm font-semibold">Share this article</p>

            <p className="mt-1 text-xs text-slate-500">Help other developers discover it.</p>
          </div>

          <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-900">Share</button>
        </div>
      </article>
    </main>
  );
}
