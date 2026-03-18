"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Dog {
  id: string;
  name: string;
  breed: string;
  gender: string;
  dob: string | null;
  color: string;
  weight: string | null;
  photos: string[] | null;
  isActive: boolean;
}

export default function EditDogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [dog, setDog] = useState<Dog | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/dogs");
      if (res.ok) {
        const dogs: Dog[] = await res.json();
        const found = dogs.find((d) => d.id === id);
        if (found) {
          setDog(found);
        } else {
          setError("Dog not found");
        }
      } else {
        setError("Failed to load dog");
      }
      setFetching(false);
    }
    load();
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const photosRaw = (form.get("photos") as string) || "";
    const photos = photosRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const body = {
      name: form.get("name"),
      breed: form.get("breed"),
      gender: form.get("gender"),
      dob: form.get("dob") || null,
      color: form.get("color"),
      weight: form.get("weight") || null,
      photos,
      isActive: form.get("isActive") === "true",
    };

    try {
      const res = await fetch(`/api/dogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        router.push("/dashboard/dogs");
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

  if (fetching) {
    return <p className="text-gray-500">Loading...</p>;
  }

  if (!dog) {
    return <p className="text-red-600">{error || "Dog not found"}</p>;
  }

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/dogs" className="text-gray-500 hover:text-gray-700">
          &larr; Back
        </Link>
        <h1 className="text-2xl font-bold">Edit {dog.name}</h1>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input name="name" required defaultValue={dog.name} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Breed *</label>
          <input name="breed" required defaultValue={dog.breed} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
            <select name="gender" required defaultValue={dog.gender} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none">
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
            <input name="dob" type="date" defaultValue={dog.dob || ""} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color *</label>
            <input name="color" required defaultValue={dog.color} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
            <input name="weight" defaultValue={dog.weight || ""} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select name="isActive" defaultValue={dog.isActive ? "true" : "false"} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none">
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Photo URLs</label>
          <input name="photos" defaultValue={(dog.photos || []).join(", ")} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none" />
          <p className="text-xs text-gray-400 mt-1">Separate multiple URLs with commas</p>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
