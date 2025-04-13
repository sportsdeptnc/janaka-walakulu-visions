
import { useInView } from "@/hooks/useInView";
import { useScrollJacking } from "@/hooks/useScrollJacking";
import {
  MessageSquare,
  Code,
  Smartphone,
  Zap,
  BarChart,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface ProcessStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: number;
  isActive: boolean;
  activeIndex: number;
  index: number;
  setStepRef: (index: number) => (node: HTMLDivElement | null) => void;
}

const ProcessStep = ({
  icon,
  title,
  description,
  step,
  isActive,
  activeIndex,
  index,
  setStepRef,
}: ProcessStepProps) => {
  // Calculate if this step should be visible based on the active step
  const isVisible = index <= activeIndex;
  
  // Calculate the z-index and position for the stacking effect
  const zIndex = 50 - index; // Higher index = lower in stack
  const translateY = isVisible ? 0 : 100; // Hide steps that aren't visible yet
  
  return (
    <div
      ref={setStepRef(index)}
      className={`transition-all duration-700 ease-out absolute top-0 left-0 right-0 w-full ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        zIndex,
        transform: `translateY(${translateY}px)`,
        transition: "transform 0.7s ease-out, opacity 0.7s ease-out",
      }}
    >
      <div className="flex justify-center">
        <div className="relative flex max-w-3xl">
          {/* Step icon */}
          <div className="h-12 w-12 gradient-bg rounded-full flex items-center justify-center text-white mb-4 z-10">
            {icon}
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl p-6 shadow-lg max-w-md ml-4">
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
    </div>
  );
};

const Process = () => {
  const { ref, inView } = useInView<HTMLDivElement>({
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

  // Use our scroll jacking hook
  const { activeStep, setStepRef, sectionRef } = useScrollJacking({
    totalSteps: processSteps.length,
    sectionId: "process",
    stepHeight: 600
  });

  // Debug message to track active step changes
  useEffect(() => {
    console.log("Active step changed to:", activeStep);
  }, [activeStep]);

  return (
    <section 
      id="process" 
      className="section-spacing relative" 
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
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

        {/* Steps container - fixed height for consistent scroll jacking */}
        <div className="relative h-[500px] mb-[500px]"> 
          {processSteps.map((step, index) => (
            <ProcessStep
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              step={index + 1}
              isActive={index === activeStep}
              activeIndex={activeStep}
              index={index}
              setStepRef={setStepRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
