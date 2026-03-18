import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Puppy Application Form Template: What Every Breeder Should Ask",
  description:
    "A complete puppy application form template with the essential questions responsible breeders ask — household, experience, housing, and vet references.",
};

const faqs = [
  {
    question: "How many questions is too many on a puppy application?",
    answer:
      "Aim for 15 to 25 questions. Fewer than that and you won't get enough information to make a good decision. More than 30 and you risk scaring off qualified buyers who don't have the patience to fill out a novel. Group questions by category so it feels organized rather than overwhelming.",
  },
  {
    question: "Should I charge an application fee?",
    answer:
      "Most breeders don't charge an application fee — it can discourage good candidates. Instead, collect a deposit after you've approved the applicant and they've accepted a waitlist position. The deposit serves the same filtering purpose without creating a barrier to entry.",
  },
  {
    question: "How quickly should I respond to applications?",
    answer:
      "Within 48 hours is ideal. Even if you haven't fully reviewed the application, a quick acknowledgment (\"We received your application and will review it this week\") goes a long way. Buyers who hear nothing assume the worst and move on to another breeder.",
  },
  {
    question: "What if I have to reject an applicant?",
    answer:
      "Be honest but kind. You don't need to give a detailed explanation, but a brief, respectful message is professional. Something like: \"After reviewing your application, we don't feel this is the right match for one of our puppies at this time.\" Most people appreciate the closure.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.answer,
    },
  })),
};

// ---------------------------------------------------------------------------
// Shared layout components
// ---------------------------------------------------------------------------

function ArticleNav() {
  return (
    <nav className="border-b border-stone-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-stone-900"
        >
          Breeder Platform
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-stone-600 hover:text-stone-900"
          >
            Home
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-amber-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700"
          >
            Get started free
          </Link>
        </div>
      </div>
    </nav>
  );
}

function ArticleFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="font-semibold text-stone-900">Breeder Platform</p>
          <p className="mt-1 text-sm text-stone-400">
            &copy; {new Date().getFullYear()} Breeder Platform. All rights
            reserved.
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-stone-500 hover:text-stone-700">
            Home
          </Link>
          <Link href="/login" className="text-stone-500 hover:text-stone-700">
            Login
          </Link>
          <Link
            href="/register"
            className="text-stone-500 hover:text-stone-700"
          >
            Register
          </Link>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-stone-400">
        Built by AI agents at Moltcorp
      </p>
    </footer>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PuppyApplicationFormTemplatePage() {
  return (
    <div className="min-h-screen bg-white">
      <ArticleNav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-2xl px-4 pb-20 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        {/* H1 */}
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Puppy Application Form Template: What Every Breeder Should Ask
        </h1>

        {/* Intro */}
        <p className="mt-6 text-lg leading-relaxed text-stone-600">
          A puppy application is the single most important tool a responsible
          breeder has for screening homes. It protects your puppies, saves you
          time, and sets the tone for a professional relationship with every
          buyer. This guide gives you a complete template with every question
          you should consider — and how to evaluate the answers.
        </p>

        {/* Why Applications Matter */}
        <h2 className="mt-12 text-2xl font-bold text-stone-900">
          Why Applications Matter
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          You&apos;ve invested months of care, health testing, and planning into
          each litter. An application form ensures that effort doesn&apos;t end
          at the point of sale.
        </p>
        <ul className="mt-4 space-y-3 text-stone-600">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">Protect your puppies.</strong>{" "}
              Applications let you verify that each home is safe, prepared, and
              a good fit for the breed.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">Screen homes efficiently.</strong>{" "}
              Instead of asking the same 20 questions over and over in DMs, an
              application collects everything in one place.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">Reduce returns.</strong>{" "}
              Puppies that go to well-matched homes stay in those homes. A
              thorough screening process dramatically reduces the chance of a
              puppy being returned.
            </span>
          </li>
        </ul>

        {/* Essential Questions to Ask */}
        <h2 className="mt-12 text-2xl font-bold text-stone-900">
          Essential Questions to Ask
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          Organize your application by category so it feels structured and
          easy to complete. Here&apos;s what to include in each section.
        </p>

        {/* Contact Info */}
        <h3 className="mt-8 text-lg font-semibold text-stone-900">
          Contact Information
        </h3>
        <ul className="mt-3 space-y-2 text-stone-600">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            Full name
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            Email address
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            Phone number
          </li>
        </ul>

        {/* Household */}
        <h3 className="mt-8 text-lg font-semibold text-stone-900">
          Household
        </h3>
        <ul className="mt-3 space-y-2 text-stone-600">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            How many adults live in the home?
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            Are there children? If so, what are their ages?
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            Do you have other pets? Please list type, breed, age, and temperament.
          </li>
        </ul>

        {/* Housing */}
        <h3 className="mt-8 text-lg font-semibold text-stone-900">Housing</h3>
        <ul className="mt-3 space-y-2 text-stone-600">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            What type of home do you live in? (House, apartment, condo, etc.)
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            Do you have a yard? Is it fenced?
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            Do you own or rent? If renting, does your landlord allow pets?
          </li>
        </ul>

        {/* Lifestyle */}
        <h3 className="mt-8 text-lg font-semibold text-stone-900">
          Lifestyle
        </h3>
        <ul className="mt-3 space-y-2 text-stone-600">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            What is your typical work schedule? Will the puppy be left alone during the day?
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            How often do you travel? What is your plan for the dog when you&apos;re away?
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            How would you describe your activity level? (Sedentary, moderate, very active)
          </li>
        </ul>

        {/* Experience */}
        <h3 className="mt-8 text-lg font-semibold text-stone-900">
          Experience
        </h3>
        <ul className="mt-3 space-y-2 text-stone-600">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            Have you owned this breed before? If so, tell us about your experience.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            Have you owned dogs before? What happened to your previous dogs?
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            What is your plan for training? (Self-taught, group classes, private trainer)
          </li>
        </ul>

        {/* Motivation */}
        <h3 className="mt-8 text-lg font-semibold text-stone-900">
          Motivation
        </h3>
        <ul className="mt-3 space-y-2 text-stone-600">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            Why are you interested in this breed specifically?
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            What qualities are you looking for in a puppy? (Energy level, temperament, size)
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            Is this puppy intended as a family pet, show dog, working dog, or breeding prospect?
          </li>
        </ul>

        {/* References */}
        <h3 className="mt-8 text-lg font-semibold text-stone-900">
          References
        </h3>
        <ul className="mt-3 space-y-2 text-stone-600">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            Veterinarian name and phone number (or clinic name if this is your first dog)
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            Personal reference — name, relationship, and contact info
          </li>
        </ul>

        {/* Red Flags to Watch For */}
        <h2 className="mt-12 text-2xl font-bold text-stone-900">
          Red Flags to Watch For
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          Not every application is a good one. Watch for these warning signs
          when reviewing submissions.
        </p>
        <ul className="mt-4 space-y-3 text-stone-600">
          {[
            {
              flag: "Vague or one-word answers.",
              detail:
                "An applicant who can't be bothered to write a sentence about why they want your breed probably hasn't done their research.",
            },
            {
              flag: "Unwilling to provide references.",
              detail:
                "If someone refuses to share a vet reference, that's a significant red flag — especially if they claim to have owned dogs before.",
            },
            {
              flag: "No research on the breed.",
              detail:
                "They can't name a single breed-specific trait or health concern. This suggests an impulse decision rather than a considered commitment.",
            },
            {
              flag: "Impulse timing.",
              detail:
                "\"I need a puppy by Christmas\" or \"my kids just asked for one\" signals a decision driven by emotion rather than planning.",
            },
            {
              flag: "No plan for training.",
              detail:
                "Every puppy needs training. If an applicant has no plan — or thinks training isn't necessary — the puppy is likely to end up in a difficult situation.",
            },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
              <span>
                <strong className="text-stone-800">{item.flag}</strong>{" "}
                {item.detail}
              </span>
            </li>
          ))}
        </ul>

        {/* How to Evaluate Applications */}
        <h2 className="mt-12 text-2xl font-bold text-stone-900">
          How to Evaluate Applications
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          Reading applications is one thing — evaluating them consistently is
          another. Here&apos;s a framework that works.
        </p>
        <ul className="mt-4 space-y-3 text-stone-600">
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">Use a simple scoring system.</strong>{" "}
              Rate each application on 3-5 key criteria (experience, living
              situation, breed knowledge, references, lifestyle fit) on a 1-5
              scale. This prevents gut-feeling bias.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">Prioritize lifestyle fit over experience.</strong>{" "}
              A first-time dog owner with a great lifestyle and willingness to
              learn can be a better home than an experienced owner with a
              chaotic household.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">Follow up with a phone or video call.</strong>{" "}
              Applications tell you what people write. A conversation tells you
              who they are. A 15-minute call can confirm or change your initial
              impression.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-600" />
            <span>
              <strong className="text-stone-800">Check references — actually call them.</strong>{" "}
              A vet reference takes 5 minutes to verify and tells you volumes
              about how someone cares for animals.
            </span>
          </li>
        </ul>

        {/* CTA */}
        <div className="mt-12 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-8 text-center">
          <h2 className="text-xl font-bold text-stone-900">
            Stop collecting applications in DMs.
          </h2>
          <p className="mt-2 text-stone-600">
            Our built-in application form collects everything you need —
            automatically.
          </p>
          <Link
            href="/register"
            className="mt-6 inline-block rounded-full bg-amber-600 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700"
          >
            Get started free
          </Link>
        </div>

        {/* FAQ */}
        <h2 className="mt-16 text-2xl font-bold text-stone-900">
          Frequently Asked Questions
        </h2>
        <dl className="mt-6 divide-y divide-stone-200">
          {faqs.map((faq, i) => (
            <div key={i} className="py-6">
              <dt className="font-semibold text-stone-900">{faq.question}</dt>
              <dd className="mt-2 leading-relaxed text-stone-600">
                {faq.answer}
              </dd>
            </div>
          ))}
        </dl>
      </article>

      <ArticleFooter />
    </div>
  );
}
