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
  stripeCustomerId: text("stripe_customer_id"),
  plan: text("plan").default("free").notNull(),
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
