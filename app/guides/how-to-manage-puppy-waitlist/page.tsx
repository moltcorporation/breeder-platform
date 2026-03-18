import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Manage a Puppy Waitlist: A Breeder's Complete Guide",
  description:
    "Learn how to manage your puppy waitlist professionally — avoid common mistakes, set clear expectations, and use the right tools to keep buyers happy.",
};

const howToSteps = [
  {
    name: "Create an application form with the right questions",
    text: "Ask about household, lifestyle, experience with dogs, and why they want this breed. A good form filters out impulse buyers before they ever reach your waitlist.",
  },
  {
    name: "Screen applicants based on your criteria",
    text: "Review each application against your non-negotiables. Look for signs of research, realistic expectations, and a suitable living environment for your breed.",
  },
  {
    name: "Assign positions and collect deposits",
    text: "Once approved, assign a waitlist position and collect a non-refundable deposit. This confirms commitment and reduces no-shows when puppies are ready.",
  },
  {
    name: "Communicate timelines proactively",
    text: "Send updates at key milestones — breeding confirmation, pregnancy confirmation, birth, and go-home dates. Buyers who feel informed don't flood your inbox.",
  },
  {
    name: "Match puppies to families based on temperament",
    text: "As puppies grow, evaluate temperament and energy levels. Match each puppy to the family whose lifestyle and experience is the best fit.",
  },
];

const faqs = [
  {
    question: "How long should a puppy waitlist be?",
    answer:
      "Most breeders keep waitlists between 5 and 15 families per litter. Longer lists can work, but be transparent about expected wait times — some families may wait 6 to 12 months. If your list regularly exceeds 20, consider whether you need a second list for a future litter.",
  },
  {
    question: "Should I charge a deposit for my waitlist?",
    answer:
      "Yes. A deposit (typically $200–$500) separates serious buyers from tire-kickers. Make your deposit policy clear upfront — whether it's refundable, non-refundable, or transferable to a future litter. Deposits dramatically reduce ghost buyers who disappear when puppies are ready.",
  },
  {
    question: "How do I handle someone who drops off the waitlist?",
    answer:
      "Have a written policy before it happens. Most breeders offer to move the family to a future litter or forfeit the deposit after a grace period. Communicate professionally, document everything, and move the next family up immediately.",
  },
  {
    question: "What information should I collect from waitlist applicants?",
    answer:
      "At minimum: contact details, household info (adults, children, other pets), housing type and yard situation, experience with dogs, work schedule, and why they want this specific breed. A vet reference is also valuable for verifying responsible pet ownership.",
  },
  {
    question: "How often should I send waitlist updates?",
    answer:
      "At key milestones: when the breeding is confirmed, when pregnancy is confirmed, at birth, at major puppy developmental stages (eyes open, weaning), and when go-home dates are set. Monthly updates are a good baseline between milestones.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      name: "How to Set Up a Professional Puppy Waitlist",
      description:
        "A step-by-step guide for dog breeders to create and manage a professional puppy waitlist system.",
      step: howToSteps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    },
  ],
};

// ---------------------------------------------------------------------------
// Shared layout components
// ---------------------------------------------------------------------------

function ArticleNav() {
  return (
    <nav className="border-b border-stone-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-stone-900"
        >
          PawPage
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-stone-600 hover:text-stone-900"
          >
            Home
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

function ArticleFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="font-semibold text-stone-900">PawPage</p>
          <p className="mt-1 text-sm text-stone-400">
            &copy; {new Date().getFullYear()} PawPage. All rights
            reserved.
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-stone-500 hover:text-stone-700">
            Home
          </Link>
          <Link href="/login" className="text-stone-500 hover:text-stone-700">
            Login
          </Link>
          <Link
            href="/register"
            className="text-stone-500 hover:text-stone-700"
          >
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

export default function HowToManagePuppyWaitlistPage() {
  return (
    <div className="min-h-screen bg-white">
      <ArticleNav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-2xl px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        {/* H1 */}
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          How to Manage a Puppy Waitlist: A Breeder&apos;s Complete Guide
        </h1>

        {/* Intro */}
        <p className="mt-6 text-lg leading-relaxed text-stone-600">
          If you&apos;re a responsible breeder, demand for your puppies
          almost certainly exceeds supply. A well-managed waitlist is how you
          keep that demand organized, protect your puppies, and maintain the
          professional reputation you&apos;ve worked hard to build. This guide
          covers everything you need to set up and run a waitlist that works
          for you and your buyers.
        </p>

        {/* Why You Need a Waitlist System */}
        <h2 className="mt-12 text-2xl font-bold text-stone-900">
          Why You Need a Waitlist System
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          When you have more interested families than puppies available, you
          need a system. Without one, you&apos;re left scrambling through
          messages, forgetting who asked first, and making decisions under
          pressure.
        </p>
        <ul className="mt-4 space-y-3 text-stone-600">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">Demand exceeds supply.</strong>{" "}
              Good breeders have more buyers than puppies. A waitlist turns
              chaos into a clear queue.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">Professionalism matters.</strong>{" "}
              Buyers judge your kennel by how organized you are. A structured
              process signals that you take your breeding program seriously.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">Buyer confidence.</strong>{" "}
              Families feel reassured when they know exactly where they stand
              and what to expect. Transparency builds trust.
            </span>
          </li>
        </ul>

        {/* 5 Common Waitlist Mistakes */}
        <h2 className="mt-12 text-2xl font-bold text-stone-900">
          5 Common Waitlist Mistakes
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          Most breeders don&apos;t start with a bad system on purpose — they
          just grow out of the tools they started with. Here are the mistakes
          we see most often.
        </p>

        <ol className="mt-6 space-y-6">
          {[
            {
              title: "Managing via DMs and texts",
              body: "Messages get buried, conversations are scattered across Facebook, Instagram, email, and text. It's only a matter of time before someone slips through the cracks.",
            },
            {
              title: "No deposits",
              body: "Without a financial commitment, ghost buyers waste spots on your list. They say they're interested, then vanish when puppies are born. Meanwhile, serious buyers missed out.",
            },
            {
              title: "No application process",
              body: "If you're not screening buyers, you can't ensure your puppies go to the right homes. An application protects your puppies and gives you the information you need to make good matches.",
            },
            {
              title: "No communication timeline",
              body: "When buyers don't know when to expect updates, they fill the gap with anxiety — and that anxiety lands in your inbox. Proactive communication prevents 90% of \"just checking in\" messages.",
            },
            {
              title: "Using spreadsheets that get outdated",
              body: "Spreadsheets work until they don't. They can't send notifications, collect deposits, or let buyers check their status. As your breeding program grows, spreadsheets become a liability.",
            },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-stone-900">{item.title}</h3>
                <p className="mt-1 leading-relaxed text-stone-600">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* How to Set Up a Professional Waitlist */}
        <h2 className="mt-12 text-2xl font-bold text-stone-900">
          How to Set Up a Professional Waitlist
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          Follow these five steps to build a waitlist system that saves you
          time and keeps buyers happy.
        </p>

        <ol className="mt-6 space-y-6">
          {howToSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold text-stone-900">{step.name}</h3>
                <p className="mt-1 leading-relaxed text-stone-600">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Tools vs Spreadsheets */}
        <h2 className="mt-12 text-2xl font-bold text-stone-900">
          Tools vs Spreadsheets
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          Spreadsheets are free and familiar, but they create more work as your
          program grows. A dedicated waitlist tool lets buyers apply directly,
          tracks positions automatically, collects deposits, and sends updates
          — all without you copying and pasting between tabs.
        </p>
        <p className="mt-4 leading-relaxed text-stone-600">
          The real cost of a spreadsheet isn&apos;t the price — it&apos;s the
          hours you spend on admin instead of your dogs. If you&apos;re
          managing more than one litter a year, a purpose-built tool pays for
          itself in time saved.
        </p>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-8 text-center">
          <h2 className="text-xl font-bold text-stone-900">
            Skip the spreadsheet.
          </h2>
          <p className="mt-2 text-stone-600">
            Create your free breeder gallery with built-in waitlist management.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-block rounded-full bg-amber-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700"
          >
            Get started free
          </Link>
        </div>

        {/* FAQ */}
        <h2 className="mt-16 text-2xl font-bold text-stone-900">
          Frequently Asked Questions
        </h2>
        <dl className="mt-6 divide-y divide-stone-200">
          {faqs.map((faq, i) => (
            <div key={i} className="py-6">
              <dt className="font-semibold text-stone-900">{faq.question}</dt>
              <dd className="mt-2 leading-relaxed text-stone-600">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </article>

      <ArticleFooter />
    </div>
  );
}
