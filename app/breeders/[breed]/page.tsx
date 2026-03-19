import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/db";
import { breeders, puppies, litters } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";
import { US_STATES, BREEDS } from "@/lib/breeds";

function formatBreed(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function isStateCode(param: string): boolean {
  return param.length === 2 && param.toLowerCase() in US_STATES;
}

type Props = { params: Promise<{ breed: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { breed } = await params;

  if (isStateCode(breed)) {
    const stateName = US_STATES[breed.toLowerCase()];
    const title = `Dog Breeders in ${stateName} — PawPage`;
    const description = `Find reputable dog breeders in ${stateName}. Browse breeder galleries, check waitlist availability, and apply for puppies on PawPage.`;
    return {
      title,
      description,
      openGraph: { title, description, type: "website", siteName: "PawPage" },
      twitter: { card: "summary", title, description },
    };
  }

  const breedName = formatBreed(breed);
  const title = `${breedName} Breeders by State — PawPage`;
  const description = `Find ${breedName} breeders across the United States. Browse by state to find reputable breeders near you with available puppies.`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website", siteName: "PawPage" },
    twitter: { card: "summary", title, description },
  };
}

async function StateDirectoryPage({ stateCode }: { stateCode: string }) {
  const stateName = US_STATES[stateCode.toLowerCase()];

  const stateBreeders = await db
    .select()
    .from(breeders)
    .where(sql`lower(${breeders.state}) = ${stateCode.toLowerCase()}`);

  const breedersWithPuppies = await Promise.all(
    stateBreeders.map(async (breeder) => {
      const breederLitters = await db
        .select()
        .from(litters)
        .where(eq(litters.breederId, breeder.id));
      let availablePuppyCount = 0;
      for (const litter of breederLitters) {
        const availablePups = await db
          .select()
          .from(puppies)
          .where(and(eq(puppies.litterId, litter.id), eq(puppies.status, "available")));
        availablePuppyCount += availablePups.length;
      }
      return { ...breeder, availablePuppyCount };
    })
  );

  const kennelSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Dog Breeders in ${stateName}`,
    description: `Directory of dog breeders in ${stateName}`,
    numberOfItems: breedersWithPuppies.length,
    itemListElement: breedersWithPuppies.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Organization",
        name: b.kennelName,
        address: { "@type": "PostalAddress", addressLocality: b.city, addressRegion: stateCode.toUpperCase() },
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="fixed top-0 z-50 w-full border-b border-stone-200/60 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-stone-800">
            <svg className="h-7 w-7 text-amber-600" viewBox="0 0 24 24" fill="currentColor">
              <ellipse cx="7.5" cy="7" rx="2.2" ry="2.8" /><ellipse cx="16.5" cy="7" rx="2.2" ry="2.8" />
              <ellipse cx="4" cy="12.5" rx="2" ry="2.5" /><ellipse cx="20" cy="12.5" rx="2" ry="2.5" />
              <path d="M12 22c-3 0-5.5-2-6.5-4.5-.7-1.8.3-3.5 2-4 1.2-.3 2.5.2 3.2 1.2.5.7 1.1 1.3 1.3 1.3s.8-.6 1.3-1.3c.7-1 2-1.5 3.2-1.2 1.7.5 2.7 2.2 2 4C17.5 20 15 22 12 22z" />
            </svg>
            PawPage
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-stone-600 hover:text-amber-700">Login</Link>
            <Link href="/register" className="rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-amber-200 hover:bg-amber-700">Get started free</Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <nav className="mb-6 text-sm text-stone-500">
          <Link href="/" className="hover:text-amber-700">Home</Link>
          {" / "}
          <span className="text-stone-800">Breeders in {stateName}</span>
        </nav>

        <h1 className="text-3xl font-bold text-stone-800 sm:text-4xl">
          Dog Breeders in {stateName}
        </h1>
        <p className="mt-2 text-stone-600">
          {breedersWithPuppies.length > 0
            ? `${breedersWithPuppies.length} registered breeder${breedersWithPuppies.length !== 1 ? "s" : ""} in ${stateName}.`
            : `No breeders registered in ${stateName} yet.`}{" "}
          Browse galleries, check availability, and apply directly.
        </p>

        {breedersWithPuppies.length === 0 ? (
          <div className="mt-12 rounded-xl border border-stone-200 bg-white p-12 text-center">
            <h2 className="text-xl font-semibold text-stone-800">No breeders yet</h2>
            <p className="mt-2 text-stone-500">Are you a breeder in {stateName}?</p>
            <Link href="/register" className="mt-4 inline-block rounded-full bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-amber-200 hover:bg-amber-700">
              List your kennel — free
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {breedersWithPuppies.map((breeder) => (
              <Link
                key={breeder.id}
                href={`/${kennelSlug(breeder.kennelName)}`}
                className="block rounded-xl border border-stone-200 bg-white p-6 transition-shadow hover:border-amber-300 hover:shadow-md hover:shadow-amber-100/40"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-stone-800">{breeder.kennelName}</h2>
                    <p className="mt-1 text-sm text-stone-500">{breeder.city}, {stateCode.toUpperCase()}</p>
                  </div>
                  {breeder.availablePuppyCount > 0 && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                      {breeder.availablePuppyCount} available
                    </span>
                  )}
                </div>
                {breeder.breeds && breeder.breeds.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {breeder.breeds.map((b) => (
                      <span key={b} className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs text-amber-800 border border-amber-200/60">{b}</span>
                    ))}
                  </div>
                )}
                {breeder.bio && <p className="mt-3 text-sm text-stone-600 line-clamp-2">{breeder.bio}</p>}
                <p className="mt-3 text-sm font-medium text-amber-700">View gallery &rarr;</p>
              </Link>
            ))}
          </div>
        )}

        {/* Browse by breed in this state */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-stone-800">Browse by Breed in {stateName}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {BREEDS.slice(0, 20).map((b) => (
              <Link
                key={b.slug}
                href={`/breeders/${b.slug}/${stateCode.toLowerCase()}`}
                className="rounded-full border border-stone-200 px-3 py-1 text-xs text-stone-600 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800"
              >
                {b.name}
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-amber-200/60 bg-gradient-to-r from-amber-50 to-orange-50 p-8 text-center">
          <h2 className="text-xl font-bold text-stone-800">Are you a breeder in {stateName}?</h2>
          <p className="mx-auto mt-2 max-w-lg text-stone-600">
            Create your free gallery page and let families searching for breeders in {stateName} find you.
          </p>
          <Link href="/register" className="mt-6 inline-block rounded-full bg-amber-600 px-8 py-3 text-sm font-semibold text-white shadow-md shadow-amber-200 hover:bg-amber-700">
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
        <p className="mt-4 text-center text-xs text-stone-400">Secure payments via Stripe</p>
      </footer>
    </div>
  );
}

export default async function BreedIndexPage({ params }: Props) {
  const { breed } = await params;

  if (isStateCode(breed)) {
    return <StateDirectoryPage stateCode={breed} />;
  }

  const breedName = formatBreed(breed);

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 z-50 w-full border-b border-stone-200/60 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight text-stone-800">
            <svg className="h-7 w-7 text-amber-600" viewBox="0 0 24 24" fill="currentColor">
              <ellipse cx="7.5" cy="7" rx="2.2" ry="2.8" /><ellipse cx="16.5" cy="7" rx="2.2" ry="2.8" />
              <ellipse cx="4" cy="12.5" rx="2" ry="2.5" /><ellipse cx="20" cy="12.5" rx="2" ry="2.5" />
              <path d="M12 22c-3 0-5.5-2-6.5-4.5-.7-1.8.3-3.5 2-4 1.2-.3 2.5.2 3.2 1.2.5.7 1.1 1.3 1.3 1.3s.8-.6 1.3-1.3c.7-1 2-1.5 3.2-1.2 1.7.5 2.7 2.2 2 4C17.5 20 15 22 12 22z" />
            </svg>
            PawPage
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-stone-600 hover:text-amber-700">Login</Link>
            <Link href="/register" className="rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-amber-200 hover:bg-amber-700">Get started free</Link>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <nav className="mb-6 text-sm text-stone-500">
          <Link href="/" className="hover:text-amber-700">Home</Link>
          {" / "}
          <Link href="/breeds" className="hover:text-amber-700">Breeds</Link>
          {" / "}
          <span className="text-stone-800">{breedName} Breeders</span>
        </nav>

        <h1 className="text-3xl font-bold text-stone-800 sm:text-4xl">
          {breedName} Breeders by State
        </h1>
        <p className="mt-2 text-stone-600">
          Find reputable {breedName} breeders near you. Select your state to
          browse breeders, view galleries, and apply for puppies.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {Object.entries(US_STATES).map(([code, name]) => (
            <Link
              key={code}
              href={`/breeders/${breed}/${code}`}
              className="rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm text-stone-700 transition-colors hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800"
            >
              {name}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-amber-200/60 bg-gradient-to-r from-amber-50 to-orange-50 p-8 text-center">
          <h2 className="text-xl font-bold text-stone-800">Are you a {breedName} breeder?</h2>
          <p className="mx-auto mt-2 max-w-lg text-stone-600">
            Create your free gallery page and let families find you through our breeder directory.
          </p>
          <Link href="/register" className="mt-6 inline-block rounded-full bg-amber-600 px-8 py-3 text-sm font-semibold text-white shadow-md shadow-amber-200 hover:bg-amber-700">
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
        <p className="mt-4 text-center text-xs text-stone-400">Secure payments via Stripe</p>
      </footer>
    </div>
  );
}
