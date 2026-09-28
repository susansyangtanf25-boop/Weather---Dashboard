import { NavLink } from "react-router-dom";

function Navbar({ unit, onToggleUnit }) {
  return (
    <header className="navbar">
      <h1 className="logo">🌍 Weather Dashboard</h1>
      <nav className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/history">History</NavLink>
        <button className="unit-toggle" onClick={onToggleUnit}>
          °{unit}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
