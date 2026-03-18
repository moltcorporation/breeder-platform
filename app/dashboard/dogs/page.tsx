export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { dogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import Link from "next/link";
import { DeleteDogButton } from "./delete-button";

export default async function DogsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const allDogs = await db
    .select()
    .from(dogs)
    .where(eq(dogs.breederId, session.breederId))
    .orderBy(dogs.createdAt);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dogs</h1>
        <Link
          href="/dashboard/dogs/new"
          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm font-medium"
        >
          + Add Dog
        </Link>
      </div>

      {allDogs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No dogs yet. Add your first dog to get started.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Breed</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Gender</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Color</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allDogs.map((dog) => (
                <tr key={dog.id} className="hover:bg-stone-50">
                  <td className="px-4 py-3 font-medium">{dog.name}</td>
                  <td className="px-4 py-3 text-gray-600">{dog.breed}</td>
                  <td className="px-4 py-3 text-gray-600 capitalize">{dog.gender}</td>
                  <td className="px-4 py-3 text-gray-600">{dog.color}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        dog.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {dog.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Link
                      href={`/dashboard/dogs/${dog.id}/edit`}
                      className="text-amber-600 hover:text-amber-800 font-medium"
                    >
                      Edit
                    </Link>
                    <DeleteDogButton id={dog.id} name={dog.name} />
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
