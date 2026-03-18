export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { litters, dogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";
import { DeleteLitterButton } from "./delete-button";

export default async function LittersPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const allLitters = await db
    .select({
      id: litters.id,
      damId: litters.damId,
      sireId: litters.sireId,
      whelpDate: litters.whelpDate,
      expectedDate: litters.expectedDate,
      puppyCount: litters.puppyCount,
      status: litters.status,
      createdAt: litters.createdAt,
    })
    .from(litters)
    .where(eq(litters.breederId, session.breederId))
    .orderBy(litters.createdAt);

  // Fetch all breeder's dogs for name lookup
  const allDogs = await db
    .select({ id: dogs.id, name: dogs.name })
    .from(dogs)
    .where(eq(dogs.breederId, session.breederId));

  const dogMap = new Map(allDogs.map((d) => [d.id, d.name]));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Litters</h1>
        <Link
          href="/dashboard/litters/new"
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-medium"
        >
          + Add Litter
        </Link>
      </div>

      {allLitters.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No litters yet. Add your first litter to get started.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Dam</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Sire</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Puppies</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allLitters.map((litter) => (
                <tr key={litter.id} className="hover:bg-stone-50">
                  <td className="px-4 py-3 font-medium">{dogMap.get(litter.damId) || "Unknown"}</td>
                  <td className="px-4 py-3 text-gray-600">{dogMap.get(litter.sireId) || "Unknown"}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {litter.whelpDate || litter.expectedDate || "TBD"}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{litter.puppyCount ?? "-"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        litter.status === "whelped"
                          ? "bg-green-100 text-green-700"
                          : litter.status === "expected"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {litter.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Link
                      href={`/dashboard/litters/${litter.id}`}
                      className="text-amber-600 hover:text-amber-800 font-medium"
                    >
                      View
                    </Link>
                    <DeleteLitterButton id={litter.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
