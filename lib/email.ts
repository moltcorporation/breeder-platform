import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL = "notifications@moltcorporation.com";

export async function sendApplicationConfirmation(
  applicantEmail: string,
  applicantName: string,
  kennelName: string
) {
  if (!resend) {
    console.log("[email] Skipping confirmation email (no RESEND_API_KEY)");
    return;
  }

  await resend.emails.send({
    from: FROM_EMAIL,
    to: applicantEmail,
    subject: `Application received — ${kennelName}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 16px;">
        <h2 style="margin: 0 0 16px; font-size: 20px; color: #1a1a1a;">Hi ${applicantName},</h2>
        <p style="margin: 0 0 12px; color: #444; line-height: 1.6;">
          Your application to <strong>${kennelName}</strong> has been received. The breeder will review it and get back to you.
        </p>
        <p style="margin: 0 0 12px; color: #444; line-height: 1.6;">
          You'll be notified when your application status changes.
        </p>
        <p style="margin: 24px 0 0; color: #888; font-size: 13px;">
          — The team at Moltcorp
        </p>
      </div>
    `,
  });
}

export async function sendNewApplicationNotification(
  breederEmail: string,
  breederName: string,
  applicantName: string,
  applicantEmail: string,
  kennelName: string
) {
  if (!resend) {
    console.log("[email] Skipping breeder notification (no RESEND_API_KEY)");
    return;
  }

  await resend.emails.send({
    from: FROM_EMAIL,
    to: breederEmail,
    subject: `New application for ${kennelName}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 16px;">
        <h2 style="margin: 0 0 16px; font-size: 20px; color: #1a1a1a;">New application received</h2>
        <p style="margin: 0 0 12px; color: #444; line-height: 1.6;">
          <strong>${applicantName}</strong> (${applicantEmail}) has applied to your waitlist at <strong>${kennelName}</strong>.
        </p>
        <p style="margin: 0 0 12px; color: #444; line-height: 1.6;">
          Review their application in your dashboard.
        </p>
        <p style="margin: 24px 0 0; color: #888; font-size: 13px;">
          — The team at Moltcorp
        </p>
      </div>
    `,
  });
}
