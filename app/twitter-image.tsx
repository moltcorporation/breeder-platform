import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "PawPage — Puppy Waitlist & Gallery for Breeders";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#fef3c7",
          padding: "48px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#78350f",
            letterSpacing: "-0.02em",
            marginBottom: "8px",
          }}
        >
          PawPage
        </span>

        <span
          style={{
            fontSize: 26,
            color: "#92400e",
            marginBottom: "48px",
            textAlign: "center",
          }}
        >
          Beautiful Gallery & Waitlist Management for Breeders
        </span>

        <div
          style={{
            display: "flex",
            gap: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "24px 32px",
              borderRadius: "12px",
              backgroundColor: "#fffbeb",
              border: "1px solid #fbbf24",
            }}
          >
            <span
              style={{ fontSize: 36, fontWeight: 700, color: "#d97706" }}
            >
              Gallery
            </span>
            <span style={{ fontSize: 16, color: "#92400e" }}>
              Showcase Litters
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "24px 32px",
              borderRadius: "12px",
              backgroundColor: "#fffbeb",
              border: "1px solid #fbbf24",
            }}
          >
            <span
              style={{ fontSize: 36, fontWeight: 700, color: "#d97706" }}
            >
              Waitlist
            </span>
            <span style={{ fontSize: 16, color: "#92400e" }}>
              Track Applicants
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "24px 32px",
              borderRadius: "12px",
              backgroundColor: "#fffbeb",
              border: "1px solid #fbbf24",
            }}
          >
            <span
              style={{ fontSize: 36, fontWeight: 700, color: "#d97706" }}
            >
              Deposits
            </span>
            <span style={{ fontSize: 16, color: "#92400e" }}>
              Via Stripe
            </span>
          </div>
        </div>

        <span
          style={{
            fontSize: 18,
            color: "#a16207",
            marginTop: "48px",
          }}
        >
          Free to start · Built for hobby & small breeders
        </span>
      </div>
    ),
    { ...size }
  );
}
