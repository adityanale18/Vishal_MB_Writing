import { useState } from "react";
import axios from "axios";
import "../styles.css";

function Contact() {
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await axios.post("http://localhost:8080/api/contact", data); } catch {}
    setSent(true);
    setData({ name: "", email: "", message: "" });
  };

  return (
    <div id="contact" className="contact">
      <div className="contact-inner">
        <div className="section-badge">Get In Touch</div>
        <h2>Let's Work Together</h2>
        <p className="sub">Have a project in mind? Tell me about it and I'll get back to you within 24 hours.</p>
        {sent ? (
          <div style={{ color: "#4ade80", fontSize: "18px", fontWeight: "700", padding: "40px", background: "rgba(74,222,128,0.08)", borderRadius: "12px", border: "1px solid rgba(74,222,128,0.2)" }}>
            ✅ Message sent! I'll get back to you within 24 hours.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="contact-label" style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#888", marginBottom: "8px", letterSpacing: "0.5px", textTransform: "uppercase" }}>Your Name</label>
            <input placeholder="John Doe" value={data.name} required onChange={e => setData({ ...data, name: e.target.value })} />
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#888", marginBottom: "8px", letterSpacing: "0.5px", textTransform: "uppercase" }}>Email Address</label>
            <input placeholder="you@example.com" type="email" value={data.email} required onChange={e => setData({ ...data, email: e.target.value })} />
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#888", marginBottom: "8px", letterSpacing: "0.5px", textTransform: "uppercase" }}>Your Message</label>
            <textarea placeholder="Tell me about your project..." value={data.message} required onChange={e => setData({ ...data, message: e.target.value })} />
            <button type="submit">Send Message →</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;
