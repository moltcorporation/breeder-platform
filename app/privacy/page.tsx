import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | PawPage",
  description:
    "PawPage privacy policy — how we collect, use, and protect your data on our breeder waitlist and gallery platform.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-amber-600 hover:text-amber-700"
        >
          &larr; Back to PawPage
        </Link>

        <h1 className="text-3xl font-bold text-stone-800">Privacy Policy</h1>
        <p className="mt-2 text-sm text-stone-500">
          Last updated: March 19, 2026
        </p>

        <div className="mt-8 space-y-8 text-stone-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              1. Information We Collect
            </h2>

            <h3 className="mt-4 font-medium text-stone-800">
              Breeder Account Information
            </h3>
            <p className="mt-1">
              When you create an account, we collect your name, email address,
              password (stored in hashed form), and kennel name. You may
              optionally provide additional kennel details, photos, and breed
              information.
            </p>

            <h3 className="mt-4 font-medium text-stone-800">
              Buyer Application Data
            </h3>
            <p className="mt-1">
              When buyers submit applications through a breeder&apos;s PawPage
              gallery, we collect the information they provide, which may include
              their name, email address, phone number, and responses to
              application questions set by the breeder.
            </p>

            <h3 className="mt-4 font-medium text-stone-800">
              Waitlist and Deposit Information
            </h3>
            <p className="mt-1">
              We store waitlist positions, application status, and deposit
              records (amounts and dates). Payment processing is handled by
              Stripe; we do not store full credit card numbers.
            </p>

            <h3 className="mt-4 font-medium text-stone-800">Usage Data</h3>
            <p className="mt-1">
              We automatically collect basic usage data such as pages visited,
              browser type, and IP address to improve the service and diagnose
              issues.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              2. How We Use Your Information
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                To provide and maintain the PawPage service, including your
                gallery pages, waitlist, and application management.
              </li>
              <li>
                To process deposits and payments through our payment provider.
              </li>
              <li>
                To send transactional emails (account verification, password
                resets, application notifications).
              </li>
              <li>To improve the service based on usage patterns.</li>
              <li>
                To enforce our{" "}
                <Link
                  href="/terms"
                  className="text-amber-600 hover:text-amber-700 underline"
                >
                  Terms of Service
                </Link>
                .
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              3. How We Share Your Information
            </h2>
            <p className="mt-2">
              We do not sell your personal information. We share data only in
              these cases:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong>Public gallery pages:</strong> Kennel name, breed
                information, litter details, and photos you upload are publicly
                visible on your gallery page.
              </li>
              <li>
                <strong>Buyer applications:</strong> Application data submitted
                by buyers is shared with the breeder who owns the gallery.
              </li>
              <li>
                <strong>Payment processing:</strong> We share necessary payment
                information with Stripe to process deposits.
              </li>
              <li>
                <strong>Legal requirements:</strong> We may disclose information
                if required by law or to protect the rights and safety of our
                users.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              4. Data Retention
            </h2>
            <p className="mt-2">
              We retain your account data for as long as your account is active.
              If you delete your account, we will delete your personal data
              within 30 days, except where retention is required by law or for
              legitimate business purposes (such as resolving disputes or
              maintaining financial records).
            </p>
            <p className="mt-2">
              Buyer application data is retained as long as the breeder&apos;s
              account is active. Buyers may request deletion of their application
              data by contacting the breeder or by using the feedback form.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              5. Data Security
            </h2>
            <p className="mt-2">
              We use industry-standard security measures to protect your data,
              including encrypted connections (HTTPS), hashed passwords, and
              secure database hosting. However, no method of transmission or
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              6. Your Rights
            </h2>
            <p className="mt-2">You have the right to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction of inaccurate data.</li>
              <li>
                Request deletion of your account and associated data.
              </li>
              <li>
                Export your data (kennel info, litter details, application
                records).
              </li>
            </ul>
            <p className="mt-2">
              To exercise these rights, use the{" "}
              <Link
                href="/feedback"
                className="text-amber-600 hover:text-amber-700 underline"
              >
                feedback form
              </Link>{" "}
              or contact us through your account settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              7. Cookies
            </h2>
            <p className="mt-2">
              We use essential cookies to maintain your login session and
              remember your preferences. We do not use third-party advertising or
              tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              8. Children&apos;s Privacy
            </h2>
            <p className="mt-2">
              PawPage is not intended for use by anyone under the age of 18. We
              do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              9. Changes to This Policy
            </h2>
            <p className="mt-2">
              We may update this policy from time to time. We will notify you of
              material changes via email or through the service. Continued use
              after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              10. Contact
            </h2>
            <p className="mt-2">
              Questions about this policy? Use the{" "}
              <Link
                href="/feedback"
                className="text-amber-600 hover:text-amber-700 underline"
              >
                feedback form
              </Link>{" "}
              to reach us.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
