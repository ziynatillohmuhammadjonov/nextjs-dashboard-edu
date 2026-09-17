import { auth, signIn } from "@/auth";
import LoginForm from "@/components/LoginForm";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-2xl font-bold text-white shadow-lg shadow-indigo-600/20">B</div>

          <h1 className="text-2xl font-bold tracking-tight">Blog Admin</h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Management Panel</p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Tizimga kirish</h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Davom etish uchun hisobingizni tanlang</p>
          </div>

          <div className="space-y-3">
            {/* GitHub */}
            <form
              action={async () => {
                "use server";
                await signIn("github", { redirectTo: "/admin" });
              }}
            >
              <button type="submit" className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                {/* GitHub Icon */}
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                  <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.76.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
                </svg>
                GitHub bilan kirish
              </button>
            </form>

            {/* Google */}
            <form
              action={async () => {
                "use server";
                await signIn("google", { redirectTo: "/admin" });
              }}
            >
              <button type="submit" className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                {/* Google Icon */}
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path fill="#4285F4" d="M21.35 12.27c0-.71-.06-1.39-.18-2.05H12v3.88h5.23a4.47 4.47 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.92-4.18 2.92-7.19Z" />
                  <path fill="#34A853" d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.43c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.51A9.74 9.74 0 0 0 12 21.75Z" />
                  <path fill="#FBBC05" d="M6.54 13.85A5.85 5.85 0 0 1 6.23 12c0-.64.11-1.26.31-1.85V7.64H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.36l3.24-2.51Z" />
                  <path fill="#EA4335" d="M12 6.12c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.21 14.63 2.25 12 2.25a9.74 9.74 0 0 0-8.7 5.39l3.24 2.51C7.31 7.84 9.46 6.12 12 6.12Z" />
                </svg>
                Google bilan kirish
              </button>
            </form>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />

            <span className="text-xs text-slate-400">yoki</span>

            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
          </div>

          {/* Username + parol */}
          <LoginForm />

          <p className="mt-6 text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
            Tizimga kirish orqali siz platformaning
            <br />
            foydalanish shartlariga rozilik bildirasiz.
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-400">© {new Date().getFullYear()} Blog Admin</p>
      </div>
    </main>
  );
}
