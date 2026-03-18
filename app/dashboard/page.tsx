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

  // First-run detection: if no dogs and no bio, show onboarding
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

  // Redirect to onboarding if new breeder (no dogs and no bio)
  if (dogCount.value === 0 && !breeder.bio) {
    redirect("/dashboard/onboarding");
  }

  const stats = [
    { label: "Dogs", value: dogCount.value, href: "/dashboard/dogs", empty: "Add your first dog" },
    { label: "Active Litters", value: litterCount.value, href: "/dashboard/litters", empty: "Create a litter" },
    { label: "Applications", value: appCount.value, href: "/dashboard/applications", empty: "Share your gallery link" },
    { label: "Waitlist", value: waitlistCount.value, href: "/dashboard/waitlist", empty: "Approve applications" },
  ];

  const kennelSlug = breeder.kennelName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">
        Welcome back, {breeder.name}!
      </h1>
      <p className="text-gray-500 mb-8">{breeder.kennelName}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm transition-shadow"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            {stat.value > 0 ? (
              <p className="text-3xl font-bold mt-1">{stat.value}</p>
            ) : (
              <p className="text-sm text-gray-400 mt-2">{stat.empty} &rarr;</p>
            )}
          </a>
        ))}
      </div>

      {/* Gallery link quick access */}
      <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
        <p className="text-sm font-medium text-gray-700">Your gallery link</p>
        <p className="mt-1 font-mono text-sm text-gray-500">
          /{kennelSlug}
        </p>
      </div>
    </div>
  );
}
