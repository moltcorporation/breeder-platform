import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "The Complete Guide to Running a Professional Breeding Program Online",
  description:
    "Learn how to set up a breeder website, manage puppy waitlists, collect deposits securely, and stop losing buyers to Facebook DMs and spreadsheets.",
  openGraph: {
    title:
      "The Complete Guide to Running a Professional Breeding Program Online",
    description:
      "Set up your breeder website, manage waitlists, collect deposits securely, and stop losing buyers to spreadsheets.",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "The Complete Guide to Running a Professional Breeding Program Online",
    description:
      "Set up your breeder website, manage waitlists, collect deposits securely, and stop losing buyers to spreadsheets.",
  },
};

const faqs = [
  {
    question: "How much should I charge for a puppy deposit?",
    answer:
      "Most breeders charge $200 to $500. The amount should be high enough to deter non-serious buyers but not so high that it creates a barrier for qualified families. Make your refund policy crystal clear before collecting any money.",
  },
  {
    question: "Do I really need a website as a breeder?",
    answer:
      "Yes. Buyers research breeders online before reaching out. A professional gallery page with your dogs, health testing results, and waitlist info builds trust before the first conversation. Facebook pages and Instagram alone don't give buyers confidence you're established.",
  },
  {
    question: "How do I handle deposits for a litter that hasn't been born yet?",
    answer:
      "Be transparent about timelines. Collect deposits only after confirming the breeding, and make it clear the deposit secures a position — not a specific puppy. Offer to transfer deposits to a future litter if the breeding doesn't take or produces fewer puppies than expected.",
  },
  {
    question: "What's the best way to show my dogs and litters online?",
    answer:
      "A dedicated gallery page with professional photos, health clearances, titles, and pedigree information. Each dog should have their own profile. Buyers want to see both parents, not just cute puppy photos. Include temperament descriptions so buyers can imagine life with your dogs.",
  },
  {
    question: "How do I stop getting overwhelmed by messages from buyers?",
    answer:
      "Use an application form instead of fielding individual messages. Direct all inquiries to one place, set expectations about response times, and send proactive updates at key milestones so buyers don't need to ask. A waitlist tool that lets buyers check their own status eliminates most repetitive questions.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
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
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function BreederGuidePage() {
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
          The Complete Guide to Running a Professional Breeding Program Online
        </h1>

        {/* Intro */}
        <p className="mt-6 text-lg leading-relaxed text-stone-600">
          You got into breeding because you love your dogs. But between managing
          waitlists in spreadsheets, chasing deposits through Venmo, and
          answering the same questions in Facebook DMs, the admin work can bury
          you. This guide covers how to set up a professional online presence,
          manage your waitlist, collect deposits securely, and communicate with
          buyers — without losing your mind.
        </p>

        {/* Why Spreadsheets and Facebook DMs Fail */}
        <h2 className="mt-12 text-2xl font-bold text-stone-900">
          Why Spreadsheets and Facebook DMs Fail at Scale
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          Every breeder starts the same way: a Facebook page, a Google Sheet,
          and a Venmo account. It works for your first litter. By your third,
          it&apos;s a liability.
        </p>
        <ul className="mt-4 space-y-3 text-stone-600">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">
                Messages get lost.
              </strong>{" "}
              Facebook DMs, Instagram messages, texts, emails — buyer inquiries
              are scattered across 4+ platforms. You forget who asked first. A
              serious buyer waits days for a reply and moves on.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">
                Spreadsheets go stale.
              </strong>{" "}
              You update the sheet after a phone call but forget after a text.
              Positions get confused. A family you told was #3 finds out
              they&apos;re actually #5. Trust evaporates.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">
                No self-service for buyers.
              </strong>{" "}
              Every &ldquo;where am I on the list?&rdquo; message is a task for
              you. Multiply that by 15 families and you&apos;re spending hours
              answering the same question.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">
                No paper trail for deposits.
              </strong>{" "}
              Venmo screenshots aren&apos;t receipts. When a buyer disputes a
              deposit six months later, you need real transaction records — not a
              text thread.
            </span>
          </li>
        </ul>

        {/* Setting Up a Professional Breeder Gallery */}
        <h2 className="mt-12 text-2xl font-bold text-stone-900">
          Setting Up a Professional Breeder Gallery
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          Buyers research breeders online before they ever reach out. Your
          online presence is your first impression — and for many buyers,
          it&apos;s the deciding factor between contacting you or the breeder
          with the nicer website.
        </p>
        <p className="mt-4 leading-relaxed text-stone-600">
          A professional breeder gallery should include:
        </p>
        <ul className="mt-4 space-y-3 text-stone-600">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">
                Individual profiles for each dog.
              </strong>{" "}
              Name, breed, age, health testing results, titles, and temperament
              description. Buyers want to know both parents, not just see puppy
              photos.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">
                High-quality photos.
              </strong>{" "}
              Natural light, clean background, dogs looking their best. Skip the
              blurry phone shots. If you can, include both stacked (show) and
              candid (personality) photos.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">
                Health clearance documentation.
              </strong>{" "}
              OFA, PennHIP, genetic testing results. Responsible buyers look for
              this. Making it visible signals transparency and commitment to the
              breed.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">
                Current litter information.
              </strong>{" "}
              Expected due dates, available puppies, pricing, and how to apply.
              Don&apos;t make buyers hunt for this — put it front and center.
            </span>
          </li>
        </ul>

        {/* CTA - Gallery */}
        <div className="mt-8 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-8 text-center">
          <h3 className="text-lg font-bold text-stone-900">
            Build your breeder gallery in minutes.
          </h3>
          <p className="mt-2 text-sm text-stone-600">
            PawPage gives you a professional gallery page with dog profiles,
            litter pages, and a built-in application form — no coding or design
            skills needed.
          </p>
          <Link
            href="/register"
            className="mt-5 inline-block rounded-full bg-amber-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700"
          >
            Start your free gallery
          </Link>
        </div>

        {/* Managing Applications and Waitlist Positioning */}
        <h2 className="mt-12 text-2xl font-bold text-stone-900">
          Managing Buyer Applications and Waitlist Positioning
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          An application form is the most important tool a breeder has for
          screening homes. It protects your puppies, saves you time, and gives
          you a structured way to compare families.
        </p>
        <p className="mt-4 leading-relaxed text-stone-600">
          Once a buyer passes your screening, they need a clear position on your
          waitlist. The keys to making this work:
        </p>
        <ol className="mt-4 space-y-4">
          <li className="flex items-start gap-4 text-stone-600">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white">
              1
            </span>
            <div>
              <strong className="text-stone-800">
                Screen before you assign a position.
              </strong>{" "}
              Don&apos;t add someone to the waitlist just because they messaged
              you. An application form filters out impulse buyers before they
              waste a spot.
            </div>
          </li>
          <li className="flex items-start gap-4 text-stone-600">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white">
              2
            </span>
            <div>
              <strong className="text-stone-800">
                Make positions visible.
              </strong>{" "}
              Buyers who can check their own status don&apos;t need to message
              you. A waitlist tool that shows &ldquo;You are position #4 of
              8&rdquo; eliminates 90% of status update requests.
            </div>
          </li>
          <li className="flex items-start gap-4 text-stone-600">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white">
              3
            </span>
            <div>
              <strong className="text-stone-800">
                Have a clear policy for drops.
              </strong>{" "}
              When someone leaves the waitlist, document it and move the next
              family up immediately. Don&apos;t leave gaps.
            </div>
          </li>
          <li className="flex items-start gap-4 text-stone-600">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white">
              4
            </span>
            <div>
              <strong className="text-stone-800">
                Match puppies to families, not first-come-first-served.
              </strong>{" "}
              Position determines priority, but temperament matching determines
              the final placement. The best breeders reserve the right to match
              based on fit.
            </div>
          </li>
        </ol>
        <p className="mt-4 text-sm text-stone-500">
          For a deeper dive on waitlist management, see our{" "}
          <Link
            href="/guides/how-to-manage-puppy-waitlist"
            className="text-amber-600 underline hover:text-amber-700"
          >
            complete waitlist guide
          </Link>{" "}
          and{" "}
          <Link
            href="/guides/puppy-application-form-template"
            className="text-amber-600 underline hover:text-amber-700"
          >
            application form template
          </Link>
          .
        </p>

        {/* Collecting Deposits Securely */}
        <h2 className="mt-12 text-2xl font-bold text-stone-900">
          Collecting Deposits Securely: Why Venmo Screenshots Are Risky
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          Collecting deposits is where most breeders take on unnecessary risk.
          Venmo, Zelle, and Cash App are designed for splitting dinner bills —
          not for business transactions with strangers.
        </p>
        <ul className="mt-4 space-y-3 text-stone-600">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">
                No buyer protection means disputes get ugly.
              </strong>{" "}
              If a buyer asks for their deposit back, you have no formal dispute
              resolution process. It&apos;s your word against theirs — and that
              conversation often plays out publicly in Facebook groups.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">
                No receipts.
              </strong>{" "}
              A Venmo transaction note that says &ldquo;puppy deposit&rdquo;
              isn&apos;t a receipt. You need a record that includes the
              buyer&apos;s name, the amount, the date, your refund policy, and
              what the deposit secures. Payment processors like Stripe generate
              this automatically.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">
                Tax reporting is a headache.
              </strong>{" "}
              If you&apos;re earning income from breeding, you need clear
              financial records. Personal payment apps mix your puppy deposits
              with your grocery money. A dedicated payment system keeps
              everything separate.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">
                It looks unprofessional.
              </strong>{" "}
              Buyers who are paying $2,000+ for a well-bred puppy expect a
              professional transaction. Asking someone to &ldquo;just Venmo
              me&rdquo; signals that your program might not be as established as
              your website suggests.
            </span>
          </li>
        </ul>
        <p className="mt-4 leading-relaxed text-stone-600">
          The safer approach: use a payment processor that generates real
          receipts, enforces your refund policy, and keeps your business finances
          separate from your personal accounts. Your buyers get a professional
          experience, and you get a clean paper trail.
        </p>

        {/* Communication Tips */}
        <h2 className="mt-12 text-2xl font-bold text-stone-900">
          Communication Tips: Reducing &ldquo;Where Am I on the List?&rdquo;
          Messages
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          The number one complaint from breeders isn&apos;t difficult buyers —
          it&apos;s the volume of repetitive messages. Most of these messages
          exist because buyers don&apos;t know what&apos;s happening. Fix the
          information gap and you fix the inbox problem.
        </p>
        <ol className="mt-4 space-y-4">
          <li className="flex items-start gap-4 text-stone-600">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">
              1
            </span>
            <div>
              <strong className="text-stone-800">
                Set expectations upfront.
              </strong>{" "}
              When a buyer joins your waitlist, tell them exactly when they will
              hear from you next. &ldquo;I&apos;ll send an update when the
              breeding is confirmed, expected mid-April&rdquo; eliminates weeks
              of check-in messages.
            </div>
          </li>
          <li className="flex items-start gap-4 text-stone-600">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">
              2
            </span>
            <div>
              <strong className="text-stone-800">
                Send milestone updates proactively.
              </strong>{" "}
              Breeding confirmed. Pregnancy confirmed. Puppies born. Eyes open.
              Go-home date set. A brief update at each milestone keeps buyers
              informed and excited without you having to field individual
              questions.
            </div>
          </li>
          <li className="flex items-start gap-4 text-stone-600">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">
              3
            </span>
            <div>
              <strong className="text-stone-800">
                Give buyers a way to check their own status.
              </strong>{" "}
              If buyers can log in and see their waitlist position, litter
              updates, and deposit status, they don&apos;t need to message you.
              Self-service eliminates the majority of routine inquiries.
            </div>
          </li>
          <li className="flex items-start gap-4 text-stone-600">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">
              4
            </span>
            <div>
              <strong className="text-stone-800">
                Use one channel, not five.
              </strong>{" "}
              Pick one platform for buyer communication and stick with it.
              Splitting conversations across Facebook, text, email, and
              Instagram guarantees you&apos;ll miss something. Direct everyone to
              your application form and waitlist system.
            </div>
          </li>
        </ol>

        {/* CTA - Final */}
        <div className="mt-12 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-8 text-center">
          <h2 className="text-xl font-bold text-stone-900">
            Your puppies deserve better than spreadsheets.
          </h2>
          <p className="mt-2 text-stone-600">
            PawPage handles your gallery, waitlist, applications, and deposits
            — so you can focus on your dogs.
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

        {/* Related Guides */}
        <h2 className="mt-16 text-2xl font-bold text-stone-900">
          More Breeder Guides
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/guides/how-to-manage-puppy-waitlist"
            className="rounded-xl border border-stone-200 p-5 transition hover:border-amber-300 hover:shadow-sm"
          >
            <h3 className="font-semibold text-stone-900">
              How to Manage a Puppy Waitlist
            </h3>
            <p className="mt-1 text-sm text-stone-500">
              Step-by-step guide to creating and running a professional waitlist
              system.
            </p>
          </Link>
          <Link
            href="/guides/puppy-application-form-template"
            className="rounded-xl border border-stone-200 p-5 transition hover:border-amber-300 hover:shadow-sm"
          >
            <h3 className="font-semibold text-stone-900">
              Puppy Application Form Template
            </h3>
            <p className="mt-1 text-sm text-stone-500">
              Essential questions every responsible breeder should ask
              applicants.
            </p>
          </Link>
        </div>
      </article>

      <ArticleFooter />
    </div>
  );
}
