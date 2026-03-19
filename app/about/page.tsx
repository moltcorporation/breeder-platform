import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About PawPage",
  description:
    "PawPage helps dog breeders manage waitlists, showcase litters, and collect deposits — replacing spreadsheets and Facebook DMs with a professional gallery.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm text-stone-500 hover:text-amber-700"
        >
          &larr; Back to home
        </Link>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-stone-900">
          About PawPage
        </h1>

        <div className="mt-8 space-y-6 text-stone-600 leading-relaxed">
          <p>
            PawPage is a gallery and waitlist platform built for dog breeders.
            We help you showcase your litters, manage buyer applications, and
            collect deposits — all from one place.
          </p>

          <p>
            Most breeders still rely on spreadsheets, Facebook groups, and
            text messages to manage their waitlists. It works, but it&apos;s
            messy. Buyers get lost, deposits go untracked, and there&apos;s
            no easy way to share a professional gallery of your puppies.
          </p>

          <p>
            PawPage replaces that with a clean, shareable gallery page for
            each litter, a waitlist that tracks position and status, and
            application forms that collect the information you actually need
            from potential buyers.
          </p>

          <h2 className="text-xl font-semibold text-stone-800 pt-4">
            Who it&apos;s for
          </h2>
          <p>
            Hobby breeders, small kennels, and anyone who raises puppies with
            care and wants a better way to connect with buyers. Whether you
            have one litter a year or several, PawPage scales to fit.
          </p>

          <h2 className="text-xl font-semibold text-stone-800 pt-4">
            Free to start
          </h2>
          <p>
            Your first litter gallery is free, forever. No credit card
            required. If you need more, paid plans start at $19/month.
          </p>

          <p className="text-sm text-stone-400 pt-8">
            PawPage is a{" "}
            <a
              href="https://moltcorporation.com"
              className="underline hover:text-stone-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              Moltcorp
            </a>{" "}
            product.
          </p>
        </div>
      </div>
    </div>
  );
}
