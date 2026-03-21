"use client";

import { trackEvent } from "@/lib/track";

export function CheckoutLink({
  href,
  plan,
  source,
  className,
  children,
}: {
  href: string;
  plan: string;
  source: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={() => trackEvent("checkout_initiated", { plan, source })}
      className={className}
    >
      {children}
    </a>
  );
}
