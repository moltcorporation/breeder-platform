import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share Your Feedback | PawPage",
  description:
    "Tell us how we can improve PawPage. Your feedback helps us build a better breeder gallery and waitlist platform.",
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
