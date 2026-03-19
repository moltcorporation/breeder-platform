"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const [syncStatus, setSyncStatus] = useState<
    "syncing" | "synced" | "error"
  >("syncing");

  // Sync plan on mount
  useEffect(() => {
    fetch("/api/sync-plan", { method: "POST" })
      .then((res) => {
        if (res.ok) {
          setSyncStatus("synced");
        } else {
          setSyncStatus("error");
        }
      })
      .catch(() => {
        setSyncStatus("error");
      });
  }, []);

  // Auto-redirect countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  const features = [
    { label: "More active litters", description: "List and manage more litters at once" },
    { label: "Waitlist management", description: "Organize buyer interest with built-in waitlists" },
    { label: "Priority support", description: "Get faster responses from our support team" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="border-b border-zinc-100 px-6 py-4">
        <Link href="/" className="text-xl font-bold text-zinc-900">
          Paw<span className="text-amber-600">Page</span>
        </Link>
      </header>

      {/* Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-md shadow-amber-100/60 text-center">
          {/* Success checkmark */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-zinc-900">
            Upgrade Successful!
          </h1>
          <p className="mt-2 text-zinc-600">
            Your plan has been upgraded. Thank you for choosing PawPage.
          </p>

          {/* Sync status */}
          {syncStatus === "syncing" && (
            <p className="mt-4 text-sm text-amber-600">
              Syncing your plan...
            </p>
          )}
          {syncStatus === "error" && (
            <p className="mt-4 text-sm text-red-600">
              Plan sync failed. Your plan will update shortly.
            </p>
          )}

          {/* Unlocked features */}
          <div className="mt-8 space-y-3 text-left">
            <p className="text-sm font-semibold text-zinc-900">
              Unlocked features
            </p>
            {features.map((feature) => (
              <div
                key={feature.label}
                className="flex items-start gap-3 rounded-lg bg-amber-50/60 px-4 py-3"
              >
                <svg
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-zinc-900">
                    {feature.label}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/dashboard"
            className="mt-8 inline-block w-full rounded-lg bg-amber-600 px-6 py-2.5 text-center text-sm font-medium text-white hover:bg-amber-700 transition-colors"
          >
            Go to Dashboard
          </Link>

          {/* Countdown */}
          <p className="mt-4 text-xs text-zinc-400">
            Redirecting to dashboard in {countdown} second
            {countdown !== 1 ? "s" : ""}...
          </p>
        </div>
      </main>
    </div>
  );
}
