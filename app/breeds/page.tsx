import Link from "next/link";
import type { Metadata } from "next";
import { BREEDS } from "@/lib/breeds";

export const metadata: Metadata = {
  title: "Dog Breeds Directory — PawPage",
  description:
    "Browse 50 popular dog breeds. Find breed information, average litter sizes, typical pricing, and connect with reputable breeders on PawPage.",
  openGraph: {
    title: "Dog Breeds Directory — PawPage",
    description: "Browse 50 popular dog breeds. Find breed info, pricing, and reputable breeders.",
    type: "website",
    siteName: "PawPage",
  },
};

export default function BreedsIndex() {
  const groups = Array.from(new Set(BREEDS.map((b) => b.group))).sort();

  return (
    <div className="min-h-screen bg-white">
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

      <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <nav className="mb-6 text-sm text-stone-500">
          <Link href="/" className="hover:text-amber-700">Home</Link>
          {" / "}
          <span className="text-stone-800">Breeds</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight text-stone-800 sm:text-4xl">
          Dog Breeds Directory
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-stone-600">
          Browse popular dog breeds, learn about their traits, and find reputable breeders on PawPage.
        </p>

        {groups.map((group) => (
          <div key={group} className="mt-10">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-stone-800">
              <span className="rounded-full bg-amber-100 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-amber-800">
                {group}
              </span>
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {BREEDS.filter((b) => b.group === group).map((breed) => (
                <Link
                  key={breed.slug}
                  href={`/breeds/${breed.slug}`}
                  className="group rounded-xl border border-stone-200 bg-white p-5 transition-all hover:border-amber-300 hover:shadow-md hover:shadow-amber-100/40"
                >
                  <h3 className="font-semibold text-stone-800 group-hover:text-amber-700">
                    {breed.name}
                  </h3>
                  <p className="mt-1 text-xs text-stone-500">
                    {breed.weight} · {breed.lifespan} · Litter: {breed.avgLitterSize}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm text-stone-600">
                    {breed.description}
                  </p>
                  <p className="mt-3 text-xs font-medium text-amber-700">
                    View breeders &rarr;
                  </p>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="mt-14 rounded-2xl border border-amber-200/60 bg-gradient-to-r from-amber-50 to-orange-50 p-8 text-center">
          <h2 className="text-xl font-bold text-stone-800">Are you a breeder?</h2>
          <p className="mx-auto mt-2 max-w-lg text-stone-600">
            Create your free gallery page and let families find you through our breed directory.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-block rounded-full bg-amber-600 px-8 py-3 text-sm font-semibold text-white shadow-md shadow-amber-200 hover:bg-amber-700"
          >
            Create your breeder page — free
          </Link>
        </div>
      </div>

      <footer className="border-t border-stone-200 bg-white px-4 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-stone-400">&copy; {new Date().getFullYear()} PawPage. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-stone-500">
            <Link href="/about" className="hover:text-amber-700">About</Link>
            <Link href="/terms" className="hover:text-amber-700">Terms</Link>
            <Link href="/privacy" className="hover:text-amber-700">Privacy</Link>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-stone-400">A Moltcorp product</p>
      </footer>
    </div>
  );
}
