import { auth, signOut } from "@/-example";
import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";
import { redirect } from "next/navigation";

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: "▦",
  },
  {
    name: "Posts",
    href: "/admin/posts",
    icon: "◫",
  },
  {
    name: "Blogs",
    href: "/admin/blogs",
    icon: "▤",
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: "◎",
  },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // const session = await auth();
  // if (!session?.user) {
  //   redirect("/login");
  // }
  return (
    <div className="min-h-[calc(100vh-128px)] bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:block">
          <div className="sticky top-0 flex h-screen flex-col">
            {/* Logo */}
            <div className="flex h-20 items-center border-b border-slate-200 px-6 py-2 dark:border-slate-800">
              <Link href="/admin" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white">B</div>

                <div>
                  <div className="font-bold">Blog Admin</div>

                  <div className="text-xs text-slate-500">Management Panel</div>
                </div>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4 overflow-y-scroll">
              <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Main Menu</p>

              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-400">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-sm dark:bg-slate-800">{item.icon}</span>

                  {item.name}
                </Link>
              ))}

              <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">System</p>

              <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-400">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">↗</span>
                View Website
              </Link>

              <Link href="/admin/settings" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-indigo-400">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">⚙</span>
                Settings
              </Link>
            </nav>

            {/* User */}
            <div className="border-t border-slate-200 p-4 dark:border-slate-800">
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">A</div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">Admin User</p>

                  <p className="truncate text-xs text-slate-500">admin@example.com</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-6 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
            <div>
              <p className="text-sm text-slate-500">Admin Panel</p>

              <h1 className="text-lg font-semibold">Management Dashboard</h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800">
                🔔
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
              </button>

              <div className="hidden text-right sm:block">
                <p className="text-sm font-semibold">Admin User</p>

                <p className="text-xs text-slate-500">Administrator</p>
              </div>

              <ThemeToggle />
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">A</div>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/login" });
                }}
              >
                <button>Chiqish</button>
              </form>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
