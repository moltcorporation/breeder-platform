export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { litters, dogs, puppies } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { DeletePuppyButton } from "./delete-puppy-button";

export default async function LitterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();
  if (!session) redirect("/login");

  const [litter] = await db
    .select()
    .from(litters)
    .where(
      and(eq(litters.id, id), eq(litters.breederId, session.breederId))
    )
    .limit(1);

  if (!litter) notFound();

  const [dam] = await db
    .select({ name: dogs.name })
    .from(dogs)
    .where(eq(dogs.id, litter.damId))
    .limit(1);

  const [sire] = await db
    .select({ name: dogs.name })
    .from(dogs)
    .where(eq(dogs.id, litter.sireId))
    .limit(1);

  const litterPuppies = await db
    .select()
    .from(puppies)
    .where(eq(puppies.litterId, id))
    .orderBy(puppies.createdAt);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/litters" className="text-gray-500 hover:text-gray-700">
          &larr; Back
        </Link>
        <h1 className="text-2xl font-bold">
          {dam?.name || "Unknown"} x {sire?.name || "Unknown"}
        </h1>
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
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500">Whelp Date</p>
          <p className="font-medium">{litter.whelpDate || "TBD"}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500">Expected Date</p>
          <p className="font-medium">{litter.expectedDate || "TBD"}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500">Puppy Count</p>
          <p className="font-medium">{litter.puppyCount ?? "-"}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500">Registered Puppies</p>
          <p className="font-medium">{litterPuppies.length}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Puppies</h2>
        <Link
          href={`/dashboard/litters/${id}/puppies/new`}
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-medium"
        >
          + Add Puppy
        </Link>
      </div>

      {litterPuppies.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No puppies registered yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Gender</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Color</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {litterPuppies.map((puppy) => (
                <tr key={puppy.id} className="hover:bg-stone-50">
                  <td className="px-4 py-3 font-medium">{puppy.name}</td>
                  <td className="px-4 py-3 text-gray-600 capitalize">{puppy.gender}</td>
                  <td className="px-4 py-3 text-gray-600">{puppy.color}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        puppy.status === "available"
                          ? "bg-green-100 text-green-700"
                          : puppy.status === "reserved" || puppy.status === "deposit"
                          ? "bg-amber-100 text-amber-700"
                          : puppy.status === "placed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {puppy.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DeletePuppyButton id={puppy.id} name={puppy.name} />
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
