"use client";

import { useState } from "react";

const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-4" noValidate={false}>
      {/* Username */}
      <div className="space-y-1.5">
        <label htmlFor="username" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Foydalanuvchi nomi
        </label>
        <input id="username" name="username" type="text" autoComplete="username" placeholder="admin" required minLength={3} className={inputClass} />
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Parol
        </label>
        <div className="relative">
          <input id="password" name="password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Kamida 6 ta belgi" required minLength={6} className={`${inputClass} pr-20`} />
          <button type="button" onClick={() => setShowPassword((v) => !v)} aria-pressed={showPassword} className="absolute inset-y-0 right-2 my-auto h-8 rounded-lg px-3 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-indigo-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200">
            {showPassword ? "Yashirish" : "Ko'rsatish"}
          </button>
        </div>
      </div>

      {/* Xato xabari */}
      {/* {errorMessage && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
          {errorMessage}
        </p>
      )} */}

      {/* Submit */}
      {/* <button type="submit" disabled={isPending} className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 dark:shadow-none">
        {isPending && (
          <svg className="h-4 w-4 animate-spin motion-reduce:animate-none" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.3" strokeWidth="4" />
            <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          </svg>
        )}
        {isPending ? "Tekshirilmoqda..." : "Kirish"}
      </button> */}
      <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 dark:shadow-none">
        Kirish
      </button>
    </form>
  );
}
