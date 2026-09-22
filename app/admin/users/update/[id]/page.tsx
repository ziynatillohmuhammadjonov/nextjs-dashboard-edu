import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import UpdateUserForm from "./UpdateUserForm";

export default async function UpdateUserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const user = await prisma.user.findUnique({ where: { id: Number(id) } });
  if (!user) notFound();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 dark:bg-slate-950">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Update User</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Update user in the system.</p>
        </div>

        <UpdateUserForm user={user} />
      </div>
    </main>
  );
}
