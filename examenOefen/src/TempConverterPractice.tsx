import { useState } from "react";

function toFahrenheit(c: number): number {
  return (c * 9) / 5 + 32;
}

function toCelsius(f: number): number {
  return ((f - 32) * 5) / 9;
}

export default function TempConverterPractice() {
  const [celsiusInput, setCelsiusInput] = useState<string>("");
  const [fahrenheitInput, setFahrenheitInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleConvertToF = () => {
    setError("");
    if (celsiusInput.trim() === "") {
      setError("Geef eerst een waarde in °C.");
      return;
    }
    const c = Number(celsiusInput.replace(",", ".")); // laat 12,5 ook toe
    if (Number.isNaN(c)) {
      setError("Ongeldige Celsius-waarde.");
      return;
    }
    const f = toFahrenheit(c);
    setFahrenheitInput(String(Math.round(f * 100) / 100)); // 2 cijfers
  };

  const handleConvertToC = () => {
    setError("");
    if (fahrenheitInput.trim() === "") {
      setError("Geef eerst een waarde in °F.");
      return;
    }
    const f = Number(fahrenheitInput.replace(",", "."));
    if (Number.isNaN(f)) {
      setError("Ongeldige Fahrenheit-waarde.");
      return;
    }
    const c = toCelsius(f);
    setCelsiusInput(String(Math.round(c * 100) / 100));
  };

  return (
    <div style={{ maxWidth: 420, margin: "2rem auto", fontFamily: "system-ui" }}>
      <h2>Temperatuurconversie (oefencomponent)</h2>

      <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
        <label style={{ display: "grid", gap: ".25rem" }}>
          <span>Celsius (°C)</span>
          <input
            type="text"
            inputMode="decimal"
            value={celsiusInput}
            onChange={(e) => setCelsiusInput(e.target.value)}
            placeholder="bv. 25"
            style={{ padding: ".5rem", border: "1px solid #ccc", borderRadius: 8 }}
          />
        </label>

        <label style={{ display: "grid", gap: ".25rem" }}>
          <span>Fahrenheit (°F)</span>
          <input
            type="text"
            inputMode="decimal"
            value={fahrenheitInput}
            onChange={(e) => setFahrenheitInput(e.target.value)}
            placeholder="bv. 77"
            style={{ padding: ".5rem", border: "1px solid #ccc", borderRadius: 8 }}
          />
        </label>

        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
          <button onClick={handleConvertToF} style={btnStyle}>
            Naar Fahrenheit
          </button>
          <button onClick={handleConvertToC} style={btnStyle}>
            Naar Celsius
          </button>
          <button
            onClick={() => {
              setCelsiusInput("");
              setFahrenheitInput("");
              setError("");
            }}
            style={{ ...btnStyle, background: "#eee", color: "#333" }}
          >
            Reset
          </button>
        </div>

        {error && (
          <p style={{ color: "#b00020", marginTop: ".25rem" }}>{error}</p>
        )}
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  padding: ".6rem .9rem",
  background: "#1f6feb",
  color: "white",
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
};
