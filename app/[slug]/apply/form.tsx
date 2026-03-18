"use client";

import { useState } from "react";

export function ApplicationForm({
  kennelId,
  slug,
}: {
  kennelId: number;
  slug: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const body = {
      kennelId,
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      adults: Number(data.get("adults")),
      childrenAges: data.get("childrenAges") || null,
      otherPets: data.get("otherPets") || null,
      housingType: data.get("housingType"),
      hasYard: data.get("hasYard") === "yes",
      hasFence: data.get("hasFence") === "yes",
      workSchedule: data.get("workSchedule"),
      breedExperience: data.get("breedExperience"),
      whyThisBreed: data.get("whyThisBreed"),
      vetName: data.get("vetName") || null,
      vetPhone: data.get("vetPhone") || null,
      notes: data.get("notes") || null,
    };

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Something went wrong");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center dark:border-green-900 dark:bg-green-950">
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-200">
          Application Submitted
        </h2>
        <p className="mt-2 text-green-700 dark:text-green-300">
          Thank you! The breeder will review your application and get back to
          you.
        </p>
        <a
          href={`/${slug}`}
          className="mt-4 inline-block text-sm text-green-600 hover:text-green-800 dark:text-green-400"
        >
          &larr; Back to kennel page
        </a>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500";
  const labelClass =
    "block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1";
  const sectionClass = "space-y-4";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      <fieldset className={sectionClass}>
        <legend className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          About You
        </legend>
        <div>
          <label htmlFor="name" className={labelClass}>
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              className={inputClass}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className={sectionClass}>
        <legend className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Your Household
        </legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="adults" className={labelClass}>
              Adults in household *
            </label>
            <input
              type="number"
              name="adults"
              id="adults"
              min="1"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="childrenAges" className={labelClass}>
              Children (ages)
            </label>
            <input
              type="text"
              name="childrenAges"
              id="childrenAges"
              placeholder="e.g. 5, 8, 12"
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label htmlFor="otherPets" className={labelClass}>
            Other pets
          </label>
          <input
            type="text"
            name="otherPets"
            id="otherPets"
            placeholder="e.g. 1 cat, 1 dog (lab mix, 3 years)"
            className={inputClass}
          />
        </div>
      </fieldset>

      <fieldset className={sectionClass}>
        <legend className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Your Home
        </legend>
        <div>
          <label htmlFor="housingType" className={labelClass}>
            Housing type *
          </label>
          <select name="housingType" id="housingType" required className={inputClass}>
            <option value="">Select...</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="hasYard" className={labelClass}>
              Do you have a yard? *
            </label>
            <select name="hasYard" id="hasYard" required className={inputClass}>
              <option value="">Select...</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="hasFence" className={labelClass}>
              Is it fenced? *
            </label>
            <select name="hasFence" id="hasFence" required className={inputClass}>
              <option value="">Select...</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset className={sectionClass}>
        <legend className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Experience
        </legend>
        <div>
          <label htmlFor="workSchedule" className={labelClass}>
            Work schedule *
          </label>
          <select
            name="workSchedule"
            id="workSchedule"
            required
            className={inputClass}
          >
            <option value="">Select...</option>
            <option value="home">Work from home</option>
            <option value="office">Work in office</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div>
          <label htmlFor="breedExperience" className={labelClass}>
            Breed experience *
          </label>
          <select
            name="breedExperience"
            id="breedExperience"
            required
            className={inputClass}
          >
            <option value="">Select...</option>
            <option value="first_time">First time owner</option>
            <option value="have_owned">Have owned this breed before</option>
            <option value="currently_own">Currently own this breed</option>
          </select>
        </div>
        <div>
          <label htmlFor="whyThisBreed" className={labelClass}>
            Why this breed? *
          </label>
          <textarea
            name="whyThisBreed"
            id="whyThisBreed"
            required
            rows={3}
            placeholder="Tell us why you're interested in this breed and what you're looking for..."
            className={inputClass}
          />
        </div>
      </fieldset>

      <fieldset className={sectionClass}>
        <legend className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Vet Reference (optional)
        </legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="vetName" className={labelClass}>
              Vet name
            </label>
            <input
              type="text"
              name="vetName"
              id="vetName"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="vetPhone" className={labelClass}>
              Vet phone
            </label>
            <input
              type="tel"
              name="vetPhone"
              id="vetPhone"
              className={inputClass}
            />
          </div>
        </div>
      </fieldset>

      <div>
        <label htmlFor="notes" className={labelClass}>
          Anything else you&apos;d like us to know?
        </label>
        <textarea
          name="notes"
          id="notes"
          rows={3}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-zinc-900 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {submitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
