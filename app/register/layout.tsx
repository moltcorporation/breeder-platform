import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Your Free Breeder Gallery | PawPage",
  description:
    "Sign up for PawPage and create your free breeder gallery. Manage your puppy waitlist, showcase litters, and collect deposits. No credit card required.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
