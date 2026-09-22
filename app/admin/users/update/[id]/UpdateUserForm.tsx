"use client";

import { useActionState } from "react";
import updateUser, { type UpdateUserState } from "@/actions/update-user";
import AvatarInput from "@/components/admin/users/AvatarInput";
import type { UserType } from "@/types/user-type";
import { redirect } from "next/navigation";

const initialState: UpdateUserState = { success: false };

const labelClass = "mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300";
const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white";

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return <p className="mt-1 text-sm text-red-600">{messages[0]}</p>;
}

export default function UpdateUserForm({ user }: { user: UserType }) {
  const updateWithId = updateUser.bind(null, String(user.id));
  const [state, formAction, isPending] = useActionState(updateWithId, initialState);
  if (state.success) redirect("/admin/users");

  return (
    <form action={formAction} className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input id="name" name="name" type="text" defaultValue={user.name} placeholder="Ali Valiyev" className={inputClass} />
        <FieldError messages={state.errors?.name} />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input id="email" name="email" type="email" defaultValue={user.email} placeholder="ali@example.com" className={inputClass} />
        <FieldError messages={state.errors?.email} />
      </div>

      <div>
        <label htmlFor="userName" className={labelClass}>
          User name
        </label>
        <input id="userName" name="userName" type="text" defaultValue={user.userName} placeholder="@ali" className={inputClass} />
        <FieldError messages={state.errors?.userName} />
      </div>

      <div>
        <label htmlFor="role" className={labelClass}>
          Role
        </label>
        <select id="role" name="role" defaultValue={user.role} className={inputClass}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <FieldError messages={state.errors?.role} />
      </div>

      <div>
        <AvatarInput initialImage={user.avatarUrl} />
        <FieldError messages={state.errors?.avatar} />
      </div>

      <div>
        <label htmlFor="bio" className={labelClass}>
          Bio
        </label>
        <textarea id="bio" name="bio" rows={4} defaultValue={user.bio ?? ""} placeholder="Bio user" className={`${inputClass} resize-none`} />
        <FieldError messages={state.errors?.bio} />
      </div>

      <button type="submit" disabled={isPending} className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50">
        {isPending ? "Saqlanmoqda..." : "Update User"}
      </button>

      {state.message && <p className={`text-sm ${state.success ? "text-green-600" : "text-red-600"}`}>{state.message}</p>}
    </form>
  );
}
