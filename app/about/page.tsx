import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About PawPage — Built for Breeders",
  description:
    "PawPage helps dog breeders manage waitlists, showcase litters, and handle buyer applications. Learn about our mission.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-stone-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl items-center gap-2">
          <Link
            href="/"
            className="text-sm font-medium text-stone-600 transition hover:text-amber-700"
          >
            &larr; Back to PawPage
          </Link>
        </div>
      </nav>
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-stone-800">
          About PawPage
        </h1>

        <div className="mt-8 space-y-6 text-stone-700 leading-relaxed">
          <p>
            PawPage was built for breeders who care about doing things right
            &mdash; the ones who health-test, socialize every puppy, and vet
            every buyer application by hand. The ones who are still managing all
            of that in spreadsheets and Facebook DMs.
          </p>

          <p>
            We believe responsible breeders deserve better tools. A professional
            gallery page that buyers can actually find on Google. A waitlist
            that tracks itself. Application forms that collect what you need
            without the back-and-forth.
          </p>

          <h2 className="text-xl font-semibold text-stone-800">
            What PawPage does
          </h2>

          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Gallery pages</strong> &mdash; A beautiful public page
              for your kennel with puppy photos, litter details, and breed
              information. Indexed by search engines so buyers find you.
            </li>
            <li>
              <strong>Waitlist management</strong> &mdash; Buyers see their
              position. You stop answering &ldquo;where am I on the
              list?&rdquo; texts.
            </li>
            <li>
              <strong>Application forms</strong> &mdash; Collect living
              situation, experience, references, and anything else you need.
              All organized in your dashboard.
            </li>
            <li>
              <strong>Deposit tracking</strong> &mdash; Keep a clear record of
              who has paid and how much. No more digging through Venmo
              screenshots.
            </li>
          </ul>

          <h2 className="text-xl font-semibold text-stone-800">
            Simple pricing
          </h2>

          <p>
            PawPage is <strong>free forever for your first litter</strong>.
            No credit card required. When you&apos;re ready for more, Basic is
            $15/mo and Pro is $29/mo. No contracts, cancel anytime.
          </p>

          <h2 className="text-xl font-semibold text-stone-800">
            Your data, your control
          </h2>

          <p>
            Buyer applications are private to you. We don&apos;t sell data, we
            don&apos;t run ads, and we don&apos;t share your information with
            third parties. Read our{" "}
            <Link
              href="/privacy"
              className="text-amber-700 underline hover:text-amber-800"
            >
              Privacy Policy
            </Link>{" "}
            for full details.
          </p>

          <h2 className="text-xl font-semibold text-stone-800">
            Get in touch
          </h2>

          <p>
            Have questions, feedback, or feature requests? We&apos;d love to
            hear from you. Use our{" "}
            <Link
              href="/feedback"
              className="text-amber-700 underline hover:text-amber-800"
            >
              feedback form
            </Link>{" "}
            to reach us.
          </p>
        </div>

        <div className="mt-12">
          <Link
            href="/register"
            className="inline-block rounded-full bg-amber-600 px-8 py-3 text-sm font-semibold text-white shadow-md shadow-amber-200/50 transition hover:bg-amber-700 hover:shadow-lg"
          >
            Create your free gallery
          </Link>
        </div>
      </main>
    </div>
  );
}
