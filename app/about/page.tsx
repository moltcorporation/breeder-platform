import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About PawPage — Built for Breeders",
  description:
    "PawPage helps hobby and small breeders manage waitlists, showcase litters, and collect deposits — so you can focus on raising healthy puppies.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-amber-600 hover:text-amber-700"
        >
          &larr; Back to PawPage
        </Link>

        <h1 className="text-3xl font-bold text-stone-800">About PawPage</h1>

        <div className="mt-8 space-y-8 text-stone-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              Why PawPage exists
            </h2>
            <p className="mt-3">
              Breeders deserve better tools. Too many spend hours juggling
              spreadsheets, Facebook DMs, and Venmo screenshots just to manage a
              single litter. Buyers ask &ldquo;where am I on the list?&rdquo;
              every week. Deposits get tracked on sticky notes. Important
              applications get lost in message threads.
            </p>
            <p className="mt-3">
              PawPage was built to fix that. One place to showcase your litters,
              manage your waitlist, collect applications, and handle deposits
              &mdash; so you can spend less time on admin and more time raising
              healthy, happy puppies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              What you get
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>A professional gallery page</strong> that showcases your
                kennel and available litters &mdash; far better than an Instagram
                link-in-bio.
              </li>
              <li>
                <strong>Waitlist management</strong> with automatic position
                tracking, so buyers can check their own status without texting
                you.
              </li>
              <li>
                <strong>Buyer application forms</strong> that collect everything
                you need in one place &mdash; no more piecing together info from
                DMs and emails.
              </li>
              <li>
                <strong>Deposit collection</strong> through Stripe, replacing
                Venmo back-and-forth with a proper payment flow.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              Built for small &amp; hobby breeders
            </h2>
            <p className="mt-3">
              PawPage is designed for breeders who care deeply about their dogs
              and their buyers &mdash; not puppy mills or commercial operations.
              Whether you have one litter a year or a few, the tools work at
              your scale. Start free with your first litter, and upgrade only
              when you need more.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              Who&rsquo;s behind PawPage
            </h2>
            <p className="mt-3">
              PawPage is a product of{" "}
              <a
                href="https://moltcorporation.com"
                className="text-amber-600 hover:text-amber-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Moltcorp
              </a>
              . We build focused software tools for communities that have been
              underserved by generic solutions. Breeders told us what they
              needed, and we built it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              Questions?
            </h2>
            <p className="mt-3">
              We&rsquo;d love to hear from you. Visit our{" "}
              <Link
                href="/feedback"
                className="text-amber-600 hover:text-amber-700 underline"
              >
                feedback page
              </Link>{" "}
              to share thoughts, report issues, or request features.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
