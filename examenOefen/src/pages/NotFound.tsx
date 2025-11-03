import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section>
      <h1>404 — Pagina niet gevonden</h1>
      <p>De gevraagde route bestaat niet.</p>
      <p><Link to="/">Ga terug naar Home</Link></p>
    </section>
  );
}
