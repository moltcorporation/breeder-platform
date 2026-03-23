// Source of truth for the database schema.
// Edit this file to add or modify tables.
// Changes are auto-applied to the database when merged to main.

import {
  pgTable,
  text,
  timestamp,
  date,
  integer,
  boolean,
  index,
  serial,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const breeders = pgTable("breeders", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  kennelName: text("kennel_name").notNull(),
  city: text("city"),
  state: text("state"),
  bio: text("bio"),
  breeds: text("breeds").array(),
  // Deprecated: not used — Stripe customer tracking is managed by Moltcorp platform
  stripeCustomerId: text("stripe_customer_id"),
  // Pro/Basic access is verified via Moltcorp API; this column is synced on dashboard load
  plan: text("plan").default("free").notNull(),
  // UTM tracking for ad attribution
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const dogs = pgTable("dogs", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  breederId: text("breeder_id")
    .notNull()
    .references(() => breeders.id),
  name: text("name").notNull(),
  breed: text("breed").notNull(),
  gender: text("gender").notNull(),
  dob: date("dob"),
  color: text("color").notNull(),
  weight: text("weight"),
  photos: text("photos").array(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const litters = pgTable("litters", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  breederId: text("breeder_id")
    .notNull()
    .references(() => breeders.id),
  damId: text("dam_id")
    .notNull()
    .references(() => dogs.id),
  sireId: text("sire_id")
    .notNull()
    .references(() => dogs.id),
  whelpDate: date("whelp_date"),
  expectedDate: date("expected_date"),
  puppyCount: integer("puppy_count"),
  status: text("status").default("expected").notNull(),
  photos: text("photos").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const puppies = pgTable("puppies", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  litterId: text("litter_id")
    .notNull()
    .references(() => litters.id),
  name: text("name").notNull(),
  gender: text("gender").notNull(),
  color: text("color").notNull(),
  status: text("status").default("available").notNull(),
  photos: text("photos").array(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const applications = pgTable("applications", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  breederId: text("breeder_id")
    .notNull()
    .references(() => breeders.id),
  applicantName: text("applicant_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  experience: text("experience"),
  preferences: text("preferences"),
  livingSituation: text("living_situation"),
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const waitlist = pgTable("waitlist", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  breederId: text("breeder_id")
    .notNull()
    .references(() => breeders.id),
  applicationId: text("application_id")
    .notNull()
    .references(() => applications.id),
  puppyId: text("puppy_id").references(() => puppies.id),
  position: integer("position").notNull(),
  status: text("status").default("waiting").notNull(),
  depositAmount: integer("deposit_amount"),
  depositPaid: boolean("deposit_paid").default(false).notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const feedback = pgTable("feedback", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  email: text("email"),
  category: text("category").notNull(),
  intent: text("intent"),
  message: text("message").notNull(),
  page: text("page"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const conversionEvents = pgTable("conversion_events", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  breederId: text("breeder_id")
    .notNull()
    .references(() => breeders.id),
  event: text("event").notNull(), // "signup", "purchase"
  plan: text("plan"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const trackingEvents = pgTable("tracking_events", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  breederId: text("breeder_id"),
  event: text("event").notNull(), // "signup", "profile_created", "checkout_initiated", "purchase"
  properties: text("properties"), // JSON string for event metadata
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  breederId: text("breeder_id")
    .notNull()
    .references(() => breeders.id),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const dripSchedule = pgTable(
  "drip_schedule",
  {
    id: serial("id").primaryKey(),
    breederId: text("breeder_id")
      .notNull()
      .references(() => breeders.id),
    emailStep: integer("email_step").notNull(),
    sendAt: timestamp("send_at").notNull(),
    sentAt: timestamp("sent_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("idx_drip_schedule_pending").on(table.sendAt)],
);

export const breedNotifications = pgTable(
  "breed_notifications",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    email: text("email").notNull(),
    breedSlug: text("breed_slug").notNull(),
    state: text("state"),
    zip: text("zip"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("idx_breed_notifications_breed").on(table.breedSlug)],
);

export const dripUnsubscribes = pgTable("drip_unsubscribes", {
  id: serial("id").primaryKey(),
  breederId: text("breeder_id")
    .notNull()
    .unique()
    .references(() => breeders.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
