import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const ADMIN_EMAIL = "admin@vishal.com";
const ADMIN_PASSWORD = "Vishal@Admin123";

function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.email === ADMIN_EMAIL && form.password === ADMIN_PASSWORD) {
      localStorage.setItem("vmb_admin", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid admin credentials.");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <img src="/Logo1.jpg" alt="Logo" style={{ width: 48, height: 48, borderRadius: 6, objectFit: "cover", border: "1px solid #e0d8cc" }} />
        </div>
        <div className="section-badge" style={{ textAlign: "center", display: "block" }}>Admin Panel</div>
        <h2 className="admin-login-title">Admin Sign In</h2>
        <p className="admin-login-sub">Access restricted to authorized personnel only.</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label className="auth-label">Admin Email</label>
          <input
            className="auth-input"
            type="email"
            placeholder="admin@vishal.com"
            required
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          <label className="auth-label">Password</label>
          <input
            className="auth-input"
            type="password"
            placeholder="Enter admin password"
            required
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          <button type="submit" className="auth-btn">Access Dashboard →</button>
        </form>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#7a7a78" }}>
          Not an admin? <a href="/" style={{ color: "#b8960c", fontWeight: 600, textDecoration: "none" }}>Go to website</a>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
