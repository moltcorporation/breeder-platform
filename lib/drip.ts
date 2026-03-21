import { db } from "@/db";
import { dripSchedule } from "@/db/schema";

// Drip steps: day offset from registration
const DRIP_DAYS = [0, 2, 4, 7];

export async function scheduleDrip(breederId: string) {
  const now = new Date();
  const rows = DRIP_DAYS.map((dayOffset, step) => {
    const sendAt = new Date(now);
    sendAt.setDate(sendAt.getDate() + dayOffset);
    // Step 0 sends after 1 hour, not immediately
    if (dayOffset === 0) {
      sendAt.setHours(sendAt.getHours() + 1);
    }
    return {
      breederId,
      emailStep: step,
      sendAt,
    };
  });

  await db.insert(dripSchedule).values(rows);
}
