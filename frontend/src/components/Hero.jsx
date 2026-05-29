import "../styles.css";

function Hero() {
  return (
    <div className="hero">
      <div className="hero-badge">✦ Professional Writing & Editorial Services</div>
      <h1>Words That <span className="gold">Inspire,</span><br />Content That <span className="gold">Converts</span></h1>
      <p className="hero-sub">
        Elevate your brand with expert writing, editing, and content strategy — crafted to engage your audience and drive real results.
      </p>
      <div className="hero-btns">
        <a href="#contact" className="btn-primary">Start a Project</a>
        <a href="#services" className="btn-outline">Explore Services</a>
      </div>
      <div className="hero-stats">
        {[
          { num: "500+", label: "Projects Done" },
          { num: "200+", label: "Happy Clients" },
          { num: "2+", label: "Years Experience" },
          { num: "100%", label: "Satisfaction" },
        ].map((s, i) => (
          <div key={i} className="hero-stat">
            <div className="hero-stat-num">{s.num}</div>
            <div className="hero-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hero;
