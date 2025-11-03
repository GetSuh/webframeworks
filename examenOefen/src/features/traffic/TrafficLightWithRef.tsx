import { useEffect, useMemo, useState } from "react";

/** ---------- Light component ---------- */
type LightColor = "red" | "orange" | "green";

function Light({ color, on }: { color: LightColor; on: boolean }) {
  const bg = on ? color : "#000";
  return (
    <div
      aria-label={`${color} ${on ? "on" : "off"}`}
      style={{
        width: 100,
        height: 100,
        borderRadius: 100,
        background: bg,
        border: "2px solid #222",
        boxShadow: on ? "0 0 18px rgba(0,0,0,.25)" : "none",
        transition: "background .15s ease-in-out",
      }}
    />
  );
}

/** ---------- Helpers ---------- */
function nextColor(c: LightColor): LightColor {
  // rood -> groen -> oranje -> rood -> ...
  if (c === "red") return "green";
  if (c === "green") return "orange";
  return "red";
}

type Speed = 1 | 2 | 4; // 1x, 2x, 4x

export default function Opdracht3Practice() {
  const [current, setCurrent] = useState<LightColor>("red");
  const [speed, setSpeed] = useState<Speed>(1);

  // Basisduur per "vol" licht (rood/groen) aan 1x = 6000 ms
  // 2x -> 3000 ms, 4x -> 1500 ms
  const baseMs = useMemo(() => 6000 / speed, [speed]);

  useEffect(() => {
    // Oranje = 1/3de van de tijd van rood/groen
    const duration = current === "orange" ? baseMs / 3 : baseMs;

    const id = setTimeout(() => {
      setCurrent((c) => nextColor(c));
    }, duration);

    return () => clearTimeout(id);
  }, [current, baseMs]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        fontFamily: "system-ui",
        padding: "2rem",
      }}
    >
      <div style={{ display: "grid", gap: "1rem", width: 320 }}>
        <h2 style={{ margin: 0 }}>Verkeerslicht (oefencomponent)</h2>

        {/* Controls */}
        <label style={{ display: "grid", gap: ".35rem", maxWidth: 220 }}>
          <span style={{ fontWeight: 600 }}>Snelheid</span>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value) as Speed)}
            style={{
              padding: ".5rem .7rem",
              border: "1px solid #ccc",
              borderRadius: 8,
              background: "white",
            }}
          >
            <option value={1}>1× (rood/groen 6s, oranje 2s)</option>
            <option value={2}>2× (rood/groen 3s, oranje 1s)</option>
            <option value={4}>4× (rood/groen 1.5s, oranje 0.5s)</option>
          </select>
        </label>

        {/* Housing */}
        <div
          role="group"
          aria-label="Traffic light"
          style={{
            background: "#1a1a1a",
            borderRadius: 16,
            padding: 16,
            width: 140,
            display: "grid",
            gap: 12,
            border: "2px solid #0e0e0e",
            boxShadow: "0 6px 20px rgba(0,0,0,.35) inset",
          }}
        >
          <Light color="red" on={current === "red"} />
          <Light color="orange" on={current === "orange"} />
          <Light color="green" on={current === "green"} />
        </div>

        <p style={{ margin: 0, opacity: 0.8 }}>
          Huidig: <strong style={{ textTransform: "capitalize" }}>{current}</strong> •
          Interval:{" "}
          <code>
            {current === "orange" ? baseMs / 3 : baseMs} ms
          </code>
        </p>

        {/* (Optioneel) Bedieningsknoppen voor testen */}
        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
          <button
            onClick={() => setCurrent("red")}
            style={btn}
            aria-label="Forceer rood"
          >
            Rood
          </button>
          <button
            onClick={() => setCurrent("green")}
            style={btn}
            aria-label="Forceer groen"
          >
            Groen
          </button>
          <button
            onClick={() => setCurrent("orange")}
            style={btn}
            aria-label="Forceer oranje"
          >
            Oranje
          </button>
        </div>
      </div>
    </div>
  );
}

const btn: React.CSSProperties = {
  padding: ".5rem .8rem",
  borderRadius: 8,
  border: "1px solid #ddd",
  background: "#f6f6f6",
  cursor: "pointer",
};
