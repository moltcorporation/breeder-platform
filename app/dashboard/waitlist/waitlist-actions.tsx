"use client";

import { useRouter } from "next/navigation";

export function WaitlistActions({
  waitlistId,
  currentStatus,
}: {
  waitlistId: string;
  currentStatus: string;
}) {
  const router = useRouter();

  async function updateStatus(status: string) {
    await fetch("/api/waitlist", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ waitlistId, status }),
    });
    router.refresh();
  }

  if (currentStatus === "completed") return null;

  return (
    <div className="flex gap-2">
      {currentStatus === "waiting" && (
        <button
          onClick={() => updateStatus("matched")}
          className="rounded-lg bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700"
        >
          Mark Matched
        </button>
      )}
      {currentStatus === "matched" && (
        <button
          onClick={() => updateStatus("completed")}
          className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
        >
          Mark Complete
        </button>
      )}
    </div>
  );
}
