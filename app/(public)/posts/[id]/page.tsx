import Link from "next/link";

const post = {
  id: 1,
  category: "Next.js",
  title: "Understanding Server Actions in Next.js",
  excerpt: "Learn how Server Actions simplify form submissions, validation and database mutations in modern Next.js applications.",
  author: {
    name: "Ali Valiyev",
    role: "Full Stack Developer",
  },
  date: "September 10, 2026",
  readTime: "8 min read",
  content: [
    {
      title: "What are Server Actions?",
      paragraphs: ["Server Actions are asynchronous functions that execute on the server. They allow us to perform server-side mutations directly from React components and forms.", "Instead of creating a separate API endpoint for every simple mutation, we can call a Server Action directly from a form."],
    },
    {
      title: "Why Server Actions are useful",
      paragraphs: ["One of the biggest advantages is that we can keep database-related operations on the server while providing a simple interface to the client.", "This makes forms easier to build and reduces the amount of boilerplate code required for traditional API-based mutations."],
    },
    {
      title: "Server Action architecture",
      paragraphs: ["In a small application, a Server Action can validate the input and write directly to the database.", "In a larger application, we can introduce Service and Repository layers between the Server Action and the database."],
    },
  ],
};

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="bg-white dark:bg-slate-950">
      {/* Hero */}
      <section className="border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:py-20">
          <Link href="/posts" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            ← Back to Posts
          </Link>

          <div className="mt-8">
            <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">{post.category}</span>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">{post.title}</h1>

            <p className="mt-6 text-lg leading-8 text-slate-500 dark:text-slate-400">{post.excerpt}</p>

            {/* Author */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">AV</div>

              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{post.author.name}</p>

                <div className="mt-1 flex gap-2 text-sm text-slate-500">
                  <span>{post.author.role}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover */}
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex aspect-[16/7] items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-slate-900 shadow-xl">
          <span className="text-7xl font-bold text-white/20">{post.category}</span>
        </div>
      </div>

      {/* Article */}
      <article className="mx-auto max-w-3xl px-6 pb-20">
        {post.content.map((section) => (
          <section key={section.title} className="mt-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{section.title}</h2>

            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        {/* Tags */}
        <div className="mt-12 flex flex-wrap gap-2 border-t border-slate-200 pt-8 dark:border-slate-800">
          {["Next.js", "React", "Server Actions", "PostgreSQL"].map((tag) => (
            <span key={tag} className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600 dark:bg-slate-900 dark:text-slate-400">
              #{tag}
            </span>
          ))}
        </div>
      </article>

      {/* Bottom CTA */}
      <section className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold">Enjoyed this article?</h2>

              <p className="mt-1 text-sm text-slate-500">Explore more practical programming articles.</p>
            </div>

            <Link href="/posts" className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500">
              More Posts →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
