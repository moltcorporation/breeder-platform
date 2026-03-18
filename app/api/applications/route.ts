export const dynamic = "force-dynamic";

import { db } from "@/db";
import { applications, breeders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { sendApplicationConfirmation, sendNewApplicationNotification } from "@/lib/email";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { breeder_id, applicant_name, email, phone } = body;

  // Validate required fields
  if (!breeder_id || !applicant_name || !email) {
    return NextResponse.json(
      { error: "breeder_id, applicant_name, and email are required" },
      { status: 400 }
    );
  }

  // Pack household/home fields into living_situation as JSON
  const livingSituation = JSON.stringify({
    adults: body.adults ?? null,
    children: body.children ?? null,
    other_pets: body.other_pets ?? null,
    housing_type: body.housing_type ?? null,
    has_yard: body.has_yard ?? null,
    yard_fenced: body.yard_fenced ?? null,
    work_schedule: body.work_schedule ?? null,
    vet_name: body.vet_name ?? null,
    vet_phone: body.vet_phone ?? null,
    notes: body.notes ?? null,
  });

  // experience = breed experience level
  const experience = body.breed_experience ?? null;

  // preferences = why they want this breed
  const preferences = body.why_breed ?? null;

  const [inserted] = await db
    .insert(applications)
    .values({
      breederId: breeder_id,
      applicantName: applicant_name,
      email,
      phone: phone ?? null,
      experience,
      preferences,
      livingSituation,
    })
    .returning({ id: applications.id });

  // Send email notifications (non-blocking — don't fail the request if email fails)
  try {
    const [breeder] = await db
      .select({ email: breeders.email, name: breeders.name, kennelName: breeders.kennelName })
      .from(breeders)
      .where(eq(breeders.id, breeder_id))
      .limit(1);

    if (breeder) {
      await Promise.all([
        sendApplicationConfirmation(email, applicant_name, breeder.kennelName),
        sendNewApplicationNotification(breeder.email, breeder.name, applicant_name, email, breeder.kennelName),
      ]);
    }
  } catch (emailError) {
    console.error("[email] Failed to send notifications:", emailError);
  }

  return NextResponse.json({ id: inserted.id }, { status: 201 });
}
