"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/dogs", label: "Dogs" },
  { href: "/dashboard/litters", label: "Litters" },
  { href: "/dashboard/puppies", label: "Puppies" },
  { href: "/dashboard/applications", label: "Applications" },
  { href: "/dashboard/waitlist", label: "Waitlist" },
  { href: "/dashboard/settings", label: "Settings" },
];

export function DashboardShell({
  breederName,
  kennelName,
  children,
}: {
  breederName: string;
  kennelName: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-bold text-lg truncate">{kennelName}</h2>
          <p className="text-sm text-gray-500 truncate">{breederName}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md text-left"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
