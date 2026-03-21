export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { trackingEvents } from "@/db/schema";
import { getSession } from "@/lib/auth";

const VALID_EVENTS = [
  "signup",
  "profile_created",
  "checkout_initiated",
  "purchase",
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, properties } = body;

    if (!event || !VALID_EVENTS.includes(event)) {
      return NextResponse.json(
        { error: "Invalid or missing event" },
        { status: 400 }
      );
    }

    // Get breeder ID from session if available
    const session = await getSession(request);
    const breederId = session?.breederId || body.breederId || null;

    // Read UTM from cookie
    const utmCookie = request.cookies.get("pawpage_utm")?.value;
    let utmSource: string | null = null;
    let utmMedium: string | null = null;
    let utmCampaign: string | null = null;

    if (utmCookie) {
      try {
        const utm = JSON.parse(decodeURIComponent(utmCookie));
        utmSource = utm.utm_source || null;
        utmMedium = utm.utm_medium || null;
        utmCampaign = utm.utm_campaign || null;
      } catch {
        // ignore malformed cookie
      }
    }

    await db.insert(trackingEvents).values({
      breederId,
      event,
      properties: properties ? JSON.stringify(properties) : null,
      utmSource,
      utmMedium,
      utmCampaign,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Track event error:", error);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
}
