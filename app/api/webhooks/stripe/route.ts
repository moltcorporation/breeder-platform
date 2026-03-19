import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { db } from "@/db";
import { breeders } from "@/db/schema";
import { eq } from "drizzle-orm";

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

function verifyStripeWebhook(body: string, signature: string): boolean {
  if (!STRIPE_WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET not configured");
    return false;
  }

  try {
    // Stripe signature format: "t=timestamp,v1=signature"
    const signatureParts = signature
      .split(",")
      .reduce((acc: Record<string, string>, part) => {
        const [key, value] = part.split("=");
        acc[key] = value;
        return acc;
      }, {});

    const timestamp = signatureParts.t;
    const signedContent = `${timestamp}.${body}`;
    const expectedSignature = createHmac("sha256", STRIPE_WEBHOOK_SECRET)
      .update(signedContent)
      .digest("hex");

    return signatureParts.v1 === expectedSignature;
  } catch (error) {
    console.error("Webhook verification error:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") || "";

  // Verify webhook signature
  if (!verifyStripeWebhook(body, signature)) {
    console.warn("Invalid webhook signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  try {
    const event = JSON.parse(body);

    // Handle checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Extract email from session metadata or customer email
      const email =
        session.customer_details?.email ||
        session.metadata?.email ||
        session.customer_email;

      if (!email) {
        console.error("No email found in webhook event");
        return NextResponse.json(
          { error: "No email in event" },
          { status: 400 }
        );
      }

      // Determine plan based on payment link ID or metadata
      const paymentLinkId = session.payment_link;
      const basicLinkId =
        process.env.STRIPE_BASIC_PAYMENT_LINK_ID ||
        "plink_1TCLIADT8EiLsMQhbuqKgWvo";
      const proLinkId =
        process.env.STRIPE_PRO_PAYMENT_LINK_ID ||
        "plink_1TCLIGDT8EiLsMQh9iu6RvwL";

      let plan = "free";
      if (paymentLinkId === proLinkId) {
        plan = "pro";
      } else if (paymentLinkId === basicLinkId) {
        plan = "basic";
      } else if (session.metadata?.plan) {
        plan = session.metadata.plan;
      }

      // Find breeder by email
      const [breeder] = await db
        .select({ id: breeders.id, plan: breeders.plan })
        .from(breeders)
        .where(eq(breeders.email, email))
        .limit(1);

      if (!breeder) {
        console.error(`Breeder not found for email: ${email}`);
        return NextResponse.json(
          { error: "Breeder not found" },
          { status: 404 }
        );
      }

      // Update plan only if upgrading (fail-closed default to free)
      if (plan !== "free" && plan !== breeder.plan) {
        await db
          .update(breeders)
          .set({ plan })
          .where(eq(breeders.id, breeder.id));

        console.log(`Updated breeder ${breeder.id} to plan: ${plan}`);
      }

      return NextResponse.json({
        success: true,
        message: "Payment processed",
        plan,
      });
    }

    // Acknowledge other webhook events
    return NextResponse.json({ success: true, received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
