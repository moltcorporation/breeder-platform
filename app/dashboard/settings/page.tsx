"use client";

import { useState, useEffect } from "react";

interface Profile {
  kennelName: string;
  bio: string | null;
  city: string | null;
  state: string | null;
  breeds: string[] | null;
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/profile");
      if (res.ok) {
        setProfile(await res.json());
      } else {
        setError("Failed to load profile");
      }
      setFetching(false);
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const form = new FormData(e.currentTarget);
    const breedsRaw = (form.get("breeds") as string) || "";
    const breeds = breedsRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const body = {
      kennelName: form.get("kennelName"),
      bio: form.get("bio") || null,
      city: form.get("city") || null,
      state: form.get("state") || null,
      breeds,
    };

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setSuccess(true);
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
  if (!profile) return <p className="text-red-600">{error || "Could not load profile"}</p>;

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
          Profile updated successfully.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg border border-gray-200">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kennel Name *</label>
          <input
            name="kennelName"
            required
            defaultValue={profile.kennelName}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            name="bio"
            rows={4}
            defaultValue={profile.bio || ""}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              name="city"
              defaultValue={profile.city || ""}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input
              name="state"
              defaultValue={profile.state || ""}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Breeds</label>
          <input
            name="breeds"
            defaultValue={(profile.breeds || []).join(", ")}
            placeholder="e.g. Golden Retriever, Labrador"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
          />
          <p className="text-xs text-gray-400 mt-1">Separate breeds with commas</p>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-medium disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>

      <div className="mt-10 space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-stone-800 mb-4">Support & Subscription</h2>
          <div className="space-y-3">
            <div>
              <a
                href="https://billing.stripe.com/p/login/test_5kAdUV5drgfm92w144"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium"
              >
                Manage Subscription
                <span className="text-xs">↗</span>
              </a>
              <p className="text-xs text-stone-500 mt-1">Upgrade, downgrade, or cancel your plan</p>
            </div>
            <div>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium"
              >
                Contact Support
              </a>
              <p className="text-xs text-stone-500 mt-1">Email support@pawpage.io for help</p>
            </div>
            <div>
              <a
                href="/feedback"
                className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium"
              >
                Send Feedback
              </a>
              <p className="text-xs text-stone-500 mt-1">Share feature requests or report bugs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
