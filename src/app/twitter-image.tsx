import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at 15% 20%, rgba(165,200,255,0.85), transparent 36%), radial-gradient(circle at 82% 16%, rgba(255,255,255,0.9), transparent 42%), linear-gradient(180deg, #f4f7fc 0%, #ebf2fb 100%)",
          color: "#0f172a",
          padding: "56px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "40px",
            borderRadius: "30px",
            border: "1px solid rgba(255,255,255,0.9)",
            background: "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(227,240,255,0.7))",
            boxShadow: "0 30px 50px rgba(123,155,206,0.2)",
          }}
        />
        <div style={{ zIndex: 2, display: "flex", flexDirection: "column", gap: "16px", maxWidth: "900px" }}>
          <div style={{ fontSize: 26, letterSpacing: 2, textTransform: "uppercase", color: "#2f6dff", fontWeight: 700 }}>
            Rayan Studio
          </div>
          <div style={{ fontSize: 72, lineHeight: 1.05, fontWeight: 700, display: "flex", flexDirection: "column" }}>
            Création et refonte
            de sites premium
          </div>
          <div style={{ fontSize: 30, color: "#475569" }}>
            Restaurants • Cafés • Hôtels • Boulangeries • Pâtisseries • Bars
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
