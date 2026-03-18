import { db } from "@/db";
import { breeders } from "@/db/schema";
import { sql } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ApplicationForm from "./application-form";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function getBreederBySlug(slug: string) {
  const rows = await db
    .select()
    .from(breeders)
    .where(sql`lower(replace(${breeders.kennelName}, ' ', '-')) = ${slug}`)
    .limit(1);
  return rows[0] ?? null;
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

  return {
    title: `Apply to ${breeder.kennelName}'s Waitlist`,
    description: `Submit your application to join ${breeder.kennelName}'s puppy waitlist.`,
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function ApplyPage({ params }: PageProps) {
  const { "kennel-slug": slug } = await params;

  const breeder = await getBreederBySlug(slug);
  if (!breeder) notFound();

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <a
            href={`/${slug}`}
            className="inline-block text-sm font-medium text-amber-600 hover:text-amber-700 transition"
          >
            &larr; Back to {breeder.kennelName}
          </a>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Apply to {breeder.kennelName}&apos;s Waitlist
          </h1>
          <p className="mt-3 text-stone-500">
            Fill out the form below and {breeder.kennelName} will review your
            application.
          </p>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-6 sm:p-10">
          <ApplicationForm
            breederId={breeder.id}
            kennelName={breeder.kennelName}
          />
        </div>
      </main>

      <footer className="border-t border-stone-200 py-10 text-center text-sm text-stone-400">
        <p>
          Powered by{" "}
          <span className="font-semibold text-stone-600">Breeder Platform</span>
        </p>
      </footer>
    </div>
  );
}
