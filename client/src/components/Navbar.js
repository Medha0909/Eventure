import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FaBars, FaRegUser, FaTimes } from "react-icons/fa";
import "../styles/Navbar.css";

const navLinks = [
  { id: "foot", label: "About Us" },
  { id: "feedback", label: "Experiences" },
  { id: "recommend", label: "Recommended" },
];

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth > 900) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  const handleLogout = () => {
    ["token", "title1", "title", "uniqueId"].forEach((key) =>
      localStorage.removeItem(key)
    );
    setMenuOpen(false);
    navigate("/");
  };

  const goToSection = (event, id) => {
    event.preventDefault();
    setMenuOpen(false);

    const scrollToSection = () =>
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });

    if (window.location.pathname !== "/") {
      navigate("/");
      window.setTimeout(scrollToSection, 200);
    } else {
      scrollToSection();
    }
  };

  return (
    <div className="bb">
      <nav className="navi" aria-label="Main navigation">
        <div className="navbar__inner">
          <Link
            to="/"
            className="navbar__brand"
            onClick={() => {
              setMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Eventure home"
          >
            <img
              className="logo"
              src="./images/Disco.webp"
              alt="Eventure logo"
            />
            <img
              className="vc"
              src="./images/Eventure.webp"
              alt="Eventure"
            />
          </Link>

          <div
            id="primary-navigation"
            className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="nav-link"
                onClick={(event) => goToSection(event, link.id)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="navbar__controls">
            <Menu as="div" className="navbar__user-menu">
              <MenuButton className="nav-user" aria-label="Open user menu">
                <FaRegUser />
              </MenuButton>

              <MenuItems transition className="nav-menu">
                <MenuItem>
                  <button
                    type="button"
                    className="nav-menu__item"
                    onClick={handleLogout}
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>

            <button
              type="button"
              className="nav-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="primary-navigation"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Navbar;
