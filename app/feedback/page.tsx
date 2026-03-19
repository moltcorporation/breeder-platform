"use client";

import { useState } from "react";
import Link from "next/link";

export default function FeedbackPage() {
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
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email") || null,
          category: data.get("category"),
          intent: data.get("intent") || null,
          message: data.get("message"),
          page: typeof window !== "undefined" ? document.referrer : null,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-[#D1D5C8] bg-white px-3 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500";

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(180deg, #FFFBEB 0%, #FFF7ED 100%)" }}>
        <div className="max-w-md px-4 text-center">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 shadow-lg shadow-amber-100/40">
            <h1 className="text-2xl font-bold text-amber-800">
              Thank you!
            </h1>
            <p className="mt-2 text-amber-700">
              Your feedback helps us build a better product.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block text-sm text-amber-600 hover:text-amber-800 transition"
            >
              &larr; Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #FFFBEB 0%, #FFF7ED 40%, #FFFFFF 100%)" }}>
      <div className="mx-auto max-w-lg px-4 py-16">
        <Link
          href="/"
          className="text-sm text-stone-500 hover:text-amber-700 transition"
        >
          &larr; Back
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-stone-800">
          Send Us Feedback
        </h1>
        <p className="mt-2 text-stone-600">
          Bug, feature request, or just want to say something? We read every
          message.
        </p>

        {error && (
          <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-stone-700 mb-1"
            >
              Email (optional)
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="so we can follow up"
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-stone-700 mb-1"
            >
              What kind of feedback?
            </label>
            <select name="category" id="category" required className={inputClass}>
              <option value="general">General</option>
              <option value="bug">Bug report</option>
              <option value="feature">Feature request</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="intent"
              className="block text-sm font-medium text-stone-700 mb-1"
            >
              What were you trying to do?
            </label>
            <input
              type="text"
              name="intent"
              id="intent"
              placeholder="e.g. set up my kennel gallery, manage my waitlist..."
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-stone-700 mb-1"
            >
              Your message *
            </label>
            <textarea
              name="message"
              id="message"
              required
              rows={4}
              placeholder="Tell us what's on your mind..."
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-amber-600 px-4 py-3 text-sm font-medium text-white hover:bg-amber-700 disabled:opacity-50 transition shadow-md shadow-amber-200/50 hover:shadow-lg hover:shadow-amber-200/60"
          >
            {submitting ? "Sending..." : "Send Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}
