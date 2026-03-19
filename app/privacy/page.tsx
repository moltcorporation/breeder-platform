import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — PawPage",
  description:
    "Privacy Policy for PawPage. Learn how we handle breeder and buyer data, applications, and deposit records.",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-stone-500">
          Last updated: March 19, 2026
        </p>

        <div className="mt-8 space-y-8 text-stone-700 leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              1. What We Collect
            </h2>
            <p className="mt-2">We collect different data depending on your role:</p>
            <h3 className="mt-4 font-semibold text-stone-800">
              Breeder accounts
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Name and email address</li>
              <li>Kennel name</li>
              <li>Password (stored as a secure hash, never in plain text)</li>
              <li>Litter and puppy information you add to your gallery</li>
              <li>Photos you upload</li>
              <li>Deposit records you create</li>
            </ul>
            <h3 className="mt-4 font-semibold text-stone-800">
              Buyer applications
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Name and contact information (email, phone number)</li>
              <li>Application form responses (living situation, experience, references)</li>
              <li>Waitlist position</li>
              <li>Deposit amounts and status</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              2. How We Use Your Data
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>To provide the PawPage service (gallery pages, waitlist management, application forms)</li>
              <li>To display your public gallery page to potential buyers</li>
              <li>To send transactional emails (account verification, password resets)</li>
              <li>To process subscription payments through Stripe</li>
              <li>To improve the service based on aggregate usage patterns</li>
            </ul>
            <p className="mt-2">
              We do not sell your data to third parties. We do not use your data
              for advertising.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              3. Public Information
            </h2>
            <p className="mt-2">
              Your gallery page is public by design &mdash; it is meant to be
              found by potential buyers through search engines and direct links.
              Information displayed on your gallery page (kennel name, breed,
              litter details, photos) is publicly accessible. Buyer application
              data is <strong>not</strong> publicly visible and is only
              accessible to the breeder who owns the gallery.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              4. Data Storage and Security
            </h2>
            <p className="mt-2">
              Your data is stored in a secure PostgreSQL database hosted by
              Neon. Passwords are hashed using industry-standard algorithms. All
              connections use HTTPS encryption. Payment information is handled
              entirely by Stripe and never touches our servers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              5. Third-Party Services
            </h2>
            <p className="mt-2">We use the following third-party services:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>
                <strong>Stripe</strong> &mdash; payment processing for
                subscriptions. Stripe&apos;s privacy policy applies to payment
                data.
              </li>
              <li>
                <strong>Vercel</strong> &mdash; hosting and content delivery
              </li>
              <li>
                <strong>Neon</strong> &mdash; database hosting
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              6. Data Retention
            </h2>
            <p className="mt-2">
              We retain your data for as long as your account is active. If you
              delete your account, we will remove your data within 30 days.
              Buyer application data is retained as long as the associated
              breeder account is active. Breeders may delete individual buyer
              applications at any time.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              7. Your Rights
            </h2>
            <p className="mt-2">You have the right to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>Access the data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and data</li>
              <li>Export your data</li>
            </ul>
            <p className="mt-2">
              Buyers who have submitted applications can contact the breeder
              directly to request data access or deletion.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              8. Cookies
            </h2>
            <p className="mt-2">
              We use essential cookies to maintain your login session. We do not
              use tracking cookies or third-party analytics cookies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              9. Changes to This Policy
            </h2>
            <p className="mt-2">
              We may update this policy from time to time. We will notify
              registered users of material changes via email. Continued use of
              PawPage after changes constitutes acceptance of the updated
              policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-stone-800">
              10. Contact
            </h2>
            <p className="mt-2">
              Privacy questions? Use our{" "}
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
