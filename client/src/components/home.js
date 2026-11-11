import React, { useEffect, useState } from "react";
import "../styles/home.css";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowRight,
  FaGoogle,
  FaLinkedin,
  FaQuoteLeft,
  FaRegHandPointRight,
  FaStar,
  FaTimes,
  FaTwitter,
} from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";
import { GiCheckedShield } from "react-icons/gi";
import { HiLightBulb } from "react-icons/hi";
import useSound from "use-sound";
import buttonHoverSound from "./keyboard-32-12.mp3";

const heroPoints = [
  "Smart predictions",
  "End-to-end support",
  "Real-time insights",
];

const tickerWords = [
  "Conferences",
  "Hackathons",
  "Concerts",
  "Workshops",
  "Meetups",
];

const features = [
  {
    icon: FaCalendarCheck,
    accent: "a",
    title: "Expertise in Event Planning",
    text: "We specialise in curating seamlessly planned events, managing data and schedules so every detail lands exactly where it should.",
  },
  {
    icon: GiCheckedShield,
    accent: "b",
    title: "End-to-End Support",
    text: "From the first checklist to the final follow-up, we coordinate schedules, reports and reminders for a genuinely hassle-free experience.",
  },
  {
    icon: HiLightBulb,
    accent: "c",
    title: "Smart and Innovative Planner",
    text: "We analyse the factors that matter, predict the likelihood of your event’s success and turn those insights into better decisions.",
  },
];

const galleryRowOne = [
  {
    src: "./images/Live.avif",
    alt: "Crowd enjoying a live event",
  },
  {
    src: "./images/Network.avif",
    alt: "Guests at a networking event",
  },
  {
    src: "./images/Conference.avif",
    alt: "Speaker presenting at a conference",
  },
  {
    src: "./images/Concert.avif",
    alt: "Concert stage with bright lights",
  },
];

const galleryRowTwo = [
  {
    src: "./images/Events.avif",
    alt: "Beautifully decorated event venue",
  },
  {
    src: "./images/Audience.avif",
    alt: "Audience listening to a talk",
  },
  {
    src: "/images/Celebrating.avif",
    alt: "People celebrating together",
  },
  {
    src: "./images/Festival.avif",
    alt: "Festival crowd with raised hands",
  },
];

const testimonials = [
  {
    quote:
      "Eventure turned a 400-person conference into a calm, organised experience. The planning tools kept every team on the same page and the success insights helped us sell out earlier than expected.",
    name: "Miyah Myles",
    role: "Conference Producer",
    image: "./images/46.jpg",
  },
  {
    quote:
      "We used to juggle spreadsheets, messages and last-minute calls. Now everything lives in one place. The predictions gave us the confidence to rework our pricing and the event sold out.",
    name: "June Cha",
    role: "Community Manager",
    image: "./images/44.jpg",
  },
  {
    quote:
      "From the first idea to the final follow-up, the experience felt effortless. Eventure is the first planning tool that actually feels like it was built by people who host events.",
    name: "Alex Morgan",
    role: "Startup Founder",
    image: "./images/32.jpg",
  },
];

function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, []);

  const move = (direction) => {
    setActive(
      (current) =>
        (current + direction + testimonials.length) % testimonials.length
    );
  };

  const current = testimonials[active];

  return (
    <section className="ev-testimonials" id="feedback">
      <div className="ev-shell">
        <div className="ev-section-head ev-section-head--light ev-section-head--center">
          <span className="ev-eyebrow ev-eyebrow--light">
            <span className="ev-eyebrow__dot" />
            Real stories
          </span>
          <h2>
            Loved by planners and <span className="ev-highlight">participants.</span>
          </h2>
        </div>

        <div className="ev-testimonial">
          <FaQuoteLeft className="ev-testimonial__mark" aria-hidden="true" />

          <div className="ev-testimonial__body" key={active} aria-live="polite">
            <div className="ev-testimonial__stars" aria-label="5 out of 5 stars">
              {[0, 1, 2, 3, 4].map((star) => (
                <FaStar key={star} aria-hidden="true" />
              ))}
            </div>

            <blockquote>{current.quote}</blockquote>

            <div className="ev-testimonial__person">
              <img src={current.image} alt={current.name} />
              <div>
                <strong>{current.name}</strong>
                <span>{current.role}</span>
              </div>
            </div>
          </div>

          <div className="ev-testimonial__controls">
            <button
              type="button"
              className="ev-testimonial__nav"
              onClick={() => move(-1)}
              aria-label="Previous testimonial"
            >
              <FaArrowLeft />
            </button>

            <div className="ev-testimonial__dots">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  type="button"
                  className={`ev-testimonial__dot ${
                    index === active ? "ev-testimonial__dot--active" : ""
                  }`}
                  onClick={() => setActive(index)}
                  aria-label={`Show testimonial from ${testimonial.name}`}
                  aria-current={index === active}
                />
              ))}
            </div>

            <button
              type="button"
              className="ev-testimonial__nav"
              onClick={() => move(1)}
              aria-label="Next testimonial"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const [play] = useSound(buttonHoverSound, { volume: 0.35 });

  useEffect(() => {
    if (!modal) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setModal(null);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [modal]);

  const openModal = (type) => {
    play();
    setModal(type);
  };

  const closeModal = () => setModal(null);

  const goToSection = (event, id) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const modalDetails =
    modal === "signin"
      ? {
          eyebrow: "Welcome back",
          title: "Ready to organise your next event?",
          text: "Sign in to pick up where you left off and keep every detail moving in the right direction.",
          action: "Yes, sign me in",
          route: "/login",
        }
      : {
          eyebrow: "Join Eventure",
          title: "Do you want to organise an Event?",
          text: "Create your free account and let Eventure handle the planning, the schedules and the surprises.",
          action: "Yes, let’s plan",
          route: "/register",
        };

  const goToNextStep = () => {
    const nextRoute = modalDetails.route;
    setModal(null);
    navigate(nextRoute);
  };

  return (
    <div className="ev-home">
      <section className="ev-hero">
        <div className="ev-shell ev-hero__inner">
          <div className="ev-hero__content">
            <span className="ev-eyebrow">
              <span className="ev-eyebrow__dot" />
              Plan. Launch. Celebrate.
            </span>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            >
              You plan.
              <span>We manage.</span>
            </motion.h1>

            <motion.p
              className="ev-hero__text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            >
              Eventure puts powerful planning resources at your fingertips so
              you can organise events strategically, conveniently and
              efficiently, exactly the way you need.
            </motion.p>

            <motion.div
              className="ev-hero__actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            >
              <button
                type="button"
                className="ev-btn ev-btn--primary"
                onClick={() => openModal("signin")}
              >
                Sign In
                <FaArrowRight />
              </button>
              <button
                type="button"
                className="ev-btn ev-btn--ghost"
                onClick={() => openModal("signup")}
              >
                Sign Up
              </button>
            </motion.div>

            <ul className="ev-hero__points">
              {heroPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          <motion.div
            className="ev-hero__visual"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="ev-hero__frame">
              <img
                className="ev-hero__image"
                src={`${process.env.PUBLIC_URL}/output-onlinegiftools.gif`}
                alt="Animated event planning illustration"
              />
            </div>
            <span className="ev-hero__chip ev-hero__chip--top">
              Planner mode
            </span>
            <span className="ev-hero__chip ev-hero__chip--bottom">
              Success insights
            </span>
          </motion.div>
        </div>
      </section>

      <div className="ev-ticker" aria-hidden="true">
        <div className="ev-ticker__track">
          {[...tickerWords, ...tickerWords].map((word, index) => (
            <span className="ev-ticker__item" key={`${word}-${index}`}>
              {word}
              <span className="ev-ticker__dot" />
            </span>
          ))}
        </div>
      </div>

      <section className="ev-features" id="features">
        <div className="ev-shell">
          <div className="ev-section-head">
            <span className="ev-eyebrow">Why Eventure</span>
            <h2>
              Less chaos. More <span className="ev-highlight">moments.</span>
            </h2>
            <p>
              Everything you need to move from a scattered idea to a
              beautifully run event, without losing your calm along the way.
            </p>
          </div>

          <div className="ev-feature-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <article
                  className={`ev-feature ev-feature--${feature.accent}`}
                  key={feature.title}
                >
                  <span className="ev-feature__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="ev-feature__icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="ev-tools" id="recommend">
        <span className="ev-tools__watermark" aria-hidden="true">
          PLAN
        </span>

        <img
          className="ev-tools__mascot"
          src="./images/looking-left-and-right-bunty.gif"
          alt=""
          aria-hidden="true"
          loading="lazy"
        />

        <div className="ev-shell">
          <div className="ev-section-head ev-section-head--light">
            <span className="ev-eyebrow ev-eyebrow--light">
              <span className="ev-eyebrow__dot" />
              Your toolkit
            </span>
            <h2>
              Two smart ways to{" "}
              <span className="ev-highlight">make it happen.</span>
            </h2>
            <p>
              Predict what will work, then run the day with confidence.
              Eventure gives you both sides of the story.
            </p>
          </div>

          <div className="ev-tool-grid">
            <article className="ev-tool ev-tool--seeker">
              <span className="ev-tool__tag">Predict</span>
              <h3>ForeSeeker</h3>
              <p>
                Worried about your event’s success? Try ForeSeeker to predict
                the success rate of your event before you commit.
              </p>
              <button
                type="button"
                className="ev-btn ev-btn--dark"
                onClick={() => navigate("/forseeker")}
              >
                Try ForeSeeker
                <FaArrowRight />
              </button>
            </article>

            <article className="ev-tool ev-tool--handler">
              <span className="ev-tool__tag">Organise</span>
              <h3>Handler</h3>
              <p>
                Hosting and organizing events is a hassle. Be calm and let
                Handler guide the schedule, the people and the moving pieces.
              </p>
              <button
                type="button"
                className="ev-btn ev-btn--light"
                onClick={() => navigate("/events")}
              >
                Open Handler
                <FaArrowRight />
              </button>
            </article>
          </div>
        </div>
      </section>

      <section className="ev-gallery">
        <div className="ev-shell">
          <div className="ev-section-head ev-section-head--center">
            <span className="ev-eyebrow">Made for moments</span>
            <h2>
              Step into the <span className="ev-highlight">experience.</span>
            </h2>
            <p>
              From intimate meetups to packed arenas, discover the energy that
              makes every Eventure event worth remembering.
            </p>
          </div>
        </div>

        <div className="ev-marquee" aria-hidden="true">
          <div className="ev-marquee__track">
            {[...galleryRowOne, ...galleryRowOne].map((image, index) => (
              <div className="ev-marquee__item" key={`top-${index}`}>
                <img src={image.src} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="ev-marquee ev-marquee--reverse" aria-hidden="true">
          <div className="ev-marquee__track">
            {[...galleryRowTwo, ...galleryRowTwo].map((image, index) => (
              <div className="ev-marquee__item" key={`bottom-${index}`}>
                <img src={image.src} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="ev-gallery__cta">
          <p>Wanna participate?</p>
          <Link to="/events" className="ev-btn ev-btn--primary">
            Browse events
            <FaRegHandPointRight />
          </Link>
        </div>
      </section>

      <Testimonials />

      <section id="foot">
        <footer className="ev-footer">
          <div className="ev-shell">
            <div className="ev-footer__grid">
              <div className="ev-footer__brand">
                <Link to="/" className="ev-footer__logo">
                  Even<span>ture</span>.
                </Link>
                <p>
                  Plan smarter, host calmer. Eventure brings the tools, the
                  insights and the support together so you can focus on the
                  moment.
                </p>
                <div className="ev-footer__socials">
                  <a
                    href="mailto:eventuree.01@gmail.com"
                    aria-label="Email Eventure on Gmail"
                  >
                    <FaGoogle />
                  </a>
                  <a
                    href="https://x.com/Medha0909"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Eventure on Twitter"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/medha-dwivedi-558795244/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Eventure on LinkedIn"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>

              <div className="ev-footer__links">
                <h4>Company</h4>
                <ul>
                  <li>
                    <a href="#foot" onClick={(event) => goToSection(event, "foot")}>
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#feedback"
                      onClick={(event) => goToSection(event, "feedback")}
                    >
                      Experiences
                    </a>
                  </li>
                  <li>
                    <a
                      href="#recommend"
                      onClick={(event) => goToSection(event, "recommend")}
                    >
                      Recommended
                    </a>
                  </li>
                </ul>
              </div>

              <div className="ev-footer__links">
                <h4>Explore</h4>
                <ul>
                  <li>
                    <Link to="/events">Browse events</Link>
                  </li>
                  <li>
                    <Link to="/forseeker">ForeSeeker</Link>
                  </li>
                  <li>
                    <Link to="/login">Sign in</Link>
                  </li>
                  <li>
                    <Link to="/register">Create an account</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="ev-footer__bottom">
              <p>&copy; {new Date().getFullYear()} Eventure. All rights reserved.</p>
              <p>Built for unforgettable moments.</p>
            </div>
          </div>
        </footer>
      </section>

      <AnimatePresence>
        {modal && (
          <motion.div
            className="ev-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeModal();
              }
            }}
          >
            <motion.div
              className="ev-modal__panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby="ev-modal-title"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
            >
              <button
                type="button"
                className="ev-modal__close"
                onClick={closeModal}
                aria-label="Close dialog"
              >
                <FaTimes />
              </button>

              <span className="ev-modal__eyebrow">{modalDetails.eyebrow}</span>
              <h2 className="ev-modal__title" id="ev-modal-title">
                {modalDetails.title}
              </h2>
              <p className="ev-modal__text">{modalDetails.text}</p>

              <div className="ev-modal__actions">
                <button
                  type="button"
                  className="ev-btn ev-btn--primary"
                  onClick={goToNextStep}
                  autoFocus
                >
                  {modalDetails.action}
                  <FaArrowRight />
                </button>
                <button
                  type="button"
                  className="ev-btn ev-btn--quiet"
                  onClick={closeModal}
                >
                  Not now
                </button>
              </div>

              <p className="ev-modal__hint">
                No pressure. You can always explore the home page first.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;
