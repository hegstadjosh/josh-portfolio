import { ImageResponse } from "next/og";

export const alt = "Joshua Hegstad, Co-Founder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "88px",
          width: "100%",
        }}
      >
        <div style={{ color: "#6CACE4", fontSize: 28, fontWeight: 700 }}>
          JH
        </div>
        <div style={{ fontSize: 76, fontWeight: 800, marginTop: 44 }}>
          Joshua Hegstad
        </div>
        <div style={{ color: "#d1d5db", fontSize: 36, marginTop: 22 }}>
          Co-Founder. Building an AI history company.
        </div>
      </div>
    ),
    size,
  );
}
