import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In | PawPage",
  description:
    "Sign in to your PawPage account to manage your kennel gallery, waitlist, and puppy applications.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
