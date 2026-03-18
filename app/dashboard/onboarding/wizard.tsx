"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Breeder = {
  id: string;
  name: string;
  kennelName: string;
  city: string | null;
  state: string | null;
  bio: string | null;
  breeds: string[] | null;
};

export function OnboardingWizard({
  breeder,
  kennelSlug,
}: {
  breeder: Breeder;
  kennelSlug: string;
}) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  // Step 1: Kennel profile
  const [bio, setBio] = useState(breeder.bio || "");
  const [city, setCity] = useState(breeder.city || "");
  const [state, setState] = useState(breeder.state || "");
  const [breeds, setBreeds] = useState(
    breeder.breeds?.join(", ") || ""
  );

  // Step 2: First dog
  const [dogName, setDogName] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [dogGender, setDogGender] = useState("female");
  const [dogColor, setDogColor] = useState("");

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  async function saveProfile() {
    setSaving(true);
    await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bio,
        city,
        state,
        breeds: breeds.split(",").map((b) => b.trim()).filter(Boolean),
      }),
    });
    setSaving(false);
    setStep(2);
  }

  async function addDog() {
    if (!dogName || !dogBreed || !dogColor) return;
    setSaving(true);
    await fetch("/api/dogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: dogName,
        breed: dogBreed,
        gender: dogGender,
        color: dogColor,
      }),
    });
    setSaving(false);
    setStep(3);
  }

  function copyLink() {
    const url = `${window.location.origin}/${kennelSlug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const steps = [
    { num: 1, label: "Your Kennel" },
    { num: 2, label: "First Dog" },
    { num: 3, label: "Preview & Share" },
  ];

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-1">Welcome to your kennel!</h1>
      <p className="text-gray-500 mb-8">
        Let&apos;s get you set up in under 2 minutes.
      </p>

      {/* Progress steps */}
      <div className="flex items-center gap-2 mb-8">
        {steps.map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                step >= s.num
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {step > s.num ? "✓" : s.num}
            </div>
            <span
              className={`text-sm ${step >= s.num ? "text-gray-900 font-medium" : "text-gray-400"}`}
            >
              {s.label}
            </span>
            {s.num < 3 && (
              <div
                className={`h-px w-8 ${step > s.num ? "bg-gray-900" : "bg-gray-200"}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Kennel Profile */}
      {step === 1 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Set up your kennel</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className={labelClass}>City</label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Austin"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="state" className={labelClass}>State</label>
                <input
                  id="state"
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="TX"
                  maxLength={2}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label htmlFor="breeds" className={labelClass}>Breeds (comma separated)</label>
              <input
                id="breeds"
                type="text"
                value={breeds}
                onChange={(e) => setBreeds(e.target.value)}
                placeholder="Golden Retriever, Labrador"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="bio" className={labelClass}>About your kennel</label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell potential buyers about your breeding program, health testing, and what makes your kennel special..."
                rows={3}
                className={inputClass}
              />
            </div>
            <button
              onClick={saveProfile}
              disabled={saving}
              className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save & Continue"}
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Add First Dog */}
      {step === 2 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-1">Add your first dog</h2>
          <p className="text-sm text-gray-500 mb-4">
            This shows up on your gallery page. You can add more later.
          </p>
          <div className="space-y-4">
            <div>
              <label htmlFor="dogName" className={labelClass}>Name</label>
              <input
                id="dogName"
                type="text"
                value={dogName}
                onChange={(e) => setDogName(e.target.value)}
                placeholder="Daisy"
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="dogBreed" className={labelClass}>Breed</label>
                <input
                  id="dogBreed"
                  type="text"
                  value={dogBreed}
                  onChange={(e) => setDogBreed(e.target.value)}
                  placeholder="Golden Retriever"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="dogGender" className={labelClass}>Gender</label>
                <select
                  id="dogGender"
                  value={dogGender}
                  onChange={(e) => setDogGender(e.target.value)}
                  className={inputClass}
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="dogColor" className={labelClass}>Color</label>
              <input
                id="dogColor"
                type="text"
                value={dogColor}
                onChange={(e) => setDogColor(e.target.value)}
                placeholder="Golden"
                className={inputClass}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={addDog}
                disabled={saving || !dogName || !dogBreed || !dogColor}
                className="flex-1 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {saving ? "Adding..." : "Add Dog & Continue"}
              </button>
              <button
                onClick={() => setStep(3)}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Preview & Share */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-1">
              Your gallery is live!
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Share this link on your Instagram bio, Facebook, or anywhere you
              connect with potential buyers.
            </p>

            <div className="flex items-center gap-2">
              <div className="flex-1 rounded-lg bg-gray-50 border border-gray-200 px-4 py-2.5 text-sm font-mono text-gray-700">
                {typeof window !== "undefined"
                  ? `${window.location.origin}/${kennelSlug}`
                  : `/${kennelSlug}`}
              </div>
              <button
                onClick={copyLink}
                className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
              >
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">What&apos;s next?</h2>
            <div className="space-y-3">
              <Link
                href={`/${kennelSlug}`}
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium">Preview your gallery</p>
                  <p className="text-sm text-gray-500">
                    See what buyers will see
                  </p>
                </div>
                <span className="text-gray-400">&rarr;</span>
              </Link>
              <Link
                href="/dashboard/dogs/new"
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium">Add more dogs</p>
                  <p className="text-sm text-gray-500">
                    Build out your kennel profile
                  </p>
                </div>
                <span className="text-gray-400">&rarr;</span>
              </Link>
              <Link
                href="/dashboard/litters/new"
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium">Create a litter</p>
                  <p className="text-sm text-gray-500">
                    Start accepting applications
                  </p>
                </div>
                <span className="text-gray-400">&rarr;</span>
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium">Go to dashboard</p>
                  <p className="text-sm text-gray-500">
                    Manage everything from here
                  </p>
                </div>
                <span className="text-gray-400">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
