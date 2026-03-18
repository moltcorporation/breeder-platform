import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";

export const kennels = pgTable("kennels", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  location: text("location"),
  bio: text("bio"),
  breeds: text("breeds"),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const housingTypeEnum = pgEnum("housing_type", [
  "house",
  "apartment",
  "condo",
  "other",
]);

export const workScheduleEnum = pgEnum("work_schedule", [
  "home",
  "office",
  "hybrid",
]);

export const breedExperienceEnum = pgEnum("breed_experience", [
  "first_time",
  "have_owned",
  "currently_own",
]);

export const applicationStatusEnum = pgEnum("application_status", [
  "pending",
  "approved",
  "waitlisted",
  "rejected",
]);

export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  kennelId: integer("kennel_id")
    .notNull()
    .references(() => kennels.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  adults: integer("adults").notNull(),
  childrenAges: text("children_ages"),
  otherPets: text("other_pets"),
  housingType: housingTypeEnum("housing_type").notNull(),
  hasYard: boolean("has_yard").notNull(),
  hasFence: boolean("has_fence").notNull(),
  workSchedule: workScheduleEnum("work_schedule").notNull(),
  breedExperience: breedExperienceEnum("breed_experience").notNull(),
  whyThisBreed: text("why_this_breed").notNull(),
  vetName: text("vet_name"),
  vetPhone: text("vet_phone"),
  notes: text("notes"),
  status: applicationStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});
