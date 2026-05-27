import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import Navbar from "../components/Navbar";
import Footer from "../common folder/Footer";
import "../styles.css";

function Register() {
  const [user, setUser] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (user.password !== user.confirm) { setError("Passwords do not match."); return; }
    if (user.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    try {
      const res = await fetch("http://localhost:8084/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname: user.name, email: user.email, password: user.password, cPassword: user.confirm }),
      });
      if (!res.ok) throw new Error("Registration failed. Email may already exist.");
      alert(`Welcome, ${user.name}! Registration successful.`);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const profileRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const profile = await profileRes.json();
        await fetch("http://localhost:8084/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: profile.name, email: profile.email }),
        });
        localStorage.setItem("vmb_loggedIn", JSON.stringify({ name: profile.name, email: profile.email }));
        alert(`Welcome, ${profile.name}!`);
        navigate("/");
      } catch {
        setError("Google sign-in failed. Please try again.");
      }
    },
    onError: () => setError("Google sign-in failed. Please try again."),
  });

  return (
    <div>
      <Navbar />
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-icon">✍️</div>
          <h2>Create Account</h2>
          <p className="auth-sub">Join Vishal MB Writing today</p>
          {error && <div className="auth-error">{error}</div>}

          <div className="social-btns">
            <button className="social-btn google" onClick={() => googleLogin()}>
              <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
              Continue with Google
            </button>
          </div>

          <div className="auth-divider"><span>or register with email</span></div>

          <form onSubmit={handleSubmit}>
            <label className="auth-label">Full Name</label>
            <input className="auth-input" type="text" placeholder="Your full name" required
              value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} />
            <label className="auth-label">Email Address</label>
            <input className="auth-input" type="email" placeholder="you@example.com" required
              value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
            <label className="auth-label">Password</label>
            <input className="auth-input" type="password" placeholder="Min. 6 characters" required
              value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} />
            <label className="auth-label">Confirm Password</label>
            <input className="auth-input" type="password" placeholder="Repeat your password" required
              value={user.confirm} onChange={e => setUser({ ...user, confirm: e.target.value })} />
            <button type="submit" className="auth-btn">Create Account →</button>
          </form>
          <p className="auth-footer">Already have an account? <Link to="/login">Login here</Link></p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
