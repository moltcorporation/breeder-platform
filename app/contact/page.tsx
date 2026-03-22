import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact & Support | PawPage",
  description:
    "Get help with your PawPage breeder account. Email support, response times, and FAQs for gallery pages, applications, and deposits.",
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

        <h1 className="text-3xl font-bold text-stone-800">Support & Contact</h1>
        <p className="mt-2 text-sm text-stone-500">
          We're here to help. Here's how to reach us.
        </p>

        <div className="mt-8 space-y-8 text-stone-700 leading-relaxed">
          {/* Primary Support */}
          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              Email Support
            </h2>
            <p className="mt-3">
              Have a question about your gallery, applications, deposits, or
              account? Reach out to us at:
            </p>
            <div className="mt-3 rounded-lg bg-amber-50 p-4 border border-amber-200">
              <p className="text-center">
                <a
                  href="mailto:support@pawpage.io"
                  className="text-amber-700 font-semibold hover:underline"
                >
                  support@pawpage.io
                </a>
              </p>
              <p className="mt-2 text-center text-sm text-stone-600">
                Response time: <strong>48 hours</strong> (usually faster)
              </p>
            </div>
            <p className="mt-4 text-sm text-stone-600">
              We respond to all support emails within 48 hours during business
              days. Most inquiries are answered within 24 hours.
            </p>
          </section>

          {/* Common Issues */}
          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              Common Questions
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="font-medium text-stone-800">
                  How do I reset my password?
                </h3>
                <p className="mt-1 text-sm text-stone-600">
                  Click "Forgot password?" on the login page. You'll
                  receive an email with a reset link within minutes.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-stone-800">
                  Can I upgrade or downgrade my plan?
                </h3>
                <p className="mt-1 text-sm text-stone-600">
                  Yes! Log in to your dashboard, go to Settings, and click
                  "Manage Subscription." Changes take effect
                  immediately.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-stone-800">
                  How do I cancel my subscription?
                </h3>
                <p className="mt-1 text-sm text-stone-600">
                  Go to your dashboard Settings and click "Manage
                  Subscription." You can cancel anytime. No questions
                  asked.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-stone-800">
                  How secure are my photos and applicant data?
                </h3>
                <p className="mt-1 text-sm text-stone-600">
                  Your data is encrypted in transit and at rest. We use Stripe
                  for all payment processing (we never see credit card numbers).
                  See our{" "}
                  <Link
                    href="/privacy"
                    className="text-amber-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>{" "}
                  for details.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-stone-800">
                  What if I need to delete my account?
                </h3>
                <p className="mt-1 text-sm text-stone-600">
                  Email{" "}
                  <a
                    href="mailto:support@pawpage.io"
                    className="text-amber-600 hover:underline"
                  >
                    support@pawpage.io
                  </a>{" "}
                  and we'll deactivate your account within 3 business days. Your
                  data will be deleted within 30 days.
                </p>
              </div>
            </div>
          </section>

          {/* Support by Tier */}
          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              Support Included with Your Plan
            </h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-stone-200 bg-white p-4">
                <h3 className="font-medium text-stone-800">Free & Basic Plans</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-stone-600">
                  <li>Email support</li>
                  <li>Response time: 48 hours</li>
                  <li>Access to documentation and guides</li>
                </ul>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <h3 className="font-medium text-stone-800">Pro Plan</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-stone-600">
                  <li>Email support</li>
                  <li>Response time: 48 hours</li>
                  <li>Access to documentation and guides</li>
                </ul>
                <p className="mt-3 text-xs text-stone-500">
                  All plans receive the same high-quality support. Premium
                  features are available separately on request.
                </p>
              </div>
            </div>
          </section>

          {/* Feedback */}
          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              Share Feedback
            </h2>
            <p className="mt-3">
              Have a suggestion for a new feature? Found a bug? We'd love to
              hear from you.
            </p>
            <div className="mt-3">
              <Link
                href="/feedback"
                className="inline-block rounded-lg bg-amber-600 px-6 py-2 font-medium text-white transition hover:bg-amber-700"
              >
                Send Feedback
              </Link>
            </div>
          </section>

          {/* Response Times */}
          <section>
            <h2 className="text-xl font-semibold text-stone-800">
              Support Hours & Holidays
            </h2>
            <p className="mt-3">
              We respond to support emails Monday–Friday, 9 AM–5 PM EST. During
              holidays and weekends, responses may take longer, but we'll
              get back to you as soon as possible.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
