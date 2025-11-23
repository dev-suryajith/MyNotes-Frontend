import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaStickyNote } from "react-icons/fa";

const Header = () => {

  const navigate = useNavigate();

  // Check if user exists in localStorage
  const user = localStorage.getItem("NoteUser");
  const isLoggedIn = !!user;

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("NoteUser"); // remove stored user
    navigate("/login");                  // redirect
  };

  return (
    <header className="border-bottom py-3" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">

          {/* Logo */}
          <Link
            to="/"
            className="d-flex align-items-center text-decoration-none"
            style={{ fontFamily: "Georgia, serif" }}
          >
            <FaStickyNote className="text-primary me-2" size={28} />
            <span
              className="h4 mb-0 fw-bold"
              style={{
                color: "#2c3e50",
                background: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              MyNotes
            </span>
          </Link>

          {/* Navigation */}
          <nav className="d-flex gap-4 align-items-center">

            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-decoration-none px-3 py-2 rounded-pill transition-all ${
                  isActive ? "text-white fw-semibold" : "text-muted"
                }`
              }
              style={({ isActive }) => ({
                background: isActive
                  ? "linear-gradient(135deg, #3498db 0%, #2c3e50 100%)"
                  : "transparent",
              })}
            >
              Home
            </NavLink>

            <NavLink
              to="/notes"
              className={({ isActive }) =>
                `text-decoration-none px-3 py-2 rounded-pill transition-all ${
                  isActive ? "text-white fw-semibold" : "text-muted"
                }`
              }
              style={({ isActive }) => ({
                background: isActive
                  ? "linear-gradient(135deg, #3498db 0%, #2c3e50 100%)"
                  : "transparent",
              })}
            >
              Notes
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-decoration-none px-3 py-2 rounded-pill transition-all ${
                  isActive ? "text-white fw-semibold" : "text-muted"
                }`
              }
              style={({ isActive }) => ({
                background: isActive
                  ? "linear-gradient(135deg, #3498db 0%, #2c3e50 100%)"
                  : "transparent",
              })}
            >
              About
            </NavLink>

            {/* Login / Logout Button */}
            {!isLoggedIn ? (
              <NavLink
                to="/login"
                className="text-decoration-none px-3 py-2 rounded-pill text-muted"
              >
                Login
              </NavLink>
            ) : (
              <button
                onClick={handleLogout}
                className="btn btn-danger px-3 py-2 rounded-pill"
              >
                Logout
              </button>
            )}

          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
