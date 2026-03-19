import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In | PawPage",
  description:
    "Log in to your PawPage account to manage your breeder gallery, waitlist, and deposits.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
