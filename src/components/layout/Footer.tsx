
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="text-2xl font-display font-bold gradient-text">
              Janaka Walakulu
            </Link>
            <p className="mt-4 text-gray-600 max-w-md">
              Frontend & full-stack developer specializing in creating pixel-perfect, 
              responsive websites with elegant animations and interactions.
            </p>
            <div className="flex gap-4 mt-6">
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
            </div>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Navigation</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/#about" className="text-gray-600 hover:text-primary transition-colors">About</Link>
              <Link to="/#services" className="text-gray-600 hover:text-primary transition-colors">Services</Link>
              <Link to="/#projects" className="text-gray-600 hover:text-primary transition-colors">Projects</Link>
              <Link to="/#process" className="text-gray-600 hover:text-primary transition-colors">Process</Link>
              <Link to="/#faq" className="text-gray-600 hover:text-primary transition-colors">FAQ</Link>
            </nav>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Contact</h3>
            <p className="text-gray-600">
              Interested in working together? Contact me to discuss your project.
            </p>
            <Link 
              to="/#contact" 
              className="mt-4 inline-block gradient-bg px-5 py-2 rounded-lg text-white font-medium hover:scale-105 transition-transform"
            >
              Start a project request
            </Link>
          </div>
        </div>
        
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Janaka Walakulu. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-500 text-sm hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 text-sm hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
