"use client";

import { useState } from "react";

const US_STATES: Record<string, string> = {
  AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
  CO: "Colorado", CT: "Connecticut", DE: "Delaware", FL: "Florida", GA: "Georgia",
  HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa",
  KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland",
  MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi",
  MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire",
  NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina",
  ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania",
  RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee",
  TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington",
  WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
};

export default function BreedNotifyForm({
  breedName,
  breedSlug,
}: {
  breedName: string;
  breedSlug: string;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/breed-notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, breed_slug: breedSlug, state: state || undefined }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
        setState("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <svg className="mx-auto h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="mt-3 text-lg font-semibold text-emerald-800">You&apos;re on the list!</p>
        <p className="mt-1 text-sm text-emerald-700">
          We&apos;ll notify you when {breedName} breeders join PawPage{state ? ` in ${US_STATES[state] || state}` : ""}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-3">
      <div className="flex-1">
        <label htmlFor="notify-email" className="block text-sm font-medium text-stone-700 mb-1">
          Email
        </label>
        <input
          id="notify-email"
          type="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-stone-900 shadow-sm placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
        />
      </div>
      <div className="sm:w-44">
        <label htmlFor="notify-state" className="block text-sm font-medium text-stone-700 mb-1">
          State <span className="text-stone-400">(optional)</span>
        </label>
        <select
          id="notify-state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="block w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-stone-900 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
        >
          <option value="">Any state</option>
          {Object.entries(US_STATES).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-lg bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-700 disabled:opacity-50 transition-colors"
      >
        {status === "submitting" ? "Signing up..." : "Notify me"}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-600 sm:absolute sm:mt-1">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
