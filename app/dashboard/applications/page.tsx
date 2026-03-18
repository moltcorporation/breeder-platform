import { db } from "@/db";
import { applications, kennels } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { StatusButton } from "./status-button";

export const metadata = {
  title: "Applications — Breeder Dashboard",
};

export default async function ApplicationsPage({
  searchParams,
}: {
  searchParams: Promise<{ kennel?: string }>;
}) {
  const { kennel: kennelSlug } = await searchParams;

  if (!kennelSlug) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <p className="text-zinc-500">
          Missing kennel parameter. Use ?kennel=your-slug
        </p>
      </div>
    );
  }

  const kennel = await db
    .select()
    .from(kennels)
    .where(eq(kennels.slug, kennelSlug))
    .then((rows) => rows[0]);

  if (!kennel) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <p className="text-zinc-500">Kennel not found.</p>
      </div>
    );
  }

  const apps = await db
    .select()
    .from(applications)
    .where(eq(applications.kennelId, kennel.id))
    .orderBy(desc(applications.createdAt));

  const statusColors: Record<string, string> = {
    pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    approved:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    waitlisted:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Applications
            </h1>
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">
              {kennel.name} — {apps.length} application
              {apps.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {apps.length === 0 ? (
          <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-zinc-500 dark:text-zinc-400">
              No applications yet. Share your application link:
            </p>
            <code className="mt-2 block text-sm text-zinc-700 dark:text-zinc-300">
              /{kennelSlug}/apply
            </code>
          </div>
        ) : (
          <div className="space-y-4">
            {apps.map((app) => (
              <div
                key={app.id}
                className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                      {app.name}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {app.email} · {app.phone}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[app.status]}`}
                  >
                    {app.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      Housing
                    </span>
                    <p className="text-zinc-900 dark:text-zinc-100">
                      {app.housingType}
                      {app.hasYard ? ", yard" : ""}
                      {app.hasFence ? " (fenced)" : ""}
                    </p>
                  </div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      Household
                    </span>
                    <p className="text-zinc-900 dark:text-zinc-100">
                      {app.adults} adult{app.adults !== 1 ? "s" : ""}
                      {app.childrenAges ? `, kids: ${app.childrenAges}` : ""}
                    </p>
                  </div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      Schedule
                    </span>
                    <p className="text-zinc-900 dark:text-zinc-100">
                      {app.workSchedule}
                    </p>
                  </div>
                  <div>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      Experience
                    </span>
                    <p className="text-zinc-900 dark:text-zinc-100">
                      {app.breedExperience.replace(/_/g, " ")}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    Why this breed?
                  </span>
                  <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                    {app.whyThisBreed}
                  </p>
                </div>

                {app.otherPets && (
                  <div className="mt-2">
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      Other pets
                    </span>
                    <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                      {app.otherPets}
                    </p>
                  </div>
                )}

                {(app.vetName || app.vetPhone) && (
                  <div className="mt-2">
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      Vet reference
                    </span>
                    <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                      {app.vetName}
                      {app.vetPhone ? ` · ${app.vetPhone}` : ""}
                    </p>
                  </div>
                )}

                {app.notes && (
                  <div className="mt-2">
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      Notes
                    </span>
                    <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                      {app.notes}
                    </p>
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  <StatusButton
                    applicationId={app.id}
                    status="approved"
                    current={app.status}
                  />
                  <StatusButton
                    applicationId={app.id}
                    status="waitlisted"
                    current={app.status}
                  />
                  <StatusButton
                    applicationId={app.id}
                    status="rejected"
                    current={app.status}
                  />
                </div>

                <p className="mt-3 text-xs text-zinc-400">
                  Applied{" "}
                  {app.createdAt
                    ? new Date(app.createdAt).toLocaleDateString()
                    : "recently"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
