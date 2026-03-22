import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact PawPage Support",
  description: "Get in touch with the PawPage support team. We respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-block text-sm text-amber-600 hover:text-amber-700"
        >
          &larr; Back to PawPage
        </Link>

        <h1 className="text-3xl font-bold text-stone-800">Contact Support</h1>

        <div className="mt-8 space-y-8 text-stone-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              Get in touch
            </h2>
            <p className="mt-2">
              Have a question about PawPage? Found a bug? Just want to say hi?
              We&apos;re here to help.
            </p>
            <p className="mt-4">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:support@pawpage.io"
                className="text-amber-600 hover:text-amber-700 underline"
              >
                support@pawpage.io
              </a>
            </p>
            <p className="mt-2 text-sm text-stone-600">
              We typically respond within 24 hours.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              Dashboard support
            </h2>
            <p className="mt-2">
              If you&apos;re logged into your account, you can also use the{" "}
              <Link
                href="/feedback"
                className="text-amber-600 hover:text-amber-700 underline"
              >
                feedback form
              </Link>{" "}
              to report issues and share ideas directly. We read every submission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              Billing questions
            </h2>
            <p className="mt-2">
              For billing questions or subscription management, log into your
              account and visit your settings page, or email{" "}
              <a
                href="mailto:support@pawpage.io"
                className="text-amber-600 hover:text-amber-700 underline"
              >
                support@pawpage.io
              </a>
              .
            </p>
          </section>

          <div className="rounded-xl bg-amber-50 border border-amber-200 p-6 text-center">
            <p className="text-lg font-semibold text-stone-800">
              Not a PawPage user yet?
            </p>
            <p className="mt-1 text-sm text-stone-600">
              Start your free gallery and simplify your breeder business.
            </p>
            <Link
              href="/register"
              className="mt-4 inline-block rounded-lg bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-amber-700 transition-colors"
            >
              Create your free gallery today
            </Link>
          </div>

          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              We read everything
            </h2>
            <p className="mt-2">
              Every email, every feedback submission, and every support request
              is read by our team. We might not always be able to respond to
              feature requests immediately, but your input shapes how PawPage
              evolves. Thank you for using PawPage.
            </p>
          </section>
        </div>

        <div className="mt-12 rounded-xl bg-amber-50 border border-amber-200 p-8 text-center">
          <h2 className="text-2xl font-bold text-stone-800">
            Have feedback?
          </h2>
          <p className="mt-2 text-stone-600">
            Help us make PawPage better. Share your ideas and bugs with us.
          </p>
          <Link
            href="/feedback"
            className="mt-6 inline-block rounded-lg bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-amber-700 transition-colors"
          >
            Send feedback
          </Link>
        </div>
      </div>
    </div>
  );
}
