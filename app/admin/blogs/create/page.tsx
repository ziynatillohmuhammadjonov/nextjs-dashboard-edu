import Link from "next/link";

export default function CreateBlogPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link href="/admin/blogs" className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
            ←
          </Link>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create Blog</h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Create a new blog article.</p>
          </div>
        </div>

        <form className="space-y-6">
          {/* General */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">General Information</h2>

            <div className="mt-6 space-y-5">
              <div>
                <label htmlFor="title" className="mb-2 block text-sm font-medium">
                  Title
                </label>

                <input id="title" name="title" placeholder="Enter blog title" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
              </div>

              <div>
                <label htmlFor="slug" className="mb-2 block text-sm font-medium">
                  Slug
                </label>

                <input id="slug" name="slug" placeholder="my-blog-article" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="category" className="mb-2 block text-sm font-medium">
                    Category
                  </label>

                  <select id="category" name="category" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white">
                    <option>Technology</option>

                    <option>Programming</option>

                    <option>Career</option>

                    <option>Architecture</option>

                    <option>Education</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="status" className="mb-2 block text-sm font-medium">
                    Status
                  </label>

                  <select id="status" name="status" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-white">
                    <option value="draft">Draft</option>

                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Cover */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Cover Image</h2>

            <div className="mt-5 flex aspect-[16/8] cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 hover:border-indigo-400 dark:border-slate-700 dark:bg-slate-950">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-xl dark:bg-indigo-500/10">↑</div>

                <p className="mt-4 text-sm font-semibold">Upload cover image</p>

                <p className="mt-1 text-xs text-slate-500">Recommended size: 1600 × 900</p>
              </div>
            </div>
          </section>

          {/* Article */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Article</h2>

            <div className="mt-5 space-y-5">
              <div>
                <label htmlFor="excerpt" className="mb-2 block text-sm font-medium">
                  Excerpt
                </label>

                <textarea id="excerpt" name="excerpt" rows={4} placeholder="Short summary of your article..." className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
              </div>

              <div>
                <label htmlFor="content" className="mb-2 block text-sm font-medium">
                  Content
                </label>

                <textarea id="content" name="content" rows={18} placeholder="Write your article..." className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm leading-7 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
              </div>
            </div>
          </section>

          {/* SEO */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">SEO</h2>

            <div className="mt-5 space-y-5">
              <div>
                <label htmlFor="metaTitle" className="mb-2 block text-sm font-medium">
                  Meta Title
                </label>

                <input id="metaTitle" name="metaTitle" placeholder="SEO title" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
              </div>

              <div>
                <label htmlFor="metaDescription" className="mb-2 block text-sm font-medium">
                  Meta Description
                </label>

                <textarea id="metaDescription" name="metaDescription" rows={3} placeholder="SEO description..." className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link href="/admin/blogs" className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              Cancel
            </Link>

            <button type="submit" className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500">
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
