import type { Metadata } from "next";
import Link from "next/link";

export function generateMetadata(): Metadata {
  return {
    title: "Breedera Alternative — A Better Way to Showcase Your Puppies",
    description:
      "Looking for a Breedera alternative? Our PawPage gives you beautiful public gallery pages, waitlist management, and deposit tracking — everything Breedera doesn't.",
    keywords: [
      "breedera alternative",
      "breedera competitor",
      "breeder website platform",
      "puppy gallery website",
      "breeder waitlist software",
    ],
    openGraph: {
      title: "Breedera Alternative — A Better Way to Showcase Your Puppies",
      description:
        "Beautiful gallery pages, waitlist management, and deposit tracking. The public-facing PawPage Breedera doesn't offer.",
    },
  };
}

const faqItems = [
  {
    question: "How is this different from Breedera?",
    answer:
      "Breedera is a breeding management tool focused on health records, heat cycles, vaccinations, and weight tracking. Our platform focuses on the public-facing side of your breeding business: beautiful gallery pages that rank on Google, waitlist management with position tracking for buyers, and secure deposit tracking. If you need breeding record-keeping, Breedera is great for that. If you need to attract and manage buyers, we fill that gap.",
  },
  {
    question: "Can I use this alongside Breedera?",
    answer:
      "Absolutely. Many breeders use Breedera for internal health and breeding management while using our platform for their public-facing gallery, waitlist, and deposit tracking. The two tools complement each other well.",
  },
  {
    question: "Do you offer health record tracking or breeding management?",
    answer:
      "No. We intentionally focus on three things and do them exceptionally well: public gallery pages, waitlist management, and deposit tracking. For health records, pedigrees, and breeding cycle tracking, we recommend a dedicated tool like Breedera.",
  },
  {
    question: "How much does it cost compared to Breedera?",
    answer:
      "Our pricing starts at $15/mo for the Basic plan and $29/mo for Pro. Breedera offers a freemium model with limited features on the free tier. Since the two platforms solve different problems, many breeders find value in using both.",
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
  { feature: "Public gallery pages", us: true, them: false },
  { feature: "SEO-indexable breeder pages", us: true, them: false },
  { feature: "Waitlist with position tracking", us: true, them: false },
  { feature: "Puppy application forms", us: true, them: false },
  { feature: "Deposit tracking (coming soon)", us: false, them: false },
  { feature: "Heat cycle tracking", us: false, them: true },
  { feature: "Vaccination records", us: false, them: true },
  { feature: "Weight tracking", us: false, them: true },
  { feature: "Breeding management", us: false, them: true },
  { feature: "Mobile app (iOS/Android)", us: false, them: true },
  { feature: "Whelping records", us: false, them: true },
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

export default function BreederaComparePage() {
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
            <li className="text-zinc-900 dark:text-zinc-100">Breedera</li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="mx-auto max-w-4xl px-6 pt-12 pb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Breedera Alternative — A Better Way to Showcase Your Puppies
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Breedera is excellent for tracking health records, heat cycles, and
            breeding data. But it wasn&apos;t built to help buyers find you or
            manage your waitlist. That&apos;s where we come in.
          </p>
        </header>

        {/* Comparison intro */}
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <h2 className="text-2xl font-semibold">
            Different tools for different problems
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Breedera focuses on the internal side of breeding: health records,
            vaccinations, weight tracking, and mobile apps for on-the-go
            record-keeping. Our platform focuses on the public-facing side: giving
            your puppies a beautiful, SEO-indexable gallery page that attracts
            buyers, a waitlist system that lets applicants track their position,
            and secure deposit tracking. Breedera has no public
            gallery and no SEO-indexable pages. We don&apos;t do breeding
            management. The two platforms solve entirely different problems.
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
                    Breedera
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
                      {row.us === true ? <Check /> : <Cross />}
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      {row.them === true ? <Check /> : <Cross />}
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
                Breedera
              </h3>
              <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                Freemium
              </p>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Free tier available &middot; paid tiers not clearly published
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
              Ready to give your puppies the spotlight they deserve?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Set up your gallery, waitlist, and deposit tracking in minutes.
              Plans start at $15/mo.
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
