import Link from "next/link";
import type { Metadata } from "next";

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

type Props = { params: Promise<{ breed: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { breed } = await params;
  const breedName = formatBreed(breed);
  return {
    title: `${breedName} Breeders by State — Find Reputable Breeders`,
    description: `Find ${breedName} breeders across the United States. Browse by state to find reputable breeders near you with available puppies.`,
  };
}

export default async function BreedIndexPage({ params }: Props) {
  const { breed } = await params;
  const breedName = formatBreed(breed);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <nav className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-zinc-700 dark:hover:text-zinc-200">
            Home
          </Link>
          {" / "}
          <span className="text-zinc-700 dark:text-zinc-200">
            {breedName} Breeders
          </span>
        </nav>

        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          {breedName} Breeders by State
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Find reputable {breedName} breeders near you. Select your state to
          browse breeders, view galleries, and apply for puppies.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {Object.entries(stateNames).map(([code, name]) => (
            <Link
              key={code}
              href={`/breeders/${breed}/${code}`}
              className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
