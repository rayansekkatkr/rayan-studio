import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// Share card in the Direction A world (DESIGN.md): night ground, one indigo glow, heavy type.
// twitter-image.tsx re-exports this file so both cards stay identical.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090c",
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(89,87,217,0.38), transparent 46%), radial-gradient(circle at 88% 92%, rgba(138,136,242,0.16), transparent 42%)",
          color: "#f7f7f4",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: 30, fontWeight: 800, letterSpacing: -0.5 }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#3ddc84" }} />
          Rayan Studio
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div style={{ fontSize: 80, lineHeight: 1, fontWeight: 800, letterSpacing: -3, display: "flex", flexDirection: "column" }}>
            <span>Sites web, applications</span>
            <span>et SaaS sur mesure.</span>
          </div>
          <div style={{ fontSize: 30, color: "#a2a2aa" }}>
            Création et refonte de sites · Applications et SaaS · Un seul interlocuteur
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
