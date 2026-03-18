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

interface SeedBreeder {
  email: string;
  passwordHash: string;
  name: string;
  kennelName: string;
  city: string;
  state: string;
  bio: string;
  breeds: string[];
  dam: { name: string; color: string };
  sire: { name: string; color: string };
  litter: {
    whelpDate?: string;
    expectedDate?: string;
    status: string;
    puppies: { name: string; gender: string; color: string; status: string }[];
  };
}

const seedBreeders: SeedBreeder[] = [
  // ── Golden Retriever (3) ───────────────────────────────────────────
  {
    email: "sunny-meadows@example.com",
    passwordHash: "$placeholder",
    name: "Sarah Mitchell",
    kennelName: "Sunny Meadows Goldens",
    city: "Austin",
    state: "TX",
    bio: "Family-run golden retriever program with 12 years of experience, focused on OFA-certified hips, elbows, heart, and eyes. Our dogs are raised in our home alongside children and are well-socialized from day one. Every puppy leaves with a two-year health guarantee and lifetime breeder support.",
    breeds: ["Golden Retriever"],
    dam: { name: "Clementine", color: "Light Golden" },
    sire: { name: "Brody", color: "Dark Golden" },
    litter: {
      whelpDate: "2026-01-20",
      status: "available",
      puppies: [
        { name: "Maple", gender: "female", color: "Light Golden", status: "available" },
        { name: "Birch", gender: "male", color: "Dark Golden", status: "reserved" },
        { name: "Hazel", gender: "female", color: "Light Golden", status: "available" },
        { name: "Oakley", gender: "male", color: "Light Golden", status: "deposit_paid" },
        { name: "Willow", gender: "female", color: "Dark Golden", status: "available" },
      ],
    },
  },
  {
    email: "cascadia-goldens@example.com",
    passwordHash: "$placeholder",
    name: "Karen Olmstead",
    kennelName: "Cascadia Gold Retrievers",
    city: "Portland",
    state: "OR",
    bio: "We breed English-style golden retrievers with blocky builds and calm, biddable temperaments. All breeding dogs carry full OFA clearances and have undergone genetic panel testing through Embark. Our puppies are started on puppy culture and early neurological stimulation protocols.",
    breeds: ["Golden Retriever"],
    dam: { name: "Rosalind", color: "Cream" },
    sire: { name: "Finnegan", color: "Light Golden" },
    litter: {
      whelpDate: "2026-02-05",
      status: "available",
      puppies: [
        { name: "Clover", gender: "female", color: "Cream", status: "available" },
        { name: "Jasper", gender: "male", color: "Light Golden", status: "available" },
        { name: "Pearl", gender: "female", color: "Cream", status: "reserved" },
        { name: "Thatcher", gender: "male", color: "Cream", status: "available" },
      ],
    },
  },
  {
    email: "heartland-goldens@example.com",
    passwordHash: "$placeholder",
    name: "Daniel Reeves",
    kennelName: "Heartland Heritage Goldens",
    city: "Columbus",
    state: "OH",
    bio: "Breeding AKC golden retrievers for conformation and family companionship since 2015. Our program emphasizes longevity, with pedigrees tracked for cancer and health through the Golden Retriever Lifetime Study. Puppies are exposed to household sounds, surfaces, and gentle handling from birth.",
    breeds: ["Golden Retriever"],
    dam: { name: "Magnolia", color: "Dark Golden" },
    sire: { name: "Archer", color: "Dark Golden" },
    litter: {
      expectedDate: "2026-06-10",
      status: "expected",
      puppies: [
        { name: "TBD Puppy 1", gender: "female", color: "Dark Golden", status: "deposit_paid" },
        { name: "TBD Puppy 2", gender: "male", color: "Dark Golden", status: "deposit_paid" },
        { name: "TBD Puppy 3", gender: "female", color: "Dark Golden", status: "available" },
        { name: "TBD Puppy 4", gender: "male", color: "Dark Golden", status: "available" },
        { name: "TBD Puppy 5", gender: "female", color: "Dark Golden", status: "available" },
        { name: "TBD Puppy 6", gender: "male", color: "Dark Golden", status: "available" },
      ],
    },
  },

  // ── French Bulldog (3) ─────────────────────────────────────────────
  {
    email: "tropicfrenchies@example.com",
    passwordHash: "$placeholder",
    name: "Camila Reyes",
    kennelName: "Tropic Coast Frenchies",
    city: "Miami",
    state: "FL",
    bio: "Boutique French Bulldog breeder specializing in healthy structure and open airways. All parents are BOAS-graded and carry full DNA health panels. We raise no more than three litters per year so every puppy receives individualized socialization.",
    breeds: ["French Bulldog"],
    dam: { name: "Bijou", color: "Cream" },
    sire: { name: "Rocco", color: "Brindle" },
    litter: {
      whelpDate: "2026-03-01",
      status: "available",
      puppies: [
        { name: "Gigi", gender: "female", color: "Cream", status: "available" },
        { name: "Bruno", gender: "male", color: "Brindle", status: "available" },
        { name: "Mimi", gender: "female", color: "Cream", status: "reserved" },
        { name: "Louie", gender: "male", color: "Brindle", status: "available" },
      ],
    },
  },
  {
    email: "boroughbulldogs@example.com",
    passwordHash: "$placeholder",
    name: "Andre Williams",
    kennelName: "Borough Bull Frenchies",
    city: "Brooklyn",
    state: "NY",
    bio: "Brooklyn-based French Bulldog breeder committed to breeding for health over color trends. Our dogs are AKC registered, CHIC certified, and live as house pets — not kennel dogs. We offer a comprehensive puppy starter kit and video call meet-and-greets.",
    breeds: ["French Bulldog"],
    dam: { name: "Olive", color: "Fawn" },
    sire: { name: "Hugo", color: "Brindle" },
    litter: {
      whelpDate: "2026-01-12",
      status: "available",
      puppies: [
        { name: "Cleo", gender: "female", color: "Fawn", status: "reserved" },
        { name: "Otis", gender: "male", color: "Brindle", status: "available" },
        { name: "Nola", gender: "female", color: "Fawn", status: "available" },
        { name: "Frankie", gender: "male", color: "Fawn", status: "deposit_paid" },
        { name: "Pepper", gender: "female", color: "Brindle", status: "available" },
      ],
    },
  },
  {
    email: "windycityfrenchies@example.com",
    passwordHash: "$placeholder",
    name: "Jessica Nowak",
    kennelName: "Windy City French Bulldogs",
    city: "Chicago",
    state: "IL",
    bio: "Breeding structurally sound French Bulldogs in the heart of Chicago since 2017. We prioritize respiratory health and perform BOAS evaluations on every breeding candidate. Puppies go home crate-trained, microchipped, and with a lifetime return policy.",
    breeds: ["French Bulldog"],
    dam: { name: "Lulu", color: "Blue" },
    sire: { name: "Marcel", color: "Cream" },
    litter: {
      expectedDate: "2026-07-15",
      status: "expected",
      puppies: [
        { name: "TBD Puppy 1", gender: "female", color: "Cream", status: "available" },
        { name: "TBD Puppy 2", gender: "male", color: "Blue", status: "available" },
        { name: "TBD Puppy 3", gender: "female", color: "Cream", status: "deposit_paid" },
        { name: "TBD Puppy 4", gender: "male", color: "Cream", status: "available" },
      ],
    },
  },

  // ── Labrador Retriever (3) ─────────────────────────────────────────
  {
    email: "libertylabs@example.com",
    passwordHash: "$placeholder",
    name: "Marcus Greene",
    kennelName: "Liberty Bell Labradors",
    city: "Philadelphia",
    state: "PA",
    bio: "Third-generation Labrador breeder producing versatile dogs for hunt, show, and home. All sires and dams carry OFA excellent or good hips and clear elbows. We DNA test for EIC, CNM, PRA, and D-locus to ensure healthy litters.",
    breeds: ["Labrador Retriever"],
    dam: { name: "Sadie", color: "Chocolate" },
    sire: { name: "Gunner", color: "Black" },
    litter: {
      whelpDate: "2026-02-20",
      status: "available",
      puppies: [
        { name: "Hershey", gender: "female", color: "Chocolate", status: "available" },
        { name: "Flint", gender: "male", color: "Black", status: "available" },
        { name: "Cocoa", gender: "female", color: "Chocolate", status: "reserved" },
        { name: "Bear", gender: "male", color: "Black", status: "available" },
        { name: "Amber", gender: "female", color: "Chocolate", status: "deposit_paid" },
      ],
    },
  },
  {
    email: "soundlabs@example.com",
    passwordHash: "$placeholder",
    name: "Megan Tran",
    kennelName: "Puget Sound Labradors",
    city: "Seattle",
    state: "WA",
    bio: "We breed English-type Labradors with broad heads and stocky builds for families in the Pacific Northwest. Health clearances include OFA hips, elbows, ophthalmologist exams, and cardiac evaluations. Puppies are introduced to water, birds, and basic obedience before going home.",
    breeds: ["Labrador Retriever"],
    dam: { name: "Wren", color: "Yellow" },
    sire: { name: "Captain", color: "Yellow" },
    litter: {
      whelpDate: "2026-03-10",
      status: "available",
      puppies: [
        { name: "Biscuit", gender: "male", color: "Yellow", status: "available" },
        { name: "Goldie", gender: "female", color: "Yellow", status: "available" },
        { name: "Tucker", gender: "male", color: "Yellow", status: "available" },
        { name: "Sunny", gender: "female", color: "Yellow", status: "reserved" },
        { name: "Scout", gender: "male", color: "Yellow", status: "available" },
        { name: "Lark", gender: "female", color: "Yellow", status: "available" },
      ],
    },
  },
  {
    email: "carolinalabs@example.com",
    passwordHash: "$placeholder",
    name: "Brandon Holt",
    kennelName: "Carolina Fox Labradors",
    city: "Charlotte",
    state: "NC",
    bio: "Specializing in fox red and traditional-color Labradors for active families. Our dogs are bred for temperament, drive, and soundness with full CHIC health clearances. Every puppy is raised using Badass Breeder protocols with daily enrichment.",
    breeds: ["Labrador Retriever"],
    dam: { name: "Ruby", color: "Fox Red" },
    sire: { name: "Remington", color: "Fox Red" },
    litter: {
      expectedDate: "2026-08-01",
      status: "expected",
      puppies: [
        { name: "TBD Puppy 1", gender: "female", color: "Fox Red", status: "available" },
        { name: "TBD Puppy 2", gender: "male", color: "Fox Red", status: "available" },
        { name: "TBD Puppy 3", gender: "female", color: "Fox Red", status: "deposit_paid" },
        { name: "TBD Puppy 4", gender: "male", color: "Fox Red", status: "available" },
        { name: "TBD Puppy 5", gender: "female", color: "Fox Red", status: "available" },
      ],
    },
  },

  // ── Standard Poodle (2) ────────────────────────────────────────────
  {
    email: "milepoodles@example.com",
    passwordHash: "$placeholder",
    name: "Laura Steinberg",
    kennelName: "Mile High Standard Poodles",
    city: "Denver",
    state: "CO",
    bio: "Breeding standard poodles for intelligence, athleticism, and hypoallergenic coats in Colorado since 2014. All breeding dogs are OFA-certified and genetically tested through Paw Print Genetics. Our puppies excel in obedience, agility, and as therapy dogs.",
    breeds: ["Standard Poodle"],
    dam: { name: "Genevieve", color: "Apricot" },
    sire: { name: "Sterling", color: "Black" },
    litter: {
      whelpDate: "2026-02-01",
      status: "available",
      puppies: [
        { name: "Margot", gender: "female", color: "Apricot", status: "available" },
        { name: "Blaise", gender: "male", color: "Black", status: "reserved" },
        { name: "Colette", gender: "female", color: "Apricot", status: "available" },
        { name: "Dashiell", gender: "male", color: "Black", status: "available" },
        { name: "Estelle", gender: "female", color: "Apricot", status: "deposit_paid" },
      ],
    },
  },
  {
    email: "peachtreepoodles@example.com",
    passwordHash: "$placeholder",
    name: "Amanda Johnson",
    kennelName: "Peachtree Standard Poodles",
    city: "Atlanta",
    state: "GA",
    bio: "Show and companion standard poodles bred for beauty, structure, and stable temperaments. We are an AKC Breeder of Merit with over a decade of experience producing UKC and AKC champions. Puppies are raised in our home with early exposure to grooming, car rides, and crate training.",
    breeds: ["Standard Poodle"],
    dam: { name: "Vivienne", color: "White" },
    sire: { name: "Leopold", color: "Red" },
    litter: {
      whelpDate: "2026-01-08",
      status: "available",
      puppies: [
        { name: "Celeste", gender: "female", color: "White", status: "reserved" },
        { name: "Raphael", gender: "male", color: "Red", status: "available" },
        { name: "Adeline", gender: "female", color: "White", status: "available" },
        { name: "Thibault", gender: "male", color: "Red", status: "available" },
      ],
    },
  },

  // ── Australian Shepherd (3) ────────────────────────────────────────
  {
    email: "highdesertaussies@example.com",
    passwordHash: "$placeholder",
    name: "Kelly Sorensen",
    kennelName: "High Desert Aussies",
    city: "Bend",
    state: "OR",
    bio: "Breeding versatile Australian Shepherds for ranch work, agility, and active family life in Central Oregon. We health test for MDR1, HSF4, CEA, and hip dysplasia on every breeding pair. Our dogs are ASCA and AKC dual-registered.",
    breeds: ["Australian Shepherd"],
    dam: { name: "Sierra", color: "Blue Merle" },
    sire: { name: "Maverick", color: "Black Tri" },
    litter: {
      whelpDate: "2026-03-18",
      status: "available",
      puppies: [
        { name: "Sage", gender: "female", color: "Blue Merle", status: "available" },
        { name: "Timber", gender: "male", color: "Black Tri", status: "available" },
        { name: "Aspen", gender: "female", color: "Blue Merle", status: "reserved" },
        { name: "Ridley", gender: "male", color: "Black Tri", status: "available" },
        { name: "Juniper", gender: "female", color: "Blue Merle", status: "available" },
      ],
    },
  },
  {
    email: "sonoranaussies@example.com",
    passwordHash: "$placeholder",
    name: "Ryan Caldwell",
    kennelName: "Sonoran Star Aussies",
    city: "Tucson",
    state: "AZ",
    bio: "We produce athletic, biddable Australian Shepherds out of proven working and sport lines. All breeding stock is OFA-rated and MDR1 clear. Puppies are exposed to livestock, agility obstacles, and varied environments before placement at eight weeks.",
    breeds: ["Australian Shepherd"],
    dam: { name: "Phoenix", color: "Red Merle" },
    sire: { name: "Bandit", color: "Red Tri" },
    litter: {
      whelpDate: "2026-02-14",
      status: "available",
      puppies: [
        { name: "Mesa", gender: "female", color: "Red Merle", status: "available" },
        { name: "Reno", gender: "male", color: "Red Tri", status: "deposit_paid" },
        { name: "Gila", gender: "female", color: "Red Merle", status: "available" },
        { name: "Dusty", gender: "male", color: "Red Tri", status: "available" },
        { name: "Piper", gender: "female", color: "Red Merle", status: "reserved" },
        { name: "Colt", gender: "male", color: "Red Tri", status: "available" },
      ],
    },
  },
  {
    email: "gemstateaussies@example.com",
    passwordHash: "$placeholder",
    name: "Natalie Prichard",
    kennelName: "Gem State Shepherds",
    city: "Boise",
    state: "ID",
    bio: "Small hobby kennel producing well-rounded Australian Shepherds for sport, therapy, and family companionship. We prioritize calm, confident temperaments alongside full genetic health panels. Every puppy is Volhard temperament tested and matched to the right home.",
    breeds: ["Australian Shepherd"],
    dam: { name: "Opal", color: "Black Tri" },
    sire: { name: "Flint", color: "Blue Merle" },
    litter: {
      expectedDate: "2026-07-01",
      status: "expected",
      puppies: [
        { name: "TBD Puppy 1", gender: "female", color: "Blue Merle", status: "available" },
        { name: "TBD Puppy 2", gender: "male", color: "Black Tri", status: "available" },
        { name: "TBD Puppy 3", gender: "female", color: "Black Tri", status: "deposit_paid" },
        { name: "TBD Puppy 4", gender: "male", color: "Blue Merle", status: "available" },
      ],
    },
  },
];

async function seed() {
  console.log("Seeding breeders...");

  for (const b of seedBreeders) {
    const [breeder] = await db
      .insert(breeders)
      .values({
        email: b.email,
        passwordHash: b.passwordHash,
        name: b.name,
        kennelName: b.kennelName,
        city: b.city,
        state: b.state,
        bio: b.bio,
        breeds: b.breeds,
      })
      .returning();
    console.log(`  Created: ${breeder.kennelName} (${breeder.city}, ${breeder.state})`);

    // Insert dam
    const [dam] = await db
      .insert(dogs)
      .values({
        breederId: breeder.id,
        name: b.dam.name,
        breed: b.breeds[0],
        gender: "female",
        color: b.dam.color,
        isActive: true,
      })
      .returning();

    // Insert sire
    const [sire] = await db
      .insert(dogs)
      .values({
        breederId: breeder.id,
        name: b.sire.name,
        breed: b.breeds[0],
        gender: "male",
        color: b.sire.color,
        isActive: true,
      })
      .returning();

    // Insert litter
    const [litter] = await db
      .insert(litters)
      .values({
        breederId: breeder.id,
        damId: dam.id,
        sireId: sire.id,
        whelpDate: b.litter.whelpDate ?? null,
        expectedDate: b.litter.expectedDate ?? null,
        puppyCount: b.litter.puppies.length,
        status: b.litter.status,
      })
      .returning();

    // Insert puppies
    for (const p of b.litter.puppies) {
      await db.insert(puppies).values({
        litterId: litter.id,
        name: p.name,
        gender: p.gender,
        color: p.color,
        status: p.status,
      });
    }
    console.log(`    + Litter with ${b.litter.puppies.length} puppies (${b.litter.status})`);
  }

  console.log("Done!");
}

seed().catch(console.error);
