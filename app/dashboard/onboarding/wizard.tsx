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

type Dog = {
  id: string;
  name: string;
  gender: string;
  breed: string;
};

const SAMPLE_PUPPIES: Record<string, { names: string[]; colors: string[] }> = {
  "golden retriever": {
    names: ["Maple", "Bear", "Clover", "Scout", "Sunny", "Biscuit"],
    colors: ["Light Gold", "Dark Gold", "Cream", "Golden", "Honey", "Amber"],
  },
  "french bulldog": {
    names: ["Pierre", "Coco", "Milo", "Bella", "Louie", "Rosie"],
    colors: ["Brindle", "Fawn", "Cream", "Blue", "Pied", "Lilac"],
  },
  labrador: {
    names: ["Duke", "Daisy", "Cooper", "Sadie", "Tucker", "Molly"],
    colors: ["Chocolate", "Yellow", "Black", "Fox Red", "Champagne", "Charcoal"],
  },
  default: {
    names: ["Maple", "Bear", "Clover", "Scout", "Sunny", "Biscuit"],
    colors: ["Tan", "Black", "White", "Brown", "Spotted", "Cream"],
  },
};

function getSamplePuppies(breed: string, count: number = 4) {
  const key = Object.keys(SAMPLE_PUPPIES).find((k) =>
    breed.toLowerCase().includes(k)
  );
  const data = SAMPLE_PUPPIES[key || "default"];
  return Array.from({ length: count }, (_, i) => ({
    name: data.names[i % data.names.length],
    color: data.colors[i % data.colors.length],
    gender: i % 2 === 0 ? "Male" : "Female",
    status: i < count - 1 ? "Available" : "Reserved",
  }));
}

export function OnboardingWizard({
  breeder,
  kennelSlug,
  dogs,
}: {
  breeder: Breeder;
  kennelSlug: string;
  dogs: Dog[];
}) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  // Step 1: Kennel profile
  const [kennelName, setKennelName] = useState(breeder.kennelName || "");
  const [city, setCity] = useState(breeder.city || "");
  const [state, setState] = useState(breeder.state || "");
  const [breeds, setBreeds] = useState(breeder.breeds?.join(", ") || "");

  // Step 2: First litter
  const [litterBreed, setLitterBreed] = useState("");
  const [litterDate, setLitterDate] = useState("");
  const [puppyCount, setPuppyCount] = useState("");

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  const totalSteps = 4;
  const progressPercent = Math.round((step / totalSteps) * 100);

  async function saveProfile() {
    setSaving(true);
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kennelName: kennelName || breeder.kennelName,
        city,
        state,
        breeds: breeds
          .split(",")
          .map((b) => b.trim())
          .filter(Boolean),
      }),
    });
    setSaving(false);
    setStep(2);
  }

  async function addLitter() {
    setSaving(true);
    try {
      const dam = dogs.find((d) => d.gender === "female");
      const sire = dogs.find((d) => d.gender === "male");

      if (!dam || !sire) {
        const damRes = await fetch("/api/dogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Dam",
            breed: litterBreed || "Mixed",
            gender: "female",
            color: "N/A",
          }),
        });
        const sireRes = await fetch("/api/dogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Sire",
            breed: litterBreed || "Mixed",
            gender: "male",
            color: "N/A",
          }),
        });
        const damData = await damRes.json();
        const sireData = await sireRes.json();

        await fetch("/api/litters", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            damId: damData.id,
            sireId: sireData.id,
            whelpDate: litterDate || null,
            puppyCount: puppyCount ? parseInt(puppyCount) : null,
            status: litterDate ? "whelped" : "expected",
          }),
        });
      } else {
        await fetch("/api/litters", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            damId: dam.id,
            sireId: sire.id,
            whelpDate: litterDate || null,
            puppyCount: puppyCount ? parseInt(puppyCount) : null,
            status: litterDate ? "whelped" : "expected",
          }),
        });
      }
    } catch {
      // Continue even if litter creation fails
    }
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
    { num: 2, label: "First Litter" },
    { num: 3, label: "Preview" },
    { num: 4, label: "Share" },
  ];

  const previewBreed =
    litterBreed ||
    breeds.split(",")[0]?.trim() ||
    breeder.breeds?.[0] ||
    "";
  const samplePuppies = getSamplePuppies(
    previewBreed,
    puppyCount ? Math.min(parseInt(puppyCount), 6) : 4
  );

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-1">Welcome to your kennel!</h1>
      <p className="text-gray-500 mb-6">
        Let&apos;s get you set up in under 2 minutes.
      </p>

      {/* Progress percentage bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Setup progress
          </span>
          <span className="text-sm font-semibold text-gray-900">
            {progressPercent}%
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-gray-100">
          <div
            className="h-2 rounded-full bg-gray-900 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

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
              {step > s.num ? "\u2713" : s.num}
            </div>
            <span
              className={`text-sm ${step >= s.num ? "text-gray-900 font-medium" : "text-gray-400"}`}
            >
              {s.label}
            </span>
            {s.num < totalSteps && (
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
          <h2 className="text-lg font-semibold mb-4">Name your kennel</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="kennelName" className={labelClass}>
                Kennel Name
              </label>
              <input
                id="kennelName"
                type="text"
                value={kennelName}
                onChange={(e) => setKennelName(e.target.value)}
                placeholder="Sunshine Golden Retrievers"
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className={labelClass}>
                  City
                </label>
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
                <label htmlFor="state" className={labelClass}>
                  State
                </label>
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
              <label htmlFor="breeds" className={labelClass}>
                Breeds (comma separated)
              </label>
              <input
                id="breeds"
                type="text"
                value={breeds}
                onChange={(e) => setBreeds(e.target.value)}
                placeholder="Golden Retriever, Labrador"
                className={inputClass}
              />
            </div>
            <button
              onClick={saveProfile}
              disabled={saving || !kennelName}
              className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save & Continue"}
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Add First Litter */}
      {step === 2 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-1">Add your first litter</h2>
          <p className="text-sm text-gray-500 mb-4">
            This helps buyers find you. You can edit details later.
          </p>
          <div className="space-y-4">
            <div>
              <label htmlFor="litterBreed" className={labelClass}>
                Breed
              </label>
              <input
                id="litterBreed"
                type="text"
                value={litterBreed}
                onChange={(e) => setLitterBreed(e.target.value)}
                placeholder="Golden Retriever"
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="litterDate" className={labelClass}>
                  Birth date (or expected)
                </label>
                <input
                  id="litterDate"
                  type="date"
                  value={litterDate}
                  onChange={(e) => setLitterDate(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="puppyCount" className={labelClass}>
                  Number of puppies
                </label>
                <input
                  id="puppyCount"
                  type="number"
                  min="1"
                  max="20"
                  value={puppyCount}
                  onChange={(e) => setPuppyCount(e.target.value)}
                  placeholder="6"
                  className={inputClass}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={addLitter}
                disabled={saving}
                className="flex-1 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {saving ? "Adding..." : "Add Litter & Continue"}
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

      {/* Step 3: Preview Gallery with Sample Data */}
      {step === 3 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-1">
            Preview your gallery
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Here&apos;s what buyers will see. Sample puppies shown below — replace them with your own photos later.
          </p>

          {/* Gallery preview with sample data */}
          <div className="rounded-lg border border-gray-200 overflow-hidden mb-4">
            <div className="bg-gray-50 px-5 py-4 border-b border-gray-200">
              <h3 className="font-semibold text-lg">
                {kennelName || breeder.kennelName}
              </h3>
              {(city || state) && (
                <p className="text-sm text-gray-500 mt-0.5">
                  {[city, state].filter(Boolean).join(", ")}
                </p>
              )}
              {breeds && (
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {breeds
                    .split(",")
                    .map((b) => b.trim())
                    .filter(Boolean)
                    .map((b) => (
                      <span
                        key={b}
                        className="inline-block rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-700"
                      >
                        {b}
                      </span>
                    ))}
                </div>
              )}
            </div>
            <div className="px-5 py-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                {previewBreed ? `${previewBreed} Litter` : "Current Litter"} — Sample Preview
              </p>
              <div className="grid grid-cols-2 gap-3">
                {samplePuppies.map((puppy) => (
                  <div
                    key={puppy.name}
                    className="rounded-lg border border-gray-100 bg-gray-50 p-3"
                  >
                    <div className="h-16 rounded bg-gray-200 mb-2 flex items-center justify-center">
                      <svg
                        className="h-6 w-6 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v13.5a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-700">{puppy.name}</p>
                    <p className="text-xs text-gray-500">
                      {puppy.gender} · {puppy.color}
                    </p>
                    <p
                      className={`text-xs font-medium mt-0.5 ${
                        puppy.status === "Available"
                          ? "text-green-600"
                          : "text-amber-600"
                      }`}
                    >
                      {puppy.status}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-gray-400 mt-3">
                These are sample puppies — add your own photos to make your gallery shine
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href={`/${kennelSlug}`}
              target="_blank"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 text-center"
            >
              View live gallery
            </Link>
            <button
              onClick={() => setStep(4)}
              className="flex-1 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Share Your Link */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
                <svg
                  className="h-5 w-5 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold">You&apos;re all set!</h2>
                <p className="text-sm text-gray-500">
                  Share your gallery link so buyers can find you.
                </p>
              </div>
            </div>

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
                href="/dashboard/dogs/new"
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium">Add your dogs</p>
                  <p className="text-sm text-gray-500">
                    Add photos and details for your dam &amp; sire
                  </p>
                </div>
                <span className="text-gray-400">&rarr;</span>
              </Link>
              <Link
                href="/dashboard/litters"
                className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium">Manage your litters</p>
                  <p className="text-sm text-gray-500">
                    Add puppies and start accepting applications
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
