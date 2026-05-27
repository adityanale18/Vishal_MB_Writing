import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../common folder/Footer";
import "../styles.css";

const ratings = [1, 2, 3, 4, 5];

function Feedback() {
  const [form, setForm] = useState({ name: "", email: "", service: "", rating: 0, message: "" });
  const [hover, setHover] = useState(0);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.rating === 0) { setError("Please select a star rating."); return; }
    setError("");
    setSent(true);
  };

  return (
    <div>
      <Navbar />

      {/* Page Header */}
      <div style={{
        background: "radial-gradient(ellipse at center, rgba(245,197,24,0.07) 0%, transparent 70%), linear-gradient(160deg, #0a0a0a, #0f0f1a)",
        padding: "80px 24px", textAlign: "center"
      }}>
        <div className="section-badge">Share Your Experience</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "48px", fontWeight: "800", color: "#fff", margin: "16px 0 14px" }}>
          Your Feedback Matters
        </h1>
        <p style={{ color: "#888", fontSize: "17px", maxWidth: "500px", margin: "0 auto", lineHeight: "1.8" }}>
          Help us improve by sharing your honest experience. It only takes 2 minutes.
        </p>
      </div>

      {/* Form */}
      <div style={{ background: "#0a0a0a", padding: "80px 24px", display: "flex", justifyContent: "center" }}>
        <div style={{
          background: "#16161f", border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "20px", padding: "52px 44px", width: "100%", maxWidth: "560px",
          boxShadow: "0 40px 80px rgba(0,0,0,0.5)"
        }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ fontSize: "64px", marginBottom: "20px" }}>🎉</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: "#fff", marginBottom: "12px" }}>
                Thank You, {form.name}!
              </h2>
              <p style={{ color: "#888", lineHeight: "1.8", marginBottom: "32px" }}>
                Your feedback has been received. We truly appreciate you taking the time to share your experience with us.
              </p>
              <button onClick={() => { setSent(false); setForm({ name: "", email: "", service: "", rating: 0, message: "" }); }}
                className="auth-btn" style={{ maxWidth: "220px", margin: "0 auto", display: "block" }}>
                Submit Another
              </button>
            </div>
          ) : (
            <>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", color: "#fff", marginBottom: "6px" }}>Leave a Review</h2>
              <p style={{ color: "#666", fontSize: "14px", marginBottom: "32px" }}>We'd love to hear what you think.</p>

              {error && <div className="auth-error">{error}</div>}

              <form onSubmit={handleSubmit}>
                {/* Name & Email */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label className="auth-label">Full Name</label>
                    <input className="auth-input" placeholder="John Doe" required
                      value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="auth-label">Email</label>
                    <input className="auth-input" type="email" placeholder="you@example.com" required
                      value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>

                {/* Service */}
                <label className="auth-label">Service Used</label>
                <select className="auth-input" required value={form.service}
                  onChange={e => setForm({ ...form, service: e.target.value })}
                  style={{ cursor: "pointer" }}>
                  <option value="">Select a service...</option>
                  <option>MB Writing Service</option>
                  <option>Assignment Writing</option>
                  <option>PDF Notes Available</option>
                  <option>Neat Handwriting</option>
                  <option>Fast Delivery</option>
                  <option>Engineering/Civil Notes</option>
                  <option>100% Custom Work</option>
                </select>

                {/* Star Rating */}
                <label className="auth-label">Your Rating</label>
                <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                  {ratings.map(star => (
                    <span key={star}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setForm({ ...form, rating: star })}
                      style={{
                        fontSize: "36px", cursor: "pointer",
                        color: star <= (hover || form.rating) ? "#F5C518" : "#333",
                        transition: "color 0.15s, transform 0.15s",
                        transform: star <= (hover || form.rating) ? "scale(1.2)" : "scale(1)",
                        display: "inline-block"
                      }}>★</span>
                  ))}
                  {form.rating > 0 && (
                    <span style={{ color: "#888", fontSize: "13px", alignSelf: "center", marginLeft: "8px" }}>
                      {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][form.rating]}
                    </span>
                  )}
                </div>

                {/* Message */}
                <label className="auth-label">Your Feedback</label>
                <textarea className="auth-input" placeholder="Tell us about your experience in detail..." required
                  value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  style={{ height: "130px", resize: "vertical" }} />

                <button type="submit" className="auth-btn">Submit Feedback →</button>
              </form>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Feedback;
