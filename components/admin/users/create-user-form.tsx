"use client";

import createUser from "@/actions/create-user";
import { FormState } from "@/types/user-type";
import { useActionState } from "react";
import CreateUserButton from "./CreateUserButton";

const initialState: FormState = {
  success: false,
  message: "",
  errors: {},
};

export default function CreateUserForm() {
  const [state, formAction] = useActionState(createUser, initialState);
  return (
    <form action={formAction} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Name
        </label>

        <input id="name" name="name" type="text" placeholder="Ali Valiyev" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        {state.errors?.name?.map((error) => (
          <p className="mt-1 text-red-500" key={error}>
            {error}
          </p>
        ))}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Email
        </label>

        <input id="email" name="email" type="email" placeholder="ali@example.com" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        {state.errors?.email?.map((error) => (
          <p className="mt-1 text-red-500" key={error}>
            {error}
          </p>
        ))}
      </div>

      <div>
        <label htmlFor="userName" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
          User name
        </label>

        <input id="userName" name="userName" type="text" placeholder="@ali" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        {state.errors?.userName?.map((error) => (
          <p className="mt-1 text-red-500" key={error}>
            {error}
          </p>
        ))}
      </div>

      <div>
        <label htmlFor="role" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
          Role
        </label>

        <select id="role" name="role" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white">
          <option value="user">User</option>

          <option value="admin">Admin</option>
        </select>
        {state.errors?.role?.map((error) => (
          <p className="mt-1 text-red-500" key={error}>
            {error}
          </p>
        ))}
      </div>

      <div>
        <label htmlFor="bio" className="mb-2 block text-sm font-medium">
          Bio
        </label>

        <textarea id="bio" name="bio" rows={4} placeholder="Bio user" className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white" />
        {state.errors?.bio?.map((error) => (
          <p className="mt-1 text-red-500" key={error}>
            {error}
          </p>
        ))}
      </div>

      <CreateUserButton />
    </form>
  );
}
