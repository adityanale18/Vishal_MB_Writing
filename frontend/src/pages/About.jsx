import Navbar from "../components/Navbar";
import Footer from "../common folder/Footer";
import "../styles.css";

function About() {
  return (
    <div>
      <Navbar />
      <div className="about-hero">
        <div className="section-badge">About Us</div>
        <h1>The Story Behind the Words</h1>
        <p>Passionate about storytelling, driven by results, committed to excellence.</p>
      </div>

      <div className="about-bio">
        <div className="about-avatar">
          <img src="/MyPhoto.png" alt="Vishal MB" />
        </div>
        <div className="about-text">
          <h2>Hi, I'm Vishal</h2>
          <p>I'm a professional writer and editor with over <strong style={{ color: "#F5C518" }}>2 years of experience</strong> helping businesses, entrepreneurs, and individuals communicate their ideas with clarity and impact.</p>
          <p>My work spans across industries — from tech startups to lifestyle brands — delivering content that not only reads beautifully but also drives measurable results.</p>
          <p>Whether you need a compelling blog post, a polished resume, or a full content strategy, I bring creativity, precision, and professionalism to every project.</p>
        </div>
      </div>

      <div className="stats">
        <div className="stats-grid">
          {[
            { num: "500+", label: "Projects Completed" },
            { num: "2+", label: "Years Experience" },
            { num: "200+", label: "Happy Clients" },
            { num: "10+", label: "Industries Served" },
          ].map((s, i) => (
            <div key={i} className="stat">
              <h3>{s.num}</h3>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="values">
        <div className="section-badge">Why Choose Me</div>
        <h2>My Core Values</h2>
        <div className="values-grid">
          {[
            { icon: "🎯", title: "Result-Driven", desc: "Every word is written with a purpose — to achieve your specific goals." },
            { icon: "⏰", title: "On-Time Delivery", desc: "Deadlines are sacred. I always deliver on time, every time, no excuses." },
            { icon: "💡", title: "Creative Thinking", desc: "Fresh ideas and unique angles that make your content stand out from the crowd." },
            { icon: "🤝", title: "Client-First", desc: "Your satisfaction is my priority. Unlimited revisions until you're 100% happy." },
          ].map((v, i) => (
            <div key={i} className="value-card">
              <span className="icon">{v.icon}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;
