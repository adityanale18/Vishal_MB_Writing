import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { services } from "../Services";
import Navbar from "../components/Navbar";
import Footer from "../common folder/Footer";
import "../styles.css";

function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === id);

  const loggedIn = JSON.parse(localStorage.getItem("vmb_loggedIn") || "null");
  const [form, setForm] = useState({ name: loggedIn?.name || "", email: loggedIn?.email || "", phone: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!service) {
    return (
      <div>
        <Navbar />
        <div style={{ textAlign: "center", padding: "100px 24px" }}>
          <h2>Service not found.</h2>
          <button className="btn-primary" style={{ marginTop: 24 }} onClick={() => navigate("/")}>Go Home</button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("http://localhost:8084/api/auth/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, serviceName: service.title }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    setLoading(false);
  };

  return (
    <div>
      <Navbar />

      {/* Hero */}
      <div className="service-detail-hero">
        <button className="service-back-btn" onClick={() => navigate(-1)}>← Back</button>
        <div className="service-detail-icon">{service.icon}</div>
        <div className="section-badge">Our Services</div>
        <h1 className="service-detail-title">{service.title}</h1>
        <p className="service-detail-price">{service.price}</p>
      </div>

      {/* Content + Booking */}
      <div className="service-detail-body">

        {/* Left: Info */}
        <div className="service-detail-info">
          <h2>About This Service</h2>
          <p>{service.details}</p>

          <h3>What's Included</h3>
          <ul className="service-includes">
            {service.includes.map((item, i) => (
              <li key={i}>✓ {item}</li>
            ))}
          </ul>
        </div>

        {/* Right: Booking Form */}
        <div className="service-booking-card">
          <h2>Book This Service</h2>
          <p className="service-booking-sub">Fill in your details and I'll get back to you within 24 hours.</p>

          {!loggedIn ? (
            <div className="booking-login-required">
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔒</div>
              <p>You need to be logged in to book a service.</p>
              <button className="auth-btn" style={{ marginTop: 16 }} onClick={() => navigate("/login")}>
                Login to Book
              </button>
              <p style={{ textAlign: "center", marginTop: 14, fontSize: 13, color: "#7a7a78" }}>
                No account? <a href="/register" style={{ color: "#b8960c", fontWeight: 600, textDecoration: "none" }}>Register here</a>
              </p>
            </div>
          ) : (
            <>
              {status === "success" && (
                <div className="booking-success">🎉 Booking request sent! I'll contact you soon.</div>
              )}
              {status === "error" && (
                <div className="auth-error">Something went wrong. Please try again.</div>
              )}
              <form onSubmit={handleSubmit}>
                <label className="auth-label">Full Name</label>
                <input className="auth-input" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />

                <label className="auth-label">Email</label>
                <input className="auth-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />

                <label className="auth-label">Phone (optional)</label>
                <input className="auth-input" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" />

                <label className="auth-label">Message</label>
                <textarea className="auth-input" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." rows={4} style={{ resize: "vertical" }} />

                <button className="auth-btn" type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Booking Request"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ServiceDetail;
