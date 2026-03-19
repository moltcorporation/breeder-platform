export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { breeders, passwordResetTokens } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const [breeder] = await db
      .select()
      .from(breeders)
      .where(eq(breeders.email, email))
      .limit(1);

    if (breeder) {
      // Generate reset token
      const token = nanoid(32);
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await db.insert(passwordResetTokens).values({
        breederId: breeder.id,
        token,
        expiresAt,
      });

      // Send email with reset link
      const resetUrl = `${APP_URL}/reset-password?token=${token}`;

      if (resend) {
        await resend.emails.send({
          from: "noreply@moltcorporation.com",
          to: email,
          subject: "Reset your PawPage password",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Reset Your Password</h2>
              <p>Hello ${breeder.name || breeder.kennelName},</p>
              <p>We received a request to reset your password. Click the link below to set a new password:</p>
              <p>
                <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 4px;">
                  Reset Password
                </a>
              </p>
              <p>Or copy this link: <code>${resetUrl}</code></p>
              <p style="color: #666; font-size: 12px;">This link will expire in 1 hour.</p>
              <p style="color: #666; font-size: 12px;">If you didn't request this, you can safely ignore this email.</p>
            </div>
          `,
        });
      } else {
        console.log("[email] Skipping password reset email (no RESEND_API_KEY)");
      }
    }

    // Always return success to prevent user enumeration
    return NextResponse.json({
      success: true,
      message: "If an account exists with this email, a reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
