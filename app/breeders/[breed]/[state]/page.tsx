import { db } from "@/db";
import { breeders, puppies, litters } from "@/db/schema";
import { eq, sql, and } from "drizzle-orm";
import type { Metadata } from "next";
import Link from "next/link";

const stateNames: Record<string, string> = {
  al: "Alabama", ak: "Alaska", az: "Arizona", ar: "Arkansas", ca: "California",
  co: "Colorado", ct: "Connecticut", de: "Delaware", fl: "Florida", ga: "Georgia",
  hi: "Hawaii", id: "Idaho", il: "Illinois", in: "Indiana", ia: "Iowa",
  ks: "Kansas", ky: "Kentucky", la: "Louisiana", me: "Maine", md: "Maryland",
  ma: "Massachusetts", mi: "Michigan", mn: "Minnesota", ms: "Mississippi",
  mo: "Missouri", mt: "Montana", ne: "Nebraska", nv: "Nevada", nh: "New Hampshire",
  nj: "New Jersey", nm: "New Mexico", ny: "New York", nc: "North Carolina",
  nd: "North Dakota", oh: "Ohio", ok: "Oklahoma", or: "Oregon", pa: "Pennsylvania",
  ri: "Rhode Island", sc: "South Carolina", sd: "South Dakota", tn: "Tennessee",
  tx: "Texas", ut: "Utah", vt: "Vermont", va: "Virginia", wa: "Washington",
  wv: "West Virginia", wi: "Wisconsin", wy: "Wyoming",
};

function formatBreed(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function slugifyBreed(breed: string): string {
  return breed.toLowerCase().replace(/\s+/g, "-");
}

type Props = { params: Promise<{ breed: string; state: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { breed, state } = await params;
  const breedName = formatBreed(breed);
  const stateName = stateNames[state.toLowerCase()] || state.toUpperCase();

  return {
    title: `${breedName} Breeders in ${stateName} — Find Reputable Breeders`,
    description: `Browse ${breedName} breeders in ${stateName}. View galleries, check waitlist availability, and apply directly. Find your perfect puppy from health-tested, responsible breeders.`,
  };
}

export default async function BreederDirectoryPage({ params }: Props) {
  const { breed, state } = await params;
  const breedName = formatBreed(breed);
  const stateCode = state.toUpperCase();
  const stateName = stateNames[state.toLowerCase()] || stateCode;

  const matchingBreeders = await db
    .select()
    .from(breeders)
    .where(
      and(
        sql`lower(${breeders.state}) = ${state.toLowerCase()}`,
        sql`${breedName} = ANY(${breeders.breeds})`
      )
    );

  const breedersWithPuppies = await Promise.all(
    matchingBreeders.map(async (breeder) => {
      const breederLitters = await db
        .select()
        .from(litters)
        .where(eq(litters.breederId, breeder.id));

      let availablePuppyCount = 0;
      for (const litter of breederLitters) {
        const availablePups = await db
          .select()
          .from(puppies)
          .where(
            and(
              eq(puppies.litterId, litter.id),
              eq(puppies.status, "available")
            )
          );
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
    name: `${breedName} Breeders in ${stateName}`,
    description: `Directory of ${breedName} breeders in ${stateName}`,
    numberOfItems: breedersWithPuppies.length,
    itemListElement: breedersWithPuppies.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Organization",
        name: b.kennelName,
        address: {
          "@type": "PostalAddress",
          addressLocality: b.city,
          addressRegion: stateCode,
        },
      },
    })),
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-12">
        <nav className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-700 dark:hover:text-zinc-200">
            Home
          </Link>
          {" / "}
          <Link
            href={`/breeders/${breed}`}
            className="hover:text-zinc-700 dark:hover:text-zinc-200"
          >
            {breedName} Breeders
          </Link>
          {" / "}
          <span className="text-zinc-700 dark:text-zinc-200">{stateName}</span>
        </nav>

        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          {breedName} Breeders in {stateName}
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {breedersWithPuppies.length > 0
            ? `${breedersWithPuppies.length} registered breeder${breedersWithPuppies.length !== 1 ? "s" : ""} in ${stateName}.`
            : `No ${breedName} breeders registered in ${stateName} yet.`}{" "}
          Browse galleries, check availability, and apply directly.
        </p>

        {breedersWithPuppies.length === 0 ? (
          <div className="mt-12 rounded-xl border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              No breeders yet
            </h2>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
              Are you a {breedName} breeder in {stateName}?
            </p>
            <Link
              href="/register"
              className="mt-4 inline-block rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              List your kennel — free
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {breedersWithPuppies.map((breeder) => (
              <Link
                key={breeder.id}
                href={`/${kennelSlug(breeder.kennelName)}`}
                className="block rounded-xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                      {breeder.kennelName}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      {breeder.city}, {stateCode}
                    </p>
                  </div>
                  {breeder.availablePuppyCount > 0 && (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                      {breeder.availablePuppyCount} available
                    </span>
                  )}
                </div>
                {breeder.breeds && breeder.breeds.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {breeder.breeds.map((b) => (
                      <span
                        key={b}
                        className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                )}
                {breeder.bio && (
                  <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                    {breeder.bio}
                  </p>
                )}
                <p className="mt-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  View gallery &rarr;
                </p>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Are you a {breedName} breeder in {stateName}?
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Create your free gallery page and start accepting applications.
            Families searching for &ldquo;{breedName} breeders in{" "}
            {stateName}&rdquo; will find you here.
          </p>
          <Link
            href="/register"
            className="mt-4 inline-block rounded-lg bg-zinc-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            List your kennel — free
          </Link>
        </div>

        <div className="mt-8 text-sm text-zinc-500 dark:text-zinc-400">
          <h3 className="font-medium text-zinc-700 dark:text-zinc-300">
            Other popular breeds in {stateName}
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {["Golden Retriever", "French Bulldog", "Labrador", "Poodle", "German Shepherd"]
              .filter((b) => slugifyBreed(b) !== breed)
              .map((b) => (
                <Link
                  key={b}
                  href={`/breeders/${slugifyBreed(b)}/${state.toLowerCase()}`}
                  className="rounded-full border border-zinc-200 px-3 py-1 text-xs hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  {b} Breeders
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
