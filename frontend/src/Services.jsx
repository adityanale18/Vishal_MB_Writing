import { useNavigate } from "react-router-dom";
import "./styles.css";

export const services = [
  {
    id: "mb-writing-service",
    icon: "✍️",
    title: "MB Writing Service",
    desc: "Professional MB writing support for assignments, cards, and project work.",
    details: "Accurate, well-structured MB writing tailored to your subject and instructions. Ideal for class assignments, project submissions, and study materials prepared to your specifications.",
    includes: ["Subject-aligned content", "Accurate formatting", "Plagiarism-free", "1 free minor revision"],
    price: "Contact for pricing",
  },
  {
    id: "assignment-writing",
    icon: "📚",
    title: "Assignment Writing",
    desc: "Custom assignment solutions with clear explanations and references.",
    details: "Get professionally written assignments with step-by-step solutions, proper citations, and formatting that meets academic requirements. Delivered on time with optional rush service.",
    includes: ["Full answers & explanations", "References & formatting", "Plagiarism report (on request)", "Fast delivery available"],
    price: "Starting at ₹300 / page",
  },
  {
    id: "pdf-notes",
    icon: "📄",
    title: "PDF Notes Available",
    desc: "Concise, exam-ready PDF notes across multiple subjects and topics.",
    details: "High-quality PDF notes formatted for quick revision. Includes summaries, diagrams, and highlighted key points — perfect for last-minute study and exam prep.",
    includes: ["Topic summaries", "Diagrams & charts", "PDF-ready formatting", "Subject bundles available"],
    price: "Starting at ₹150 / topic",
  },
  {
    id: "neat-handwriting",
    icon: "✒️",
    title: "Neat Handwriting",
    desc: "Clear, neat handwritten notes scanned to PDF for authenticity and readability.",
    details: "Handwritten notes produced neatly and scanned in high resolution. Ideal when you need authentic-looking notes or submissions that require handwritten work.",
    includes: ["A4 handwritten pages", "High-res scans", "Optional line spacing & margin preferences", "Fast turnaround"],
    price: "Starting at ₹80 / handwritten page",
  },
  {
    id: "fast-delivery",
    icon: "⚡",
    title: "Fast Delivery",
    desc: "Urgent turnaround options to meet tight deadlines without sacrificing quality.",
    details: "Choose express delivery for assignments, notes, and MB writing. We prioritize quality while meeting your deadline — contact for ETA and rush pricing.",
    includes: ["Priority queue", "Express revisions", "Delivery ETA provided", "Rush fees apply"],
    price: "Contact for rush pricing",
  },
  {
    id: "engineering-civil-notes",
    icon: "🏗️",
    title: "Engineering / Civil Notes",
    desc: "Subject-specific notes and solved problems for Engineering and Civil disciplines.",
    details: "Comprehensive notes, solved example problems, and formula sheets tailored for engineering and civil subjects — prepared by experienced tutors.",
    includes: ["Solved problems", "Formula sheets", "Topic-wise summaries", "PDF delivery"],
    price: "Contact for bundle pricing",
  },
  {
    id: "custom-work",
    icon: "✅",
    title: "100% Custom Work",
    desc: "Fully bespoke writing and notes created to your exact requirements.",
    details: "We deliver 100% custom work built around your instructions — no templates, no reuse. Ideal for tailored projects, unique formats, and special requests.",
    includes: ["Custom formatting & structure", "Dedicated research", "Multiple revision rounds (as agreed)", "Confidential & original"],
    price: "Contact for custom quote",
  },
];

function Services() {
  const navigate = useNavigate();
  return (
    <div id="services" className="services">
      <div className="section-badge">What We Offer</div>
      <h2 className="section-heading">Our Services</h2>
      <p className="section-desc">From a single blog post to a full content strategy — we deliver quality that speaks for itself.</p>
      <div className="services-grid">
        {services.map((s) => (
          <div key={s.id} className="service-card service-card-link" onClick={() => navigate(`/services/${s.id}`)}>
            <span className="service-icon">{s.icon}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
            <span className="service-card-cta">Learn More & Book →</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
