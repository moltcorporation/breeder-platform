"use client";

import { useState } from "react";

interface ApplicationFormProps {
  breederId: string;
  kennelName: string;
}

export default function ApplicationForm({
  breederId,
  kennelName,
}: ApplicationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      breeder_id: breederId,
      applicant_name: data.get("applicant_name"),
      email: data.get("email"),
      phone: data.get("phone"),
      adults: data.get("adults"),
      children: data.get("children"),
      other_pets: data.get("other_pets"),
      housing_type: data.get("housing_type"),
      has_yard: data.get("has_yard"),
      yard_fenced: data.get("yard_fenced"),
      work_schedule: data.get("work_schedule"),
      breed_experience: data.get("breed_experience"),
      why_breed: data.get("why_breed"),
      vet_name: data.get("vet_name"),
      vet_phone: data.get("vet_phone"),
      notes: data.get("notes"),
    };

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong");
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-10">
          <svg
            className="mx-auto h-12 w-12 text-emerald-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-stone-900">
            Application Submitted!
          </h2>
          <p className="mt-3 text-stone-600">
            {kennelName} will review your application and reach out via email.
          </p>
        </div>
      </div>
    );
  }

  const inputClass =
    "block w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-stone-900 shadow-sm placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition";
  const selectClass =
    "block w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-stone-900 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition";
  const labelClass = "block text-sm font-medium text-stone-700 mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Your Information */}
      <fieldset>
        <legend className="text-lg font-semibold text-stone-900">
          Your Information
        </legend>
        <p className="mt-1 text-sm text-stone-500">
          Required fields are marked with *
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="applicant_name" className={labelClass}>
              Full Name *
            </label>
            <input
              type="text"
              id="applicant_name"
              name="applicant_name"
              required
              className={inputClass}
              placeholder="Jane Smith"
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className={inputClass}
              placeholder="jane@example.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={inputClass}
              placeholder="(555) 123-4567"
            />
          </div>
        </div>
      </fieldset>

      {/* Your Household */}
      <fieldset>
        <legend className="text-lg font-semibold text-stone-900">
          Your Household
        </legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="adults" className={labelClass}>
              Number of Adults
            </label>
            <input
              type="number"
              id="adults"
              name="adults"
              min="1"
              className={inputClass}
              placeholder="2"
            />
          </div>
          <div>
            <label htmlFor="children" className={labelClass}>
              Children and Ages
            </label>
            <input
              type="text"
              id="children"
              name="children"
              className={inputClass}
              placeholder="2 kids, ages 5 and 8"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="other_pets" className={labelClass}>
              Other Pets
            </label>
            <input
              type="text"
              id="other_pets"
              name="other_pets"
              className={inputClass}
              placeholder="1 cat, 1 golden retriever"
            />
          </div>
        </div>
      </fieldset>

      {/* Your Home */}
      <fieldset>
        <legend className="text-lg font-semibold text-stone-900">
          Your Home
        </legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          <div>
            <label htmlFor="housing_type" className={labelClass}>
              Housing Type
            </label>
            <select id="housing_type" name="housing_type" className={selectClass}>
              <option value="">Select...</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="condo">Condo</option>
              <option value="townhouse">Townhouse</option>
            </select>
          </div>
          <div>
            <label htmlFor="has_yard" className={labelClass}>
              Do You Have a Yard?
            </label>
            <select id="has_yard" name="has_yard" className={selectClass}>
              <option value="">Select...</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="yard_fenced" className={labelClass}>
              Is It Fenced?
            </label>
            <select id="yard_fenced" name="yard_fenced" className={selectClass}>
              <option value="">Select...</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="partial">Partial</option>
            </select>
          </div>
        </div>
      </fieldset>

      {/* Your Experience */}
      <fieldset>
        <legend className="text-lg font-semibold text-stone-900">
          Your Experience
        </legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="work_schedule" className={labelClass}>
              Work Schedule
            </label>
            <select
              id="work_schedule"
              name="work_schedule"
              className={selectClass}
            >
              <option value="">Select...</option>
              <option value="home full-time">Home Full-Time</option>
              <option value="hybrid">Hybrid</option>
              <option value="office full-time">Office Full-Time</option>
            </select>
          </div>
          <div>
            <label htmlFor="breed_experience" className={labelClass}>
              Breed Experience
            </label>
            <select
              id="breed_experience"
              name="breed_experience"
              className={selectClass}
            >
              <option value="">Select...</option>
              <option value="first time">First Time</option>
              <option value="have owned before">Have Owned Before</option>
              <option value="currently own this breed">
                Currently Own This Breed
              </option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="why_breed" className={labelClass}>
              Why Do You Want This Breed?
            </label>
            <textarea
              id="why_breed"
              name="why_breed"
              rows={4}
              className={inputClass}
              placeholder="Tell the breeder what draws you to this breed..."
            />
          </div>
        </div>
      </fieldset>

      {/* Optional */}
      <fieldset>
        <legend className="text-lg font-semibold text-stone-900">
          Optional
        </legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="vet_name" className={labelClass}>
              Vet Reference Name
            </label>
            <input
              type="text"
              id="vet_name"
              name="vet_name"
              className={inputClass}
              placeholder="Dr. Johnson"
            />
          </div>
          <div>
            <label htmlFor="vet_phone" className={labelClass}>
              Vet Phone
            </label>
            <input
              type="tel"
              id="vet_phone"
              name="vet_phone"
              className={inputClass}
              placeholder="(555) 987-6543"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="notes" className={labelClass}>
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              className={inputClass}
              placeholder="Anything else the breeder should know..."
            />
          </div>
        </div>
      </fieldset>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-amber-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
