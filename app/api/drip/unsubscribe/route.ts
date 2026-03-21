import { db } from "@/db";
import { dripUnsubscribes } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const uid = req.nextUrl.searchParams.get("uid");
  if (!uid) {
    return new NextResponse("Missing uid parameter", { status: 400 });
  }

  try {
    await db
      .insert(dripUnsubscribes)
      .values({ breederId: uid })
      .onConflictDoNothing();
  } catch (err) {
    console.error("Unsubscribe error:", err);
  }

  return new NextResponse(
    `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Unsubscribed</title></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<div style="max-width:480px;margin:80px auto;padding:32px;background:#fff;border-radius:8px;border:1px solid #e4e4e7;text-align:center">
  <h1 style="font-size:20px;color:#18181b;margin:0 0 12px">Unsubscribed</h1>
  <p style="color:#3f3f46;line-height:1.6;margin:0">You've been removed from PawPage drip emails. You can still use your account normally.</p>
</div>
</body>
</html>`,
    { headers: { "content-type": "text/html" } },
  );
}
