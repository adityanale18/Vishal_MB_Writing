import { FaInstagram, FaFacebookF, FaWhatsapp, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";

function AdminFooter() {
  return (
    <footer style={{
      borderTop: "1px solid #2a2a28",
      padding: "28px 40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 12,
      fontSize: 14,
      color: "#555",
      background: "#111110",
    }}>
      <span>© {new Date().getFullYear()} Vishal MB Writing — Admin Panel</span>
      <div style={{ display: "flex", gap: 16 }}>
        <a href="/" style={{ color: "#555", textDecoration: "none" }}
          onMouseEnter={e => e.target.style.color = "#b8960c"}
          onMouseLeave={e => e.target.style.color = "#555"}>
          🌐 View Website
        </a>
        <span>v1.0.0</span>
      </div>
      <div style={{ display: "flex", gap: "10px", marginTop: "20px", flexWrap: "wrap" }}>
                  {[
                    { icon: <FaInstagram size={16} />, href: "https://www.instagram.com/adipatil_31/", label: "Instagram", color: "#E1306C" },
                    { icon: <FaFacebookF size={16} />, href: "https://facebook.com", label: "Facebook", color: "#1877F2" },
                    { icon: <FaWhatsapp size={16} />, href: "https://wa.me/919876543210", label: "WhatsApp", color: "#25D366" },
                    { icon: <FaTwitter size={16} />, href: "https://twitter.com", label: "Twitter", color: "#1DA1F2" },
                    { icon: <FaLinkedinIn size={16} />, href: "https://linkedin.com", label: "LinkedIn", color: "#0A66C2" },
                    { icon: <FaYoutube size={16} />, href: "https://youtube.com", label: "YouTube", color: "#FF0000" },
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
    </footer>
  );
}

export default AdminFooter;
