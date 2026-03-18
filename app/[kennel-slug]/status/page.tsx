export const dynamic = "force-dynamic";

import { db } from "@/db";
import { breeders, applications, waitlist, puppies } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import Link from "next/link";

export default async function StatusPage({
  params,
  searchParams,
}: {
  params: Promise<{ "kennel-slug": string }>;
  searchParams: Promise<{ email?: string }>;
}) {
  const { "kennel-slug": kennelSlug } = await params;
  const { email } = await searchParams;

  // Find breeder by kennel name slug
  const allBreeders = await db.select().from(breeders);
  const breeder = allBreeders.find(
    (b) =>
      b.kennelName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") === kennelSlug
  );

  if (!breeder) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50">
        <p className="text-zinc-500">Breeder not found.</p>
      </div>
    );
  }

  // If no email, show the lookup form
  if (!email) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto max-w-md px-4 py-16">
          <Link
            href={`/${kennelSlug}`}
            className="text-sm text-zinc-500 hover:text-zinc-700"
          >
            &larr; Back to {breeder.kennelName}
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Check Your Application Status
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Enter the email you used when you applied.
          </p>
          <form className="mt-6" action={`/${kennelSlug}/status`} method="GET">
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900"
            />
            <button
              type="submit"
              className="mt-3 w-full rounded-lg bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900"
            >
              Check Status
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Look up application by email
  const [app] = await db
    .select()
    .from(applications)
    .where(
      and(
        eq(applications.breederId, breeder.id),
        eq(applications.email, email)
      )
    );

  if (!app) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto max-w-md px-4 py-16">
          <Link
            href={`/${kennelSlug}`}
            className="text-sm text-zinc-500 hover:text-zinc-700"
          >
            &larr; Back to {breeder.kennelName}
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Application Not Found
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            No application found for {email} at {breeder.kennelName}. Double
            check the email address or{" "}
            <Link
              href={`/${kennelSlug}/apply`}
              className="text-zinc-900 underline dark:text-zinc-100"
            >
              submit a new application
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }

  // Check if on waitlist
  const [waitlistEntry] = await db
    .select()
    .from(waitlist)
    .where(eq(waitlist.applicationId, app.id));

  // Check if matched to puppy
  let matchedPuppy = null;
  if (waitlistEntry?.puppyId) {
    const [pup] = await db
      .select()
      .from(puppies)
      .where(eq(puppies.id, waitlistEntry.puppyId));
    matchedPuppy = pup;
  }

  const statusDisplay: Record<string, { label: string; color: string; description: string }> = {
    pending: {
      label: "Under Review",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      description: "Your application is being reviewed by the breeder.",
    },
    approved: {
      label: "Approved",
      color: "bg-green-100 text-green-800 border-green-200",
      description: "Your application has been approved! You've been added to the waitlist.",
    },
    rejected: {
      label: "Not Selected",
      color: "bg-red-100 text-red-800 border-red-200",
      description: "Unfortunately, your application was not selected at this time.",
    },
  };

  const appStatus = statusDisplay[app.status] || statusDisplay.pending;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-md px-4 py-16">
        <Link
          href={`/${kennelSlug}`}
          className="text-sm text-zinc-500 hover:text-zinc-700"
        >
          &larr; Back to {breeder.kennelName}
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Your Application Status
        </h1>
        <p className="mt-1 text-sm text-zinc-500">{breeder.kennelName}</p>

        <div
          className={`mt-6 rounded-xl border p-6 ${appStatus.color}`}
        >
          <p className="text-lg font-semibold">{appStatus.label}</p>
          <p className="mt-1 text-sm opacity-80">{appStatus.description}</p>
        </div>

        {waitlistEntry && (
          <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">
              Waitlist Position
            </h2>
            <p className="mt-2 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
              #{waitlistEntry.position}
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              {waitlistEntry.status === "matched"
                ? "You've been matched with a puppy!"
                : waitlistEntry.status === "completed"
                  ? "Congratulations — your puppy journey is complete!"
                  : "We'll notify you when a puppy is available."}
            </p>

            {matchedPuppy && (
              <div className="mt-4 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Your puppy
                </p>
                <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {matchedPuppy.name}
                </p>
                <p className="text-sm text-zinc-500">
                  {matchedPuppy.gender} · {matchedPuppy.color}
                </p>
              </div>
            )}
          </div>
        )}

        <p className="mt-6 text-xs text-zinc-400">
          Applied {new Date(app.createdAt).toLocaleDateString()} · {email}
        </p>
      </div>
    </div>
  );
}
