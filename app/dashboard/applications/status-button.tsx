"use client";

import { useRouter } from "next/navigation";

export function StatusButton({
  applicationId,
  status,
  current,
}: {
  applicationId: number;
  status: string;
  current: string;
}) {
  const router = useRouter();
  const isActive = current === status;

  const colors: Record<string, string> = {
    approved: isActive
      ? "bg-green-600 text-white"
      : "border border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-950",
    waitlisted: isActive
      ? "bg-blue-600 text-white"
      : "border border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-950",
    rejected: isActive
      ? "bg-red-600 text-white"
      : "border border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950",
  };

  async function handleClick() {
    await fetch(`/api/applications/${applicationId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    router.refresh();
  }

  return (
    <button
      onClick={handleClick}
      className={`rounded-lg px-3 py-1.5 text-xs font-medium ${colors[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </button>
  );
}
