import type { Metadata } from "next";
import Link from "next/link";

export function generateMetadata(): Metadata {
  return {
    title: "BreederBuddy Alternative — Simple Waitlist & Gallery for Breeders",
    description:
      "Looking for a BreederBuddy alternative? Our platform focuses on three things: beautiful gallery pages, waitlist management, and deposit tracking. Simple, affordable, effective.",
    keywords: [
      "breederbuddy alternative",
      "breederbuddy competitor",
      "simple breeder software",
      "breeder waitlist tool",
      "puppy gallery website",
    ],
    openGraph: {
      title:
        "BreederBuddy Alternative — Simple Waitlist & Gallery for Breeders",
      description:
        "Three core features done right: gallery pages, waitlist management, and deposit tracking. A simpler alternative to BreederBuddy.",
    },
  };
}

const faqItems = [
  {
    question: "Why choose this over BreederBuddy?",
    answer:
      "BreederBuddy offers 15+ features covering pedigrees, contracts, health records, CRM, and more. If you need all of that, it's a solid choice. Our platform is for breeders who want three things done exceptionally well: a beautiful public gallery that ranks on Google, a waitlist system buyers can actually use, and deposit tracking. Less to learn, less to configure, and your public-facing pages look better.",
  },
  {
    question: "Does your platform handle pedigrees or health records?",
    answer:
      "No. We focus exclusively on the buyer-facing side of your business: gallery pages, waitlist management, and deposit tracking. For pedigrees, health records, and breeding management, you'd want a dedicated tool for that.",
  },
  {
    question: "Are your public pages better for SEO than BreederBuddy?",
    answer:
      "Yes. Our gallery pages are purpose-built for search engine visibility. They're fast, properly structured with schema markup, and designed to rank for breed-specific searches in your area. This means buyers find you through Google instead of you having to find them.",
  },
  {
    question: "How does pricing compare?",
    answer:
      "BreederBuddy ranges from $15 to $50/mo depending on the plan. Our pricing is $15/mo for Basic and $29/mo for Pro. You're paying less and getting a focused tool rather than a feature-packed suite where you may only use a fraction of what's available.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

type FeatureRow = {
  feature: string;
  us: boolean | string;
  them: boolean | string;
};

const features: FeatureRow[] = [
  { feature: "Public gallery pages", us: true, them: true },
  { feature: "SEO-optimized breeder pages", us: true, them: false },
  { feature: "Waitlist with buyer position tracking", us: true, them: true },
  { feature: "Puppy application forms", us: true, them: true },
  { feature: "Deposit tracking", us: true, them: true },
  { feature: "Pedigree management", us: false, them: true },
  { feature: "Contracts & agreements", us: false, them: true },
  { feature: "Health records", us: false, them: true },
  { feature: "CRM / buyer management", us: false, them: true },
  { feature: "Buyer portal", us: false, them: true },
  { feature: "Expense tracking", us: false, them: true },
  { feature: "Mentor / co-breeder tools", us: false, them: true },
  { feature: "Setup time under 10 minutes", us: true, them: false },
  { feature: "Pricing under $30/mo", us: true, them: "Some plans" },
];

function Check() {
  return (
    <svg
      className="mx-auto h-5 w-5 text-emerald-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Cross() {
  return (
    <svg
      className="mx-auto h-5 w-5 text-zinc-400 dark:text-zinc-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check />;
  if (value === false) return <Cross />;
  return (
    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
      {value}
    </span>
  );
}

export default function BreederBuddyComparePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-4xl px-6 pt-8 text-sm text-zinc-500 dark:text-zinc-400"
        >
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/compare" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                Compare
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-zinc-900 dark:text-zinc-100">BreederBuddy</li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="mx-auto max-w-4xl px-6 pt-12 pb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            BreederBuddy Alternative — Simple Waitlist &amp; Gallery for Breeders
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            BreederBuddy does a lot. If you need pedigrees, contracts, health
            records, CRM, and a buyer portal all in one place, it&apos;s a
            comprehensive option. But if what you really need is a gorgeous public
            gallery, a waitlist that works, and a way to collect deposits — without
            the complexity — we built something simpler.
          </p>
        </header>

        {/* The case for simplicity */}
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <h2 className="text-2xl font-semibold">
            Fewer features, done better
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            BreederBuddy packs in 15+ features across breeding management, buyer
            relations, and record-keeping. That&apos;s powerful — but it also
            means more to learn, more to set up, and more tabs you&apos;ll never
            open. Our platform does three things: gallery pages, waitlist
            management, and deposit tracking. We put all our energy into making
            those three features exceptional. Your public pages are beautiful and
            rank on Google. Your waitlist lets buyers check their position without
            messaging you. Your deposits are tracked in one place. Set
            up takes minutes, not hours.
          </p>
        </section>

        {/* Feature comparison table */}
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <h2 className="text-2xl font-semibold mb-6">Feature comparison</h2>
          <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                  <th className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">
                    Feature
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-zinc-900 dark:text-zinc-100">
                    Our Platform
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-zinc-900 dark:text-zinc-100">
                    BreederBuddy
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={
                      i % 2 === 0
                        ? "bg-white dark:bg-zinc-950"
                        : "bg-zinc-50/50 dark:bg-zinc-900/50"
                    }
                  >
                    <td className="px-6 py-3.5 text-zinc-700 dark:text-zinc-300">
                      {row.feature}
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <CellValue value={row.us} />
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <CellValue value={row.them} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pricing */}
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <h2 className="text-2xl font-semibold mb-4">Pricing</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                Our Platform
              </h3>
              <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                $15 – $29
                <span className="text-base font-normal text-zinc-500">/mo</span>
              </p>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Basic at $15/mo &middot; Pro at $29/mo
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                BreederBuddy
              </h3>
              <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                $15 – $50
                <span className="text-base font-normal text-zinc-500">/mo</span>
              </p>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Multiple tiers &middot; higher tiers unlock more features
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <h2 className="text-2xl font-semibold mb-6">
            Frequently asked questions
          </h2>
          <dl className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {faqItems.map((item) => (
              <div key={item.question} className="py-6">
                <dt className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {item.question}
                </dt>
                <dd className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-6 pb-24">
          <div className="rounded-2xl bg-zinc-900 px-8 py-12 text-center dark:bg-zinc-800">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Simple tools. Beautiful pages. Happy buyers.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Skip the feature bloat. Get a gallery, waitlist, and deposit
              system that just works. Plans start at $15/mo.
            </p>
            <Link
              href="/register"
              className="mt-8 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-zinc-900 transition hover:bg-zinc-100"
            >
              Get started
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
