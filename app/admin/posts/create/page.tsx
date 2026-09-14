import Link from "next/link";

export default function CreatePostPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link href="/admin/posts" className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800">
            ←
          </Link>

          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create Post</h1>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Write and publish a new post.</p>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Basic information */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Basic Information</h2>

            <div className="mt-6 space-y-5">
              <div>
                <label htmlFor="title" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Title
                </label>

                <input id="title" name="title" placeholder="Enter post title" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
              </div>

              <div>
                <label htmlFor="slug" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Slug
                </label>

                <input id="slug" name="slug" placeholder="enter-post-slug" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />

                <p className="mt-2 text-xs text-slate-500">URL: /posts/enter-post-slug</p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="category" className="mb-2 block text-sm font-medium">
                    Category
                  </label>

                  <select id="category" name="category" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
                    <option>Next.js</option>
                    <option>React</option>
                    <option>Laravel</option>
                    <option>TypeScript</option>
                    <option>Database</option>
                    <option>DevOps</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="status" className="mb-2 block text-sm font-medium">
                    Status
                  </label>

                  <select id="status" name="status" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
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

            <div className="mt-5 flex aspect-video cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-indigo-400 dark:border-slate-700 dark:bg-slate-950">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-xl dark:bg-indigo-500/10">↑</div>

                <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">Upload cover image</p>

                <p className="mt-1 text-xs text-slate-500">PNG, JPG or WEBP up to 5MB</p>
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Content</h2>

            <div className="mt-5 space-y-5">
              <div>
                <label htmlFor="excerpt" className="mb-2 block text-sm font-medium">
                  Excerpt
                </label>

                <textarea id="excerpt" name="excerpt" rows={3} placeholder="Short description of the post..." className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
              </div>

              <div>
                <label htmlFor="content" className="mb-2 block text-sm font-medium">
                  Content
                </label>

                <textarea id="content" name="content" rows={15} placeholder="Write your post..." className="w-full resize-y rounded-xl border border-slate-200 px-4 py-3 text-sm leading-7 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link href="/admin/posts" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              Cancel
            </Link>

            <button type="submit" className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
              Create Post
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
