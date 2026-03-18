/**
 * Seed data for initial SEO directory pages.
 * Run with: npx tsx db/seed.ts
 * Requires DATABASE_URL environment variable.
 */

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { breeders, dogs, litters, puppies } from "./schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const seedBreeders = [
  {
    email: "sunny@example.com",
    passwordHash: "$placeholder",
    name: "Sarah Mitchell",
    kennelName: "Sunny Meadows Goldens",
    city: "Austin",
    state: "TX",
    bio: "Family-run golden retriever breeding program focused on health testing and temperament. OFA hips, elbows, heart, and eyes certified on all parents.",
    breeds: ["Golden Retriever"],
  },
  {
    email: "bluebonnet@example.com",
    passwordHash: "$placeholder",
    name: "James Walker",
    kennelName: "Bluebonnet Retrievers",
    city: "Dallas",
    state: "TX",
    bio: "Breeding English cream and American golden retrievers since 2018. All puppies come with a 2-year health guarantee.",
    breeds: ["Golden Retriever"],
  },
  {
    email: "pacificpaws@example.com",
    passwordHash: "$placeholder",
    name: "Emily Chen",
    kennelName: "Pacific Paws French Bulldogs",
    city: "Los Angeles",
    state: "CA",
    bio: "Specializing in healthy, well-socialized French Bulldogs. AKC registered, DNA health tested. Small program with 2-3 litters per year.",
    breeds: ["French Bulldog"],
  },
  {
    email: "goldenstate@example.com",
    passwordHash: "$placeholder",
    name: "Michael Torres",
    kennelName: "Golden State Labs",
    city: "San Diego",
    state: "CA",
    bio: "Labrador breeder with a focus on field and family dogs. English and American labs available. All parents OFA certified.",
    breeds: ["Labrador"],
  },
  {
    email: "peachtree@example.com",
    passwordHash: "$placeholder",
    name: "Amanda Johnson",
    kennelName: "Peachtree Poodles",
    city: "Atlanta",
    state: "GA",
    bio: "Standard poodles bred for intelligence, health, and beauty. Show and companion quality puppies available.",
    breeds: ["Poodle"],
  },
  {
    email: "empiregoldens@example.com",
    passwordHash: "$placeholder",
    name: "David Kim",
    kennelName: "Empire Goldens",
    city: "New York",
    state: "NY",
    bio: "Small golden retriever program in upstate New York. Health-tested parents, early neurological stimulation, and puppy culture protocols.",
    breeds: ["Golden Retriever"],
  },
  {
    email: "lonestar@example.com",
    passwordHash: "$placeholder",
    name: "Rachel Thompson",
    kennelName: "Lone Star Frenchies",
    city: "Houston",
    state: "TX",
    bio: "French Bulldog breeder committed to health and structure. All breeding dogs are DNA tested and free of common hereditary conditions.",
    breeds: ["French Bulldog"],
  },
  {
    email: "sunshinelab@example.com",
    passwordHash: "$placeholder",
    name: "Tom Anderson",
    kennelName: "Sunshine Labradors",
    city: "Miami",
    state: "FL",
    bio: "Breeding chocolate, yellow, and black Labradors for family homes. AKC registered, health guaranteed, lifetime breeder support.",
    breeds: ["Labrador"],
  },
];

async function seed() {
  console.log("Seeding breeders...");

  for (const breederData of seedBreeders) {
    const [breeder] = await db.insert(breeders).values(breederData).returning();
    console.log(`  Created: ${breeder.kennelName} (${breeder.city}, ${breeder.state})`);

    // Add a sample dog for each breeder
    const [dam] = await db
      .insert(dogs)
      .values({
        breederId: breeder.id,
        name: "Daisy",
        breed: breederData.breeds[0],
        gender: "female",
        color: "standard",
        isActive: true,
      })
      .returning();

    const [sire] = await db
      .insert(dogs)
      .values({
        breederId: breeder.id,
        name: "Max",
        breed: breederData.breeds[0],
        gender: "male",
        color: "standard",
        isActive: true,
      })
      .returning();

    // Add a sample litter with puppies for some breeders
    if (Math.random() > 0.3) {
      const [litter] = await db
        .insert(litters)
        .values({
          breederId: breeder.id,
          damId: dam.id,
          sireId: sire.id,
          whelpDate: "2026-02-15",
          puppyCount: 5,
          status: "available",
        })
        .returning();

      const puppyNames = ["Bella", "Charlie", "Luna", "Cooper", "Rosie"];
      const statuses = ["available", "available", "reserved", "available", "deposit_paid"];
      for (let i = 0; i < 5; i++) {
        await db.insert(puppies).values({
          litterId: litter.id,
          name: puppyNames[i],
          gender: i % 2 === 0 ? "female" : "male",
          color: "standard",
          status: statuses[i],
        });
      }
      console.log(`    + Litter with 5 puppies`);
    }
  }

  console.log("Done!");
}

seed().catch(console.error);
