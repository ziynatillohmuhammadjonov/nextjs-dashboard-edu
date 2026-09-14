import Link from "next/link";
import { PostCard } from "@/components/posts/post-card";

const posts = [
  {
    id: 1,
    title: "Understanding Server Actions in Next.js",
    excerpt: "Learn how Server Actions simplify form submissions and database mutations in modern Next.js applications.",
    author: "Ali Valiyev",
    category: "Next.js",
    publishedAt: "Sep 10, 2026",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "Building Production Ready APIs with Laravel",
    excerpt: "A practical guide to structuring Laravel applications using services, repositories and DTOs.",
    author: "Vali Karimov",
    category: "Laravel",
    publishedAt: "Sep 8, 2026",
    readTime: "12 min read",
  },
  {
    id: 3,
    title: "TypeScript Generics Explained",
    excerpt: "Understand TypeScript generics with practical examples and real-world use cases.",
    author: "Hasan Aliyev",
    category: "TypeScript",
    publishedAt: "Sep 5, 2026",
    readTime: "7 min read",
  },
  {
    id: 4,
    title: "PostgreSQL Performance Optimization",
    excerpt: "Learn the most important techniques for improving PostgreSQL query performance.",
    author: "Ali Valiyev",
    category: "Database",
    publishedAt: "Sep 2, 2026",
    readTime: "10 min read",
  },
  {
    id: 5,
    title: "React Server Components",
    excerpt: "A practical introduction to React Server Components and how they change application architecture.",
    author: "Vali Karimov",
    category: "React",
    publishedAt: "Aug 30, 2026",
    readTime: "9 min read",
  },
  {
    id: 6,
    title: "Docker for Full Stack Developers",
    excerpt: "Learn how to containerize a modern full-stack application using Docker and Docker Compose.",
    author: "Hasan Aliyev",
    category: "DevOps",
    publishedAt: "Aug 27, 2026",
    readTime: "14 min read",
  },
];

export default function PostsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Knowledge Base</span>

            <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Posts</h1>

            <p className="mt-3 max-w-2xl text-slate-500 dark:text-slate-400">Practical articles about web development, programming and modern technologies.</p>
          </div>

          <Link href="/admin/posts/create" className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500">
            + Create Post
          </Link>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">⌕</span>

            <input type="search" placeholder="Search posts..." className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white" />
          </div>
        </div>

        {/* Category filters */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {["All", "Next.js", "React", "Laravel", "TypeScript", "Database", "DevOps"].map((category, index) => (
            <button key={category} type="button" className={index === 0 ? "whitespace-nowrap rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white" : "whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:border-indigo-300 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:text-indigo-400"}>
              {category}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-500 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-900" disabled>
            ← Previous
          </button>

          <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white">1</button>

          <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">2</button>

          <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">3</button>

          <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">Next →</button>
        </div>
      </div>
    </main>
  );
}
