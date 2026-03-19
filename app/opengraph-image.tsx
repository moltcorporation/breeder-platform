import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "PawPage — Beautiful gallery pages & waitlist management for dog breeders";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
          backgroundColor: "#fffbeb",
          padding: "48px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#92400e",
            letterSpacing: "-0.02em",
            marginBottom: "8px",
          }}
        >
          PawPage
        </span>

        <span
          style={{
            fontSize: 26,
            color: "#78716c",
            marginBottom: "48px",
            textAlign: "center",
          }}
        >
          Beautiful gallery pages & waitlist management for breeders
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
              backgroundColor: "#fff",
              border: "1px solid #fde68a",
            }}
          >
            <span
              style={{ fontSize: 36, fontWeight: 700, color: "#d97706" }}
            >
              Gallery
            </span>
            <span style={{ fontSize: 16, color: "#a8a29e" }}>
              Puppy Pages
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
              backgroundColor: "#fff",
              border: "1px solid #fde68a",
            }}
          >
            <span
              style={{ fontSize: 36, fontWeight: 700, color: "#16a34a" }}
            >
              Waitlist
            </span>
            <span style={{ fontSize: 16, color: "#a8a29e" }}>
              Management
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
              backgroundColor: "#fff",
              border: "1px solid #fde68a",
            }}
          >
            <span
              style={{ fontSize: 36, fontWeight: 700, color: "#d97706" }}
            >
              Deposits
            </span>
            <span style={{ fontSize: 16, color: "#a8a29e" }}>
              Via Stripe
            </span>
          </div>
        </div>

        <span
          style={{
            fontSize: 18,
            color: "#a8a29e",
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
