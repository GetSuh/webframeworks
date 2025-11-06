import { useEffect, useState } from "react";
import type { SteamGame } from "../../types";

const DATA_URL =
  "https://raw.githubusercontent.com/similonap/json/refs/heads/master/steam.json";

type Platform = "windows" | "mac" | "linux" | "all";

export default function Opdracht2Practice() {
  const [games, setGames] = useState<SteamGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [nameQuery, setNameQuery] = useState("");
  const [platform, setPlatform] = useState<Platform>("all");

  // ✅ Simpel fetchen zonder AbortController
  useEffect(() => {
    async function fetchGames() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(DATA_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data: SteamGame[] = await res.json();
        setGames(data);
      } catch (err: any) {
        setError(err.message ?? "Er ging iets mis bij het laden.");
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []); // wordt 1 keer uitgevoerd bij mount

  // Filtering
  const q = nameQuery.trim().toLowerCase();

  const filtered = games
    .filter((g) => (q ? g.name.toLowerCase().includes(q) : true))
    .filter((g) => {
      if (platform === "all") return true;
      if (platform === "windows") return g.platforms.windows;
      if (platform === "mac") return g.platforms.mac;
      return g.platforms.linux;
    });

  // Loading & error states
  if (loading) return <p style={styles.loading}>Laden...</p>;
  if (error) return <p style={styles.error}>Fout: {error}</p>;

  return (
    <div style={styles.wrap}>
      <h2>Steam Games (oefencomponent)</h2>

      {/* Filters */}
      <div style={styles.filters}>
        <label style={styles.filterBlock}>
          <span style={styles.label}>Zoek op naam:</span>
          <input
            type="text"
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
            placeholder="bv. Portal"
            style={styles.input}
          />
        </label>

        <fieldset style={styles.filterBlock}>
          <legend style={styles.label}>Platform:</legend>

          <label style={styles.radio}>
            <input
              type="radio"
              name="platform"
              value="all"
              checked={platform === "all"}
              onChange={() => setPlatform("all")}
            />
            <span>Alle</span>
          </label>

          <label style={styles.radio}>
            <input
              type="radio"
              name="platform"
              value="windows"
              checked={platform === "windows"}
              onChange={() => setPlatform("windows")}
            />
            <span>Windows</span>
          </label>

          <label style={styles.radio}>
            <input
              type="radio"
              name="platform"
              value="mac"
              checked={platform === "mac"}
              onChange={() => setPlatform("mac")}
            />
            <span>Mac</span>
          </label>

          <label style={styles.radio}>
            <input
              type="radio"
              name="platform"
              value="linux"
              checked={platform === "linux"}
              onChange={() => setPlatform("linux")}
            />
            <span>Linux</span>
          </label>
        </fieldset>
      </div>

      <p style={{ marginTop: "0.5rem" }}>
        Resultaten: <strong>{filtered.length}</strong>
      </p>

      {/* Game lijst */}
      <ul style={styles.grid}>
        {filtered.map((g) => (
          <li key={g.name} style={styles.card}>
            <img src={g.image} alt={g.name} style={styles.img} loading="lazy" />
            <div style={styles.cardBody}>
              <h3 style={{ margin: 0 }}>{g.name}</h3>
              <p style={styles.meta}>
                {g.developer} • {g.releaseYear} • {g.minimumAge}+
              </p>
              <p style={styles.desc}>{g.description}</p>
              <div style={styles.tags}>
                {g.platforms.windows && <span style={styles.tag}>Windows</span>}
                {g.platforms.mac && <span style={styles.tag}>Mac</span>}
                {g.platforms.linux && <span style={styles.tag}>Linux</span>}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- STYLING ---------- */
const styles: Record<string, React.CSSProperties> = {
  wrap: {
    maxWidth: 1000,
    margin: "2rem auto",
    fontFamily: "system-ui",
    padding: "0 1rem",
  },
  filters: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    alignItems: "flex-end",
  },
  filterBlock: { display: "grid", gap: ".4rem", border: "none" },
  label: { fontWeight: 600 },
  radio: { display: "inline-flex", alignItems: "center", gap: ".4rem" },
  input: {
    padding: ".5rem .7rem",
    border: "1px solid #ccc",
    borderRadius: 8,
    minWidth: 220,
  },
  loading: { textAlign: "center", padding: "2rem" },
  error: {
    padding: "1rem",
    color: "#b00020",
    background: "#fde7eb",
    borderRadius: 8,
  },
  grid: {
    listStyle: "none",
    padding: 0,
    marginTop: "1rem",
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  },
  card: {
    border: "1px solid #e5e5e5",
    borderRadius: 12,
    overflow: "hidden",
    background: "white",
    display: "flex",
    flexDirection: "column",
  },
  img: {
    width: "100%",
    height: 180,
    objectFit: "cover",
    background: "#f3f3f3",
  },
  cardBody: { padding: ".8rem", display: "grid", gap: ".5rem" },
  meta: { margin: 0, fontSize: ".9rem", opacity: 0.8 },
  desc: {
    margin: 0,
    fontSize: ".95rem",
    lineHeight: 1.35,
    maxHeight: "4.5em",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  tags: { display: "flex", gap: ".4rem", flexWrap: "wrap" },
  tag: {
    border: "1px solid #ddd",
    borderRadius: 999,
    padding: ".2rem .6rem",
    fontSize: ".8rem",
  },
};
