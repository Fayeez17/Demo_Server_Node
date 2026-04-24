import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import "./Navbar.css";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "navbar-scrolled" : ""}`}>
      <Link to="/" className="navbar-logo">
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

      <Link to="/contact" className="navbar-button">
        Talk To An Expert <span>→</span>
      </Link>
    </nav>
  );
}

export default Navbar;