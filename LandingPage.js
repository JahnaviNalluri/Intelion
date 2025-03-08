import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Added react-router-dom
import "./Landingcss.css";
import logo from "./INFINITE.jpg";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ServicesPage from "./ServicesPage"; // Import ServicesPage component

const faqData = [
  {
    question: "Why choose Intelion?",
    answer: "Intelion provides top-tier tech solutions, ensuring efficiency and innovation in business automation.",
  },
  {
    question: "What industries does Intelion serve?",
    answer: "Intelion caters to industries like finance, healthcare, retail, and logistics with cutting-edge AI-driven solutions.",
  },
  {
    question: "Does Intelion offer AI-powered solutions?",
    answer: "Yes! Intelion specializes in AI and ML-based solutions to optimize business operations and decision-making.",
  },
  {
    question: "How can I get started with Intelion?",
    answer: "Simply contact us through our website, and our team will guide you through the best solutions for your business.",
  },
];

const LandingPage = () => {
  const [hoveredMenu, setHoveredMenu] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const smoothScroll = (event, targetId) => {
    event.preventDefault();
    document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".what-we-do");
      if (section) {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 100) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Router>
      <div>
        <header>
          <div className="logo">
            <img src={logo} alt="Intelion Logo" className="logo-img" />
            <span className="company-name">Intelion</span>
          </div>
          <nav>
            <ul>
              <li
                onMouseEnter={() => setHoveredMenu("home")}
                onMouseLeave={() => setHoveredMenu("")}
              >
                <Link to="/" onClick={(e) => smoothScroll(e, "home")}>Home</Link>
                {hoveredMenu === "home" && (
                  <div className="dropdown">
                    <p>Welcome to Intelion! Your IT solutions partner.</p>
                  </div>
                )}
              </li>
              <li
                onMouseEnter={() => setHoveredMenu("services")}
                onMouseLeave={() => setHoveredMenu("")}
              >
                {/* Updated to use Link from react-router-dom */}
                <Link to="/services" onClick={(e) => smoothScroll(e, "services")}>Services</Link>
                {hoveredMenu === "services" && (
                  <div className="dropdown services-dropdown">
                    <div className="dropdown-column">
                      <h4>Services</h4>
                      <ul>
                        <li>Digital Strategy & Design</li>
                        <li>Application Development</li>
                        <li>Cloud & Infrastructure</li>
                        <li>Software-as-a-Service</li>
                        <li>Generative AI & BI</li>
                      </ul>
                    </div>
                  </div>
                )}
              </li>
              <li><a href="#industries" onClick={(e) => smoothScroll(e, "industries")}>Industries</a></li>
              <li
                onMouseEnter={() => setHoveredMenu("market-research")}
                onMouseLeave={() => setHoveredMenu("")}
              >
                <a href="#market-research" onClick={(e) => smoothScroll(e, "market-research")}>Market Research</a>
                {hoveredMenu === "market-research" && (
                  <div className="dropdown">
                    <ul>
                      <li>Consumer Product Reports</li>
                      <li>Packaging Industry Reports</li>
                      <li>IT & Communications Technology Reports</li>
                      <li>Food & Beverage Reports</li>
                      <li>Services and Utilities Reports</li>
                      <li>Oil and Gas Reports</li>
                      <li>Semiconductor & Electronics Reports</li>
                      <li>Travel and Tourism Reports</li>
                    </ul>
                  </div>
                )}
              </li>
              <li><a href="#brands" onClick={(e) => smoothScroll(e, "brands")}>Brands</a></li>
            </ul>
          </nav>
          <button className="contact-btn">Contact Us</button>
        </header>

        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="hero-text">
            <h1>Smart choices lead to great results. Trust us, and let’s achieve success together!</h1>
            <p className="growth-text">Your Growth, Our Commitment.</p>
            <button className="btn-primary">Schedule a Free Consultation</button>
            <button className="btn-secondary">Services</button>
          </div>
        </section>

        {/* What We Do Section */}
        <section id="what-we-do" className={`what-we-do ${isVisible ? "show" : ""}`}>
          <div className="header-container">
            <h3 className="yellow-text">WHAT WE DO</h3>
            <h1>Transforming ideas into digital reality.</h1>
          </div>

          <div className="features-container">
            <div className="feature-box">
              <div className="icon">💰</div>
              <h3>Cost-effectiveness</h3>
              <p>We offer affordable IT solutions that help you reduce costs and improve your bottom line.</p>
            </div>
            <div className="feature-box">
              <div className="icon">💡</div>
              <h3>Innovative Technology</h3>
              <p>We stay up-to-date with the latest technology trends and offer innovative solutions.</p>
            </div>
            <div className="feature-box">
              <div className="icon">📖</div>
              <h3>Industry Expertise</h3>
              <p>We specialize in serving industries like healthcare, finance, and manufacturing.</p>
            </div>
            <div className="feature-box">
              <div className="icon">🚀</div>
              <h3>Scalability</h3>
              <p>Our solutions can grow with your business, ensuring maximum value.</p>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <Solutions />

        {/* FAQ Section moved to the end */}
        <section className="faq-section">
          <h2 className="faq-title">Why Intelion?</h2>
          <div className="faq-container">
            {faqData.map((faq, index) => (
              <div key={index} className="faq-box">
                <div className="question-box" onClick={() => toggleFAQ(index)}>
                  <h4>{faq.question}</h4>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="faq-icon" />
                  </motion.div>
                </div>
                {openIndex === index && (
                  <motion.div
                    className="answer-box"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Services Page Route */}
        <Routes>
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
      </div>
    </Router>
  );
};

const Solutions = () => {
  useEffect(() => {
    const revealOnScroll = () => {
      const section = document.querySelector(".solutions-section");
      if (section) {
        const sectionPosition = section.getBoundingClientRect().top;
        if (sectionPosition < window.innerHeight - 100) {
          section.classList.add("show");
        }
      }
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  return (
    <section id="solutions" className="solutions-section">
      <div className="header-container">
        <h3 className="yellow-text">HOW WE DO</h3>
        <h1 className="section-title">Great solutions come from great collaborations</h1>
      </div>

      <div className="solutions-container">
        <div className="solution-card">
          <div className="solution-icon">🤝</div>
          <h3>Managed Services</h3>
          <p>Free up your internal resources by letting us handle day-to-day IT management.</p>
        </div>
        <div className="solution-card">
          <div className="solution-icon">📊</div>
          <h3>IT Consulting</h3>
          <p>The right technology can lead to significant business growth.</p>
        </div>
        <div className="solution-card">
          <div className="solution-icon">🔒</div>
          <h3>Cyber Security</h3>
          <p>We assess risks and implement robust security measures.</p>
        </div>
        <div className="solution-card">
          <div className="solution-icon">💻</div>
          <h3>Web Development</h3>
          <p>We help you establish an impactful online presence with our web development services.</p>
        </div>
        <div className="solution-card">
          <div className="solution-icon">📱</div>
          <h3>Mobile Development</h3>
          <p>Our team can help you create a customized mobile app tailored to your business needs.</p>
        </div>
        <div className="solution-card">
          <div className="solution-icon">☁️</div>
          <h3>Cloud Services</h3>
          <p>Find the right cloud solutions to meet your business needs and goals.</p>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
