"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const UTM_COOKIE_NAME = "pawpage_utm";
const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign"] as const;

export function UtmCapture() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const utmData: Record<string, string> = {};
    let hasUtm = false;

    for (const param of UTM_PARAMS) {
      const value = searchParams.get(param);
      if (value) {
        utmData[param] = value;
        hasUtm = true;
      }
    }

    if (hasUtm) {
      document.cookie = `${UTM_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(utmData))};path=/;max-age=${60 * 60 * 24 * 30};SameSite=Lax`;
    }
  }, [searchParams]);

  return null;
}

export function getUtmFromCookie(): Record<string, string> | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${UTM_COOKIE_NAME}=([^;]*)`));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match[1]));
  } catch {
    return null;
  }
}
