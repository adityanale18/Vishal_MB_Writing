import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const loggedIn = JSON.parse(localStorage.getItem("vmb_loggedIn") || "null");

  const scrollTo = (id) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goHome = () => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const logout = () => {
    localStorage.removeItem("vmb_loggedIn");
    setOpen(false);
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <img src="/Logo1.jpg" alt="Vishal MB Writing Logo" style={{ width: "50px", height: "50px", borderRadius: "4px", objectFit: "cover", border: "1px solid #e0d8cc" }} />
          <div>
            <div className="navbar-logo-name">Vishal MB</div>
            <div className="navbar-logo-sub">Writing</div>
          </div>
        </Link>
        <div className="navbar-links">
          <button onClick={goHome} className="nav-btn">Home</button>
          <button onClick={() => scrollTo("about")} className="nav-btn">About</button>
          <button onClick={() => scrollTo("services")} className="nav-btn">Services</button>
          <button onClick={() => scrollTo("contact")} className="nav-btn">Contact</button>
          <Link to="/feedback" style={{ color: "#6d4c9e", border: "1px solid #d8c8f0", padding: "6px 16px", borderRadius: "4px", fontSize: "13px", fontWeight: "500", letterSpacing: "0.5px" }}>Feedback</Link>
          {loggedIn ? (
            <>
              <span style={{ color: "#3a3a38", fontSize: "13px", fontWeight: "500", padding: "6px 4px" }}>👤 {loggedIn.name}</span>
              <button onClick={logout} style={{ color: "#ffffff", background: "#c0392b", padding: "6px 16px", borderRadius: "4px", fontWeight: "500", fontSize: "13px", letterSpacing: "0.5px", border: "none", cursor: "pointer" }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: "#3a3a38", border: "1px solid #e0d8cc", padding: "6px 16px", borderRadius: "4px", fontSize: "13px", fontWeight: "500", letterSpacing: "0.5px" }}>Login</Link>
              <Link to="/register" style={{ color: "#ffffff", background: "#1a1a18", padding: "6px 16px", borderRadius: "4px", fontWeight: "500", fontSize: "13px", letterSpacing: "0.5px" }}>Register</Link>
            </>
          )}
        </div>
        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <button onClick={goHome} style={mobileBtnStyle}>Home</button>
        <button onClick={() => scrollTo("about")} style={mobileBtnStyle}>About</button>
        <button onClick={() => scrollTo("services")} style={mobileBtnStyle}>Services</button>
        <button onClick={() => scrollTo("contact")} style={mobileBtnStyle}>Contact</button>
        <Link to="/feedback" onClick={() => setOpen(false)}>⭐ Feedback</Link>
        {loggedIn ? (
          <>
            <span style={{ color: "#3a3a38", fontSize: "15px", padding: "12px 0", borderBottom: "1px solid #e0d8cc", display: "block" }}>👤 {loggedIn.name}</span>
            <button onClick={logout} style={{ ...mobileBtnStyle, color: "#c0392b" }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
            <Link to="/register" onClick={() => setOpen(false)}>Register</Link>
          </>
        )}
      </div>
    </>
  );
}

const navBtnStyle = {
  background: "none", border: "none", color: "#3a3a38",
  fontSize: "13px", cursor: "pointer", padding: "7px 14px",
  fontFamily: "'Inter', sans-serif", fontWeight: "500", letterSpacing: "0.5px"
};
const mobileBtnStyle = {
  background: "none", border: "none", color: "#3a3a38", textAlign: "left",
  fontSize: "15px", cursor: "pointer", padding: "12px 0",
  borderBottom: "1px solid #e0d8cc", width: "100%",
  fontFamily: "'Inter', sans-serif"
};

export default Navbar;
