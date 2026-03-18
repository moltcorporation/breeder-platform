export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { breeders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { DashboardShell } from "./dashboard-shell";

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
    .select({ name: breeders.name, kennelName: breeders.kennelName })
    .from(breeders)
    .where(eq(breeders.id, session.breederId))
    .limit(1);

  if (!breeder) {
    redirect("/login");
  }

  return (
    <DashboardShell breederName={breeder.name} kennelName={breeder.kennelName}>
      {children}
    </DashboardShell>
  );
}
