
import { useInView } from "@/hooks/useInView";
import { Code, Palette, LineChart, Smartphone, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ServiceCard = ({ icon, title, description, delay }: ServiceCardProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`bg-white rounded-2xl shadow-lg p-6 card-hover ${
        inView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
      style={{
        transition: `all 0.5s ease ${delay}ms`,
      }}
    >
      <div className="h-14 w-14 gradient-bg rounded-xl flex items-center justify-center mb-5 text-white">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link to="/#contact" className="flex items-center text-primary font-medium">
        Learn more <ArrowRight size={16} className="ml-1" />
      </Link>
    </div>
  );
};

const Services = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const services = [
    {
      icon: <Code size={24} />,
      title: "Web Development",
      description:
        "Clean, modern and maintainable code that follows best practices and performs well on all devices.",
    },
    {
      icon: <Palette size={24} />,
      title: "UI/UX Design",
      description:
        "Stunning interfaces that improve user experience and create delightful interactions.",
    },
    {
      icon: <LineChart size={24} />,
      title: "Performance Optimization",
      description:
        "Lightning-fast load times and optimization for the best user experience and SEO results.",
    },
    {
      icon: <Smartphone size={24} />,
      title: "Responsive Design",
      description:
        "Websites that look and function perfectly across all devices and screen sizes.",
    },
    {
      icon: <Zap size={24} />,
      title: "Integration Services",
      description:
        "Seamless connections with third-party APIs, CMS platforms, and other business tools.",
    },
    {
      icon: <LineChart size={24} />,
      title: "Web Analytics",
      description:
        "Implementation of tracking and analytics to provide insights into user behavior.",
    },
  ];

  return (
    <section id="services" className="section-spacing">
      <div className="container-custom">
        <div className="text-center" ref={ref}>
          <h2 
            className={`section-title gradient-text ${
              inView ? "opacity-100" : "opacity-0"
            }`}
            style={{ transition: "opacity 0.5s ease" }}
          >
            Services I Offer
          </h2>
          <p 
            className={`section-subtitle ${
              inView ? "opacity-100" : "opacity-0"
            }`}
            style={{ transition: "opacity 0.5s ease 0.2s" }}
          >
            Comprehensive solutions for your digital needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
