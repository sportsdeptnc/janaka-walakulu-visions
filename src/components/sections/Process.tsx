
import { useInView } from "react-intersection-observer";
import {
  MoveRight,
  MessageSquare,
  Code,
  Smartphone,
  Zap,
  BarChart,
} from "lucide-react";

interface ProcessStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: number;
  isLastStep?: boolean;
  delay: number;
}

const ProcessStep = ({
  icon,
  title,
  description,
  step,
  isLastStep = false,
  delay,
}: ProcessStepProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`relative flex ${
        inView ? "opacity-100" : "opacity-0"
      }`}
      style={{ transition: `opacity 0.5s ease ${delay}ms` }}
    >
      {/* Line connector */}
      {!isLastStep && (
        <div className="absolute top-12 left-6 w-0.5 h-full bg-gray-200"></div>
      )}

      <div className="relative z-10 flex flex-col items-start">
        {/* Step icon */}
        <div className="h-12 w-12 gradient-bg rounded-full flex items-center justify-center text-white mb-4">
          {icon}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl p-6 shadow-lg max-w-md">
          <div className="flex items-center mb-3">
            <span className="text-xs font-semibold bg-gray-100 rounded px-2 py-1 mr-3">
              Step {step}
            </span>
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Process = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const processSteps = [
    {
      icon: <MessageSquare size={20} />,
      title: "Discovery & Consultation",
      description:
        "I start by understanding your needs, goals, and vision through in-depth discussions to ensure we're aligned on project objectives.",
    },
    {
      icon: <Code size={20} />,
      title: "Planning & Architecture",
      description:
        "Creating a detailed roadmap and technical architecture to guide the development process and ensure optimal results.",
    },
    {
      icon: <Smartphone size={20} />,
      title: "Design & Development",
      description:
        "Bringing your vision to life with clean, efficient code and beautiful design implementation across all devices and screen sizes.",
    },
    {
      icon: <Zap size={20} />,
      title: "Testing & Optimization",
      description:
        "Comprehensive testing and performance optimization to ensure your website loads quickly and functions flawlessly.",
    },
    {
      icon: <BarChart size={20} />,
      title: "Launch & Support",
      description:
        "Smooth deployment to your hosting environment and ongoing support to ensure your website continues to perform at its best.",
    },
  ];

  return (
    <section id="process" className="section-spacing">
      <div className="container-custom">
        <div className="text-center mb-16" ref={ref}>
          <h2
            className={`section-title gradient-text ${
              inView ? "opacity-100" : "opacity-0"
            }`}
            style={{ transition: "opacity 0.5s ease" }}
          >
            My Development Process
          </h2>
          <p
            className={`section-subtitle ${
              inView ? "opacity-100" : "opacity-0"
            }`}
            style={{ transition: "opacity 0.5s ease 0.2s" }}
          >
            A structured approach to deliver exceptional results
          </p>
        </div>

        <div className="space-y-16 md:space-y-24 md:pl-8">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              step={index + 1}
              isLastStep={index === processSteps.length - 1}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
