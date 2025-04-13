
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Github, Linkedin, Twitter, Mail } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between py-4">
          <Link
            to="/"
            className="text-xl md:text-2xl font-display font-bold gradient-text"
          >
            Janaka Walakulu
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/#about" className="story-link font-medium">
              About
            </Link>
            <Link to="/#services" className="story-link font-medium">
              Services
            </Link>
            <Link to="/#projects" className="story-link font-medium">
              Projects
            </Link>
            <Link to="/#process" className="story-link font-medium">
              Process
            </Link>
            <Link to="/#faq" className="story-link font-medium">
              FAQ
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-5">
            <Link to="https://github.com" target="_blank" className="text-gray-600 hover:text-primary transition-colors">
              <Github size={20} />
            </Link>
            <Link to="https://linkedin.com" target="_blank" className="text-gray-600 hover:text-primary transition-colors">
              <Linkedin size={20} />
            </Link>
            <Link to="https://twitter.com" target="_blank" className="text-gray-600 hover:text-primary transition-colors">
              <Twitter size={20} />
            </Link>
            <Link to="mailto:contact@example.com" className="text-gray-600 hover:text-primary transition-colors">
              <Mail size={20} />
            </Link>
            <Link to="/#contact" className="glow-effect ml-2">
              <span className="relative px-6 py-2 bg-white rounded-lg text-primary font-medium">
                Project request
              </span>
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-800"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t absolute w-full left-0 px-4 py-6 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link to="/#about" onClick={toggleMenu} className="font-medium">
              About
            </Link>
            <Link to="/#services" onClick={toggleMenu} className="font-medium">
              Services
            </Link>
            <Link to="/#projects" onClick={toggleMenu} className="font-medium">
              Projects
            </Link>
            <Link to="/#process" onClick={toggleMenu} className="font-medium">
              Process
            </Link>
            <Link to="/#faq" onClick={toggleMenu} className="font-medium">
              FAQ
            </Link>
            <div className="pt-4 flex gap-4">
              <Link to="https://github.com" target="_blank" className="text-gray-600 hover:text-primary">
                <Github size={20} />
              </Link>
              <Link to="https://linkedin.com" target="_blank" className="text-gray-600 hover:text-primary">
                <Linkedin size={20} />
              </Link>
              <Link to="https://twitter.com" target="_blank" className="text-gray-600 hover:text-primary">
                <Twitter size={20} />
              </Link>
              <Link to="mailto:contact@example.com" className="text-gray-600 hover:text-primary">
                <Mail size={20} />
              </Link>
            </div>
            <Link to="/#contact" onClick={toggleMenu} className="inline-block mt-2">
              <span className="gradient-bg px-6 py-2 rounded-lg text-white font-medium">
                Project request
              </span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
