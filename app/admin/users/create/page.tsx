import CreateUserForm from "@/components/admin/users/create-user-form";

export default function CreateUserPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create User</h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Add a new user to the system.</p>
        </div>
        <CreateUserForm />
      </div>
    </main>
  );
}
