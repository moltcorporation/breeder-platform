import type { Metadata } from "next";
import Link from "next/link";
import { StatsCounter } from "@/components/stats-counter";
import { STRIPE_PAYMENT_LINKS } from "@/lib/plans";

export const metadata: Metadata = {
  title: "PawPage — Beautiful gallery pages & waitlist management for dog breeders",
  description:
    "Beautiful gallery pages, waitlist management, and puppy applications — built for breeders who care about presentation. Free to get started.",
};

// ---------------------------------------------------------------------------
// Inline SVG Icons
// ---------------------------------------------------------------------------

function PawPrintIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <ellipse cx="7.5" cy="7" rx="2.2" ry="2.8" />
      <ellipse cx="16.5" cy="7" rx="2.2" ry="2.8" />
      <ellipse cx="4" cy="12.5" rx="2" ry="2.5" />
      <ellipse cx="20" cy="12.5" rx="2" ry="2.5" />
      <path d="M12 22c-3 0-5.5-2-6.5-4.5-.7-1.8.3-3.5 2-4 1.2-.3 2.5.2 3.2 1.2.5.7 1.1 1.3 1.3 1.3s.8-.6 1.3-1.3c.7-1 2-1.5 3.2-1.2 1.7.5 2.7 2.2 2 4C17.5 20 15 22 12 22z" />
    </svg>
  );
}

function HeartIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function HomeIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 4v6c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V6l8-4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  );
}

function GalleryIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16l5-5a2 2 0 012.8 0L15 15" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 14l1.5-1.5a2 2 0 012.8 0L21 15" />
      <circle cx="8.5" cy="8.5" r="1.5" />
    </svg>
  );
}

function ListIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6h11M9 12h11M9 18h11" />
      <circle cx="4.5" cy="6" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="18" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ClipboardIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 2h6a1 1 0 011 1v1a1 1 0 01-1 1H9a1 1 0 01-1-1V3a1 1 0 011-1z" />
      <path strokeLinecap="round" d="M9 10h6M9 14h4" />
    </svg>
  );
}

function DollarIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 7v10M9 9.5c0-1 1.3-1.5 3-1.5s3 .5 3 1.5-1.3 2-3 2.5-3 1-3 2 1.3 1.5 3 1.5 3-.5 3-1.5" />
    </svg>
  );
}

function BoneIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.5 6.5a2.5 2.5 0 014.3-1.7l.2.2 8 8 .2.2a2.5 2.5 0 11-1.7 4.3 2.5 2.5 0 01-4.3 1.7 2.5 2.5 0 01-1.7-4.3l-.2-.2-8-8-.2-.2A2.5 2.5 0 013.5 6.5zM17 3.5a2.5 2.5 0 014.3 1.7A2.5 2.5 0 0117 9.5a2.5 2.5 0 01-1.7-4.3A2.5 2.5 0 0117 3.5z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Section Wave Divider
// ---------------------------------------------------------------------------

function WaveDivider({ flip = false, fillColor = "#FFFBEB" }: { flip?: boolean; fillColor?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="relative block h-[50px] w-full sm:h-[70px]"
      >
        <path
          d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared components
// ---------------------------------------------------------------------------

function Nav() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[#D1D5C8]/60 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-stone-800">
          <PawPrintIcon className="h-7 w-7 text-amber-600" />
          PawPage
        </Link>
        <div className="flex items-center gap-6">
          <a href="#pricing" className="hidden text-sm font-medium text-stone-600 transition hover:text-amber-700 sm:inline">
            Pricing
          </a>
          <Link
            href="/login"
            className="text-sm font-medium text-stone-600 transition hover:text-amber-700"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-amber-200 transition hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-200"
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

function MockPuppyCard() {
  return (
    <div className="mx-auto mt-16 w-full max-w-sm">
      <div className="relative overflow-hidden rounded-2xl border border-amber-200/80 bg-white shadow-xl shadow-amber-100/60">
        {/* Mock image area */}
        <div className="relative h-52 bg-gradient-to-br from-amber-100 via-amber-50 to-orange-50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <PawPrintIcon className="mx-auto h-16 w-16 text-amber-300/70" />
              <p className="mt-2 text-xs font-medium text-amber-400">Photo preview</p>
            </div>
          </div>
          <div className="absolute right-3 top-3 rounded-full bg-green-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
            Available
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-800">Luna</h3>
            <HeartIcon className="h-5 w-5 text-rose-400" />
          </div>
          <p className="mt-1 text-sm text-stone-500">Golden Retriever</p>
          <div className="mt-3 flex items-center gap-2">
            <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">Female</span>
            <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">8 weeks</span>
          </div>
          <div className="mt-4 rounded-lg bg-stone-50 px-3 py-2">
            <p className="text-xs text-stone-500">Waitlist position</p>
            <p className="text-sm font-semibold text-green-700">3 families waiting</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section
      className="relative overflow-hidden px-4 pb-24 pt-32 text-center sm:px-6 sm:pb-32 sm:pt-40 lg:px-8"
      style={{
        background: "linear-gradient(180deg, #FFFBEB 0%, #FFF7ED 40%, #FFFFFF 100%)",
      }}
    >
      {/* Decorative paw print pattern background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="paw-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <g fill="#92400E">
                <ellipse cx="20" cy="16" rx="4" ry="5" />
                <ellipse cx="36" cy="16" rx="4" ry="5" />
                <ellipse cx="13" cy="26" rx="3.5" ry="4.5" />
                <ellipse cx="43" cy="26" rx="3.5" ry="4.5" />
                <path d="M28 40c-5 0-9.5-3.5-11-7.5-1-3 .5-5.8 3.3-6.5 2-.6 4.2.3 5.4 2 .8 1.2 1.6 2 2.3 2s1.5-0.8 2.3-2c1.2-1.7 3.4-2.6 5.4-2 2.8.7 4.3 3.5 3.3 6.5-1.5 4-6 7.5-11 7.5z" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#paw-pattern)" />
        </svg>
      </div>

      <div className="relative">
        <div className="mx-auto mb-6 flex items-center justify-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-medium text-amber-800 shadow-sm" style={{ width: "fit-content" }}>
          <PawPrintIcon className="h-4 w-4" />
          Built for breeders who care
        </div>

        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-stone-800 sm:text-5xl lg:text-6xl">
          Your puppies deserve a{" "}
          <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
            better website
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-600 sm:text-xl">
          Beautiful gallery pages, waitlist management, and puppy applications
          &mdash; built for breeders who care about presentation.
        </p>
        <div className="mt-10">
          <Link
            href="/register"
            className="inline-block rounded-full bg-amber-600 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-amber-200/50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-xl hover:shadow-amber-200/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Create your free gallery
          </Link>
        </div>
        <p className="mt-4 text-sm text-stone-500">
          Free forever for 1 litter. No credit card required.
        </p>

        <MockPuppyCard />
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Problem
// ---------------------------------------------------------------------------

const painPoints = [
  {
    text: "Managing waitlists in spreadsheets and sticky notes",
    icon: <ListIcon className="h-8 w-8 text-amber-600" />,
  },
  {
    text: "Fielding buyer applications through Facebook DMs and email",
    icon: <HomeIcon className="h-8 w-8 text-amber-600" />,
  },
  {
    text: "Collecting deposits via Venmo and hoping for the best",
    icon: <DollarIcon className="h-8 w-8 text-amber-600" />,
  },
];

function Problem() {
  return (
    <section className="bg-[#FFFBEB] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl">
          Sound familiar?
        </h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {painPoints.map((p) => (
            <div
              key={p.text}
              className="group rounded-2xl border border-[#D1D5C8] bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-amber-100/60"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 transition-colors duration-300 group-hover:bg-amber-100">
                {p.icon}
              </div>
              <p className="mt-5 leading-relaxed text-stone-700">{p.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-14 text-center text-lg font-semibold text-stone-800">
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
    icon: <GalleryIcon className="h-7 w-7 text-amber-600" />,
    badge: null,
  },
  {
    title: "Smart Waitlist",
    description:
      'Track applications, manage positions, and show buyers where they stand. No more "where am I on the list?" texts.',
    icon: <ListIcon className="h-7 w-7 text-amber-600" />,
    badge: null,
  },
  {
    title: "Puppy Applications",
    description:
      "Customizable application forms that collect everything you need \u2014 living situation, experience, references. All organized in your dashboard.",
    icon: <ClipboardIcon className="h-7 w-7 text-amber-600" />,
    badge: null,
  },
  {
    title: "deposit tracking",
    description:
      "Track deposits in one place. Record when buyers pay via Venmo, Zelle, or check — no more guessing who paid what.",
    icon: <DollarIcon className="h-7 w-7 text-amber-600" />,
    badge: null,
  },
];

function Features() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-amber-700">
            <ShieldCheckIcon className="h-5 w-5" />
            Features
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl">
            Everything you need to run your kennel online
          </h2>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-[#D1D5C8] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-100/40"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-50 transition-colors duration-300 group-hover:bg-amber-100">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-stone-800">
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
    <svg className="mx-auto h-5 w-5 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
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
    <section className="bg-[#FFFBEB] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-widest text-amber-700">
            <BoneIcon className="h-5 w-5" />
            Comparison
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl">
            How we compare
          </h2>
        </div>
        <div className="mt-14 overflow-x-auto rounded-2xl border border-[#D1D5C8] bg-white shadow-sm">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-[#D1D5C8]">
                <th className="py-5 pl-6 pr-4 text-left font-semibold text-stone-700">Feature</th>
                <th className="px-4 py-5 text-center font-semibold text-stone-500">Spreadsheets</th>
                <th className="px-4 py-5 text-center font-semibold text-stone-500">
                  Breedera
                  <span className="block text-xs font-normal text-stone-400">$13/mo</span>
                </th>
                <th className="px-4 py-5 text-center font-semibold text-stone-500">
                  BreederBuddy
                  <span className="block text-xs font-normal text-stone-400">$15-50/mo</span>
                </th>
                <th className="rounded-tr-2xl bg-amber-50 px-4 py-5 text-center font-bold text-amber-800">
                  <div className="flex items-center justify-center gap-1.5">
                    <PawPrintIcon className="h-4 w-4" />
                    Us
                  </div>
                  <span className="block text-xs font-normal text-amber-600">Free&ndash;$29/mo</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`border-b border-stone-100 ${i % 2 === 0 ? "bg-white" : "bg-stone-50/50"}`}
                >
                  <td className="py-4 pl-6 pr-4 font-medium text-stone-800">{row.feature}</td>
                  <td className="px-4 py-4 text-center text-stone-600">
                    <CellValue value={row.spreadsheets} />
                  </td>
                  <td className="px-4 py-4 text-center text-stone-600">
                    <CellValue value={row.breedera} />
                  </td>
                  <td className="px-4 py-4 text-center text-stone-600">
                    <CellValue value={row.breederBuddy} />
                  </td>
                  <td className={`bg-amber-50/60 px-4 py-4 text-center font-semibold text-amber-800 ${i === comparisonRows.length - 1 ? "rounded-br-2xl" : ""}`}>
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
    ctaHref: STRIPE_PAYMENT_LINKS.basic,
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
      "deposit tracking",
      "Contracts",
      "Custom domain",
    ],
    cta: "Start Pro",
    ctaHref: STRIPE_PAYMENT_LINKS.pro,
    highlighted: true,
  },
];

function Pricing() {
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
        <div className="relative mt-16 grid gap-8 sm:grid-cols-3">
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
              <p className="mt-2 text-sm text-stone-500">{tier.description}</p>
              <ul className="mt-8 space-y-3.5">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-stone-700">
                    <PawPrintIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    {f}
                  </li>
                ))}
              </ul>
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
    <section
      className="relative overflow-hidden px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8"
      style={{
        background: "linear-gradient(135deg, #FFFBEB 0%, #FFF7ED 50%, #FEF3C7 100%)",
      }}
    >
      {/* Decorative paw prints */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="paw-cta" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <g fill="#92400E">
                <ellipse cx="30" cy="24" rx="5" ry="6.5" />
                <ellipse cx="50" cy="24" rx="5" ry="6.5" />
                <ellipse cx="21" cy="37" rx="4.5" ry="5.5" />
                <ellipse cx="59" cy="37" rx="4.5" ry="5.5" />
                <path d="M40 55c-6 0-12-4-14-9-1.3-3.5.6-7 4-8 2.5-.7 5.2.4 6.8 2.5 1 1.4 2 2.5 3.2 2.5s2.2-1.1 3.2-2.5c1.6-2.1 4.3-3.2 6.8-2.5 3.4 1 5.3 4.5 4 8-2 5-8 9-14 9z" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#paw-cta)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-2xl">
        <HeartIcon className="mx-auto mb-6 h-10 w-10 text-amber-400" />
        <h2 className="text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl">
          Ready to give your kennel the website it deserves?
        </h2>
        <div className="mt-10">
          <Link
            href="/register"
            className="inline-block rounded-full bg-amber-600 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-amber-300/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-xl hover:shadow-amber-300/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
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
    <footer className="border-t border-[#D1D5C8] bg-white px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <PawPrintIcon className="h-5 w-5 text-amber-600" />
            <p className="font-semibold text-stone-800">PawPage</p>
          </div>
          <p className="mt-1 text-sm text-stone-400">
            &copy; {new Date().getFullYear()} PawPage. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <a href="#pricing" className="text-stone-500 transition hover:text-amber-700">
            Pricing
          </a>
          <Link href="/login" className="text-stone-500 transition hover:text-amber-700">
            Login
          </Link>
          <Link href="/register" className="text-stone-500 transition hover:text-amber-700">
            Register
          </Link>
          <Link href="/about" className="text-stone-500 transition hover:text-amber-700">
            About
          </Link>
          <Link href="/feedback" className="text-stone-500 transition hover:text-amber-700">
            Feedback
          </Link>
          <Link href="/terms" className="text-stone-500 transition hover:text-amber-700">
            Terms
          </Link>
          <Link href="/privacy" className="text-stone-500 transition hover:text-amber-700">
            Privacy
          </Link>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-stone-400">
        Secure payments via Stripe
      </p>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function Home() {
  return (
    <div className="min-h-screen bg-white" style={{ scrollBehavior: "smooth" }}>
      <Nav />
      <Hero />
      <StatsCounter />
      <WaveDivider fillColor="#FFFBEB" />
      <Problem />
      <WaveDivider flip fillColor="#FFFBEB" />
      <Features />
      <WaveDivider fillColor="#FFFBEB" />
      <ComparisonTable />
      <WaveDivider flip fillColor="#FFFBEB" />
      <Pricing />
      <BottomCTA />
      <LandingFooter />
    </div>
  );
}
