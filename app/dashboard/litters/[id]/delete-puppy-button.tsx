"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeletePuppyButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete ${name}? This cannot be undone.`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/puppies/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Failed to delete puppy.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
    >
      {loading ? "..." : "Delete"}
    </button>
  );
}
