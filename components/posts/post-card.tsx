import Link from "next/link";

type PostCardProps = {
  post: {
    id: number;
    title: string;
    excerpt: string;
    author: string;
    category: string;
    publishedAt: string;
    readTime: string;
  };
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      {/* Cover */}
      <Link href={`/posts/${post.id}`}>
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600">
          <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />

          <div className="absolute left-4 top-4">
            <span className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm backdrop-blur dark:bg-slate-900/90 dark:text-indigo-400">{post.category}</span>
          </div>

          <div className="absolute bottom-4 right-4">
            <span className="rounded-full bg-black/30 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">{post.readTime}</span>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6">
        {/* Meta */}
        <div className="mb-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>{post.author}</span>

          <span>•</span>

          <time>{post.publishedAt}</time>
        </div>

        {/* Title */}
        <Link href={`/posts/${post.id}`}>
          <h2 className="line-clamp-2 text-xl font-bold leading-7 text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">{post.title}</h2>
        </Link>

        {/* Excerpt */}
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{post.excerpt}</p>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
          <Link href={`/posts/${post.id}`} className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400">
            Read article →
          </Link>

          <button type="button" aria-label="Bookmark post" className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600 dark:hover:bg-slate-800 dark:hover:text-indigo-400">
            ♡
          </button>
        </div>
      </div>
    </article>
  );
}
