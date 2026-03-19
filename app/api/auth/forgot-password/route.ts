export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { breeders, passwordResetTokens } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

const RESET_TOKEN_EXPIRY = 60 * 60 * 1000; // 1 hour in milliseconds

async function sendResetEmail(email: string, token: string, breederName: string) {
  try {
    // Use Resend for email sending
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${token}`;

    await resend.emails.send({
      from: "noreply@pawpage.local",
      to: email,
      subject: "Reset your PawPage password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>Hi ${breederName},</p>
          <p>We received a request to reset your password. Click the link below to create a new password:</p>
          <p><a href="${resetUrl}" style="background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">Reset Password</a></p>
          <p>This link expires in 1 hour.</p>
          <p>If you didn't request this, you can safely ignore this email.</p>
          <p>— The PawPage Team</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    // Don't throw - we want to return success anyway to prevent user enumeration
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Find breeder by email
    const [breeder] = await db
      .select()
      .from(breeders)
      .where(eq(breeders.email, email))
      .limit(1);

    // Always return success to prevent user enumeration
    if (!breeder) {
      return NextResponse.json({
        success: true,
        message: "If an account exists with this email, a reset link will be sent",
      });
    }

    // Generate reset token
    const token = nanoid(32);
    const expiresAt = new Date(Date.now() + RESET_TOKEN_EXPIRY);

    // Store token in database
    await db.insert(passwordResetTokens).values({
      token,
      breederId: breeder.id,
      expiresAt,
    });

    // Send email
    await sendResetEmail(email, token, breeder.name);

    return NextResponse.json({
      success: true,
      message: "If an account exists with this email, a reset link will be sent",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
