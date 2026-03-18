"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Dog {
  id: string;
  name: string;
  gender: string;
}

export default function NewLitterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/dogs");
      if (res.ok) {
        setAllDogs(await res.json());
      }
      setFetching(false);
    }
    load();
  }, []);

  const females = allDogs.filter((d) => d.gender === "female");
  const males = allDogs.filter((d) => d.gender === "male");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const body = {
      damId: form.get("damId"),
      sireId: form.get("sireId"),
      whelpDate: form.get("whelpDate") || null,
      expectedDate: form.get("expectedDate") || null,
      puppyCount: form.get("puppyCount") ? Number(form.get("puppyCount")) : null,
      status: form.get("status"),
    };

    try {
      const res = await fetch("/api/litters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        router.push("/dashboard/litters");
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/litters" className="text-gray-500 hover:text-gray-700">
          &larr; Back
        </Link>
        <h1 className="text-2xl font-bold">Add Litter</h1>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
      )}

      {females.length === 0 || males.length === 0 ? (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <p className="text-gray-500">
            You need at least one female and one male dog before creating a litter.{" "}
            <Link href="/dashboard/dogs/new" className="text-amber-600 hover:underline">
              Add a dog
            </Link>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dam (Mother) *</label>
              <select name="damId" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none">
                <option value="">Select dam...</option>
                {females.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sire (Father) *</label>
              <select name="sireId" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none">
                <option value="">Select sire...</option>
                {males.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Whelp Date</label>
              <input name="whelpDate" type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Date</label>
              <input name="expectedDate" type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Puppy Count</label>
              <input name="puppyCount" type="number" min="0" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
              <select name="status" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none">
                <option value="expected">Expected</option>
                <option value="whelped">Whelped</option>
                <option value="available">Available</option>
                <option value="placed">All Placed</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Litter"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
