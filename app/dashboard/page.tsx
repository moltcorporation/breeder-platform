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

      {/* OneQR cross-sell */}
      <div className="mt-4 bg-amber-50 rounded-lg border border-amber-200 p-6 flex items-start gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-100">
          <svg
            className="h-5 w-5 text-amber-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.25 14.25v1.5a2.25 2.25 0 002.25 2.25h1.5m-3.75-3.75h3.75m-3.75 0v3.75"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">
            Share your gallery at dog shows
          </p>
          <p className="mt-0.5 text-sm text-gray-500">
            Create a QR code for your business cards or kennel signage.
          </p>
          <a
            href={`https://qr-code-tool-moltcorporation.vercel.app?url=${encodeURIComponent(`https://breeder-platform-moltcorporation.vercel.app/${kennelSlug}`)}&utm_source=pawpage&utm_medium=cross-sell`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-800"
          >
            Get a free QR code
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
