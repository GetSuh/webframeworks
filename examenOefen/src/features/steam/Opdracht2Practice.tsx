import { useEffect, useMemo, useState } from "react";
import type { SteamGame } from "../../types";

const DATA_URL =
  "https://raw.githubusercontent.com/similonap/json/refs/heads/master/steam.json";

type Platform = "windows" | "mac" | "linux";

export default function Opdracht2Practice() {
  const [games, setGames] = useState<SteamGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [nameQuery, setNameQuery] = useState("");
  const [platform, setPlatform] = useState<Platform>("windows"); // start gelijk met één keuze

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(DATA_URL, { signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: SteamGame[] = await res.json();
        setGames(data);
      } catch (e: any) {
        if (e.name !== "AbortError") {
          setError(e.message ?? "Er ging iets mis bij het laden.");
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, []);

  const filtered = useMemo(() => {
    const q = nameQuery.trim().toLowerCase();
    return games
      .filter((g) => (q ? g.name.toLowerCase().includes(q) : true))
      .filter((g) => {
        if (platform === "windows") return g.platforms.windows;
        if (platform === "mac") return g.platforms.mac;
        return g.platforms.linux; // platform === "linux"
      });
  }, [games, nameQuery, platform]);

  if (loading) return <p style={s.loading}>Laden…</p>;
  if (error) return <p style={s.error}>Fout: {error}</p>;

  return (
    <div style={s.wrap}>
      <h2>Steam Games (oefencomponent)</h2>

      {/* Filters */}
      <div style={s.filters}>
        <label style={s.filterBlock}>
          <div style={s.filterLabel}>Zoek op naam</div>
          <input
            type="text"
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
            placeholder="bv. Portal"
            style={s.input}
          />
        </label>

        <fieldset style={s.filterBlock}>
          <legend style={s.filterLabel}>Platform</legend>
          <label style={s.radio}>
            <input
              type="radio"
              name="platform"
              value="windows"
              checked={platform === "windows"}
              onChange={() => setPlatform("windows")}
            />
            <span>Windows</span>
          </label>
          <label style={s.radio}>
            <input
              type="radio"
              name="platform"
              value="mac"
              checked={platform === "mac"}
              onChange={() => setPlatform("mac")}
            />
            <span>Mac</span>
          </label>
          <label style={s.radio}>
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

      {/* Result count */}
      <p style={{ margin: "0.5rem 0 1rem", opacity: 0.8 }}>
        Resultaten: <strong>{filtered.length}</strong>
      </p>

      {/* List */}
      <ul style={s.grid}>
        {filtered.map((g) => (
          <li key={g.name} style={s.card}>
            <img
              src={g.image}
              alt={g.name}
              style={s.img}
              loading="lazy"
              width={320}
              height={180}
            />
            <div style={s.cardBody}>
              <h3 style={{ margin: 0 }}>{g.name}</h3>
              <p style={s.meta}>
                {g.developer} • {g.releaseYear} • {g.minimumAge}+ 
              </p>
              <p style={s.desc}>{g.description}</p>
              <div style={s.tags}>
                {g.platforms.windows && <span style={s.tag}>Windows</span>}
                {g.platforms.mac && <span style={s.tag}>Mac</span>}
                {g.platforms.linux && <span style={s.tag}>Linux</span>}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  wrap: { maxWidth: 1000, margin: "2rem auto", fontFamily: "system-ui", padding: "0 1rem" },
  filters: { display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-end" },
  filterBlock: { display: "grid", gap: ".4rem", padding: 0, border: "none" },
  filterLabel: { fontWeight: 600 },
  radio: { display: "inline-flex", alignItems: "center", gap: ".4rem", marginRight: ".75rem" },
  input: { padding: ".55rem .7rem", border: "1px solid #ccc", borderRadius: 8, minWidth: 220 },
  loading: { padding: "2rem", textAlign: "center" },
  error: { padding: "1rem", color: "#b00020", background: "#fde7eb", borderRadius: 8 },
  grid: { listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" },
  card: { border: "1px solid #e5e5e5", borderRadius: 12, overflow: "hidden", background: "white", display: "flex", flexDirection: "column" },
  img: { width: "100%", height: 180, objectFit: "cover", background: "#f3f3f3" },
  cardBody: { padding: ".8rem", display: "grid", gap: ".5rem" },
  meta: { margin: 0, fontSize: ".9rem", opacity: 0.8 },
  desc: { margin: 0, fontSize: ".95rem", lineHeight: 1.35, maxHeight: "4.5em", overflow: "hidden", textOverflow: "ellipsis" },
  tags: { display: "flex", gap: ".4rem", flexWrap: "wrap" },
  tag: { border: "1px solid #ddd", borderRadius: 999, padding: ".2rem .6rem", fontSize: ".8rem" },
};
