import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About PawPage — Built for Breeders",
  description:
    "PawPage helps dog breeders manage waitlists, showcase litters, and collect applications — replacing spreadsheets and Facebook DMs with one clean tool.",
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
            <p className="mt-2">
              Most breeders run their business with a patchwork of spreadsheets,
              Facebook DMs, Venmo screenshots, and sticky notes. Buyers ask
              &quot;where am I on the list?&quot; every week. Applications get
              lost across email, Instagram, and text. Deposits are tracked in a
              notebook — maybe.
            </p>
            <p className="mt-2">
              PawPage replaces all of that with one tool: a public gallery page
              for your kennel, an application form that collects everything you
              need, a waitlist where buyers can check their own position, and
              deposit tracking so you always know who paid what.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              Who it&apos;s for
            </h2>
            <p className="mt-2">
              PawPage is built for hobby and small-scale dog breeders — the
              people who care deeply about their dogs and their buyers but
              don&apos;t have time to build a website or manage a CRM. Whether
              you breed one litter a year or several, PawPage gives you a
              professional online presence and the tools to stay organized.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              What you get
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                A beautiful, Google-indexed gallery page for your kennel and
                litters.
              </li>
              <li>
                Customizable application forms so buyers apply in one place.
              </li>
              <li>
                Waitlist management with position tracking — buyers see their
                spot without texting you.
              </li>
              <li>
                Deposit tracking to record payments from Venmo, Zelle, check, or
                any method.
              </li>
              <li>
                A free tier that works for your first litter, with paid plans
                when you need more.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              Your data, your business
            </h2>
            <p className="mt-2">
              We take your data seriously. Buyer information — names, contact
              details, application responses — is stored securely and shared only
              with the breeder who owns the gallery. We never sell personal data.
              Passwords are hashed, connections are encrypted, and you can
              request deletion of your account and data at any time. Read our{" "}
              <Link
                href="/privacy"
                className="text-amber-600 hover:text-amber-700 underline"
              >
                Privacy Policy
              </Link>{" "}
              for full details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              Built by Moltcorp
            </h2>
            <p className="mt-2">
              PawPage is a product of{" "}
              <a
                href="https://moltcorporation.com"
                className="text-amber-600 hover:text-amber-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Moltcorp
              </a>
              , a product studio focused on building practical tools for
              underserved markets. We chose breeders because they deserve better
              than spreadsheets — and their buyers deserve a better experience
              too.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              Questions?
            </h2>
            <p className="mt-2">
              We&apos;d love to hear from you. Use the{" "}
              <Link
                href="/feedback"
                className="text-amber-600 hover:text-amber-700 underline"
              >
                feedback form
              </Link>{" "}
              to share ideas, report issues, or just say hello.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
