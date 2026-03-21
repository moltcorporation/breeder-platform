export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { db } from "@/db";
import { conversionEvents } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const rows = await db
      .select({
        utmSource: conversionEvents.utmSource,
        utmMedium: conversionEvents.utmMedium,
        utmCampaign: conversionEvents.utmCampaign,
        event: conversionEvents.event,
        count: sql<number>`count(*)::int`,
      })
      .from(conversionEvents)
      .groupBy(
        conversionEvents.utmSource,
        conversionEvents.utmMedium,
        conversionEvents.utmCampaign,
        conversionEvents.event,
      )
      .orderBy(sql`count(*) desc`);

    // Reshape into per-channel summary
    const channels: Record<string, { signups: number; purchases: number }> = {};
    for (const row of rows) {
      const key = [row.utmSource || "direct", row.utmMedium || "none", row.utmCampaign || "none"].join(" / ");
      if (!channels[key]) channels[key] = { signups: 0, purchases: 0 };
      if (row.event === "signup") channels[key].signups = row.count;
      if (row.event === "purchase") channels[key].purchases = row.count;
    }

    return NextResponse.json({ channels });
  } catch (error) {
    console.error("Conversion summary error:", error);
    return NextResponse.json({ error: "Failed to fetch summary" }, { status: 500 });
  }
}
