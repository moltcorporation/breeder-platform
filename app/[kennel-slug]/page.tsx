import { db } from "@/db";
import { breeders, dogs, litters, puppies, waitlist } from "@/db/schema";
import { eq, sql, count } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function slugToSql(slug: string) {
  return sql`lower(replace(${breeders.kennelName}, ' ', '-'))`.mapWith(
    String
  );
}

async function getBreederBySlug(slug: string) {
  const rows = await db
    .select()
    .from(breeders)
    .where(sql`lower(replace(${breeders.kennelName}, ' ', '-')) = ${slug}`)
    .limit(1);
  return rows[0] ?? null;
}

type BreederRow = NonNullable<Awaited<ReturnType<typeof getBreederBySlug>>>;

async function getBreederDogs(breederId: string) {
  return db.select().from(dogs).where(eq(dogs.breederId, breederId));
}

async function getBreederLitters(breederId: string) {
  return db.select().from(litters).where(eq(litters.breederId, breederId));
}

async function getLitterPuppies(litterIds: string[]) {
  if (litterIds.length === 0) return [];
  return db
    .select()
    .from(puppies)
    .where(sql`${puppies.litterId} IN ${litterIds}`);
}

async function getWaitlistCount(breederId: string) {
  const rows = await db
    .select({ value: count() })
    .from(waitlist)
    .where(eq(waitlist.breederId, breederId));
  return rows[0]?.value ?? 0;
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

type PageProps = { params: Promise<{ "kennel-slug": string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { "kennel-slug": slug } = await params;
  const breeder = await getBreederBySlug(slug);
  if (!breeder) return { title: "Not Found" };

  const breedLabel =
    breeder.breeds && breeder.breeds.length > 0
      ? breeder.breeds.join(" & ")
      : "Dog";

  const location = [breeder.city, breeder.state].filter(Boolean).join(", ");

  return {
    title: `${breeder.kennelName} — ${breedLabel} Breeder${location ? ` in ${location}` : ""}`,
    description: `View available puppies from ${breeder.kennelName}. Join the waitlist to bring home your new family member.${breeder.bio ? ` ${breeder.bio.slice(0, 120)}` : ""}`,
  };
}

// ---------------------------------------------------------------------------
// Status badge
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    available: "bg-emerald-100 text-emerald-800",
    reserved: "bg-amber-100 text-amber-800",
    deposit: "bg-sky-100 text-sky-800",
  };
  const base = styles[status] ?? "bg-gray-100 text-gray-800";
  return (
    <span
      className={`inline-block rounded-full px-3 py-0.5 text-xs font-semibold uppercase tracking-wide ${base}`}
    >
      {status}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Sub-components (all server-safe, no "use client")
// ---------------------------------------------------------------------------

function KennelHeader({ breeder }: { breeder: BreederRow }) {
  const location = [breeder.city, breeder.state].filter(Boolean).join(", ");
  return (
    <section className="text-center">
      <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
        {breeder.kennelName}
      </h1>
      {location && (
        <p className="mt-2 text-lg text-stone-500">{location}</p>
      )}
      {breeder.bio && (
        <p className="mx-auto mt-4 max-w-2xl text-stone-600 leading-relaxed">
          {breeder.bio}
        </p>
      )}
      {breeder.breeds && breeder.breeds.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {breeder.breeds.map((b) => (
            <span
              key={b}
              className="rounded-full bg-amber-50 border border-amber-200 px-4 py-1 text-sm font-medium text-amber-800"
            >
              {b}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}

function WaitlistCTA({
  slug,
  waitlistCount,
}: {
  slug: string;
  waitlistCount: number;
}) {
  return (
    <section className="rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-8 text-center">
      <h2 className="text-2xl font-bold text-stone-900">
        Join Our Waitlist
      </h2>
      <p className="mt-2 text-stone-600">
        {waitlistCount > 0
          ? `${waitlistCount} ${waitlistCount === 1 ? "family" : "families"} waiting`
          : "Be the first to join!"}
      </p>
      <a
        href={`/${slug}/apply`}
        className="mt-5 inline-block rounded-full bg-amber-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
      >
        Apply Now
      </a>
    </section>
  );
}

type PuppyRow = Awaited<ReturnType<typeof getLitterPuppies>>[number];

function PuppyCard({ puppy }: { puppy: PuppyRow }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md">
      {/* Photo placeholder */}
      <div className="flex h-48 items-center justify-center bg-stone-100">
        <svg
          className="h-16 w-16 text-stone-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
          />
        </svg>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-stone-900">{puppy.name}</h3>
          <StatusBadge status={puppy.status} />
        </div>
        <div className="mt-2 flex gap-3 text-sm text-stone-500">
          <span className="capitalize">{puppy.gender}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{puppy.color}</span>
        </div>
      </div>
    </div>
  );
}

function AvailablePuppies({
  allPuppies,
  slug,
}: {
  allPuppies: PuppyRow[];
  slug: string;
}) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-900">Available Puppies</h2>
      {allPuppies.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-stone-300 p-10 text-center">
          <p className="text-stone-500">
            No puppies available right now.{" "}
            <a
              href={`/${slug}/apply`}
              className="font-medium text-amber-600 underline hover:text-amber-700"
            >
              Join our waitlist
            </a>{" "}
            to be notified.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allPuppies.map((p) => (
            <PuppyCard key={p.id} puppy={p} />
          ))}
        </div>
      )}
    </section>
  );
}

type LitterRow = Awaited<ReturnType<typeof getBreederLitters>>[number];
type DogRow = Awaited<ReturnType<typeof getBreederDogs>>[number];

function LitterCard({
  litter,
  dogsMap,
  puppyCountMap,
}: {
  litter: LitterRow;
  dogsMap: Map<string, DogRow>;
  puppyCountMap: Map<string, number>;
}) {
  const dam = dogsMap.get(litter.damId);
  const sire = dogsMap.get(litter.sireId);
  const dateLabel = litter.whelpDate
    ? `Born ${new Date(litter.whelpDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
    : litter.expectedDate
      ? `Expected ${new Date(litter.expectedDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`
      : null;

  const pCount = puppyCountMap.get(litter.id) ?? litter.puppyCount ?? 0;

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          {dateLabel && (
            <p className="text-sm font-medium text-stone-500">{dateLabel}</p>
          )}
          <div className="mt-1 flex items-center gap-2 text-stone-900">
            <span className="font-semibold">{dam?.name ?? "Dam"}</span>
            <span className="text-stone-400">&times;</span>
            <span className="font-semibold">{sire?.name ?? "Sire"}</span>
          </div>
        </div>
        <span className="rounded-full bg-stone-100 px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-stone-600">
          {litter.status}
        </span>
      </div>
      <p className="mt-3 text-sm text-stone-500">
        {pCount} {pCount === 1 ? "puppy" : "puppies"}
      </p>
    </div>
  );
}

function CurrentLitters({
  breederLitters,
  dogsMap,
  puppyCountMap,
}: {
  breederLitters: LitterRow[];
  dogsMap: Map<string, DogRow>;
  puppyCountMap: Map<string, number>;
}) {
  if (breederLitters.length === 0) return null;
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-900">Current Litters</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {breederLitters.map((l) => (
          <LitterCard
            key={l.id}
            litter={l}
            dogsMap={dogsMap}
            puppyCountMap={puppyCountMap}
          />
        ))}
      </div>
    </section>
  );
}

function AboutSection({ breeder }: { breeder: BreederRow }) {
  if (!breeder.bio) return null;
  return (
    <section className="rounded-2xl bg-stone-50 p-8 sm:p-10">
      <h2 className="text-2xl font-bold text-stone-900">
        About {breeder.kennelName}
      </h2>
      <p className="mt-4 whitespace-pre-line leading-relaxed text-stone-600">
        {breeder.bio}
      </p>
      {breeder.breeds && breeder.breeds.length > 0 && (
        <p className="mt-4 text-sm text-stone-500">
          <span className="font-medium text-stone-700">Breeds:</span>{" "}
          {breeder.breeds.join(", ")}
        </p>
      )}
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-stone-200 py-10 text-center text-sm text-stone-400">
      <p>
        Powered by{" "}
        <span className="font-semibold text-stone-600">PawPage</span>
      </p>
      <p className="mt-1">
        Are you a breeder?{" "}
        <a
          href="/register"
          className="font-medium text-amber-600 underline hover:text-amber-700"
        >
          Create your free gallery
        </a>
      </p>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function KennelPage({ params }: PageProps) {
  const { "kennel-slug": slug } = await params;

  const breeder = await getBreederBySlug(slug);
  if (!breeder) notFound();

  // Parallel data fetching
  const [breederDogs, breederLitters, waitlistCount] = await Promise.all([
    getBreederDogs(breeder.id),
    getBreederLitters(breeder.id),
    getWaitlistCount(breeder.id),
  ]);

  const litterIds = breederLitters.map((l) => l.id);
  const allPuppies = await getLitterPuppies(litterIds);

  // Maps for easy lookups
  const dogsMap = new Map(breederDogs.map((d) => [d.id, d]));
  const puppyCountMap = new Map<string, number>();
  for (const p of allPuppies) {
    puppyCountMap.set(p.litterId, (puppyCountMap.get(p.litterId) ?? 0) + 1);
  }

  const location = [breeder.city, breeder.state].filter(Boolean).join(", ");

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: breeder.kennelName,
    ...(location
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: breeder.city,
            addressRegion: breeder.state,
          },
        }
      : {}),
    ...(breeder.bio ? { description: breeder.bio } : {}),
  };

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-16">
          <KennelHeader breeder={breeder} />
          <WaitlistCTA slug={slug} waitlistCount={waitlistCount} />
          <AvailablePuppies allPuppies={allPuppies} slug={slug} />
          <CurrentLitters
            breederLitters={breederLitters}
            dogsMap={dogsMap}
            puppyCountMap={puppyCountMap}
          />
          <AboutSection breeder={breeder} />
          <WaitlistCTA slug={slug} waitlistCount={waitlistCount} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
