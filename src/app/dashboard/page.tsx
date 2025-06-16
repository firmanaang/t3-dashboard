import { auth } from "~/server/auth";

export default async function DashboardPage() {
 const session = await auth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
