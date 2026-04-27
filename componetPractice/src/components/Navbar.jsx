import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

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

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Countries", path: "/countries" },
    { label: "Consultation", path: "/consultation" },
    { label: "Support", path: "/support" },
  ];

  return (
    <nav
      className={`fixed left-0 top-0 z-50 flex w-full items-center justify-between px-18 transition-all duration-300 max-[900px]:h-[88px] max-[900px]:px-7 ${
        isScrolled || isMenuOpen
          ? "h-[78px] bg-[#082044] shadow-[0_10px_30px_rgba(0,0,0,0.25)] max-[900px]:h-[88px]"
          : "h-[88px] bg-transparent"
      }`}
    >
      <Link
        to="/"
        onClick={closeMenu}
        className="flex items-center gap-3 text-xl font-bold text-white no-underline"
      >
        <img
          src={logo}
          alt="Messina Madrid Global Logo"
          className="h-12 w-12 object-contain max-[900px]:h-[62px] max-[900px]:w-[62px] max-[520px]:h-[52px] max-[520px]:w-[52px]"
        />

        <span className="max-[900px]:hidden">Messina Madrid Global</span>
      </Link>

      <ul className="ml-auto mr-10 flex list-none items-center gap-8 p-0 max-[900px]:hidden">
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className="text-[15px] font-semibold text-white no-underline transition-colors duration-200 hover:text-[#89d600]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-5 max-[900px]:ml-auto max-[900px]:gap-6 max-[520px]:gap-3.5">
        <Link
          to="/contact"
          onClick={closeMenu}
          className="flex items-center gap-2.5 rounded-full bg-[#83d000] px-7 py-4 text-[15px] font-bold text-white no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#72bd00] max-[900px]:px-8 max-[900px]:py-[18px] max-[900px]:text-lg max-[520px]:px-6 max-[520px]:py-[15px] max-[520px]:text-[15px]"
        >
          Talk To An Expert <span>→</span>
        </Link>

        <button
          type="button"
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="hidden h-11 w-11 cursor-pointer border-0 bg-transparent p-2 max-[900px]:block"
        >
          <span
            className={`my-[5px] block h-1 w-[34px] rounded-full bg-white transition-all duration-300 ${
              isMenuOpen ? "translate-y-[9px] rotate-45" : ""
            }`}
          ></span>

          <span
            className={`my-[5px] block h-1 w-[34px] rounded-full bg-white transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>

          <span
            className={`my-[5px] block h-1 w-[34px] rounded-full bg-white transition-all duration-300 ${
              isMenuOpen ? "-translate-y-[9px] -rotate-45" : ""
            }`}
          ></span>
        </button>
      </div>

      <div
        className={`absolute left-0 top-[88px] hidden w-full flex-col overflow-hidden border-t border-white/20 bg-[#082044] transition-all duration-300 max-[900px]:flex ${
          isMenuOpen
            ? "max-h-[430px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-8 pb-9">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className="block border-b border-white/15 py-6 text-center text-[28px] font-semibold text-white no-underline last:border-b-0 max-[520px]:text-2xl"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;