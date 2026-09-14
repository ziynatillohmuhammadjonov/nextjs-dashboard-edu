import Link from "next/link";

type BlogCardProps = {
  blog: {
    id: number;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    publishedAt: string;
    featured?: boolean;
  };
};

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      {/* Image */}
      <Link href={`/blogs/${blog.id}`}>
        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-slate-700 via-indigo-700 to-violet-700">
          <div className="absolute inset-0 bg-black/20 transition group-hover:bg-black/5" />

          {blog.featured && (
            <div className="absolute left-4 top-4">
              <span className="rounded-full bg-amber-400 px-3 py-1.5 text-xs font-bold text-amber-950 shadow-sm">Featured</span>
            </div>
          )}

          <div className="absolute bottom-4 left-4">
            <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-indigo-700 backdrop-blur dark:bg-slate-900/90 dark:text-indigo-400">{blog.category}</span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>{blog.author}</span>

          <span>•</span>

          <time>{blog.publishedAt}</time>
        </div>

        <Link href={`/blogs/${blog.id}`}>
          <h2 className="mt-3 line-clamp-2 text-xl font-bold leading-7 text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">{blog.title}</h2>
        </Link>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{blog.excerpt}</p>

        <div className="mt-6">
          <Link href={`/blogs/${blog.id}`} className="inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            Continue reading
            <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
