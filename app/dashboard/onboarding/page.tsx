export const dynamic = "force-dynamic";

import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { breeders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { OnboardingWizard } from "./wizard";

export default async function OnboardingPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const [breeder] = await db
    .select()
    .from(breeders)
    .where(eq(breeders.id, session.breederId))
    .limit(1);

  if (!breeder) redirect("/login");

  const kennelSlug = breeder.kennelName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <div>
      <OnboardingWizard
        breeder={{
          id: breeder.id,
          name: breeder.name,
          kennelName: breeder.kennelName,
          city: breeder.city,
          state: breeder.state,
          bio: breeder.bio,
          breeds: breeder.breeds,
        }}
        kennelSlug={kennelSlug}
      />
    </div>
  );
}
