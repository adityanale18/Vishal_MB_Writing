import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../Services";
import Contact from "../components/Contact";
import Footer from "../common folder/Footer";
import "../styles.css";

const testimonials = [
  { name: "Priya S.", role: "Startup Founder", text: "Vishal transformed our bland product descriptions into compelling copy that doubled our conversions. Absolutely brilliant work!", stars: "★★★★★", initial: "P" },
  { name: "Rahul M.", role: "Marketing Manager", text: "The blog content he delivered was not only well-written but also ranked on the first page of Google within weeks. Highly recommend!", stars: "★★★★★", initial: "R" },
  { name: "Anita K.", role: "HR Director", text: "My resume went from getting ignored to landing 3 interviews in a week. Vishal has a real talent for making people shine on paper.", stars: "★★★★★", initial: "A" },
];

function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="about-inner">
        <div className="about-img-wrap">
          <div className="about-img-circle">
            <img src="/MyPhoto.png" alt="Vishal MB" />
          </div>
          <div className="about-img-ring" />
        </div>
        <div className="about-content">
          <div className="section-badge">About Me</div>
          <h2>Hi, I'm Vishal</h2>
          <p>A professional writer and editor with over <strong>2 years of experience</strong> helping businesses, entrepreneurs, and individuals communicate their ideas with clarity and impact.</p>
          <p>My work spans across industries — from tech startups to lifestyle brands — delivering content that not only reads beautifully but also drives measurable results.</p>
          <p>Whether you need a compelling blog post, a polished resume, or a full content strategy, I bring creativity, precision, and professionalism to every project.</p>
          <div className="about-tags">
            {["Content Strategy", "SEO Writing", "Brand Voice", "Storytelling", "Editing"].map(t => (
              <span key={t} className="about-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="section-badge">Client Reviews</div>
      <h2 className="section-heading">What Clients Say</h2>
      <p className="section-desc">Don't just take our word for it — here's what our clients have to say.</p>
      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <div key={i} className="testi-card">
            <div className="testi-stars">{t.stars}</div>
            <p className="testi-text">"{t.text}"</p>
            <div className="testi-author">
              <div className="testi-avatar">{t.initial}</div>
              <div>
                <div className="testi-name">{t.name}</div>
                <div className="testi-role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <AboutSection />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
