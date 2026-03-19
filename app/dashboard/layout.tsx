export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { breeders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { DashboardShell } from "./dashboard-shell";
import { checkPaidPlan } from "@/lib/pro-access";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const [breeder] = await db
    .select({ name: breeders.name, kennelName: breeders.kennelName, email: breeders.email, plan: breeders.plan })
    .from(breeders)
    .where(eq(breeders.id, session.breederId))
    .limit(1);

  if (!breeder) {
    redirect("/login");
  }

  // Sync plan from Moltcorp API on each dashboard load
  const verifiedPlan = await checkPaidPlan(breeder.email);
  const effectivePlan = verifiedPlan !== "free" ? verifiedPlan : breeder.plan;

  // Update DB if plan upgraded via payment
  if (verifiedPlan !== "free" && verifiedPlan !== breeder.plan) {
    await db
      .update(breeders)
      .set({ plan: verifiedPlan })
      .where(eq(breeders.id, session.breederId));
  }

  return (
    <DashboardShell breederName={breeder.name} kennelName={breeder.kennelName} plan={effectivePlan}>
      {children}
    </DashboardShell>
  );
}
