import { UserCard } from "@/components/users/user-card";

const users = [
  {
    id: 1,
    name: "Ali Valiyev",
    email: "ali@example.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Vali Karimov",
    email: "vali@example.com",
    role: "User",
  },
  {
    id: 3,
    name: "Hasan Aliyev",
    email: "hasan@example.com",
    role: "User",
  },
];

export default function UsersPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Users</h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">Manage registered users.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </main>
  );
}
