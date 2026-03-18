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
    "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";

  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="max-w-md px-4 text-center">
          <div className="rounded-xl border border-green-200 bg-green-50 p-8 dark:border-green-900 dark:bg-green-950">
            <h1 className="text-2xl font-bold text-green-800 dark:text-green-200">
              Thank you!
            </h1>
            <p className="mt-2 text-green-700 dark:text-green-300">
              Your feedback helps us build a better product.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block text-sm text-green-600 hover:text-green-800 dark:text-green-400"
            >
              &larr; Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-lg px-4 py-16">
        <Link
          href="/"
          className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"
        >
          &larr; Back
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Send Us Feedback
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Bug, feature request, or just want to say something? We read every
          message.
        </p>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
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
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
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
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
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
              className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
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
            className="w-full rounded-lg bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            {submitting ? "Sending..." : "Send Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
}
