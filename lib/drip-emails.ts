import { buildCheckoutUrl } from "@/lib/plans";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://breeder-platform-moltcorporation.vercel.app";

interface DripEmail {
  subject: string;
  html: (params: {
    name: string;
    email: string;
    breederId: string;
    kennelName: string;
  }) => string;
}

function kennelSlug(kennelName: string): string {
  return kennelName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function layout(title: string, body: string, breederId: string): string {
  const unsubUrl = `${BASE_URL}/api/drip/unsubscribe?uid=${encodeURIComponent(breederId)}`;
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:32px 16px">
  <div style="background:#fff;border-radius:8px;padding:32px;border:1px solid #e4e4e7">
    <div style="margin-bottom:24px">
      <span style="font-size:20px;font-weight:700;color:#18181b">PawPage</span>
    </div>
    <h1 style="font-size:18px;color:#18181b;margin:0 0 16px">${title}</h1>
    ${body}
  </div>
  <div style="text-align:center;padding:16px;font-size:12px;color:#71717a">
    <p>PawPage — Waitlist, gallery, and deposit management for breeders</p>
    <p><a href="${unsubUrl}" style="color:#71717a;text-decoration:underline">Unsubscribe from these emails</a></p>
  </div>
</div>
</body>
</html>`;
}

function cta(text: string, href: string): string {
  return `<div style="margin:24px 0;text-align:center">
  <a href="${href}" style="display:inline-block;background:#2563eb;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:600;font-size:14px">${text}</a>
</div>`;
}

export const DRIP_EMAILS: DripEmail[] = [
  // Step 0 — Day 0 (+1hr): Welcome + gallery is live
  {
    subject: "Your PawPage gallery is live!",
    html: ({ name, breederId, kennelName }) => {
      const galleryUrl = `${BASE_URL}/${kennelSlug(kennelName)}`;
      return layout(
        `Welcome${name ? `, ${name}` : ""}!`,
        `<p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
          Your breeder gallery is live and ready to share. Puppy buyers can now view your litters, learn about your program, and apply to your waitlist — all from one link.
        </p>
        <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
          <strong>Your gallery:</strong> <a href="${galleryUrl}" style="color:#2563eb">${galleryUrl}</a>
        </p>
        <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
          Share this link on your social media, breeder directories, or anywhere potential buyers find you. Every visitor can see your dogs, litters, and apply directly.
        </p>
        ${cta("View Your Gallery", galleryUrl)}
        <p style="color:#71717a;font-size:13px;margin:16px 0 0">
          Over the next week, we'll show you how to get the most out of PawPage — from managing your waitlist to collecting deposits.
        </p>`,
        breederId,
      );
    },
  },

  // Step 1 — Day 2: Social proof + demo examples
  {
    subject: "How breeders use PawPage to manage waitlists",
    html: ({ breederId }) =>
      layout(
        "Stop juggling spreadsheets and DMs",
        `<p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
          Most breeders manage their waitlists across spreadsheets, Facebook messages, and email threads. Applications get lost, buyers get frustrated, and you spend hours on admin instead of your dogs.
        </p>
        <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
          PawPage puts everything in one place:
        </p>
        <ul style="color:#3f3f46;line-height:1.8;margin:0 0 16px;padding-left:20px">
          <li><strong>Public gallery</strong> — buyers see your dogs, litters, and photos before reaching out</li>
          <li><strong>Application form</strong> — structured questions so you get the info you need upfront</li>
          <li><strong>Waitlist tracking</strong> — positions, status, and notes for every applicant</li>
        </ul>
        <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
          Check out the <a href="${BASE_URL}/demo" style="color:#2563eb">demo gallery</a> to see what buyers experience when they visit your page.
        </p>
        ${cta("Go to Your Dashboard", `${BASE_URL}/dashboard`)}`,
        breederId,
      ),
  },

  // Step 2 — Day 4: Share your gallery + collect applications
  {
    subject: "Share your gallery link — start collecting applications",
    html: ({ breederId, kennelName }) => {
      const galleryUrl = `${BASE_URL}/${kennelSlug(kennelName)}`;
      return layout(
        "Your buyers are looking for you",
        `<p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
          Puppy buyers spend weeks searching for reputable breeders. A professional gallery page makes you stand out — and PawPage's built-in application form means buyers can apply right from your page.
        </p>
        <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
          <strong>Where to share your gallery link:</strong>
        </p>
        <ul style="color:#3f3f46;line-height:1.8;margin:0 0 16px;padding-left:20px">
          <li>Your Instagram or Facebook bio</li>
          <li>Breeder directories (AKC Marketplace, GoodDog, etc.)</li>
          <li>Your existing website or blog</li>
          <li>Email signature for buyer inquiries</li>
        </ul>
        <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
          Every application comes straight to your dashboard — no more lost DMs.
        </p>
        ${cta("Copy Your Gallery Link", galleryUrl)}`,
        breederId,
      );
    },
  },

  // Step 3 — Day 7: Pro upgrade — deposits + unlimited litters
  {
    subject: "Collect deposits and manage unlimited litters",
    html: ({ email, breederId }) =>
      layout(
        "Upgrade to Pro — get paid through PawPage",
        `<p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
          You've set up your gallery and started building your waitlist. The next step? <strong>Collect deposits directly through PawPage.</strong>
        </p>
        <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
          With Pro, you get:
        </p>
        <ul style="color:#3f3f46;line-height:1.8;margin:0 0 16px;padding-left:20px">
          <li><strong>Deposit collection</strong> — buyers pay through your page, you get paid via Stripe</li>
          <li><strong>Unlimited litters</strong> — manage your entire program, not just one litter</li>
          <li><strong>Priority support</strong> — 48-hour email response</li>
        </ul>
        <p style="color:#3f3f46;line-height:1.6;margin:0 0 16px">
          At <strong>$29/month</strong>, one deposit collected through PawPage pays for months of service. No more chasing checks or Venmo payments.
        </p>
        ${cta("Upgrade to Pro — $29/mo", buildCheckoutUrl("pro", email))}
        <p style="color:#71717a;font-size:13px;margin:16px 0 0">
          Or start with Basic ($15/mo) for up to 3 active litters. Cancel anytime.
        </p>`,
        breederId,
      ),
  },
];
