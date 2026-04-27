import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import "./Navbar.css";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled || isMenuOpen ? "navbar-scrolled" : ""}`}>
      <Link to="/" className="navbar-logo" onClick={closeMenu}>
        <img src={logo} alt="Messina Madrid Global Logo" className="logo-image" />
        <span>Messina Madrid Global</span>
      </Link>

      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/countries">Countries</Link>
        </li>
        <li>
          <Link to="/consultation">Consultation</Link>
        </li>
        <li>
          <Link to="/support">Support</Link>
        </li>
      </ul>

      <div className="navbar-actions">
        <Link to="/contact" className="navbar-button" onClick={closeMenu}>
          Talk To An Expert <span>→</span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className={isMenuOpen ? "line line-one open" : "line line-one"}></span>
          <span className={isMenuOpen ? "line line-two open" : "line line-two"}></span>
          <span className={isMenuOpen ? "line line-three open" : "line line-three"}></span>
        </button>
      </div>

      <div className={isMenuOpen ? "mobile-menu mobile-menu-open" : "mobile-menu"}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/countries" onClick={closeMenu}>
          Countries
        </Link>
        <Link to="/consultation" onClick={closeMenu}>
          Consultation
        </Link>
        <Link to="/support" onClick={closeMenu}>
          Support
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;