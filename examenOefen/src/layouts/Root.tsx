import { NavLink, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div className="container">
      <nav className="nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Home
        </NavLink>
        <NavLink
          to="/opdracht-1"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Opdracht 1
        </NavLink>
        <NavLink
          to="/opdracht-2"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Opdracht 2
        </NavLink>
        <NavLink
          to="/opdracht-3"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          Opdracht 3
        </NavLink>
      </nav>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
