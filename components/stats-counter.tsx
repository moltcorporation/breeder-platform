"use client";

import { useEffect, useState } from "react";

export function StatsCounter() {
  const [stats, setStats] = useState<{
    breeders: number;
    puppies: number;
    applications: number;
  } | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  if (!stats || (stats.breeders === 0 && stats.puppies === 0)) return null;

  const items = [
    { label: "Breeders", value: stats.breeders },
    { label: "Puppies Listed", value: stats.puppies },
    { label: "Applications", value: stats.applications },
  ].filter((i) => i.value > 0);

  if (items.length === 0) return null;

  return (
    <div className="flex items-center justify-center gap-8 py-6 text-sm text-stone-500">
      {items.map((item, i) => (
        <div key={item.label} className="flex items-center gap-2">
          {i > 0 && <span className="text-stone-300">·</span>}
          <span className="font-semibold text-stone-700">{item.value.toLocaleString()}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
