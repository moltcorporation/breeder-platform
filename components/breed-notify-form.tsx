"use client";

import { useState } from "react";

interface BreedNotifyFormProps {
  breedName: string;
  breedSlug: string;
}

export default function BreedNotifyForm({ breedName, breedSlug }: BreedNotifyFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/breed-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          breedSlug,
          state: data.get("state") || undefined,
          zip: data.get("zip") || undefined,
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Something went wrong");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-stone-800">You&apos;re on the list!</h3>
        <p className="mt-1 text-sm text-stone-600">
          We&apos;ll email you when {breedName} breeders join PawPage near you.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50/50 to-white p-6 sm:p-8">
      <h3 className="text-lg font-semibold text-stone-800">
        Get notified when {breedName} breeders join near you
      </h3>
      <p className="mt-1 text-sm text-stone-500">
        Be first to know when verified breeders list {breedName} puppies on PawPage.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <div>
          <input
            type="email"
            name="email"
            required
            placeholder="Your email address"
            className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            name="state"
            placeholder="State (e.g. CA)"
            maxLength={2}
            className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
          <input
            type="text"
            name="zip"
            placeholder="ZIP code"
            maxLength={5}
            className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-amber-200 hover:bg-amber-700 disabled:opacity-50"
        >
          {submitting ? "Signing up..." : "Notify me"}
        </button>

        <p className="text-center text-xs text-stone-400">No spam. Unsubscribe anytime.</p>
      </form>
    </div>
  );
}
