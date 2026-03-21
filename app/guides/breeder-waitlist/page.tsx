import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Manage a Puppy Waitlist | PawPage",
  description:
    "The complete breeder waitlist guide: set up applications, collect deposits securely with Stripe, communicate with buyers, and avoid the 5 mistakes that cost you families.",
  openGraph: {
    title: "How to Manage a Puppy Waitlist | PawPage",
    description:
      "Set up a professional puppy waitlist, collect deposits securely, and stop losing buyers to DM chaos. Free guide for dog breeders.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Manage a Puppy Waitlist | PawPage",
    description:
      "Set up a professional puppy waitlist, collect deposits securely, and stop losing buyers to DM chaos.",
  },
  alternates: {
    canonical: "/guides/breeder-waitlist",
  },
};

const howToSteps = [
  {
    name: "Define your waitlist policy before you need it",
    text: "Write down your deposit amount, refund policy, how long a spot is held, and what happens when someone drops off. Post it publicly on your website or social media. Clarity up front prevents 90% of disputes later.",
  },
  {
    name: "Create a structured application form",
    text: "Ask about household composition, yard and living space, experience with the breed, daily schedule, and why they want a puppy from you. A good form filters out impulse buyers and gives you the information you need to match puppies to the right homes.",
  },
  {
    name: "Screen applicants against your criteria",
    text: "Review each application against your non-negotiables. Some breeders require fenced yards, others prioritize breed experience. Whatever your standards are, apply them consistently. A quick phone call can reveal things an application can't.",
  },
  {
    name: "Assign positions and collect deposits",
    text: "Once approved, assign a numbered waitlist position and collect a deposit — typically $200 to $500. Use a secure payment processor so buyers have a receipt and you have a paper trail. This confirms commitment and dramatically reduces no-shows.",
  },
  {
    name: "Send proactive updates at every milestone",
    text: "Communicate at breeding confirmation, pregnancy confirmation, birth, developmental milestones (eyes open, weaning, temperament testing), and go-home date. Buyers who feel informed don't flood your inbox with 'just checking in' messages.",
  },
  {
    name: "Match puppies to families based on temperament",
    text: "As puppies develop, evaluate energy levels, confidence, and sociability. Match each puppy to the family whose lifestyle and experience is the best fit — not just whoever is first on the list. Most buyers appreciate a breeder who prioritizes the right match.",
  },
];

const faqs = [
  {
    question: "How long should a puppy waitlist be?",
    answer:
      "Most breeders keep waitlists between 5 and 15 families per litter. Longer lists can work, but be transparent about expected wait times — some families may wait 6 to 12 months. If your list regularly exceeds 20, consider maintaining separate lists for upcoming and future litters so families know which breeding they're waiting for.",
  },
  {
    question: "How much should I charge for a puppy deposit?",
    answer:
      "Most breeders charge $200 to $500. The amount should be high enough to deter non-serious buyers but low enough not to create a barrier for qualified families. Always make your refund policy crystal clear before collecting any money — whether the deposit is non-refundable, partially refundable, or transferable to a future litter.",
  },
  {
    question: "What's the best way to collect deposits from buyers?",
    answer:
      "Use a secure payment processor like Stripe that gives both you and the buyer a receipt and transaction record. Avoid cash, personal Venmo, or Zelle for deposits — they offer no buyer protection, no paper trail, and look unprofessional. A proper payment link also lets buyers pay from anywhere without you exchanging bank details.",
  },
  {
    question: "How do I handle someone who drops off the waitlist?",
    answer:
      "Have a written policy before it happens. Most breeders offer to move the family to a future litter or forfeit the deposit after a grace period (7 to 14 days is common). Communicate professionally, document everything, and move the next family up immediately so no spot goes to waste.",
  },
  {
    question: "Should I let buyers choose their puppy or assign them?",
    answer:
      "Many experienced breeders assign puppies based on temperament matching rather than letting buyers pick. You know your puppies' personalities better than anyone, and matching a high-energy puppy to a sedentary household helps no one. If buyers push back, explain that your goal is the best possible outcome for every puppy and every family.",
  },
  {
    question: "How often should I send waitlist updates?",
    answer:
      "At key milestones: breeding confirmation, pregnancy confirmation, birth, major developmental stages (eyes open, weaning, first vet visit), and when go-home dates are set. Between milestones, monthly updates keep families engaged without creating extra work for you. Consistent communication is the single biggest factor in buyer satisfaction.",
  },
  {
    question: "What information should my application form collect?",
    answer:
      "At minimum: contact details, household composition (adults, children, other pets), housing type and yard situation, experience with dogs and specifically with the breed, daily schedule and who will be primary caregiver, and why they want a puppy from you. A veterinary reference is also valuable for verifying responsible pet ownership history.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HowTo",
      name: "How to Manage a Puppy Waitlist",
      description:
        "A step-by-step guide for dog breeders to set up and manage a professional puppy waitlist — from applications and deposits to communication and puppy matching.",
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
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "PawPage",
          item: "https://breeder-platform-moltcorporation.vercel.app",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Guides",
          item: "https://breeder-platform-moltcorporation.vercel.app/guides/breeder-guide",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Breeder Waitlist Guide",
          item: "https://breeder-platform-moltcorporation.vercel.app/guides/breeder-waitlist",
        },
      ],
    },
  ],
};

export default function BreederWaitlistGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
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
              href="/guides/breeder-guide"
              className="text-sm font-medium text-stone-600 hover:text-stone-900"
            >
              Guides
            </Link>
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-2xl px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-stone-400">
            <li>
              <Link href="/" className="hover:text-stone-600">
                PawPage
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/guides/breeder-guide" className="hover:text-stone-600">
                Guides
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-stone-600">Breeder Waitlist</li>
          </ol>
        </nav>

        {/* H1 */}
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          How to Manage a Puppy Waitlist
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-stone-600">
          You breed healthy, well-socialized puppies. Demand exceeds supply.
          Families are reaching out through Facebook, Instagram, email, and text
          — sometimes all at once. Without a system, messages get buried, deposits
          go uncollected, and good families slip through the cracks. A
          professional waitlist fixes all of this.
        </p>
        <p className="mt-4 leading-relaxed text-stone-600">
          This guide walks you through setting up a waitlist that protects your
          time, screens buyers properly, collects deposits securely, and keeps
          every family informed from application to go-home day. Whether
          you&apos;re managing your first litter or your twentieth, the
          fundamentals are the same.
        </p>

        {/* Why Breeders Need a Waitlist System */}
        <h2 className="mt-14 text-2xl font-bold text-stone-900">
          Why Breeders Need a Waitlist System
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          A waitlist isn&apos;t just a list of names — it&apos;s the backbone of
          a professional breeding program. Here&apos;s what changes when you
          have a real system in place instead of a spreadsheet and a stack of DMs.
        </p>
        <ul className="mt-6 space-y-4 text-stone-600">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">
                Stop losing buyers to chaos.
              </strong>{" "}
              When inquiries come through four different channels, someone gets
              forgotten. A centralized waitlist means every applicant is tracked,
              every deposit is recorded, and no family falls through the cracks.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">
                Screen before you commit.
              </strong>{" "}
              An application process lets you evaluate buyers before they get
              emotionally attached to a specific puppy. This protects your
              puppies and avoids the uncomfortable conversation of rejecting
              someone after they&apos;ve already picked a name.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">
                Deposits filter out tire-kickers.
              </strong>{" "}
              A financial commitment separates people who are genuinely ready for
              a puppy from people who are browsing. Without deposits, expect 30
              to 50 percent of your &quot;confirmed&quot; buyers to disappear
              when puppies are ready.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">
                Professionalism builds your reputation.
              </strong>{" "}
              Buyers talk to each other — especially in breed-specific
              communities. A structured, transparent process signals that you
              take your program seriously. It&apos;s one of the first things
              serious buyers look for when choosing a breeder.
            </span>
          </li>
        </ul>

        {/* Setting Up Your Waitlist: Step by Step */}
        <h2 className="mt-14 text-2xl font-bold text-stone-900">
          Setting Up Your Waitlist: Step by Step
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          Follow these six steps to build a waitlist system that saves you hours
          per litter and keeps every family happy.
        </p>
        <ol className="mt-6 space-y-8">
          {howToSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white">
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

        {/* Collecting Deposits Securely */}
        <h2 className="mt-14 text-2xl font-bold text-stone-900">
          Collecting Deposits Securely
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          How you collect money matters — both for your protection and your
          buyer&apos;s trust. The days of asking someone to Venmo you $300 with
          no receipt are over. Here&apos;s what a professional deposit process
          looks like.
        </p>
        <ul className="mt-6 space-y-4 text-stone-600">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">
                Use a payment processor, not personal transfers.
              </strong>{" "}
              Stripe, Square, or a similar service gives both parties a receipt,
              a transaction ID, and buyer protection. This is table stakes for
              any business handling hundreds of dollars.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">
                Write your refund policy and publish it.
              </strong>{" "}
              Before you collect a single dollar, decide: is the deposit
              non-refundable? Partially refundable? Transferable to a future
              litter? Put it in writing on your website and in your contract.
              Ambiguity leads to disputes.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">
                Send a confirmation immediately.
              </strong>{" "}
              When a deposit is received, send an automatic confirmation with the
              amount, date, waitlist position, and a copy of your policy. This
              eliminates &quot;did my payment go through?&quot; messages and
              creates a paper trail.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">
                Keep deposit records organized.
              </strong>{" "}
              Track who paid, when, how much, and which litter they&apos;re
              waiting for. When you&apos;re juggling 10 families across two
              litters, you need this information accessible — not buried in your
              Venmo transaction history.
            </span>
          </li>
        </ul>

        {/* Communicating with Buyers */}
        <h2 className="mt-14 text-2xl font-bold text-stone-900">
          Communicating with Buyers
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          The number one complaint from puppy buyers? Silence. They send a
          deposit, wait months, and hear nothing until puppies are born. Here is
          how to communicate in a way that keeps families engaged without
          creating more work for you.
        </p>
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="font-semibold text-stone-900">
              Set expectations on day one
            </h3>
            <p className="mt-1 leading-relaxed text-stone-600">
              When you confirm a waitlist position, tell the family exactly when
              they can expect updates. &quot;We send updates at breeding
              confirmation, pregnancy confirmation, birth, and go-home
              scheduling&quot; takes the guesswork out of the process.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-stone-900">
              Use milestone-based updates, not calendar-based
            </h3>
            <p className="mt-1 leading-relaxed text-stone-600">
              Committing to &quot;monthly updates&quot; creates pressure to say
              something even when there&apos;s nothing to report. Instead, tie
              updates to real events: breeding happened, pregnancy confirmed,
              puppies arrived, eyes are open, temperament testing done, go-home
              dates set.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-stone-900">
              Batch your communication
            </h3>
            <p className="mt-1 leading-relaxed text-stone-600">
              Don&apos;t respond to every individual message in real time. Set a
              time each day (or every other day) to respond to all waitlist
              inquiries at once. This keeps your focus on your dogs while still
              being responsive. If you use a waitlist management tool, you can
              send updates to all families at once instead of copying the same
              message twelve times.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-stone-900">
              Be honest about timeline changes
            </h3>
            <p className="mt-1 leading-relaxed text-stone-600">
              Breeding doesn&apos;t always go to plan. If a breeding
              doesn&apos;t take, the litter is smaller than expected, or
              go-home dates shift — tell your waitlist immediately. Families
              handle delays far better than surprises.
            </p>
          </div>
        </div>

        {/* Common Mistakes That Cost You Families */}
        <h2 className="mt-14 text-2xl font-bold text-stone-900">
          Common Mistakes That Cost You Families
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          These mistakes don&apos;t come from bad intentions — they come from
          outgrowing your tools. If any of these sound familiar, it&apos;s time
          to upgrade your process.
        </p>
        <ol className="mt-6 space-y-6">
          {[
            {
              title: "Managing everything through DMs",
              body: "Facebook Messenger, Instagram DMs, texts, emails — when inquiries come through four channels, information gets lost. You can't search, sort, or track conversations across platforms. Consolidate everything into one system.",
            },
            {
              title: "No application form",
              body: "If you're placing puppies based on who messages first rather than who is the best fit, you're not matching — you're first-come-first-served. An application lets you evaluate each family properly before they join your waitlist.",
            },
            {
              title: "Collecting deposits through personal payment apps",
              body: "Venmo and Zelle are designed for splitting dinner, not collecting business deposits. They offer no receipts, no dispute resolution, and no paper trail. One chargeback or misunderstanding and you have no documentation to fall back on.",
            },
            {
              title: "Going dark between milestones",
              body: "Buyers who hear nothing assume the worst. Even a brief \"no news is good news — breeding is planned for next month\" message prevents anxiety and keeps families from reaching out to other breeders.",
            },
            {
              title: "Not having a written waitlist policy",
              body: "When a buyer drops off and wants their deposit back, what happens? Without a written policy published before you collected money, you're in a he-said-she-said situation. Document your policy before you need it.",
            },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700">
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

        {/* CTA */}
        <div className="mt-14 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-8 text-center">
          <h2 className="text-xl font-bold text-stone-900">
            Your puppies deserve better than a spreadsheet.
          </h2>
          <p className="mt-2 text-stone-600">
            PawPage gives you a beautiful gallery, built-in waitlist management,
            puppy applications, and secure deposit collection — all in one place.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-block rounded-full bg-amber-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700"
          >
            Get started free
          </Link>
          <p className="mt-3 text-xs text-stone-400">
            No credit card required. Set up in under 5 minutes.
          </p>
        </div>

        {/* Choosing the Right Waitlist Tool */}
        <h2 className="mt-14 text-2xl font-bold text-stone-900">
          Spreadsheets vs. a Dedicated Waitlist Tool
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          Spreadsheets are free. They&apos;re also manual, error-prone, and
          invisible to your buyers. Here&apos;s when each option makes sense.
        </p>
        <div className="mt-6 overflow-hidden rounded-xl border border-stone-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-stone-700">
                  Feature
                </th>
                <th className="px-4 py-3 font-semibold text-stone-700">
                  Spreadsheet
                </th>
                <th className="px-4 py-3 font-semibold text-stone-700">
                  Waitlist tool
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {[
                ["Application forms", "Manual copy-paste", "Built-in, auto-organized"],
                ["Deposit collection", "Separate Venmo/Zelle", "Integrated Stripe payments"],
                ["Position tracking", "Manual numbering", "Automatic, buyer-visible"],
                ["Buyer updates", "Individual messages", "One-click to all families"],
                ["Puppy gallery", "Separate website needed", "Included with waitlist"],
                ["Mobile access", "Clunky on phone", "Fully responsive"],
              ].map(([feature, spreadsheet, tool], i) => (
                <tr key={i}>
                  <td className="px-4 py-3 font-medium text-stone-800">
                    {feature}
                  </td>
                  <td className="px-4 py-3 text-stone-500">{spreadsheet}</td>
                  <td className="px-4 py-3 text-stone-700">{tool}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 leading-relaxed text-stone-600">
          If you&apos;re breeding one litter a year with five families on your
          list, a spreadsheet works. If you&apos;re managing multiple litters,
          fielding dozens of applications, and collecting deposits from families
          in different states — a dedicated tool pays for itself in hours saved
          and buyers retained.
        </p>

        {/* FAQ */}
        <h2 className="mt-14 text-2xl font-bold text-stone-900">
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

        {/* Related Guides */}
        <div className="mt-14 rounded-xl border border-stone-200 bg-stone-50 p-6">
          <h2 className="font-semibold text-stone-900">Related guides</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href="/guides/breeder-guide"
                className="text-amber-700 hover:text-amber-800"
              >
                The Complete Guide to Running a Professional Breeding Program
                Online
              </Link>
            </li>
            <li>
              <Link
                href="/guides/puppy-application-form-template"
                className="text-amber-700 hover:text-amber-800"
              >
                Puppy Application Form Template: What Every Breeder Should Ask
              </Link>
            </li>
          </ul>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="font-semibold text-stone-900">PawPage</p>
            <p className="mt-1 text-sm text-stone-400">
              &copy; {new Date().getFullYear()} PawPage. All rights reserved.
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
          Secure payments via Stripe
        </p>
      </footer>
    </div>
  );
}
