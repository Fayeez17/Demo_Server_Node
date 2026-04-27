import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-column">
          <h3>Product</h3>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/services">Services</Link>
          <Link to="/blogs">Blogs</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="footer-column">
          <h3>Country Visa</h3>
          <Link to="/countries/spain">Spain</Link>
          <Link to="/countries/thailand">Thailand</Link>
          <Link to="/countries/uk">UK</Link>
          <Link to="/countries/india">India</Link>
          <Link to="/countries/malta">Malta</Link>
        </div>

        <div className="footer-column">
          <h3>Company & Introduction</h3>
          <Link to="/faqs">FAQs</Link>
          <Link to="/support">Support</Link>
          <Link to="/podcast">Podcast</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/media">Link Media</Link>
        </div>

      </div>

      <div className="footer-bottom">
        <Link to="/" className="footer-logo">
          <img src={logo} alt="Messina Madrid Global Logo" />
          <span>Messina Madrid Global</span>
        </Link>

        <div className="footer-policy">
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/cookies">Cookies</Link>
        </div>

        <div className="footer-socials">
          <a href="#" aria-label="LinkedIn">in</a>
          <a href="#" aria-label="Facebook">f</a>
          <a href="#" aria-label="X">𝕏</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;