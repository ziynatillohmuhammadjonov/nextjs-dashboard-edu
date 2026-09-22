import deleteUser from "@/actions/delete-user";
import { db } from "@/lib/db";
import { prisma } from "@/lib/prisma";
import { UserType } from "@/types/user-type";
import Link from "next/link";

const users = [
  {
    id: 1,
    name: "Ali Valiyev",
    email: "ali@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Vali Karimov",
    email: "vali@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: 3,
    name: "Hasan Aliyev",
    email: "hasan@example.com",
    role: "User",
    status: "Blocked",
  },
];

export default async function AdminUsersPage() {
  const usersDB = await prisma.user.findMany();
  const dbUsers: UserType[] = usersDB;

  return (
    <main className="min-h-screen bg-slate-50 p-6 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Users
            </h1>

            <p className="mt-1 text-sm text-slate-500">Manage your users.</p>
          </div>

          <Link
            href="/admin/users/create"
            className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
          >
            + Add User
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 p-4 dark:border-slate-800">
            <input
              type="search"
              placeholder="Search users..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-950"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-950">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">
                    User
                  </th>

                  <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">
                    Role
                  </th>

                  <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right font-semibold text-slate-600 dark:text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {dbUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                          {user.name.charAt(0)}
                        </div>

                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {user.name}
                          </p>

                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">{user.role}</td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                        ACTIVE
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/users/update/${user.id}`}
                          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                        >
                          Edit
                        </Link>

                        <form action={deleteUser.bind(null, user.id)}>
                          <button className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-400">
                            Delete
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
