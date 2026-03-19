import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share Your Feedback | PawPage",
  description:
    "Tell us how we can make PawPage better. Share ideas, report issues, or just say hello.",
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
