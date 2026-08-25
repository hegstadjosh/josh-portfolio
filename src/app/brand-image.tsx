import { ImageResponse } from "next/og";

const BACKGROUND = "#000000";
const ACCENT = "#6CACE4";

export function createSquareIcon(size: number) {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: BACKGROUND,
          color: ACCENT,
          display: "flex",
          fontSize: size * 0.38,
          fontWeight: 800,
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        JH
      </div>
    ),
    { height: size, width: size },
  );
}
