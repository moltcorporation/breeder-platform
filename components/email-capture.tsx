"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const source = searchParams.get("utm_source") || undefined;
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
        return;
      }

      setStatus("success");
      setMessage(data.message || "You're in! We'll keep you posted.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <section className="bg-[#FFFBEB] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-stone-800 sm:text-3xl">
          Join breeders getting gallery updates
        </h2>
        <p className="mt-3 text-stone-600">
          Tips, new features, and breeder stories — delivered to your inbox.
        </p>

        {status === "success" ? (
          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 px-6 py-4 text-amber-800 font-medium">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-full border border-stone-300 bg-white px-5 py-3 text-stone-800 placeholder:text-stone-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 sm:w-80"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-full bg-amber-600 px-8 py-3 font-semibold text-white shadow-md shadow-amber-200/50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-200/60 disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-sm text-red-600">{message}</p>
        )}
      </div>
    </section>
  );
}
