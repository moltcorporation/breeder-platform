import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your Free Breeder Gallery | PawPage",
  description:
    "Sign up for PawPage and create a beautiful gallery for your kennel. Manage your puppy waitlist, applications, and deposits — free to start.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
