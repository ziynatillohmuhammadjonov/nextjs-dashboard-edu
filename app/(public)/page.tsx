import Link from "next/link";

const featuredPosts = [
  {
    id: 1,
    category: "Next.js",
    title: "Understanding Server Actions in Next.js",
    description: "Learn how Server Actions simplify form submissions, validation and database mutations in modern Next.js applications.",
    author: "Ali Valiyev",
    date: "Sep 10, 2026",
    readTime: "8 min read",
  },
  {
    id: 2,
    category: "Laravel",
    title: "Building Production-Ready Laravel Applications",
    description: "Learn how to structure Laravel applications with services, repositories, DTOs and clean architecture.",
    author: "Vali Karimov",
    date: "Sep 8, 2026",
    readTime: "12 min read",
  },
  {
    id: 3,
    category: "TypeScript",
    title: "TypeScript Generics Explained",
    description: "Understand generics from the basics and learn how they make your applications safer and more reusable.",
    author: "Hasan Aliyev",
    date: "Sep 5, 2026",
    readTime: "7 min read",
  },
];

const categories = [
  {
    name: "Next.js",
    count: 24,
    description: "React framework and full-stack development",
  },
  {
    name: "React",
    count: 32,
    description: "Modern UI development and patterns",
  },
  {
    name: "Laravel",
    count: 28,
    description: "Backend development with PHP",
  },
  {
    name: "TypeScript",
    count: 19,
    description: "Type-safe JavaScript development",
  },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.12),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">Learn. Build. Share.</span>

            <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl dark:text-white">
              Ideas, knowledge and
              <span className="text-indigo-600 dark:text-indigo-400"> practical code.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-500 dark:text-slate-400">Explore practical articles about web development, programming, software architecture and modern technologies.</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/posts" className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500">
                Explore Posts
                <span className="ml-2">→</span>
              </Link>

              <Link href="/blogs" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800">
                Read Our Blog
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">100+</p>

              <p className="mt-1 text-sm text-slate-500">Articles</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">20+</p>

              <p className="mt-1 text-sm text-slate-500">Authors</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">12</p>

              <p className="mt-1 text-sm text-slate-500">Categories</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">50K+</p>

              <p className="mt-1 text-sm text-slate-500">Readers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="bg-slate-50 px-6 py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Featured</span>

              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Featured Posts</h2>

              <p className="mt-2 text-slate-500 dark:text-slate-400">Our latest and most useful articles.</p>
            </div>

            <Link href="/posts" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              View all posts →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <article key={post.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
                {/* Image */}
                <Link href={`/posts/${post.id}`}>
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600">
                    <div className="absolute inset-0 bg-black/10 transition group-hover:bg-transparent" />

                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-indigo-700 backdrop-blur dark:bg-slate-900/90 dark:text-indigo-400">{post.category}</span>
                  </div>
                </Link>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <Link href={`/posts/${post.id}`}>
                    <h3 className="mt-3 line-clamp-2 text-xl font-bold text-slate-900 transition group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">{post.title}</h3>
                  </Link>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{post.description}</p>

                  <Link href={`/posts/${post.id}`} className="mt-5 inline-flex text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                    Read article →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-slate-200 bg-white px-6 py-16 dark:border-slate-800 dark:bg-slate-900/30">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Explore</span>

            <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Browse by Category</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link key={category.name} href={`/posts?category=${category.name.toLowerCase()}`} className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-indigo-200 hover:bg-indigo-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-indigo-500/30 dark:hover:bg-indigo-500/5">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 font-bold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">{category.name.charAt(0)}</div>

                  <span className="text-xs font-medium text-slate-400">{category.count} posts</span>
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">{category.name}</h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{category.description}</p>

                <span className="mt-4 inline-block text-sm font-semibold text-indigo-600 dark:text-indigo-400">Explore →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blogs */}
      <section className="bg-slate-50 px-6 py-16 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">From the Blog</span>

              <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Latest Stories</h2>
            </div>

            <Link href="/blogs" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
              View all →
            </Link>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            <Link href="/blogs/1" className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Technology</span>

              <h3 className="mt-3 text-xl font-bold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">The Future of Full Stack Development</h3>

              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">How modern frameworks, AI and cloud infrastructure are changing software development.</p>

              <span className="mt-5 block text-sm font-semibold text-indigo-600 dark:text-indigo-400">Read story →</span>
            </Link>

            <Link href="/blogs/2" className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Database</span>

              <h3 className="mt-3 text-xl font-bold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">Why PostgreSQL Is Still a Great Choice</h3>

              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">Discover the features that make PostgreSQL one of the most powerful relational databases.</p>

              <span className="mt-5 block text-sm font-semibold text-indigo-600 dark:text-indigo-400">Read story →</span>
            </Link>

            <Link href="/blogs/3" className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Career</span>

              <h3 className="mt-3 text-xl font-bold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">Building Better Developer Habits</h3>

              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">Small engineering habits that can improve productivity and code quality.</p>

              <span className="mt-5 block text-sm font-semibold text-indigo-600 dark:text-indigo-400">Read story →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl bg-indigo-600 px-8 py-12 text-center sm:px-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to learn something new?</h2>

            <p className="mx-auto mt-4 max-w-2xl text-indigo-100">Explore our latest articles and discover practical knowledge you can use in your next project.</p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/posts" className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50">
                Explore Posts
              </Link>

              <Link href="/blogs" className="rounded-xl border border-indigo-400 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500">
                Read Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
