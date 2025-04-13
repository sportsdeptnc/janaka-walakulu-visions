
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const About = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const statsRef = useRef<HTMLDivElement>(null);
  const viewedStats = useRef(false);

  // Animation for stats counters
  useEffect(() => {
    if (!statsRef.current || viewedStats.current) return;
    
    if (inView) {
      viewedStats.current = true;
      const counters = statsRef.current.querySelectorAll('[data-count]');
      
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count') || '0');
        let count = 0;
        const duration = 2000; // ms
        const interval = 50; // ms
        const steps = duration / interval;
        const increment = target / steps;
        
        const timer = setInterval(() => {
          count += increment;
          
          if (count >= target) {
            counter.textContent = target.toString();
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(count).toString();
          }
        }, interval);
      });
    }
  }, [inView]);

  return (
    <section id="about" className="section-spacing bg-gray-50" ref={ref}>
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title gradient-text">About Me</h2>
          <p className="section-subtitle">
            Front-end developer at the intersection of design and code.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Web Developer & Designer</h3>
            
            <p className="text-gray-700 mb-4">
              Hi! I am Janaka Walakulu, a skilled web developer with a passion for creating 
              stunning digital experiences. I turn your designs into pixel-perfect websites with 
              great attention to detail and elegant animations.
            </p>
            
            <p className="text-gray-700 mb-4">
              Say goodbye to the stressful back and forth with developers who have no feel for design. 
              I offer consulting services during your design phase with my experience in UI/UX and animation,
              ensuring a seamless development process.
            </p>
            
            <p className="text-gray-700">
              My approach combines technical expertise with creative vision, allowing me to build websites 
              that not only look beautiful but also perform exceptionally well. From responsive designs to 
              complex interactive elements, I'm committed to delivering high-quality digital solutions that exceed expectations.
            </p>
          </div>

          <div className="lg:col-span-2" ref={statsRef}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <h3 className="text-5xl lg:text-6xl font-bold text-gradient-blue" data-count="10">0</h3>
                <div className="text-sm font-medium text-gray-500 mt-1">Happy clients</div>
                <p className="text-3xl lg:text-4xl font-bold mt-4">+</p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <h3 className="text-5xl lg:text-6xl font-bold text-gradient-purple" data-count="15">0</h3>
                <div className="text-sm font-medium text-gray-500 mt-1">Projects completed</div>
                <p className="text-3xl lg:text-4xl font-bold mt-4">+</p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <h3 className="text-5xl lg:text-6xl font-bold text-gradient-pink" data-count="3">0</h3>
                <div className="text-sm font-medium text-gray-500 mt-1">Years experience</div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <h3 className="text-5xl lg:text-6xl font-bold text-gradient-blue" data-count="100">0</h3>
                <div className="text-sm font-medium text-gray-500 mt-1">Passion</div>
                <p className="text-3xl lg:text-4xl font-bold mt-4">%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
