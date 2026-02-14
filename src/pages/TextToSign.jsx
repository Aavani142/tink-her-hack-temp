import { useState } from "react";
import AvatarStage from "../components/AvatarStage";

export default function TextToSign() {

  const [text, setText] = useState("");

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f4f4f4",
      padding: "60px 20px",
      fontFamily: "sans-serif"
    }}>

      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        background: "white",
        padding: "40px",
        borderRadius: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
      }}>

        <h1 style={{
          fontSize: "32px",
          marginBottom: "10px"
        }}>
          Text to Sign Avatar
        </h1>

        <p style={{ marginBottom: "25px", color: "#666" }}>
          Type a word and the avatar performs sign language.
        </p>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type hello..."
          style={{
            width: "100%",
            padding: "14px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            marginBottom: "30px"
          }}
        />

        <AvatarStage text={text} />

      </div>
    </div>
  );
}
