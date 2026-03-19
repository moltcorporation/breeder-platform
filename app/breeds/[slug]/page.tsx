import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BREEDS, getBreedBySlug, US_STATES } from "@/lib/breeds";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return BREEDS.map((breed) => ({ slug: breed.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const breed = getBreedBySlug(slug);
  if (!breed) return {};

  const title = `${breed.name} Breeders — PawPage`;
  const description = `Find reputable ${breed.name} breeders on PawPage. ${breed.description.slice(0, 100)} Average litter size: ${breed.avgLitterSize}. Typical price: ${breed.typicalPriceRange}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "PawPage",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function BreedPage({ params }: Props) {
  const { slug } = await params;
  const breed = getBreedBySlug(slug);
  if (!breed) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: `${breed.name} — Breed Information`,
    description: breed.description,
    publisher: {
      "@type": "Organization",
      name: "PawPage",
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-stone-200/60 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-stone-800">
            <svg className="h-7 w-7 text-amber-600" viewBox="0 0 24 24" fill="currentColor">
              <ellipse cx="7.5" cy="7" rx="2.2" ry="2.8" />
              <ellipse cx="16.5" cy="7" rx="2.2" ry="2.8" />
              <ellipse cx="4" cy="12.5" rx="2" ry="2.5" />
              <ellipse cx="20" cy="12.5" rx="2" ry="2.5" />
              <path d="M12 22c-3 0-5.5-2-6.5-4.5-.7-1.8.3-3.5 2-4 1.2-.3 2.5.2 3.2 1.2.5.7 1.1 1.3 1.3 1.3s.8-.6 1.3-1.3c.7-1 2-1.5 3.2-1.2 1.7.5 2.7 2.2 2 4C17.5 20 15 22 12 22z" />
            </svg>
            PawPage
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-stone-600 hover:text-amber-700">Login</Link>
            <Link href="/register" className="rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-amber-200 hover:bg-amber-700">
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-stone-500">
          <Link href="/" className="hover:text-amber-700">Home</Link>
          {" / "}
          <Link href="/breeds" className="hover:text-amber-700">Breeds</Link>
          {" / "}
          <span className="text-stone-800">{breed.name}</span>
        </nav>

        {/* Header */}
        <div className="rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-8 sm:p-10">
          <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-amber-700">
            <span className="rounded-full bg-amber-100 px-3 py-0.5 text-xs">{breed.group} Group</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl">
            {breed.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-600">
            {breed.description}
          </p>
        </div>

        {/* Quick Facts */}
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Avg Litter Size", value: breed.avgLitterSize },
            { label: "Typical Price", value: breed.typicalPriceRange },
            { label: "Weight", value: breed.weight },
            { label: "Lifespan", value: breed.lifespan },
          ].map((fact) => (
            <div key={fact.label} className="rounded-xl border border-stone-200 bg-white p-5 text-center shadow-sm">
              <p className="text-xs font-medium uppercase tracking-wider text-stone-400">{fact.label}</p>
              <p className="mt-2 text-lg font-semibold text-stone-800">{fact.value}</p>
            </div>
          ))}
        </div>

        {/* Temperament */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-stone-800">Temperament</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {breed.temperament.map((t) => (
              <span key={t} className="rounded-full bg-amber-50 px-4 py-1.5 text-sm font-medium text-amber-800 border border-amber-200/60">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Find Breeders by State */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-stone-800">
            Find {breed.name} Breeders by State
          </h2>
          <p className="mt-2 text-stone-600">
            Browse reputable {breed.name} breeders near you. Select your state to view breeder galleries and apply for puppies.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {Object.entries(US_STATES).map(([code, name]) => (
              <Link
                key={code}
                href={`/breeders/${breed.slug}/${code}`}
                className="rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 transition-colors hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800"
              >
                {name}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-amber-200/60 bg-gradient-to-r from-amber-50 to-orange-50 p-8 text-center">
          <h2 className="text-xl font-bold text-stone-800">
            Are you a {breed.name} breeder?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-stone-600">
            Create your free gallery page on PawPage. Showcase your litters, manage your waitlist, and let families find you.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-block rounded-full bg-amber-600 px-8 py-3 text-sm font-semibold text-white shadow-md shadow-amber-200 hover:bg-amber-700"
          >
            Create your breeder page — free
          </Link>
        </div>

        {/* Browse other breeds */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-stone-800">Browse Other Breeds</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {BREEDS.filter((b) => b.slug !== breed.slug)
              .slice(0, 12)
              .map((b) => (
                <Link
                  key={b.slug}
                  href={`/breeds/${b.slug}`}
                  className="rounded-full border border-stone-200 px-3 py-1 text-xs text-stone-600 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800"
                >
                  {b.name}
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white px-4 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-stone-400">&copy; {new Date().getFullYear()} PawPage. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-stone-500">
            <Link href="/about" className="hover:text-amber-700">About</Link>
            <Link href="/terms" className="hover:text-amber-700">Terms</Link>
            <Link href="/privacy" className="hover:text-amber-700">Privacy</Link>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-stone-400">Secure payments via Stripe</p>
      </footer>
    </div>
  );
}
