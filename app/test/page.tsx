import { db } from "@/lib/db";

async function Page() {
  const result = await db.query("SELECT NOW()");
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Database Connected</h1>

      <p className="mt-4">{result.rows[0].now.toString()}</p>
    </div>
  );
}

export default Page;
