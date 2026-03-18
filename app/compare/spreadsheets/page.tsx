import type { Metadata } from "next";
import Link from "next/link";

export function generateMetadata(): Metadata {
  return {
    title:
      "Better Than a Puppy Waitlist Spreadsheet — Breeder Waitlist Software",
    description:
      "Outgrown your Google Sheets puppy waitlist? Our platform gives you automatic position tracking, a professional gallery, deposit tracking, and SEO — things a spreadsheet can't do.",
    keywords: [
      "puppy waitlist template",
      "breeder spreadsheet",
      "puppy waitlist software",
      "google sheets puppy waitlist",
      "breeder waitlist management",
      "puppy deposit tracking",
    ],
    openGraph: {
      title: "Better Than a Puppy Waitlist Spreadsheet",
      description:
        "Automatic position tracking, professional gallery pages, deposit tracking, and SEO. The upgrade from your breeder spreadsheet.",
    },
  };
}

const faqItems = [
  {
    question: "Is a spreadsheet really that bad for managing a waitlist?",
    answer:
      "For a handful of puppies and a few buyers, a spreadsheet works fine. The problems start as you grow: you're manually updating positions, buyers message you constantly to ask where they stand, you have no way to track deposits, there's no professional gallery to share, and you're missing out on Google traffic because a spreadsheet isn't a website. If you have more than one litter per year, the time savings alone make a dedicated tool worth it.",
  },
  {
    question: "Can buyers check their waitlist position without messaging me?",
    answer:
      "Yes. Every buyer on your waitlist gets a way to check their current position. This eliminates the back-and-forth messages that eat up your time, especially around litter announcements when everyone wants an update at once.",
  },
  {
    question: "How do deposits work?",
    answer:
      "Record deposits in your dashboard as buyers pay via Venmo, Zelle, check, or cash. See at a glance who has paid and who hasn't — no more digging through Venmo screenshots or trying to remember who sent a check.",
  },
  {
    question: "Will this help me get more buyers?",
    answer:
      "Yes. Your gallery pages are built to rank on Google for searches like 'golden retriever puppies in [your city].' A spreadsheet is invisible to search engines. With a public gallery, buyers find you instead of you having to find them through Facebook groups and word of mouth alone.",
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

type ComparisonRow = {
  capability: string;
  spreadsheet: boolean | string;
  us: boolean | string;
};

const comparisons: ComparisonRow[] = [
  { capability: "Track waitlist names & order", spreadsheet: true, us: true },
  {
    capability: "Buyers check their own position",
    spreadsheet: false,
    us: true,
  },
  { capability: "Professional puppy gallery", spreadsheet: false, us: true },
  {
    capability: "SEO — buyers find you on Google",
    spreadsheet: false,
    us: true,
  },
  {
    capability: "Deposit tracking",
    spreadsheet: false,
    us: true,
  },
  { capability: "Puppy application forms", spreadsheet: false, us: true },
  {
    capability: "Ghosting / no-response tracking",
    spreadsheet: false,
    us: true,
  },
  {
    capability: "Automatic position updates",
    spreadsheet: false,
    us: true,
  },
  { capability: "Free to use", spreadsheet: true, us: false },
  {
    capability: "Works offline",
    spreadsheet: true,
    us: false,
  },
  {
    capability: "Fully customizable layout",
    spreadsheet: true,
    us: false,
  },
];

const painPoints = [
  {
    title: "Buyers constantly asking for updates",
    description:
      'Every time a litter is announced, your inbox fills up with "Where am I on the list?" messages. With automatic position tracking, buyers check themselves.',
  },
  {
    title: "No way to collect deposits",
    description:
      "You're juggling Venmo, Zelle, checks, and cash with no record of who paid. Our deposit tracker logs every payment and ties it to the buyer's waitlist entry automatically.",
  },
  {
    title: "Invisible to search engines",
    description:
      "A Google Sheet doesn't show up when someone searches for your breed in your area. A public gallery page does — bringing you buyers you'd never reach otherwise.",
  },
  {
    title: "No professional presence to share",
    description:
      'When a potential buyer asks about your puppies, you send them... a spreadsheet link? A dedicated gallery page looks professional and builds trust before you ever exchange a message.',
  },
  {
    title: "Ghosting goes unnoticed",
    description:
      "When a buyer on your spreadsheet goes silent, you might not notice for weeks. Dedicated waitlist tools track responsiveness so you can move the list forward faster.",
  },
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

export default function SpreadsheetsComparePage() {
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
            <li className="text-zinc-900 dark:text-zinc-100">Spreadsheets</li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="mx-auto max-w-4xl px-6 pt-12 pb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Better Than a Puppy Waitlist Spreadsheet
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Spreadsheets are a great starting point. You can track names, contact
            info, and order — all for free. But once you&apos;re managing more
            than a few buyers across multiple litters, the cracks start to show.
          </p>
        </header>

        {/* Where spreadsheets break */}
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <h2 className="text-2xl font-semibold">
            Where spreadsheets fall short
          </h2>
          <p className="mt-4 mb-8 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            There&apos;s nothing wrong with a spreadsheet for a single litter
            with a handful of buyers. The problems emerge when your breeding
            program grows:
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {painPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-lg border border-zinc-200 p-5 dark:border-zinc-800"
              >
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison table */}
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <h2 className="text-2xl font-semibold mb-6">
            Spreadsheet vs. our platform
          </h2>
          <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
                  <th className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-100">
                    Capability
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-zinc-900 dark:text-zinc-100">
                    Spreadsheet
                  </th>
                  <th className="px-6 py-4 text-center font-semibold text-zinc-900 dark:text-zinc-100">
                    Our Platform
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr
                    key={row.capability}
                    className={
                      i % 2 === 0
                        ? "bg-white dark:bg-zinc-950"
                        : "bg-zinc-50/50 dark:bg-zinc-900/50"
                    }
                  >
                    <td className="px-6 py-3.5 text-zinc-700 dark:text-zinc-300">
                      {row.capability}
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <CellValue value={row.spreadsheet} />
                    </td>
                    <td className="px-6 py-3.5 text-center">
                      <CellValue value={row.us} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pricing */}
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <h2 className="text-2xl font-semibold mb-4">
            What it costs to upgrade from a spreadsheet
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                Basic
              </h3>
              <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                $15
                <span className="text-base font-normal text-zinc-500">/mo</span>
              </p>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Gallery, waitlist, application forms
              </p>
            </div>
            <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-800">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                Pro
              </h3>
              <p className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                $29
                <span className="text-base font-normal text-zinc-500">/mo</span>
              </p>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                Everything in Basic + deposit tracking + payment status
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            A spreadsheet is free. But the time you spend manually updating
            positions, answering &quot;where am I on the list?&quot; messages, and
            chasing deposits adds up. Most breeders save several hours per litter.
          </p>
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
              Your puppies deserve more than a spreadsheet
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              Set up a professional gallery, automated waitlist, and deposit
              collection in under 10 minutes. Plans start at $15/mo.
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
