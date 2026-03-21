import { db } from "@/db";
import { dripSchedule, dripUnsubscribes, breeders } from "@/db/schema";
import { DRIP_EMAILS } from "@/lib/drip-emails";
import { checkPaidPlan } from "@/lib/pro-access";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}
const BATCH_SIZE = 20;
const FROM_EMAIL =
  process.env.DRIP_FROM_EMAIL || "PawPage <notifications@moltcorporation.com>";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();

    const pending = await db
      .select({
        dripId: dripSchedule.id,
        breederId: dripSchedule.breederId,
        emailStep: dripSchedule.emailStep,
        breederEmail: breeders.email,
        breederName: breeders.name,
        kennelName: breeders.kennelName,
      })
      .from(dripSchedule)
      .innerJoin(breeders, eq(dripSchedule.breederId, breeders.id))
      .where(
        sql`${dripSchedule.sentAt} IS NULL AND ${dripSchedule.sendAt} <= ${now}`,
      )
      .limit(BATCH_SIZE);

    if (pending.length === 0) {
      return NextResponse.json({ sent: 0, skipped: 0 });
    }

    // Get unsubscribed breeder IDs
    const breederIds = [...new Set(pending.map((p) => p.breederId))];
    const unsubs = await db
      .select({ breederId: dripUnsubscribes.breederId })
      .from(dripUnsubscribes)
      .where(
        sql`${dripUnsubscribes.breederId} IN (${sql.join(
          breederIds.map((id) => sql`${id}`),
          sql`, `,
        )})`,
      );
    const unsubSet = new Set(unsubs.map((u) => u.breederId));

    let sent = 0;
    let skipped = 0;

    for (const item of pending) {
      // Skip unsubscribed breeders
      if (unsubSet.has(item.breederId)) {
        await db
          .update(dripSchedule)
          .set({ sentAt: now })
          .where(eq(dripSchedule.id, item.dripId));
        skipped++;
        continue;
      }

      // Skip breeders who already upgraded to a paid plan
      const plan = await checkPaidPlan(item.breederEmail);
      if (plan !== "free") {
        await db
          .update(dripSchedule)
          .set({ sentAt: now })
          .where(eq(dripSchedule.id, item.dripId));
        skipped++;
        continue;
      }

      const template = DRIP_EMAILS[item.emailStep];
      if (!template) {
        skipped++;
        continue;
      }

      try {
        await getResend().emails.send({
          from: FROM_EMAIL,
          to: item.breederEmail,
          subject: template.subject,
          html: template.html({
            name: item.breederName,
            email: item.breederEmail,
            breederId: item.breederId,
            kennelName: item.kennelName,
          }),
        });

        await db
          .update(dripSchedule)
          .set({ sentAt: now })
          .where(eq(dripSchedule.id, item.dripId));
        sent++;
      } catch (err) {
        console.error(
          `Drip send failed for breeder ${item.breederId} step ${item.emailStep}:`,
          err,
        );
      }
    }

    return NextResponse.json({ sent, skipped });
  } catch (error) {
    console.error("Drip cron error:", error);
    return NextResponse.json(
      { error: "Drip processing failed" },
      { status: 500 },
    );
  }
}
