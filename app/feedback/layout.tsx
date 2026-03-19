import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share Your Feedback | PawPage",
  description:
    "Tell us what you think about PawPage. Report bugs, request features, or share your experience.",
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
