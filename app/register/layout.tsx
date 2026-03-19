import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your Free Breeder Gallery | PawPage",
  description:
    "Sign up for PawPage to create a beautiful gallery page, manage your puppy waitlist, and collect applications. Free to start.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
