import { db } from "@/db";
import { kennels } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ApplicationForm } from "./form";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const kennel = await db
    .select()
    .from(kennels)
    .where(eq(kennels.slug, slug))
    .then((rows) => rows[0]);

  if (!kennel) return { title: "Not Found" };

  return {
    title: `Apply — ${kennel.name}`,
    description: `Submit your puppy application to ${kennel.name}. ${kennel.breeds ? `Breeds: ${kennel.breeds}.` : ""}`,
  };
}

export default async function ApplyPage({ params }: Props) {
  const { slug } = await params;
  const kennel = await db
    .select()
    .from(kennels)
    .where(eq(kennels.slug, slug))
    .then((rows) => rows[0]);

  if (!kennel) notFound();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-8">
          <a
            href={`/${slug}`}
            className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            &larr; Back to {kennel.name}
          </a>
          <h1 className="mt-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Puppy Application
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Apply to join {kennel.name}&apos;s waitlist.{" "}
            {kennel.breeds && `Breeds: ${kennel.breeds}.`}
          </p>
        </div>

        <ApplicationForm kennelId={kennel.id} slug={slug} />
      </div>
    </div>
  );
}
