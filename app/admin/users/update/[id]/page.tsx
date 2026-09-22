import updateUser from "@/actions/update-user";
import AvatarInput from "@/components/admin/users/AvatarInput";
import { prisma } from "@/lib/prisma";
import { UserType } from "@/types/user-type";

export default async function CreateUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const updateUserAction = updateUser.bind(null, id);

  const data = await prisma.user.findUnique({ where: { id: Number(id) } });
  const user: UserType | null = data;
  if (!user) return;
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Update User
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Update user in the system.
          </p>
        </div>

        <form
          action={updateUserAction}
          className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Name
            </label>

            <input
              defaultValue={user?.name}
              id="name"
              name="name"
              type="text"
              placeholder="Ali Valiyev"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Email
            </label>

            <input
              defaultValue={user?.email}
              id="email"
              name="email"
              type="email"
              placeholder="ali@example.com"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="userName"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              User name
            </label>

            <input
              defaultValue={user?.userName}
              id="userName"
              name="userName"
              type="text"
              placeholder="@ali"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Role
            </label>

            <select
              defaultValue={user?.role}
              id="role"
              name="role"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              <option value="user">User</option>

              <option value="admin">Admin</option>
            </select>
          </div>
          <AvatarInput initialImage={user?.avatarUrl} />

          <div>
            <label htmlFor="bio" className="mb-2 block text-sm font-medium">
              Bio
            </label>

            <textarea
              id="bio"
              name="bio"
              rows={4}
              placeholder="Bio user"
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              defaultValue={user?.bio ?? ""}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Update User
          </button>
        </form>
      </div>
    </main>
  );
}
