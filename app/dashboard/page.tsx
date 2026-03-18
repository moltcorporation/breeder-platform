export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { breeders, dogs, litters, applications, waitlist } from "@/db/schema";
import { eq, and, count } from "drizzle-orm";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const [breeder] = await db
    .select()
    .from(breeders)
    .where(eq(breeders.id, session.breederId))
    .limit(1);

  if (!breeder) redirect("/login");

  const [dogCount] = await db
    .select({ value: count() })
    .from(dogs)
    .where(eq(dogs.breederId, session.breederId));

  const [litterCount] = await db
    .select({ value: count() })
    .from(litters)
    .where(
      and(
        eq(litters.breederId, session.breederId),
        eq(litters.status, "expected")
      )
    );

  const [appCount] = await db
    .select({ value: count() })
    .from(applications)
    .where(eq(applications.breederId, session.breederId));

  const [waitlistCount] = await db
    .select({ value: count() })
    .from(waitlist)
    .where(eq(waitlist.breederId, session.breederId));

  const stats = [
    { label: "Dogs", value: dogCount.value },
    { label: "Active Litters", value: litterCount.value },
    { label: "Applications", value: appCount.value },
    { label: "Waitlist", value: waitlistCount.value },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">
        Welcome back, {breeder.name}!
      </h1>
      <p className="text-gray-500 mb-8">{breeder.kennelName}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
