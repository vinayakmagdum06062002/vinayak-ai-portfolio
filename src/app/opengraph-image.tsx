import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — AI/ML Engineer · GenAI, Agentic AI, RAG, AI Systems`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const stages = ["Input", "Validate", "Retrieve", "Structured output", "Guardrails", "Retry", "Evaluate"];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#08090b",
          backgroundImage:
            "radial-gradient(circle at 85% 10%, rgba(110,214,184,0.14), transparent 45%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 60px 60px, 60px 60px",
          color: "#eceef1",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#a3a7b0", letterSpacing: 3 }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#6ed6b8" }} />
          AI SYSTEMS ENGINEER · PYTHON · FASTAPI · LLMs · RAG
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ fontSize: 38, color: "#eceef1" }}>AI/ML Engineer</div>
          <div style={{ fontSize: 28, color: "#6ed6b8" }}>GenAI • Agentic AI • RAG • AI Systems</div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {stages.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  display: "flex",
                  padding: "8px 16px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.16)",
                  fontSize: 20,
                  color: "#a3a7b0",
                }}
              >
                {s}
              </div>
              {i < stages.length - 1 ? <div style={{ color: "#6c717b", fontSize: 20 }}>→</div> : null}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
