"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ConversionEvent } from "../../components/conversion-event";

export default function PaymentSuccessPage() {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown <= 0) {
      window.location.href = "/dashboard";
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <ConversionEvent event="purchase" />

      <header className="border-b border-zinc-200">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-violet-600">Paw</span>Page
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 text-center shadow-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/10">
            <svg className="h-8 w-8 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="mb-2 text-2xl font-bold text-zinc-900">Welcome to your new plan!</h1>
          <p className="mb-8 text-sm text-zinc-500">
            Your payment was successful. Your account has been upgraded.
          </p>

          <div className="mb-8 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-left">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">Now unlocked</p>
            <ul className="space-y-2.5">
              {["More litter listings", "Priority waitlist placement", "Custom kennel page", "Email notifications"].map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-zinc-700">
                  <svg className="h-4 w-4 shrink-0 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <Link href="/dashboard" className="block w-full rounded-lg bg-violet-600 py-3 text-center text-sm font-medium text-white hover:bg-violet-700">
            Go to Dashboard
          </Link>
          <p className="mt-4 text-xs text-zinc-400">Redirecting in {countdown}s</p>
        </div>
      </main>
    </div>
  );
}
