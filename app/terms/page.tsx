import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — PawPage",
  description:
    "Terms of Service for PawPage, the waitlist and gallery platform for dog breeders.",
};

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          Last updated: March 19, 2026
        </p>

        <div className="mt-8 space-y-8 text-stone-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              1. Acceptance of Terms
            </h2>
            <p className="mt-2">
              By creating an account or using PawPage, you agree to these Terms
              of Service. If you do not agree, do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              2. Description of Service
            </h2>
            <p className="mt-2">
              PawPage provides kennel gallery pages, waitlist management, puppy
              application forms, and deposit tracking tools for dog breeders.
              The service is available through web browsers at our website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              3. Account Responsibilities
            </h2>
            <p className="mt-2">
              You are responsible for maintaining the security of your account
              credentials and for all activity under your account. You must
              provide accurate information when registering, including your
              kennel name and contact details.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              4. Acceptable Use
            </h2>
            <p className="mt-2">You agree not to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                Use the service for any unlawful purpose or in violation of any
                applicable laws
              </li>
              <li>
                Post misleading information about puppies, litters, or your
                breeding program
              </li>
              <li>
                Upload content that infringes on the intellectual property
                rights of others
              </li>
              <li>
                Attempt to gain unauthorized access to other users&apos;
                accounts or data
              </li>
              <li>
                Use the service to facilitate puppy mills or inhumane breeding
                practices
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              5. Content and Data
            </h2>
            <p className="mt-2">
              You retain ownership of all content you upload, including photos,
              kennel descriptions, and litter information. By using PawPage, you
              grant us a license to display this content on your public gallery
              page and within the service as necessary to provide the platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              6. Buyer Applications and Data
            </h2>
            <p className="mt-2">
              When buyers submit applications through your PawPage gallery, you
              are the data controller for that information. You are responsible
              for handling buyer data (names, contact information, living
              situation details) in compliance with applicable privacy laws.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              7. Payments and Subscriptions
            </h2>
            <p className="mt-2">
              Paid plans are billed monthly through Stripe. You may cancel at
              any time and your access will continue through the end of the
              current billing period. No refunds are issued for partial months.
              Deposit tracking within PawPage is a record-keeping tool only
              &mdash; PawPage does not process deposits between breeders and
              buyers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              8. Service Availability
            </h2>
            <p className="mt-2">
              We strive to keep PawPage available at all times but do not
              guarantee uninterrupted service. We may perform maintenance or
              updates that temporarily affect availability.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              9. Termination
            </h2>
            <p className="mt-2">
              We may suspend or terminate accounts that violate these terms. You
              may delete your account at any time. Upon termination, your public
              gallery page will be removed and your data will be deleted in
              accordance with our{" "}
              <Link
                href="/privacy"
                className="text-amber-700 underline hover:text-amber-800"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              10. Limitation of Liability
            </h2>
            <p className="mt-2">
              PawPage is provided &ldquo;as is&rdquo; without warranties of any
              kind. We are not liable for any disputes between breeders and
              buyers, including those related to deposits, puppy sales, or
              application outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              11. Changes to Terms
            </h2>
            <p className="mt-2">
              We may update these terms from time to time. Continued use of
              PawPage after changes constitutes acceptance of the updated terms.
              We will notify registered users of material changes via email.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              12. Contact
            </h2>
            <p className="mt-2">
              Questions about these terms? Use our{" "}
              <Link
                href="/feedback"
                className="text-amber-700 underline hover:text-amber-800"
              >
                feedback form
              </Link>{" "}
              to get in touch.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
