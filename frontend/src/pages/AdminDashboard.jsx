import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import AdminFooter from "../common folder/AdminFooter";
import "../styles.css";

const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "mr", label: "Marathi", native: "मराठी" },
];

const TRANSLATIONS = {
  en: { orders: "Orders", analytics: "Analytics", profile: "Profile", settings: "Settings", viewWebsite: "View Website", logout: "Logout", language: "Language", theme: "Theme", notifications: "Notifications", settingsTitle: "Settings", settingsSub: "Manage your admin preferences.", langLabel: "Select Language", themeLabel: "Theme Mode", notifLabel: "Email Notifications", light: "Light", dark: "Dark", enabled: "Enabled", disabled: "Disabled", save: "Save Settings", saved: "Settings saved!", },
  hi: { orders: "ऑर्डर", analytics: "विश्लेषण", profile: "प्रोफ़ाइल", settings: "सेटिंग्स", viewWebsite: "वेबसाइट देखें", logout: "लॉगआउट", language: "भाषा", theme: "थीम", notifications: "सूचनाएं", settingsTitle: "सेटिंग्स", settingsSub: "अपनी एडमिन प्राथमिकताएं प्रबंधित करें।", langLabel: "भाषा चुनें", themeLabel: "थीम मोड", notifLabel: "ईमेल सूचनाएं", light: "लाइट", dark: "डार्क", enabled: "सक्षम", disabled: "अक्षम", save: "सेटिंग्स सहेजें", saved: "सेटिंग्स सहेजी गई!", },
  mr: { orders: "ऑर्डर", analytics: "विश्लेषण", profile: "प्रोफाइल", settings: "सेटिंग्ज", viewWebsite: "वेबसाइट पहा", logout: "लॉगआउट", language: "भाषा", theme: "थीम", notifications: "सूचना", settingsTitle: "सेटिंग्ज", settingsSub: "तुमच्या अॅडमिन प्राधान्यक्रम व्यवस्थापित करा.", langLabel: "भाषा निवडा", themeLabel: "थीम मोड", notifLabel: "ईमेल सूचना", light: "लाइट", dark: "डार्क", enabled: "सक्षम", disabled: "अक्षम", save: "सेटिंग्ज जतन करा", saved: "सेटिंग्ज जतन केल्या!", },
};

const ADMIN_PROFILE = {
  name: "Vishal MB",
  email: "admin@vishal.com",
  role: "Administrator",
  phone: "+91 98765 43210",
  website: "vishal-writing.com",
  bio: "Professional content writer and editor with 5+ years of experience. Managing all client orders and content projects.",
  joined: "January 2024",
};

const STATUS_COLORS = { "Completed": "#16a34a", "Pending": "#d97706", "In Progress": "#2563eb", "New": "#7c3aed" };

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState(() => localStorage.getItem("vmb_lang") || "en");
  const [theme, setTheme] = useState(() => localStorage.getItem("vmb_theme") || "light");
  const [notifications, setNotifications] = useState(() => localStorage.getItem("vmb_notif") !== "false");
  const [settingsSaved, setSettingsSaved] = useState(false);
  const navigate = useNavigate();
  const t = TRANSLATIONS[language];

  const fetchOrders = () => {
    setLoadingOrders(true);
    fetch("http://localhost:8084/api/admin/bookings")
      .then(r => r.json())
      .then(data => { setOrders(data); setLoadingOrders(false); })
      .catch(() => setLoadingOrders(false));
  };

  useEffect(() => {
    if (!localStorage.getItem("vmb_admin")) navigate("/login");
  }, [navigate]);

  useEffect(() => { fetchOrders(); }, []);

  const logout = () => {
    localStorage.removeItem("vmb_admin");
    navigate("/login");
  };

  const updateStatus = (id, status) => {
    fetch(`http://localhost:8084/api/admin/bookings/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
      .then(r => r.json())
      .then(updated => setOrders(prev => prev.map(o => o.id === updated.id ? updated : o)));
  };

  const saveSettings = () => {
    localStorage.setItem("vmb_lang", language);
    localStorage.setItem("vmb_theme", theme);
    localStorage.setItem("vmb_notif", notifications);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  const statusColor = (s) => {
    if (s === "Completed") return "#16a34a";
    if (s === "In Progress") return "#d97706";
    return "#2563eb";
  };

  // ── Chart Data ──
  const statusCounts = orders.reduce((acc, o) => {
    const s = o.status || "New";
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});
  const pieData = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

  const serviceCounts = orders.reduce((acc, o) => {
    const s = o.serviceName || "Other";
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});
  const barData = Object.entries(serviceCounts).map(([name, count]) => ({ name, count }));

  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-logo">
          <img src="/Logo1.jpg" alt="Logo" style={{ width: 38, height: 38, borderRadius: 4, objectFit: "cover" }} />
          <div>
            <div style={{ color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontWeight: 700, fontSize: 18 }}>Vishal MB</div>
            <div style={{ color: "#888", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Admin Panel</div>
          </div>
        </div>

        <nav className="admin-nav">
          <button className={`admin-nav-item ${activeTab === "orders" ? "active" : ""}`} onClick={() => { setActiveTab("orders"); setSidebarOpen(false); }}>
            <span className="admin-nav-icon">📋</span> {t.orders}
          </button>
          <button className={`admin-nav-item ${activeTab === "analytics" ? "active" : ""}`} onClick={() => { setActiveTab("analytics"); setSidebarOpen(false); }}>
            <span className="admin-nav-icon">📊</span> {t.analytics}
          </button>
          <button className={`admin-nav-item ${activeTab === "profile" ? "active" : ""}`} onClick={() => { setActiveTab("profile"); setSidebarOpen(false); }}>
            <span className="admin-nav-icon">👤</span> {t.profile}
          </button>
          <button className={`admin-nav-item ${activeTab === "settings" ? "active" : ""}`} onClick={() => { setActiveTab("settings"); setSidebarOpen(false); }}>
            <span className="admin-nav-icon">⚙️</span> {t.settings}
          </button>
          <a href="/" className="admin-nav-item" style={{ textDecoration: "none" }}>
            <span className="admin-nav-icon">🌐</span> {t.viewWebsite}
          </a>
        </nav>

        <button className="admin-logout-btn" onClick={logout}>🚪 {t.logout}</button>
      </aside>

      {/* Main */}
      <div className="admin-main">

        {/* Top bar */}
        <header className="admin-topbar">
          <button className="admin-hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <div className="admin-topbar-title">
            {activeTab === "orders" ? `📋 ${t.orders}` : activeTab === "analytics" ? `📊 ${t.analytics}` : activeTab === "profile" ? `👤 ${t.profile}` : `⚙️ ${t.settings}`}
          </div>
          <div className="admin-topbar-user">
            <div className="admin-avatar-sm">V</div>
            <span>{ADMIN_PROFILE.name}</span>
          </div>
        </header>

        <div className="admin-content">

          {/* ── ORDERS TAB ── */}
          {activeTab === "orders" && (
            <div>
              <div className="admin-page-header">
                <div>
                  <h1 className="admin-page-title">Booking Orders</h1>
                  <p className="admin-page-sub">All service booking requests from clients.</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div className="admin-stat-badge">{orders.length} Total</div>
                  <button onClick={fetchOrders} className="admin-refresh-btn">↻ Refresh</button>
                  <a
                    href="http://localhost:8084/api/admin/bookings/export"
                    download="orders.xlsx"
                    className="admin-refresh-btn"
                    style={{ background: "#16a34a", color: "#fff", borderColor: "#16a34a", textDecoration: "none" }}
                  >
                    📥 Download Excel
                  </a>
                </div>
              </div>

              {loadingOrders ? (
                <div className="admin-loading">Loading orders...</div>
              ) : orders.length === 0 ? (
                <div className="admin-empty">
                  <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
                  <p>No booking orders yet.</p>
                </div>
              ) : (
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>#</th><th>Client Name</th><th>Email</th><th>Phone</th>
                        <th>Service</th><th>Message</th><th>Status</th><th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o, i) => (
                        <tr key={o.id}>
                          <td className="admin-td-muted">{i + 1}</td>
                          <td><strong>{o.name}</strong></td>
                          <td className="admin-td-muted">{o.email}</td>
                          <td className="admin-td-muted">{o.phone || "—"}</td>
                          <td><span className="admin-service-tag">{o.serviceName}</span></td>
                          <td className="admin-td-msg">{o.message || "—"}</td>
                          <td>
                            <span className="admin-status-badge" style={{ color: statusColor(o.status || "New"), borderColor: statusColor(o.status || "New") }}>
                              {o.status || "New"}
                            </span>
                          </td>
                          <td>
                            <div className="admin-action-btns">
                              <button className={`admin-action-btn pending ${o.status === "Pending" ? "active-pending" : ""}`} onClick={() => updateStatus(o.id, "Pending")}>⏳ Pending</button>
                              <button className={`admin-action-btn completed ${o.status === "Completed" ? "active-completed" : ""}`} onClick={() => updateStatus(o.id, "Completed")}>✅ Completed</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── ANALYTICS TAB ── */}
          {activeTab === "analytics" && (
            <div>
              <div className="admin-page-header">
                <div>
                  <h1 className="admin-page-title">Analytics</h1>
                  <p className="admin-page-sub">Visual overview of all booking orders.</p>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="analytics-cards">
                <div className="analytics-card" style={{ borderTop: "3px solid #2563eb" }}>
                  <div className="analytics-card-num" style={{ color: "#2563eb" }}>{orders.length}</div>
                  <div className="analytics-card-label">Total Orders</div>
                </div>
                <div className="analytics-card" style={{ borderTop: "3px solid #7c3aed" }}>
                  <div className="analytics-card-num" style={{ color: "#7c3aed" }}>{orders.filter(o => !o.status || o.status === "New").length}</div>
                  <div className="analytics-card-label">New Orders</div>
                </div>
                <div className="analytics-card" style={{ borderTop: "3px solid #d97706" }}>
                  <div className="analytics-card-num" style={{ color: "#d97706" }}>{orders.filter(o => o.status === "Pending").length}</div>
                  <div className="analytics-card-label">Pending</div>
                </div>
                <div className="analytics-card" style={{ borderTop: "3px solid #16a34a" }}>
                  <div className="analytics-card-num" style={{ color: "#16a34a" }}>{orders.filter(o => o.status === "Completed").length}</div>
                  <div className="analytics-card-label">Completed</div>
                </div>
              </div>

              {orders.length === 0 ? (
                <div className="admin-empty">
                  <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
                  <p>No data to display yet.</p>
                </div>
              ) : (
                <div className="analytics-charts">

                  {/* Pie Chart */}
                  <div className="analytics-chart-box">
                    <div className="analytics-chart-title">Orders by Status</div>
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                          {pieData.map((entry, index) => (
                            <Cell key={index} fill={STATUS_COLORS[entry.name] || "#94a3b8"} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Bar Chart */}
                  <div className="analytics-chart-box">
                    <div className="analytics-chart-title">Orders by Service</div>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={barData} margin={{ top: 10, right: 20, left: 0, bottom: 60 }}>
                        <XAxis dataKey="name" angle={-30} textAnchor="end" tick={{ fontSize: 12 }} />
                        <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#b8960c" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                </div>
              )}
            </div>
          )}

          {/* ── PROFILE TAB ── */}
          {activeTab === "profile" && (
            <div>
              <div className="admin-page-header">
                <div>
                  <h1 className="admin-page-title">Admin Profile</h1>
                  <p className="admin-page-sub">Your account information and details.</p>
                </div>
              </div>
              <div className="admin-profile-layout">
                <div className="admin-profile-card">
                  <div className="admin-avatar-lg">V</div>
                  <h2 className="admin-profile-name">{ADMIN_PROFILE.name}</h2>
                  <span className="admin-role-badge">{ADMIN_PROFILE.role}</span>
                  <p className="admin-profile-bio">{ADMIN_PROFILE.bio}</p>
                  <div className="admin-profile-meta">
                    <div className="admin-meta-item"><span>📧</span>{ADMIN_PROFILE.email}</div>
                    <div className="admin-meta-item"><span>📞</span>{ADMIN_PROFILE.phone}</div>
                    <div className="admin-meta-item"><span>🌐</span>{ADMIN_PROFILE.website}</div>
                    <div className="admin-meta-item"><span>📅</span>Joined {ADMIN_PROFILE.joined}</div>
                  </div>
                </div>
                <div className="admin-profile-stats">
                  <div className="admin-stat-card">
                    <div className="admin-stat-num">{orders.length}</div>
                    <div className="admin-stat-label">Total Orders</div>
                  </div>
                  <div className="admin-stat-card">
                    <div className="admin-stat-num" style={{ color: "#16a34a" }}>{orders.filter(o => o.status === "Completed").length}</div>
                    <div className="admin-stat-label">Completed</div>
                  </div>
                  <div className="admin-stat-card">
                    <div className="admin-stat-num" style={{ color: "#d97706" }}>{orders.filter(o => !o.status || o.status === "New").length}</div>
                    <div className="admin-stat-label">New Orders</div>
                  </div>
                  <div className="admin-stat-card">
                    <div className="admin-stat-num" style={{ color: "#2563eb" }}>{orders.filter(o => o.status === "In Progress").length}</div>
                    <div className="admin-stat-label">In Progress</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── SETTINGS TAB ── */}
          {activeTab === "settings" && (
            <div>
              <div className="admin-page-header">
                <div>
                  <h1 className="admin-page-title">{t.settingsTitle}</h1>
                  <p className="admin-page-sub">{t.settingsSub}</p>
                </div>
              </div>
              {settingsSaved && <div className="settings-saved-msg">✅ {t.saved}</div>}
              <div className="settings-panel">
                <div className="settings-section">
                  <div className="settings-section-title">🌐 {t.langLabel}</div>
                  <div className="settings-lang-grid">
                    {LANGUAGES.map(lang => (
                      <button key={lang.code} className={`settings-lang-btn ${language === lang.code ? "active" : ""}`} onClick={() => setLanguage(lang.code)}>
                        <span className="settings-lang-native">{lang.native}</span>
                        <span className="settings-lang-label">{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="settings-section">
                  <div className="settings-section-title">🎨 {t.themeLabel}</div>
                  <div className="settings-toggle-row">
                    <button className={`settings-toggle-btn ${theme === "light" ? "active" : ""}`} onClick={() => setTheme("light")}>☀️ {t.light}</button>
                    <button className={`settings-toggle-btn ${theme === "dark" ? "active" : ""}`} onClick={() => setTheme("dark")}>🌙 {t.dark}</button>
                  </div>
                </div>
                <div className="settings-section">
                  <div className="settings-section-title">🔔 {t.notifLabel}</div>
                  <div className="settings-toggle-row">
                    <button className={`settings-toggle-btn ${notifications ? "active" : ""}`} onClick={() => setNotifications(true)}>✅ {t.enabled}</button>
                    <button className={`settings-toggle-btn ${!notifications ? "active" : ""}`} onClick={() => setNotifications(false)}>🚫 {t.disabled}</button>
                  </div>
                </div>
                <button className="settings-save-btn" onClick={saveSettings}>💾 {t.save}</button>
              </div>
            </div>
          )}

        </div>
        <AdminFooter />
      </div>

      {sidebarOpen && <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />}
    </div>
  );
}

export default AdminDashboard;
