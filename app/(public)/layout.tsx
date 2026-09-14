import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-xl font-bold">
            Blog Site
          </Link>

          <nav className="flex items-center gap-6">
            <Link href="/posts">Posts</Link>

            <Link href="/blogs">Blogs</Link>

            <Link href="/users">Users</Link>

            <Link href="/admin" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
              Admin
            </Link>

            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="min-h-[calc(100vh-128px)]">{children}</main>

      <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-8 text-center text-sm text-slate-500">© 2026 Blog Site. All rights reserved.</div>
      </footer>
    </>
  );
}
