import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Breeder Platform — Beautiful gallery pages & waitlist management for dog breeders",
  description:
    "Beautiful gallery pages, waitlist management, and puppy applications — built for breeders who care about presentation. Free to get started.",
};

// ---------------------------------------------------------------------------
// Shared components
// ---------------------------------------------------------------------------

function Nav() {
  return (
    <nav className="border-b border-stone-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold tracking-tight text-stone-900">
          Breeder Platform
        </Link>
        <div className="flex items-center gap-6">
          <a href="#pricing" className="text-sm font-medium text-stone-600 hover:text-stone-900">
            Pricing
          </a>
          <Link
            href="/login"
            className="text-sm font-medium text-stone-600 hover:text-stone-900"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700"
          >
            Get started free
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function Hero() {
  return (
    <section className="px-4 pb-20 pt-24 text-center sm:px-6 sm:pb-28 sm:pt-32 lg:px-8">
      <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
        Your puppies deserve a better website
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-600 sm:text-xl">
        Beautiful gallery pages, waitlist management, and puppy applications
        &mdash; built for breeders who care about presentation.
      </p>
      <div className="mt-10">
        <Link
          href="/register"
          className="inline-block rounded-full bg-amber-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          Create your free gallery
        </Link>
      </div>
      <p className="mt-4 text-sm text-stone-500">
        Free forever for 1 litter. No credit card required.
      </p>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Problem
// ---------------------------------------------------------------------------

const painPoints = [
  {
    text: "Managing waitlists in spreadsheets and sticky notes",
    icon: (
      <svg className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
      </svg>
    ),
  },
  {
    text: "Fielding buyer applications through Facebook DMs and email",
    icon: (
      <svg className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    text: "Collecting deposits via Venmo and hoping for the best",
    icon: (
      <svg className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
];

function Problem() {
  return (
    <section className="bg-stone-50 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Sound familiar?
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {painPoints.map((p) => (
            <div
              key={p.text}
              className="rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm"
            >
              <div className="flex justify-center">{p.icon}</div>
              <p className="mt-5 text-stone-700 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-lg font-semibold text-stone-800">
          Your puppies are worth more than that.
        </p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Features
// ---------------------------------------------------------------------------

const features = [
  {
    title: "Beautiful Gallery Page",
    description:
      "A stunning public page for your kennel. Puppy photos, litter info, breed details \u2014 all in one place that buyers can actually find on Google.",
    icon: (
      <svg className="h-7 w-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
      </svg>
    ),
    badge: null,
  },
  {
    title: "Smart Waitlist",
    description:
      'Track applications, manage positions, and show buyers where they stand. No more "where am I on the list?" texts.',
    icon: (
      <svg className="h-7 w-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    badge: null,
  },
  {
    title: "Puppy Applications",
    description:
      "Customizable application forms that collect everything you need \u2014 living situation, experience, references. All organized in your dashboard.",
    icon: (
      <svg className="h-7 w-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
      </svg>
    ),
    badge: null,
  },
  {
    title: "Deposit Collection",
    description:
      "Collect deposits through Stripe. Buyers pay securely, you get paid directly. No more chasing Venmo payments.",
    icon: (
      <svg className="h-7 w-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    badge: "Coming soon",
  },
];

function Features() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Everything you need to run your kennel online
        </h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm"
            >
              <div className="flex items-center gap-3">
                {f.icon}
                <h3 className="text-lg font-semibold text-stone-900">
                  {f.title}
                </h3>
                {f.badge && (
                  <span className="rounded-full bg-amber-100 px-3 py-0.5 text-xs font-semibold text-amber-800">
                    {f.badge}
                  </span>
                )}
              </div>
              <p className="mt-4 leading-relaxed text-stone-600">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Comparison table
// ---------------------------------------------------------------------------

const comparisonRows: { feature: string; spreadsheets: string; breedera: string; breederBuddy: string; us: string }[] = [
  { feature: "Public gallery page", spreadsheets: "No", breedera: "No", breederBuddy: "No", us: "Yes" },
  { feature: "Google-indexable", spreadsheets: "No", breedera: "No", breederBuddy: "No", us: "Yes" },
  { feature: "Waitlist management", spreadsheets: "Manual", breedera: "Yes", breederBuddy: "Yes", us: "Yes" },
  { feature: "Application forms", spreadsheets: "No", breedera: "No", breederBuddy: "Yes", us: "Yes" },
  { feature: "Price", spreadsheets: "Free", breedera: "$13/mo", breederBuddy: "$15-50/mo", us: "Free\u2013$29/mo" },
];

function Check() {
  return (
    <svg className="mx-auto h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function Cross() {
  return (
    <svg className="mx-auto h-5 w-5 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function CellValue({ value }: { value: string }) {
  if (value === "Yes") return <Check />;
  if (value === "No") return <Cross />;
  return <span>{value}</span>;
}

function ComparisonTable() {
  return (
    <section className="bg-stone-50 px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          How we compare
        </h2>
        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-stone-300">
                <th className="py-4 pr-4 text-left font-semibold text-stone-700">Feature</th>
                <th className="px-4 py-4 text-center font-semibold text-stone-700">Spreadsheets</th>
                <th className="px-4 py-4 text-center font-semibold text-stone-700">
                  Breedera
                  <span className="block text-xs font-normal text-stone-400">$13/mo</span>
                </th>
                <th className="px-4 py-4 text-center font-semibold text-stone-700">
                  BreederBuddy
                  <span className="block text-xs font-normal text-stone-400">$15-50/mo</span>
                </th>
                <th className="px-4 py-4 text-center font-bold text-amber-700">
                  Us
                  <span className="block text-xs font-normal text-amber-600">Free&ndash;$29/mo</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.feature} className="border-b border-stone-200">
                  <td className="py-4 pr-4 font-medium text-stone-800">{row.feature}</td>
                  <td className="px-4 py-4 text-center text-stone-600">
                    <CellValue value={row.spreadsheets} />
                  </td>
                  <td className="px-4 py-4 text-center text-stone-600">
                    <CellValue value={row.breedera} />
                  </td>
                  <td className="px-4 py-4 text-center text-stone-600">
                    <CellValue value={row.breederBuddy} />
                  </td>
                  <td className="px-4 py-4 text-center font-semibold text-amber-700">
                    <CellValue value={row.us} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for your first litter",
    features: ["1 active litter", "Gallery page", "Application forms"],
    cta: "Get started",
    ctaHref: "/register",
    highlighted: false,
  },
  {
    name: "Basic",
    price: "$15",
    period: "/mo",
    description: "For growing kennels",
    features: [
      "3 active litters",
      "Everything in Free",
      "Waitlist management",
      "Priority support",
    ],
    cta: "Start Basic",
    ctaHref: "https://buy.stripe.com/aFa4gz7BNd4B0b30jW3Nm08",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    description: "For established breeders",
    features: [
      "Unlimited litters",
      "Everything in Basic",
      "Deposit collection",
      "Contracts",
      "Custom domain",
    ],
    cta: "Start Pro",
    ctaHref: "https://buy.stripe.com/fZu6oH5tFggNe1TgiU3Nm09",
    highlighted: true,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Simple, transparent pricing
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-stone-600">
          Start free, upgrade when you&apos;re ready. No contracts, cancel anytime.
        </p>
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border p-8 shadow-sm ${
                tier.highlighted
                  ? "border-amber-300 bg-gradient-to-b from-amber-50 to-white ring-1 ring-amber-300"
                  : "border-stone-200 bg-white"
              }`}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-600 px-4 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-stone-900">
                {tier.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight text-stone-900">
                  {tier.price}
                </span>
                <span className="text-sm text-stone-500">{tier.period}</span>
              </div>
              <p className="mt-2 text-sm text-stone-500">{tier.description}</p>
              <ul className="mt-8 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-stone-700">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={tier.ctaHref}
                className={`mt-8 block rounded-full px-6 py-3 text-center text-sm font-semibold transition ${
                  tier.highlighted
                    ? "bg-amber-600 text-white shadow-sm hover:bg-amber-700"
                    : "bg-stone-100 text-stone-800 hover:bg-stone-200"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Bottom CTA
// ---------------------------------------------------------------------------

function BottomCTA() {
  return (
    <section className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Ready to give your kennel the website it deserves?
        </h2>
        <div className="mt-10">
          <Link
            href="/register"
            className="inline-block rounded-full bg-amber-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Create your free gallery
          </Link>
        </div>
        <p className="mt-4 text-sm text-stone-500">
          Free forever for 1 litter. No credit card required.
        </p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

function LandingFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="font-semibold text-stone-900">Breeder Platform</p>
          <p className="mt-1 text-sm text-stone-400">
            &copy; {new Date().getFullYear()} Breeder Platform. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <a href="#pricing" className="text-stone-500 hover:text-stone-700">
            Pricing
          </a>
          <Link href="/login" className="text-stone-500 hover:text-stone-700">
            Login
          </Link>
          <Link href="/register" className="text-stone-500 hover:text-stone-700">
            Register
          </Link>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-stone-400">
        Built by AI agents at Moltcorp
      </p>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <Hero />
      <Problem />
      <Features />
      <ComparisonTable />
      <Pricing />
      <BottomCTA />
      <LandingFooter />
    </div>
  );
}
