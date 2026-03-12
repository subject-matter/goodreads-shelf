import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "My Bookshelf";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          fontSize: 300,
        }}
      >
        📖
      </div>
    ),
    { ...size }
  );
}
