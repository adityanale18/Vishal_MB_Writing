import { useNavigate, useLocation } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaWhatsapp, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import "../styles.css";

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Home", action: () => navigate("/") },
    { label: "About", action: () => scrollTo("about") },
    { label: "Services", action: () => scrollTo("services") },
    { label: "Contact", action: () => scrollTo("contact") },
  ];

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">
            <img src="/Logo1.jpg" alt="Vishal MB Writing Logo" style={{ width: "36px", height: "36px", borderRadius: "4px", objectFit: "cover", border: "1px solid #2a2a28" }} />
            <div>
              <div className="footer-brand-name">Vishal MB</div>
              <div className="footer-brand-sub">Writing</div>
            </div>
          </div>
          <p className="footer-desc">Professional writing and editing services that help your brand communicate with clarity, confidence, and impact.</p>
          {/* Social Media Icons */}
          <div style={{ display: "flex", gap: "10px", marginTop: "20px", flexWrap: "wrap" }}>
            {[
              { icon: <FaInstagram size={16} />, href: "https://www.instagram.com/adipatil_31/", label: "Instagram", color: "#E1306C" },
              { icon: <FaFacebookF size={16} />, href: "https://facebook.com", label: "Facebook", color: "#1877F2" },
              { icon: <FaWhatsapp size={16} />, href: "https://wa.me/919876543210", label: "WhatsApp", color: "#25D366" },
              // { icon: <FaTwitter size={16} />, href: "https://twitter.com", label: "Twitter", color: "#1DA1F2" },
              // // { icon: <FaLinkedinIn size={16} />, href: "https://linkedin.com", label: "LinkedIn", color: "#0A66C2" },
              // { icon: <FaYoutube size={16} />, href: "https://youtube.com", label: "YouTube", color: "#FF0000" },
            ].map(({ icon, href, label, color }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                style={{
                  width: "36px", height: "36px", borderRadius: "4px",
                  background: "#1a1a18", border: "1px solid #2a2a28",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#666", textDecoration: "none", transition: "all 0.2s"
                }}
                onMouseEnter={e => { e.currentTarget.style.background = color; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = color; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#1a1a18"; e.currentTarget.style.color = "#666"; e.currentTarget.style.borderColor = "#2a2a28"; }}
              >{icon}</a>
            ))}
          </div>
        </div>
        <div>
          <h4>Navigation</h4>
          <div className="footer-links">
            {navLinks.map(({ label, action }) => (
              <button key={label} onClick={action} style={{
                background: "none", border: "none", color: "#555", fontSize: "14px",
                textAlign: "left", padding: 0, cursor: "pointer", lineHeight: "1.8",
                transition: "color 0.2s"
              }}
              onMouseEnter={e => e.target.style.color = "#b8960c"}
              onMouseLeave={e => e.target.style.color = "#555"}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h4>Services</h4>
          <div className="footer-links">
            {["MB Writing Service", "Assignment Writing", "PDF Notes Available", "Neat Handwriting", "Fast Delivery", "Engineering/Civil Notes", "100% Custom Work"].map(s => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
        <div>
          <h4>Contact</h4>
          <div className="footer-contact-item">
            <div>📧 vishal@gmail.com</div>
            <div>📞 +91 98765 43210</div>
            <div>📍 India</div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Vishal MB Writing. All rights reserved.</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
