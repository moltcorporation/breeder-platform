import type { Metadata } from "next";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Demo Gallery — See What a PawPage Looks Like",
  description:
    "Browse a sample breeder gallery page with puppy listings, waitlist tracking, and deposit collection. See what your PawPage could look like.",
  openGraph: {
    title: "Demo Gallery — See What a PawPage Looks Like",
    description:
      "Browse a sample breeder gallery page with puppy listings, waitlist tracking, and deposit collection.",
  },
};

// ---------------------------------------------------------------------------
// Inline SVG Icons
// ---------------------------------------------------------------------------

function PawPrintIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <ellipse cx="7.5" cy="7" rx="2.2" ry="2.8" />
      <ellipse cx="16.5" cy="7" rx="2.2" ry="2.8" />
      <ellipse cx="4" cy="12.5" rx="2" ry="2.5" />
      <ellipse cx="20" cy="12.5" rx="2" ry="2.5" />
      <path d="M12 22c-3 0-5.5-2-6.5-4.5-.7-1.8.3-3.5 2-4 1.2-.3 2.5.2 3.2 1.2.5.7 1.1 1.3 1.3 1.3s.8-.6 1.3-1.3c.7-1 2-1.5 3.2-1.2 1.7.5 2.7 2.2 2 4C17.5 20 15 22 12 22z" />
    </svg>
  );
}

function HeartIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function ShieldCheckIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 4v6c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V6l8-4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  );
}

function MapPinIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Demo data
// ---------------------------------------------------------------------------

const DEMO_BREEDER = {
  kennelName: "Sunrise Golden Retrievers",
  location: "Bend, Oregon",
  bio: "Family-run kennel raising health-tested Golden Retrievers since 2018. Our dogs are part of the family first — we raise every litter in our home with Early Neurological Stimulation and Puppy Culture protocols. All parents are OFA certified (hips, elbows, heart, eyes).",
  breeds: ["Golden Retriever"],
};

const DEMO_PUPPIES = [
  {
    id: "1",
    name: "Maple",
    gender: "Female",
    color: "Light Golden",
    status: "available",
    age: "8 weeks",
  },
  {
    id: "2",
    name: "Bear",
    gender: "Male",
    color: "Golden",
    status: "available",
    age: "8 weeks",
  },
  {
    id: "3",
    name: "Clover",
    gender: "Female",
    color: "Dark Golden",
    status: "reserved",
    age: "8 weeks",
  },
  {
    id: "4",
    name: "Finn",
    gender: "Male",
    color: "Light Golden",
    status: "deposit",
    age: "8 weeks",
  },
];

const WAITLIST_COUNT = 12;

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
// Puppy card
// ---------------------------------------------------------------------------

function DemoPuppyCard({ puppy }: { puppy: (typeof DEMO_PUPPIES)[number] }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="flex h-48 items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
        <div className="text-center">
          <PawPrintIcon className="mx-auto h-12 w-12 text-amber-300/70" />
          <p className="mt-1 text-xs font-medium text-amber-400">
            Photo
          </p>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-stone-900">{puppy.name}</h3>
          <StatusBadge status={puppy.status} />
        </div>
        <div className="mt-2 flex gap-3 text-sm text-stone-500">
          <span>{puppy.gender}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{puppy.color}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{puppy.age}</span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-[#D1D5C8]/60 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-stone-800"
          >
            <PawPrintIcon className="h-7 w-7 text-amber-600" />
            PawPage
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/register"
              className="rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-amber-200 transition hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-200"
            >
              Create yours free
            </Link>
          </div>
        </div>
      </nav>

      {/* Demo banner */}
      <div className="fixed top-[65px] z-40 w-full border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-center text-sm font-medium text-amber-800">
        This is a demo gallery.{" "}
        <Link href="/register" className="underline hover:text-amber-900">
          Create your own free breeder page
        </Link>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 pb-24 pt-36 sm:px-6 lg:px-8">
        {/* Kennel header */}
        <section className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-orange-50 shadow-sm">
            <PawPrintIcon className="h-10 w-10 text-amber-600" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            {DEMO_BREEDER.kennelName}
          </h1>
          <div className="mt-2 flex items-center justify-center gap-1.5 text-stone-500">
            <MapPinIcon className="h-4 w-4" />
            <span>{DEMO_BREEDER.location}</span>
          </div>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-stone-600">
            {DEMO_BREEDER.bio}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {DEMO_BREEDER.breeds.map((b) => (
              <span
                key={b}
                className="rounded-full border border-amber-200 bg-amber-50 px-4 py-1 text-sm font-medium text-amber-800"
              >
                {b}
              </span>
            ))}
          </div>
        </section>

        {/* Stats bar */}
        <section className="mt-10 grid grid-cols-3 gap-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-600">
              {DEMO_PUPPIES.length}
            </p>
            <p className="mt-1 text-sm text-stone-500">Puppies listed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-600">
              {WAITLIST_COUNT}
            </p>
            <p className="mt-1 text-sm text-stone-500">Families waiting</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">
              {DEMO_PUPPIES.filter((p) => p.status === "available").length}
            </p>
            <p className="mt-1 text-sm text-stone-500">Available now</p>
          </div>
        </section>

        {/* Puppies grid */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-stone-900">
            Available Puppies
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {DEMO_PUPPIES.map((puppy) => (
              <DemoPuppyCard key={puppy.id} puppy={puppy} />
            ))}
          </div>
        </section>

        {/* Waitlist CTA */}
        <section className="mt-12 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-stone-900">
            Join the Waitlist
          </h2>
          <p className="mt-2 text-stone-600">
            {WAITLIST_COUNT} families already waiting &mdash; secure your spot
          </p>
          <div className="mt-5 inline-block rounded-full bg-stone-300 px-8 py-3 text-sm font-semibold text-stone-500 cursor-not-allowed">
            Apply Now (demo only)
          </div>
        </section>

        {/* CTA to create own */}
        <section className="mt-16 rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-50 via-white to-orange-50 p-10 text-center shadow-sm">
          <HeartIcon className="mx-auto mb-4 h-10 w-10 text-amber-400" />
          <h2 className="text-2xl font-bold tracking-tight text-stone-800 sm:text-3xl">
            Want a page like this for your kennel?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-stone-600">
            Create your own breeder gallery with waitlist management, puppy
            applications, and secure deposit collection. Free for your first
            litter.
          </p>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm text-stone-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheckIcon className="h-4 w-4 text-amber-600" />
              No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <HeartIcon className="h-4 w-4 text-amber-600" />
              Cancel anytime
            </span>
          </div>
          <Link
            href="/register"
            className="mt-6 inline-block rounded-full bg-amber-600 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-amber-200/50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-700 hover:shadow-xl hover:shadow-amber-200/60"
          >
            Create your free gallery
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white px-4 py-8 text-center text-sm text-stone-500">
        <Link href="/" className="font-medium text-stone-700 hover:text-amber-700">
          PawPage
        </Link>{" "}
        &mdash; Beautiful gallery pages for breeders
      </footer>
    </div>
  );
}
