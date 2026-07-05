import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="navbar-brand">
        AI Interview Coach
      </NavLink>

      <nav className="navbar-links">
        <NavLink to="/" end>
          Login
        </NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/resume-analyzer">Resume</NavLink>
        <NavLink to="/interview/history">History</NavLink>
        <NavLink to="/interview/setup">Interview</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
