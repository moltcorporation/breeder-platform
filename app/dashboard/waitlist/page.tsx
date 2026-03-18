export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { waitlist, applications, puppies } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { redirect } from "next/navigation";
import { WaitlistActions } from "./waitlist-actions";

export default async function WaitlistPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const entries = await db
    .select({
      waitlist: waitlist,
      applicant: applications,
      puppy: puppies,
    })
    .from(waitlist)
    .leftJoin(applications, eq(waitlist.applicationId, applications.id))
    .leftJoin(puppies, eq(waitlist.puppyId, puppies.id))
    .where(eq(waitlist.breederId, session.breederId))
    .orderBy(asc(waitlist.position));

  const statusColors: Record<string, string> = {
    waiting: "bg-yellow-100 text-yellow-800",
    matched: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Waitlist</h1>
      <p className="text-gray-500 mb-6">
        {entries.length} {entries.length === 1 ? "family" : "families"} on the
        waitlist
      </p>

      {entries.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-500">
            No one on the waitlist yet. Approve applications to add families.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map(({ waitlist: entry, applicant, puppy }) => (
            <div
              key={entry.id}
              className="bg-white rounded-lg border border-gray-200 p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-lg font-bold text-gray-600">
                    {entry.position}
                  </span>
                  <div>
                    <h3 className="font-semibold">
                      {applicant?.applicantName || "Unknown"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {applicant?.email}
                      {applicant?.phone ? ` · ${applicant.phone}` : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {puppy && (
                    <span className="text-sm text-gray-600">
                      Matched: {puppy.name} ({puppy.gender}, {puppy.color})
                    </span>
                  )}
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[entry.status] || "bg-gray-100 text-gray-800"}`}
                  >
                    {entry.status}
                  </span>
                </div>
              </div>

              {entry.notes && (
                <p className="mt-2 text-sm text-gray-500 ml-14">
                  {entry.notes}
                </p>
              )}

              <div className="mt-3 ml-14">
                <WaitlistActions
                  waitlistId={entry.id}
                  currentStatus={entry.status}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
