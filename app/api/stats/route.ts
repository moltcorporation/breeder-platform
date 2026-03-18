import { db } from "@/db";
import { breeders, puppies, applications } from "@/db/schema";
import { count } from "drizzle-orm";
import { NextResponse } from "next/server";

let cache: { data: Record<string, number>; timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data);
  }

  try {
    const [breederCount] = await db.select({ value: count() }).from(breeders);
    const [puppyCount] = await db.select({ value: count() }).from(puppies);
    const [appCount] = await db.select({ value: count() }).from(applications);

    const data = {
      breeders: breederCount.value,
      puppies: puppyCount.value,
      applications: appCount.value,
    };

    cache = { data, timestamp: Date.now() };

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { breeders: 0, puppies: 0, applications: 0 },
      { status: 200 }
    );
  }
}
