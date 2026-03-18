export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { applications } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import { ApproveButton } from "./approve-button";

export default async function ApplicationsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const apps = await db
    .select()
    .from(applications)
    .where(eq(applications.breederId, session.breederId))
    .orderBy(desc(applications.createdAt));

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Applications</h1>

      {apps.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No applications yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {apps.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-lg border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{app.applicantName}</h3>
                  <p className="text-sm text-gray-500">
                    {app.email}
                    {app.phone ? ` · ${app.phone}` : ""}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[app.status] || "bg-gray-100 text-gray-800"}`}
                >
                  {app.status}
                </span>
              </div>

              {app.experience && (
                <div className="mt-3">
                  <span className="text-sm text-gray-500">Experience</span>
                  <p className="text-sm">{app.experience}</p>
                </div>
              )}
              {app.livingSituation && (
                <div className="mt-2">
                  <span className="text-sm text-gray-500">
                    Living situation
                  </span>
                  <p className="text-sm">{app.livingSituation}</p>
                </div>
              )}
              {app.preferences && (
                <div className="mt-2">
                  <span className="text-sm text-gray-500">Preferences</span>
                  <p className="text-sm">{app.preferences}</p>
                </div>
              )}

              <div className="mt-4 flex items-center gap-3">
                {app.status === "pending" && (
                  <ApproveButton applicationId={app.id} />
                )}
                <span className="text-xs text-gray-400">
                  Applied{" "}
                  {new Date(app.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
