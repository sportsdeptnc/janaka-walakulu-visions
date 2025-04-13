
import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const profileImageRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect for profile image
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!profileImageRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const offsetX = (clientX - innerWidth / 2) / 50;
      const offsetY = (clientY - innerHeight / 2) / 50;
      
      profileImageRef.current.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background gradient circles */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-gradient-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 -right-64 w-96 h-96 bg-gradient-purple/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left animate-fade-in">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Janaka Walakulu
              <span className="block mt-2 gradient-text">Digital Visionary</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
              Creating beautiful digital experiences with pixel-perfect design
              and flawless functionality that drives results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/#contact" 
                className="glow-effect"
              >
                <span className="relative px-8 py-3 bg-white rounded-lg text-primary font-medium">
                  Get in touch
                </span>
              </Link>
              
              <Link 
                to="/#projects" 
                className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                View my work
              </Link>
            </div>
          </div>
          
          <div className="relative flex justify-center">
            <div className="relative z-10" ref={profileImageRef}>
              <div className="image-circle-glow">
                <div className="image-circle h-64 w-64 md:h-80 md:w-80 lg:h-96 lg:w-96 animate-fade-in">
                  <img 
                    src="/lovable-uploads/5cb05a42-cd53-438d-b4fc-4559a442fafe.png" 
                    alt="Janaka Walakulu" 
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <Link 
        to="/#about" 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 animate-bounce"
      >
        <span className="text-sm">Scroll</span>
        <ArrowDown size={20} />
      </Link>
    </section>
  );
};

export default Hero;
