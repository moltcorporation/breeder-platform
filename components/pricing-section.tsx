"use client";

import { useState } from "react";
import { CheckoutLink } from "@/components/checkout-link";

function PawPrintIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <ellipse cx="8" cy="7" rx="2.2" ry="2.8" />
      <ellipse cx="16" cy="7" rx="2.2" ry="2.8" />
      <ellipse cx="5" cy="13" rx="2" ry="2.5" />
      <ellipse cx="19" cy="13" rx="2" ry="2.5" />
      <path d="M12 22c-4 0-6-3-6-5.5S9 12 12 12s6 2 6 4.5S16 22 12 22z" />
    </svg>
  );
}

function HeartIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

interface PricingSectionProps {
  basicMonthlyUrl: string;
  basicAnnualUrl: string;
  proMonthlyUrl: string;
  proAnnualUrl: string;
}

export function PricingSection({
  basicMonthlyUrl,
  basicAnnualUrl,
  proMonthlyUrl,
  proAnnualUrl,
}: PricingSectionProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  const tiers = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for your first litter",
      features: ["1 active litter", "Gallery page", "Application forms"],
      cta: "Start Free",
      ctaHref: "/register",
      highlighted: false,
      paid: false,
    },
    {
      name: "Basic",
      price: isAnnual ? "$12" : "$15",
      period: "/mo",
      description: "For growing kennels",
      features: [
        "3 active litters",
        "Everything in Free",
        "Waitlist management",
        "Priority support",
      ],
      cta: isAnnual ? "Start Basic — $12/mo" : "Start Basic",
      ctaHref: isAnnual ? (basicAnnualUrl || basicMonthlyUrl) : basicMonthlyUrl,
      highlighted: false,
      paid: true,
    },
    {
      name: "Pro",
      price: isAnnual ? "$24" : "$29",
      period: "/mo",
      description: "For established breeders",
      features: [
        "Unlimited litters",
        "Everything in Basic",
      ],
      cta: isAnnual ? "Start Pro — $24/mo" : "Start Pro",
      ctaHref: isAnnual ? (proAnnualUrl || proMonthlyUrl) : proMonthlyUrl,
      highlighted: true,
      paid: true,
    },
  ];

  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-amber-700">
            <HeartIcon className="h-5 w-5" />
            Pricing
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-stone-600">
            Start free, upgrade when you&apos;re ready. No contracts, cancel anytime.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className={`text-sm font-medium ${!isAnnual ? "text-stone-800" : "text-stone-400"}`}>Monthly</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isAnnual ? "bg-amber-600" : "bg-stone-300"}`}
            aria-label="Toggle annual billing"
          >
            <span className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${isAnnual ? "translate-x-6" : "translate-x-1"}`} />
          </button>
          <span className={`text-sm font-medium ${isAnnual ? "text-stone-800" : "text-stone-400"}`}>Annual</span>
          {isAnnual && (
            <span className="rounded-full bg-green-700 px-2 py-0.5 text-xs font-semibold text-white">
              Save 17–20%
            </span>
          )}
        </div>

        <div className="relative mt-10 grid gap-8 sm:grid-cols-3">
          {/* Decorative paw prints between cards (desktop only) */}
          <div className="pointer-events-none absolute left-1/3 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-amber-200/50 sm:block">
            <PawPrintIcon className="h-10 w-10 -rotate-12" />
          </div>
          <div className="pointer-events-none absolute left-2/3 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-amber-200/50 sm:block">
            <PawPrintIcon className="h-10 w-10 rotate-12" />
          </div>

          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
                tier.highlighted
                  ? "border-amber-300 bg-gradient-to-b from-amber-50 to-white shadow-xl shadow-amber-100/50 ring-2 ring-amber-300"
                  : "border-[#D1D5C8] bg-white shadow-sm hover:shadow-md hover:shadow-amber-100/30"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-green-700 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-stone-800">
                {tier.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-stone-800">
                  {tier.price}
                </span>
                <span className="text-sm text-stone-500">{tier.period}</span>
              </div>
              {tier.paid && isAnnual && (
                <p className="mt-1 text-xs text-green-700">
                  {tier.name === "Basic" ? "$144/yr — save $36" : "$288/yr — save $60"}
                </p>
              )}
              <p className="mt-2 text-sm text-stone-500">{tier.description}</p>
              <ul className="mt-8 space-y-3.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-stone-700">
                    <PawPrintIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    {f}
                  </li>
                ))}
              </ul>
              {tier.ctaHref.startsWith("/") ? (
                <a
                  href={tier.ctaHref}
                  className={`mt-8 block rounded-full px-6 py-3 text-center text-sm font-semibold transition-all duration-300 ${
                    tier.highlighted
                      ? "bg-amber-600 text-white shadow-md shadow-amber-200/50 hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-200/60"
                      : "bg-stone-100 text-stone-800 hover:bg-amber-50 hover:text-amber-800"
                  }`}
                >
                  {tier.cta}
                </a>
              ) : (
                <CheckoutLink
                  href={tier.ctaHref}
                  plan={`${tier.name.toLowerCase()}${isAnnual ? "_annual" : ""}`}
                  source="homepage_pricing"
                  className={`mt-8 block rounded-full px-6 py-3 text-center text-sm font-semibold transition-all duration-300 ${
                    tier.highlighted
                      ? "bg-amber-600 text-white shadow-md shadow-amber-200/50 hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-200/60"
                      : "bg-stone-100 text-stone-800 hover:bg-amber-50 hover:text-amber-800"
                  }`}
                >
                  {tier.cta}
                </CheckoutLink>
              )}
              {tier.paid && (
                <div className="mt-3 space-y-1 text-center">
                  <p className="text-xs font-medium text-green-700">
                    7-day money-back guarantee
                  </p>
                  <p className="text-xs text-stone-400">Cancel anytime</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
